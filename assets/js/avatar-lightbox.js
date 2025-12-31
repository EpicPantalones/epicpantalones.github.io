// Avatar Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
  const lightbox = document.getElementById('avatarLightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const closeLightbox = document.getElementById('closeLightbox');
  const avatarTriggers = document.querySelectorAll('.avatar-trigger');

  // Open lightbox when avatar is clicked
  avatarTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent the parent link from navigating
      e.stopPropagation(); // Stop the event from bubbling to the card link
      
      const avatarSrc = this.getAttribute('data-avatar');
      const avatarAlt = this.getAttribute('alt');
      lightboxImage.src = avatarSrc;
      lightboxImage.alt = avatarAlt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close lightbox when X is clicked
  closeLightbox.addEventListener('click', function() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close lightbox with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});
