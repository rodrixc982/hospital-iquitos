function checkAuth() {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn !== 'true') {
        window.location.href = 'login.html';
    }
}

function logout() {
    localStorage.setItem('loggedIn', 'false');
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Verificar autenticación al cargar la página
document.addEventListener('DOMContentLoaded', checkAuth);
