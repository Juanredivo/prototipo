function register() {

  const fullName = document.getElementById('full-name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const phoneNumber = document.getElementById('phone-number').value;

  fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fullName: fullName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      phoneNumber: phoneNumber
    })
  })
    .then(response => {
      if (response.ok) {
        alert('Registro concluído com sucesso');
      } else {
        alert('Ocorreu um erro no registro');
      }
    })
    .catch(error => {
      alert('Ocorreu um erro de rede');
      console.error(error);
    });
}



