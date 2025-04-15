document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".eventCheckBtn");

    elements.forEach(function (element) {
        const btnSubscribe = element.querySelector(".btn-subscribe");
        const checkStream = element.querySelector(".check");
        const radioButton = element.querySelector(".radiopqtInput");

        btnSubscribe.addEventListener("click", function () {
            if (checkStream) {
                checkStream.checked = !checkStream.checked;
            }
            if (radioButton) {
                radioButton.checked = true;
            }

            // Actualiza el texto de btnSubscribe según el estado de checkStream
            if (checkStream) {
                if (checkStream.checked) {
                    btnSubscribe.textContent = "Quitar del carrito"; // Cambia el texto a "Unsubscribe" si está marcado
                } else {
                    btnSubscribe.textContent = "Añadir al carrito 4"; // Cambia el texto a "Subscribe" si no está marcado
                }
            }
        });

        // Asegúrate de que el botón inicialmente muestre "Subscribe"
        btnSubscribe.textContent = "Añadir al carrito";
    });
});


