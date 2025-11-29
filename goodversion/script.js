/**
 * Event Management System - Feature Documentation
 * 
 * 1. USER AUTHENTICATION & PROFILE MANAGEMENT
 * ------------------------------------------
 * - User Registration & Login
 *   * handleLogin() - Processes user login
 *   * showLogin() - Displays login form
 *   * toggleLoginType() - Switches between user/organizer login
 * 
 * - Profile Management
 *   * renderUserProfile() - Displays user profile
 *   * editProfile() - Enables profile editing
 *   * saveProfileChanges() - Saves profile updates
 *   * handleImageUpload() - Manages profile picture upload
 *   * deleteAccount() - Handles account deletion
 * 
 * 2. EVENT DISCOVERY & SEARCH
 * --------------------------
 * - Search & Filtering
 *   * showSearch() - Main search interface
 *   * filterEvents() - Filters events based on criteria
 *   * filterByCategory() - Filters by event category
 *   * sortEvents() - Sorts events by various criteria
 * 
 * - Location Features
 *   * useCurrentLocation() - Gets user's current location
 *   * selectCity() - Handles city selection
 *   * calculateDistance() - Calculates distance between points
 *   * updateDistanceFilter() - Updates distance-based filtering
 * 
 * 3. EVENT MANAGEMENT (ORGANIZER)
 * -----------------------------
 * - Event Creation & Editing
 *   * showCreateEvent() - Event creation interface
 *   * handleCreateEvent() - Processes new event creation
 *   * editEvent() - Event editing interface
 *   * handleEditEvent() - Processes event updates
 *   * deleteEvent() - Removes events
 * 
 * - Analytics & Management
 *   * showEventAnalytics() - Displays event statistics
 *   * getEventViews() - Tracks event views
 *   * incrementEventViews() - Updates view count
 *   * showAttendeeManagement() - Manages attendees
 * 
 * 4. TICKET MANAGEMENT
 * ------------------
 * - Booking System
 *   * addToBasket() - Adds tickets to cart
 *   * updateTicketQuantity() - Updates ticket count
 *   * validateTicketQuantity() - Validates ticket numbers
 *   * getTicketAvailability() - Checks ticket availability
 * 
 * - Digital Tickets
 *   * downloadTicket() - Downloads ticket as image
 *   * shareTicket() - Shares ticket via Web Share API
 *   * showTicketDetail() - Displays ticket information
 * 
 * 5. LOCATION SERVICES
 * -----------------
 * - Map Integration
 *   * initMap() - Initializes map
 *   * addEventMarkers() - Adds event markers to map
 *   * updateMapView() - Updates map display
 *   * toggleMapView() - Shows/hides map
 * 
 * 6. SOCIAL FEATURES
 * ----------------
 * - Bookmarking
 *   * toggleBookmark() - Toggles event bookmark
 *   * getUserBookmarks() - Gets user's bookmarked events
 *   * renderBookmarkedEvents() - Displays bookmarked events
 * 
 * - Reviews
 *   * submitReview() - Submits event review
 *   * editReview() - Edits existing review
 *   * deleteReview() - Removes review
 *   * displayReviews() - Shows event reviews
 * 
 * 7. PAYMENT INTEGRATION
 * -------------------
 * - PayPal Integration
 *   * initPayPal() - Initializes PayPal
 *   * loadPayPalSDK() - Loads PayPal SDK
 *   * submitOrder() - Processes payment
 * 
 * 8. DATA MANAGEMENT
 * ----------------
 * - Local Storage
 *   * saveBasket() - Saves cart data
 *   * getBasket() - Retrieves cart data
 *   * saveEventReviews() - Stores reviews
 *   * getEventReviews() - Retrieves reviews
 * 
 * 9. UTILITY FUNCTIONS
 * -----------------
 * - Helper Functions
 *   * formatDate() - Formats dates
 *   * isValidEmail() - Validates email
 *   * showNotification() - Displays notifications
 *   * goBack() - Navigation helper
 */

// Add this at the beginning of the file, after the eventData declaration
// Load events from localStorage on page load
window.addEventListener('load', function() {
  const savedEvents = localStorage.getItem('eventData');
  if (savedEvents) {
    Object.assign(eventData, JSON.parse(savedEvents));
  }
  
  const savedTicketAvailability = localStorage.getItem('ticketAvailability');
  if (savedTicketAvailability) {
    Object.assign(ticketAvailability, JSON.parse(savedTicketAvailability));
  }
});

let bookmarks = [];
let map = null;
let markers = [];
let infoWindow = null;
let mapInitialized = false;

// Add event data with dates
const eventData = {
  'Tech Conference 2025': {
    date: '2025-07-02',
    image: 'IDC-Directions.jpg',
    location: 'King Abdullah Financial District (KAFD), Riyadh',
    price: 50,
    category: 'Technology',
    description: 'Join us for the biggest tech conference in Saudi Arabia. Network with industry leaders, attend workshops, and discover the latest innovations.',
    coordinates: { lat: 24.7519, lng: 46.6417 },
    organizer: {
      name: 'Tech Events Saudi',
      email: 'contact@techevents.sa',
      phone: '+966 11 123 4567'
    },
    reviews: []
  },
  'Startup Meetup': {
    date: '2025-06-03',
    image: '7-Great-Startup-Events-1-1024x675.webp',
    location: 'Imam Muhammad Ibn Saud Islamic University, Riyadh 13318',
    price: 0, // Changed ticket price to 0
    category: 'Technology',
    description: 'Connect with fellow entrepreneurs and investors at our monthly startup meetup. Share ideas, get feedback, and find potential collaborators.',
    coordinates: { lat: 24.814869092990563, lng: 46.71139425517835 },
    organizer: {
      name: 'Saudi Startup Network',
      email: 'info@saudistartup.net',
      phone: '+966 11 987 6543'
    },
    reviews: []
  },
  'Gourmet Food Festival': {
    date: '2025-08-15',
    image: 'grilled_food.jpg.webp', // Placeholder image
    location: 'The Boulevard, Riyadh',
    price: 50,
    category: 'Food & Drink',
    description: 'A culinary journey featuring the best local and international cuisine.',
    coordinates: { lat: 24.7115, lng: 46.6577 },
    organizer: {
      name: 'Foodie Events',
      email: 'contact@foodieevents.com',
      phone: '+966 11 234 5678'
    },
    reviews: []
  },
  'Art Exhibition': {
    date: '2025-09-10',
    image: 'OIP.jpg', // Placeholder image
    location: 'National Museum, Riyadh',
    price: 30,
    category: 'Arts & Culture',
    description: 'Showcasing contemporary art from Saudi Arabian artists.',
    coordinates: { lat: 24.6468, lng: 46.7102 },
    organizer: {
      name: 'Saudi Arts Council',
      email: 'info@saudiartscouncil.org',
      phone: '+966 11 345 6789'
    },
    reviews: []
  },
  'Riyadh Marathon 2025': {
    date: '2025-10-20',
    image: 'sport.jpg', // Placeholder image
    location: 'Riyadh City Center',
    price: 100,
    category: 'Sports',
    description: 'Join runners from around the world in the annual Riyadh Marathon.',
    coordinates: { lat: 24.6333, lng: 46.7167 },
    organizer: {
      name: 'Saudi Sports Federation',
      email: 'contact@saudisports.sa',
      phone: '+966 11 456 7890'
    },
    reviews: []
  }
};

const eventCategories = {
  'Food & Drink': 'fa-utensils',
  'Arts & Culture': 'fa-palette',
  'Technology': 'fa-microchip',
  'Sports': 'fa-futbol',
  'Music': 'fa-music',
  'Business': 'fa-briefcase'
};

const popularCities = [
  { name: 'Riyadh, Saudi Arabia', coordinates: { lat: 24.7136, lng: 46.6753 } },
  { name: 'Dubai, UAE', coordinates: { lat: 25.2048, lng: 55.2708 } },
  { name: 'London, UK', coordinates: { lat: 51.5074, lng: -0.1278 } },
  { name: 'New York, USA', coordinates: { lat: 40.7128, lng: -74.0060 } },
  { name: 'Tokyo, Japan', coordinates: { lat: 35.6762, lng: 139.6503 } }
];

let userLocation = null;
let selectedCity = null;
const NEARBY_RADIUS_KM = 200; // Increased from 50km to 200km to allow for larger search radius

// Add ticket availability data structure with version control
const ticketAvailability = {
  'Tech Conference 2025': { total: 100, available: 100, version: 1 },
  'Startup Meetup': { total: 50, available: 50, version: 1 },
  'Gourmet Food Festival': { total: 150, available: 150, version: 1 },
  'Art Exhibition': { total: 80, available: 80, version: 1 },
  'Riyadh Marathon 2025': { total: 500, available: 500, version: 1 }
};

// Add organizer data structure
const organizers = [
  {
    email: 'organizer1@example.com',
    password: 'org123',
    name: 'John Organizer',
    company: 'Event Pro'
  },
  {
    email: 'organizer2@example.com',
    password: 'org456',
    name: 'Sarah Events',
    company: 'Event Solutions'
  }
];

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function handleHashChange() {
  const pathname = window.location.pathname;
  if (pathname.includes("search.html")) {
    const hash = window.location.hash;
    if (hash.startsWith('#event=')) {
      const title = decodeURIComponent(hash.split('=')[1]);
      showEventDetail(title);
    } else {
      showSearch();
    }
  }
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

function getUserBookmarks(email) {
  return JSON.parse(localStorage.getItem(`bookmarks_${email}`)) || [];
}

function toggleBookmark(title) {
  const user = getCurrentUser();
  if (!user) {
    showNotification('Please log in to bookmark events', 'error');
    return;
  }

  const key = `bookmarks_${user.email}`;
  let bookmarks = getUserBookmarks(user.email);
  const bookmarkBtn = event.target.closest('.bookmark');
  
  if (bookmarks.includes(title)) {
    bookmarks = bookmarks.filter(item => item !== title);
    localStorage.setItem(key, JSON.stringify(bookmarks));
    
    // Update button state with animation
    bookmarkBtn.classList.remove('bookmarked');
    bookmarkBtn.innerHTML = `
      <i class="fas fa-bookmark"></i>
      <span class="bookmark-tooltip">Add to Bookmarks</span>
    `;
    showNotification('Event removed from bookmarks', 'success');
    
    // If on bookmarks page, refresh the list with animation
    if (window.location.pathname.includes("bookmarks.html")) {
      renderBookmarkedEvents();
    }
  } else {
    bookmarks.push(title);
    localStorage.setItem(key, JSON.stringify(bookmarks));
    
    // Update button state with animation
    bookmarkBtn.classList.add('bookmarked');
    bookmarkBtn.innerHTML = `
      <i class="fas fa-bookmark"></i>
      <span class="bookmark-tooltip">Remove from Bookmarks</span>
    `;
    showNotification('Event added to bookmarks', 'success');
  }
}

function showNotification(message, type = 'success') {
  // Remove any existing notifications
  const existingNotification = document.querySelector('.bookmark-notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create new notification
  const notification = document.createElement('div');
  notification.className = `bookmark-notification ${type}`;
  
  notification.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  // Show notification with animation
  requestAnimationFrame(() => {
    notification.classList.add('show');
  });
  
  // Remove notification after 3 seconds with animation
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 3000);
}

// ===================== UI RENDERING =====================

function showHome() {
  const currentUser = getCurrentUser();
  const currentOrganizer = getCurrentOrganizer();
  
  if (currentOrganizer) {
    showOrganizerDashboard();
    return;
  }

  // Load events from localStorage
  const savedEvents = localStorage.getItem('eventData');
  if (savedEvents) {
    Object.assign(eventData, JSON.parse(savedEvents));
  }

  const formArea = document.getElementById('form-area');
  if (!formArea) return;

  // Create category exploration section
  const categorySection = `
    <div class="category-exploration">
      <h2>Explore Events by Category</h2>
      <div class="category-grid">
        ${Object.entries(eventCategories).map(([category, icon]) => `
          <div class="category-card" onclick="window.location.href='search.html?category=${encodeURIComponent(category)}'">
            <i class="fas ${icon}"></i>
            <span>${category}</span>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="search-explore">
      <div class="search-explore-content">
        <h2>Explore All Events</h2>
        <p>Discover and search through our complete collection of events</p>
        <button class="explore-btn" onclick="window.location.href='search.html'">
          <i class="fas fa-search"></i>
          Start Exploring
        </button>
      </div>
    </div>
  `;

  formArea.innerHTML = categorySection;
}

/**
 * Displays and manages the search interface
 * 
 * Features:
 * - Keyword search
 * - Category filtering
 * - Date filtering
 * - Location-based search
 * - Interactive map view
 * - Sorting options
 */
function showSearch() {
  const formArea = document.getElementById('form-area');
  if (!formArea) return;

  // Get category from URL if present
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');

  // Load events from localStorage
  const savedEvents = localStorage.getItem('eventData');
  if (savedEvents) {
    Object.assign(eventData, JSON.parse(savedEvents));
  }

  const searchSection = `
    <div class="search-container">
      <h2>Search Events</h2>
      
      <div class="location-filters">
        <div class="location-controls">
          <button class="location-btn" onclick="useCurrentLocation()">
            <i class="fas fa-location-arrow"></i> Use My Location
          </button>
          <div class="city-selector">
            <select id="citySelect" onchange="selectCity(this.value)">
              <option value="">Select a city</option>
              ${popularCities.map(city => 
                `<option value="${city.name}">${city.name}</option>`
              ).join('')}
            </select>
          </div>
          <button class="map-toggle-btn" onclick="toggleMapView()">
            <i class="fas fa-map"></i> Show Map
          </button>
        </div>
        <div class="location-status" id="locationStatus"></div>
      </div>

      <div class="search-filters">
        <div class="search-inputs">
          <input type="text" id="searchQuery" placeholder="Search by keyword..." onkeyup="filterEvents()" />
          <div class="date-filter">
            <input type="date" id="eventDate" onchange="filterEvents()" placeholder="Filter by Date" />
          </div>
        </div>

        <div class="category-filters">
          ${Object.entries(eventCategories).map(([category, icon]) => `
            <button class="category-btn ${category === categoryParam ? 'active' : ''}" 
                    onclick="filterByCategory('${category}')">
              <i class="fas ${icon}"></i>
              ${category}
            </button>
          `).join('')}
        </div>

        <div class="distance-filter">
          <label for="distanceRange">Distance: <span id="distanceValue">50</span> km</label>
          <input type="range" id="distanceRange" min="5" max="100" value="50" 
                 onchange="updateDistanceFilter(this.value)" />
        </div>
      </div>

      <div id="map-container" class="map-container"></div>
      
      <div class="search-results-header">
        <h3>Search Results</h3>
        <div class="sort-options">
          <select id="sortBy" onchange="sortEvents(this.value)">
            <option value="date">Sort by Date</option>
            <option value="distance">Sort by Distance</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>
      </div>

      <ul id="searchResults" class="event-list">
        ${renderEventList(Object.entries(eventData))}
      </ul>
    </div>
  `;

  formArea.innerHTML = searchSection;

  // Add custom styles
  const style = document.createElement('style');
  style.textContent = `
    .search-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .location-filters {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .location-controls {
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }

    .location-btn, .map-toggle-btn {
      padding: 0.8rem 1.5rem;
      background: #764ba2;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .location-btn:hover, .map-toggle-btn:hover {
      background: #5d3d7e;
    }

    .city-selector select {
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      min-width: 200px;
    }

    .location-status {
      margin-top: 1rem;
      padding: 0.8rem;
      border-radius: 6px;
    }

    .location-status .success {
      background: #d4edda;
      color: #155724;
    }

    .location-status .error {
      background: #f8d7da;
      color: #721c24;
    }

    .search-filters {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .search-inputs {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }

    .search-inputs input[type="text"] {
      flex: 1;
      min-width: 200px;
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 6px;
    }

    .date-filter {
      display: flex;
      gap: 1rem;
    }

    .date-filter input {
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 6px;
    }

    .category-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
      margin-bottom: 1rem;
    }

    .category-btn {
      padding: 0.8rem 1.2rem;
      background: #f8f9fa;
      border: 1px solid #ddd;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .category-btn:hover {
      background: #e9ecef;
    }

    .category-btn.active {
      background: #764ba2;
      color: white;
      border-color: #764ba2;
    }

    .distance-filter {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }

    .distance-filter label {
      display: block;
      margin-bottom: 0.5rem;
      color: #6c757d;
    }

    .distance-filter input[type="range"] {
      width: 100%;
      height: 6px;
      background: #ddd;
      border-radius: 3px;
      outline: none;
    }

    .distance-filter input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 18px;
      height: 18px;
      background: #764ba2;
      border-radius: 50%;
      cursor: pointer;
    }

    .map-container {
      height: 400px;
      border-radius: 12px;
      margin: 1.5rem 0;
      display: none;
    }

    .map-container.expanded {
      display: block;
    }

    .search-results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .sort-options select {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 6px;
    }

    .event-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .event-list li {
      display: flex;
      background: white;
      border-radius: 12px;
      margin-bottom: 1rem;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: transform 0.3s ease;
    }

    .event-list li:hover {
      transform: translateY(-2px);
    }

    .event-list img {
      width: 200px;
      height: 150px;
      object-fit: cover;
      border-radius: 8px;
      margin-right: 1rem;
    }

    .event-info {
      flex: 1;
    }

    .event-info span {
      font-size: 1.2rem;
      font-weight: bold;
      color: #2c3e50;
      display: block;
      margin-bottom: 0.5rem;
    }

    .event-info p {
      margin: 0.3rem 0;
      color: #6c757d;
    }

    .event-info i {
      color: #764ba2;
      margin-right: 0.5rem;
      width: 20px;
    }

    .bookmark {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
      transition: transform 0.3s ease;
    }

    .bookmark:hover {
      transform: scale(1.2);
    }
  `;
  document.head.appendChild(style);

  // If category parameter exists, filter events by that category
  if (categoryParam) {
    filterByCategory(categoryParam);
  }

  // Try to get user's location on page load
  useCurrentLocation();
}

async function useCurrentLocation() {
  const locationStatus = document.getElementById('locationStatus');
  locationStatus.innerHTML = '<p>Detecting your location...</p>';

  getCurrentLocation()
    .then(location => {
      selectedCity = null;
      document.getElementById('citySelect').value = '';
      // Get the current value of the distance range input
      const currentDistance = document.getElementById('distanceRange').value;
      locationStatus.innerHTML = `
        <p class="success">
          <i class="fas fa-check-circle"></i> 
          Location detected! Showing events within ${currentDistance}km
        </p>`;
      updateMapView();
      filterEvents();
    })
    .catch(error => {
      locationStatus.innerHTML = `
        <p class="error">
          <i class="fas fa-exclamation-circle"></i> 
          ${error.message}. Please select a city manually.
        </p>`;
    });
}

function selectCity(cityName) {
  if (!cityName) {
    userLocation = null;
    selectedCity = null;
    document.getElementById('locationStatus').innerHTML = '';
    updateMapView();
    filterEvents();
    return;
  }

  selectedCity = popularCities.find(city => city.name === cityName);
  userLocation = null;
  document.getElementById('locationStatus').innerHTML = `
    <p class="success">
      <i class="fas fa-check-circle"></i> 
      Showing events in ${cityName}
    </p>`;
  updateMapView();
  filterEvents();
}

function filterEvents() {
  const keyword = document.getElementById('searchQuery').value.toLowerCase();
  const selectedDate = document.getElementById('eventDate').value;
  const events = document.querySelectorAll('#searchResults li');
  const activeCategory = document.querySelector('.category-btn.active')?.textContent.trim();
  const distanceLimit = parseInt(document.getElementById('distanceRange').value);

  events.forEach(event => {
    const title = event.querySelector('.event-info span').textContent;
    const eventCategory = event.querySelector('.event-category').textContent.trim();
    
    const matchKeyword = title.toLowerCase().includes(keyword);
    
    // Filter by selected date (exact match)
    let matchDate = true;
    if (selectedDate) {
      const eventInfo = eventData[title];
      if (eventInfo && eventInfo.date) {
        // Compare the date strings directly (YYYY-MM-DD format)
        const eventDateStr = eventInfo.date.split('T')[0]; // Get just the date part if there's a time component
        matchDate = eventDateStr === selectedDate;
      }
    }
    
    const matchCategory = !activeCategory || eventCategory === activeCategory;
    
    // Location filtering
    let matchLocation = true;
    if (userLocation || selectedCity) {
      const eventInfo = eventData[title];
      if (eventInfo) {
        // Check if the event has location data
        if (eventInfo.location) {
          // If a city is selected, check if the event is in that city
          if (selectedCity) {
            let eventCity;
            // Handle both string and object location formats
            if (typeof eventInfo.location === 'string') {
              // For string format, try to extract city name
              const locationStr = eventInfo.location.toLowerCase();
              const selectedCityName = selectedCity.name.split(',')[0].trim().toLowerCase();
              
              // Check if the location string contains the city name
              matchLocation = locationStr.includes(selectedCityName);
            } else {
              // For object format, use the city property
              eventCity = eventInfo.location.city;
              const selectedCityName = selectedCity.name.split(',')[0].trim();
              matchLocation = eventCity.toLowerCase() === selectedCityName.toLowerCase();
            }
          } else if (userLocation && eventInfo.coordinates) {
            // If using current location, check distance
            const eventCoords = eventInfo.coordinates;
            const distance = calculateDistance(
              userLocation.lat,
              userLocation.lng,
              eventCoords.lat,
              eventCoords.lng
            );
            
            // Update distance display
            const distanceElement = event.querySelector('.distance-value');
            if (distanceElement) {
              distanceElement.textContent = `${distance.toFixed(1)} km`;
              distanceElement.parentElement.style.display = 'block';
            }
            
            matchLocation = distance <= distanceLimit;
          }
        }
      }
    }
    
    event.style.display = matchKeyword && matchDate && matchCategory && matchLocation ? 'flex' : 'none';
  });
}

function goToEvent(title) {
  showEventDetail(title);
}

function showEventDetail(title) {
  // Increment event views
  incrementEventViews(title);

  const event = eventData[title];
  if (!event) return;

  const mainContent = document.getElementById('form-area');
  if (!mainContent) return;

  // Get current user for bookmark functionality
  const currentUser = getCurrentUser();
  const isBookmarked = currentUser ? getUserBookmarks(currentUser.email).includes(title) : false;

  // Format the date
  const formattedDate = formatDate(event.date);

  mainContent.innerHTML = `
    <div class="event-detail-container">
      <div class="event-header">
        <div class="event-image-container">
          <img src="${event.image}" alt="${title}" class="event-image">
          ${currentUser ? `
            <button onclick="toggleBookmark('${title}')" class="bookmark ${isBookmarked ? 'bookmarked' : ''}">
              <i class="fas fa-bookmark"></i>
              <span class="bookmark-tooltip">${isBookmarked ? 'Remove from Bookmarks' : 'Add to Bookmarks'}</span>
            </button>
          ` : ''}
        </div>
        <div class="event-info">
          <h1 class="event-title">${title}</h1>
          <div class="event-meta">
            <div class="meta-item">
              <i class="fas fa-calendar"></i>
              <span>${formattedDate}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>${event.location}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-tag"></i>
              <span>$${event.price}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-user"></i>
              <span>${event.organizer.name || event.organizer}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="event-content">
        <div class="event-description">
          <h2>About This Event</h2>
          <p>${event.description}</p>
        </div>

        <div class="event-details-grid">
          <div class="detail-card">
            <i class="fas fa-info-circle"></i>
            <h3>Event Details</h3>
            <ul>
              <li><strong>Category:</strong> ${event.category}</li>
              <li><strong>Organizer:</strong> ${event.organizer.name || event.organizer}</li>
            </ul>
          </div>

          <div class="detail-card">
            <i class="fas fa-ticket-alt"></i>
            <h3>Ticket Information</h3>
            <ul>
              <li><strong>Price:</strong> $${event.price}</li>
              <li><strong>Availability:</strong> ${ticketAvailability[title]?.available > 0 ? 'Available' : 'Sold Out'}</li>
              ${ticketAvailability[title]?.available > 0 ? `
                <li><strong>Tickets Left:</strong> ${ticketAvailability[title].available}</li>
              ` : ''}
            </ul>
            ${ticketAvailability[title]?.available > 0 ? `
              <div class="ticket-controls">
                <button onclick="updateTicketQuantity('${title}', -1)" class="quantity-btn">-</button>
                <input type="number" id="ticket-quantity" value="1" min="1" max="${ticketAvailability[title].available}" 
                       onchange="validateTicketQuantity('${title}', this.value)">
                <button onclick="updateTicketQuantity('${title}', 1)" class="quantity-btn">+</button>
                <button onclick="addToBasket('${title}', document.getElementById('ticket-quantity').value)" 
                        class="add-to-basket-btn">
                  Add to Basket
                </button>
              </div>
            ` : `
              <div class="sold-out-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>This event is sold out</p>
              </div>
            `}
          </div>

          <div class="detail-card">
            <i class="fas fa-map-marker-alt"></i>
            <h3>Event Location</h3>
            <div id="event-map" style="height: 300px; width: 100%; margin-top: 15px;"></div>
          </div>

          <div class="detail-card organizer-card">
            <i class="fas fa-user-tie"></i>
            <h3>Organizer Information</h3>
            <div class="organizer-info">
              <ul>
                <li><strong>Name:</strong> ${event.organizer.name || event.organizer}</li>
                <li><strong>Email:</strong> <a href="mailto:${event.organizer.email || ''}">${event.organizer.email || 'Not available'}</a></li>
                <li><strong>Phone:</strong> <a href="tel:${event.organizer.phone || ''}">${event.organizer.phone || 'Not available'}</a></li>
              </ul>
              <div class="organizer-actions">
                ${event.organizer.email ? `
                  <button onclick="window.location.href='mailto:${event.organizer.email}'" class="contact-btn">
                    <i class="fas fa-envelope"></i> Email Organizer
                  </button>
                ` : ''}
                ${event.organizer.phone ? `
                  <button onclick="window.location.href='tel:${event.organizer.phone}'" class="contact-btn">
                    <i class="fas fa-phone"></i> Call Organizer
                  </button>
                ` : ''}
              </div>
            </div>
          </div>
        </div>

        <div class="event-reviews">
          <h2>Reviews</h2>
          <div id="reviews-container"></div>
          ${currentUser ? `
            <div class="review-form">
              <h3>Write a Review</h3>
              <div class="star-rating">
                ${Array(5).fill().map((_, i) => `
                  <i class="far fa-star" data-rating="${i + 1}"></i>
                `).join('')}
              </div>
              <textarea id="review-comment" placeholder="Write your review here..."></textarea>
              <input type="hidden" id="review-rating" value="5">
              <button onclick="submitReview('${title}')" class="submit-review-btn">Submit Review</button>
            </div>
          ` : `
            <p class="login-prompt">Please <a href="login.html">login</a> to write a review.</p>
          `}
        </div>
      </div>
    </div>
  `;

  // Initialize map if coordinates exist
  if (event.coordinates) {
    initEventDetailMap('event-map', event.coordinates, title);
  }

  // Display reviews
  displayReviews(title);

  // Initialize star rating for the review form
  initializeStarRating();
}

// Add function to initialize Leaflet map for event detail page
function initEventDetailMap(mapElementId, coordinates, title) {
  const mapContainer = document.getElementById(mapElementId);
  if (!mapContainer) return;

  // Ensure map is initialized only once for this container
  if (mapContainer._leaflet_id) {
      mapContainer._leaflet_id = null; // Reset Leaflet ID to allow reinitialization
      // Attempt to remove the map if it was already initialized
      try {
          mapContainer.innerHTML = ''; // Clear previous map content
      } catch (e) {
          console.warn('Could not clear map container innerHTML:', e);
      }
  }

  const map = L.map(mapContainer).setView([coordinates.lat, coordinates.lng], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Add a marker for the event location
  L.marker([coordinates.lat, coordinates.lng]).addTo(map)
    .bindPopup(title)
    .openPopup();

  // Invalidate map size to ensure it displays correctly
  setTimeout(() => { map.invalidateSize(); }, 100);
}

// Add additional CSS for organizer card
const organizerStyles = document.createElement('style');
organizerStyles.textContent = `
  .organizer-card {
    grid-column: 1 / -1;
  }

  .organizer-info {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .organizer-info ul {
    margin-bottom: 15px;
  }

  .organizer-info a {
    color: #764ba2;
    text-decoration: none;
  }

  .organizer-info a:hover {
    text-decoration: underline;
  }

  .organizer-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .contact-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 15px;
    background: #764ba2;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9em;
    transition: background-color 0.3s;
  }

  .contact-btn:hover {
    background: #5d3a7e;
  }

  .contact-btn i {
    font-size: 1.1em;
  }
`;
document.head.appendChild(organizerStyles);

// Add enhanced CSS for event detail page
const eventDetailStyles = document.createElement('style');
eventDetailStyles.textContent = `
  .event-detail-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .event-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 40px;
  }

  .event-image-container {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }

  .event-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .event-image:hover {
    transform: scale(1.02);
  }

  .bookmark-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
  }

  .bookmark-btn i {
    font-size: 20px;
    color: #666;
  }

  .bookmark-btn.bookmarked i {
    color: #e74c3c;
  }

  .bookmark-btn:hover {
    transform: scale(1.1);
  }

  .event-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .event-title {
    font-size: 2.5em;
    color: #333;
    margin-bottom: 20px;
    line-height: 1.2;
  }

  .event-meta {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .meta-item i {
    color: #764ba2;
    font-size: 1.2em;
  }

  .event-content {
    margin-top: 40px;
  }

  .event-description {
    margin-bottom: 40px;
  }

  .event-description h2 {
    color: #333;
    margin-bottom: 15px;
    font-size: 1.8em;
  }

  .event-description p {
    line-height: 1.6;
    color: #666;
    font-size: 1.1em;
  }

  .event-details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: 40px;
  }

  .detail-card {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }

  .detail-card i {
    font-size: 2em;
    color: #764ba2;
    margin-bottom: 15px;
  }

  .detail-card h3 {
    color: #333;
    margin-bottom: 15px;
    font-size: 1.4em;
  }

  .detail-card ul {
    list-style: none;
    padding: 0;
  }

  .detail-card li {
    margin-bottom: 10px;
    color: #666;
  }

  .detail-card strong {
    color: #333;
  }

  .ticket-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }

  .quantity-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: #764ba2;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.2em;
    transition: background-color 0.3s;
  }

  .quantity-btn:hover {
    background: #5d3a7e;
  }

  #ticket-quantity {
    width: 60px;
    height: 40px;
    text-align: center;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1.1em;
  }

  .add-to-basket-btn {
    flex: 1;
    height: 40px;
    background: #e74c3c;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1em;
    transition: background-color 0.3s;
  }

  .add-to-basket-btn:hover {
    background: #c0392b;
  }

  .event-reviews {
    margin-top: 40px;
  }

  .event-reviews h2 {
    color: #333;
    margin-bottom: 20px;
    font-size: 1.8em;
  }

  .review-form {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 12px;
    margin-top: 20px;
  }

  .review-form h3 {
    color: #333;
    margin-bottom: 15px;
  }

  .star-rating {
    display: flex;
    gap: 5px;
    margin-bottom: 15px;
  }

  .star-rating i {
    font-size: 1.5em;
    color: #ddd;
    cursor: pointer;
    transition: color 0.3s;
  }

  .star-rating i:hover,
  .star-rating i.active {
    color: #f1c40f;
  }

  #review-comment {
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 8px;
    margin-bottom: 15px;
    resize: vertical;
  }

  .submit-review-btn {
    background: #764ba2;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1em;
    transition: background-color 0.3s;
  }

  .submit-review-btn:hover {
    background: #5d3a7e;
  }

  .login-prompt {
    text-align: center;
    color: #666;
    margin-top: 20px;
  }

  .login-prompt a {
    color: #764ba2;
    text-decoration: none;
  }

  .login-prompt a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .event-header {
      grid-template-columns: 1fr;
    }

    .event-image {
      height: 300px;
    }

    .event-title {
      font-size: 2em;
    }

    .event-meta {
      grid-template-columns: 1fr;
    }
  }
`;
document.head.appendChild(eventDetailStyles);

function updateTicketQuantity(title, change) {
  const quantityInput = document.getElementById('ticket-quantity');
  const newQuantity = parseInt(quantityInput.value) + change;
  if (newQuantity >= 1) {
    quantityInput.value = newQuantity;
  }
}

function validateTicketQuantity(title, value) {
  const quantity = parseInt(value);
  if (isNaN(quantity) || quantity < 1) {
    document.getElementById('ticket-quantity').value = 1;
  }
}

// Function to get ticket availability from local storage with version check
function getTicketAvailability() {
  const storedData = localStorage.getItem('ticketAvailability');
  if (!storedData) {
    saveTicketAvailability(ticketAvailability);
    return ticketAvailability;
  }
  return JSON.parse(storedData);
}

// Function to save ticket availability to local storage
function saveTicketAvailability(availability) {
  localStorage.setItem('ticketAvailability', JSON.stringify(availability));
}

// Function to update ticket availability atomically
async function updateTicketAvailability(updates = null) {
  try {
    // Get current availability
    const currentAvailability = getTicketAvailability();
    
    // If updates are provided, apply them atomically
    if (updates) {
      for (const [eventTitle, update] of Object.entries(updates)) {
        if (currentAvailability[eventTitle]) {
          // Verify version matches before updating
          if (currentAvailability[eventTitle].version !== update.version) {
            throw new Error(`Version mismatch for ${eventTitle}. Please refresh and try again.`);
          }
          
          // Update availability and increment version
          currentAvailability[eventTitle] = {
            ...currentAvailability[eventTitle],
            available: update.available,
            version: update.version + 1
          };
        }
      }
    }
    
    // Save updated availability
    saveTicketAvailability(currentAvailability);
    return currentAvailability;
  } catch (error) {
    console.error('Error updating ticket availability:', error);
    throw error;
  }
}

// Function to verify and reserve tickets atomically
async function verifyAndReserveTickets(basket) {
  try {
    const currentAvailability = getTicketAvailability();
    const updates = {};
    const issues = [];

    // First pass: verify all tickets are available
    for (const item of basket) {
      const eventAvailability = currentAvailability[item.title];
      if (!eventAvailability) {
        issues.push(`${item.title}: Event not found`);
        continue;
      }

      if (eventAvailability.available < item.quantity) {
        issues.push(
          `${item.title}: Only ${eventAvailability.available} tickets available (requested ${item.quantity})`
        );
        continue;
      }

      // Prepare updates
      updates[item.title] = {
        available: eventAvailability.available - item.quantity,
        version: eventAvailability.version
      };
    }

    if (issues.length > 0) {
      return {
        success: false,
        message: issues.join('\n'),
        issues
      };
    }

    // Second pass: apply updates atomically
    await updateTicketAvailability(updates);
    return {
      success: true,
      message: 'Tickets reserved successfully'
    };
  } catch (error) {
    console.error('Error verifying and reserving tickets:', error);
    return {
      success: false,
      message: error.message,
      issues: [error.message]
    };
  }
}

// Add this function to initialize bookings if they don't exist
function initializeBookings(email) {
  if (!localStorage.getItem(`bookings_${email}`)) {
    localStorage.setItem(`bookings_${email}`, JSON.stringify([]));
  }
}

/**
 * Processes PayPal payment
 * @param {Object} paymentDetails - Payment information
 * 
 * Features:
 * - Integrates with PayPal SDK
 * - Handles payment processing
 * - Manages transaction status
 * - Updates ticket availability
 */
async function submitOrder(paymentDetails = null) {
  try {
    const user = getCurrentUser();
    if (!user) {
      alert('Please log in to submit your order');
      return { success: false, message: 'User not logged in' };
    }

    const basket = getBasket();
    if (basket.length === 0) {
      alert('Your basket is empty');
      return { success: false, message: 'Empty basket' };
    }

    // Check if any tickets require payment
    const hasPaidTickets = basket.some(item => item.price > 0);
    
    // If there are paid tickets but no payment details, reject the order
    if (hasPaidTickets && !paymentDetails) {
      alert('Payment is required for these tickets');
      return { success: false, message: 'Payment required' };
    }

    // Verify ticket availability
    const availabilityCheck = await verifyAndReserveTickets(basket);
    if (!availabilityCheck.success) {
      alert(availabilityCheck.message || 'Some tickets are no longer available');
      return { success: false, message: 'Tickets unavailable' };
    }

    // Get existing bookings for this user
    const userBookings = JSON.parse(localStorage.getItem(`bookings_${user.email}`)) || [];

    // Create new booking entries
    const newBookings = basket.map(item => {
      const event = eventData[item.title];
      return {
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        bookingDate: new Date().toISOString(),
        eventDate: event.date,
        location: event.location,
        image: event.image,
        category: event.category,
        description: event.description,
        organizer: event.organizer,
        paymentDetails: paymentDetails ? {
          paymentId: paymentDetails.id,
          status: paymentDetails.status,
          amount: paymentDetails.purchase_units[0].amount.value,
          currency: paymentDetails.purchase_units[0].amount.currency_code
        } : null,
        status: 'confirmed'
      };
    });

    // Add new bookings to user's bookings
    userBookings.push(...newBookings);
    
    // Update bookings in localStorage
    localStorage.setItem(`bookings_${user.email}`, JSON.stringify(userBookings));

    // Clear the basket after successful order
    saveBasket([]);

    return { success: true, message: 'Order submitted successfully' };
  } catch (error) {
    console.error('Error submitting order:', error);
    return { success: false, message: 'Error submitting order' };
  }
}

// Update the addToBasket function to check availability with version control
async function addToBasket(title, quantity) {
  const user = getCurrentUser();
  if (!user) {
    alert('Please log in to add tickets to your basket');
    window.location.href = 'login.html';
    return;
  }

  quantity = parseInt(quantity);
  if (isNaN(quantity) || quantity < 1) {
    alert('Please select a valid quantity');
    return;
  }

  try {
    // Get current availability
    const availability = getTicketAvailability();
    if (!availability || !availability[title]) {
      alert('Unable to verify ticket availability');
      return;
    }

    const currentBasket = getBasket();
    const existingItem = currentBasket.find(item => item.title === title);
    const totalRequested = (existingItem ? existingItem.quantity : 0) + quantity;

    if (totalRequested > availability[title].available) {
      alert(`Only ${availability[title].available} tickets available for ${title}`);
      return;
    }

    // Add to basket with complete information
    const basket = getBasket();
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    basket.push({
        title: title,
      quantity: quantity,
        price: eventData[title].price,
        version: availability[title].version
    });
  }

  saveBasket(basket);
    console.log('Updated basket:', basket); // Debug log
  alert(`Added ${quantity} ticket(s) to basket!`);
  } catch (error) {
    console.error('Error adding to basket:', error); // Debug log
    alert('Error adding tickets to basket: ' + error.message);
  }
}

function goBack() {
  const pathname = window.location.pathname;
  if (pathname.includes("bookmarks.html")) {
    renderBookmarkedEvents();
  } else if (pathname.includes("my-bookings.html")) {
    renderBookedEvents();
  } else {
    showSearch();
  }
}

// ===================== BOOKMARKED / BOOKED =====================

function renderBookmarkedEvents() {
  const formArea = document.getElementById('form-area');
  const user = getCurrentUser();

  if (!user) {
    formArea.innerHTML = `
      <div class="dashboard-container">
        <h2>My Bookmarks</h2>
        <div class="empty-state">
          <p>Please log in to view your bookmarks.</p>
          <a href="login.html" class="btn">Login</a>
        </div>
      </div>`;
    return;
  }

  const bookmarks = getUserBookmarks(user.email);

  if (bookmarks.length === 0) {
    formArea.innerHTML = `
      <div class="dashboard-container">
        <h2>My Bookmarks</h2>
        <div class="empty-state">
          <p>You haven't bookmarked any events yet.</p>
          <a href="Home.html" class="btn">Browse Events</a>
        </div>
      </div>`;
    return;
  }

  // Sort bookmarks by date
  const sortedBookmarks = bookmarks.sort((a, b) => {
    return new Date(eventData[a].date) - new Date(eventData[b].date);
  });

  const eventsHTML = sortedBookmarks.map(title => {
    const event = eventData[title];
    return `
      <li onclick="goToEvent('${title}')">
        <img src="${event.image}" alt="${title}" />
        <div class="event-info">
          <span>${title}</span>
          <p class="event-date">${formatDate(event.date)}</p>
          <p class="event-location">${event.location}</p>
        </div>
        <button class="bookmark" onclick="event.stopPropagation(); toggleBookmark('${title}')">🔖</button>
      </li>`;
  }).join('');

  formArea.innerHTML = `
    <div class="dashboard-container">
      <h2>My Bookmarked Events</h2>
      <ul class="event-list">${eventsHTML}</ul>
    </div>`;
}

function showTicketDetail(title) {
  const user = getCurrentUser();
  if (!user) return;

  const bookings = JSON.parse(localStorage.getItem(`bookings_${user.email}`)) || [];
  const eventBookings = bookings.filter(b => b.title === title);
  const event = eventData[title];

  if (!event || eventBookings.length === 0) return;

  const formArea = document.getElementById('form-area');
  if (!formArea) return;

  // Generate unique ticket IDs for each booking
  const ticketDetails = eventBookings.map((booking, index) => ({
    ...booking,
    ticketId: `TKT-${Date.now()}-${index + 1}`,
    qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(JSON.stringify({
      ticketId: `TKT-${Date.now()}-${index + 1}`,
      event: title,
      date: event.date,
      location: event.location,
      price: event.price
    }))}`
  }));

  formArea.innerHTML = `
    <div class="event-container">
      <div class="event-header">
      <h1 id="eventTitle">${title}</h1>
        <div class="event-status ${new Date(event.date) > new Date() ? 'upcoming' : 'past'}">
          <i class="fas ${new Date(event.date) > new Date() ? 'fa-calendar-check' : 'fa-calendar-times'}"></i>
          ${new Date(event.date) > new Date() ? 'Upcoming Event' : 'Past Event'}
        </div>
      </div>

      <div class="ticket-detail-section">
        <h2><i class="fas fa-ticket-alt"></i> Your Tickets</h2>
        <div class="tickets-grid">
          ${ticketDetails.map(ticket => `
            <div class="ticket-card" data-ticket-id="${ticket.ticketId}">
              <div class="ticket-header">
                <div class="ticket-id">Ticket #${ticket.ticketId}</div>
                <div class="ticket-status ${new Date(event.date) > new Date() ? 'valid' : 'expired'}">
                  ${new Date(event.date) > new Date() ? 'Valid' : 'Expired'}
        </div>
      </div>
              <div class="ticket-qr">
                <img src="${ticket.qrCode}" alt="Ticket QR Code">
              </div>
              <div class="ticket-info">
                <p><i class="fas fa-calendar"></i> Event Date: ${formatDate(event.date)}</p>
                <p><i class="fas fa-map-marker-alt"></i> Location: ${event.location}</p>
                <p><i class="fas fa-dollar-sign"></i> Price: $${event.price.toFixed(2)}</p>
                <p><i class="fas fa-clock"></i> Booked on: ${formatDate(ticket.bookingDate)}</p>
              </div>
              <div class="ticket-actions">
                <button onclick="downloadTicket('${ticket.ticketId}')" class="action-btn">
                  <i class="fas fa-download"></i> Download
                </button>
                <button onclick="shareTicket('${ticket.ticketId}')" class="action-btn">
                  <i class="fas fa-share-alt"></i> Share
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="event-detail-section">
        <h2><i class="fas fa-info-circle"></i> Event Details</h2>
        <div class="event-details-grid">
          <div class="detail-item">
            <i class="fas fa-calendar"></i>
            <div class="detail-info">
              <span>Event Date & Time</span>
              <p>${formatDate(event.date)}</p>
        </div>
      </div>
          <div class="detail-item">
            <i class="fas fa-map-marker-alt"></i>
            <div class="detail-info">
              <span>Location</span>
              <p>${event.location}</p>
            </div>
          </div>
          <div class="detail-item">
            <i class="fas fa-tag"></i>
            <div class="detail-info">
              <span>Category</span>
              <p>${event.category}</p>
            </div>
          </div>
          <div class="detail-item">
            <i class="fas fa-ticket-alt"></i>
            <div class="detail-info">
              <span>Total Tickets</span>
              <p>${eventBookings.length}</p>
            </div>
          </div>
        </div>

        <div class="event-description">
          <h3>Description</h3>
          <p>${event.description}</p>
        </div>

        <div class="organizer-section">
          <h3><i class="fas fa-user-tie"></i> Event Organizer</h3>
          <div class="organizer-card">
            <div class="organizer-info">
              <h4>${event.organizer.name}</h4>
              <p><i class="fas fa-envelope"></i> <a href="mailto:${event.organizer.email}">${event.organizer.email}</a></p>
              <p><i class="fas fa-phone"></i> <a href="tel:${event.organizer.phone}">${event.organizer.phone}</a></p>
            </div>
            <div class="organizer-actions">
              <button onclick="window.location.href='mailto:${event.organizer.email}'" class="contact-btn">
                <i class="fas fa-envelope"></i> Email Organizer
              </button>
              <button onclick="window.location.href='tel:${event.organizer.phone}'" class="contact-btn">
                <i class="fas fa-phone"></i> Call Organizer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="ticket-actions">
        <button onclick="renderBookedEvents()" class="back-btn">
          <i class="fas fa-arrow-left"></i> Back to My Bookings
        </button>
      </div>
    </div>
  `;

  // Add custom styles
  const style = document.createElement('style');
  style.textContent = `
    .event-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .event-header {
      text-align: center;
      margin-bottom: 2rem;
      position: relative;
    }

    .event-status {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: 500;
    }

    .event-status.upcoming {
      background: #28a745;
      color: white;
    }

    .event-status.past {
      background: #dc3545;
      color: white;
    }

    .tickets-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 1rem;
    }

    .ticket-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border: 2px solid #764ba2;
    }

    .ticket-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .ticket-id {
      font-weight: bold;
      color: #764ba2;
    }

    .ticket-status {
      padding: 0.3rem 0.8rem;
      border-radius: 15px;
      font-size: 0.9rem;
    }

    .ticket-status.valid {
      background: #28a745;
      color: white;
    }

    .ticket-status.expired {
      background: #dc3545;
      color: white;
    }

    .ticket-qr {
      text-align: center;
      margin: 1rem 0;
    }

    .ticket-qr img {
      max-width: 150px;
      height: auto;
    }

    .ticket-info {
      margin: 1rem 0;
    }

    .ticket-info p {
      margin: 0.5rem 0;
      color: #6c757d;
    }

    .ticket-info i {
      color: #764ba2;
      margin-right: 0.5rem;
      width: 20px;
    }

    .ticket-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .action-btn {
      flex: 1;
      padding: 0.8rem;
      background: #764ba2;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .action-btn:hover {
      background: #5d3d7e;
    }

    .event-detail-section {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      margin-top: 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .event-details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin: 1.5rem 0;
    }

    .detail-item {
      display: flex;
      align-items: center;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .detail-item i {
      font-size: 1.5rem;
      color: #764ba2;
      margin-right: 1rem;
    }

    .detail-info span {
      color: #6c757d;
      font-size: 0.9rem;
      display: block;
    }

    .detail-info p {
      color: #2c3e50;
      font-size: 1.1rem;
      margin: 0;
    }

    .event-description {
      margin: 2rem 0;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .event-description h3 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    .organizer-section {
      margin-top: 2rem;
    }

    .organizer-card {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 1.5rem;
      margin-top: 1rem;
    }

    .organizer-info h4 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    .organizer-info p {
      margin: 0.5rem 0;
    }

    .organizer-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .contact-btn {
      padding: 0.8rem 1.5rem;
      background: #764ba2;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .contact-btn:hover {
      background: #5d3d7e;
    }

    .back-btn {
      margin-top: 2rem;
      padding: 0.8rem 1.5rem;
      background: #764ba2;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .back-btn:hover {
      background: #5d3d7e;
    }
  `;
  document.head.appendChild(style);
}

// Add these new functions for ticket actions
function downloadTicket(ticketId) {
  const ticketElement = document.querySelector(`[data-ticket-id="${ticketId}"]`);
  if (!ticketElement) {
    showNotification('Ticket not found', 'error');
    return;
  }

  // Create a canvas from the ticket element
  html2canvas(ticketElement).then(canvas => {
    const link = document.createElement('a');
    link.download = `ticket-${ticketId}.png`;
    link.href = canvas.toDataURL();
    link.click();
    showNotification('Ticket downloaded successfully', 'success');
  }).catch(error => {
    console.error('Error downloading ticket:', error);
    showNotification('Failed to download ticket', 'error');
  });
}

function shareTicket(ticketId) {
  const ticketElement = document.querySelector(`[data-ticket-id="${ticketId}"]`);
  if (!ticketElement) {
    showNotification('Ticket not found', 'error');
    return;
  }

  // Create a canvas from the ticket element
  html2canvas(ticketElement).then(canvas => {
    canvas.toBlob(blob => {
      const file = new File([blob], `ticket-${ticketId}.png`, { type: 'image/png' });
      
      if (navigator.share) {
        navigator.share({
          title: 'My Event Ticket',
          text: 'Check out my event ticket!',
          files: [file]
        }).then(() => {
          showNotification('Ticket shared successfully', 'success');
        }).catch(error => {
          console.error('Error sharing ticket:', error);
          showNotification('Failed to share ticket', 'error');
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        const link = document.createElement('a');
        link.download = `ticket-${ticketId}.png`;
        link.href = canvas.toDataURL();
        link.click();
        showNotification('Ticket downloaded (sharing not supported in your browser)', 'info');
      }
    });
  }).catch(error => {
    console.error('Error sharing ticket:', error);
    showNotification('Failed to share ticket', 'error');
  });
}

function renderBookedEvents() {
  const formArea = document.getElementById('form-area');
  const user = getCurrentUser();

  if (!user) {
    formArea.innerHTML = `
      <div class="dashboard-container">
        <h2>My Bookings</h2>
        <div class="empty-state">
          <p>Please log in to view your bookings.</p>
          <a href="login.html" class="btn">Login</a>
        </div>
      </div>`;
    return;
  }

  // Initialize bookings if they don't exist
  initializeBookings(user.email);

  // Get bookings from localStorage
  const bookings = JSON.parse(localStorage.getItem(`bookings_${user.email}`)) || [];

  if (bookings.length === 0) {
    formArea.innerHTML = `
      <div class="dashboard-container">
        <h2>My Bookings</h2>
        <div class="empty-state">
          <p>You haven't booked any events yet.</p>
          <a href="search.html" class="btn">Browse Events</a>
        </div>
      </div>`;
    return;
  }

  // Group bookings by event title
  const eventGroups = bookings.reduce((groups, booking) => {
    if (!groups[booking.title]) {
      groups[booking.title] = {
        count: 0,
        bookings: [],
        event: {
          title: booking.title,
          date: booking.eventDate,
          location: booking.location,
          price: booking.price,
          image: booking.image,
          category: booking.category,
          description: booking.description,
          organizer: booking.organizer
        }
      };
    }
    groups[booking.title].count++;
    groups[booking.title].bookings.push(booking);
    return groups;
  }, {});

  // Convert to array and sort by event date
  const sortedEvents = Object.entries(eventGroups)
    .sort((a, b) => new Date(a[1].event.date) - new Date(b[1].event.date));

  const eventsHTML = sortedEvents.map(([title, group]) => {
    const event = group.event;
    const firstBooking = group.bookings[0];
    
    return `
      <li class="event-card" onclick="showTicketDetail('${title}')">
        <div class="ticket-icon">
          <i class="fas fa-ticket-alt"></i>
          <span class="ticket-count">${group.count}</span>
        </div>
        <div class="event-info">
          <h3>${title}</h3>
          <p class="event-date">
            <i class="fas fa-calendar"></i> ${formatDate(event.date)}
          </p>
          <p class="event-location">
            <i class="fas fa-map-marker-alt"></i> ${event.location}
          </p>
          <p class="ticket-info">
            <i class="fas fa-ticket-alt"></i> ${group.count} Ticket${group.count > 1 ? 's' : ''}
            <br>
            <i class="fas fa-dollar-sign"></i> Total: $${(event.price * group.count).toFixed(2)}
          </p>
          <p class="booking-date">
            <i class="fas fa-clock"></i> Booked on: ${formatDate(firstBooking.bookingDate)}
          </p>
        </div>
      </li>`;
  }).join('');

  formArea.innerHTML = `
    <div class="dashboard-container">
      <h2>My Booked Events</h2>
      <ul class="event-list">${eventsHTML}</ul>
    </div>
  `;

  // Add custom styles
  const style = document.createElement('style');
  style.textContent = `
    .event-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .event-card {
      display: flex;
      background: white;
      border-radius: 12px;
      margin-bottom: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;
      overflow: hidden;
    }

    .event-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    .ticket-icon {
      width: 120px;
      height: 200px;
      background: #764ba2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
      position: relative;
    }

    .ticket-icon i {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .ticket-count {
      font-size: 1.2rem;
      font-weight: bold;
      background: white;
      color: #764ba2;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
    }

    .event-info {
      flex: 1;
      padding: 1.5rem;
    }

    .event-info h3 {
      color: #2c3e50;
      margin: 0 0 1rem 0;
      font-size: 1.4rem;
    }

    .event-info p {
      margin: 0.5rem 0;
      color: #6c757d;
    }

    .event-info i {
      color: #764ba2;
      margin-right: 0.5rem;
      width: 20px;
    }

    .ticket-info {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }

    .booking-date {
      color: #764ba2;
      font-weight: 500;
    }
  `;
  document.head.appendChild(style);
}

function getBasket() {
  const user = getCurrentUser();
  if (!user) return [];
  return JSON.parse(localStorage.getItem(`basket_${user.email}`)) || [];
}

function saveBasket(basket) {
  const user = getCurrentUser();
  if (!user) return;
  localStorage.setItem(`basket_${user.email}`, JSON.stringify(basket));
}

function updateQuantity(title, newQuantity) {
  if (newQuantity < 1) return;
  
  const basket = getBasket();
  const item = basket.find(item => item.title === title);
  
  if (item) {
    item.quantity = newQuantity;
    saveBasket(basket);
    renderBasket();
  }
}

function removeFromBasket(title) {
  const basket = getBasket();
  const newBasket = basket.filter(item => item.title !== title);
  saveBasket(newBasket);
  renderBasket();
}

function calculateTotal() {
  const basket = getBasket();
  return basket.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Initialize PayPal
function initPayPal() {
  if (typeof paypal === 'undefined') {
    console.error('PayPal SDK not loaded');
    alert('Payment system is not available. Please refresh the page and try again.');
    return;
  }

  const basket = getBasket();
  if (basket.length === 0) {
    alert('Your basket is empty');
    return;
  }

  // Calculate total amount
  const total = calculateTotal();
  
  // Check if any tickets require payment
  const hasPaidTickets = basket.some(item => item.price > 0);
  if (!hasPaidTickets) {
    alert('No payment required for these tickets');
    return;
  }

  paypal.Buttons({
    style: {
      layout: 'vertical',
      color: 'blue',
      shape: 'rect',
      label: 'pay'
    },
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: total.toFixed(2),
            currency_code: 'USD'
          },
          description: 'Event Tickets Purchase'
        }]
      });
    },
    onApprove: async function(data, actions) {
      try {
        // Show loading state
        const paypalContainer = document.getElementById('paypal-button-container');
        if (paypalContainer) {
          paypalContainer.innerHTML = '<div class="loading">Processing payment...</div>';
        }

        // Capture the payment
        const details = await actions.order.capture();
        
        // Verify ticket availability before proceeding
        const basket = getBasket();
        const availabilityCheck = await verifyAndReserveTickets(basket);
        
        if (!availabilityCheck.success) {
          // If tickets are no longer available, refund the payment
          await actions.order.void();
          alert('Sorry, some tickets are no longer available. Your payment has been refunded.');
          if (paypalContainer) {
            renderBasket(); // Re-render the basket with PayPal buttons
          }
          return;
        }

        // Payment successful and tickets are available
        alert('Payment completed successfully! Thank you, ' + details.payer.name.given_name);
        
        // Submit the order with payment details
        const orderResult = await submitOrder(details);
        
        if (orderResult.success) {
          // Clear the basket
          saveBasket([]);
          // Redirect to bookings page
          window.location.href = 'my-bookings.html';
        } else {
          // If order submission fails, refund the payment
          await actions.order.void();
          alert('Failed to process your order. Your payment has been refunded. Please try again.');
          if (paypalContainer) {
            renderBasket(); // Re-render the basket with PayPal buttons
          }
        }
      } catch (error) {
        console.error('Payment processing error:', error);
        alert('An error occurred while processing your payment. Please try again.');
        if (paypalContainer) {
          renderBasket(); // Re-render the basket with PayPal buttons
        }
      }
    },
    onError: function(err) {
      console.error('PayPal Error:', err);
      alert('An error occurred during payment. Please try again.');
      renderBasket(); // Re-render the basket with PayPal buttons
    },
    onCancel: function() {
      alert('Payment was cancelled. Please complete the payment to get your tickets.');
      renderBasket(); // Re-render the basket with PayPal buttons
    }
  }).render('#paypal-button-container')
    .catch(function(error) {
      console.error('PayPal Button Render Error:', error);
      alert('Failed to initialize payment system. Please refresh the page and try again.');
    });
}

// Update renderBasket to match new requirements
async function renderBasket() {
  const basketContainer = document.getElementById('basket-items');
  if (!basketContainer) return;

  const user = getCurrentUser();
  if (!user) {
    basketContainer.innerHTML = `
      <div class="empty-basket">
        <p>Please log in to view your basket.</p>
        <a href="login.html" class="btn">Login</a>
      </div>
    `;
    return;
  }

  const basket = getBasket();
  if (basket.length === 0) {
    basketContainer.innerHTML = `
      <div class="empty-basket">
        <p>Your basket is empty.</p>
        <a href="Home.html" class="btn">Browse Events</a>
      </div>
    `;
    return;
  }

  const hasPaidTickets = basket.some(item => item.price > 0);
  const total = calculateTotal();

  const itemsHTML = basket.map(item => `
    <div class="basket-item">
      <img src="${eventData[item.title].image}" alt="${item.title}">
      <div class="basket-item-info">
        <h3>${item.title}</h3>
        <p>${formatDate(eventData[item.title].date)}</p>
        <p>${eventData[item.title].location}</p>
        ${item.price === 0 ? '<p class="free-ticket-label">Free Ticket</p>' : ''}
      </div>
      <div class="quantity-controls">
        <button onclick="updateQuantity('${item.title}', ${item.quantity - 1})">-</button>
        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.title}', this.value)">
        <button onclick="updateQuantity('${item.title}', ${item.quantity + 1})">+</button>
      </div>
      <div class="basket-item-price">
        ${item.price === 0 ? 'Free' : `$${(item.price * item.quantity).toFixed(2)}`}
      </div>
      <button class="remove-item" onclick="removeFromBasket('${item.title}')">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join('');

  basketContainer.innerHTML = `
    ${itemsHTML}
    <div class="basket-summary">
      <div class="total-price">
        ${hasPaidTickets ? `Total: $${total.toFixed(2)}` : 'All tickets are free'}
      </div>
      <div id="basket-action-area"></div>
    </div>
  `;

  // Action area logic
  const actionArea = document.getElementById('basket-action-area');
  if (hasPaidTickets) {
    // Paid tickets: show PayPal button
    actionArea.innerHTML = `
      <div id="paypal-button-container"></div>
    `;
    initPayPal().catch(error => {
      console.error('Error initializing PayPal:', error);
      alert('Failed to initialize payment system. Please refresh the page and try again.');
    });
  } else {
    // Free tickets: show single submit button
    actionArea.innerHTML = `
      <button id="submit-free-tickets" class="btn" onclick="submitOrder(null).then(result => {
        if (result.success) {
          alert('Free tickets booked successfully!');
          window.location.href = 'my-bookings.html';
        } else {
          alert(result.message || 'Failed to book tickets.');
        }
      })">
        Book Free Tickets
      </button>
    `;
  }
}

// Add PayPal SDK script to the page
function loadPayPalSDK() {
  console.log('Attempting to load PayPal SDK...');
  return new Promise((resolve, reject) => {
    // Remove any existing PayPal script
    const existingScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
    if (existingScript) {
      existingScript.remove();
      console.log('Removed existing PayPal SDK script.');
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=ASSuHaSwxEzm2QzbRZfuIcuXN6P1b2Wj5tY3Tx9VOumbmbkPxzN61Tj62W9PtvYd_XmCCvkQP2e-Lemd&currency=USD`;
    script.async = true;
    script.onload = function() {
      console.log('PayPal SDK loaded successfully');
      resolve();
    };
    script.onerror = function(error) {
      console.error('Error loading PayPal SDK:', error);
      reject(new Error('Failed to load payment system'));
    };
    document.body.appendChild(script);
  });
}

async function initPayPal() {
  console.log('Attempting to initialize PayPal buttons...');
  try {
    if (typeof paypal === 'undefined') {
      console.log('PayPal SDK not yet loaded, attempting to load...');
      await loadPayPalSDK();
      console.log('PayPal SDK loaded before initialization.');
    } else {
      console.log('PayPal SDK already loaded.');
    }

    const basket = getBasket();
    if (basket.length === 0) {
      console.log('Basket is empty, not initializing PayPal buttons.');
      // alert('Your basket is empty'); // Alert is handled in renderBasket
      return;
    }

    // Calculate total amount
    const total = calculateTotal();
    console.log('Calculated total for PayPal:', total.toFixed(2));
    
    // Check if any tickets require payment
    const hasPaidTickets = basket.some(item => item.price > 0);
    if (!hasPaidTickets) {
       console.log('No paid tickets in basket, not initializing PayPal buttons.');
      // alert('No payment required for these tickets'); // Alert is handled in renderBasket
      return;
    }

    // Verify ticket availability before showing payment buttons
    console.log('Verifying ticket availability before PayPal initialization...');
    const availabilityCheck = await verifyAndReserveTickets(basket);
    if (!availabilityCheck.success) {
      console.error('Ticket availability check failed:', availabilityCheck.issues);
      alert(availabilityCheck.issues.join('\n'));
      renderBasket(); // Re-render basket to update availability
      return;
    }
    console.log('Ticket availability confirmed.');

    // Check if PayPal buttons are already rendered in the container
    const paypalContainer = document.getElementById('paypal-button-container');
    if (paypalContainer && paypalContainer.innerHTML.includes('paypal-buttons')) {
        console.log('PayPal buttons already rendered.');
        return;
    }

    console.log('Rendering PayPal buttons...');
    paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        label: 'pay'
      },
      createOrder: function(data, actions) {
        console.log('Creating PayPal order...');
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: total.toFixed(2),
              currency_code: 'USD'
            },
            description: 'Event Tickets Purchase'
          }]
        });
      },
      onApprove: async function(data, actions) {
        console.log('PayPal payment approved, capturing order:', data);
        try {
          // Show loading state
          const paypalContainer = document.getElementById('paypal-button-container');
          if (paypalContainer) {
            paypalContainer.innerHTML = '<div class="loading">Processing payment...</div>';
          }

          // Capture the payment
          const details = await actions.order.capture();
          console.log('PayPal order captured:', details);
          
          // Verify payment details
          if (!details || !details.id || !details.status || details.status !== 'COMPLETED') {
            console.error('Invalid payment details received:', details);
            throw new Error('Invalid payment details');
          }

          console.log('Payment completed successfully.');
          alert('Payment completed successfully! Thank you, ' + details.payer.name.given_name);
          
          // Submit the order with payment details
          console.log('Submitting order...');
          const orderResult = await submitOrder(details);
          console.log('Order submission result:', orderResult);
          
          if (orderResult.success) {
            console.log('Order submitted successfully, clearing basket and redirecting.');
            // Clear the basket
            saveBasket([]);
            // Redirect to bookings page
            window.location.href = 'my-bookings.html';
          } else {
            console.error('Order submission failed:', orderResult.message);
            // If order submission fails, refund the payment
            console.log('Order submission failed, attempting to void PayPal order...');
            await actions.order.void();
            console.log('PayPal order voided.');
            alert('Failed to process your order. Your payment has been refunded. Please try again.');
            renderBasket();
          }
        } catch (error) {
          console.error('Payment processing error in onApprove:', error);
          alert('An error occurred while processing your payment. Please try again.');
          renderBasket();
        }
      },
      onError: function(err) {
        console.error('PayPal Error in onError:', err);
        alert('An error occurred during payment. Please try again.');
        renderBasket();
      },
      onCancel: function() {
        console.log('PayPal payment cancelled.');
        alert('Payment was cancelled. Please complete the payment to get your tickets.');
        renderBasket();
      }
    }).render('#paypal-button-container')
      .then(() => { // Add .then to the render call for successful rendering logging
        console.log('PayPal buttons rendered successfully.');
      })
      .catch(function(error) {
        console.error('PayPal Button Render Error:', error);
        alert('Failed to initialize payment system. Please refresh the page and try again.');
        renderBasket();
      });
  } catch (error) {
    console.error('Error initializing PayPal:', error);
    alert('Failed to initialize payment system. Please refresh the page and try again.');
    renderBasket();
  }
}

// Update renderBasket to handle payment initialization
async function renderBasket() {
  const basketContainer = document.getElementById('basket-items');
  if (!basketContainer) return;

  const user = getCurrentUser();
  if (!user) {
    basketContainer.innerHTML = `
      <div class="empty-basket">
        <p>Please log in to view your basket.</p>
        <a href="login.html" class="btn">Login</a>
      </div>
    `;
    return;
  }

  const basket = getBasket();
  if (basket.length === 0) {
    basketContainer.innerHTML = `
      <div class="empty-basket">
        <p>Your basket is empty.</p>
        <a href="Home.html" class="btn">Browse Events</a>
      </div>
    `;
    return;
  }

  const hasPaidTickets = basket.some(item => item.price > 0);
  const total = calculateTotal();

  const itemsHTML = basket.map(item => `
    <div class="basket-item">
      <img src="${eventData[item.title].image}" alt="${item.title}">
      <div class="basket-item-info">
        <h3>${item.title}</h3>
        <p>${formatDate(eventData[item.title].date)}</p>
        <p>${eventData[item.title].location}</p>
        ${item.price === 0 ? '<p class="free-ticket-label">Free Ticket</p>' : ''}
      </div>
      <div class="quantity-controls">
        <button onclick="updateQuantity('${item.title}', ${item.quantity - 1})">-</button>
        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.title}', this.value)">
        <button onclick="updateQuantity('${item.title}', ${item.quantity + 1})">+</button>
      </div>
      <div class="basket-item-price">
        ${item.price === 0 ? 'Free' : `$${(item.price * item.quantity).toFixed(2)}`}
      </div>
      <button class="remove-item" onclick="removeFromBasket('${item.title}')">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join('');

  basketContainer.innerHTML = `
    ${itemsHTML}
    <div class="basket-summary">
      <div class="total-price">
        ${hasPaidTickets ? `Total: $${total.toFixed(2)}` : 'All tickets are free'}
      </div>
      <div id="basket-action-area"></div>
    </div>
  `;

  // Action area logic
  const actionArea = document.getElementById('basket-action-area');
  if (hasPaidTickets) {
    // Paid tickets: show PayPal button
    actionArea.innerHTML = `
      <div id="paypal-button-container"></div>
    `;
    initPayPal().catch(error => {
      console.error('Error initializing PayPal:', error);
      alert('Failed to initialize payment system. Please refresh the page and try again.');
    });
  } else {
    // Free tickets: show single submit button
    actionArea.innerHTML = `
      <button id="submit-free-tickets" class="btn" onclick="submitOrder(null).then(result => {
        if (result.success) {
          alert('Free tickets booked successfully!');
          window.location.href = 'my-bookings.html';
        } else {
          alert(result.message || 'Failed to book tickets.');
        }
      })">
        Book Free Tickets
      </button>
    `;
  }
}

// Call loadPayPalSDK when the page loads
if (window.location.pathname.includes('basket.html')) {
  window.addEventListener('load', () => {
    renderBasket();
  });
}

// ===================== REGISTER / LOGIN =====================

function renderUserProfile() {
  const userProfile = document.getElementById('user-profile');
  if (!userProfile) return;

  const user = getCurrentUser();
  if (user) {
    userProfile.innerHTML = `
      <div class="profile-icon">
        <i class="fas fa-user-circle"></i>
      </div>
      <div class="profile-dropdown">
        <div class="user-info">
          <strong>${user.name}</strong>
          <span>${user.email}</span>
          <span><i class="fas fa-phone"></i> ${user.phone || 'Not provided'}</span>
        </div>
        <a href="#" onclick="editProfile()">Edit Profile</a>
        <a href="#" onclick="viewProfile()">View Profile</a>
        <a href="#" onclick="deleteAccount()" class="delete-account">Delete My Data</a>
        <a href="#" onclick="logout()">Logout</a>
      </div>
    `;

    // Add click event to toggle dropdown
    const profileIcon = userProfile.querySelector('.profile-icon');
    const dropdown = userProfile.querySelector('.profile-dropdown');
    
    profileIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      dropdown.classList.remove('show');
    });
  } else {
    userProfile.innerHTML = '';
  }
}

// Add delete account function
function deleteAccount() {
  const user = getCurrentUser();
  if (!user) return;

  if (confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
    try {
      // Remove user from users array
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const updatedUsers = users.filter(u => u.email !== user.email);
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Remove user's bookings
      const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
      const updatedBookings = bookings.filter(booking => booking.email !== user.email);
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));

      // Remove user's bookmarks
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};
      delete bookmarks[user.email];
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

      // Remove user's reviews
      Object.keys(eventData).forEach(eventTitle => {
        const reviews = JSON.parse(localStorage.getItem(`reviews_${eventTitle}`)) || [];
        const updatedReviews = reviews.filter(review => review.userId !== user.email);
        localStorage.setItem(`reviews_${eventTitle}`, JSON.stringify(updatedReviews));
      });

      // Remove current user session
      localStorage.removeItem('user');

      alert('Your account and all associated data have been deleted successfully.');
      window.location.href = 'Home.html';
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('An error occurred while deleting your account. Please try again.');
    }
  }
}

// Add CSS for delete account button
const deleteAccountStyles = document.createElement('style');
deleteAccountStyles.textContent = `
  .delete-account {
    color: #e74c3c !important;
    border-top: 1px solid #eee;
    margin-top: 5px;
    padding-top: 5px;
  }

  .delete-account:hover {
    background-color: #fff5f5;
  }

  .profile-dropdown {
    min-width: 200px;
  }

  .profile-dropdown a {
    padding: 8px 15px;
    display: block;
    color: #333;
    text-decoration: none;
    transition: background-color 0.2s;
  }

  .profile-dropdown a:hover {
    background-color: #f5f5f5;
  }

  .user-info {
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
  }

  .user-info strong {
    display: block;
    margin-bottom: 5px;
  }

  .user-info span {
    color: #666;
    font-size: 0.9em;
  }
`;
document.head.appendChild(deleteAccountStyles);

function editProfile() {
  const user = getCurrentUser();
  if (!user) {
    alert('Please log in to edit your profile');
    return;
  }
  window.location.href = 'profile.html?edit=true';
}

function viewProfile() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  const formArea = document.getElementById('form-area');
  formArea.innerHTML = `
    <div class="profile-container">
      <div class="profile-header">
        <div class="profile-image-container">
          <img id="profile-image" src="https://via.placeholder.com/150" alt="Profile Picture">
        </div>
        <div class="profile-info">
          <h2>${user.name}</h2>
          <p><i class="fas fa-envelope"></i> ${user.email}</p>
          <p><i class="fas fa-phone"></i> ${user.phone || 'Not provided'}</p>
        </div>
      </div>
      <div class="profile-content">
        <div class="profile-section">
          <h3>Personal Information</h3>
          <div class="profile-form" id="profile-form">
            <div class="form-group">
              <label for="name">Full Name</label>
              <input type="text" id="name" name="name" value="${user.name}" disabled>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" value="${user.email}" disabled>
            </div>
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" value="${user.phone || ''}" disabled>
            </div>
            <div class="form-actions">
              <button id="edit-btn" class="btn">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Add event listeners for edit functionality
  const editBtn = document.getElementById('edit-btn');
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      const inputs = document.querySelectorAll('.profile-form input');
      inputs.forEach(input => input.disabled = false);
      editBtn.style.display = 'none';
      
      const saveBtn = document.createElement('button');
      saveBtn.className = 'btn';
      saveBtn.textContent = 'Save Changes';
      saveBtn.onclick = saveProfileChanges;
      
      const cancelBtn = document.createElement('button');
      cancelBtn.className = 'btn';
      cancelBtn.textContent = 'Cancel';
      cancelBtn.onclick = () => {
        inputs.forEach(input => input.disabled = true);
        editBtn.style.display = 'block';
        saveBtn.remove();
        cancelBtn.remove();
      };
      
      document.querySelector('.form-actions').appendChild(saveBtn);
      document.querySelector('.form-actions').appendChild(cancelBtn);
    });
  }
}

function saveProfileChanges() {
  const user = getCurrentUser();
  if (!user) return;

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  // Validate phone number format
  if (phone && !/^\+?[\d\s-]{10,}$/.test(phone)) {
    alert("Please enter a valid phone number!");
    return;
  }

  // Update user data
  user.name = name;
  user.email = email;
  user.phone = phone;

  // Update in localStorage
  localStorage.setItem('user', JSON.stringify(user));
  
  // Update in users array
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userIndex = users.findIndex(u => u.email === user.email);
  if (userIndex !== -1) {
    users[userIndex] = user;
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Refresh the profile view
  viewProfile();
  renderUserProfile();
}

function logout() {
  // Get current user data before removing
  const currentUser = getCurrentUser();
  if (currentUser) {
    // Store user data in a separate key for persistence
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === currentUser.email);
    
    if (userIndex !== -1) {
      // Update existing user data
      users[userIndex] = currentUser;
    } else {
      // Add new user data
      users.push(currentUser);
    }
    
    // Save updated users array
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  // Remove only the current session
  localStorage.removeItem('user');
  
  alert('Logged out successfully.');
  window.location.href = 'Home.html';
}

// Update the existing renderNavLinks function to show different content for organizers
function renderNavLinks() {
  const nav = document.getElementById('nav-links');
  if (!nav) return;

  const currentUser = getCurrentUser();
  const currentOrganizer = getCurrentOrganizer();
  
  nav.innerHTML = '';
  
  if (currentUser) {
    nav.innerHTML = `
      <a href="Home.html" class="btn">Home</a>
      <a href="search.html" class="btn">Search Events</a>
      <a href="bookmarks.html" class="btn">My Bookmarks</a>
      <a href="my-bookings.html" class="btn">My Bookings</a>
      <a href="basket.html" class="btn">Basket</a>
    `;
  } else if (currentOrganizer) {
    nav.innerHTML = `
      <a href="Home.html" class="btn">Home</a>
      <a href="organizer-dashboard.html" class="btn">Dashboard</a>
      <a href="#" onclick="showOrganizerProfile()" class="btn">Profile</a>
    `;
  } else {
    nav.innerHTML = `
      <a href="Home.html" class="btn">Home</a>
      <a href="search.html" class="btn">Search Events</a>
      <a href="login.html" class="btn">Login</a>
      <a href="register.html" class="btn">Register</a>
    `;
  }
  
  // Render user profile
  renderUserProfile();
}

// Add this to ensure navigation is updated when the page loads
window.addEventListener('load', renderNavLinks);

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

document.addEventListener('DOMContentLoaded', () => {
  renderNavLinks();

  const registerBtn = document.getElementById('register-btn');
  const loginBtn = document.getElementById('login-btn');

  if (registerBtn) {
    registerBtn.addEventListener('click', () => {
      const name = document.getElementById('reg-name').value;
      const email = document.getElementById('reg-email').value;
      const phone = document.getElementById('reg-phone').value;
      const password = document.getElementById('reg-password').value;
      const confirmPassword = document.getElementById('reg-confirm-password').value;

      // Validate email format
      if (!isValidEmail(email)) {
        alert("Please enter a valid email address!");
        return;
      }

      // Validate phone number format
      if (!phone || !/^\+?[\d\s-]{10,}$/.test(phone)) {
        alert("Please enter a valid phone number!");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // Add password length validation
      if (password.length < 8) {
        alert("Password must be at least 8 characters long!");
        return;
      }

      // Check if email already exists
      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.some(user => user.email === email)) {
        alert("This email is already registered. Please use a different email or login.");
        return;
      }

      // Store user data in both current session and persistent storage
      const user = { name, email, phone, password };
      localStorage.setItem('user', JSON.stringify(user));
      
      // Add to persistent storage
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));

      // Automatically log in the user after registration and redirect to home
      alert("Registered successfully!");
      window.location.href = "Home.html";
    });
  }

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      // Check both current session and persistent storage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        alert("Login successful!");
        // Set current session
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = "Home.html";
      } else {
        alert("Invalid email or password!");
      }
    });
  }

  // Check current page and render appropriate content
  const pathname = window.location.pathname;
  if (pathname.includes("bookmarks.html")) {
    renderBookmarkedEvents();
  } else if (pathname.includes("my-bookings.html")) {
    renderBookedEvents();
  } else if (pathname.includes("search.html")) {
    showSearch();
  } else if (pathname.includes("Home.html") || pathname.endsWith("/")) {
    showHome();
  }
});

// Add back the event listeners but only for the home page
window.onload = function () {
  const pathname = window.location.pathname;
  if (pathname.includes("Home.html") || pathname.endsWith("/")) {
    handleHashChange();
  }
};

window.onhashchange = handleHashChange;

function loadProfile() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = 'Home.html';
    return;
  }

  // Set profile image
  const profileImage = document.getElementById('profile-image');
  profileImage.src = user.profileImage || 'https://via.placeholder.com/150';

  // Set user info in the header
  document.getElementById('profile-name').textContent = user.name;
  document.getElementById('profile-email').textContent = user.email;

  // Set form values
  document.getElementById('name').value = user.name;
  document.getElementById('email').value = user.email;

  // Add click event for image upload
  const imageOverlay = document.getElementById('profile-image-overlay');
  const imageUpload = document.getElementById('image-upload');
  
  imageOverlay.addEventListener('click', () => {
    imageUpload.click();
  });

  // Check if we're in edit mode
  const urlParams = new URLSearchParams(window.location.search);
  const isEditMode = urlParams.get('edit') === 'true';

  if (isEditMode) {
    enableEditMode();
  } else {
    disableEditMode();
  }
}

function enableEditMode() {
  document.getElementById('name').disabled = false;
  document.getElementById('edit-btn').style.display = 'none';
  document.getElementById('change-password-btn').style.display = 'block';
  document.getElementById('save-btn').style.display = 'block';
  document.getElementById('cancel-btn').style.display = 'block';
}

function disableEditMode() {
  document.getElementById('name').disabled = true;
  document.getElementById('edit-btn').style.display = 'block';
  document.getElementById('change-password-btn').style.display = 'none';
  document.getElementById('save-btn').style.display = 'none';
  document.getElementById('cancel-btn').style.display = 'none';
  
  // Hide password fields
  document.querySelectorAll('.password-section').forEach(section => {
    section.style.display = 'none';
  });
  
  // Clear password fields
  document.getElementById('current-password').value = '';
  document.getElementById('new-password').value = '';
  document.getElementById('confirm-password').value = '';
}

function togglePasswordFields() {
  const passwordSections = document.querySelectorAll('.password-section');
  const isVisible = passwordSections[0].style.display !== 'none';
  
  passwordSections.forEach(section => {
    section.style.display = isVisible ? 'none' : 'block';
  });
  
  // Clear password fields when hiding
  if (isVisible) {
    document.getElementById('current-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
  }
}

function verifyCurrentPassword(currentPassword) {
  const user = getCurrentUser();
  if (!user) return false;
  return currentPassword === user.password;
}

function saveProfile() {
  const user = getCurrentUser();
  if (!user) {
    alert('Please log in to update your profile');
    window.location.href = 'login.html';
    return;
  }

  const newName = document.getElementById('name').value.trim();
  
  if (!newName) {
    alert('Name cannot be empty');
    return;
  }

  // Check if password change is in progress
  const currentPassword = document.getElementById('current-password').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (currentPassword || newPassword || confirmPassword) {
    // Validate password change
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill in all password fields');
      return;
    }

    // Verify current password
    if (!verifyCurrentPassword(currentPassword)) {
      alert('Current password is incorrect');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      alert('New password must be at least 6 characters long');
      return;
    }

    // Update password
    user.password = newPassword;
  }

  // Update user data
  user.name = newName;
  localStorage.setItem('user', JSON.stringify(user));

  disableEditMode();
  alert('Profile updated successfully');
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const user = getCurrentUser();
      user.profileImage = e.target.result;
      localStorage.setItem('user', JSON.stringify(user));
      document.getElementById('profile-image').src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// Add event listeners when the profile page loads
if (window.location.pathname.includes('profile.html')) {
  window.addEventListener('load', loadProfile);
  document.getElementById('edit-btn').addEventListener('click', enableEditMode);
  document.getElementById('change-password-btn').addEventListener('click', togglePasswordFields);
  document.getElementById('save-btn').addEventListener('click', saveProfile);
  document.getElementById('cancel-btn').addEventListener('click', () => {
    loadProfile();
    disableEditMode();
  });
  document.getElementById('image-upload').addEventListener('change', handleImageUpload);
}

// Add event listener for submit order button
if (window.location.pathname.includes('basket.html')) {
  window.addEventListener('load', () => {
    renderBasket();
    document.getElementById('submit-order').addEventListener('click', submitOrder);
  });
}

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        resolve(userLocation);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * Initializes and manages the interactive map
 * 
 * Features:
 * - Displays event locations
 * - Shows user's current location
 * - Calculates distances
 * - Handles marker interactions
 */
function initMap() {
  const mapContainer = document.getElementById('map-container');
  if (!mapContainer) return;

  // Initialize map if not already done
  if (!mapInitialized) {
    map = L.map('map-container').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    mapInitialized = true;
  }

  // Get user's location
  getCurrentLocation().then(location => {
    if (location) {
      userLocation = location;
      // Center map on user's location
      map.setView([location.lat, location.lng], 12);

      // Add user location marker with custom icon
      const userIcon = L.divIcon({
        className: 'user-location-marker',
        html: '<div class="user-marker"><i class="fas fa-user-circle"></i></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const userMarker = L.marker([location.lat, location.lng], { icon: userIcon })
        .addTo(map)
        .bindPopup('Your Location');

      // Add circle to show nearby radius
      const radiusCircle = L.circle([location.lat, location.lng], {
        radius: 1000, // 1km radius
        color: '#764ba2',
        fillColor: '#764ba2',
        fillOpacity: 0.1,
        weight: 2
      }).addTo(map);

      // Add event markers
      addEventMarkers();

      // Add legend
      const legend = L.control({ position: 'bottomright' });
      legend.onAdd = function() {
        const div = L.DomUtil.create('div', 'map-legend');
        div.innerHTML = `
          <div class="legend-item">
            <div class="user-marker"><i class="fas fa-user-circle"></i></div>
            <span>Your Location</span>
          </div>
          <div class="legend-item">
            <div class="event-marker"><i class="fas fa-map-marker-alt"></i></div>
            <span>Event Location</span>
          </div>
          <div class="legend-item">
            <div class="radius-circle"></div>
            <span>${NEARBY_RADIUS_KM}km Radius</span>
          </div>
        `;
        return div;
      };
      legend.addTo(map);
    }
  });
}

function addEventMarkers() {
  if (!map || !mapInitialized) return;

  // Clear existing markers
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  // Add event markers
  Object.entries(eventData).forEach(([title, event]) => {
    if (event.coordinates) {
      const distance = userLocation ? 
        calculateDistance(
          userLocation.lat,
          userLocation.lng,
          event.coordinates.lat,
          event.coordinates.lng
        ) : null;

      // Create custom icon for event marker
      const eventIcon = L.divIcon({
        className: 'event-location-marker',
        html: `
          <div class="event-marker" title="${title}">
            <i class="fas fa-map-marker-alt"></i>
            ${distance ? `<span class="distance">${distance.toFixed(1)}km</span>` : ''}
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 30]
      });

      const marker = L.marker([event.coordinates.lat, event.coordinates.lng], { 
        icon: eventIcon,
        title: title // Add title for better accessibility
      }).addTo(map);

      // Create popup content
      const popupContent = `
        <div class="event-popup">
          <h3>${title}</h3>
          <p><i class="fas fa-calendar"></i> ${formatDate(event.date)}</p>
          <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
          ${distance ? `<p><i class="fas fa-walking"></i> ${distance.toFixed(1)}km away</p>` : ''}
          <p><i class="fas fa-tag"></i> $${event.price}</p>
          <div class="popup-buttons">
            <button onclick="showEventDetail('${title}')" class="btn view-details">View Details</button>
            <button onclick="goToEvent('${title}')" class="btn view-event">View Event</button>
          </div>
        </div>
      `;

      // Bind popup with custom options
      marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'custom-popup'
      });

      // Add click event to marker
      marker.on('click', function() {
        // Highlight the marker
        this.setIcon(L.divIcon({
          className: 'event-location-marker active',
          html: `
            <div class="event-marker active" title="${title}">
              <i class="fas fa-map-marker-alt"></i>
              ${distance ? `<span class="distance">${distance.toFixed(1)}km</span>` : ''}
            </div>
          `,
          iconSize: [30, 30],
          iconAnchor: [15, 30]
        }));

        // Reset other markers to default state
        markers.forEach(m => {
          if (m !== this) {
            m.setIcon(eventIcon);
          }
        });
      });

      markers.push(marker);
    }
  });
}

// Add additional CSS for improved marker and popup styling
const additionalMapStyles = document.createElement('style');
additionalMapStyles.textContent = `
  .event-marker {
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .event-marker:hover {
    transform: scale(1.1);
  }

  .event-marker.active {
    color: #e74c3c;
    transform: scale(1.2);
  }

  .custom-popup .leaflet-popup-content-wrapper {
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .popup-buttons {
    display: flex;
    gap: 8px;
    margin-top: 10px;
  }

  .popup-buttons .btn {
    flex: 1;
    padding: 8px;
    font-size: 12px;
    text-align: center;
  }

  .view-details {
    background-color: #764ba2;
    color: white;
  }

  .view-event {
    background-color: #e74c3c;
    color: white;
  }

  .event-popup h3 {
    font-size: 16px;
    margin-bottom: 12px;
    color: #333;
    border-bottom: 2px solid #764ba2;
    padding-bottom: 5px;
  }

  .event-popup p {
    margin: 8px 0;
    font-size: 13px;
  }

  .event-popup i {
    width: 20px;
    color: #764ba2;
  }

  .distance {
    font-weight: bold;
    color: #e74c3c;
  }
`;
document.head.appendChild(additionalMapStyles);

function updateMapView() {
  if (!map || !mapInitialized) return;

  try {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    if (userLocation) {
      // Center map on user's location
      map.setView([userLocation.lat, userLocation.lng], 10);

      // Add user location marker
      const userMarker = L.circleMarker([userLocation.lat, userLocation.lng], {
        radius: 10,
        fillColor: '#764ba2',
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 1
      }).addTo(map);

      // Add circle to show radius
      L.circle([userLocation.lat, userLocation.lng], {
        radius: NEARBY_RADIUS_KM * 1000,
        color: '#764ba2',
        fillColor: '#764ba2',
        fillOpacity: 0.1,
        weight: 2
      }).addTo(map);

      markers.push(userMarker);
    } else if (selectedCity) {
      // Center map on selected city
      map.setView([selectedCity.coordinates.lat, selectedCity.coordinates.lng], 10);

      // Add circle to show radius
      L.circle([selectedCity.coordinates.lat, selectedCity.coordinates.lng], {
        radius: NEARBY_RADIUS_KM * 1000,
        color: '#764ba2',
        fillColor: '#764ba2',
        fillOpacity: 0.1,
        weight: 2
      }).addTo(map);
    }

    // Re-add event markers
    addEventMarkers();
  } catch (error) {
    console.error('Error updating map view:', error);
  }
}

function toggleMapView() {
  const mapContainer = document.getElementById('map-container');
  if (!mapContainer) return;

  const isExpanded = mapContainer.classList.contains('expanded');
  
  // Use requestAnimationFrame for smoother transitions
  requestAnimationFrame(() => {
    if (!isExpanded) {
      // Show the map container
      mapContainer.style.display = 'block';
      
      // Initialize map if not already done
      if (!mapInitialized) {
        initMap();
      } else if (map) {
        // Trigger a resize event to ensure the map renders correctly
        map.invalidateSize();
        updateMapView();
      }
    } else {
      // Hide the map container
      mapContainer.style.display = 'none';
    }
    
    mapContainer.classList.toggle('expanded');
  });
}

// Add CSS optimizations for map container
const style = document.createElement('style');
style.textContent = `
  #map-container {
    transition: all 0.3s ease-in-out;
    will-change: transform, opacity;
    transform: translateZ(0);
    backface-visibility: hidden;
  }
  
  .map-toggle-btn {
    transition: all 0.2s ease-in-out;
    will-change: transform;
    transform: translateZ(0);
    backface-visibility: hidden;
  }
  
  .map-toggle-btn:active {
    transform: scale(0.95);
  }
`;
document.head.appendChild(style);

// Function to get reviews for an event
function getEventReviews(eventTitle) {
  const reviews = JSON.parse(localStorage.getItem(`reviews_${eventTitle}`)) || [];
  return reviews;
}

// Function to save reviews for an event
function saveEventReviews(eventTitle, reviews) {
  localStorage.setItem(`reviews_${eventTitle}`, JSON.stringify(reviews));
}

// Function to display reviews
function displayReviews(eventTitle) {
  const reviewsContainer = document.getElementById('reviews-container');
  if (!reviewsContainer) return;

  const reviews = getEventReviews(eventTitle);
  const currentUser = getCurrentUser();
  
  if (reviews.length === 0) {
    reviewsContainer.innerHTML = `
      <div class="no-reviews">
        <p>No reviews yet. Be the first to review this event!</p>
      </div>
    `;
    return;
  }

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const reviewsHTML = `
    <div class="reviews-summary">
      <div class="average-rating">
        <span class="rating-number">${averageRating.toFixed(1)}</span>
        <div class="stars">
          ${generateStars(averageRating)}
        </div>
        <span class="total-reviews">${reviews.length} review${reviews.length === 1 ? '' : 's'}</span>
      </div>
    </div>

    <div class="reviews-list">
      ${reviews.map(review => `
        <div class="review-card" id="review-${review.id}">
          <div class="review-header">
            <div class="reviewer-info">
              <i class="fas fa-user-circle"></i>
              <span>${review.userName}</span>
            </div>
            <div class="review-meta">
              <div class="review-rating">
                ${generateStars(review.rating)}
              </div>
              <div class="review-date">${formatDate(review.date)}</div>
              ${currentUser && currentUser.email === review.userId ? `
                <div class="review-actions">
                  <button onclick="editReview('${eventTitle}', '${review.id}')" class="edit-btn">
                    <i class="fas fa-edit"></i> Edit
                  </button>
                  <button onclick="deleteReview('${eventTitle}', '${review.id}')" class="delete-btn">
                    <i class="fas fa-trash"></i> Delete
                  </button>
                </div>
              ` : ''}
            </div>
          </div>
          <div class="review-content">
            <p class="review-comment">${review.comment}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  reviewsContainer.innerHTML = reviewsHTML;
}

// Function to generate star HTML
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return `
    ${Array(fullStars).fill('<i class="fas fa-star"></i>').join('')}
    ${hasHalfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
    ${Array(emptyStars).fill('<i class="far fa-star"></i>').join('')}
  `;
}

// Function to initialize star rating
function initializeStarRating() {
  const starContainer = document.querySelector('.review-form .star-rating');
  if (!starContainer) return;

  const stars = starContainer.querySelectorAll('i');
  const ratingInput = document.getElementById('review-rating');

  // Set initial state
  if (ratingInput) {
    const currentRating = parseInt(ratingInput.value) || 5;
    stars.forEach((star, index) => {
      star.className = index < currentRating ? 'fas fa-star' : 'far fa-star';
    });
  }

  // Add click handlers
  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      const rating = index + 1;
      if (ratingInput) {
        ratingInput.value = rating;
      }
      // Update star display
      stars.forEach((s, i) => {
        s.className = i < rating ? 'fas fa-star' : 'far fa-star';
      });
    });

    // Add hover effects
    star.addEventListener('mouseover', () => {
      const rating = index + 1;
      stars.forEach((s, i) => {
        s.className = i < rating ? 'fas fa-star' : 'far fa-star';
      });
    });
  });

  // Reset on mouse leave
  starContainer.addEventListener('mouseleave', () => {
    const currentRating = ratingInput ? parseInt(ratingInput.value) : 5;
    stars.forEach((star, index) => {
      star.className = index < currentRating ? 'fas fa-star' : 'far fa-star';
    });
  });
}

// Function to submit a review
function submitReview(eventTitle) {
  const user = getCurrentUser();
  if (!user) {
    alert('Please log in to submit a review');
    return;
  }

  const ratingInput = document.getElementById('review-rating');
  const commentInput = document.getElementById('review-comment');

  if (!ratingInput || !commentInput) {
    console.error('Review form elements not found');
    return;
  }

  const rating = parseInt(ratingInput.value);
  const comment = commentInput.value.trim();

  if (isNaN(rating) || rating < 1 || rating > 5) {
    alert('Please select a valid rating');
    return;
  }

  if (!comment) {
    alert('Please write a review comment');
    return;
  }

  // Get existing reviews
  const reviews = getEventReviews(eventTitle);
  
  // Create new review
  const newReview = {
    id: Date.now(),
    userId: user.email,
    userName: user.name,
    rating: rating,
    comment: comment,
    date: new Date().toISOString()
  };

  // Add new review to the list
  reviews.push(newReview);
  
  // Save updated reviews
  saveEventReviews(eventTitle, reviews);
  
  // Update the display
  displayReviews(eventTitle);
  
  // Reset the form
  ratingInput.value = '5';
  commentInput.value = '';
  
  // Reset stars
  const stars = document.querySelectorAll('.review-form .star-rating i');
  stars.forEach((star, index) => {
    star.className = index < 5 ? 'fas fa-star' : 'far fa-star';
  });

  // Show success message
  alert('Thank you for your review!');
}

// Function to edit a review
function editReview(eventTitle, reviewId) {
  console.log('Editing review:', { eventTitle, reviewId }); // Debug log
  const user = getCurrentUser();
  if (!user) {
    alert('Please log in to edit your review');
    return;
  }

  const reviews = getEventReviews(eventTitle);
  const review = reviews.find(r => r.id.toString() === reviewId.toString());
  
  if (!review || review.userId !== user.email) {
    alert('You can only edit your own reviews');
    return;
  }

  // Create edit form
  const reviewCard = document.getElementById(`review-${reviewId}`);
  if (!reviewCard) {
    console.error('Review card not found:', reviewId);
    return;
  }

  const editForm = document.createElement('div');
  editForm.className = 'edit-review-form';
  editForm.innerHTML = `
    <div class="rating-input">
      <label>Rating:</label>
      <div class="star-rating">
        <i class="far fa-star" data-rating="1"></i>
        <i class="far fa-star" data-rating="2"></i>
        <i class="far fa-star" data-rating="3"></i>
        <i class="far fa-star" data-rating="4"></i>
        <i class="far fa-star" data-rating="5"></i>
      </div>
      <input type="hidden" id="edit-rating" value="${review.rating}">
    </div>
    <div class="comment-input">
      <label for="edit-comment">Your Review:</label>
      <textarea id="edit-comment" rows="4">${review.comment}</textarea>
    </div>
    <div class="edit-actions">
      <button onclick="saveEdit('${eventTitle}', '${reviewId}')" class="save-btn">
        <i class="fas fa-save"></i> Save Changes
      </button>
      <button onclick="cancelEdit('${eventTitle}', '${reviewId}')" class="cancel-btn">
        <i class="fas fa-times"></i> Cancel
      </button>
    </div>
  `;

  // Replace review content with edit form
  const reviewContent = reviewCard.querySelector('.review-content');
  if (reviewContent) {
    reviewContent.style.display = 'none';
    reviewCard.insertBefore(editForm, reviewContent);
  }

  // Initialize star rating for edit form
  initializeEditStarRating();
}

// Function to initialize star rating for edit form
function initializeEditStarRating() {
  const starContainer = document.querySelector('.edit-review-form .star-rating');
  if (!starContainer) return;

  const stars = starContainer.querySelectorAll('i');
  const ratingInput = document.getElementById('edit-rating');

  // Set initial state
  if (ratingInput) {
    const currentRating = parseInt(ratingInput.value);
    stars.forEach((star, index) => {
      star.className = index < currentRating ? 'fas fa-star' : 'far fa-star';
    });
  }

  // Add click handlers
  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      const rating = index + 1;
      if (ratingInput) {
        ratingInput.value = rating;
      }
      // Update star display
      stars.forEach((s, i) => {
        s.className = i < rating ? 'fas fa-star' : 'far fa-star';
      });
    });

    // Add hover effects
    star.addEventListener('mouseover', () => {
      const rating = index + 1;
      stars.forEach((s, i) => {
        s.className = i < rating ? 'fas fa-star' : 'far fa-star';
      });
    });
  });

  // Reset on mouse leave
  starContainer.addEventListener('mouseleave', () => {
    const currentRating = ratingInput ? parseInt(ratingInput.value) : 5;
    stars.forEach((star, index) => {
      star.className = index < currentRating ? 'fas fa-star' : 'far fa-star';
    });
  });
}

// Function to save edited review
function saveEdit(eventTitle, reviewId) {
  console.log('Saving edit:', { eventTitle, reviewId }); // Debug log
  const user = getCurrentUser();
  if (!user) return;

  const reviews = getEventReviews(eventTitle);
  const reviewIndex = reviews.findIndex(r => r.id.toString() === reviewId.toString());
  
  if (reviewIndex === -1 || reviews[reviewIndex].userId !== user.email) {
    alert('You can only edit your own reviews');
    return;
  }

  const newRating = parseInt(document.getElementById('edit-rating').value);
  const newComment = document.getElementById('edit-comment').value.trim();

  if (!newComment) {
    alert('Please write a review comment');
    return;
  }

  // Update review
  reviews[reviewIndex] = {
    ...reviews[reviewIndex],
    rating: newRating,
    comment: newComment,
    lastEdited: new Date().toISOString()
  };

  saveEventReviews(eventTitle, reviews);
  displayReviews(eventTitle);
}

// Function to delete a review
function deleteReview(eventTitle, reviewId) {
  console.log('Deleting review:', { eventTitle, reviewId }); // Debug log
  const user = getCurrentUser();
  if (!user) {
    alert('Please log in to delete your review');
    return;
  }

  const reviews = getEventReviews(eventTitle);
  const review = reviews.find(r => r.id.toString() === reviewId.toString());
  
  if (!review || review.userId !== user.email) {
    alert('You can only delete your own reviews');
    return;
  }

  if (confirm('Are you sure you want to delete this review?')) {
    const updatedReviews = reviews.filter(r => r.id.toString() !== reviewId.toString());
    saveEventReviews(eventTitle, updatedReviews);
    displayReviews(eventTitle);
  }
}

// Function to cancel edit
function cancelEdit(eventTitle, reviewId) {
  displayReviews(eventTitle);
}

// Update the filterByCategory function to update URL
function filterByCategory(category) {
  const events = document.querySelectorAll('#searchResults li');
  const categoryButtons = document.querySelectorAll('.category-btn');
  
  // Update URL with category parameter
  const url = new URL(window.location.href);
  url.searchParams.set('category', category);
  window.history.pushState({}, '', url);

  // Update active state of category buttons
  categoryButtons.forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim() === category);
  });

  events.forEach(event => {
    const eventCategory = event.querySelector('.event-category').textContent.trim();
    event.style.display = eventCategory === category ? 'flex' : 'none';
  });
}

// Function to handle organizer login
function handleOrganizerLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  // Validate input
  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }
  
  // Find organizer
  const organizer = organizers.find(org => 
    org.email === email && org.password === password
  );
  
  if (organizer) {
    // Store organizer data in localStorage
    localStorage.setItem('currentOrganizer', JSON.stringify({
      email: organizer.email,
      name: organizer.name,
      company: organizer.company
    }));
    
    // Redirect to home page
    window.location.href = 'Home.html';
  } else {
    alert('Invalid email or password. Please try again.');
  }
}

// Function to check if user is an organizer
function isOrganizer() {
  return localStorage.getItem('currentOrganizer') !== null;
}

// Function to get current organizer
function getCurrentOrganizer() {
  const organizerData = localStorage.getItem('currentOrganizer');
  return organizerData ? JSON.parse(organizerData) : null;
}

// Function to handle organizer logout
function handleOrganizerLogout() {
  localStorage.removeItem('currentOrganizer');
  window.location.href = 'Home.html';
}

// Update showLogin to show different content based on login type
function showLogin() {
  const formArea = document.getElementById('form-area');
  formArea.innerHTML = `
    <div class="form-container">
      <div class="login-toggle">
        <label class="switch">
          <input type="checkbox" id="loginTypeToggle" onchange="toggleLoginType()">
          <span class="slider round"></span>
        </label>
        <span id="loginTypeLabel">User Login</span>
      </div>
      <h2 id="loginTitle">User Login</h2>
      <form id="login-form" onsubmit="handleLogin(event)">
        <input type="email" id="email" placeholder="Email" required>
        <input type="password" id="password" placeholder="Password" required>
        <button type="submit" class="submit-btn">Login</button>
      </form>
      <div id="login-footer">
        <p style="text-align: center; margin-top: 1rem;">
          Don't have an account? <a href="register.html" style="color: #764ba2;">Register here</a>
        </p>
      </div>
    </div>
  `;
}

// Update toggleLoginType to handle different content for organizer login
function toggleLoginType() {
  const toggle = document.getElementById('loginTypeToggle');
  const loginTypeLabel = document.getElementById('loginTypeLabel');
  const loginTitle = document.getElementById('loginTitle');
  const loginForm = document.getElementById('login-form');
  const loginFooter = document.getElementById('login-footer');
  
  if (toggle.checked) {
    // Switch to organizer login
    loginTypeLabel.textContent = 'Organizer Login';
    loginTitle.textContent = 'Organizer Login';
    loginForm.onsubmit = (event) => handleOrganizerLogin(event);
    // Remove registration link for organizers
    loginFooter.innerHTML = `
      <p style="text-align: center; margin-top: 1rem; color: #666;">
        <i class="fas fa-info-circle"></i> Organizer accounts are managed by administrators
      </p>
    `;
  } else {
    // Switch to user login
    loginTypeLabel.textContent = 'User Login';
    loginTitle.textContent = 'User Login';
    loginForm.onsubmit = (event) => handleLogin(event);
    // Show registration link for users
    loginFooter.innerHTML = `
      <p style="text-align: center; margin-top: 1rem;">
        Don't have an account? <a href="register.html" style="color: #764ba2;">Register here</a>
      </p>
    `;
  }
}

/**
 * Handles user login process
 * @param {Event} event - Form submission event
 * 
 * Features:
 * - Validates user credentials
 * - Supports both regular users and organizers
 * - Manages session storage
 * - Redirects to appropriate dashboard
 */
function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Check both current session and persistent storage
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    alert("Login successful!");
    // Set current session
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = "Home.html";
  } else {
    alert("Invalid email or password!");
  }
}

// Function to show organizer dashboard
function showOrganizerDashboard() {
  const currentOrganizer = getCurrentOrganizer();
  if (!currentOrganizer) {
    window.location.href = 'login.html';
    return;
  }

  // Load events from localStorage
  const savedEvents = localStorage.getItem('eventData');
  if (savedEvents) {
    Object.assign(eventData, JSON.parse(savedEvents));
  }

  // Load ticket availability from localStorage
  const savedTickets = localStorage.getItem('ticketAvailability');
  if (savedTickets) {
    Object.assign(ticketAvailability, JSON.parse(savedTickets));
  }

  const formArea = document.getElementById('form-area');
  formArea.innerHTML = `
    <div class="dashboard-container">
      <div class="welcome-section">
        <h2>Welcome, ${currentOrganizer.name}!</h2>
        <p class="company-name"><i class="fas fa-building"></i> ${currentOrganizer.company}</p>
      </div>
      
      <div class="dashboard-grid">
        <div class="dashboard-card" onclick="showCreateEvent()">
          <i class="fas fa-plus-circle"></i>
          <h3>Create New Event</h3>
          <p>Set up a new event listing</p>
        </div>
        
        <div class="dashboard-card" onclick="showManageEvents()">
          <i class="fas fa-calendar-alt"></i>
          <h3>Manage Events</h3>
          <p>View and edit your events</p>
        </div>
        
        <div class="dashboard-card" onclick="showAttendeeManagement()">
          <i class="fas fa-users"></i>
          <h3>Attendee Management</h3>
          <p>View and manage attendees</p>
        </div>
        
        <div class="dashboard-card" onclick="showEventAnalytics()">
          <i class="fas fa-chart-line"></i>
          <h3>Event Analytics</h3>
          <p>View event statistics and insights</p>
        </div>
        
        <div class="dashboard-card" onclick="showOrganizerProfile()">
          <i class="fas fa-user-cog"></i>
          <h3>Profile Settings</h3>
          <p>Manage your organizer account</p>
        </div>
      </div>
    </div>
  `;
}

// Function to show create event form
function showCreateEvent() {
  const currentOrganizer = getCurrentOrganizer();
  if (!currentOrganizer) {
    window.location.href = 'login.html';
    return;
  }

  const formArea = document.getElementById('form-area');
  formArea.innerHTML = `
    <div class="form-container">
      <h2>Create New Event</h2>
      <form id="create-event-form" onsubmit="handleCreateEvent(event)">
        <div class="form-section">
          <h3>Basic Information</h3>
          <input type="text" id="event-title" placeholder="Event Title" required>
          <input type="date" id="event-date" required>
          <input type="number" id="event-price" placeholder="Ticket Price" min="0" step="0.01" required>
          <select id="event-category" required>
            <option value="">Select Category</option>
            ${Object.keys(eventCategories).map(category => 
              `<option value="${category}">${category}</option>`
            ).join('')}
          </select>
          <input type="number" id="event-tickets" placeholder="Number of Tickets" min="1" required>
          <textarea id="event-description" placeholder="Event Description" rows="4" required></textarea>
        </div>

        <div class="form-section">
          <h3>Location Information</h3>
          <div class="location-inputs">
            <div class="location-row">
              <input type="text" id="event-venue" placeholder="Venue Name" required>
              <input type="text" id="event-address" placeholder="Street Address" required>
            </div>
            <div class="location-row">
              <input type="text" id="event-city" placeholder="City" required>
              <input type="text" id="event-country" placeholder="Country" required>
            </div>
            <div class="location-row">
              <input type="text" id="event-postal" placeholder="Postal Code" required>
              <input type="text" id="event-phone" placeholder="Venue Phone Number" required>
            </div>
          </div>
          
          <div class="map-selection">
            <h4>Select Location on Map</h4>
            <div id="location-map" style="height: 300px; margin: 10px 0;"></div>
            <div class="coordinates-display">
              <p>Selected Coordinates: <span id="selected-coordinates">Not selected</span></p>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Event Media</h3>
          <input type="file" id="event-image" accept="image/*" required>
          <div class="image-preview" id="image-preview"></div>
        </div>

        <button type="submit" class="submit-btn">Create Event</button>
      </form>
      <button onclick="showOrganizerDashboard()" class="back-btn">
        <i class="fas fa-arrow-left"></i> Back to Dashboard
      </button>
    </div>
  `;

  // Initialize the map after the form is rendered
  setTimeout(() => {
    initLocationMap();
  }, 100);

  // Add image preview functionality
  const imageInput = document.getElementById('event-image');
  const imagePreview = document.getElementById('image-preview');
  
  imageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        imagePreview.innerHTML = `
          <img src="${e.target.result}" alt="Preview" style="max-width: 200px; margin-top: 10px;">
        `;
      };
      reader.readAsDataURL(file);
    }
  });
}

// Function to initialize location map for event creation/editing
function initLocationMap(existingCoordinates = null) {
  const mapElement = document.getElementById('location-map');
  if (!mapElement) return;

  // Clear any existing map
  if (mapElement._leaflet_id) {
    mapElement._leaflet_id = null;
    mapElement.innerHTML = '';
  }

  // Initialize the map
  const map = L.map(mapElement).setView(
    existingCoordinates ? [existingCoordinates.lat, existingCoordinates.lng] : [24.7136, 46.6753], // Default to Riyadh
    12
  );

  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  let marker = null;

  // If editing an existing event, place marker at current location
  if (existingCoordinates) {
    marker = L.marker([existingCoordinates.lat, existingCoordinates.lng], {
      draggable: true
    }).addTo(map);

    // Update coordinates display
    document.getElementById('selected-coordinates').textContent = 
      `Latitude: ${existingCoordinates.lat.toFixed(6)}, Longitude: ${existingCoordinates.lng.toFixed(6)}`;
  }

  // Add click listener to map
  map.on('click', (event) => {
    const clickedLocation = {
      lat: event.latlng.lat,
      lng: event.latlng.lng
    };

    // Update or create marker
    if (marker) {
      marker.setLatLng([clickedLocation.lat, clickedLocation.lng]);
    } else {
      marker = L.marker([clickedLocation.lat, clickedLocation.lng], {
        draggable: true
      }).addTo(map);
    }

    // Update coordinates display
    document.getElementById('selected-coordinates').textContent = 
      `Latitude: ${clickedLocation.lat.toFixed(6)}, Longitude: ${clickedLocation.lng.toFixed(6)}`;
  });

  // Add drag listener to marker
  if (marker) {
    marker.on('dragend', (event) => {
      const newLocation = {
        lat: event.target.getLatLng().lat,
        lng: event.target.getLatLng().lng
      };
      document.getElementById('selected-coordinates').textContent = 
        `Latitude: ${newLocation.lat.toFixed(6)}, Longitude: ${newLocation.lng.toFixed(6)}`;
    });
  }

  // Invalidate map size to ensure it displays correctly
  setTimeout(() => { map.invalidateSize(); }, 100);
}

/**
 * Creates a new event
 * @param {Event} event - Form submission event
 * 
 * Features:
 * - Collects event details
 * - Handles image upload
 * - Manages location selection
 * - Sets up ticket availability
 * - Saves to local storage
 */
function handleCreateEvent(event) {
  event.preventDefault();
  
  const currentOrganizer = getCurrentOrganizer();
  if (!currentOrganizer) {
    window.location.href = 'login.html';
    return;
  }

  const title = document.getElementById('event-title').value;
  const date = document.getElementById('event-date').value;
  const price = parseFloat(document.getElementById('event-price').value);
  const category = document.getElementById('event-category').value;
  const tickets = parseInt(document.getElementById('event-tickets').value);
  const description = document.getElementById('event-description').value;
  
  // Get location information
  const venue = document.getElementById('event-venue').value;
  const address = document.getElementById('event-address').value;
  const city = document.getElementById('event-city').value;
  const country = document.getElementById('event-country').value;
  const postal = document.getElementById('event-postal').value;
  const phone = document.getElementById('event-phone').value;
  
  // Get coordinates from the map
  const coordinatesText = document.getElementById('selected-coordinates').textContent;
  const coordinatesMatch = coordinatesText.match(/Latitude: ([\d.-]+), Longitude: ([\d.-]+)/);
  
  if (!coordinatesMatch) {
    alert('Please select a location on the map');
    return;
  }

  const coordinates = {
    lat: parseFloat(coordinatesMatch[1]),
    lng: parseFloat(coordinatesMatch[2])
  };

  const imageFile = document.getElementById('event-image').files[0];

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      // Create new event with detailed location information
      const newEvent = {
        date: date,
        image: e.target.result,
        location: {
          venue: venue,
          address: address,
          city: city,
          country: country,
          postal: postal,
          phone: phone,
          fullAddress: `${venue}, ${address}, ${city}, ${country} ${postal}`
        },
        coordinates: coordinates,
        price: price,
        category: category,
        description: description,
        organizer: {
          name: currentOrganizer.name,
          email: currentOrganizer.email,
          company: currentOrganizer.company
        },
        reviews: []
      };

      // Add to eventData
      eventData[title] = newEvent;

      // Update ticket availability
      ticketAvailability[title] = {
        total: tickets,
        available: tickets,
        version: 1
      };

      // Save to localStorage
      localStorage.setItem('eventData', JSON.stringify(eventData));
      localStorage.setItem('ticketAvailability', JSON.stringify(ticketAvailability));

      alert('Event created successfully!');
      showOrganizerDashboard();
    };
    reader.readAsDataURL(imageFile);
  }
}

// Function to show manage events
function showManageEvents() {
  const currentOrganizer = getCurrentOrganizer();
  if (!currentOrganizer) {
    window.location.href = 'login.html';
    return;
  }

  // Load events from localStorage
  const savedEvents = localStorage.getItem('eventData');
  if (savedEvents) {
    try {
      const parsedEvents = JSON.parse(savedEvents);
      Object.assign(eventData, parsedEvents);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  }

  const formArea = document.getElementById('form-area');
  if (!formArea) return;

  const organizerEvents = Object.entries(eventData)
    .filter(([_, event]) => event.organizer && event.organizer.email === currentOrganizer.email);

  formArea.innerHTML = `
    <div class="dashboard-container">
      <h2>Manage Events</h2>
      ${organizerEvents.length === 0 ? `
        <div class="empty-state">
          <p>You haven't created any events yet.</p>
          <button onclick="showCreateEvent()" class="btn">Create Your First Event</button>
        </div>
      ` : `
        <div class="events-grid">
          ${organizerEvents.map(([title, event]) => `
            <div class="event-card">
              <img src="${event.image}" alt="${title}">
              <div class="event-card-content">
                <h3>${title}</h3>
                <p><i class="fas fa-calendar"></i> ${formatDate(event.date)}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${event.location.fullAddress || event.location}</p>
                <p><i class="fas fa-ticket-alt"></i> ${ticketAvailability[title]?.available || 0} tickets left</p>
                <div class="event-actions">
                  <button onclick="editEvent('${title}')" class="edit-btn">
                    <i class="fas fa-edit"></i> Edit
                  </button>
                  <button onclick="deleteEvent('${title}')" class="delete-btn">
                    <i class="fas fa-trash"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `}
      <button onclick="showOrganizerDashboard()" class="back-btn">
        <i class="fas fa-arrow-left"></i> Back to Dashboard
      </button>
    </div>
  `;
}

// Add this function to get event views
function getEventViews(eventTitle) {
  return parseInt(localStorage.getItem(`views_${eventTitle}`)) || 0;
}

// Add this function to increment event views
function incrementEventViews(eventTitle) {
  const currentViews = getEventViews(eventTitle);
  localStorage.setItem(`views_${eventTitle}`, currentViews + 1);
}

// Update showEventAnalytics function
function showEventAnalytics() {
  const currentOrganizer = getCurrentOrganizer();
  if (!currentOrganizer) {
    window.location.href = 'login.html';
    return;
  }

  const formArea = document.getElementById('form-area');
  const organizerEvents = Object.entries(eventData)
    .filter(([_, event]) => event.organizer.email === currentOrganizer.email);

  if (organizerEvents.length === 0) {
    formArea.innerHTML = `
      <div class="dashboard-container">
        <h2>Event Analytics</h2>
        <div class="empty-state">
          <p>No events to analyze yet.</p>
          <button onclick="showCreateEvent()" class="btn">Create Your First Event</button>
        </div>
      </div>
    `;
    return;
  }

  // Calculate analytics for each event
  const eventAnalytics = organizerEvents.map(([title, event]) => {
    const ticketInfo = ticketAvailability[title];
    const totalTickets = ticketInfo.total;
    const availableTickets = ticketInfo.available;
    const soldTickets = totalTickets - availableTickets;
    const revenue = soldTickets * event.price;
    const reviews = getEventReviews(title);
    const averageRating = reviews.length > 0 
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
      : 'No ratings';
    const views = getEventViews(title);

    // Calculate review distribution
    const ratingDistribution = {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length
    };

    return {
      title,
      event,
      totalTickets,
      soldTickets,
      availableTickets,
      revenue,
      reviews: reviews.length,
      averageRating,
      views,
      ratingDistribution,
      reviews
    };
  });

  // Calculate overall statistics
  const totalEvents = organizerEvents.length;
  const totalTickets = eventAnalytics.reduce((sum, event) => sum + event.totalTickets, 0);
  const totalSoldTickets = eventAnalytics.reduce((sum, event) => sum + event.soldTickets, 0);
  const totalRevenue = eventAnalytics.reduce((sum, event) => sum + event.revenue, 0);
  const totalReviews = eventAnalytics.reduce((sum, event) => sum + event.reviews.length, 0);
  const totalViews = eventAnalytics.reduce((sum, event) => sum + event.views, 0);

  formArea.innerHTML = `
    <div class="dashboard-container analytics-dashboard">
      <div class="analytics-header">
        <h2><i class="fas fa-chart-line"></i> Event Analytics</h2>
        <p class="analytics-subtitle">Comprehensive insights into your events' performance</p>
      </div>
      
      <div class="analytics-overview">
        <h3><i class="fas fa-chart-pie"></i> Overall Statistics</h3>
        <div class="analytics-grid">
          <div class="analytics-card">
            <div class="card-icon">
              <i class="fas fa-calendar-check"></i>
            </div>
            <div class="card-content">
              <h4>Total Events</h4>
              <p class="analytics-number">${totalEvents}</p>
            </div>
          </div>
          <div class="analytics-card">
            <div class="card-icon">
              <i class="fas fa-ticket-alt"></i>
            </div>
            <div class="card-content">
              <h4>Total Tickets Sold</h4>
              <p class="analytics-number">${totalSoldTickets}</p>
            </div>
          </div>
          <div class="analytics-card">
            <div class="card-icon">
              <i class="fas fa-dollar-sign"></i>
            </div>
            <div class="card-content">
              <h4>Total Revenue</h4>
              <p class="analytics-number">$${totalRevenue.toFixed(2)}</p>
            </div>
          </div>
          <div class="analytics-card">
            <div class="card-icon">
              <i class="fas fa-eye"></i>
            </div>
            <div class="card-content">
              <h4>Total Views</h4>
              <p class="analytics-number">${totalViews}</p>
            </div>
          </div>
          <div class="analytics-card">
            
            <div class="card-content">
              <h4>Total Reviews</h4>
              <p class="analytics-number">${totalReviews}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="event-analytics">
        <h3><i class="fas fa-chart-bar"></i> Individual Event Statistics</h3>
        <div class="event-analytics-grid">
          ${eventAnalytics.map(event => `
            <div class="event-analytics-card">
              <div class="event-header">
                <h4>${event.title}</h4>
                <p class="event-date"><i class="fas fa-calendar"></i> ${formatDate(event.event.date)}</p>
              </div>
              <div class="event-stats">
                <div class="stat-item">
                  <div class="stat-icon">
                    <i class="fas fa-ticket-alt"></i>
                  </div>
                  <div class="stat-info">
                    <span>Tickets Sold</span>
                    <p>${event.soldTickets} / ${event.totalTickets}</p>
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-icon">
                    <i class="fas fa-dollar-sign"></i>
                  </div>
                  <div class="stat-info">
                    <span>Revenue</span>
                    <p>$${event.revenue.toFixed(2)}</p>
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-icon">
                    <i class="fas fa-eye"></i>
                  </div>
                  <div class="stat-info">
                    <span>Views</span>
                    <p>${event.views}</p>
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-icon">
                    <i class="fas fa-star"></i>
                  </div>
                  <div class="stat-info">
                    <span>Average Rating</span>
                    <p>${event.averageRating}</p>
                  </div>
                </div>
              </div>
              <div class="progress-section">
                <div class="progress-bar">
                  <div class="progress" style="width: ${(event.soldTickets / event.totalTickets) * 100}%"></div>
                </div>
                <span class="progress-label">Ticket Sales Progress</span>
              </div>
              
              <div class="reviews-section">
                <h4><i class="fas fa-comments"></i> Reviews</h4>
                <div class="rating-distribution">
                  ${Object.entries(event.ratingDistribution).reverse().map(([rating, count]) => `
                    <div class="rating-bar">
                      <span class="rating-label">${rating} ★</span>
                      <div class="rating-progress">
                        <div class="rating-fill" style="width: ${(count / event.reviews) * 100}%"></div>
                      </div>
                      <span class="rating-count">${count}</span>
                    </div>
                  `).join('')}
                </div>
                <div class="recent-reviews">
                  <h5>Recent Reviews</h5>
                  ${event.reviews.slice(-3).reverse().map(review => `
                    <div class="review-item">
                      <div class="review-header">
                        <span class="reviewer-name">${review.userName}</span>
                        <div class="review-rating">
                          ${generateStars(review.rating)}
                        </div>
                      </div>
                      <p class="review-comment">${review.comment}</p>
                      <span class="review-date">${formatDate(review.date)}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <button onclick="showOrganizerDashboard()" class="back-btn">
        <i class="fas fa-arrow-left"></i> Back to Dashboard
      </button>
    </div>
  `;

  // Add custom styles
  const style = document.createElement('style');
  style.textContent = `
    .analytics-dashboard {
      padding: 2rem;
      background: #f8f9fa;
    }

    .analytics-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .analytics-header h2 {
      color: #2c3e50;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .analytics-subtitle {
      color: #6c757d;
      font-size: 1.1rem;
    }

    .analytics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .analytics-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
      display: flex;
      align-items: center;
    }

    .analytics-card:hover {
      transform: translateY(-5px);
    }

    .card-icon {
      width: 50px;
      height: 50px;
      background: #764ba2;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
    }

    .card-icon i {
      color: white;
      font-size: 1.5rem;
    }

    .card-content h4 {
      color: #6c757d;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    .analytics-number {
      color: #2c3e50;
      font-size: 1.8rem;
      font-weight: bold;
      margin: 0;
    }

    .event-analytics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .event-analytics-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .event-header {
      border-bottom: 2px solid #f0f0f0;
      padding-bottom: 1rem;
      margin-bottom: 1.5rem;
    }

    .event-header h4 {
      color: #2c3e50;
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
    }

    .event-date {
      color: #6c757d;
      font-size: 0.9rem;
    }

    .event-stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .stat-item {
      display: flex;
      align-items: center;
      padding: 0.8rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .stat-icon {
      width: 40px;
      height: 40px;
      background: #764ba2;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.8rem;
    }

    .stat-icon i {
      color: white;
      font-size: 1.2rem;
    }

    .stat-info span {
      color: #6c757d;
      font-size: 0.8rem;
      display: block;
    }

    .stat-info p {
      color: #2c3e50;
      font-size: 1.1rem;
      font-weight: bold;
      margin: 0;
    }

    .progress-section {
      margin: 1.5rem 0;
    }

    .progress-bar {
      height: 8px;
      background: #f0f0f0;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 0.5rem;
    }

    .progress {
      height: 100%;
      background: #764ba2;
      border-radius: 4px;
      transition: width 0.3s ease;
    }

    .progress-label {
      color: #6c757d;
      font-size: 0.9rem;
    }

    .reviews-section {
      margin-top: 1.5rem;
    }

    .reviews-section h4 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    .rating-distribution {
      margin-bottom: 1.5rem;
    }

    .rating-bar {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .rating-label {
      width: 40px;
      color: #6c757d;
    }

    .rating-progress {
      flex: 1;
      height: 6px;
      background: #f0f0f0;
      border-radius: 3px;
      margin: 0 1rem;
      overflow: hidden;
    }

    .rating-fill {
      height: 100%;
      background: #764ba2;
      border-radius: 3px;
    }

    .rating-count {
      width: 30px;
      text-align: right;
      color: #6c757d;
      font-size: 0.9rem;
    }

    .recent-reviews {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 1rem;
    }

    .review-item {
      padding: 1rem;
      border-bottom: 1px solid #e9ecef;
    }

    .review-item:last-child {
      border-bottom: none;
    }

    .review-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .reviewer-name {
      color: #2c3e50;
      font-weight: bold;
    }

    .review-rating {
      color: #ffc107;
    }

    .review-comment {
      color: #6c757d;
      margin: 0.5rem 0;
    }

    .review-date {
      color: #adb5bd;
      font-size: 0.8rem;
    }

    .back-btn {
      margin-top: 2rem;
      padding: 0.8rem 1.5rem;
      background: #764ba2;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .back-btn:hover {
      background: #5d3d7e;
    }
  `;
  document.head.appendChild(style);
}

// Function to show organizer profile
function showOrganizerProfile() {
  const currentOrganizer = getCurrentOrganizer();
  if (!currentOrganizer) {
    window.location.href = 'login.html';
    return;
  }

  const formArea = document.getElementById('form-area');
  formArea.innerHTML = `
    <div class="dashboard-container">
      <h2>Organizer Profile</h2>
      <div class="profile-section">
        <div class="profile-info">
          <h3>${currentOrganizer.name}</h3>
          <p><i class="fas fa-envelope"></i> ${currentOrganizer.email}</p>
          <p><i class="fas fa-building"></i> ${currentOrganizer.company}</p>
        </div>
        <div class="profile-actions">
          <button onclick="handleOrganizerLogout()" class="logout-btn">
            <i class="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>
      <button onclick="showOrganizerDashboard()" class="back-btn">
        <i class="fas fa-arrow-left"></i> Back to Dashboard
      </button>
    </div>
  `;
}

// Add the deleteEvent function
function deleteEvent(title) {
  const currentOrganizer = getCurrentOrganizer();
  if (!currentOrganizer) {
    window.location.href = 'login.html';
    return;
  }

  // Check if the event belongs to the current organizer
  const event = eventData[title];
  // Allow deletion of pre-defined events for demonstration purposes, 
  // or if the event belongs to the current organizer.
  // In a real application, you'd strictly check organizer ownership.
  const isOrganizerEvent = event && event.organizer && event.organizer.email === currentOrganizer.email;
  const isPredefinedEvent = !event || ['Tech Conference 2025', 'Startup Meetup', 'Gourmet Food Festival', 'Art Exhibition', 'Riyadh Marathon 2025'].includes(title);

  if (!isOrganizerEvent && !isPredefinedEvent) {
      alert('You can only delete your own events');
      return;
  }

  if (confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
    // Delete the event from eventData
    delete eventData[title];
    
    // Delete the event from ticketAvailability
    delete ticketAvailability[title];
    
    // Delete any reviews for this event
    localStorage.removeItem(`reviews_${title}`);
    
    // Update localStorage
    localStorage.setItem('eventData', JSON.stringify(eventData));
    localStorage.setItem('ticketAvailability', JSON.stringify(ticketAvailability));
    
    // Reload event data from localStorage after deletion
    const savedEvents = localStorage.getItem('eventData');
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents);
        Object.assign(eventData, parsedEvents);
      } catch (error) {
        console.error('Error reloading events after deletion:', error);
      }
    }

    // Reload ticket availability from localStorage after deletion
    const savedTickets = localStorage.getItem('ticketAvailability');
    if (savedTickets) {
      try {
        const parsedTickets = JSON.parse(savedTickets);
        Object.assign(ticketAvailability, parsedTickets);
      } catch (error) {
        console.error('Error reloading ticket availability after deletion:', error);
      }
    }

    alert('Event deleted successfully');
    // Redirect or refresh the current view
    if (window.location.pathname.includes('manage-events.html')) {
        showManageEvents(); // Refresh the manage events view if on that page
    } else if (window.location.pathname.includes('search.html')) {
        showSearch(); // Refresh the search view if on that page
    } else {
        window.location.reload(); // Otherwise, just reload the page
    }
  }
}

// Add this function to get all attendees for an event
function getEventAttendees(eventTitle) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const attendees = [];
  
  users.forEach(user => {
    const bookings = JSON.parse(localStorage.getItem(`bookings_${user.email}`)) || [];
    const eventBookings = bookings.filter(booking => booking.title === eventTitle);
    
    if (eventBookings.length > 0) {
      attendees.push({
        name: user.name,
        email: user.email,
        tickets: eventBookings.length,
        bookingDate: eventBookings[0].bookingDate
      });
    }
  });
  
  return attendees;
}

// Add this function to show attendee management
function showAttendeeManagement() {
  const currentOrganizer = getCurrentOrganizer();
  if (!currentOrganizer) {
    window.location.href = 'login.html';
    return;
  }

  const formArea = document.getElementById('form-area');
  const organizerEvents = Object.entries(eventData)
    .filter(([_, event]) => event.organizer.email === currentOrganizer.email);

  if (organizerEvents.length === 0) {
    formArea.innerHTML = `
      <div class="dashboard-container">
        <h2>Attendee Management</h2>
        <div class="empty-state">
          <p>You haven't created any events yet.</p>
          <button onclick="showCreateEvent()" class="btn">Create Your First Event</button>
        </div>
      </div>
    `;
    return;
  }

  formArea.innerHTML = `
    <div class="dashboard-container">
      <h2>Attendee Management</h2>
      <div class="event-selector">
        <select id="eventSelect" onchange="showEventAttendees(this.value)">
          <option value="">Select an Event</option>
          ${organizerEvents.map(([title, event]) => `
            <option value="${title}">${title} (${formatDate(event.date)})</option>
          `).join('')}
        </select>
      </div>
      <div id="attendeeList" class="attendee-list">
        <p class="select-event-message">Please select an event to view attendees</p>
      </div>
      <button onclick="showOrganizerDashboard()" class="back-btn">
        <i class="fas fa-arrow-left"></i> Back to Dashboard
      </button>
    </div>
  `;
}

// Add this function to show attendees for a specific event
function showEventAttendees(eventTitle) {
  const attendeeList = document.getElementById('attendeeList');
  if (!attendeeList) return;

  const event = eventData[eventTitle];
  if (!event) {
    attendeeList.innerHTML = '<p class="error-message">Event not found</p>';
    return;
  }

  const attendees = getEventAttendees(eventTitle);
  
  if (attendees.length === 0) {
    attendeeList.innerHTML = `
      <div class="empty-state">
        <p>No attendees have registered for this event yet.</p>
      </div>
    `;
    return;
  }

  // Calculate total tickets sold
  const totalTickets = attendees.reduce((sum, attendee) => sum + attendee.tickets, 0);
  const totalRevenue = totalTickets * event.price;

  attendeeList.innerHTML = `
    <div class="attendee-summary">
      <div class="summary-card">
        <i class="fas fa-users"></i>
        <h3>Total Attendees</h3>
        <p>${attendees.length}</p>
      </div>
      <div class="summary-card">
        <i class="fas fa-ticket-alt"></i>
        <h3>Total Tickets</h3>
        <p>${totalTickets}</p>
      </div>
      <div class="summary-card">
        <i class="fas fa-dollar-sign"></i>
        <h3>Total Revenue</h3>
        <p>$${totalRevenue.toFixed(2)}</p>
      </div>
    </div>
    <div class="attendee-table-container">
      <table class="attendee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Tickets</th>
            <th>Booking Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${attendees.map(attendee => `
            <tr>
              <td>${attendee.name}</td>
              <td>${attendee.email}</td>
              <td>${attendee.tickets}</td>
              <td>${formatDate(attendee.bookingDate)}</td>
              <td>
                <button onclick="sendEmailToAttendee('${attendee.email}', '${eventTitle}')" class="action-btn">
                  <i class="fas fa-envelope"></i> Email
                </button>
                <button onclick="viewAttendeeDetails('${attendee.email}', '${eventTitle}')" class="action-btn">
                  <i class="fas fa-info-circle"></i> Details
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <div class="export-section">
      <button onclick="exportAttendeeList('${eventTitle}')" class="export-btn">
        <i class="fas fa-download"></i> Export Attendee List
      </button>
    </div>
  `;
}

// Add this function to send email to attendee
function sendEmailToAttendee(email, eventTitle) {
  const event = eventData[eventTitle];
  if (!event) return;

  const subject = encodeURIComponent(`Regarding your tickets for ${eventTitle}`);
  const body = encodeURIComponent(`Dear attendee,\n\nThis is regarding your tickets for ${eventTitle}.\n\nBest regards,\n${event.organizer.name}`);
  
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}

// Add this function to view attendee details
function viewAttendeeDetails(email, eventTitle) {
  const user = JSON.parse(localStorage.getItem('users'))?.find(u => u.email === email);
  const bookings = JSON.parse(localStorage.getItem(`bookings_${email}`)) || [];
  const eventBookings = bookings.filter(b => b.title === eventTitle);
  const event = eventData[eventTitle];

  if (!user || !event || eventBookings.length === 0) return;

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn" onclick="this.parentElement.parentElement.remove()">&times;</span>
      <h2>Attendee Details</h2>
      <div class="attendee-details">
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Event:</strong> ${eventTitle}</p>
        <p><strong>Number of Tickets:</strong> ${eventBookings.length}</p>
        <p><strong>Total Paid:</strong> $${(event.price * eventBookings.length).toFixed(2)}</p>
        <p><strong>Booking Date:</strong> ${formatDate(eventBookings[0].bookingDate)}</p>
        <p><strong>Event Date:</strong> ${formatDate(event.date)}</p>
        <p><strong>Event Location:</strong> ${event.location.fullAddress || event.location}</p>
      </div>
      <div class="modal-actions">
        <button onclick="sendEmailToAttendee('${email}', '${eventTitle}')" class="action-btn">
          <i class="fas fa-envelope"></i> Send Email
        </button>
        <button onclick="this.parentElement.parentElement.parentElement.remove()" class="close-btn">
          Close
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

// Add this function to export attendee list
function exportAttendeeList(eventTitle) {
  const event = eventData[eventTitle];
  if (!event) return;

  const attendees = getEventAttendees(eventTitle);
  
  // Create CSV content
  const headers = ['Name', 'Email', 'Tickets', 'Booking Date', 'Total Paid'];
  const rows = attendees.map(attendee => [
    attendee.name,
    attendee.email,
    attendee.tickets,
    formatDate(attendee.bookingDate),
    `$${(event.price * attendee.tickets).toFixed(2)}`
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${eventTitle}_attendees.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Add function to update distance filter
function updateDistanceFilter(value) {
  document.getElementById('distanceValue').textContent = value;
  // Update the location status message with the new distance
  const locationStatus = document.getElementById('locationStatus');
  if (locationStatus && locationStatus.querySelector('.success')) {
    locationStatus.innerHTML = `
      <p class="success">
        <i class="fas fa-check-circle"></i> 
        Location detected! Showing events within ${value}km
      </p>`;
  }
  filterEvents();
}

// Add function to sort events
function sortEvents(sortBy) {
  const eventsList = document.getElementById('searchResults');
  const events = Array.from(eventsList.children);

  events.sort((a, b) => {
    const aTitle = a.querySelector('.event-info span').textContent;
    const bTitle = b.querySelector('.event-info span').textContent;
    const aEvent = eventData[aTitle];
    const bEvent = eventData[bTitle];

    switch (sortBy) {
      case 'date':
        return new Date(aEvent.date) - new Date(bEvent.date);
      case 'price':
        return aEvent.price - bEvent.price;
      case 'distance':
        if (userLocation || selectedCity) {
          const aCoords = aEvent.coordinates;
          const bCoords = bEvent.coordinates;
          const userCoords = userLocation || selectedCity.coordinates;
          
          const aDistance = calculateDistance(
            userCoords.lat,
            userCoords.lng,
            aCoords.lat,
            aCoords.lng
          );
          
          const bDistance = calculateDistance(
            userCoords.lat,
            userCoords.lng,
            bCoords.lat,
            bCoords.lng
          );
          
          return aDistance - bDistance;
        }
        return 0;
      default:
        return 0;
    }
  });

  events.forEach(event => eventsList.appendChild(event));
}

// Add custom styles for PayPal integration
const paypalStyles = document.createElement('style');
paypalStyles.textContent = `
  .basket-summary {
    margin-top: 2rem;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .total-price {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    text-align: right;
  }

  #paypal-button-container {
    max-width: 500px;
    margin: 0 auto;
  }

  .basket-item {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .basket-item img {
    width: 100px;
    height: 75px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 1rem;
  }

  .basket-item-info {
    flex: 1;
  }

  .basket-item-info h3 {
    margin: 0 0 0.5rem 0;
    color: #2c3e50;
  }

  .basket-item-info p {
    margin: 0.2rem 0;
    color: #6c757d;
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    margin: 0 1rem;
  }

  .quantity-controls button {
    width: 30px;
    height: 30px;
    border: none;
    background: #764ba2;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }

  .quantity-controls input {
    width: 50px;
    text-align: center;
    margin: 0 0.5rem;
    padding: 0.3rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .basket-item-price {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 1rem;
  }

  .remove-item {
    background: none;
    border: none;
    color: #dc3545;
    cursor: pointer;
    padding: 0.5rem;
  }

  .remove-item:hover {
    color: #c82333;
  }

  .empty-basket {
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .empty-basket p {
    margin-bottom: 1rem;
    color: #6c757d;
  }

  .empty-basket .btn {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    background: #764ba2;
    color: white;
    text-decoration: none;
    border-radius: 6px;
    transition: background 0.3s ease;
  }

  .empty-basket .btn:hover {
    background: #5d3d7e;
  }
`;
document.head.appendChild(paypalStyles);

function renderEventList(events) {
  return events.map(([title, event]) => {
    const isBookmarked = getUserBookmarks(getCurrentUser()?.email || '').includes(title);
    return `
      <li onclick="goToEvent('${title}')">
        <img src="${event.image}" alt="${title}" />
        <div class="event-info">
          <span>${title}</span>
          <p class="event-date"><i class="fas fa-calendar"></i> ${formatDate(event.date)}</p>
          <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
          <p class="event-category">
            <i class="fas ${eventCategories[event.category]}"></i>
            ${event.category}
          </p>
          <p class="event-organizer">
            <i class="fas fa-user-tie"></i>
            Organized by: ${event.organizer ? event.organizer.name : 'Unknown Organizer'}
          </p>
          <p class="event-price">
            <i class="fas fa-ticket-alt"></i>
            $${event.price.toFixed(2)}
          </p>
          <p class="event-distance" style="display: none;">
            <i class="fas fa-map-marker-alt"></i>
            <span class="distance-value">Calculating...</span>
          </p>
        </div>
        <button class="bookmark ${isBookmarked ? 'bookmarked' : ''}" onclick="event.stopPropagation(); toggleBookmark('${title}')">
          <i class="fas fa-bookmark"></i>
          <span class="bookmark-tooltip">${isBookmarked ? 'Remove from Bookmarks' : 'Add to Bookmarks'}</span>
        </button>
      </li>`;
  }).join('');
}

// Function to edit an event
function editEvent(title) {
  console.log('Edit button clicked for event:', title);
  console.log('Current event data:', eventData[title]);
  
  const currentOrganizer = getCurrentOrganizer();
  console.log('Current organizer:', currentOrganizer);
  
  if (!currentOrganizer) {
    window.location.href = 'login.html';
    return;
  }

  // Check if the event belongs to the current organizer
  const event = eventData[title];
  console.log('Event found:', event);
  
  if (!event || event.organizer.email !== currentOrganizer.email) {
    alert('You can only edit your own events');
    return;
  }

  const formArea = document.getElementById('form-area');
  console.log('Form area found:', formArea);
  
  if (!formArea) {
    console.error('Form area not found');
    return;
  }

  // Handle both old and new location data structures
  const location = event.location;
  const venue = location.venue || '';
  const address = location.address || '';
  const city = location.city || '';
  const country = location.country || '';
  const postal = location.postal || '';
  const phone = location.phone || '';
  const coordinates = event.coordinates || { lat: 0, lng: 0 };

  console.log('Location data:', { venue, address, city, country, postal, phone, coordinates });

  formArea.innerHTML = `
    <div class="form-container">
      <h2>Edit Event</h2>
      <form id="edit-event-form" onsubmit="handleEditEvent(event, '${title}')">
        <div class="form-section">
          <h3>Basic Information</h3>
          <input type="text" id="event-title" placeholder="Event Title" value="${title}" required>
          <input type="date" id="event-date" value="${event.date}" required>
          <input type="number" id="event-price" placeholder="Ticket Price" min="0" step="0.01" value="${event.price}" required>
          <select id="event-category" required>
            <option value="">Select Category</option>
            ${Object.keys(eventCategories).map(category => 
              `<option value="${category}" ${category === event.category ? 'selected' : ''}>${category}</option>`
            ).join('')}
          </select>
          <input type="number" id="event-tickets" placeholder="Number of Tickets" min="1" value="${ticketAvailability[title].total}" required>
          <textarea id="event-description" placeholder="Event Description" rows="4" required>${event.description}</textarea>
        </div>

        <div class="form-section">
          <h3>Location Information</h3>
          <div class="location-inputs">
            <div class="location-row">
              <input type="text" id="event-venue" placeholder="Venue Name" value="${venue}" required>
              <input type="text" id="event-address" placeholder="Street Address" value="${address}" required>
            </div>
            <div class="location-row">
              <input type="text" id="event-city" placeholder="City" value="${city}" required>
              <input type="text" id="event-country" placeholder="Country" value="${country}" required>
            </div>
            <div class="location-row">
              <input type="text" id="event-postal" placeholder="Postal Code" value="${postal}" required>
              <input type="text" id="event-phone" placeholder="Venue Phone Number" value="${phone}" required>
            </div>
          </div>
          
          <div class="map-selection">
            <h4>Select Location on Map</h4>
            <div id="location-map" style="height: 300px; margin: 10px 0;"></div>
            <div class="coordinates-display">
              <p>Selected Coordinates: <span id="selected-coordinates">Latitude: ${coordinates.lat}, Longitude: ${coordinates.lng}</span></p>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Event Media</h3>
          <input type="file" id="event-image" accept="image/*">
          <div class="image-preview" id="image-preview">
            <img src="${event.image}" alt="Current event image" style="max-width: 200px;">
          </div>
        </div>

        <button type="submit" class="submit-btn">Update Event</button>
      </form>
      <button onclick="showManageEvents()" class="back-btn">
        <i class="fas fa-arrow-left"></i> Back to Manage Events
      </button>
    </div>
  `;

  // Initialize the map after the form is rendered
  setTimeout(() => {
    console.log('Initializing map with coordinates:', coordinates);
    initLocationMap(coordinates);
  }, 100);
}

// Function to handle event editing
function handleEditEvent(event, oldTitle) {
  event.preventDefault();
  
  const currentOrganizer = getCurrentOrganizer();
  if (!currentOrganizer) {
    window.location.href = 'login.html';
    return;
  }

  const newTitle = document.getElementById('event-title').value;
  const date = document.getElementById('event-date').value;
  const price = parseFloat(document.getElementById('event-price').value);
  const category = document.getElementById('event-category').value;
  const tickets = parseInt(document.getElementById('event-tickets').value);
  const description = document.getElementById('event-description').value;
  
  // Get location information
  const venue = document.getElementById('event-venue').value;
  const address = document.getElementById('event-address').value;
  const city = document.getElementById('event-city').value;
  const country = document.getElementById('event-country').value;
  const postal = document.getElementById('event-postal').value;
  const phone = document.getElementById('event-phone').value;
  
  // Get coordinates from the map
  const coordinatesText = document.getElementById('selected-coordinates').textContent;
  const coordinatesMatch = coordinatesText.match(/Latitude: ([\d.-]+), Longitude: ([\d.-]+)/);
  
  if (!coordinatesMatch) {
    alert('Please select a location on the map');
    return;
  }

  const coordinates = {
    lat: parseFloat(coordinatesMatch[1]),
    lng: parseFloat(coordinatesMatch[2])
  };

  const imageFile = document.getElementById('event-image').files[0];
  const currentEvent = eventData[oldTitle];

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      updateEvent(oldTitle, newTitle, {
        date: date,
        image: e.target.result,
        location: {
          venue: venue,
          address: address,
          city: city,
          country: country,
          postal: postal,
          phone: phone,
          fullAddress: `${venue}, ${address}, ${city}, ${country} ${postal}`
        },
        coordinates: coordinates,
        price: price,
        category: category,
        description: description,
        organizer: currentEvent.organizer,
        reviews: currentEvent.reviews
      }, tickets);
    };
    reader.readAsDataURL(imageFile);
  } else {
    updateEvent(oldTitle, newTitle, {
      ...currentEvent,
      date: date,
      location: {
        venue: venue,
        address: address,
        city: city,
        country: country,
        postal: postal,
        phone: phone,
        fullAddress: `${venue}, ${address}, ${city}, ${country} ${postal}`
      },
      coordinates: coordinates,
      price: price,
      category: category,
      description: description
    }, tickets);
  }
}

// Helper function to update event data
function updateEvent(oldTitle, newTitle, newEventData, tickets) {
  // Delete old event data
  delete eventData[oldTitle];
  
  // Add new event data
  eventData[newTitle] = newEventData;
  
  // Update ticket availability
  ticketAvailability[newTitle] = {
    total: tickets,
    available: tickets - (ticketAvailability[oldTitle].total - ticketAvailability[oldTitle].available),
    version: ticketAvailability[oldTitle].version + 1
  };
  
  // Delete old ticket availability
  delete ticketAvailability[oldTitle];
  
  // Save to localStorage
  localStorage.setItem('eventData', JSON.stringify(eventData));
  localStorage.setItem('ticketAvailability', JSON.stringify(ticketAvailability));
  
  // Reload event data from localStorage
  const savedEvents = localStorage.getItem('eventData');
  if (savedEvents) {
    try {
      const parsedEvents = JSON.parse(savedEvents);
      Object.assign(eventData, parsedEvents);
    } catch (error) {
      console.error('Error reloading events:', error);
    }
  }

  // Reload ticket availability from localStorage
  const savedTickets = localStorage.getItem('ticketAvailability');
  if (savedTickets) {
    try {
      const parsedTickets = JSON.parse(savedTickets);
      Object.assign(ticketAvailability, parsedTickets);
    } catch (error) {
      console.error('Error reloading ticket availability:', error);
    }
  }
  
  alert('Event updated successfully!');
  showManageEvents();
}

async function validateBeforePayment() {
  const basket = getBasket();
  const hasPaidTickets = basket.some(item => item.price > 0);

  if (hasPaidTickets) {
    // Render PayPal manually when user clicks submit
    return;
  } else {
    // Free tickets — submit immediately
    const result = await submitOrder(null);
    if (result.success) {
      window.location.href = 'my-bookings.html';
    } else {
      alert(result.message);
    }
  }
}

function renderBasket() {
  const basketContainer = document.getElementById('basket-items');
  if (!basketContainer) return;

  const user = getCurrentUser();
  if (!user) {
    basketContainer.innerHTML = `
      <div class="empty-basket">
        <p>Please log in to view your basket.</p>
        <a href="login.html" class="btn">Login</a>
      </div>
    `;
    return;
  }

  const basket = getBasket();
  if (basket.length === 0) {
    basketContainer.innerHTML = `
      <div class="empty-basket">
        <p>Your basket is empty.</p>
        <a href="Home.html" class="btn">Browse Events</a>
      </div>
    `;
    return;
  }

  const hasPaidTickets = basket.some(item => item.price > 0);
  const total = calculateTotal();

  const itemsHTML = basket.map(item => `
    <div class="basket-item">
      <img src="${eventData[item.title].image}" alt="${item.title}">
      <div class="basket-item-info">
        <h3>${item.title}</h3>
        <p>${formatDate(eventData[item.title].date)}</p>
        <p>${eventData[item.title].location}</p>
        ${item.price === 0 ? '<p class="free-ticket-label">Free Ticket</p>' : ''}
      </div>
      <div class="quantity-controls">
        <button onclick="updateQuantity('${item.title}', ${item.quantity - 1})">-</button>
        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.title}', this.value)">
        <button onclick="updateQuantity('${item.title}', ${item.quantity + 1})">+</button>
      </div>
      <div class="basket-item-price">
        ${item.price === 0 ? 'Free' : `$${(item.price * item.quantity).toFixed(2)}`}
      </div>
      <button class="remove-item" onclick="removeFromBasket('${item.title}')">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join('');

  basketContainer.innerHTML = `
    ${itemsHTML}
    <div class="basket-summary">
      <div class="total-price">
        ${hasPaidTickets ? `Total: $${total.toFixed(2)}` : 'All tickets are free'}
      </div>
      <div id="basket-action-area"></div>
    </div>
  `;

  // Action area logic
  const actionArea = document.getElementById('basket-action-area');
  if (hasPaidTickets) {
    // Paid tickets: show PayPal button
    actionArea.innerHTML = `
      <div id="paypal-button-container"></div>
    `;
    initPayPal().catch(error => {
      console.error('Error initializing PayPal:', error);
      alert('Failed to initialize payment system. Please refresh the page and try again.');
    });
  } else {
    // Free tickets: show single submit button
    actionArea.innerHTML = `
      <button id="submit-free-tickets" class="btn" onclick="submitOrder(null).then(result => {
        if (result.success) {
          alert('Free tickets booked successfully!');
          window.location.href = 'my-bookings.html';
        } else {
          alert(result.message || 'Failed to book tickets.');
        }
      })">
        Book Free Tickets
      </button>
    `;
  }
}

function handleManualSubmit() {
  const basket = getBasket();
  const hasPaidTickets = basket.some(item => item.price > 0);
  if (hasPaidTickets) {
    const paypalContainer = document.getElementById('paypal-button-container');
    if (paypalContainer) {
      paypalContainer.style.display = 'block';
      initPayPal();
    }
  } else {
    submitOrder(null).then(result => {
      if (result.success) {
        alert('Free ticket booked!');
        saveBasket([]);
        window.location.href = 'my-bookings.html';
      } else {
        alert('Failed: ' + result.message);
      }
    });
  }
}

function initPayPal() {
  if (typeof paypal === 'undefined') {
    console.error('PayPal SDK not loaded');
    alert('Payment system is not available. Please refresh the page and try again.');
    return;
  }

  const basket = getBasket();
  const total = calculateTotal();

  paypal.Buttons({
    style: {
      layout: 'vertical',
      color: 'blue',
      shape: 'rect',
      label: 'pay'
    },
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: total.toFixed(2),
            currency_code: 'USD'
          },
          description: 'Event Tickets Purchase'
        }]
      });
    },
    onApprove: async function(data, actions) {
      try {
        const paypalContainer = document.getElementById('paypal-button-container');
        if (paypalContainer) {
          paypalContainer.innerHTML = '<div class="loading">Processing payment...</div>';
        }

        const details = await actions.order.capture();
        alert('Payment completed successfully! Thank you, ' + details.payer.name.given_name);

        const orderResult = await submitOrder(details);
        if (orderResult.success) {
          saveBasket([]);
          window.location.href = 'my-bookings.html';
        } else {
          alert('Order failed: ' + orderResult.message);
          renderBasket();
        }
      } catch (error) {
        console.error('Payment processing error:', error);
        alert('An error occurred while processing your payment. Please try again.');
        renderBasket();
      }
    },
    onError: function(err) {
      console.error('PayPal Error:', err);
      alert('An error occurred during payment. Please try again.');
      renderBasket();
    },
    onCancel: function() {
      alert('Payment was cancelled. Please complete the payment to get your tickets.');
      renderBasket();
    }
  }).render('#paypal-button-container')
    .catch(function(error) {
      console.error('PayPal Button Render Error:', error);
      alert('Failed to initialize payment system. Please refresh the page and try again.');
    });
}

