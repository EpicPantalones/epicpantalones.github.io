// Author Card Popup on Home Button Hover
document.addEventListener('DOMContentLoaded', function() {
  const homeButton = document.getElementById('home-button');
  const popup = document.getElementById('authorCardPopup');
  
  if (!homeButton || !popup) return;
  
  let hideTimeout;
  
  // Show popup on home button hover
  homeButton.addEventListener('mouseenter', function() {
    clearTimeout(hideTimeout);
    popup.classList.add('active');
  });
  
  // Keep popup visible when hovering over it
  popup.addEventListener('mouseenter', function() {
    clearTimeout(hideTimeout);
    popup.classList.add('active');
  });
  
  // Hide popup when leaving home button
  homeButton.addEventListener('mouseleave', function() {
    hideTimeout = setTimeout(function() {
      popup.classList.remove('active');
    }, 200);
  });
  
  // Hide popup when leaving the popup itself
  popup.addEventListener('mouseleave', function() {
    hideTimeout = setTimeout(function() {
      popup.classList.remove('active');
    }, 200);
  });
});
