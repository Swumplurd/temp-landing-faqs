function buildPlatformCard({
    //   idproducto,
    nombre,
    precio,
    imagen,
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
      "p-2"
    );
  
    // Create the title paragraph
    const title = document.createElement("p");
    title.classList.add("my-1", "title-platform", "text-left", "px-2");
    title.textContent = "PLATAFORMA";
  
    // Create the inner container with platform details
    const platformDetails = document.createElement("div");
    platformDetails.classList.add(
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "gap-4"
    );
  
    // Create the platform logo
    const platformLogoContainer = document.createElement("div");
    platformLogoContainer.classList.add("p-0", "packNew-logos-platform");
  
    const platformLogo = document.createElement("img");
    platformLogo.src = imagen;
    platformLogo.alt = nombre.toLowerCase();
    platformLogoContainer.appendChild(platformLogo);
  
    // Create the pricing and checkbox container
    const pricingContainer = document.createElement("div");
    pricingContainer.classList.add(
      "d-flex",
      "p-0",
      "justify-content-start",
      "align-items-center",
      "title-packs"
    );
  
    const price = document.createElement("h2");
    price.classList.add("m-0", "price-platform");
    price.innerHTML = `<span>$</span>${precio}`;
  
    const priceSuffix = document.createElement("div");
    const priceSuffixParagraph1 = document.createElement("p");
    priceSuffixParagraph1.classList.add("mb-0", "title-platform", "lh-1");
    priceSuffixParagraph1.textContent = "mxn";
    const priceSuffixParagraph2 = document.createElement("p");
    priceSuffixParagraph2.classList.add("m-0", "pack-price-thanks", "fw-bold");
    priceSuffixParagraph2.textContent = "al mes";
  
    priceSuffix.appendChild(priceSuffixParagraph1);
    priceSuffix.appendChild(priceSuffixParagraph2);
  
    pricingContainer.appendChild(price);
    pricingContainer.appendChild(priceSuffix);
  
    const checkboxContainer = document.createElement("div");
    checkboxContainer.classList.add(
      "d-flex",
      "justify-content-end",
      "checkbox",
      "px-0",
      "mb-3"
    );
  
    const checkboxLabel = document.createElement("label");
    checkboxLabel.classList.add("span");
    checkboxLabel.setAttribute("for", "check-2");
  
    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.id = "check-2";
    checkboxInput.classList.add("check");
  
    checkboxContainer.appendChild(checkboxLabel);
    checkboxContainer.appendChild(checkboxInput);
  
    // Create the "VER DETALLE" button
    const detailButton = document.createElement("button");
    detailButton.type = "button";
    detailButton.classList.add("btn-channelsModal", "my-2");
    detailButton.setAttribute("data-bs-toggle", "modal");
    detailButton.setAttribute("data-bs-target", "#"); // Add the modal target as needed
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
      "btn-subscribe"
    );
  
    const subscribeLink = document.createElement("a");
    subscribeLink.href = "https://micuenta.mvshub.com.mx/registro";
    subscribeLink.target = "_blank";
    subscribeLink.textContent = "Añadir al carrito 2";
  
    subscribeButton.appendChild(subscribeLink);
    subscribeButtonContainer.appendChild(subscribeButton);
  
    // Append the created elements to their respective parent elements
    platformDetails.appendChild(platformLogoContainer);
    platformDetails.appendChild(pricingContainer);
    platformDetails.appendChild(checkboxContainer);
  
    container.appendChild(title);
    container.appendChild(platformDetails);
    container.appendChild(detailButton);
    container.appendChild(subscribeButtonContainer);
  
    // Append the main container to the document body or another parent element
    return container;
  }
  
  function buildSpecialPackageCard({
    idproducto,
    nombre,
    precio,
    beneficios,
    footer,
    canales
  }) {
    // Create the card container
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card", "cardPack-stream", "bg-white", "py-2");
    cardContainer.id = idproducto;
  
    // Create the card header
    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-Header");
  
    // Create the checkbox container
    const checkboxContainer = document.createElement("div");
    checkboxContainer.classList.add("checkbox-container");
  
    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.id = "checkStream";
    checkboxInput.classList.add("check");
    checkboxInput.style.right = "0.5em";
  
    const checkboxLabel = document.createElement("label");
    checkboxLabel.classList.add("span");
    checkboxLabel.setAttribute("for", "checkStream");
  
    checkboxContainer.appendChild(checkboxInput);
    checkboxContainer.appendChild(checkboxLabel);
  
    // Create the title and subtitle
    const packageTitle = document.createElement("p");
    packageTitle.classList.add(
      "text-uppercase",
      "fw-light",
      "pt-3",
      "mb-0",
      "f10mob"
    );
    packageTitle.textContent = "Paquete";
  
    const packageSubtitle = document.createElement("h3");
    packageSubtitle.classList.add(
      "text-uppercase",
      "fw-bold",
      "f21",
      "orangeColor"
    );
    packageSubtitle.textContent = nombre;
  
    // Append the checkbox and titles to the card header
    cardHeader.appendChild(checkboxContainer);
    cardHeader.appendChild(packageTitle);
    cardHeader.appendChild(packageSubtitle);
  
    // Create the card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-Body", "px-4");
  
    // Create channel information
    const channelInfoTitle = document.createElement("p");
    channelInfoTitle.classList.add("fw-bold", "mt-2", "mb-1", "f22");
    channelInfoTitle.textContent = canales + " canales de TV";
  
    const channelInfoDescription = document.createElement("p");
    /*channelInfoDescription.textContent = beneficios.map(
      (beneficio, index) =>
        `${beneficio}${index + 1 === beneficios.length ? "" : " | "}`
    );*/
    channelInfoDescription.textContent = `Entretenimiento | Conocimiento\r\nEstilo de vida | Películas | Deportes\r\nNoticias | Religión | Novelas\r\nInfantil | Música`;
    channelInfoDescription.style ="white-space:pre;"
    channelInfoDescription.classList.add("mb-3", "d-none", "d-md-block");
  
    // Create "Incluye" text
    const incluyeText = document.createElement("small");
    incluyeText.textContent = "Incluye";
    incluyeText.classList.add("f10mob");
  
    // Create the feature section
    const featureSection = document.createElement("div");
    featureSection.classList.add("d-flex", "align-items-center", "gap-2", "my-2");
  
    const featureImage = document.createElement("img");
    featureImage.src = "assets/grabacion/replaytv.svg";
    featureImage.alt = "replay tv";
  
    const featureDescription = document.createElement("p");
    featureDescription.textContent =
      "Ve tus programas de TV hasta por 7 días después de su transmisión";
    featureDescription.classList.add("mb-0", "f14");
  
    featureSection.appendChild(featureImage);
    featureSection.appendChild(featureDescription);
  
    // Create "VER CANALES" button
    const viewChannelsButton = document.createElement("button");
    viewChannelsButton.type = "button";
    viewChannelsButton.classList.add("btn-channelsModal", "my-3");
    viewChannelsButton.setAttribute("data-bs-toggle", "modal");
    viewChannelsButton.setAttribute("data-bs-target", "#exampleModal");
    viewChannelsButton.style.fontSize = "18px";
    viewChannelsButton.textContent = "VER CANALES";
  
    // Create pricing section
    const pricingSection = document.createElement("div");
    pricingSection.classList.add(
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "gap-1"
    );
  
    const price = document.createElement("div");
    price.classList.add("f58", "fw-bold");
    price.textContent = `$${precio}`;
  
    const priceSuffix = document.createElement("div");
    const priceSuffixParagraph1 = document.createElement("p");
    priceSuffixParagraph1.classList.add("lh-1", "mb-0", "f10mob");
    priceSuffixParagraph1.textContent = "mxn";
    const priceSuffixParagraph2 = document.createElement("p");
    priceSuffixParagraph2.classList.add("mb-0", "f10mob");
    priceSuffixParagraph2.innerHTML = "<b>al mes</b>";
  
    priceSuffix.appendChild(priceSuffixParagraph1);
    priceSuffix.appendChild(priceSuffixParagraph2);
  
    pricingSection.appendChild(price);
    pricingSection.appendChild(priceSuffix);
  
    // Create subscription button
    const subscribeButtonContainer = document.createElement("div");
    subscribeButtonContainer.classList.add(
      "mt-3",
      "mb-4",
      "btn",
      "rounded-pill",
      "text-uppercase",
      "text-white",
      "btn-subscribe"
    );
  
    const subscribeButton = document.createElement("a");
    subscribeButton.href = "https://micuenta.mvshub.com.mx/registro";
    subscribeButton.target = "_blank";
    subscribeButton.textContent = "Añadir al carrito 1";
  
    subscribeButtonContainer.appendChild(subscribeButton);
  
    cardBody.appendChild(channelInfoTitle);
    cardBody.appendChild(channelInfoDescription);
    cardBody.appendChild(incluyeText);
    cardBody.appendChild(featureSection);
    cardBody.appendChild(viewChannelsButton);
    cardBody.appendChild(pricingSection);
    cardBody.appendChild(subscribeButtonContainer);
  
    cardContainer.appendChild(cardHeader);
    cardContainer.appendChild(cardBody);
  
    return cardContainer;
  }
  
  function buildPackageCard({
    idproducto,
    nombre,
    productos_beneficios,
    precio,
    precio_obsoleto,
  }) {
    // Create the card container
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card", "cardPack-platforms", "bg-white", "py-2");
    cardContainer.id = idproducto;
  
    // Create the card header
    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-Header");
  
    // Create the radio input and label
    const radioInputContainer = document.createElement("div");
    radioInputContainer.classList.add("radiopqt");
  
    const radioInput = document.createElement("input");
    radioInput.id = "radio-1";
    radioInput.classList.add("radiopqtInput");
    radioInput.setAttribute("name", "paquetes");
    radioInput.setAttribute("type", "radio");
    radioInput.setAttribute("onclick", "active()");
  
    const radioLabel = document.createElement("label");
    radioLabel.classList.add("label-radio");
    radioLabel.setAttribute("for", "radio-1");
  
    const radioSpan = document.createElement("span");
  
    radioInputContainer.appendChild(radioInput);
    radioInputContainer.appendChild(radioSpan);
    radioInputContainer.appendChild(radioLabel);
  
    // Create the title and subtitle
    const packageTitle = document.createElement("p");
    packageTitle.classList.add(
      "text-uppercase",
      "fw-light",
      "pt-3",
      "mb-0",
      "f10mob"
    );
    packageTitle.textContent = "Paquete";
  
    const packageSubtitle = document.createElement("h3");
    packageSubtitle.classList.add(
      "text-uppercase",
      "fw-bold",
      "f21",
      "purpleColor"
    );
    packageSubtitle.textContent = nombre;
  
    // Append the radio input, title, and subtitle to the card header
    cardHeader.appendChild(radioInputContainer);
    cardHeader.appendChild(packageTitle);
    cardHeader.appendChild(packageSubtitle);
  
    // Create the card body
    const cardBody = document.createElement("div");
    cardBody.classList.add(
      "card-Body",
      "d-flex",
      "flex-column",
      "align-items-center"
    );
  
    // Create platform logos
    const platformLogosContainer = document.createElement("div");
    if(productos_beneficios.length <=6){
      platformLogosContainer.classList.add( 
        "d-flex",
        "flex-wrap",
        "gap-2",
        "platformsPacks",
        "my-3",
        "px-3",
        "px-md-4"
      );
      productos_beneficios.forEach(
        ({ idBeneficio, nombreBeneficio, imagenBeneficio }) => {
          const logo = document.createElement("img");
          logo.id = idBeneficio;
          logo.alt = nombreBeneficio;
          logo.src = imagenBeneficio;
          platformLogosContainer.appendChild(logo);
        }
      );
    }
    else{
      platformLogosContainer.classList.add(
      "d-flex",
      "flex-wrap",
      "gap-2",
      "platformsPacks",
      "mt-3",
      "mb-2",
      "px-3"
      );
      productos_beneficios.forEach(
        ({ idBeneficio, nombreBeneficio, imagenBeneficio }) => {
          const logo = document.createElement("img");
          logo.classList.add("img-small")
          logo.id = idBeneficio;
          logo.alt = nombreBeneficio;
          logo.src = imagenBeneficio;
          platformLogosContainer.appendChild(logo);
        }
      );
    }
    
  
    
  
    // Create "VER DETALLE" button
    const viewDetailButton = document.createElement("button");
    viewDetailButton.type = "button";
    viewDetailButton.classList.add("btn-channelsModal", "my-3");
    viewDetailButton.setAttribute("data-bs-toggle", "modal");
    viewDetailButton.setAttribute("data-bs-target", "#"); // Add the modal target as needed
    viewDetailButton.textContent = "VER DETALLE";
  
    // Create pricing and savings section
    const pricingSection = document.createElement("div");
    pricingSection.classList.add("d-flex", "flex-column", "align-items-center");
  
    const priceContainer = document.createElement("div");
    priceContainer.classList.add(
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "gap-1",
      "mt-5"
    );
  
    const price = document.createElement("h3");
    price.classList.add("mb-0", "mt-3", "f58", "fw-bold");
    price.textContent = `$${precio}`;
  
    const priceSuffix = document.createElement("div");
    const priceSuffixParagraph1 = document.createElement("p");
    priceSuffixParagraph1.classList.add("lh-1", "mt-3", "mb-0");
    priceSuffixParagraph1.textContent = "mxn";
    const priceSuffixParagraph2 = document.createElement("p");
    priceSuffixParagraph2.classList.add("mb-0", "f10mob");
    priceSuffixParagraph2.innerHTML = "<b>al mes</b>";
  
    priceSuffix.appendChild(priceSuffixParagraph1);
    priceSuffix.appendChild(priceSuffixParagraph2);
  
    priceContainer.appendChild(price);
    priceContainer.appendChild(priceSuffix);
  
    const priceSeparator = document.createElement("hr");
    priceSeparator.classList.add("hr-price", "w-75", "my-2");
  
    const priceComparison = document.createElement("p");
    priceComparison.classList.add("f14", "my-1");
    priceComparison.textContent = `Por separado pagarías $${precio_obsoleto}/al mes`;
  
    const priceSavings = document.createElement("p");
    priceSavings.classList.add("f18", "mb-1", "fw-bold", "ahorroMvs");
    priceSavings.innerHTML = `Con <span class="fw-normal">mvs</span>hub ahorras $${
      precio_obsoleto - precio
    }/al mes`;
  
    pricingSection.appendChild(priceContainer);
    pricingSection.appendChild(priceSeparator);
    pricingSection.appendChild(priceComparison);
    pricingSection.appendChild(priceSavings);
  
    // Create subscription button
    const subscribeButtonContainer = document.createElement("div");
    subscribeButtonContainer.classList.add(
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "px-4",
      "mt-2",
      "mb-3"
    );
  
    const subscribeButton = document.createElement("div");
    subscribeButton.classList.add(
      "btn",
      "rounded-pill",
      "text-uppercase",
      "text-white",
      "btn-subscribe"
    );
  
    const subscribeLink = document.createElement("a");
    subscribeLink.href = "https://micuenta.mvshub.com.mx/registro";
    subscribeLink.target = "_blank";
    subscribeLink.textContent = "Añadir al carrito 3";
  
    subscribeButton.appendChild(subscribeLink);
    subscribeButtonContainer.appendChild(subscribeButton);
  
    // Append the created elements to their respective parent elements
    cardBody.appendChild(platformLogosContainer);
    //Hack for entretenimiento más
    if(idproducto === 8112){
      const hack = document.createElement("img");
      hack.classList.add(
      "img-small",
      "mx-1",
      "mb-2",
      "d-none",
      "d-xl-block",
      );
      hack.alt="cindie";
      hack.style="visibility: hidden;";
      hack.src="assets/plataformas/cindie.webp"
      cardBody.appendChild(hack);
    }
    //Hack for familiar
    if(idproducto === 8111){
      const hackfam = document.createElement("img");
      hackfam.classList.add(
      "img-small",
      "mx-1",
      "mb-2",
      "d-none",
      "d-xl-block",
      );
      hackfam.alt="cindie";
      hackfam.style="visibility: hidden;";
      hackfam.src="assets/plataformas/cindie.webp"
      platformLogosContainer.appendChild(hackfam);
    }
    cardBody.appendChild(viewDetailButton);
    cardBody.appendChild(pricingSection);
    cardBody.appendChild(subscribeButtonContainer);
  
    cardContainer.appendChild(cardHeader);
    cardContainer.appendChild(cardBody);
  
    // Append the card container to the document body or another parent element
    return cardContainer;
  }
  