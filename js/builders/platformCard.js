function buildPlatformCard({
  idproducto,
  nombre,
  precio,
  imagen,
  clave_producto,
  tipo_producto,
  precio_obsoleto,
  productos_asociados
}) {

   

  // Create the main container
  const container = document.createElement("div");
  container.classList.add(
    "container-platform",
    "d-flex",
    "flex-column",
    "align-items-center",
    "justify-content-center",
    "gap-1",
    
  );

  document.getElementsByName("subscription-disney").forEach(el => el.addEventListener("click", () => {
    document.getElementsByClassName("platform-offer-disney")[0].classList.remove("d-none")
  }))

  if (idproducto === 6) {
    container.style.height = "fit-content"
  }
  if (idproducto === 9 && window.innerWidth >= 1430) {
    container.style.height = "fit-content"
  }

  container.setAttribute("id", `product-id-${idproducto}`);


  // Create the title paragraph
  const title = document.createElement("p");
  title.classList.add("my-2", "title-platform", "text-left", "px-3");
  title.textContent = "PLATAFORMA A LA CARTA";

  // Create the inner container with platform details
  const platformDetails = document.createElement("div");
  platformDetails.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "gap-3"
  );

  //create anuncio de bloqueo para los demás productos al seleccionar  NFL Pass
  const anuncioBloqueoSpace = document.createElement("div")
  anuncioBloqueoSpace.classList.add("back-opacity-nfl","package-live-disabled","d-none")
  const anuncioBloqueo = document.createElement("div")
  anuncioBloqueo.classList.add("add-ur-pack","d-flex","align-items-center","text-nfl")
  anuncioIcon = document.createElement("span")
  anuncioIcon.classList.add("material-symbols-outlined","look-nfl")
  anuncioIcon.innerHTML = "lock"
  anuncio = document.createElement("p")
  anuncio.classList.add("mb-0")
  anuncio.innerHTML = "Esta oferta no está disponible con GAME PASS"

  anuncioBloqueo.appendChild(anuncioIcon)
  anuncioBloqueo.appendChild(anuncio)
  anuncioBloqueoSpace.appendChild(anuncioBloqueo)

  //create anuncio de bloqueo para NFL Pass cuando se selecciona otra oferta
  const anuncioBloqueoNflSpace = document.createElement("div")
  anuncioBloqueoNflSpace.classList.add("back-opacity-pass","package-live-disabled","d-none")
  const anuncioBloqueoNfl = document.createElement("div")
  anuncioBloqueoNfl.classList.add("add-ur-pack","d-flex","align-items-center","text-nfl")
  anuncioIconNfl = document.createElement("span")
  anuncioIconNfl.classList.add("material-symbols-outlined","look-nfl")
  anuncioIconNfl.innerHTML = "lock"
  anuncioNfl = document.createElement("p")
  anuncioNfl.classList.add("mb-0")
  anuncioNfl.innerHTML = "GAME PASS no está disponible con la oferta seleccionada"

  anuncioBloqueoNfl.appendChild(anuncioIconNfl)
  anuncioBloqueoNfl.appendChild(anuncioNfl)
  anuncioBloqueoNflSpace.appendChild(anuncioBloqueoNfl)

  //Create the selection space
  var platformRadioContainer = ""
  if(productos_asociados != undefined){

    platformRadioContainer = document.createElement("div")
    platformRadioContainer.classList.add("d-flex","justify-content-center","align-items-center","p-2","cont-nfl","look-nfl")

    contador = 1
    productos_asociados.forEach((producto) =>{

      const platformRadioDiv = document.createElement("div")
      platformRadioDiv.classList.add("col-6","p-0")

      const platformLabel = document.createElement("label")
      platformLabel.classList.add("option-label","d-flex","align-items-center","align-left-nfl")

      const patformTitleRadio = document.createElement("span")
      patformTitleRadio.classList.add("custom-radio","ml-1","span-text-nfl")
      patformTitleRadio.innerHTML = String(producto.nombre_web).replace("NFL Pass","")
  
      const platformRadioSpace = document.createElement("span")
      platformRadioSpace.classList.add("radio-custom")

      if (producto.nombre.includes("NFL")) {
        const platformRadio = document.createElement("input")
        platformRadio.classList.add("radio-nfl","radio-container")
        platformRadio.type = "radio"
        platformRadio.name = "subscription"
        platformRadio.value = producto.nombre
        if(contador == 1){
          platformRadio.checked = true
        }
        platformLabel.appendChild(patformTitleRadio)
        platformLabel.appendChild(platformRadio)
        platformLabel.appendChild(platformRadioSpace)
        platformRadioDiv.appendChild(platformLabel)
        platformRadioContainer.appendChild(platformRadioDiv)
        contador+=1
      } else {
        const disneyRadio = document.createElement("input")
        disneyRadio.classList.add("radio-disney","radio-container")
        disneyRadio.type = "radio"
        disneyRadio.name = "subscription-disney"
        disneyRadio.value = producto.nombre
        if(contador == 1){
          disneyRadio.checked = true
        }
        platformLabel.appendChild(patformTitleRadio)
        platformLabel.appendChild(disneyRadio)
        platformLabel.appendChild(platformRadioSpace)
        platformRadioDiv.appendChild(platformLabel)
        platformRadioContainer.appendChild(platformRadioDiv)
        contador+=1
      }

      //quita anuncio de bloqueo para este addon
      anuncioBloqueoSpace.classList.remove("back-opacity-nfl")
    })

  }
  else{
    anuncioBloqueoNflSpace.classList.remove("back-opacity-pass")
    platformRadioContainer = document.createElement("span")
  }

  // Create the platform logo
  const platformLogoContainer = document.createElement("div");
  platformLogoContainer.classList.add("col-3", "p-0");
  const platformLogoElementsContainer = document.createElement("div");
  platformLogoElementsContainer.classList.add("p-0", "packNew-logos-platform");

  const platformLogo = document.createElement("img");
  
  platformLogo.src = imagen;
  platformLogo.alt = nombre.toLowerCase();

  platformLogoElementsContainer.appendChild(platformLogo);
  /* if (nombre == "Disney+") {
    const legal = document.createElement("span")
    legal.classList.add("text-disney-legal")
    legal.innerHTML = "© 2024 Disney"
    platformLogoElementsContainer.appendChild(legal)
  } */
  platformLogoContainer.appendChild(platformLogoElementsContainer);
  // Create the pricing and checkbox container
  const pricingContainer = document.createElement("div");
  pricingContainer.classList.add(
    "d-flex",
    "p-0",
    "justify-content-start",
    "align-items-center",
    "title-packs"
  );

  const priceElementsContainer = document.createElement("div");
  priceElementsContainer.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "gap-2",
  );

  const price = document.createElement("h2");
  price.id = "precio-"+nombre
  price.classList.add("m-0", "price-platform");
  price.innerHTML = `<span>$</span>${precio}`;


  const priceSuffix = document.createElement("div");
  const priceSuffixParagraph1 = document.createElement("p");
  priceSuffixParagraph1.classList.add("mb-0", "title-platform", "lh-1");
  priceSuffixParagraph1.textContent = "mxn";
  const priceSuffixParagraph2 = document.createElement("p");
  priceSuffixParagraph2.id = "pricePost-"+nombre
  priceSuffixParagraph2.classList.add("m-0", "pack-price-thanks", "fw-bold");
  priceSuffixParagraph2.textContent = "al mes";

  priceSuffix.appendChild(priceSuffixParagraph1);
  priceSuffix.appendChild(priceSuffixParagraph2);

  priceElementsContainer.appendChild(price);
  priceElementsContainer.appendChild(priceSuffix);
  pricingContainer.appendChild(priceElementsContainer);


  const detailButton = document.createElement("button");
  detailButton.type = "button";
  detailButton.onclick = () => {
    /* Disney */
    beneficts.adicional.push(
      {
        "idproducto": 27,
        "nombreBeneficio": "Disney+",
        "descripcion": "Disney+ te ofrece entretenimiento de Disney, Pixar, Marvel, Star Wars, National Geographic y Star. Desde originales exclusivos hasta tus clásicos favoritos, para disfrutar con la mejor calidad.",
        "logoBeneficio": "https://d31nz91qboyide.cloudfront.net/mvshub/landingmvshub/modales/disney/disneyLogoModal.png",
        "imagenPrincipal": "https://d31nz91qboyide.cloudfront.net/mvshub/landingmvshub/modales/disney/disneyImgModal.jpg",
        "nombre_web": "Disney+"
      }
    )
    /* Disney */
    const aditional = beneficts.adicional.find(b => b.idproducto === idproducto);
    if (aditional) {
      document.getElementById('platformModalName').innerText = aditional.nombreBeneficio;
      const content = document.getElementById('platformModalContent');
      content.innerHTML = '';
      const contentItem = buildPlatformModalContent(aditional);
      content.appendChild(contentItem);

      // Crear y mostrar el div modal-backdrop
      const backdrop = document.createElement('div');
      backdrop.classList.add('modal-backdrop', 'fade');
      document.body.appendChild(backdrop);
      setTimeout(() => backdrop.classList.add('show'), 10);

      // Abrir el modal
      document.getElementById('platformModal').style.display = 'block';
    } else {
      console.error('No se encontró el beneficio adicional con id:', idproducto);
    }
  };
  detailButton.classList.add("btn-channelsModal", "my-2");
  detailButton.textContent = "VER DETALLE";

  // Create the subscription button
  const subscribeButtonContainer = document.createElement("div");
  subscribeButtonContainer.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "px-4"
  );

  const subscribeButton = document.createElement("div");
  subscribeButton.classList.add(
    "mb-3",
    "btn",
    "rounded-pill",
    "text-uppercase",
    "text-white",
  );

  const subscribeLink = document.createElement("button");
  subscribeLink.classList.add("btn-subscribe");
  subscribeLink.textContent = "Añadir al carrito";
  subscribeLink.id = `subscribe-button-platform-${clave_producto}`
  subscribeButton.appendChild(subscribeLink);
  subscribeButtonContainer.appendChild(subscribeButton);

  [subscribeButton].forEach(e => {
    e.addEventListener("click", async (e) => {
      e.stopPropagation()
      if (subscribeLink.textContent === "Añadir al carrito") {

        //Envía el id correspondiente del producto al carrito dependiendo del radio seleccionado en la card
        if (productos_asociados != undefined){
          const objectSelected = String(document.getElementById("precio-"+nombre).innerHTML).split(">")
          const priceShowed = objectSelected[2]
          var newName = ""
          var newClave = ""
          var newPrecio = ""
          var newObsoleto = ""
          productos_asociados.forEach(product =>{
            if (Number(product.precio) == Number(priceShowed)){
              newName = product.nombre
              newClave = product.clave_producto
              newPrecio = product.precio
              newObsoleto = product.precio_obsoleto
              return;
            }
          })
          blockUnblockOferta(true);
          await setShoppingCartItem(type = "platform", newClave, newName, newPrecio, subscribeButton.id = `#subscribe-button-platform-${clave_producto}`, null, null, tipo_producto, newObsoleto - newPrecio);
        }
        else{
          blockUnblockNfl(true);
          await setShoppingCartItem(type = "platform", clave_producto, nombre, precio, subscribeButton.id = `#subscribe-button-platform-${clave_producto}`, null, null, tipo_producto, precio_obsoleto - precio);
        }
      } else { //Quitar del carrito
        if (productos_asociados != undefined){
          const objectSelected = String(document.getElementById("precio-"+nombre).innerHTML).split(">")
          const priceShowed = objectSelected[2]
          productos_asociados.forEach(product =>{
            if (Number(product.precio) == Number(priceShowed)){
              newClave = product.clave_producto
            }
          })
          blockUnblockOferta(false);
          await removeShoppingCartItem(newClave, subscribeButton.id = `#subscribe-button-platform-${clave_producto}`, "platform")
        }
        else{
          await removeShoppingCartItem(clave_producto, subscribeButton.id = `#subscribe-button-platform-${clave_producto}`, "platform")
          unblockByPrecioNfl();
        }
      }
    })
  })
  // Append the created elements to their respective parent elements
  platformDetails.appendChild(platformLogoContainer);
  platformDetails.appendChild(pricingContainer);

  container.appendChild(anuncioBloqueoSpace)
  container.appendChild(anuncioBloqueoNflSpace)
  container.appendChild(title);
 
  container.appendChild(platformDetails);
    container.appendChild(platformRadioContainer)
  container.appendChild(detailButton);
  container.appendChild(subscribeButtonContainer);


  // Elementos específicos cuando idproducto es igual a 13
  if (idproducto === 13) {
    // Sección de descuento
    const discountSection = document.createElement("div");
    discountSection.classList.add("platform-disabled");
    discountSection.id = "disabled-product-10"; 

    const discountContent = document.createElement("div");
    discountContent.classList.add("add-ur-pack-hotgo");

    const discountText = document.createElement("p");
    discountText.classList.add("mb-0");
    discountText.innerHTML = "<strong>50% </strong>de descuento";

    discountContent.appendChild(discountText);
    discountSection.appendChild(discountContent);

    // Sección de oferta
    const offerSection = document.createElement("div");
    offerSection.classList.add("platform-offer");

    const offerText = document.createElement("p");
    offerText.innerHTML = "Obtén <strong class='text-hotgo'>50% de descuento</strong> al combinarlo con cualquier paquete de Entretenimiento";

    offerSection.appendChild(offerText);

    // Agrega las secciones de descuento y oferta al contenedor principal
    container.appendChild(discountSection);
    container.appendChild(offerSection);
  }
  /* Disney */
  if (idproducto === 27) {
    // Sección de descuento
    const discountSection = document.createElement("div");
    discountSection.classList.add("platform-disabled");
    discountSection.id = "disabled-product-10"; 

    const discountContent = document.createElement("div");
    discountContent.classList.add("add-ur-pack-disney");

    discountSection.appendChild(discountContent);
    // Sección de oferta
    const offerSection = document.createElement("div");
    offerSection.classList.add("platform-offer-disney", "d-none");
    if (nombre == "Disney+") {
      const legal = document.createElement("span")
      legal.classList.add("text-disney-legal")
      legal.innerHTML = "© 2024 Disney"
      container.appendChild(legal)
    }
    const offerText = document.createElement("p");
    offerText.innerHTML = `
      <strong id="disney-current-offer">Disney+ Estándar</strong>
      <strong id="disney-current-offer-detail" class="position-absolute d-none top-0 end-0 bg-danger text-white px-2 offer-detail">Con anuncios</strong>
      <br/>
      <span class="disney-font-offer" id="estandar-only"><span class="fw-bold">Incluye</span>: Disney, Pixar, Marvel, Star Wars, National Geographic, ESPN, <span class="disney-toggle">ESPN2,</span> ESPN3<span class="disney-toggle">, ESPN4</span> y Star</span>
      <span class="disney-toggle d-none disney-font-offer"><span class="fw-bold">Incluye</span>: Todos los canales de ESPN, torneos y eventos deportivos exclusivos. </span><br/> 
      <small>
        <span class='custom-badge'>Hasta <span id="disney-devices">2</span> dispositivos en simultáneo</span>
      </small>`;

    offerSection.appendChild(offerText);

    // Agrega las secciones de descuento y oferta al contenedor principal
    container.appendChild(discountSection);
    container.appendChild(offerSection);
    
  }
  /* Disney */

    // Elementos específicos cuando idproducto es igual a 29
    if (idproducto === 29) {
      // Sección de descuento
      const discountSection = document.createElement("div");
      discountSection.classList.add("platform-disabled");
      discountSection.id = "disabled-product-10"; 
  
      const discountContent = document.createElement("div");
      discountContent.classList.add("add-ur-pack-hotgo");
  
      const discountText = document.createElement("p");
      discountText.classList.add("mb-0");
      discountText.innerHTML = "<strong>Promoción</strong>";
  
      discountContent.appendChild(discountText);
      discountSection.appendChild(discountContent);
  
      // Sección de oferta     
      // Agrega las secciones de descuento y oferta al contenedor principal
      container.appendChild(discountSection);

    }
  








  // Append the main container to the document body or another parent element
  return container;
}

function removePlatformsDisabled() {
  const platformsDisabled = document.getElementsByClassName("platform-disabled");
  platformsDisabled.length && Array.from(platformsDisabled).forEach(platform => platform.remove());


}

async function disablePlatforms(ids) {
  // Firs remove all disabled elements if exist
  removePlatformsDisabled();

  let tempPlatform;
  // Then iterate through ids to add the disabled elements
  for (const id of ids) {

    // Create the opacity container
    const opacityContainer = document.createElement("div");
    opacityContainer.classList.add(
      "back-opacity",
      "platform-disabled"
    );
    opacityContainer.setAttribute("id", `disabled-product-${id}`)

    // Create the disabled label container
    const labelContainer = document.createElement("div");
    labelContainer.classList.add(
      "add-ur-pack"
    );

    // Create the disabled paragraph
    const title = document.createElement("p");
    title.classList.add("mb-0");
    title.textContent = "Incluido en el paquete que seleccionaste";

    labelContainer.appendChild(title);
    opacityContainer.appendChild(labelContainer);

    // Get the platform to disabled
    tempPlatform = document.getElementById(`product-id-${id}`);
    // Add the diabled element to the platform if exist
    if (tempPlatform) {
      const button = tempPlatform.querySelector("[id^=subscribe-button-platform-]");
      const platformClaveProducto = button.id.split("-")[3];
      if (calculatorProducts.plataformas.includes(platformClaveProducto)) {
        await removeShoppingCartItem(button.id.split("-")[3], "#" + button.id, "platform")
      }
      tempPlatform.appendChild(opacityContainer);
    }

  }

}


function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');

  // Eliminar el div modal-backdrop
  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) {
    backdrop.classList.remove('show');
    setTimeout(() => backdrop.remove(), 150); // Ajusta este tiempo según la animación
  }
}


document.addEventListener('DOMContentLoaded', () => {
  // Botón de cierre del modal
  document.querySelector('.btn-close').addEventListener('click', () => closeModal('platformModal'));

  // Botón "Cerrar" adicional en el modal, si existe
  const closeButtons = document.querySelectorAll('.close-modal');
  closeButtons.forEach(button => {
    button.addEventListener('click', () => closeModal('platformModal'));
  });

  // Cerrar el modal al hacer clic fuera de él
  window.addEventListener('click', (event) => {
    const modal = document.getElementById('platformModal');
    if (event.target === modal) {
      closeModal('platformModal');
    }
  });
});
