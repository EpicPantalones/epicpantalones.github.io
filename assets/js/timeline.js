// Horizontal Timeline
document.addEventListener('DOMContentLoaded', function() {
  const timelineTrack = document.getElementById('timelineTrack');
  const timelineDetails = document.getElementById('timelineDetails');
  
  if (!timelineTrack) return;
  
  // Fetch the timeline data
  fetch('/assets/data/timeline.json')
    .then(response => response.json())
    .then(data => {
      initializeTimeline(data, timelineTrack, timelineDetails);
    })
    .catch(error => {
      console.error('Error loading timeline data:', error);
      // Show error message
      if (timelineDetails) {
        timelineDetails.innerHTML = '<p style="color: red;">Error loading timeline data</p>';
      }
    });
});

function initializeTimeline(timelineData, track, detailsPanel) {
  const config = timelineData.timeline_config || {};
  let events = timelineData.events || [];
  
  if (events.length === 0) {
    detailsPanel.innerHTML = '<p>No timeline events found</p>';
    return;
  }
  
  // Sort events by start_date
  events.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
  
  let selectedEvent = null;
  
  // Create event elements
  events.forEach((event, index) => {
    const eventElement = createEventElement(event, index);
    track.appendChild(eventElement);
    
    // Add click/hover listeners
    eventElement.addEventListener('click', () => {
      selectEvent(event, eventElement, detailsPanel);
      selectedEvent = event;
    });
    
    eventElement.addEventListener('mouseenter', () => {
      // Show on hover
      if (!selectedEvent) {
        updateDetails(event, detailsPanel);
      }
    });
    
    eventElement.addEventListener('mouseleave', () => {
      // Restore previous selection or show default
      if (selectedEvent) {
        updateDetails(selectedEvent, detailsPanel);
      } else if (index === 0) {
        updateDetails(event, detailsPanel);
      }
    });
  });
  
  // Scroll to the right to show most recent items
  const timelineContainer = document.querySelector('.timeline-container');
  if (timelineContainer) {
    // Use setTimeout to ensure layout is complete before scrolling
    setTimeout(() => {
      timelineContainer.scrollLeft = timelineContainer.scrollWidth - timelineContainer.clientWidth;
    }, 0);
  }
  
  // Show first event by default
  if (events.length > 0) {
    updateDetails(events[0], detailsPanel);
  }
}

function createEventElement(event, index) {
  const eventDiv = document.createElement('div');
  eventDiv.className = 'timeline-event';
  
  // Extract year from date
  const startDate = new Date(event.start_date);
  const year = startDate.getFullYear();
  
  // Truncate title if needed
  const titleText = event.title.length > 20 ? 
    event.title.substring(0, 17) + '...' : 
    event.title;
  
  eventDiv.innerHTML = `
    <div class="event-marker"></div>
    <div class="event-card">
      <div class="event-year">${year}</div>
      <div class="event-title">${event.title}</div>
      <div class="event-type">${event.type || 'event'}</div>
    </div>
  `;
  
  eventDiv.dataset.eventIndex = index;
  return eventDiv;
}

function selectEvent(event, eventElement, detailsPanel) {
  // Remove active state from all events
  document.querySelectorAll('.timeline-event').forEach(el => {
    el.classList.remove('active');
  });
  
  // Add active state to selected
  eventElement.classList.add('active');
  
  // Update details
  updateDetails(event, detailsPanel);
}

function updateDetails(event, detailsPanel) {
  const startDate = new Date(event.start_date);
  
  // Check if end_date is "present" or "now" (for ongoing events)
  const isOngoing = event.end_date === "present" || event.end_date === "now";
  
  const startStr = formatDate(startDate);
  let dateStr;
  
  if (isOngoing) {
    dateStr = `${startStr} – Present`;
  } else {
    const endDate = new Date(event.end_date);
    const endStr = formatDate(endDate);
    
    // Check if it's a single day event (milestone)
    const isSingleDay = startDate.getTime() === endDate.getTime();
    dateStr = isSingleDay ? startStr : `${startStr} – ${endStr}`;
  }
  
  let html = `
    <div class="detail-header">
      <h3 class="detail-title">${event.title}</h3>
      <div class="detail-meta">
        <div class="detail-dates">
          <span>${dateStr}</span>
        </div>
        <span class="detail-type">${event.type || 'event'}</span>
      </div>
    </div>
    <div class="detail-content">
      ${event.description}
    </div>
  `;
  
  if (event.image_caption) {
    html += `<div class="detail-image-caption">
      <p>${event.image_caption}</p>
    </div>`;
  }
  
  if (event.image) {
    html += `<div class="detail-image-container">
      <img src="${event.image}" alt="${event.title}" class="detail-image" onerror="this.style.display='none';">`;
    html += `</div>`;
  }
  
  detailsPanel.innerHTML = html;
  
  detailsPanel.innerHTML = html;
  detailsPanel.classList.remove('no-selection');
}

function formatDate(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
