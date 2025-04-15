// Bloque de scripts para Aviso de Cookies y Flecha hacia arriba
const AvisoCookies = document.getElementById('cookieConsentContainer');
const BotonAceptarCookies = document.getElementById('btn-aceptar-cookies');

if (!localStorage.getItem('aceptocookies')) {
    AvisoCookies.classList.add('activo');
}

BotonAceptarCookies.addEventListener('click', () => {
    AvisoCookies.classList.remove('activo');
    localStorage.setItem('aceptocookies', true);
});

window.onscroll = function () {
    if (window.scrollY >= 1000) {
        document.getElementById('scrollup').style.cssText = "display: block;";
    } else {
        document.getElementById('scrollup').style.cssText = "display: none;";
    }
};

// Bloque de scripts para el carrusel y GetButton.io widget
jQuery(document).ready(function ($) {
    // open interest point description
    $('.cd-single-point').children('a').on('click', function () {
        var selectedPoint = $(this).parent('li');
        if (selectedPoint.hasClass('is-open')) {
            selectedPoint.removeClass('is-open').addClass('visited');
        } else {
            selectedPoint.addClass('is-open').siblings('.cd-single-point.is-open').removeClass('is-open').addClass('visited');
        }
    });

    // close interest point description
    $('.cd-close-info').on('click', function (event) {
        event.preventDefault();
        $(this).parents('.cd-single-point').eq(0).removeClass('is-open').addClass('visited');
    });
});


jQuery(document).ready(function ($) {
    //open interest point description
    $('.cd-single-point').children('a').on('click', function () {
      var selectedPoint = $(this).parent('li');
      if (selectedPoint.hasClass('is-open')) {
        selectedPoint.removeClass('is-open').addClass('visited');
      } else {
        selectedPoint.addClass('is-open').siblings('.cd-single-point.is-open').removeClass('is-open').addClass('visited');
      }
    });
    //close interest point description
    $('.cd-close-info').on('click', function (event) {
      event.preventDefault();
      $(this).parents('.cd-single-point').eq(0).removeClass('is-open').addClass('visited');
    });
  });




