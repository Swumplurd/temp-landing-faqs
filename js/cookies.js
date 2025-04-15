const AvisoCookies = document.getElementById('cookieConsentContainer');
const BotonAceptarCookies = document.getElementById('btn-aceptar-cookies');
if (!localStorage.getItem('aceptocookies')) {
    cookieConsentContainer.classList.add('activo');  
}

BotonAceptarCookies.addEventListener('click', () => {
    cookieConsentContainer.classList.remove('activo');

    localStorage.setItem('aceptocookies', true );

 });