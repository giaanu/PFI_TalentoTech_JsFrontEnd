document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("lista-carrito");
  const totalDiv = document.getElementById("total-carrito");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function renderCarrito() {
    lista.innerHTML = "";

    if (carrito.length === 0) {
      lista.innerHTML = "<p>Tu carrito está vacío.</p>";
      totalDiv.textContent = "";
      return;
    }

    carrito.forEach((producto, index) => {
      const item = document.createElement("div");
      item.classList.add("item-carrito");

      item.innerHTML = `
        <img src="${producto.image}" alt="${producto.title}" />
        <h3>${producto.title}</h3>
        <p>Precio: $${producto.price.toFixed(2)}</p>
        <label>Cantidad: 
          <input type="number" min="1" value="${producto.cantidad}" data-index="${index}" class="cantidad-input" />
        </label>
        <p>Total: $${(producto.price * producto.cantidad).toFixed(2)}</p>
        <button class="eliminar" data-index="${index}">Eliminar</button>
      `;

      lista.appendChild(item);
    });

    calcularTotal();
  }

  function calcularTotal() {
    const total = carrito.reduce((acc, p) => acc + p.price * p.cantidad, 0);
    totalDiv.innerHTML = `<h3>Total a pagar: $${total.toFixed(2)}</h3>`;
  }

  // Eventos
  lista.addEventListener("input", (e) => {
    if (e.target.classList.contains("cantidad-input")) {
      const index = e.target.dataset.index;
      const nuevaCantidad = parseInt(e.target.value);
      carrito[index].cantidad = nuevaCantidad > 0 ? nuevaCantidad : 1;
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderCarrito();
      actualizarContadorCarrito?.();
    }
  });

  lista.addEventListener("click", (e) => {
    if (e.target.classList.contains("eliminar")) {
      const index = e.target.dataset.index;
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderCarrito();
      actualizarContadorCarrito?.();
    }
  });

  renderCarrito();

  const btnVaciar = document.getElementById("vaciar-carrito");
  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      if (confirm("¿Estás seguro de que querés vaciar el carrito?")) {
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito();
        actualizarContadorCarrito?.();
      }
    });
  }

});