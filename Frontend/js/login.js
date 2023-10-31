const formLogin = document.querySelector('#login');

formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email !== '' && password !== '') {
        postLogin(email, password);
        return;
    }

    alert('Identifiant ou Mot de passe vide');        
})

async function postLogin(email, password) {
    const req = await fetch(`http://localhost:5678/api/users/login`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    const res = await req.json();

    if (!res.token) {
        alert('Identifiant ou Mot de passe incorrecte');
        return;
    }

    sessionStorage.setItem('token', res.token);
    window.location.href = './../index.html';
}