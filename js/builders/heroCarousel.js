function renderHeroCarousel(heroContent){

    // Desktop Carousel Selectors
		const desktopCarousel = document.getElementById('desktopHeroCarousel');
		const desktopCarouselInnerSelector = desktopCarousel.querySelector('.carousel-inner');
		const desktopIndicators = document.getElementById('desktopIndicators');

		// Mobile Carousel Selectors
		const mobileCarousel = document.getElementById('mobileHeroCarousel');
		const mobileCarouselInnerSelector = mobileCarousel.querySelector('.carousel-inner');
		const mobileIndicators = document.getElementById('mobileIndicators');

		// Default indicators
		const defaultIndicator = document.createElement('li');
		defaultIndicator.setAttribute('data-bs-target', `#desktopHeroCarousel`);
		defaultIndicator.setAttribute('data-bs-slide-to', 0);
		defaultIndicator.classList.add('active')
		defaultIndicator.classList.add('carousel-indicators-override')
		desktopIndicators.appendChild(defaultIndicator);

		const defaultIndicatorMobile = document.createElement('li');
		defaultIndicatorMobile.setAttribute('data-bs-target', `#mobileHeroCarousel`);
		defaultIndicatorMobile.setAttribute('data-bs-slide-to', 0);
		defaultIndicatorMobile.classList.add('active')
		defaultIndicatorMobile.classList.add('carousel-indicators-override')
		mobileIndicators.appendChild(defaultIndicatorMobile);



		
		JSON.parse(JSON.stringify(heroContent)).forEach((slide, index) => {
			const {desktop, mobile} = slide
			createCarouselItem(desktopCarouselInnerSelector, 'desktopHeroCarousel', desktopIndicators, desktop, index)
			createCarouselItem(mobileCarouselInnerSelector, 'mobileHeroCarousel', mobileIndicators, mobile, index)
		}, '')
		
		if (!heroContent.length) {
			desktopIndicators.classList.add('d-none')
			mobileIndicators.classList.add('d-none')
		}
		else{
			const interval = 5000;
			new bootstrap.Carousel(document.getElementById("desktopHeroCarousel"), {
				interval,
				cycle:true,
				touch:false,
				pause:false
			  }).cycle()
			new bootstrap.Carousel(document.getElementById("mobileHeroCarousel"), {
				interval,
				cycle:true,
				touch:false,
				pause:false
			  }).cycle()
		}


		// Activate the first slide
		const firstSlide = desktopCarouselInnerSelector.querySelector('.carousel-item');
		if (firstSlide) {
			firstSlide.classList.add('active');
		}

		const firstSlideMobile = mobileCarouselInnerSelector.querySelector('.carousel-item');
		if (firstSlideMobile) {
			firstSlideMobile.classList.add('active');
		}
}

const createCarouselItem = (carouselInnerSelector,carouselId, indicatorsSelector, content, index) => {

    const sanitizedContent = DOMPurify.sanitize(content);

    // Create carousel item
    const carouselItem = document.createElement('div');
    carouselItem.className = 'carousel-item';
    carouselItem.innerHTML = sanitizedContent;

    // Append to carousel inner
    carouselInnerSelector.appendChild(carouselItem);

    // Create indicator
    const indicator = document.createElement('li');
    indicator.setAttribute('data-bs-target', `#${carouselId}`);
    indicator.setAttribute('data-bs-slide-to', index + 1);
    indicator.classList.add('carousel-indicators-override')
    indicatorsSelector.appendChild(indicator);
     

  };