function buildPackageModalAccordionItem({
  idproducto,
  nombreBeneficio,
  idBeneficio,
  imagenPrincipal,
  logoBeneficio,
  descripcion,
  canales
}) {
  // Create an accordion item
  const accordionItem = document.createElement("div");
  accordionItem.className = "accordion-item";

  // Create the heading for the accordion item
  const heading = document.createElement("h2");
  heading.className = "accordion-header";

  // Create the button within the heading
  const button = document.createElement("button");
  button.className = "accordion-button collapsed";
  button.type = "button";
  button.onclick = () => toggleCollapse(content); // Add click event to toggle collapse

  // Set up the button title
  const title = document.createElement("div");
  title.className = "col-4 accordion-title";
  title.textContent = nombreBeneficio;
  button.appendChild(title); // Append the title to the button
  heading.appendChild(button); // Append the button to the heading

  // Create the content section for the accordion item
  const content = document.createElement("div");
  content.className = "accordion-collapse collapse";
  content.style.display = "none"; // Start with content collapsed

  // Add content inner elements - you'd need to replicate the structure for each channel if canales is not empty
  content.appendChild(createContentInner(idproducto, nombreBeneficio, idBeneficio, imagenPrincipal, logoBeneficio, descripcion));

  // Append the heading and content to the accordion item
  accordionItem.appendChild(heading);
  accordionItem.appendChild(content);

  // Return the complete accordion item
  return accordionItem;
}

function createContentInner(idproducto, nombreBeneficio, idBeneficio, imagenPrincipal, logoBeneficio, descripcion) {
  // Create the inner content
  const contentInner = document.createElement("div");
  contentInner.className = "col-12 d-flex my-1 p-0 d-flex flex-row flex-wrap pos-relative";

  // Create the image
  const image = document.createElement("img");
  image.className = "img-channel";
  image.src = imagenPrincipal;
  image.alt = nombreBeneficio;

  // Create the logo
  const logo = document.createElement("img");
  logo.className = "stream-modal-logo";
  logo.src = logoBeneficio;
  logo.alt = nombreBeneficio;

  // Función para alternar la clase 'visible'
  function toggleCollapse(element) {
    // Comprobamos si el elemento ya está visible
    if (element.classList.contains('visible')) {
      // Si está visible, removemos la clase para ocultarlo
      element.classList.remove('visible');
    } else {
      // Si no está visible, agregamos la clase para mostrarlo
      element.classList.add('visible');
    }
  }

  // Create the description
  const descriptionDiv = document.createElement("div");
  descriptionDiv.className = "channel-description";

  const h6 = document.createElement("h6");
  h6.textContent = nombreBeneficio;

  const p = document.createElement("p");
  p.textContent = descripcion;

  descriptionDiv.appendChild(h6);
  descriptionDiv.appendChild(p);

  // Append all elements to the contentInner
  contentInner.appendChild(image);
  contentInner.appendChild(logo);
  contentInner.appendChild(descriptionDiv);

  // Create and append the 'Conoce más' button
  const conoceMasButton = document.createElement("button");
  conoceMasButton.className = "btn btn-sinopsis";
  conoceMasButton.textContent = "Conoce más";
  // Asignas el evento click al botón para que llame a la función 'toggleCollapse'
  conoceMasButton.onclick = () => toggleCollapse(descriptionDiv);
  contentInner.appendChild(conoceMasButton);

  return contentInner;
}

function toggleCollapse(element) {
  // This function toggles the display style of the given element
  const isCollapsed = element.style.display === "none";
  element.style.display = isCollapsed ? "block" : "none";
}