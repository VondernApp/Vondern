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

  // If elements are missing, stop the script to avoid errors
  if (!track || cards.length === 0) return;

  // --- CONFIGURATION ---
  // These must match your CSS exactly
  let currentIndex = 0;
  const cardWidth = 250; 
  const gap = 30;        

  /**
   * updateCarousel: The single source of truth for the carousel state.
   * It handles the visual highlighting and the physical scroll movement.
   */
  function updateCarousel(index) {
    // 1. Manage Active Classes for the "Center Highlight" effect
    cards.forEach(c => c.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    if (cards[index]) cards[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');

    // 2. Calculate Exact Scroll Position
    // We calculate based on index to ensure it never "lands" between pictures
    track.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth'
    });
  }

  // --- 1. NAVIGATION BUTTONS (One-by-One with Looping) ---
  window.scrollCarousel = function(direction) {
    currentIndex += direction;

    // LOOPING LOGIC: Checks if we've gone past the ends of the array
    if (currentIndex >= cards.length) {
      currentIndex = 0; // Loop back to the first picture
    } else if (currentIndex < 0) {
      currentIndex = cards.length - 1; // Loop back to the last picture
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
    }
  });

  if (modal) {
    modal.onclick = () => {
      modal.style.display = "none";
    };
  }

  // --- 4. INITIALIZATION ---
  // Forces the carousel to start at the first picture on every page load
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