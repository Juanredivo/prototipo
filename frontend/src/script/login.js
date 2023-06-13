const logoutButton = document.createElement('button');
logoutButton.classList.add('nav-link');
logoutButton.innerText = 'Sair';

window.addEventListener('DOMContentLoaded', function () {
  const loginLink = document.getElementById('login-link');
  const cadastroLink = document.getElementById('cadastro-link');
  const orcamentoLink = document.getElementById('orcamento-link');


  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (isLoggedIn) {

    if (loginLink && loginLink.parentNode) {
      loginLink.parentNode.removeChild(loginLink);
    }
    if (cadastroLink && cadastroLink.parentNode) {
      cadastroLink.parentNode.removeChild(cadastroLink);
    }


    const navbarNav = document.getElementById('navbarNav');
    if (navbarNav) {
      navbarNav.appendChild(logoutButton);
    }
    if (orcamentoLink && orcamentoLink.parentNode) {
      orcamentoLink.style.display = 'block';
    }
  } else {
    if (loginLink && loginLink.parentNode) {
      loginLink.style.display = 'block';
    }
    if (cadastroLink && cadastroLink.parentNode) {
      cadastroLink.style.display = 'block';
    }
    if (orcamentoLink && orcamentoLink.parentNode) {
      orcamentoLink.style.display = 'none';
    }

    if (logoutButton && logoutButton.parentNode) {
      logoutButton.parentNode.removeChild(logoutButton);
    }
  }

  logoutButton.addEventListener('click', function () {
    localStorage.clear();
    location.reload();
  });
});


function Login() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, senha: senha })
  })
    .then(response => {
      if (response.ok) {
        localStorage.setItem('isLoggedIn', true);

        window.location.href = "index.html";
      } else if (response.status === 401) {
        console.log('Credenciais inválidas');
        throw new Error('Credenciais inválidas');
      } else {
        console.log('Erro ao autenticar usuário');
        throw new Error('Erro ao autenticar usuário');
      }
    })
    .catch(error => {
      console.error(error);
    });
}
