document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("productos");

  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
      data.forEach(producto => {
        const card = document.createElement("div");
        card.className = "card-producto";

        card.innerHTML = `
          <img src="${producto.image}" alt="${producto.title}" />
          <h3>${producto.title}</h3>
          <p class="precio">$${producto.price.toFixed(2)}</p>
          <button class="btn-agregar" data-id="${producto.id}" data-title="${producto.title}" data-price="${producto.price}" data-img="${producto.image}">
            Agregar al carrito
          </button>
        `;

        contenedor.appendChild(card);
      });

      // Evento para todos los botones una vez creados
      const botones = document.querySelectorAll(".btn-agregar");
      botones.forEach(boton => {
        boton.addEventListener("click", () => {
          const producto = {
            id: boton.dataset.id,
            title: boton.dataset.title,
            price: parseFloat(boton.dataset.price),
            image: boton.dataset.img,
            cantidad: 1,
          };

          agregarAlCarrito(producto);
        });
      });
    })
    .catch(error => {
      contenedor.innerHTML = "<p>Error al cargar productos.</p>";
      console.error("Error al obtener productos:", error);
    });
});

// 🔁 Función para agregar producto a localStorage
function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const index = carrito.findIndex(p => p.id === producto.id);

  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push(producto);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`Se agregó "${producto.title}" al carrito.`);
}
