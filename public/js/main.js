// Main JavaScript - Navigation and UI

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSmoothScroll();
  initHeaderScroll();
  checkUrlParams();
});

// Mobile menu toggle
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Header background on scroll
function initHeaderScroll() {
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('shadow-md');
    } else {
      header.classList.remove('shadow-md');
    }
  });
}

// Check URL parameters for success/cancel
function checkUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.get('success') === 'true') {
    showSuccessModal();
    // Clean URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  if (urlParams.get('canceled') === 'true') {
    // Optionally show canceled message
    console.log('Payment was canceled');
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

// Show success modal
function showSuccessModal() {
  const modal = document.getElementById('success-modal');
  if (modal) {
    modal.classList.remove('hidden');
  }
}

// Close modal
function closeModal() {
  const modal = document.getElementById('success-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Make closeModal available globally
window.closeModal = closeModal;
