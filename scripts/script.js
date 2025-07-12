document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario-contacto");

    if(formulario) { 
        formulario.addEventListener("submit", function (e){
            e.preventDefault();

            const datos = new FormData(formulario);

            fetch(formulario.ariaDescription,{
                method: "POST",
                body: datos,
                headers: {
                    Accept: "application/json",
                },
            })
            .then((response) =>{
                if(response.ok){
                    mostrarPopup();
                    formulario.reset();
                } else {
                    alert("Error al enviar el mensaje. Por favor intentalo nuevamente.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Hubo un problema. Intenta más tarde");
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