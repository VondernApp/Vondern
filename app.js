// Toggle Hamburger Menu for Mobile
function toggleMenu() {
  const menu = document.querySelector('.nav-links');
  if (menu) {
    menu.classList.toggle('active');
  }
}

//carousel
function slide(direction) {
    const track = document.getElementById('vondern-track');
    if (!track) return;

    // Define the scroll distance (match this to your card width + gap)
    const cardWidth = 320; 
    
    track.scrollBy({
        left: direction * cardWidth,
        behavior: 'smooth'
    });
}

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
    lightbox.style.display = 'none';
}

// NEW FEATURED CREATORS CAROUSEL
document.addEventListener('DOMContentLoaded', () => {
  const featuredTrack = document.getElementById('featured-carousel');
  const featuredCards = featuredTrack ? featuredTrack.querySelectorAll('.app-card') : [];

  if (featuredTrack && featuredCards.length > 0) {
    console.log('Featured Creators Carousel Initialized');
  }
});

const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const carousel = document.querySelector(".carousel-container"); 

// Listen for clicks inside the carousel
if (carousel) {
    carousel.addEventListener('click', function(e) {
      if (e.target.classList.contains('zoomable')) {
        modal.style.display = "flex";
        modalImg.src = e.target.src;
      }
    });
}

// Close modal when clicking the 'x'
const closeButton = document.querySelector(".close");
if (closeButton) {
    closeButton.onclick = () => {
      modal.style.display = "none";
    };
}

// Close modal when clicking the background
if (modal) {
    modal.onclick = (e) => {
      if (e.target !== modalImg) {
        modal.style.display = "none";
      }
    };
}

function openTripEntryModal(event) {
    if (event) {
        event.stopPropagation();
    }
    const modal = document.getElementById('tripEntryModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeTripEntryModal() {
    const modal = document.getElementById('tripEntryModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function openCreatorModal(creatorId) {
    // 1. Lower the navbar z-index when opening
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.zIndex = "0"; 
    }

    const template = document.getElementById('content-' + creatorId);
    if(template) {
        document.getElementById('modal-body').innerHTML = template.innerHTML;
        document.getElementById('creator-modal').style.display = 'flex';
    }
}

function closeCreatorModal() {
    // 2. Reset the navbar z-index when closing
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.zIndex = "8000"; // Change this to whatever your original navbar z-index is
    }

    document.getElementById('creator-modal').style.display = 'none';
}