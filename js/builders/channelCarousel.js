function renderChannelsCarousel(channels, itemsPerSlide =8 , advance=3) {

    const carouselContainer = document.createElement("div");
    carouselContainer.classList.add(
        // "container",
        // //"text-center",
        // //"row",
        // //"mx-auto",
        // //"my-auto",
        // "justify-content-center",
        // "custom-carousel-container"
        );
    carouselContainer.id = "customChannelCarousel";
    
    const carousel = document.createElement("div");
    carousel.classList.add("slider");

    const carouselTrack = document.createElement("div");
    carouselTrack.classList.add("slide-track");

    channels.forEach(channel=>{
        const carouselSlide = document.createElement("div");
        carouselSlide.classList.add("slide");

        const channelImage = document.createElement("img");
        channelImage.src = channel.url
        channelImage.alt = channel.channel;

        carouselSlide.appendChild(channelImage);
        carouselTrack.appendChild(carouselSlide)
    })
    channels.forEach(channel=>{
        const carouselSlide = document.createElement("div");
        carouselSlide.classList.add("slide");

        const channelImage = document.createElement("img");
        channelImage.src = channel.url
        channelImage.alt = channel.channel;

        carouselSlide.appendChild(channelImage);
        carouselTrack.appendChild(carouselSlide)
    })

    carousel.appendChild(carouselTrack)

    carouselContainer.appendChild(carousel)

    return carouselContainer
}