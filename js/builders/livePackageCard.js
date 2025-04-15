function buildLivePackageCard({
  idproducto,
  nombre,
  precio,
  beneficios,
  footer,
  canales,
  clave_producto,
  tipo_producto,
  precio_obsoleto
}) {
  const parentContainer = document.createElement("div");
  parentContainer.classList.add("card-parent")
  // Create the card container
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card", "cardPack-stream", "bg-white", "py-2");
  cardContainer.id = idproducto;

  //se crea el anuncio de bloqueo de NFL Pass
  const anuncioBloqueoNfl = document.createElement("div")
  anuncioBloqueoNfl.classList.add("back-opacity-nfl","package-live-disabled","d-none")
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
  anuncioBloqueoNfl.appendChild(anuncioBloqueo)

  //Card desabilitada porque ya está activa en el paquete seleccionado
  const cardDisabled = document.createElement("div");
  cardDisabled.classList.add("back-opacity", "package-live-disabled", "d-none");
  cardDisabled.id = "card-package-live-disabled-" + clave_producto;

  const cardDisabledContent = document.createElement("div");
  cardDisabledContent.classList.add("add-ur-pack");

  const cardDisabledText = document.createElement("p");
  cardDisabledText.classList.add("mb-0");
  const disabledText = document.createTextNode("Incluido en el paquete que seleccionaste");
  cardDisabledText.appendChild(disabledText);

  cardDisabledContent.appendChild(cardDisabledText);
  cardDisabled.appendChild(cardDisabledContent);
  cardContainer.appendChild(cardDisabled);
  cardContainer.appendChild(anuncioBloqueoNfl)




  // Create the card header
  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-Header");


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
  cardHeader.appendChild(packageTitle);
  cardHeader.appendChild(packageSubtitle);

  // Create the card body
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-Body", "px-4");

  // Create channel information
  const channelInfoTitle = document.createElement("p");
  channelInfoTitle.classList.add("fw-bold", "mt-2", "mb-1", "f22");
  channelInfoTitle.textContent = canales + " canales de TV";



  // Create "Incluye" text
  const incluyeText = document.createElement("small");
  incluyeText.textContent = "Incluye";
  incluyeText.classList.add("f10mob", "d-block");

  // Create the feature section
  const featureSection = document.createElement("div");
  featureSection.classList.add("d-flex", "align-items-center", "gap-2", "my-2");

  const featureImage = document.createElement("img");
  featureImage.src = "assets/grabacion/replaytv.svg";
  featureImage.alt = "replay tv";

  const featureDescription = document.createElement("p");
  featureDescription.textContent =
    "Pausa y repite tus programas de TV";
  featureDescription.classList.add("mb-0", "f14");

  featureSection.appendChild(featureImage);
  featureSection.appendChild(featureDescription);

  const bottomContainer = document.createElement("div");
  bottomContainer.classList.add("d-flex", "flex-column", "align-items-center", "price-Container");

  // Create "VER CANALES" button
  const viewChannelsButton = document.createElement("a");
  viewChannelsButton.type = "button";
  viewChannelsButton.classList.add("btn-channelsModal", "my-3", "justify-content-center");
  viewChannelsButton.style.textDecoration = "none";
  viewChannelsButton.id = `modal-btn-${idproducto}`;
  viewChannelsButton.style.fontSize = "18px";
  viewChannelsButton.innerHTML = '<span class="material-symbols-outlined">visibility</span> <span style="text-decoration:underline;">VER TODOS LOS CANALES</span>';

  // Add click event listener to the button
  viewChannelsButton.addEventListener("click", function () {
    const modalId = `my-modal-${idproducto}`;
    const modal = document.getElementById(modalId);

    // Open the modal
    if (modal) {
      modal.style.display = 'block';

      // Crear y mostrar el div modal-backdrop
      const backdrop = document.createElement('div');
      backdrop.classList.add('modal-backdrop', 'fade');
      document.body.appendChild(backdrop);
      setTimeout(() => backdrop.classList.add('show'), 10);

      // Close modal when clicking outside of the modal content
      window.addEventListener('click', function (event) {
        if (event.target === modal) {
          closeModal(modalId);
        }
      });

      // Close modal when clicking the close button
      const closeButton = modal.querySelector('.btn-close');
      if (closeButton) {
        closeButton.addEventListener('click', function () {
          closeModal(modalId);
        });
      }

      const newCloseButton = modal.querySelector('.modal-btn');
      if (newCloseButton) {
        newCloseButton.addEventListener('click', function () {
          closeModal(modalId);
        });
      }

    }
  });

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';

    // Eliminar el div modal-backdrop
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.classList.remove('show');
      setTimeout(() => backdrop.remove(), 150); // Ajusta este tiempo según la animación
    }
  }

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
  );

  const subscribeButton = document.createElement("button");
  subscribeButton.classList.add("btn-subscribe", "channel-button-subscribe");
  subscribeButton.id = `subscribeButton-${clave_producto}`;
  subscribeButton.textContent = "Añadir al carrito";

  [subscribeButton].forEach(e => {
    e.addEventListener("click", async () => {
      if (subscribeButton.textContent === "Añadir al carrito") {
        //enabledCardPackgesTV();
        enabledCardPackges("package-live-disabled", ".pck-tv-button-subscribe");     
        await setShoppingCartItem(type = "channel", clave_producto, nombre, precio, `#subscribeButton-${clave_producto}`, null, null, tipo_producto, precio_obsoleto - precio);
      } else {
        await removeShoppingCartItem(clave_producto, `#subscribeButton-${clave_producto}`, "channel")
        unblockByPrecioNfl();
      }
    })
  })
  subscribeButtonContainer.appendChild(subscribeButton);


  const cardFooter = document.createElement("div");
  cardFooter.id = `card_footer_${clave_producto}`
  const cardFooterText = document.createElement("div");
  const cardFooterButton = document.createElement("button");

  cardFooter.classList.add("d-flex", "flex-column", "align-items-center", "card-footer", "d-none");
  cardFooterText.classList.add("card-footer-text");
  cardFooterButton.classList.add("card-footer-button");

  cardFooterText.innerHTML = "AÑADE UN PAQUETE DE <strong>PLATAFORMAS</strong></br> Y OBTÉN UN <strong>DESCUENTO ADICIONAL<strong>";
  cardFooterButton.innerText = "Agregar";

  cardFooter.appendChild(cardFooterText);
  cardFooter.appendChild(cardFooterButton);



  cardFooterButton.addEventListener("click", () => {
    document.getElementById("platforms-pack-selector").click()
    document.getElementById("platforms-pack-selector").scrollIntoView({ behavior: "smooth" })
  })

  const dummyContainer = document.createElement("div");
  dummyContainer.classList.add("dummy-space")


  cardBody.appendChild(channelInfoTitle);
  cardBody.appendChild(viewChannelsButton);
  cardBody.appendChild(incluyeText);
  cardBody.appendChild(featureSection);
  bottomContainer.appendChild(pricingSection);
  bottomContainer.appendChild(subscribeButtonContainer);
  cardBody.appendChild(bottomContainer);
  cardContainer.appendChild(cardHeader);
  cardContainer.appendChild(cardBody);
  parentContainer.appendChild(cardContainer)
  parentContainer.appendChild(cardFooter);
  parentContainer.appendChild(dummyContainer);

  return parentContainer;
}