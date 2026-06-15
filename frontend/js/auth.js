const usuario = localStorage.getItem("usuario");

if (!usuario) {
    alert("Debe iniciar sesion para acceder al panel administrativo");
    window.location.href = "login.html";
}

const btnCerrarSesion = document.getElementById("btnCerrarSesion");

if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", function () {
        localStorage.removeItem("usuario");
        window.location.href = "login.html";
    });
}
