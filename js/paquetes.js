// Función para cargar y mostrar los datos de una URL
function cargarYMostrarDatos(url, contenedor) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const categorias = data.categorias;
      categorias.forEach((categoria) => {
        const nombre = categoria.nombre;
        const nombreJunto = nombre.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '');
        const canales = categoria.canales;
        const numeroCanales = canales.length;

        const categoriaElement = document.createElement("div");
        categoriaElement.classList.add("accordion-item");
        categoriaElement.innerHTML = `
              <h2 class="accordion-header" id="panelsStayOpen-heading-${nombreJunto}">
                <button class="accordion-button collapsed" type="button">
                  <div class="col-5">${nombre}</div>
                  <div class="col-5 offset-1 d-none d-md-block">
                    <p class="orange-btn mx-4 mt-1 text-center">${numeroCanales} Canales</p>
                  </div>
                </button>
              </h2>
              <div class="collapse-content" id="collapse-${nombreJunto}">
                <div class="col-12 d-flex my-1 p-0 d-flex flex-row flex-wrap">
                  ${canales
                      .map(
                        (canal) => `
                          <div class="col-12 StrChan p-0">
                              <img loading="lazy" class="img-channel" src="${canal.imagenPrincipal}" alt="${canal.nombreCanal}">
                              <img loading="lazy" class="stream-modal-logo" src="${canal.imagenCanal}" alt="${canal.nombreCanal}">
                              <div class="channel-description none">
                                  <h6>${canal.nombreCanal}</h6>
                                  <p>${canal.descripcion}</p>
                              </div>
                              <button class="btn btn-sinopsis" type="button">
                                  Conoce más
                              </button>
                          </div>
                        `
                      )
                      .join("")
                  }   
                </div>
              </div>
        `;

        // Añadir funcionalidad de colapso al botón recién creado
        const button = categoriaElement.querySelector('.accordion-button');
        const content = categoriaElement.querySelector('.collapse-content');
        button.addEventListener('click', function() {
          // Comprobar si el contenido está colapsado
          var isCollapsed = content.classList.contains('expanded');
          
          if (isCollapsed) {
            // Colapsar el contenido
            content.style.maxHeight = '0';
            content.classList.remove('expanded');
          } else {
            // Expandir el contenido
            content.style.maxHeight = '100%';
            content.classList.add('expanded');
          }
        });

        // Añadir funcionalidad de collapse al botón "Conoce más" para cada canal
        const canalesElements = categoriaElement.querySelectorAll('.StrChan');
        canalesElements.forEach((canalElement) => {
          const btnSinopsis = canalElement.querySelector('.btn-sinopsis');
          const channelDescription = canalElement.querySelector('.channel-description');
          
          btnSinopsis.addEventListener('click', function() {
            // Alternar la visibilidad del div de descripción
            channelDescription.classList.toggle('visible');
          });
        });
        
        // Agregar la nueva categoría al contenedor
        const contenidoJsonElement = document.getElementById(contenedor);
        contenidoJsonElement.appendChild(categoriaElement);
      });
    })
    .catch((error) => {
      console.error("Error al leer el archivo JSON:", error);
    });
}

// Llamadas a las funciones
cargarYMostrarDatos("https://d31nz91qboyide.cloudfront.net/mvshub/conexiones/Test-paquetes.json", "contenido-json1"),
cargarYMostrarDatos("https://d31nz91qboyide.cloudfront.net/mvshub/conexiones/Test-paqueteEx.json", "contenido-json2");
