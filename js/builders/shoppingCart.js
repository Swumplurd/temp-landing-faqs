let calculatorProducts = {
  "canales": [],
  "paquetes": [],
  "plataformas": []
};
let packageClave;

const containerId = {
  "channel": "shopping_cart_channels",
  "package": "shopping_cart_packages",
  "platform": "shopping_cart_platforms"
};
const calculatorProductsTypes = {
  "channel": "canales",
  "package": "paquetes",
  "platform": "plataformas"
}

//Agrega hotgo dando click a baner promocional
async function addHotgo() {
  const hotgo = platforms.find(item => item.clave_producto == '908')

  if (document.getElementById("promo-check").checked == true && !isMobile()) {
    await setShoppingCartItem("platform", hotgo.clave_producto, hotgo.nombre, hotgo.precio, `#subscribe-button-platform-${hotgo.clave_producto}`, null, null, hotgo.tipo_producto, hotgo.precio_obsoleto - hotgo.precio);
  }
  else if (document.getElementById("promo-check-hotgo-movil").checked == true && isMobile()) {
    await setShoppingCartItem("platform", hotgo.clave_producto, hotgo.nombre, hotgo.precio, `#subscribe-button-platform-${hotgo.clave_producto}`, null, null, hotgo.tipo_producto, hotgo.precio_obsoleto - hotgo.precio);
  }
  if (document.getElementById("promo-check").checked == false && !isMobile()) {
    await removeShoppingCartItem(hotgo.clave_producto, `#subscribe-button-platform-${hotgo.clave_producto}`, "platform")
  }
  else if (document.getElementById("promo-check-hotgo-movil").checked == false && isMobile()) {
    await removeShoppingCartItem(hotgo.clave_producto, `#subscribe-button-platform-${hotgo.clave_producto}`, "platform")
  }
}

function showOrRemoveShoppingCart(isMobile, price) {
  const calculatorContainer = document.querySelector(".calculator-contain")
  if (isMobile && price === 0) {
    calculatorContainer.style.display = "none";
  } else {
    calculatorContainer.style.display = "block";
  }
}

function showOrRemoveDiscountModals() {
  const esencialChannelId = "1707";
  const hasEsencialChannel = calculatorProducts.canales.includes(esencialChannelId);
  const hasLiveChannels = !!calculatorProducts.canales.length
  const hasPackagesSelected = !!calculatorProducts.paquetes.length
  for (const footer of document.getElementsByClassName("card-footer")) {
    footer.classList.add("d-none");
  }
  // if((hasLiveChannels && !hasPackagesSelected) || (hasPackagesSelected && !hasLiveChannels))  {
  if ((hasEsencialChannel && !hasPackagesSelected) || (hasPackagesSelected && !hasEsencialChannel)) {
    if (hasEsencialChannel) {
      // for(channel of calculatorProducts.canales){
      //   document.getElementById("card_footer_" +channel).classList.remove("d-none")
      // }
      document.getElementById("card_footer_" + esencialChannelId).classList.remove("d-none")
    }
    for (pack of calculatorProducts.paquetes) {
      document.getElementById("card_footer_" + pack).classList.remove("d-none")
    }
  }
}

async function removeShoppingCartItem(id, subscribreButtonId, type, clave_producto) {
  //quita check de promo hotgo
  verificaStatusCheck(id, false);

  if (type === "package") {
    removePlatformsDisabled();
  }

  const isMobileSize = isMobile();
  if (clave_producto) {
    packageClave = ""
  }
  const node = document.querySelector(`#shopping-cart-item-${id}`);
  const subscribeButton = document.querySelector(subscribreButtonId);
  node.parentNode.removeChild(node);
  subscribeButton.textContent = "Añadir al carrito";
  calculatorProducts[calculatorProductsTypes[type]] = calculatorProducts[calculatorProductsTypes[type]].filter(p => p !== id);

  const body = {
    paquetes: calculatorProducts.paquetes,
    adicionales: [...calculatorProducts.canales, ...calculatorProducts.plataformas]
  };

  const data = await calculateShoppingCart(body);

  removeDiscount(data, "Descuento Esencial", "shopping-cart-item-discount");
  removeDiscount(data, "DESCUENTO HOT GO", "platform-cart-item-discount");

  checkPromo(data, "DESCUENTO HOT GO", "promo-check");
  checkPromo(data, "DESCUENTO HOT GO", "promo-check-hotgo-movil");

  const totalPriceNode = document.querySelector("#totalPrice")

  showOrRemoveDiscountModals()
  totalPriceNode.textContent = `$${data.total} MXN`;
  showOrRemoveShoppingCart(isMobileSize, data.total);

  const { paquetes } = calculatorProducts;
  packageClave = paquetes.length > 0 ? String(paquetes[0]) : "";

  const bodyBase64 = { paquete: packageClave ? [packageClave] : [], plataformas: [...calculatorProducts.canales, ...calculatorProducts.plataformas] };
  const link = _redirectionUrl + btoa(JSON.stringify(bodyBase64));
  if (data.total > 0) {
    document.getElementById("registerMVSHub").setAttribute("href", link);
    document.getElementById("registerMVSHubMobile").setAttribute("href", link);
  }
  else {
    document.getElementById("registerMVSHub").setAttribute("href", _normalRedirectionUrl);
    document.getElementById("registerMVSHubMobile").setAttribute("href", _normalRedirectionUrl);
  }

  // Ocultar mensaje si el carrito está vacío
  if (calculatorProducts.paquetes.length === 0 && calculatorProducts.canales.length === 0 && calculatorProducts.plataformas.length === 0) {
    const messageContainer = document.getElementById("messageContainer");
    if (messageContainer) {
      messageContainer.style.display = "none";
    }
  }
}

function verificaStatusCheck(id, añadir) {
  if (!añadir && (id == '8110' || id == '8112' || id == '8113')) {
    const promoDiv = document.querySelector('.check-area-hotgo');
    promoDiv.style.height = '0';
    promoDiv.style.visibility = 'hidden';
    const checkMovil = document.querySelector('.custom-checkbox');
    checkMovil.style.visibility = 'hidden';
  }
  else if (añadir && (id == '8110' || id == '8112' || id == '8113')) {
    const promoDiv = document.querySelector('.check-area-hotgo');
    promoDiv.style.height = '100%';
    promoDiv.style.visibility = 'visible';
    const checkMovil = document.querySelector('.custom-checkbox');
    checkMovil.style.visibility = 'visible';
    if (document.getElementById("subscribe-button-platform-908").textContent == 'Añadir al carrito') {
      document.getElementById("promo-check").checked = false
      document.getElementById("promo-check-hotgo-movil").checked = false
    }
    else {
      document.getElementById("promo-check").checked = true
      document.getElementById("promo-check-hotgo-movil").checked = true
    }
  }
  else if (añadir && (id == '8111' || id == '8114' || id == '8115')) {
    const promoDiv = document.querySelector('.check-area-hotgo');
    promoDiv.style.height = '0';
    promoDiv.style.visibility = 'hidden';
    const checkMovil = document.querySelector('.custom-checkbox');
    checkMovil.style.visibility = 'hidden';
  }

  if (añadir && id == '908') {
    document.getElementById("promo-check").checked = true
    document.getElementById("promo-check-hotgo-movil").checked = true
  }
  else if (!añadir && id == '908') {
    document.getElementById("promo-check").checked = false
    document.getElementById("promo-check-hotgo-movil").checked = false
  }
}

function removeDiscount(data, discountName, idItemDiscount) {
  const aditionalDiscount = data?.adicionales[0]?.detalle.filter(a => a.nombre_web === discountName);
  const hasDiscount = !!aditionalDiscount?.length;
  const discountNode = document.querySelector("#" + idItemDiscount)
  if (!hasDiscount && discountNode) {
    discountNode.parentNode.removeChild(discountNode);
  }
}

function buildShoppingCartItem(id, packageTitle, packagePrice, subscribeButtonClass, type, currencyText = "MXN") {
  // Nodes
  const containerNode = document.createElement("div");
  const titleContainerNode = document.createElement("div");
  const titleNode = document.createElement("p");
  const bodyNode = document.createElement("div")
  const priceNode = document.createElement("p");
  const currencyNode = document.createElement("span");
  const deleteButton = document.createElement("button");
  const deleteNode = document.createElement("span");

  // Styles
  containerNode.classList.add("d-flex", "align-items-baseline", `cart-item-${type}`);
  containerNode.id = `shopping-cart-item-${id}`;
  titleContainerNode.classList.add("col-6");

  titleNode.classList.add("m-0");
  titleNode.style = "font-size: 12px";
  const capitalized =
    packageTitle.charAt(0).toUpperCase()
    + packageTitle.toLowerCase().slice(1)
  titleNode.textContent = packageTitle;

  bodyNode.classList.add("col-6", "d-flex", "justify-content-end", "align-items-end", "gap-3");

  currencyNode.style = "font-size: 12px;";
  currencyNode.textContent = currencyText;

  priceNode.classList.add("m-0");
  priceNode.style = "font-size: 14px;font-weight: 500;";
  priceNode.textContent = "$" + packagePrice;

  deleteButton.style = "background:transparent;outline:none;border:none";
  deleteButton.classList.add("material-symbols-outlined");

  deleteNode.classList.add("material-symbols-outlined");
  deleteNode.textContent = "delete";


  priceNode.appendChild(currencyNode);
  bodyNode.appendChild(priceNode);
  deleteButton.appendChild(deleteNode);
  bodyNode.appendChild(deleteButton);
  titleContainerNode.appendChild(titleNode);
  containerNode.appendChild(titleContainerNode);
  containerNode.appendChild(bodyNode);

  deleteButton.addEventListener("click", async (e) => {
    blockUnblockOferta(false);
    if (id == _netflixId) {
      await removeNetflixPremium();
      return;
    }
    await removeShoppingCartItem(id, subscribeButtonClass, type)
    if (type === "package") removePlatformsDisabled();
    if (type === "package" || type === 'channel') {
     // enabledCardPackgesTV();

     enabledCardPackges("package-disabled-in-live-package", ".pck-button-subscribe");
     enabledCardPackges("package-disabled", ".pck-tv-button-subscribe");            


      hideNetflixSectionPackgesTV();
    }

    if (_netflixPackages.includes(id)) {
      document.getElementById("ntfx_cnt_" + id).classList.add("d-none");
      document.getElementById("ntfx_chck_" + id).checked = false;
      await removeNetflixPremium();
    };
    unblockByPrecioNfl();
  })

  return containerNode;
}

//Función que detecta cuando no hay ningun elemento en el carrito 
function unblockByPrecioNfl(){
  total = document.querySelector("#totalPrice")
  if (String(total.innerHTML) == '$0 MXN'){
    blockUnblockNfl(false)
  }
}


function buildDiscount(price, idItemDiscount, labelTxt) {
  const containerNode = document.createElement("div");
  const titleContainerNode = document.createElement("div");
  const titleNode = document.createElement("p");
  const bodyNode = document.createElement("div")
  const priceNode = document.createElement("p");
  const currencyNode = document.createElement("span");
  const deleteButton = document.createElement("button");
  const deleteNode = document.createElement("span");

  // Styles
  containerNode.classList.add("d-flex", "align-items-baseline");
  containerNode.id = idItemDiscount;

  titleContainerNode.classList.add("col-6");

  titleNode.classList.add("m-0", "calc-text-orange");
  titleNode.style = "font-size: 11px";
  titleNode.innerHTML = labelTxt;

  bodyNode.classList.add("col-6", "d-flex", "justify-content-end", "align-items-end", "gap-3");

  currencyNode.style = "font-size: 12px;";
  currencyNode.textContent = "MXN";

  priceNode.classList.add("m-0");
  priceNode.style = "font-size: 14px;font-weight: 500;";

  priceNode.textContent = price >= 0 ? "$" + price : "-$" + (price * -1);

  deleteButton.style = "background:transparent;outline:none;border:none; visibility: hidden";
  deleteButton.classList.add("material-symbols-outlined");

  deleteNode.classList.add("material-symbols-outlined");
  deleteNode.textContent = "delete";
  deleteNode.style = "visibility: hidden"


  priceNode.appendChild(currencyNode);
  bodyNode.appendChild(priceNode);
  deleteButton.appendChild(deleteNode);
  bodyNode.appendChild(deleteButton);
  titleContainerNode.appendChild(titleNode);
  containerNode.appendChild(titleContainerNode);
  containerNode.appendChild(bodyNode);

  return containerNode;
}



async function setShoppingCartItem(type, id, packageTitle, packagePrice, subscribeButtonClass, benefits, clave_producto, tipo_producto, descuento) {
  //Agrega check de promo hotgo
  verificaStatusCheck(id, true)

  const isMobileSize = isMobile();
  if (clave_producto) {
    packageClave = clave_producto;
  }
  const subscribeButton = document.querySelector(subscribeButtonClass);
  const node = buildShoppingCartItem(id, packageTitle, packagePrice, subscribeButtonClass, type)
  const container = document.querySelector(`#${containerId[type]}`);
  if (type === "package") {
    //Bloquea el addon de NFL
    blockUnblockNfl(true);
    calculatorProducts[calculatorProductsTypes[type]] = [id];
    const packagesCartItemsNodes = document.querySelectorAll(`.cart-item-${type}`)
    const subcribeButtonPackages = document.querySelectorAll(`.pck-button-subscribe`)
    subcribeButtonPackages.forEach(p => p.textContent = "Añadir al carrito") // cambiar texto a botones
    packagesCartItemsNodes.forEach(p => p.parentNode.removeChild(p)) // quito del carrito

    // Benefits (Platforms) Logic
    let benefitIds = benefits && benefits.map((benefit) => benefit.idBeneficio).filter(Boolean);
    await disablePlatforms(benefitIds);

  } else if (type === "channel") {
    //Bloquea el addon de NFL
    blockUnblockNfl(true);
    //test
    const discountNode = document.querySelector("#shopping-cart-item-discount");
    if (discountNode) {
      discountNode.parentNode.removeChild(discountNode);
    }

    calculatorProducts[calculatorProductsTypes[type]] = [id];
    const packagesCartItemsNodes = document.querySelectorAll(`.cart-item-${type}`)
    const subcribeButtonPackages = document.querySelectorAll(`.channel-button-subscribe`)
    subcribeButtonPackages.forEach(p => p.textContent = "Añadir al carrito") // cambiar texto a botones
    packagesCartItemsNodes.forEach(p => p.parentNode.removeChild(p)) // quito del carrito

  } else {
    validateNflPassBuy("addCart",id,subscribeButtonClass)
    calculatorProducts[calculatorProductsTypes[type]].push(id);
  }

  showOrRemoveDiscountModals();
  subscribeButton.textContent = "Quitar del carrito";
  container.appendChild(node);
  const body = {
    paquetes: calculatorProducts.paquetes,
    adicionales: [...calculatorProducts.canales, ...calculatorProducts.plataformas]
  }
  const data = await calculateShoppingCart(body);

  removeDiscount(data, "DESCUENTO HOT GO", "platform-cart-item-discount");

  setDiscount(data, "Descuento Esencial", "channel", "shopping-cart-item-discount", "Ahorro por contratar <br> con paquete</p>");
  setDiscount(data, "DESCUENTO HOT GO", "platform", "platform-cart-item-discount", "Descuento por <br> contratar Hot Go</p>");

  updatePackgesTVInfo(body);

  const totalPriceNode = document.querySelector("#totalPrice")
  totalPriceNode.textContent = `$${data.total} MXN`;
  showOrRemoveShoppingCart(isMobileSize, data.total);

  const bodyBase64 = { paquete: packageClave ? [packageClave] : [], plataformas: [...calculatorProducts.canales, ...calculatorProducts.plataformas] };
  const link = _redirectionUrl + btoa(JSON.stringify(bodyBase64));
  if (data.total > 0) {
    document.getElementById("registerMVSHub").setAttribute("href", link);
    document.getElementById("registerMVSHubMobile").setAttribute("href", link);
  }
  else {
    document.getElementById("registerMVSHub").setAttribute("href", _redirectionUrl);
    document.getElementById("registerMVSHubMobile").setAttribute("href", _redirectionUrl);
  }

  TagManagerService.sendEvent("custom_info_add_to_cart", {
    "ecommerce": {
      "value": packagePrice,
      "cart": {
        "items": [{
          item_id: String(id),
          item_name: packageTitle,
          currency: "MXN",
          item_category: tipo_producto,
          item_list_id: "productos_home",
          item_list_name: "Productos Home",
          price: packagePrice,
          discount: descuento,
          quantity: 1
        }]
      }
    }
  })


  // Mostrar mensaje en móvil cuando se agrega un paquete
  if (type === "package" && isMobileSize) {
    const messageContainer = document.getElementById("messageContainer");
    if (messageContainer) {
      messageContainer.style.display = "flex";
    }
  }
}

//detecta si tiene comprado algun producto de NFL Pass
async function validateNflPassBuy(procedencia,id,buttonId){
    if (procedencia == "changeRadios" && calculatorProducts["plataformas"].length > 0){
      let comprado = false
      let buttonNfl = document.querySelector("#subscribe-button-platform-"+_NflPassId)
      calculatorProducts["plataformas"].forEach((product) =>{
          if(Number(product) == Number(id)){
            comprado = true
            return
          }
      })
      if (comprado){
        buttonNfl.innerHTML = "Quitar del carrito"
      }
      else{
        buttonNfl.innerHTML = "Añadir al carrito"
      }
    }
    else if( procedencia == "addCart" && calculatorProducts["plataformas"].length > 0 && buttonId == "#subscribe-button-platform-"+_NflPassId){
      prodDelete = ""
      calculatorProducts["plataformas"].forEach((product) =>{
        _NflPassProducts.forEach((asociado) =>{
          if(Number(product) == Number(asociado.clave_producto) && Number(product) != Number(id)){
            prodDelete = product
            return
          }
        })
      })
      if (prodDelete != ""){
        await removeShoppingCartItem(prodDelete,"#subscribe-button-platform-"+_NflPassId, "platform")
      }
    }
}

async function setDiscount(data, discountName, container, idItemDiscount, labelTxt) {
  const aditionalDiscount = data?.adicionales[0]?.detalle.filter(a => a.nombre_web === discountName);
  const hasDiscount = !!aditionalDiscount?.length;
  let discountNode = document.querySelector("#" + idItemDiscount)
  if (hasDiscount && !discountNode) {
    const canalesContainer = document.querySelector(`#${containerId[container]}`);
    discountNode = buildDiscount(aditionalDiscount[0].precio, idItemDiscount, labelTxt)
    canalesContainer.appendChild(discountNode);
  }

  //Renderiza el tamaño del carrito en movil
  toggleCartBody();
}

function checkPromo(data, discountName, idPromo) {
  const aditionalDiscount = data?.adicionales[0]?.detalle.filter(a => a.nombre_web === discountName);
  const hasDiscount = !!aditionalDiscount?.length;
  if (hasDiscount) {
    document.getElementById(idPromo).checked = true;
  } else {
    document.getElementById(idPromo).checked = false;
  }
}

async function addNetflixPremium(elementId) {
  const node = buildShoppingCartItem(_netflixId, "Netflix Premium", "80", elementId, "", "MXN")
  const container = document.querySelector(`#${containerId["platform"]}`);
  container.appendChild(node);
  calculatorProducts[calculatorProductsTypes["platform"]].push(_netflixId);
  const body = {
    paquetes: calculatorProducts.paquetes,
    adicionales: [...calculatorProducts.canales, ...calculatorProducts.plataformas]
  }
  const data = await calculateShoppingCart(body);
  const totalPriceNode = document.querySelector("#totalPrice")
  totalPriceNode.textContent = `$${data.total} MXN`;

  const bodyBase64 = { paquete: packageClave ? [packageClave] : [], plataformas: [...calculatorProducts.canales, ...calculatorProducts.plataformas] };
  const link = _redirectionUrl + btoa(JSON.stringify(bodyBase64));
  if (data.total > 0) {
    document.getElementById("registerMVSHub").setAttribute("href", link);
    document.getElementById("registerMVSHubMobile").setAttribute("href", link);
  }
  else {
    document.getElementById("registerMVSHub").setAttribute("href", _redirectionUrl);
    document.getElementById("registerMVSHubMobile").setAttribute("href", _redirectionUrl);
  }

  TagManagerService.sendEvent("custom_info_add_to_cart", {
    "ecommerce": {
      "value": 80,
      "cart": {
        "items": [{
          item_id: String(_netflixId),
          item_name: "Netflix Premium",
          currency: "MXN",
          item_category: "plataforma",
          item_list_id: "productos_home",
          item_list_name: "Productos Home",
          price: 80,
          discount: 0,
          quantity: 1
        }]
      }
    }
  })
}

async function removeNetflixPremium() {
  const node = document.getElementById("shopping-cart-item-" + _netflixId);
  if (node) {
    const container = document.querySelector(`#${containerId["platform"]}`);
    container.removeChild(node);
    calculatorProducts[calculatorProductsTypes["platform"]] = calculatorProducts[calculatorProductsTypes["platform"]].filter(p => p != _netflixId);
    const body = {
      paquetes: calculatorProducts.paquetes,
      adicionales: [...calculatorProducts.canales, ...calculatorProducts.plataformas]
    }
    const data = await calculateShoppingCart(body);
    const totalPriceNode = document.querySelector("#totalPrice")
    totalPriceNode.textContent = `$${data.total} MXN`;

    const bodyBase64 = { paquete: packageClave ? [packageClave] : [], plataformas: [...calculatorProducts.canales, ...calculatorProducts.plataformas] };
    const link = _redirectionUrl + btoa(JSON.stringify(bodyBase64));
    if (data.total > 0) {
      document.getElementById("registerMVSHub").setAttribute("href", link);
      document.getElementById("registerMVSHubMobile").setAttribute("href", link);
    }
    else {
      document.getElementById("registerMVSHub").setAttribute("href", _redirectionUrl);
      document.getElementById("registerMVSHubMobile").setAttribute("href", _redirectionUrl);
    }
  }

  document.querySelectorAll("[id^=ntfx_chck_]").forEach(e => e.checked = false);

}
