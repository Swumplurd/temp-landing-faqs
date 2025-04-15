function toggleCollapsePlatform(element) {
  // Alternar la clase 'visible' para el colapso y expansión del contenido
  element.classList.toggle('visible');
}

function toggleModalBackdrop(show) {
  let backdrop = document.querySelector('.modal-backdrop');

  // Si no existe un backdrop, créalo
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade';
    document.body.appendChild(backdrop);
  }

  // Alternar la visibilidad del backdrop
  if (show) {
    backdrop.classList.remove('fade');
    backdrop.classList.add('show');
  } else {
    backdrop.classList.remove('show');
    backdrop.classList.add('fade');
  }
}

function buildPlatformModalContent({
  idproducto,
  nombreBeneficio,
  idBeneficio,
  imagenPrincipal,
  logoBeneficio,
  descripcion,
  canales = []
}) {
  // Crear el contenedor principal para el contenido del modal
  const content = document.createElement("div");
  content.className = "content-class"; // Aquí deberías poner las clases adecuadas para este contenedor

  // Crear el contenedor interno para los elementos del modal
  const contentInner = document.createElement("div");
  contentInner.className = "col-12 d-flex my-1 p-0 flex-row flex-wrap pos-relative";

  // Crear y añadir la imagen principal
  const image = document.createElement("img");
  image.className = "img-channel";
  image.src = imagenPrincipal;
  image.alt = nombreBeneficio;

  // Crear y añadir el logo
  const logo = document.createElement("img");
  logo.className = "stream-modal-logo";
  logo.src = logoBeneficio;
  logo.alt = nombreBeneficio;

  // Crear y añadir el botón 'Conoce más'
  const conoceMasButton = document.createElement("button");
  conoceMasButton.className = "btn btn-sinopsis collapse-button";
  conoceMasButton.textContent = "Conoce más";

  // Crear el contenedor para la descripción del canal
  const channelDescription = document.createElement("div");
  channelDescription.id = `desc-${idproducto}-${idBeneficio}`;
  channelDescription.className = "channel-description";

  // Crear y añadir el título de la descripción del canal
  const h6 = document.createElement("h6");
  h6.textContent = nombreBeneficio;

  // Crear y añadir el párrafo de la descripción del canal
  const p = document.createElement("p");
  p.textContent = descripcion;

  // Agregar elementos de descripción al contenedor de descripción
  channelDescription.appendChild(h6);
  channelDescription.appendChild(p);

  // Función para alternar la visibilidad del contenido colapsable
  conoceMasButton.onclick = function() {
    toggleCollapsePlatform(channelDescription);
  };

  // Añadir elementos al contenedor interno
  contentInner.appendChild(image);
  contentInner.appendChild(logo);
  contentInner.appendChild(conoceMasButton);
  // Añadir el contenedor de descripción al contenedor interno
  contentInner.appendChild(channelDescription);

  // Añadir el contenedor interno al contenedor principal
  content.appendChild(contentInner);

  if (canales.length > 0) {

    const titleElement = document.createElement("p");
    titleElement.textContent = "Incluye Canales de TV";

    // Aplicar los estilos a la etiqueta <p>
    titleElement.style.color = "#FFF";
    titleElement.style.fontSize = "1.0rem";
    titleElement.style.fontWeight = "900";
    titleElement.style.padding = "5px";
    titleElement.style.marginBottom = "0";
    titleElement.style.textAlign = "left";

    const canalesContainer = document.createElement("div");
    canalesContainer.className = "canales-container";
  
     // Añadir la etiqueta <p> al contenedor de contenido
     content.appendChild(titleElement);

    canales.forEach(canal => {
      const channelContent = buildChannelContent(canal);
      canalesContainer.appendChild(channelContent);
    });
  
    content.appendChild(canalesContainer);
  }

  return content;
}



function buildChannelContent({
  idBeneficio,
  nombreBeneficio,
  imagenPrincipal,
  logoBeneficio,
  descripcion
}) {
  const contentInner = document.createElement("div");
  contentInner.className = "col-12 d-flex my-1 p-0 flex-row flex-wrap pos-relative";

  if(idBeneficio==='FOXSPORTS'){
    contentInner.style.height = "10em";
  }

  const image = document.createElement("img");
  image.className = "img-channel";
  image.src = imagenPrincipal;
  image.alt = nombreBeneficio;

  const logo = document.createElement("img");
  logo.className = "stream-modal-logo";
  logo.src = logoBeneficio;
  logo.alt = nombreBeneficio;

  const conoceMasButton = document.createElement("button");
  conoceMasButton.className = "btn btn-sinopsis collapse-button";
  conoceMasButton.textContent = "Conoce más";

  const channelDescription = document.createElement("div");
  channelDescription.id = `desc-${idBeneficio}`;
  channelDescription.className = "channel-description";

  const h6 = document.createElement("h6");
  h6.textContent = nombreBeneficio;

  const p = document.createElement("p");
  p.textContent = descripcion;

  channelDescription.appendChild(h6);
  channelDescription.appendChild(p);

  conoceMasButton.onclick = function() {
    toggleCollapsePlatform(channelDescription);
  };

  contentInner.appendChild(image);
  contentInner.appendChild(logo);
  contentInner.appendChild(conoceMasButton);
  contentInner.appendChild(channelDescription);

  return contentInner;
}

const modalContainer = document.getElementById('modal-container');
data.paquetes[0].productos_beneficios.forEach(beneficio => {
  modalContainer.appendChild(buildPlatformModalContent(beneficio));
});
