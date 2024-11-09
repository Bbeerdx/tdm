export function initDonation() {
    const donationForm = document.getElementById('donationForm');
    const paymentInputs = document.querySelectorAll('input[name="payment"]');
    const upiForm = document.getElementById('upiForm');
    const cardForm = document.getElementById('cardForm');
    
    // Payment method switching
    paymentInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            if (e.target.value === 'upi') {
                upiForm.classList.remove('hidden');
                cardForm.classList.add('hidden');
            } else {
                upiForm.classList.add('hidden');
                cardForm.classList.remove('hidden');
            }
        });
    });
    
    // Form submission
    donationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(donationForm);
        console.log('Processing donation:', Object.fromEntries(formData));
        alert('Thank you for your donation! This is a demo version.');
    });
}