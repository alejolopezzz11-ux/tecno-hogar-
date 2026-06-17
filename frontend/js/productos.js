const API_BASE = 'http://localhost:3000';

let editProductId = null;
let buscadorProductosIniciado = false;

function mostrarAlerta(texto) {
  console.log(texto);
  alert(texto);
}

function mostrarMensajePublico(texto) {
  const mensaje = document.getElementById('productosMensaje');
  if (mensaje) {
    mensaje.textContent = texto;
  }
  console.log(texto);
}

function limpiarFormulario() {
  const formProducto = document.getElementById('formProducto');
  if (!formProducto) {
    return;
  }
  formProducto.reset();
  editProductId = null;
  const botonEnviar = formProducto.querySelector('button[type="submit"]');
  if (botonEnviar) {
    botonEnviar.textContent = 'Guardar producto';
  }
}

function crearFilaProducto(producto) {
  const fila = document.createElement('tr');
  fila.innerHTML = `
    <td>${producto.id}</td>
    <td>${producto.nombre}</td>
    <td>${producto.descripcion}</td>
    <td>${producto.precio}</td>
    <td>${producto.categoria}</td>
    <td>${producto.stock}</td>
    <td>${producto.imagen}</td>
    <td>
      <button class="btn btn-sm btn-outline-primary me-2" type="button" data-action="editar">Editar</button>
      <button class="btn btn-sm btn-outline-danger" type="button" data-action="eliminar">Eliminar</button>
    </td>
  `;

  const botonEditar = fila.querySelector('button[data-action="editar"]');
  const botonEliminar = fila.querySelector('button[data-action="eliminar"]');

  botonEditar.addEventListener('click', () => {
    const form = document.getElementById('formProducto');
    if (!form) {
      return;
    }
    form.nombre.value = producto.nombre || '';
    form.descripcion.value = producto.descripcion || '';
    form.precio.value = producto.precio != null ? producto.precio : '';
    form.categoria.value = producto.categoria || '';
    form.stock.value = producto.stock != null ? producto.stock : '';
    form.imagen.value = producto.imagen || '';
    editProductId = producto.id;
    const botonEnviar = form.querySelector('button[type="submit"]');
    if (botonEnviar) {
      botonEnviar.textContent = 'Actualizar producto';
    }
    mostrarAlerta(`Editando producto ID ${producto.id}`);
  });

  botonEliminar.addEventListener('click', async () => {
    if (!confirm(`¿Eliminar producto ${producto.nombre}?`)) {
      return;
    }
    try {
      const respuesta = await fetch(`${API_BASE}/productos/${producto.id}`, {
        method: 'DELETE'
      });
      if (!respuesta.ok) {
        throw new Error('No se pudo eliminar el producto');
      }
      mostrarAlerta(`Producto eliminado: ${producto.nombre}`);
      cargarProductosAdmin();
    } catch (error) {
      console.error(error);
      mostrarAlerta('Error al eliminar el producto');
    }
  });

  return fila;
}

function crearCardProducto(producto) {
  const columna = document.createElement('div');
  columna.className = 'col-md-6 col-lg-4';
  columna.dataset.busqueda = [
    producto.nombre,
    producto.descripcion,
    producto.categoria
  ].join(' ');
  columna.innerHTML = `
    <div class="card h-100 shadow-sm">
      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=800&q=80'" />
      <div class="card-body d-flex flex-column">
        <h3 class="h5 card-title">${producto.nombre}</h3>
        <p class="card-text">${producto.descripcion}</p>
        <p class="mb-1"><strong>Precio:</strong> $${producto.precio}</p>
        <p class="text-muted mb-1"><small>Categoría: ${producto.categoria}</small></p>
        <p class="text-muted mb-0"><small>Stock: ${producto.stock}</small></p>
      </div>
    </div>
  `;
  return columna;
}

function prepararTarjetasParaBusqueda() {
  const tarjetas = document.querySelectorAll('#productosGrid > .col-md-6, #productosGrid > .col-lg-4');

  tarjetas.forEach((tarjeta) => {
    if (!tarjeta.dataset.busqueda) {
      tarjeta.dataset.busqueda = tarjeta.textContent;
    }
  });
}

function filtrarProductos(textoBusqueda) {
  const busqueda = textoBusqueda.trim().toLowerCase();
  const tarjetas = document.querySelectorAll('#productosGrid > .col-md-6, #productosGrid > .col-lg-4');
  const mensaje = document.getElementById('productosMensaje');
  const terminosBusqueda = busqueda.includes('nvidia') ? [busqueda, 'rtx'] : [busqueda];
  let totalVisibles = 0;

  tarjetas.forEach((tarjeta) => {
    const textoProducto = `${tarjeta.dataset.busqueda || ''} ${tarjeta.id || ''}`.toLowerCase();
    const coincide = busqueda === '' || terminosBusqueda.some((termino) => textoProducto.includes(termino));

    tarjeta.classList.toggle('d-none', !coincide);

    if (coincide) {
      totalVisibles += 1;
    }
  });

  if (mensaje) {
    if (busqueda === '') {
      mensaje.textContent = '';
    } else if (totalVisibles === 0) {
      mensaje.textContent = `No se encontraron productos para: ${textoBusqueda}`;
    } else {
      mensaje.textContent = `Productos encontrados: ${totalVisibles}`;
    }
  }
}

function iniciarBuscadorProductos() {
  const formularioBusqueda = document.querySelector('form[role="search"]');
  const campoBusqueda = formularioBusqueda ? formularioBusqueda.querySelector('input[type="search"]') : null;
  const params = new URLSearchParams(window.location.search);
  const busquedaInicial = params.get('q') || '';

  prepararTarjetasParaBusqueda();

  if (campoBusqueda) {
    campoBusqueda.value = busquedaInicial;
  }

  buscadorProductosIniciado = true;

  if (busquedaInicial) {
    filtrarProductos(busquedaInicial);
  }
}

async function cargarProductosAdmin() {
  const tablaProductos = document.getElementById('tablaProductos');
  if (!tablaProductos) {
    return;
  }
  tablaProductos.innerHTML = '';

  try {
    const respuesta = await fetch(`${API_BASE}/productos`);
    if (!respuesta.ok) {
      throw new Error('Error al obtener productos');
    }
    const productos = await respuesta.json();
    if (productos.length === 0) {
      const fila = document.createElement('tr');
      fila.innerHTML = '<td colspan="8" class="text-center">No hay productos disponibles</td>';
      tablaProductos.appendChild(fila);
      return;
    }

    productos.forEach((producto) => {
      tablaProductos.appendChild(crearFilaProducto(producto));
    });
  } catch (error) {
    console.error(error);
    mostrarAlerta('No se pudo cargar la lista de productos');
  }
}

async function cargarProductosPublico() {
  const contenedor = document.getElementById('productosGrid');
  const mensaje = document.getElementById('productosMensaje');
  if (!contenedor) {
    return;
  }

  const productosHtml = contenedor.innerHTML;
  if (mensaje) {
    mensaje.textContent = 'Cargando productos...';
  }

  try {
    const respuesta = await fetch(`${API_BASE}/productos`);
    if (!respuesta.ok) {
      throw new Error('Error al obtener productos');
    }
    const productos = await respuesta.json();
    if (productos.length === 0) {
      contenedor.innerHTML = productosHtml;
      if (mensaje) {
        mensaje.textContent = '';
      }
      iniciarBuscadorProductos();
      return;
    }
    if (mensaje) {
      mensaje.textContent = '';
    }

    contenedor.innerHTML = '';
    productos.forEach((producto) => {
      contenedor.appendChild(crearCardProducto(producto));
    });
    iniciarBuscadorProductos();
  } catch (error) {
    console.error(error);
    if (mensaje) {
      mensaje.textContent = '';
    }
    contenedor.innerHTML = productosHtml;
    iniciarBuscadorProductos();
  }
}

function validarProducto(data) {
  return (
    data.nombre &&
    data.descripcion &&
    data.precio !== '' &&
    !Number.isNaN(data.precio) &&
    data.categoria &&
    data.stock !== '' &&
    !Number.isNaN(data.stock) &&
    data.imagen
  );
}

async function enviarProducto(event) {
  event.preventDefault();

  const form = event.target;
  const producto = {
    nombre: form.nombre.value.trim(),
    descripcion: form.descripcion.value.trim(),
    precio: Number(form.precio.value),
    categoria: form.categoria.value.trim(),
    stock: Number(form.stock.value),
    imagen: form.imagen.value.trim()
  };

  if (!validarProducto(producto)) {
    mostrarAlerta('Por favor completa todos los campos obligatorios.');
    return;
  }

  const metodo = editProductId ? 'PUT' : 'POST';
  const url = editProductId ? `${API_BASE}/productos/${editProductId}` : `${API_BASE}/productos`;

  try {
    const respuesta = await fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)
    });

    if (!respuesta.ok) {
      throw new Error('Error al guardar el producto');
    }

    const data = await respuesta.json();
    if (editProductId) {
      mostrarAlerta('Producto actualizado correctamente');
    } else {
      mostrarAlerta('Producto guardado correctamente');
      console.log('ID del producto creado:', data.id);
    }

    limpiarFormulario();
    cargarProductosAdmin();
  } catch (error) {
    console.error(error);
    mostrarAlerta('No se pudo guardar el producto');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const formProducto = document.getElementById('formProducto');
  if (formProducto) {
    formProducto.addEventListener('submit', enviarProducto);
    cargarProductosAdmin();
  }

  const productosGrid = document.getElementById('productosGrid');
  if (productosGrid) {
    iniciarBuscadorProductos();
    cargarProductosPublico();
  }
});

