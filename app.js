//hamburger dropdown menu
function toggleMenu() {
  const menu = document.querySelector('.nav-links');
  menu.classList.toggle('active');
}

//carousel
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carousel');
  const cards = Array.from(track.children);
  
  
  const itemsToClone = 3;
  
  for (let i = 0; i < itemsToClone; i++) {
    const startClone = cards[i].cloneNode(true);
    const endClone = cards[cards.length - 1 - i].cloneNode(true);
    track.appendChild(startClone); 
    track.prepend(endClone);  
  }


  const cardWidth = cards[0].offsetWidth + 20;
  track.scrollLeft = cardWidth * itemsToClone;


  track.addEventListener('scroll', () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    

    if (track.scrollLeft <= 0) {
      track.style.scrollBehavior = 'auto'; 
      track.scrollLeft = maxScroll - (cardWidth * itemsToClone);
    } 

    else if (track.scrollLeft >= maxScroll - 1) {
      track.style.scrollBehavior = 'auto'; 
      track.scrollLeft = cardWidth * itemsToClone;
    }
  });
});

function scrollCarousel(direction) {
  const track = document.getElementById('carousel');
  const cardWidth = track.querySelector('.app-card').offsetWidth + 20;
  
  track.style.scrollBehavior = 'smooth'; 
  track.scrollBy({
    left: direction * cardWidth,
    behavior: 'smooth'
  });
}

//zoom in modal
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('imgFull');
  const carouselImages = document.querySelectorAll('.app-card img');

  carouselImages.forEach(img => {
    img.onclick = function() {
      modal.style.display = "flex";
      modalImg.src = this.src;
    }
  });
});