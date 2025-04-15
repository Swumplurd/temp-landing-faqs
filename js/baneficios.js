    function cargarYMostrarDatosB(url, contenedor) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const paquetes = data.paquetes;
          paquetes.forEach((paquete) => {
            const nombre = paquete.nombre;
            const nombreJunto = nombre.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '');
            const canales = paquete.canales;
            const numeroCanales = paquete.canales.length;
    
            const paqueteElement = document.createElement("div");
            paqueteElement.classList.add("accordion-item");
            paqueteElement.innerHTML = `
                  <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${producto.idproducto}-${canal.idBeneficio}" aria-expanded="false" aria-controls="collapse-${producto.idproducto}-${canal.idBeneficio}">
                      <div class="col-5">${canal.nombreBeneficio}</div>
                    </button>
                  </h2>
    
                  <div id="collapse-${producto.idproducto}-${canal.idBeneficio}" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-heading${index + 1}">
                    <div class="col-12 d-flex my-1 p-0 d-flex flex-row flex-wrap">
                      ${canales
                          .map(
                          (canal) => `
                          <div class="col-12 StrChan p-0">
                                    <img class="img-channel" src="${beneficio.imagenPrincipal}" alt="${beneficio.nombreBeneficio}">
                                    <img class="stream-modal-logo" src="${beneficio.logoBeneficio}" alt="${beneficio.nombreBeneficio}">
                                    <div id="ent-${producto.idproducto}-${beneficio.idBeneficio}" class="collapse channel-description">
                                        <h6>${beneficio.nombreBeneficio}</h6>
                                        <p>${beneficio.descripcion}</p>
                                    </div>
                                    <button class="btn btn-sinopsis" type="button" data-bs-toggle="collapse" data-bs-target="#ent-${producto.idproducto}-${beneficio.idBeneficio}" aria-expanded="false" aria-controls="ent-${producto.idproducto}-${beneficio.idBeneficio}">
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
    
            const contenidoJsonElement = document.getElementById(contenedor);
            contenidoJsonElement.appendChild(paqueteElement);

            console.log("Datos", contenidoJsonElement);
          });
        })
        
        .catch((error) => {
          console.error("Error al leer el archivo JSON:", error);
        });
    }
    
    // Llamadas a las funciones
    cargarYMostrarDatos("./js/beneficios.json", "contenido-json3");