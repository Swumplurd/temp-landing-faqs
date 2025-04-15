function buildPackageAndTV({
    idproducto,
    idproducto_tv,
    nombre,
    productos_beneficios,
    precio,
    precio_obsoleto,
    pocentaje_ahorro,
    canales,
    clave_producto,
    tipo_producto
}) {

    const joinId = idproducto + '-' + idproducto_tv;

    // Crear el elemento div con la clase "card-parent"
    const cardParent = document.createElement("div");
    cardParent.classList.add("card-parent");

    // Crear el elemento div con la clase "card bg-white py-2 cardPack-recommended" y el asigna el id
    const card = document.createElement("div");
    card.classList.add("card", "bg-white", "py-2", "cardPack-recommended");
    card.id = joinId;

    // Crear el contenido del primer div "title-bundles"
    const titleBundles = document.createElement("div");
    titleBundles.classList.add("title-bundles");
    const titleParagraph = document.createElement("p");
    titleParagraph.classList.add("mb-0");
    titleParagraph.textContent = nombre;
    titleBundles.appendChild(titleParagraph);

    // Crear el contenido del segundo div "card-features"
    const cardFeatures = document.createElement("div");
    cardFeatures.classList.add("card-features");

    const featuresHeader = document.createElement("div");
    featuresHeader.classList.add("features-header");
    const featuresTitle = document.createElement("p");
    featuresTitle.classList.add("features-title");
    featuresTitle.textContent = "CANALES TV EN VIVO";
    const featuresCount = document.createElement("p");
    featuresCount.classList.add("features-count");
    featuresCount.textContent = canales + " canales de TV";
    featuresHeader.appendChild(featuresTitle);
    featuresHeader.appendChild(featuresCount);

    //Ver canales
    const featuresBody = document.createElement("div");
    featuresBody.classList.add("features-body");
    const featuresLink = document.createElement("a");
    featuresLink.href = "#";
    featuresLink.classList.add("features-link");
    featuresLink.setAttribute("data-bs-toggle", "modal");
    featuresLink.setAttribute("data-bs-target", "#my-modal-15");
    featuresLink.innerHTML = '<i class="fas fa-eye"></i> VER TODOS LOS CANALES';
    featuresLink.onclick = () => {
        const idProductoReal = idproducto_tv == "1707" ? 15 : 
        (idproducto_tv == "2333" || idproducto_tv == "2525") ? 22 : idproducto_tv;
        openModalChannels(idProductoReal);
    };

    const featuresReplay = document.createElement("div");
    featuresReplay.classList.add("features-replay");
    const replayImg = document.createElement("img");
    replayImg.src = "assets/grabacion/replaytv.webp";
    replayImg.alt = "Replay TV";
    replayImg.classList.add("features-replay-icon");
    const replayText = document.createElement("p");
    replayText.classList.add("features-replay-text");
    replayText.textContent = "Pausa y repite tus programas de TV";
    featuresReplay.appendChild(replayImg);
    featuresReplay.appendChild(replayText);

    featuresBody.appendChild(featuresLink);
    featuresBody.appendChild(featuresReplay);

    cardFeatures.appendChild(featuresHeader);
    cardFeatures.appendChild(featuresBody);

    // Crear el contenido del tercer div "card-Header-bundles"
    const cardHeaderBundles = document.createElement("div");
    cardHeaderBundles.classList.add("card-Header-bundles");
    const bundlesTitle = document.createElement("h3");
    bundlesTitle.classList.add("text-bundles", "f21");
    bundlesTitle.textContent = "PLATAFORMAS";
    cardHeaderBundles.appendChild(bundlesTitle);

    //CardBody
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-Body", "d-flex", "flex-column", "align-items-center");


    //Addons
    const platformsDiv = document.createElement("div");
    platformsDiv.classList.add("d-flex", "flex-wrap", "gap-2", "platformsPacks", "my-3", "px-4", "px-md-2", "justify-content-center", "align-content-start");

    if (idproducto == 8110 || idproducto == 8112) {
        platformsDiv.classList.remove('gap-2');
        platformsDiv.classList.add('gap-1');
        platformsDiv.classList.remove('px-md-3');
        platformsDiv.classList.add('px-md-4');
    }
    productos_beneficios.forEach(beneficio => {
        const img = document.createElement("img");
        img.id = beneficio.idBeneficio;
        img.alt = beneficio.nombreBeneficio;
        img.src = beneficio.imagenBeneficio;
        if (idproducto == 8110) {
            img.classList.add('img-etot')
        }
        if (idproducto == 8112) {
            img.classList.add('img-emas')
        }
        platformsDiv.appendChild(img);
    });

    //Ver detalle
    const buttonPlatformsModal = document.createElement("button");
    buttonPlatformsModal.type = "button";
    buttonPlatformsModal.classList.add("btn-channelsModal", "my-3", "justify-content-center");
    buttonPlatformsModal.setAttribute("data-bs-toggle", "modal");
    buttonPlatformsModal.setAttribute("data-bs-target", "#platformModal");
    buttonPlatformsModal.textContent = "VER DETALLE";
    buttonPlatformsModal.onclick = () => {
        openModalDetails('packageModal', idproducto);
    };


    //Precio mensual
    const priceContainer = document.createElement("div");
    priceContainer.classList.add("d-flex", "justify-content-center", "align-items-center", "gap-3");

    const priceDiv = document.createElement("div");
    priceDiv.classList.add("price-container");
    priceDiv.style.textAlign = "center";
    const priceHeading = document.createElement("h3");
    priceHeading.classList.add("mb-0", "mt-3", "f58", "fw-bold", "price");
    priceHeading.textContent = "$" + precio;
    const priceParagraph = document.createElement("p");
    priceParagraph.classList.add("mb-0", "f10mob", "term");
    priceParagraph.textContent = "AL MES";
    priceDiv.appendChild(priceHeading);
    priceDiv.appendChild(priceParagraph);

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


    //Porcentaje de ahorro
    const discountContainer = document.createElement("div");
    discountContainer.classList.add("d-flex", "flex-column", "align-items-center", "justify-content-center", "discount-container");
    const discountText = document.createElement("div");
    discountText.classList.add("text-white", "discount-text");
    discountText.textContent = "Ahorras";
    const discountNumber = document.createElement("div");
    discountNumber.classList.add("text-white", "discount-number");
    discountNumber.textContent = pocentaje_ahorro;
    discountContainer.appendChild(discountText);
    discountContainer.appendChild(discountNumber);

    priceContainer.appendChild(priceDiv);
    priceContainer.appendChild(discountContainer);

    //Precio sin descuento
    const ahorroParagraph = document.createElement("p");
    ahorroParagraph.classList.add("f18", "mb-1", "fw-bold", "ahorroMvs-bundles", "mt-3");
    ahorroParagraph.textContent = "Precio sin descuento ";
    const strikeThroughSpan = document.createElement("span");
    strikeThroughSpan.style.textDecoration = "line-through";
    strikeThroughSpan.textContent = "$" + precio_obsoleto;
    ahorroParagraph.appendChild(strikeThroughSpan);


    //Boton Añadir Carrito
    const subscribeButtonContainer = document.createElement("div");
    subscribeButtonContainer.classList.add("d-flex", "justify-content-center", "align-items-center", "px-2", "mt-2", "mb-3");
    const subscribeButtonDiv = document.createElement("div");
    subscribeButtonDiv.classList.add("btn", "rounded-pill", "text-uppercase", "text-white");
    const subscribeButton = document.createElement("button");
    subscribeButton.id = `subscribe-button-package-${joinId}`;
    subscribeButton.classList.add("btn-subscribe", "pck-tv-button-subscribe");
    const subscribeText = document.createTextNode("Añadir al carrito");
    subscribeButtonContainer.appendChild(subscribeButtonDiv);
    subscribeButtonDiv.appendChild(subscribeButton);
    subscribeButton.appendChild(subscribeText);

    subscribeActions(subscribeButton, idproducto, idproducto_tv, clave_producto, joinId);

    if (_netflixPackages.includes(idproducto)) {
        //Only for packages that have netflix
        const netflixContainer = document.createElement("div");
        netflixContainer.id = "ntfx_cnt_" + joinId;
        netflixContainer.classList.add("order-3", "col-12", "px-0", "netflixP","netflixPTV","d-none"); //"d-none"
        const netflixSeparator = document.createElement("div");
        netflixSeparator.classList.add("AA_footer-pack",
            "AA_pack-entre",
            "col-12",
            "text-center",
            "d-flex",
            "justify-content-center");
        netflixContainer.appendChild(netflixSeparator);
        const netflixPackContainer = document.createElement("div");
        netflixPackContainer.classList.add(
            "pack-container",
            "d-flex",
            "flex-wrap",
            "justify-content-between",
            "align-items-center",
            "AddNetflix"
        );
        const netflixCol = document.createElement("div");
        netflixCol.classList.add("col-12");
        const netflixP1 = document.createElement("p");
        netflixP1.classList.add("tit01", "text-right", "mb-0");
        netflixP1.innerHTML = 'Crece tu paquete con <span class="RojoNet">NETFLIX</span> PREMIUM';
        const netflixP2 = document.createElement("p");
        netflixP2.classList.add("tit03", "text-right");
        netflixP2.innerHTML = '<b>Calidad 4K</b> disponible hasta <b>4TV´s</b>';
        netflixCol.appendChild(netflixP1);
        netflixCol.appendChild(netflixP2);
        netflixPackContainer.appendChild(netflixCol)
        const netflixCol2 = document.createElement("div");
        netflixCol2.classList.add("col-12");
        const netflixPriceContainer = document.createElement("div");
        netflixPriceContainer.classList.add(
            "d-flex",
            "justify-content-center",
            "align-items-center",
            "gap-1",
            "mt-xl-3"
        );

        const netflixPriceNumber = document.createElement("h3");
        netflixPriceNumber.classList.add("mb-0", "f32", "fw-bold");
        netflixPriceNumber.style.marginLeft = "5px";
        netflixPriceNumber.innerText = "$80"

        const netflixPriceText = document.createElement("p");
        netflixPriceText.classList.add("lh-1", "mb-0");
        netflixPriceText.innerHTML = "mxn <br><b>al mes</b>";



        const netflixCheckboxContainer = document.createElement("div");
        netflixCheckboxContainer.classList.add(
            "d-flex",
            "align-items-center",
        );

        const netflixCheckbox = document.createElement("input");
        netflixCheckbox.id = "ntfx_chck_" + joinId
        netflixCheckbox.type = "checkbox";
        netflixCheckbox.classList.add("check-netflix");
        netflixCheckboxContainer.appendChild(netflixCheckbox);

        const netflixCheckboxLabel = document.createElement("label");
        netflixCheckboxLabel.classList.add("span");
        netflixCheckboxLabel.setAttribute("for", "checkNetflix")
        netflixCheckboxContainer.appendChild(netflixCheckboxLabel);

        netflixPriceContainer.appendChild(netflixCheckboxContainer);
        netflixPriceContainer.appendChild(netflixPriceNumber);
        netflixPriceContainer.appendChild(netflixPriceText);

        netflixCol2.appendChild(netflixPriceContainer);
        netflixPackContainer.appendChild(netflixCol2);


        netflixContainer.appendChild(netflixPackContainer);


        netflixCheckbox.addEventListener("click", async (e) => {
            e.stopPropagation()
            console.log()
            if (e.target.checked) {
                await addNetflixPremium("ntfx_chck_" + joinId);
                document.getElementById("ntfx_chck_" + idproducto).checked = true;
            } else {
                await removeNetflixPremium()
            }
        })

        cardBody.appendChild(netflixContainer);
    }

    //Integración de divs
    cardParent.appendChild(card);
    card.appendChild(titleBundles);
    card.appendChild(cardFeatures);
    card.appendChild(cardHeaderBundles);
    card.appendChild(cardBody);
    cardBody.appendChild(platformsDiv);
    cardBody.appendChild(buttonPlatformsModal);
    cardBody.appendChild(priceContainer);
    cardBody.appendChild(ahorroParagraph);
    cardBody.appendChild(subscribeButtonContainer);
    cardBody.appendChild(anuncioBloqueoNfl)

    // Crear el elemento div con la clase "dummy-space" y añadirlo a "card-parent"
    const dummySpace = document.createElement("div");
    dummySpace.classList.add("dummy-space");
    cardParent.appendChild(dummySpace);

    return cardParent;
}

function subscribeActions(subscribeButton, idproducto, idproducto_tv, clave_producto, joinId) {
    [subscribeButton].forEach(e => {
        e.addEventListener("click", async (e) => {
            e.stopPropagation();

            hideNetflixSection();
            await removeNetflixPremium();
            if (subscribeButton.textContent === "Añadir al carrito") {
                changeButtonText(joinId);
                addPlatformPackage(idproducto);
                addChannelPackage(idproducto_tv);
                disableCardPackagesByClass("card-footer");
                if (_netflixPackages.includes(idproducto)) { //&& idproducto_tv==1707) {
                    document.getElementById("ntfx_cnt_" + idproducto).classList.remove("d-none");
                    document.getElementById("ntfx_cnt_" + joinId).classList.remove("d-none");
                }
            } else {
                await removeShoppingCartItem(idproducto, `#subscribe-button-package-${idproducto}`, "package", clave_producto);
                await removeShoppingCartItem(idproducto_tv, `#subscribeButton-${idproducto_tv}`, "channel");
                //enabledCardPackgesTV();

                enabledCardPackges("package-disabled-in-live-package", ".pck-button-subscribe");
                enabledCardPackges("package-disabled", ".pck-tv-button-subscribe");
                
                removePlatformsDisabled();
                unblockByPrecioNfl()
            }

            //oculta el footer después de 1 segundo ya que en un paso posterior se acitva la visualización
            setTimeout(() => {
                // document.getElementById(`card_footer_${idproducto}`).classList.add('d-none');
            }, 1000);

        })
    });
}


async function addPlatformPackage(idproducto) {
    const product = packages.find(m => m.idproducto === idproducto);
    if (product) {
        disableCardPackages("card-package-disabled-" + idproducto, "package-disabled");
        disableCardPackages("card-package-disabled-" + idproducto+ "-in-live-package", "package-disabled-in-live-package");

        const listLivePackages = document.getElementsByClassName("package-live-disabled");
        listLivePackages.length && Array.from(listLivePackages).forEach(platform => platform.classList.add('d-none'));
    

        const { nombre, precio, productos_beneficios, clave_producto, tipo_producto, precio_obsoleto } = product;
        await setShoppingCartItem(type = "package", idproducto, nombre, precio, `#subscribe-button-package-${idproducto}`, productos_beneficios, clave_producto, tipo_producto, precio_obsoleto - precio)
        setButtonText(`#subscribe-button-package-${idproducto}`, "Quitar del carrito");
        setButtonText(`#subscribe-button-package-${idproducto}-in-live-package`, "Quitar del carrito");
        
        for (const footer of document.getElementsByClassName("card-footer")) {
            footer.classList.add("d-none");
          }
    }
}

async function addChannelPackage(idproducto_tv) {
    const product = livePackages.find(m => m.clave_producto == idproducto_tv);
    if (product) {
        disableCardPackages("card-package-live-disabled-" + idproducto_tv, "package-live-disabled");

        const { nombre, precio, tipo_producto, precio_obsoleto } = product;
        await setShoppingCartItem(type = "channel", idproducto_tv, nombre, precio, `#subscribeButton-${idproducto_tv}`, null, null, tipo_producto, precio_obsoleto - precio);
    }
}

function disableCardPackages(elementId, className) {
    //limpia los paquetes actualmente deshabilitados
    const listPackages = document.getElementsByClassName(className);
    listPackages.length && Array.from(listPackages).forEach(platform => platform.classList.add('d-none'));

    //deshabilita el paquete seleccionado
    const packageDisabled = document.getElementById(elementId);
    packageDisabled.classList.remove('d-none');
}


function disableCardPackagesById(elementId) {    
    const packageDisabled = document.getElementById(elementId);
    packageDisabled.classList.remove('d-none');
    
}

function disableCardPackagesByClass(className) {    
    const packageDisabled = document.getElementsByClassName(className);
    packageDisabled.classList.remove('d-none');
  }

function changeButtonText(joinId) {
    const subscribeButtonPackages = document.querySelectorAll(`.pck-tv-button-subscribe`);
    
    subscribeButtonPackages.forEach(p => p.textContent = "Añadir al carrito");

    const subscribeButton = document.getElementById(`subscribe-button-package-${joinId}`);
    subscribeButton.textContent = "Quitar del carrito";
}

async function setButtonText(subscribeButtonClass, text){
    const subscribeButton = document.querySelector(subscribeButtonClass);
    subscribeButton.textContent = text;
  }

async function updatePackgesTVInfo(data) {
    const { paquetes, adicionales } = data;
    if (paquetes.length > 0 && adicionales.length > 0) {
        const idproducto = paquetes[0];
        const idproducto_tv = adicionales[0];
        const joinId = idproducto + '-' + idproducto_tv;

        const netflixPackChecked = await document.querySelectorAll("[id^=ntfx_chck_][id*='" + idproducto + "']");
        const isNetflixChecked = netflixPackChecked.length>0 ? netflixPackChecked[0].checked : false;

        changeButtonText(joinId);

        hideNetflixSection();

        if (_netflixPackages.includes(idproducto)) { //&& idproducto_tv==1707) {
            document.getElementById("ntfx_cnt_" + idproducto).classList.remove("d-none");
            document.getElementById("ntfx_cnt_" + joinId).classList.remove("d-none");
        }

        if (isNetflixChecked) {
            netflixPackChecked.forEach(e => e.checked = true);
        }
    }
}

function hideNetflixSection() {
    document.querySelectorAll(".netflixP").forEach(e => e.classList.add("d-none"));
    document.querySelectorAll("[id^=ntfx_chck_]").forEach(e => e.checked = false);
}

function hideNetflixSectionPackgesTV() {
    document.querySelectorAll(".netflixPTV").forEach(e => e.classList.add("d-none"));
}

//Se verifica si la card de NFL Pass estaba bloqueada o desbloqueada para no desbloquear cuando no corrspondía 
function verificaNflPass(accion,valor){
    const container = document.querySelectorAll('.back-opacity-pass');
    if (accion == 'verifica'){
        return container[0].classList.contains("d-none")
    }
    else if(accion == 'aplica'){
        if(valor == false){
            container.forEach(cont =>{
				cont.classList.remove('d-none');
			})
        }
    }
}

function enabledCardPackgesTV() {
    //Habilita los paquetes previamente seleccionados verificando que no sea NFLPass si este está bloqueado
    const val = verificaNflPass('verifica',false)
    const listPackages = document.getElementsByClassName("package-disabled");
    listPackages.length && Array.from(listPackages).forEach(platform => platform.classList.add('d-none'));

    //Habilita los canales previamente seleccionados
    const listChannels = document.getElementsByClassName("package-live-disabled");
    listChannels.length && Array.from(listChannels).forEach(platform => platform.classList.add('d-none'));

    //Cambia texto "Añadir al carrito" de todos los paquetes+tv
    const subscribeButtonPackages = document.querySelectorAll(`.pck-tv-button-subscribe`)
    subscribeButtonPackages.forEach(p => p.textContent = "Añadir al carrito")
    verificaNflPass('aplica',val)
}

function openModalDetails(modalId, idproducto) {
    const modal = document.getElementById(modalId);

    // Lógica para cargar la información del producto en el modal
    const benefict = beneficts.paquetes.find(b => b.idproducto === idproducto);
    document.getElementById('packageModalName').innerText = benefict.nombre;
    const accordion = document.getElementById('packageModalAccordion');
    accordion.innerHTML = '';
    benefict.productos_beneficios.forEach((pb) => {
        const accordionItem = buildPackageModalAccordionItem(pb);
        accordion.appendChild(accordionItem);
    });

    // Crear y mostrar el div modal-backdrop
    const backdrop = document.createElement('div');
    backdrop.classList.add('modal-backdrop', 'fade');
    document.body.appendChild(backdrop);
    setTimeout(() => backdrop.classList.add('show'), 10);

    // Establece el estilo de display para mostrar el modal
    modal.style.display = 'block';

    // Agrega un evento para cerrar el modal cuando se hace clic fuera de él
    window.onclick = (event) => {
        if (event.target === modal) {
            closeModal(modalId);
        }
    };
}

function openModalChannels(idproducto) {
    const modalId = `my-modal-${idproducto}`;
    const modal = document.getElementById(modalId);

    if (modal) {
        modal.style.display = 'block';

        const backdrop = document.createElement('div');
        backdrop.classList.add('modal-backdrop', 'fade');
        document.body.appendChild(backdrop);
        setTimeout(() => backdrop.classList.add('show'), 10);

        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                closeModal(modalId);
            }
        });

        const closeButton = modal.querySelector('.btn-close');
        if (closeButton) {
            closeButton.addEventListener('click', function () {
                closeModal(modalId);
            });
        }

    }
}

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
