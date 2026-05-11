// Photo Scrolling Gallery
document.addEventListener('DOMContentLoaded', function() {
  const track = document.getElementById('photoScrollTrack');
  
  if (!track) return;
  
  // Load photos from manifest file
  fetch('/images/scrolling/photos.json')
    .then(response => response.json())
    .then(data => {
      const images = data.photos;
      
      // Shuffle the images array randomly
      for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
      }
      
      // Populate track with initial images
      images.forEach(filename => {
        const item = document.createElement('div');
        item.className = 'photo-scroll-item';
        
        const img = document.createElement('img');
        img.src = `/images/scrolling/${filename}`;
        img.alt = 'Gallery photo';
        img.loading = 'lazy';
        
        item.appendChild(img);
        track.appendChild(item);
      });
      
      // Enable animation
      track.parentElement.setAttribute('data-animated', 'true');
      
      // Clone all items for seamless loop (like the working example)
      const scrollerContent = Array.from(track.children);
      scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute('aria-hidden', 'true');
        track.appendChild(duplicatedItem);
      });
      
      console.log(`Photo scroll: ${images.length} images duplicated for seamless infinite scroll`);
    })
    .catch(error => console.error('Failed to load photos manifest:', error));
});
