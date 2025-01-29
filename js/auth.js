let isAuthenticated = false;

// Check if we're on the health page and handle initial load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    const healthContent = document.getElementById('health-content');
    const authModal = document.getElementById('auth-modal');
    const passwordInput = document.getElementById('password-input');
    
    // Handle enter key in password input
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            authenticate();
        }
    });

    // Show auth modal by default
    if (healthContent && authModal) {
        console.log('Found health content and auth modal');
        healthContent.style.display = 'none';
        authModal.style.display = 'flex';
    }
});

function authenticate() {
    const password = document.getElementById('password-input').value;
    if (password === "focus") {
        showHealthContent();
    } else {
        alert("Incorrect password!");
        document.getElementById('password-input').value = '';
    }
}

function authenticateWithBiometric() {
    const button = document.querySelector('.biometric-button');
    button.innerHTML = '<i class="fas fa-fingerprint"></i> Scanning...';
    button.style.opacity = '0.7';
    button.disabled = true;

    // Simulate fingerprint scanning
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-fingerprint"></i> Authenticating...';
        
        // Simulate authentication process
        setTimeout(() => {
            showHealthContent();
        }, 1000);
    }, 1500);
}

function showHealthContent() {
    isAuthenticated = true;
    const healthContent = document.getElementById('health-content');
    const authModal = document.getElementById('auth-modal');
    const authMessage = document.getElementById('auth-message');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (healthContent && authModal) {
        console.log('Showing health content');
        // Fade out auth modal
        authModal.style.opacity = '0';
        setTimeout(() => {
            authModal.style.display = 'none';
            // Show and fade in health content
            healthContent.style.opacity = '0';
            healthContent.style.display = 'block';
            setTimeout(() => {
                healthContent.style.opacity = '1';
            }, 50);
        }, 300);
    }

    if (authMessage) {
        authMessage.style.display = 'none';
    }
    if (loginBtn) loginBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'inline-block';
}

function logout() {
    console.log('Logout started');
    isAuthenticated = false;
    
    const authMessage = document.getElementById('auth-message');
    const healthContent = document.getElementById('health-content');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (authMessage) authMessage.style.display = 'block';
    if (healthContent) healthContent.style.display = 'none';
    if (loginBtn) loginBtn.style.display = 'inline-block';
    if (logoutBtn) logoutBtn.style.display = 'none';
}

function toggleEdit(button) {
    const wrapper = button.closest('.content-wrapper');
    const content = wrapper.querySelector('.health-item');
    const form = wrapper.querySelector('.edit-form');
    
    if (!form) {
        const editForm = document.createElement('div');
        editForm.className = 'edit-form';
        editForm.style.display = 'none';
        editForm.innerHTML = `
            <textarea class="edit-textarea">${content.innerHTML}</textarea>
            <div class="edit-form-buttons">
                <button onclick="saveChanges(this)">Save Changes</button>
                <button onclick="cancelEdit(this)">Cancel</button>
            </div>
        `;
        wrapper.appendChild(editForm);
    }
    
    const textarea = wrapper.querySelector('.edit-textarea');
    textarea.value = content.innerHTML;
    content.style.display = 'none';
    button.style.display = 'none';
    wrapper.querySelector('.edit-form').style.display = 'block';
}

function saveChanges(button) {
    const wrapper = button.closest('.content-wrapper');
    const content = wrapper.querySelector('.health-item');
    const form = wrapper.querySelector('.edit-form');
    const textarea = form.querySelector('.edit-textarea');
    
    content.innerHTML = textarea.value;
    content.style.display = 'block';
    wrapper.querySelector('.edit-icon').style.display = 'inline-block';
    form.style.display = 'none';
}

function cancelEdit(button) {
    const wrapper = button.closest('.content-wrapper');
    const content = wrapper.querySelector('.health-item');
    const form = wrapper.querySelector('.edit-form');
    
    content.style.display = 'block';
    wrapper.querySelector('.edit-icon').style.display = 'inline-block';
    form.style.display = 'none';
} 