//Login de prueba para redigir al usuario a la pagina de incio y que muestra "usuario registrado" para luego conectar con un backend funcional.
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario-login");
  const mensaje = document.getElementById("mensaje-login");

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();

    if (usuario === "" || password === "") {
      mostrarMensaje("Por favor, completá todos los campos.", "error");
      return;
    }

    // Guardar estado de sesión (modo de prueba)
    localStorage.setItem("usuarioLogueado", "true");

    // Redirigir al inicio
    window.location.href = "../index.html";
  });

  function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.classList.remove("oculto", "error", "exito");
    mensaje.classList.add(tipo);
  }
});