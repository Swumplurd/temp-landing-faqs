const queryParams = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

if (queryParams.recommendedPackage) {
  _recommendedPackageId = parseInt(queryParams.recommendedPackage) || recommendedPackage
}
async function listOffer() {
  //const apiUrl = "./js/json/offer.json";
  const apiUrl = baseUrl + "/ofertaweb";
  // const apiUrl = "http://172.20.102.215:5001/dev/disPlus/ofertaweb";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    //Temporal: se remuve la plataforma paramount
    const adicionalFiltered = data.response.adicional.filter(m=>m.nombre!=='Paramount');
    data.response.adicional = [...adicionalFiltered];

    // Call a function to build elements with the response data
    //return data;
    return data.response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function listBenefits() {
  const apiUrl = "https://d31nz91qboyide.cloudfront.net/mvshub/conexiones/beneficios.json";
  //const apiUrl = "/js/json/beneficios.json";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // Call a function to build elements with the response data
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function listCanales() {
  const apiUrl = _canalesUrl;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // Call a function to build elements with the response data
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function calculateShoppingCart(body) {

  body = { ...body, source: "LANDING" };

  const apiUrl =
    `${baseUrl}/calculadora`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)

    });
    if (!response.status_code === "200") {
      throw new Error(`HTTP error! Status: ${response.status_code}`);
    }

    const data = await response.json();

    // const descuento = {
    // nombre_web: "DESCUENTO HOT GO",
    // precio: -69.5,
    // };
    // const fil = body.paquetes.filter(item => item === 8113 ||  item === 8112 ||item === 8110 );
    // if (body.adicionales && body.adicionales.includes("908") && body.paquetes && fil.length > 0 ) {
    //   data.response.adicionales[0].detalle.push(descuento);
    //   data.response.total = data.response.total - 69.5
    // } else {
    //   if(data.response.adicionales)
    //   data.response.adicionales[0].detalle =
    //     data.response.adicionales[0].detalle.filter(
    //       (item) => item != descuento
    //     );
    // }


    return data.response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


async function listHeroItems() {
  const apiUrl = _heroUrl;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // Call a function to build elements with the response data
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

