import { initMap, addResourceMarkers } from './js/map.js';
import { resources } from './js/data.js';
import { initReports } from './js/reports.js';
import { initDonation } from './js/donation.js';
import { initAuth } from './js/auth.js';

// Initialize map and features
let map;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize map
    map = initMap();
    addResourceMarkers(map, resources);
    
    // Initialize other modules
    initReports(map);
    initDonation();
    initAuth();
    
    // Make resources available globally for map functions
    window.resources = resources;
    
    // Show initial section
    showSection('home');
});

// Navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = e.target.getAttribute('data-section');
        showSection(section);
    });
});

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    const targetLink = document.querySelector(`[data-section="${sectionId}"]`);
    
    if (targetSection) targetSection.classList.add('active');
    if (targetLink) targetLink.classList.add('active');
}