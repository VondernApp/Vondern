// Toggle Hamburger Menu for Mobile
function toggleMenu() {
  const menu = document.querySelector('.nav-links');
  if (menu) {
    menu.classList.toggle('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carousel');
  const dots = document.querySelectorAll('.dot');
  const cards = document.querySelectorAll('.app-card');
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('imgFull');
  const navbar = document.querySelector('.navbar'); // Added for hiding logic

  // If elements are missing, stop the script to avoid errors
  if (!track || cards.length === 0) return;

  // --- CONFIGURATION ---
  let currentIndex = 0;
  const cardWidth = 250; 
  const gap = 30;        

  /**
   * updateCarousel: Highlights active cards and moves scroll position
   */
  function updateCarousel(index) {
    cards.forEach(c => c.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    if (cards[index]) cards[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');

    track.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth'
    });
  }

  // --- 1. NAVIGATION BUTTONS (One-by-One with Looping) ---
  window.scrollCarousel = function(direction) {
    currentIndex += direction;

    if (currentIndex >= cards.length) {
      currentIndex = 0; 
    } else if (currentIndex < 0) {
      currentIndex = cards.length - 1; 
    }

    updateCarousel(currentIndex);
  };

  // --- 2. DOT NAVIGATION ---
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel(currentIndex);
    });
  });

  // --- 3. MODAL LOGIC (Zoom) ---
  track.addEventListener('click', (e) => {
    const clickedImg = e.target.closest('img');
    if (clickedImg) {
      modal.style.display = "flex";
      modalImg.src = clickedImg.src;

      // HIDE NAVBAR on zoom
      if (navbar) {
        navbar.style.opacity = "0";
        navbar.style.pointerEvents = "none";
      }
    }
  });

  if (modal) {
    modal.onclick = () => {
      modal.style.display = "none";

      // SHOW NAVBAR on close
      if (navbar) {
        navbar.style.opacity = "1";
        navbar.style.pointerEvents = "auto";
      }
    };
  }

  // --- 4. INITIALIZATION ---
  updateCarousel(0);
});

// --- 5. FAQ TOGGLE LOGIC ---
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    const icon = question.querySelector('.toggle-icon');
    
    item.classList.toggle('active');
    
    if (item.classList.contains('active')) {
      icon.textContent = '−'; 
    } else {
      icon.textContent = '+'; 
    }
  });
});