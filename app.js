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

// Select all FAQ items
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const icon = item.querySelector('.toggle-icon');

    question.addEventListener('click', () => {
        // Toggle the 'active' class on the clicked item
        item.classList.toggle('active');

        // Change the icon based on whether the class is present
        if (item.classList.contains('active')) {
            icon.textContent = '−'; // Minus sign
        } else {
            icon.textContent = '+'; // Plus sign
        }
        
        // Optional: Close other items when one is opened
        /*
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.toggle-icon').textContent = '+';
            }
        });
        */
    });
});