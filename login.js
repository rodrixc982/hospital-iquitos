function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = {
        "David": "123",
        "Nilver": "1234",
        "Franco2": "12346"
    };

    if (users[username] && users[username] === password) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('currentUser', username);
        window.location.href = 'index.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}
