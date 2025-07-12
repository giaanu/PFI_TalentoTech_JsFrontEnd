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
          <button class="btn-agregar">Agregar al carrito</button>
        `;

        contenedor.appendChild(card);
      });
    })
    .catch(error => {
      contenedor.innerHTML = "<p>Error al cargar productos.</p>";
      console.error("Error al obtener productos:", error);
    });
});
