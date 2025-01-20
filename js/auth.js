let isAuthenticated = false;

function authenticate() {
    const password = prompt("Please enter the password to edit:");
    if (password === "focus") {
        isAuthenticated = true;
        document.querySelectorAll('.edit-icon').forEach(btn => {
            btn.style.display = 'inline-block';
        });
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'inline-block';
    } else {
        alert("Incorrect password!");
        logout();
    }
}

function logout() {
    isAuthenticated = false;
    document.querySelectorAll('.edit-icon').forEach(btn => {
        btn.style.display = 'none';
    });
    document.getElementById('loginBtn').style.display = 'inline-block';
    document.getElementById('logoutBtn').style.display = 'none';
}

function toggleEdit(button) {
    if (!isAuthenticated) {
        authenticate();
        if (!isAuthenticated) return;
    }
    
    const wrapper = button.closest('.content-wrapper');
    const content = wrapper.querySelector('#places-content');
    const form = wrapper.querySelector('.edit-form');
    
    if (!form) {
        const editForm = document.createElement('div');
        editForm.className = 'edit-form';
        editForm.style.display = 'none';
        editForm.innerHTML = `
            <textarea class="edit-textarea">${content.innerText}</textarea>
            <div class="edit-form-buttons">
                <button onclick="saveChanges(this)">Save Changes</button>
                <button onclick="cancelEdit(this)">Cancel</button>
            </div>
        `;
        wrapper.appendChild(editForm);
    }
    
    const textarea = wrapper.querySelector('.edit-textarea');
    textarea.value = content.innerText;
    content.style.display = 'none';
    button.style.display = 'none';
    wrapper.querySelector('.edit-form').style.display = 'block';
}

function saveChanges(button) {
    const wrapper = button.closest('.content-wrapper');
    const content = wrapper.querySelector('#places-content');
    const form = wrapper.querySelector('.edit-form');
    const textarea = form.querySelector('.edit-textarea');
    
    content.innerText = textarea.value;
    content.style.display = 'block';
    wrapper.querySelector('.edit-icon').style.display = 'inline-block';
    form.style.display = 'none';
}

function cancelEdit(button) {
    const wrapper = button.closest('.content-wrapper');
    const content = wrapper.querySelector('#places-content');
    const form = wrapper.querySelector('.edit-form');
    
    content.style.display = 'block';
    wrapper.querySelector('.edit-icon').style.display = 'inline-block';
    form.style.display = 'none';
} 