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
          return response.json(); // Converte a resposta para JSON
        } else if (response.status === 401) {
          console.log('Credenciais inválidas');
          throw new Error('Credenciais inválidas');
        } else {
          console.log('Erro ao autenticar usuário');
          throw new Error('Erro ao autenticar usuário');
        }
      })
      .then(data => {
        const empresaUsuario = data.empresa;
        const nomeUsuario = data.nome;
        const dadosUsuario = {
          empresa: empresaUsuario,
          nome: nomeUsuario,
        };
        console.log(dadosUsuario)
        console.log(data)
        // Salva os dados do usuário no localStorage
        localStorage.setItem('userData', JSON.stringify(dadosUsuario));
  
        window.location.href = "index.html";
      })
      .catch(error => {
        console.error('Erro ao obter os dados do usuário:', error);
      });
  }
  
  document.getElementById('btn-login').addEventListener('click', submitForm);
  


  // Obtém os dados do usuário do localStorage
  const userData = JSON.parse(localStorage.getItem('userData'));