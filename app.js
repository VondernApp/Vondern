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
  const navbar = document.querySelector('.navbar');

  if (!track || cards.length === 0) return;

  let currentIndex = 0;
  const cardWidth = 250; 
  const gap = 30;        

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

  window.scrollCarousel = function(direction) {
    currentIndex += direction;
    if (currentIndex >= cards.length) {
      currentIndex = 0; 
    } else if (currentIndex < 0) {
      currentIndex = cards.length - 1; 
    }
    updateCarousel(currentIndex);
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel(currentIndex);
    });
  });

  track.addEventListener('click', (e) => {
    const clickedImg = e.target.closest('img');
    if (clickedImg) {
      modal.style.display = "flex";
      modalImg.src = clickedImg.src;
      if (navbar) {
        navbar.style.opacity = "0";
        navbar.style.pointerEvents = "none";
      }
    }
  });

  if (modal) {
    modal.onclick = () => {
      modal.style.display = "none";
      if (navbar) {
        navbar.style.opacity = "1";
        navbar.style.pointerEvents = "auto";
      }
    };
  }

  updateCarousel(0);
});

// FAQ TOGGLE LOGIC
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    const icon = question.querySelector('.toggle-icon');
    item.classList.toggle('active');
    icon.textContent = item.classList.contains('active') ? '−' : '+';
  });
});

// BREVO FORM LOGIC
window.REQUIRED_ERROR_MESSAGE = "This field cannot be left blank.";
window.EMAIL_INVALID_MESSAGE = "Please enter a valid email address.";
window.GENERIC_INVALID_MESSAGE = "Something went wrong. Please try again.";
window.translation = { common: { selectedList: '{quantity} list selected', selectedLists: '{quantity} lists selected' } };

const form = document.getElementById('sib-form');
if (form) {
    const formFields = form.querySelectorAll('input:not([type="hidden"]), select, textarea');

    const saveFormData = () => {
        const data = {};
        formFields.forEach(field => {
            data[field.name] = field.type === 'checkbox' ? field.checked : field.value;
        });
        localStorage.setItem('vondern_form_draft', JSON.stringify(data));
    };

    const loadFormData = () => {
        const savedData = localStorage.getItem('vondern_form_draft');
        if (savedData) {
            const data = JSON.parse(savedData);
            formFields.forEach(field => {
                if (data[field.name] !== undefined) {
                    field.type === 'checkbox' ? field.checked = data[field.name] : field.value = data[field.name];
                }
            });
        }
    };

    formFields.forEach(field => field.addEventListener('input', saveFormData));
    window.addEventListener('load', loadFormData);

    form.addEventListener('submit', function() {
        const successMsg = document.getElementById('success-message');
        const errorMsg = document.getElementById('error-message');
        const formLayout = document.querySelector('.brevo-styled-form');

        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.target.style.display !== 'none') {
                    if (formLayout) formLayout.style.display = 'none';
                    localStorage.removeItem('vondern_form_draft');
                }
            });
        });
        if (successMsg) observer.observe(successMsg, { attributes: true });
        if (errorMsg) observer.observe(errorMsg, { attributes: true });
    });
}

// BUS TRIPS MODAL
function openModal(title, description, posts) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDescription').innerText = description;
    const container = document.getElementById('modalPostsContainer');
    container.innerHTML = '';
    posts.forEach(post => {
        container.innerHTML += `
            <div class="insta-post-card">
                <div class="post-header"><img src="pics/circle-logo.png" alt="logo"><span>${post.username || 'vondernapp'}</span></div>
                <a href="${post.link}" target="_blank" class="post-image"><img src="${post.img}" alt="post"><span class="post-link">VIEW POST</span></a>
            </div>`;
    });
    document.getElementById('tripModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('tripModal').style.display = 'none';
}

// FAVORITES PAGE MODAL
function openCreatorModal(creatorId) {
    const template = document.getElementById('content-' + creatorId);
    if(template) {
        document.getElementById('modal-body').innerHTML = template.innerHTML;
        document.getElementById('creator-modal').style.display = 'flex';
    }
}

function closeCreatorModal() {
    document.getElementById('creator-modal').style.display = 'none';
}

// Open the full-screen view
function openLightbox(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imgSrc;
    lightbox.style.display = 'flex';
}

// Close the full-screen view
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// NEW FEATURED CREATORS CAROUSEL
document.addEventListener('DOMContentLoaded', () => {
  const featuredTrack = document.getElementById('featured-carousel');
  const featuredCards = featuredTrack ? featuredTrack.querySelectorAll('.app-card') : [];

  if (featuredTrack && featuredCards.length > 0) {
    // You can add logic here for auto-sliding or custom controls if needed
    console.log('Featured Creators Carousel Initialized');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("expandedImg");
  const closeBtn = document.querySelector(".close-modal");
  
  // Select all creator images
  const creatorImages = document.querySelectorAll(".creator-card img");

  creatorImages.forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.src;
    });
  });

  // Close when clicking the 'X'
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close when clicking anywhere on the background
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});