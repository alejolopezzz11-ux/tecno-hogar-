const formLogin = document.getElementById("formLogin");
const mensajeLogin = document.getElementById("mensajeLogin");

formLogin.addEventListener("submit", async function (event) {
    event.preventDefault();

    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;

    try {
        const respuesta = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ correo, password })
        });

        const datos = await respuesta.json();

        if (datos.ok) {
            localStorage.setItem("usuario", JSON.stringify(datos.usuario));
            mensajeLogin.innerHTML = `<div class="alert alert-success">${datos.mensaje}</div>`;

            setTimeout(() => {
                window.location.href = "admin-productos.html";
            }, 1000);
        } else {
            mensajeLogin.innerHTML = `<div class="alert alert-danger">${datos.mensaje}</div>`;
        }
    } catch (error) {
        console.error("Error:", error);
        mensajeLogin.innerHTML = `<div class="alert alert-danger">No se pudo conectar con el servidor</div>`;
    }
});
