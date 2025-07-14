document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario-contacto");

  if (formulario) {
    formulario.addEventListener("submit", function (e) {
      e.preventDefault();

      const datos = new FormData(formulario);

      fetch(formulario.action, {
        method: "POST",
        body: datos,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            mostrarPopup();
            formulario.reset();
          } else {
            alert("Error al enviar el mensaje. Intenta nuevamente.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Hubo un problema. Intenta más tarde.");
        });
    });
  }
});

function mostrarPopup() {
  document.getElementById("popup").classList.remove("oculto");
}

function cerrarPopup() {
  document.getElementById("popup").classList.add("oculto");
}

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav ul");
  const estaLogueado = localStorage.getItem("usuarioLogueado") === "true";

  if (nav && estaLogueado) {
    const liLogin = nav.querySelector("a[href='login.html']")?.parentElement;
    if (liLogin) {
      liLogin.innerHTML = '<span>Usuario Registrado</span>';
    }
  }
});

function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  
  const enlaceCarrito = document.getElementById("nav-carrito");
  if (enlaceCarrito) {
    enlaceCarrito.textContent = `Carrito (${total})`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
});
