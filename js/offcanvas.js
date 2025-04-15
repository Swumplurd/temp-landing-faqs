let isButtonClicked = false;
let hasScrolledPastVideo = false;
let isManuallyClosed = false;

function toggleNav(open) {
  const sidenav = document.getElementById("mySidenav");

  sidenav.classList.toggle("slide-out", open);
  sidenav.classList.toggle("slide-in", !open);


  if (!open && player?.getPlayerState() === YT.PlayerState.PLAYING) {
    player.pauseVideo();
  }
}

function openNav() {
  if (!isButtonClicked && !hasScrolledPastVideo && !isManuallyClosed) {
    toggleNav(true);
    const sidenav = document.getElementById("mySidenav");
    sidenav.classList.add("fade-in");
    setTimeout(() => {
      sidenav.classList.add("active");
    }, 100);
  }
}

function closeNav() {
  const sidenav = document.getElementById("mySidenav");
  sidenav.classList.remove("active");
  toggleNav(false);
}

document.querySelectorAll('.btn-subscribe').forEach(button => {
  button.addEventListener('click', () => {
    isButtonClicked = true;
    closeNav();
  });
});

document.querySelectorAll('.closebtn').forEach(button => {
  button.addEventListener('click', () => {
    isManuallyClosed = true;
    closeNav();
  });
});

window.addEventListener('scroll', () => {
  const videoTodo = document.getElementById('video-todo');
  const rect = videoTodo.getBoundingClientRect();
  const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

  if (isVisible) {
    closeNav();
    hasScrolledPastVideo = true;
  } else if (rect.top >= window.innerHeight) {
    hasScrolledPastVideo = false;
  }

  if (!isButtonClicked && !hasScrolledPastVideo && !isManuallyClosed && rect.top > 0) {
    openNav();
  }
});

openNav();
