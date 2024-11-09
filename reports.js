// Handle disaster reports and updates
export function initReports(map) {
    const reportForm = document.getElementById('reportForm');
    
    reportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(reportForm);
        
        // Create marker for the report
        const report = {
            location: formData.get('location'),
            type: formData.get('type'),
            description: formData.get('description'),
            timestamp: new Date().toISOString()
        };
        
        addReportMarker(map, report);
        reportForm.reset();
    });
}

function addReportMarker(map, report) {
    // Get coordinates from location string (simplified)
    const [lat, lng] = report.location.split(',').map(Number);
    
    if (lat && lng) {
        const marker = L.marker([lat, lng], {
            icon: L.divIcon({
                className: `disaster-icon ${report.type}`,
                html: `<div class="disaster-marker ${report.type}"></div>`
            })
        }).addTo(map);

        marker.bindPopup(`
            <div class="report-popup">
                <h3>${report.type}</h3>
                <p>${report.description}</p>
                <small>${new Date(report.timestamp).toLocaleString()}</small>
            </div>
        `);
    }
}