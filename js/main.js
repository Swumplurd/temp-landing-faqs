(function ($) {
	"use strict";


	// Dynamic Packages
	document.addEventListener("DOMContentLoaded", async () => {

		//Asegura que no se muestre habilitado el check de la promo de hotgo
		const promoDiv = document.querySelector('.check-area-hotgo');
		promoDiv.style.height = '0';
		promoDiv.style.visibility = 'hidden';

		const heroContent = await listHeroItems()
		renderHeroCarousel(heroContent)

		// Function to make an API request and handle the response
		const offer = await listOffer();

		beneficts = await listBenefits();
		document.getElementById("loader").style.display = "none";


		//Paquetes + TV
		const paquetesMasTv = offer.paquetes_mas_tv.sort((a,b)=> a.precio-b.precio);
		const paquetesEsencial = paquetesMasTv.filter(m => m.nombre.includes('ESENCIAL'));
		const paquetesExtendido = paquetesMasTv.filter(m => m.nombre.includes('EXTENDIDO'));

		paquetesEsencial.forEach((item) => {
			const node = buildPackageAndTV(item);
			document.getElementById("packages-esencial").appendChild(node);
		});

		paquetesExtendido.forEach((item) => {
			const node = buildPackageAndTV(item);
			document.getElementById("packages-extendido").appendChild(node);
		});
		document.getElementById("packs-live").classList.remove("d-none");
		document.getElementById("packages-live-pack").classList.remove("d-none");

		/* Disney */
		platforms.push({
			"idproducto": 27,
			"nombre": "Disney+",
			"descripcion": "Disney+",
			"precio": 219,
			"precio_obsoleto": 219,
			"status": "Activo",
			"fecha_registro": "2024-06-07T12:26:36",
			"tipo_producto": "Adicional",
			"imagen": "https://d31nz91qboyide.cloudfront.net/mvshub/landingmvshub/modales/disney/logoDisneyPlus.png",
			"clases": "https://d31nz91qboyide.cloudfront.net/mvshub/modales/plataformas/img_principal/amazon_prime.jpg",
			"beneficios": [
				"La membresía Amazon Prime te da acceso a series y películas sin límites",
				" envíos GRATIS y rápidos en millones de productos en amazon.com.mx",
				" 2 millones de canciones sin anuncios y mucho más."
			],
			"productos_asociados": [
				{
					"idproducto": 277,
					"nombre": "Plan Estándar",
					"descripcion": "Plan Estándar",
					"precio": 219,
					"precio_obsoleto": 219,
					"status": "Activo",
					"fecha_registro": "2024-09-03T19:19:19",
					"tipo_producto": "Adicional",
					"imagen": "",
					"clases": null,
					"beneficios": null,
					"footer": null,
					"clave_producto": "31466",
					"canales": "",
					"nombre_web": "Plan Estándar",
					"id_product_cache": 26
				},
				{
					"idproducto": 288,
					"nombre": "Plan Premium",
					"descripcion": "Plan Premium",
					"precio": 299,
					"precio_obsoleto": 299,
					"status": "Activo",
					"fecha_registro": "2024-09-03T19:19:19",
					"tipo_producto": "Adicional",
					"imagen": "",
					"clases": null,
					"beneficios": null,
					"footer": null,
					"clave_producto": "31455",
					"canales": "",
					"nombre_web": "Plan Premium",
					"id_product_cache": 25
				}
			],
			"footer": null,
			"clave_producto": "1202",
			"canales": "",
			"nombre_web": "Disney+",
			"id_product_cache": 8
		});
		/* Disney */
		
		offer.adicional.forEach((_package) => {
			if (_livePlatformsIds.includes(_package.idproducto)) {
				livePackages.push(_package);
			} else {
				platforms.push(_package);
			}
		});
		packages = offer.paquetes;

		const non_recommended_packages = packages.filter(p => p.idproducto !== _recommendedPackageId)
		const package_recommended = packages.filter(p => p.idproducto === _recommendedPackageId)

		const canales = await listCanales()
		const canalesCarousel = canales.filter(c => c.carousel)

		document.getElementById("live-packs-section").prepend(renderChannelsCarousel(canalesCarousel));


		package_recommended
			.forEach((item) => {
				const node = buildPackageCard(item);
				document.getElementById("packs-section").appendChild(node);

				const nodeE = buildPackageCardInLivePackage(item);				
				document.getElementById("packages-live-pack").appendChild(nodeE);
			});
		livePackages.forEach((item) => {
			const node = buildLivePackageCard(item);
			document.getElementById("live-packs-container").appendChild(node);
		});
		non_recommended_packages
			.sort((a, b) => a.precio - b.precio)
			.forEach((item) => {
				const node = buildPackageCard(item);
				document.getElementById("packs-section").appendChild(node);

				const nodeE = buildPackageCardInLivePackage(item);				
				document.getElementById("packages-live-pack").appendChild(nodeE);
			});


		platforms.filter(p => p.clave_producto != _netflixId).forEach((item) => {
			const node = buildPlatformCard(item);
			document.getElementById("platforms-section").appendChild(node);
		});

		// Verifica el parámetro 'cardParam' en la URL para determinar qué card debe mostrar
		const queryParams = new URLSearchParams (window.location.search);
		const cardParam  = queryParams.get('cardParam');
		if (cardParam) {
			let sectionId;
			// Se asigna el card a mostrar según el valor del parámetro 'card'
			switch(cardParam) {
			case '2':
				sectionId = "platforms-pack-selector";
				break;
			case '3':
				sectionId = "live-selector";
				break;
			case '4':
				sectionId = "platforms-selector";
				break;
			default:
				sectionId = "platforms-section";
			}
			// Simula un clic en la pestaña correspondiente
			document.getElementById(sectionId).click();
		} else {
			// Si no hay parámetro, muestra el card por defecto
			document.getElementById("platforms-pack-selector").click();
		}
		// Se agrega evento de cambio para las cards con radios
		updatePrice(platforms)
		updatePriceDisney(platforms)
		validateClaveNfl(platforms)

		document.querySelectorAll('input[name="subscription"]').forEach((radio) => {
			radio.addEventListener('change', function(){updatePrice(platforms)});
		});

		document.querySelectorAll('input[name="subscription-disney"]').forEach((radio) => {
			radio.addEventListener('change', function(){updatePriceDisney(platforms)});
		});


	});

	document.addEventListener("scroll", function (e) {
		const elem = document.getElementById("mobile-back")
		if (elem) {
			const height = elem.height
			const scroll = document.documentElement.scrollTop
			const fadedScroll = scroll / 2
			//Esto tiene que ser igual que el margin-top del elemento
			const offset = -20
			const percentage = (height + offset - scroll) / (height + offset)

			elem.style.opacity = percentage
			//elem.style.marginTop = offset - fadedScroll + "px";//
		}
	});
})(jQuery);

//función que valida la clave de NFL Pass
function validateClaveNfl(products){
	const res = products.filter(prod => prod.nombre.includes("NFL"))
	_NflPassId = res[0].clave_producto
	_NflPassProducts = res[0].productos_asociados
}

//Función que bloquea y desbloquea toda la oferta comercial excepto NFL Pass
function blockUnblockOferta(block){
	const containers = document.querySelectorAll('.back-opacity-nfl');
	if (block){
		// Mostrar el div .back-opacity con .add-ur-pack en todos los contenedores
		if (containers) {
			containers.forEach(cont =>{
				cont.classList.remove('d-none');
			})
		}
	}
	else{
		// Oculta el div .back-opacity con .add-ur-pack en todos los contenedores
		if (containers) {
			containers.forEach(cont =>{
				cont.classList.add('d-none');
			})
		}
	}

}

//Función que bloquea y desbloquea la card de NFL Pass
function blockUnblockNfl(block){
	const containers = document.querySelectorAll('.back-opacity-pass');
	if (block){
		// Mostrar el div .back-opacity con .add-ur-pack en todos los contenedores
		if (containers) {
			containers.forEach(cont =>{
				cont.classList.remove('d-none');
			})
		}
	}
	else{
		// Oculta el div .back-opacity con .add-ur-pack en todos los contenedores
		if (containers) {
			containers.forEach(cont =>{
				cont.classList.add('d-none');
			})
		}
	}

}

//Función que actualiza los precios por radio seleccionado y detecta si es mensual, anual o semanal
function updatePrice(items){
	const selectedOption = document.querySelector('input[name="subscription"]:checked');
	const value = selectedOption.value;
	var price = ""
	var id = ""
	var objectNewPrice = ""
	if (selectedOption) {
		items.forEach((product) =>{
			if (product.productos_asociados != undefined){
				objectNewPrice = product.nombre
				product.productos_asociados.forEach((prodAs) =>{
					if (prodAs.nombre == value){
						price = prodAs.precio
						id = prodAs.clave_producto
					}
				})
			}
		})
		const newPrice = document.getElementById("precio-"+objectNewPrice)
		newPrice.innerHTML = `<span>$</span>${price}`
		if (String(value).includes("Anual")){
			const newPostfijo = document.getElementById("pricePost-"+objectNewPrice)
			newPostfijo.textContent = 'anual'
		}
		else if(String(value).includes("Semanal")){
			const newPostfijo = document.getElementById("pricePost-"+objectNewPrice)
			newPostfijo.textContent = 'semanal'
		}
		validateNflPassBuy("changeRadios",id,"")
	}
}
/* Disney */
function updatePriceDisney(items){
	const selectedOption = document.querySelector('input[name="subscription-disney"]:checked');
	const value = selectedOption.value;
	var price = ""
	var id = ""
	var objectNewPrice = ""
	if (selectedOption) {
		items.forEach((product) =>{
			if (product.productos_asociados != undefined){
				objectNewPrice = product.nombre
				product.productos_asociados.forEach((prodAs) =>{
					if(value === "Plan Premium") {
						document.getElementById("disney-current-offer").innerHTML = "Plan Premium"
						document.getElementById("disney-current-offer-detail").innerHTML = "Sin anuncios"
						document.getElementById("disney-current-offer-detail").classList.add("d-none")
						document.getElementById("disney-devices").innerHTML = "4"
						document.querySelectorAll(".disney-toggle").forEach(el => el.classList.remove("d-none"))
						document.getElementById("estandar-only").classList.add("d-none")
					}
					if(value === "Plan Estándar") {
						document.getElementById("disney-current-offer").innerHTML = "Plan Estándar"
						document.getElementById("disney-current-offer-detail").innerHTML = "Con anuncios"
						document.getElementById("disney-current-offer-detail").classList.add("d-none")
						document.getElementById("disney-devices").innerHTML = "2"
						document.querySelectorAll(".disney-toggle").forEach(el => el.classList.add("d-none"))
						document.getElementById("estandar-only").classList.remove("d-none")
					}
					if (prodAs.nombre == value){
						price = prodAs.precio
						id = prodAs.clave_producto
					}
				})
			}
		})
		const newPrice = document.getElementById("precio-Disney+")
		newPrice.innerHTML = `<span>$</span>${price}`
		const newPostfijo = document.getElementById("pricePost-"+objectNewPrice)
		newPostfijo.textContent = 'al mes';
	}
} 

function selectView(event) {
	for (const elem of document.getElementsByClassName("tab-packs")) {
		elem.classList.remove("active");
	}
	event.target.classList.add("active");

	document.getElementById("packs-live").classList.add("d-none")
	document.getElementById("packs-section").classList.add("d-none")
	document.getElementById("live-packs-section").classList.add("d-none")
	document.getElementById("platforms").classList.add("d-none")
	document.getElementById("packages-live-pack").classList.add("d-none") 
	document.getElementById("disney-bundle-section").classList.add("d-none");
	switch (event.target.id) {
		case "platforms-live":
			document.getElementById("packs-live").classList.remove("d-none");
			document.getElementById("packages-live-pack").classList.remove("d-none"); 
			break;
		case "platforms-pack-selector":
			document.getElementById("packs-section").classList.remove("d-none");
			document.getElementById("disney-bundle-section").classList.remove("d-none");
			break;
		case "live-selector":
			document.getElementById("live-packs-section").classList.remove("d-none");
			break;
		default:
			document.getElementById("platforms").classList.remove("d-none");
	}
	_selectedView = event.target.id
}


function adjustMarginTop() {
	const mobileBack = document.getElementById("mobile-back");
	const dynamicContainer = document.getElementById("dynamic-container");

	const { top, height } = mobileBack.getBoundingClientRect();
	const marginTopAdjustment = top + height;

	dynamicContainer.style.marginTop = `${marginTopAdjustment}px`;
}

document.addEventListener("DOMContentLoaded", adjustMarginTop);
window.addEventListener("resize", adjustMarginTop);


/* Esta función es para cerrar el banner de NFL */
document.addEventListener('DOMContentLoaded', (event) => {
	const closeButton = document.getElementById('close-btn-nfl');
	closeButton.addEventListener('click', function () {
		const promoDiv = document.querySelector('.container-nfl');
		promoDiv.style.display = 'none';
	});
});


/* 
{
    "idproducto": 13,
    "nombre": "Hot Go",
    "descripcion": "Hot Go",
    "precio": 139,
    "precio_obsoleto": 139,
    "status": "Activo",
    "fecha_registro": "2021-06-07T12:26:36",
    "tipo_producto": "Adicional",
    "imagen": "https://d31nz91qboyide.cloudfront.net/mvshub/mails/Plataformas/hotgo.png",
    "clases": "https://d31nz91qboyide.cloudfront.net/mvshub/modales/plataformas/img_principal/hotgo.jpg",
    "beneficios": [
        "Disfruta de material exclusivo de las productoras más importantes de entretenimiento para adultos. El mejor contenido con los talentos más sexies y la mayor variedad de contenido para adultos, en un solo lugar de forma segura y privada, con calidad HD"
    ],
    "footer": null,
    "clave_producto": "908",
    "canales": "",
    "nombre_web": "Hotgo",
    "id_product_cache": 13
}

{
    "idproducto": 29,
    "nombre": "NFL Pass",
    "descripcion": "NFL Pass",
    "precio": 0,
    "precio_obsoleto": 0,
    "status": "Activo",
    "fecha_registro": "2024-09-03T19:19:19",
    "tipo_producto": "Adicional",
    "imagen": "https://d31nz91qboyide.cloudfront.net/mvshub/plataformas/img/gamepass.webp",
    "clases": null,
    "beneficios": null,
    "footer": null,
    "clave_producto": "0000",
    "canales": "",
    "nombre_web": "NFL Pass",
    "id_product_cache": null,
    "productos_asociados": [
        {
            "idproducto": 27,
            "nombre": "NFL Pass Anual",
            "descripcion": "NFL Pass Anual",
            "precio": 2700,
            "precio_obsoleto": 2700,
            "status": "Activo",
            "fecha_registro": "2024-09-03T19:19:19",
            "tipo_producto": "Adicional",
            "imagen": "",
            "clases": null,
            "beneficios": null,
            "footer": null,
            "clave_producto": "3146",
            "canales": "",
            "nombre_web": "NFL Pass Anual",
            "id_product_cache": 26
        },
        {
            "idproducto": 28,
            "nombre": "NFL Pass Semanal",
            "descripcion": "NFL Pass Semanal",
            "precio": 330,
            "precio_obsoleto": 330,
            "status": "Activo",
            "fecha_registro": "2024-09-03T19:19:19",
            "tipo_producto": "Adicional",
            "imagen": "",
            "clases": null,
            "beneficios": null,
            "footer": null,
            "clave_producto": "3145",
            "canales": "",
            "nombre_web": "NFL Pass Semanal",
            "id_product_cache": 25
        }
    ]
}
*/