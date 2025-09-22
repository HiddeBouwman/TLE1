document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const passwordRepeat = document.getElementById('registerPasswordRepeat').value;
    const msg = document.getElementById('registerMessage');
    if (password !== passwordRepeat) {
        msg.textContent = 'Wachtwoorden komen niet overeen.';
        return;
    }
    // Sla gegevens tijdelijk op in sessionStorage
    sessionStorage.setItem('pendingRegister', JSON.stringify({username, email, password}));
    alert('Redirect wordt uitgevoerd!');
    window.location.href = '../captcha/index.html?register=1';
});
