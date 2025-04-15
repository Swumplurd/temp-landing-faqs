
//Script precio carrito móvil//
const totalPriceElement = document.getElementById("totalPrice");
const headerCalcElement = document.querySelector(".price-header");
const originalContainer = document.querySelector(".total-Div");

function moveElement() {
  const screenwidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  if (screenwidth <= 767 && !headerCalcElement.contains(totalPriceElement)) {
    headerCalcElement.appendChild(totalPriceElement);
  } else if (screenwidth >= 772 && !originalContainer.contains(totalPriceElement)) {
    originalContainer.appendChild(totalPriceElement);
  }
}

function moveElement() {
  const screenwidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const collapseArrow = document.getElementById('collapseArrow') || createCollapseArrow();

  if (screenwidth <= 767) {
    if (!headerCalcElement.contains(totalPriceElement)) {
      headerCalcElement.appendChild(totalPriceElement);
    }
    if (!headerCalcElement.contains(collapseArrow)) {
      headerCalcElement.appendChild(collapseArrow); // Agrega la flecha después del precio
    }
  } else {
    if (!originalContainer.contains(totalPriceElement)) {
      originalContainer.appendChild(totalPriceElement);
    }
    if (collapseArrow.parentNode) {
      collapseArrow.parentNode.removeChild(collapseArrow); // Elimina la flecha en pantallas grandes
    }
  }
}

function restoreElement() {
  // Similar a moveElement, asegúrate de manejar la flecha aquí también
}

moveElement();
window.addEventListener('resize', moveElement);
window.addEventListener('resize', restoreElement);




//Script para carrito móvil//

// Función para alternar la visibilidad del cuerpo del carrito
function toggleCartBody() {
  const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const cartBody = document.getElementById('collapseCart');
  const collapseArrow = document.getElementById('collapseArrow');

  if (screenWidth <= 767) {
      if (cartBody.style.height && cartBody.style.height !== '0px') {
          // Colapsa el cuerpo del carrito
          cartBody.style.height = '0px';
          collapseArrow.textContent = 'expand_less'; // Cambia la flecha hacia arriba
      } else {
          // Despliega el cuerpo del carrito
          cartBody.style.height = cartBody.scrollHeight + 'px';
          collapseArrow.textContent = 'expand_more'; // Cambia la flecha hacia abajo
      }
  }
}


// Función para actualizar el estado del carrito móvil
function updateCartShopState() {
  const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const cartShop = document.getElementById('cart-shop');
  const cartBody = document.getElementById('collapseCart');

  // Si es una pantalla pequeña, añade la funcionalidad de colapso
  if (screenWidth <= 767) {
    // Asegúrate de que el carrito esté inicialmente colapsado
    cartBody.style.height = '0px'; // Inicia con el carrito colapsado
    // Agrega el evento de clic para desplegar y colapsar el carrito
    cartShop.addEventListener('click', toggleCartBody);
  } else {
    // Para pantallas más grandes, asegúrate de que el carrito esté siempre desplegado
    cartBody.style.height = null;
    cartShop.removeEventListener('click', toggleCartBody);
  }
}

// Función para agregar los event listeners
function addEventListeners() {
  window.addEventListener('load', updateCartShopState);
  window.addEventListener('resize', updateCartShopState);
}

// Inicia todo
addEventListeners();




  //Script para scroll indicator

  document.addEventListener("DOMContentLoaded", function () {
    const scrollIndicator = document.getElementById("scrollIndicator");
    const scrollText = document.getElementById("scrollText");
    let arrowDirection = "down";


    window.addEventListener("scroll", function () {
      if (document.documentElement.scrollTop > 100) {
        scrollText.style.display = "none";
      } else {
        scrollText.style.display = "block";
      }

      if (document.documentElement.scrollTop > 1000) {
        if (arrowDirection === "down") {
          arrowDirection = "up";
          scrollIndicator.querySelector(".arrow").classList.add("arrow-up");
        }
      } else {
        if (arrowDirection === "up") {
          arrowDirection = "down";
          scrollIndicator.querySelector(".arrow").classList.remove("arrow-up");
        }
      }
    });


    scrollIndicator.addEventListener("click", function () {
      if (arrowDirection === "down") {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth"

        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    });
  });


  function createCollapseArrow() {
    const collapseArrow = document.createElement('span');
    collapseArrow.id = 'collapseArrow';
    collapseArrow.className = 'material-symbols-outlined collapse-arrow-mobile';
    collapseArrow.textContent = 'expand_less'; // Comienza con la flecha hacia arriba
    collapseArrow.style.color = '#F5921E';

    return collapseArrow;
}

document.addEventListener('DOMContentLoaded', function() {
  moveElement(); // Para posicionar correctamente la flecha en la carga inicial
  updateCartShopState(); // Para establecer el estado inicial del carrito y la flecha
});

  // Este script permite mostrar la flecha hacia arriba en la versión móvil


  // document.addEventListener('DOMContentLoaded', function() {
  //   window.onscroll = function () {
  //     if (window.scrollY >= 1000) {
  //       document.getElementById('scrollup').style.cssText = "display: block;";
  
  
  //     } else {
  //       document.getElementById('scrollup').style.cssText = "display: none;";
  //     }
  //   };
  // });
  
