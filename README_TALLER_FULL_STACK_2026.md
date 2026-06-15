# Taller Full Stack 2026

## Aplicacion web: Tecno Hogar

Este proyecto corresponde a una tienda online basica llamada **Tecno Hogar**. La aplicacion integra un frontend construido con HTML, CSS, JavaScript y Bootstrap 5, un backend con Node.js y Express, y una base de datos MySQL.

El sistema permite navegar por paginas informativas, consultar un catalogo de productos, enviar datos desde el formulario de contacto, iniciar sesion como administrador y gestionar productos mediante operaciones CRUD.

---

## Stack tecnologico

| Componente | Tecnologia |
| --- | --- |
| Frontend | HTML5, CSS, JavaScript |
| Estilos | Bootstrap 5 por CDN y CSS local |
| Backend | Node.js, Express |
| Base de datos | MySQL |
| Conexion a MySQL | mysql2 |
| Comunicacion | Fetch API, HTTP y JSON |
| Servidor frontend | Live Server |
| Editor recomendado | Visual Studio Code |

---

## Estructura del proyecto

```bash
tecno_1hogar/
|-- backend/
|   |-- package.json
|   |-- package-lock.json
|   `-- server.js
|
|-- frontend/
|   |-- index.html
|   |-- productos.html
|   |-- ayuda.html
|   |-- contacto.html
|   |-- login.html
|   |-- admin-productos.html
|   |-- css/
|   |   `-- estilos.css
|   |-- js/
|   |   |-- script.js
|   |   |-- productos.js
|   |   |-- login.js
|   |   `-- auth.js
|   |-- img/
|   `-- video/
|
|-- AGENTS.md
|-- Documentacion.pdf
`-- README_TALLER_FULL_STACK_2026.md
```

---

## Paginas del frontend

- `frontend/index.html`: pagina principal de la tienda. Incluye barra de navegacion, seccion principal, descripcion, categorias, tarjetas informativas, boton hacia productos/contacto y footer.
- `frontend/productos.html`: catalogo publico de productos de tecnologia, componentes y perifericos para PC. Carga productos desde el backend usando `js/productos.js`.
- `frontend/ayuda.html`: centro de ayuda con preguntas frecuentes en acordeon de Bootstrap y recomendaciones para el usuario.
- `frontend/contacto.html`: formulario de contacto con campos de nombre, correo, asunto, telefono y mensaje. Envia informacion al backend.
- `frontend/login.html`: formulario de ingreso administrativo.
- `frontend/admin-productos.html`: panel administrativo para registrar, listar, editar y eliminar productos.

---

## Archivos JavaScript principales

- `frontend/js/script.js`: captura el formulario de contacto y envia los datos a `http://127.0.0.1:3000/guardar`.
- `frontend/js/productos.js`: consume las rutas de productos del backend, carga productos en el catalogo publico y permite crear, actualizar o eliminar productos desde el panel administrativo.
- `frontend/js/login.js`: envia las credenciales a `http://localhost:3000/login` y redirige al panel administrativo si el ingreso es correcto.
- `frontend/js/auth.js`: protege la pagina `admin-productos.html` verificando si existe una sesion guardada en `localStorage`.

---

## Backend

El backend se encuentra en la carpeta `backend` y usa Express con CORS y JSON.

Rutas disponibles:

| Metodo | Ruta | Funcion |
| --- | --- | --- |
| GET | `/` | Verificar que el servidor esta activo |
| POST | `/guardar` | Guardar datos del formulario de contacto |
| POST | `/login` | Validar credenciales administrativas |
| GET | `/productos` | Listar productos |
| POST | `/productos` | Registrar un producto |
| PUT | `/productos/:id` | Actualizar un producto |
| DELETE | `/productos/:id` | Eliminar un producto |

El servidor se ejecuta en:

```bash
http://127.0.0.1:3000
```

---

## Requisitos previos

Antes de ejecutar el proyecto se recomienda tener instalado:

- Node.js
- npm
- MySQL
- MySQL Workbench
- Visual Studio Code
- Extension Live Server

---

## Instalacion del backend

Desde la raiz del proyecto, ingresar a la carpeta del backend:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el servidor:

```bash
node server.js
```

Si el servidor inicia correctamente, debe mostrarse un mensaje similar a:

```bash
Servidor en http://127.0.0.1:3000
```

---

## Base de datos MySQL

La conexion actual del backend usa la base de datos `contactos_db`. Se deben crear las tablas necesarias para contactos, usuarios y productos.

```sql
CREATE DATABASE contactos_db;
USE contactos_db;

CREATE TABLE contactos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  telefono VARCHAR(30) NOT NULL,
  mensaje TEXT NOT NULL
);

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  correo VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  descripcion TEXT NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  stock INT NOT NULL,
  imagen VARCHAR(255) NOT NULL
);
```

Ejemplo de usuario administrador:

```sql
INSERT INTO usuarios (correo, password)
VALUES ('admin@tecnohogar.com', '123456');
```

Ejemplo de producto:

```sql
INSERT INTO productos (nombre, descripcion, precio, categoria, stock, imagen)
VALUES (
  'SSD NVMe Samsung 990 Pro 2TB',
  'Almacenamiento NVMe rapido para mejorar el rendimiento del PC.',
  1200000,
  'Almacenamiento',
  5,
  'img/samsung_990_pro.jpg'
);
```

---

## Configuracion de conexion

La conexion con MySQL se configura en:

```bash
backend/server.js
```

Se debe revisar que estos datos coincidan con la configuracion local de MySQL:

```javascript
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tu_contrasena",
  database: "contactos_db"
});
```

---

## Como probar con Live Server

1. Abrir el proyecto en Visual Studio Code.
2. Instalar la extension **Live Server** si no esta instalada.
3. Ejecutar primero el backend con `node server.js` desde la carpeta `backend`.
4. Abrir el archivo `frontend/index.html`.
5. Hacer clic derecho sobre el archivo.
6. Seleccionar **Open with Live Server**.
7. Navegar entre Inicio, Productos, Ayuda, Contacto y Login.

---

## Flujo de funcionamiento

```text
Frontend HTML
      |
JavaScript con Fetch API
      |
Backend Node.js + Express
      |
Base de datos MySQL
      |
Respuesta al usuario
```

### Contacto

1. El usuario llena el formulario en `contacto.html`.
2. `script.js` captura los datos.
3. Se envia una peticion `POST` a `/guardar`.
4. El backend guarda la informacion en la tabla `contactos`.

### Productos

1. `productos.html` solicita productos con `GET /productos`.
2. El backend consulta la tabla `productos`.
3. JavaScript muestra los productos como tarjetas.
4. Desde `admin-productos.html` se pueden crear, editar y eliminar productos.

### Login administrativo

1. El administrador ingresa correo y contrasena en `login.html`.
2. `login.js` envia los datos a `POST /login`.
3. Si las credenciales son correctas, se guarda una sesion basica en `localStorage`.
4. El usuario es redirigido a `admin-productos.html`.

---

## Pruebas recomendadas

1. Iniciar MySQL y verificar que exista la base de datos `contactos_db`.
2. Ejecutar el backend con `node server.js`.
3. Abrir el frontend con Live Server.
4. Enviar un mensaje desde `contacto.html`.
5. Verificar los contactos:

```sql
SELECT * FROM contactos;
```

6. Ingresar desde `login.html` con un usuario creado en la tabla `usuarios`.
7. Crear, editar y eliminar productos desde `admin-productos.html`.
8. Verificar los productos:

```sql
SELECT * FROM productos;
```

---

## Problemas comunes

| Problema | Posible solucion |
| --- | --- |
| El backend no inicia | Verificar que Node.js este instalado y ejecutar `npm install` |
| Error de conexion con MySQL | Revisar usuario, contrasena, base de datos y servicio de MySQL |
| El formulario no guarda datos | Confirmar que el backend este activo en el puerto 3000 |
| El catalogo no carga productos | Verificar la tabla `productos` y la ruta `GET /productos` |
| El login no funciona | Revisar que exista un usuario en la tabla `usuarios` |
| Error CORS | Confirmar que el backend use `cors()` |
| Puerto ocupado | Cambiar el puerto en `server.js` o cerrar el proceso que lo usa |

---

## Resultado esperado

Al finalizar la configuracion, el estudiante debe poder:

- Abrir el sitio desde Live Server.
- Navegar por Inicio, Productos, Ayuda, Contacto y Login.
- Enviar datos del formulario de contacto al backend.
- Guardar contactos en MySQL.
- Iniciar sesion como administrador.
- Administrar productos desde el panel privado.
- Listar productos en el catalogo publico.

---

## Proposito academico

Este taller fortalece la comprension de una aplicacion full stack basica. El estudiante practica estructura de proyectos web, consumo de APIs con Fetch, rutas con Express, conexion con MySQL y manejo inicial de funcionalidades administrativas.
