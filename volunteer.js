// Volunteer registration handling
class VolunteerManager {
    constructor() {
        this.volunteers = [];
    }

    addVolunteer(data) {
        this.volunteers.push({
            id: Date.now(),
            ...data,
            status: 'pending'
        });
    }

    getVolunteers() {
        return this.volunteers;
    }
}

const volunteerManager = new VolunteerManager();

// Handle volunteer form submission
const volunteerForm = document.getElementById('volunteer-form');
if (volunteerForm) {
    volunteerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const volunteerData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            expertise: formData.get('expertise')
        };
        volunteerManager.addVolunteer(volunteerData);
        e.target.reset();
    });
}