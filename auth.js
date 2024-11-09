export function initAuth() {
    const modal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const closeBtn = document.querySelector('.close');
    
    // Modal controls
    loginBtn.addEventListener('click', () => modal.style.display = 'block');
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
    
    // Form switching
    document.getElementById('showSignup').addEventListener('click', (e) => {
        e.preventDefault();
        switchForm('signupForm');
    });
    
    document.getElementById('showLogin').addEventListener('click', (e) => {
        e.preventDefault();
        switchForm('loginForm');
    });
    
    document.getElementById('showForgot').addEventListener('click', (e) => {
        e.preventDefault();
        switchForm('forgotForm');
    });
    
    document.getElementById('backToLogin').addEventListener('click', (e) => {
        e.preventDefault();
        switchForm('loginForm');
    });
    
    // Form submissions
    document.querySelectorAll('.auth-form form').forEach(form => {
        form.addEventListener('submit', handleAuthSubmit);
    });
}

function switchForm(formId) {
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
    document.getElementById(formId).classList.add('active');
}

function handleAuthSubmit(e) {
    e.preventDefault();
    const formId = e.target.closest('.auth-form').id;
    const formData = new FormData(e.target);
    
    // Simulate authentication
    console.log(`Processing ${formId}:`, Object.fromEntries(formData));
    alert('Authentication feature will be implemented soon!');
}