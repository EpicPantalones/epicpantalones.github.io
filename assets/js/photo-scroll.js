// Photo Scrolling Gallery
document.addEventListener('DOMContentLoaded', function() {
  const track = document.getElementById('photoScrollTrack');
  
  if (!track) return;
  
  // Set the number of photos in the scrolling folder
  const num_photos = 26; // Update this to match the number of photos you have
  
  // Auto-generate image filenames (photo1.jpg, photo2.jpg, etc.)
  const images = Array.from({ length: num_photos }, (_, i) => `photo${i + 1}.jpg`);
  
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
  
  console.log(`Photo scroll: ${num_photos} images duplicated for seamless infinite scroll`);
});
