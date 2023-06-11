function Login() {
  // Obtém os valores de email e senha
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



