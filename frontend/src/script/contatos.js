function contato() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;
  
    if (!nome || !email || !mensagem) {
      alert('Por favor, preencha todos os campos');
      return;
    }
  
    if (!email.includes('@')) {
      alert('Por favor, insira um endereço de e-mail válido');
      return;
    }
  
    if (mensagem.length < 15) {
      alert('A mensagem deve ter pelo menos 15 caracteres');
      return;
    }
  
    fetch('http://localhost:3000/contato', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: nome,
        email: email,
        mensagem: mensagem
      })
    })
      .then(response => {
        if (response.ok) {
          alert('Sua mensagem foi recebida, estaremos analisando e respondendo da melhor forma possível');
        } else {
          throw new Error('Ocorreu um erro no registro');
        }
      })
      .catch(error => {
        alert('Ocorreu um erro na requisição');
        console.error(error);
      });
  }
  