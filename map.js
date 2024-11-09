// Map initialization and location tracking
let userMarker = null;
let userCircle = null;
let watchId = null;

export function initMap() {
    const map = L.map('map').setView([23.8367, 91.2795], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    initLocationTracking(map);
    return map;
}

function initLocationTracking(map) {
    if ("geolocation" in navigator) {
        // Initial location
        navigator.geolocation.getCurrentPosition(
            position => updateUserLocation(position, map),
            error => console.error("Error getting location:", error),
            { enableHighAccuracy: true }
        );

        // Continuous tracking
        watchId = navigator.geolocation.watchPosition(
            position => updateUserLocation(position, map),
            error => console.error("Error tracking location:", error),
            { enableHighAccuracy: true, maximumAge: 10000 }
        );
    }
}

function updateUserLocation(position, map) {
    const { latitude, longitude } = position.coords;
    
    if (!userMarker) {
        userMarker = L.marker([latitude, longitude], {
            icon: L.divIcon({
                className: 'user-location',
                html: '<div class="user-marker"></div>'
            })
        }).addTo(map);
        
        userCircle = L.circle([latitude, longitude], {
            radius: 5000,
            color: '#3498db',
            fillColor: '#3498db',
            fillOpacity: 0.1
        }).addTo(map);
        
        map.setView([latitude, longitude], 13);
    } else {
        userMarker.setLatLng([latitude, longitude]);
        userCircle.setLatLng([latitude, longitude]);
    }

    updateNearbyShelters(map, { lat: latitude, lng: longitude });
}

// Add shelter/resource markers
export function addResourceMarkers(map, resources) {
    resources.forEach(resource => {
        const marker = L.marker([resource.lat, resource.lng], {
            icon: getResourceIcon(resource.type)
        })
            .bindPopup(createResourcePopup(resource))
            .addTo(map);
    });
}

function getResourceIcon(type) {
    const iconColors = {
        'Medical': '#e74c3c',
        'Shelter': '#2ecc71',
        'Food': '#f1c40f'
    };

    return L.divIcon({
        className: `resource-marker ${type.toLowerCase()}`,
        html: `<div class="marker-icon" style="background-color: ${iconColors[type]}"></div>`,
        iconSize: [30, 30]
    });
}

function createResourcePopup(resource) {
    const userLocation = userMarker ? userMarker.getLatLng() : null;
    const distance = userLocation ? 
        calculateDistance(userLocation, { lat: resource.lat, lng: resource.lng }) : 
        null;

    return `
        <div class="resource-popup">
            <h3>${resource.name}</h3>
            <p class="resource-type ${resource.type.toLowerCase()}">${resource.type}</p>
            ${distance ? `<p class="distance">Distance: ${distance.toFixed(1)} km</p>` : ''}
            <div class="availability">
                <p>Available: ${resource.available}/${resource.capacity}</p>
                <div class="progress-bar">
                    <div class="progress" style="width: ${(resource.available/resource.capacity) * 100}%"></div>
                </div>
            </div>
            <button onclick="reserveResource('${resource.id}')">Reserve</button>
        </div>
    `;
}

function calculateDistance(point1, point2) {
    const R = 6371; // Earth's radius in km
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLon = (point2.lng - point1.lng) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function updateNearbyShelters(map, userLocation) {
    const nearbyResources = window.resources.filter(resource => {
        const distance = calculateDistance(userLocation, { lat: resource.lat, lng: resource.lng });
        return distance <= 5; // Within 5km radius
    });

    const shelterList = document.getElementById('nearbyList');
    if (shelterList) {
        shelterList.innerHTML = nearbyResources.map(resource => `
            <div class="nearby-item ${resource.type.toLowerCase()}">
                <h4>${resource.name}</h4>
                <p>${resource.type}</p>
                <p>Available: ${resource.available}/${resource.capacity}</p>
                <button onclick="reserveResource('${resource.id}')">Reserve</button>
            </div>
        `).join('');
    }
}