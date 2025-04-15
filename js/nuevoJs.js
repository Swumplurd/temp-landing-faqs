/****************************************MENU DESPLEGABLE****************************************/
document.addEventListener('DOMContentLoaded', function() {
    var toggleButton = document.querySelector('.navbar-toggler');
    var menuContent = document.getElementById('navbarNav');
  
    function toggleMenu() {
      if (menuContent.style.display === 'block') {
        menuContent.style.display = 'none';
        toggleButton.classList.remove('toggled');
      } else {
        menuContent.style.display = 'block';
        toggleButton.classList.add('toggled');
      }
    }
  
    toggleButton.addEventListener('click', toggleMenu);
  });
  
  

/****************************************CARRITO DESPLEGABLE****************************************/
