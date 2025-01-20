// Map initialization
const map = L.map('travel-map').setView([30, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const locations = [
    {
        name: "Shanghai, China",
        coords: [31.2304, 121.4737],
        date: "2024",
        highlight: "F1 Race, City Exploration"
    },
    {
        name: "Chengdu, China",
        coords: [30.5728, 104.0668],
        date: "2024",
        highlight: "Panda Research Base"
    },
    {
        name: "Germany",
        coords: [51.1657, 10.4515],
        date: "2023",
        highlight: "Taylor Swift & Coldplay Concerts"
    },
    {
        name: "Iceland",
        coords: [64.9631, -19.0208],
        date: "2023",
        highlight: "Study Abroad, Northern Lights"
    },
    {
        name: "Yellowstone National Park",
        coords: [44.4280, -110.5885],
        date: "Road Trip",
        highlight: "Family road trip from Illinois, exploring geysers and wildlife"
    },
    {
        name: "Chicago to San Francisco Road Trip",
        coords: [41.8781, -87.6298],
        date: "Recent",
        highlight: "Cross-country journey to new home in SF"
    },
    {
        name: "San Francisco",
        coords: [37.7749, -122.4194],
        date: "2024",
        highlight: "New home"
    },
    {
        name: "Chicago to Boston Road Trip",
        coords: [42.3601, -71.0589],
        date: "Road Trip",
        highlight: "East coast journey through multiple states"
    },
    {
        name: "Uruguay",
        coords: [-32.5228, -55.7658],
        date: "2010-2019",
        highlight: "World Youth Chess Championships"
    },
    {
        name: "Greece",
        coords: [39.0742, 21.8243],
        date: "2010-2019",
        highlight: "World Youth Chess Championships"
    }
];

// Function to create polyline for road trips
function addRoadTrip(map, start, end, color = '#3498db') {
    L.polyline([start, end], {
        color: color,
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 10'
    }).addTo(map);
}

// Add markers and create list entries
const placesContent = document.getElementById('places-content');
let listHTML = '';

locations.forEach(location => {
    // Add marker to map
    const marker = L.marker(location.coords)
        .addTo(map)
        .bindPopup(`
            <div class="location-title">${location.name}</div>
            <div class="location-date">${location.date}</div>
            <div class="location-highlight">${location.highlight}</div>
        `);

    // Add to list below map
    listHTML += `
        <div class="place-entry">
            <div class="location-title">${location.name}</div>
            <div class="location-date">${location.date}</div>
            <div class="location-highlight">${location.highlight}</div>
        </div>
    `;
});

// Add road trip routes
addRoadTrip(map, [41.8781, -87.6298], [44.4280, -110.5885], '#e74c3c'); // Chicago to Yellowstone
addRoadTrip(map, [41.8781, -87.6298], [42.3601, -71.0589], '#2ecc71'); // Chicago to Boston
addRoadTrip(map, [41.8781, -87.6298], [37.7749, -122.4194], '#f1c40f'); // Chicago to SF

placesContent.innerHTML = listHTML; 