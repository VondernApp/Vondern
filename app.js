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

  // Configuration for Brevo
  window.REQUIRED_ERROR_MESSAGE = "This field cannot be left blank.";
  window.EMAIL_INVALID_MESSAGE = "Please enter a valid email address.";
  window.GENERIC_INVALID_MESSAGE = "Something went wrong. Please try again.";
  window.translation = { common: { selectedList: '{quantity} list selected', selectedLists: '{quantity} lists selected' } };
  var AUTOHIDE = Boolean(0);

  const form = document.getElementById('sib-form');
  const formFields = form.querySelectorAll('input:not([type="hidden"]), select, textarea');

  // 1. Function to save data to localStorage
  const saveFormData = () => {
    const data = {};
    formFields.forEach(field => {
      if (field.type === 'checkbox') {
        data[field.name] = field.checked;
      } else {
        data[field.name] = field.value;
      }
    });
    localStorage.setItem('vondern_form_draft', JSON.stringify(data));
  };

  // 2. Function to load data from localStorage
  const loadFormData = () => {
    const savedData = localStorage.getItem('vondern_form_draft');
    if (savedData) {
      const data = JSON.parse(savedData);
      formFields.forEach(field => {
        if (data[field.name] !== undefined) {
          if (field.type === 'checkbox') {
            field.checked = data[field.name];
          } else {
            field.value = data[field.name];
          }
        }
      });
    }
  };

  // 3. Event Listeners
  formFields.forEach(field => {
    field.addEventListener('input', saveFormData);
  });

  // Load data when page opens
  window.addEventListener('load', loadFormData);

  // 4. Handle visibility and Clear storage on success
  form.addEventListener('submit', function() {
    const successMsg = document.getElementById('success-message');
    const errorMsg = document.getElementById('error-message');
    const formLayout = document.querySelector('.brevo-styled-form');

    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.target.style.display !== 'none' || !mutation.target.classList.contains('brevo-hidden')) {
           // Success! Hide form and clear the saved draft
           formLayout.style.display = 'none';
           localStorage.removeItem('vondern_form_draft');
        }
      });
    });

    observer.observe(successMsg, { attributes: true, attributeFilter: ['style', 'class'] });
    observer.observe(errorMsg, { attributes: true, attributeFilter: ['style', 'class'] });
  });
