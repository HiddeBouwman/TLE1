const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const res = await fetch('auth.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `action=login&username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });
        const data = await res.json();
        document.getElementById('loginMessage').textContent = data.message;
        if (data.success) {
            localStorage.setItem('loggedInUser', email);
            setTimeout(() => { window.location.href = 'index.html'; }, 1000);
        }
    });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const res = await fetch('auth.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `action=register&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        });
        document.getElementById('loginMessage').textContent = data.message;
        if (data.success) {
            localStorage.setItem('loggedInUser', username);
            setTimeout(() => { window.location.href = 'index.html'; }, 1000);
        }
    });
}
