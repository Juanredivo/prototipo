function carregarRamos() {
    axios.get('http://localhost:3000/ramos')
      .then(response => {
        const selectRamo = document.getElementById('ramo');
        selectRamo.innerHTML = '';
  
        const ramos = response.data;
        console.log(ramos)
        ramos.forEach(ramo => {
          const option = document.createElement('option');
          option.value = ramo.id_ramo;
          option.textContent = ramo.nome_ramo;
          selectRamo.appendChild(option);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar os ramos:', error);
      });
  }
  
  function carregarPlanos(idRamo) {
    axios.get(`http://localhost:3000/planos?idRamo=${idRamo}`)
      .then(response => {
        const planosContainer = document.getElementById('planos-container');
        planosContainer.innerHTML = ''; 
  
        const planos = response.data;
        if (planos.length === 0) {

          const mensagem = document.createElement('p');
          mensagem.textContent = 'Nenhum plano disponível para este ramo.';
          planosContainer.appendChild(mensagem);
          return;
        }
  
        planos.forEach(plano => {
          const card = document.createElement('div');
          card.classList.add('card', 'col-md-4', 'mb-4');
  
          const cardBody = document.createElement('div');
          cardBody.classList.add('card-body');
  
          const titulo = document.createElement('h5');
          titulo.classList.add('card-title');
          titulo.textContent = plano.nome_plano;
  
          const descricao = document.createElement('p');
          descricao.classList.add('card-text');
          descricao.textContent = plano.descricao;
  
          const contratarLink = document.createElement('a');
          contratarLink.href = '#'; 
          contratarLink.classList.add('btn', 'btn-primary');
          contratarLink.textContent = 'Contratar';
  
          const personalizarLink = document.createElement('a');
          personalizarLink.href = '#';
          personalizarLink.classList.add('btn', 'btn-secondary', 'ml-2');
          personalizarLink.textContent = 'Personalizar';
      
          personalizarLink.addEventListener('click', () => {
            abrirModalPersonalizacao(plano);
          });
      
          cardBody.appendChild(titulo);
          cardBody.appendChild(descricao);
          cardBody.appendChild(contratarLink);
          cardBody.appendChild(personalizarLink);
          card.appendChild(cardBody);
      
          planosContainer.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar os planos:', error);
      });
  }
  
  
  window.addEventListener('DOMContentLoaded', () => {
    carregarRamos();
  
    const selectRamo = document.getElementById('ramo');
    selectRamo.addEventListener('change', () => {
      const idRamo = selectRamo.value;
      if (idRamo) {
        carregarPlanos(idRamo);
      } else {
        selectRamo.nextElementSibling?.remove();
      }
    });
  });
  
  function abrirModalPersonalizacao(plano) {
    const modalTitulo = document.getElementById('modal-titulo');
    const modalDescricao = document.getElementById('modal-descricao');
    modalTitulo.textContent = plano.nome_plano;
    modalDescricao.textContent = plano.descricao;
  
   
    const emailUsuario = localStorage.getItem('email');
    const modalEmail = document.getElementById('modal-email');
    if (modalEmail) {
      modalEmail.value = emailUsuario;
    }
  
    const modalValor = document.getElementById('modal-valor');
    const modalFacebookAds = document.getElementById('modal-facebook-ads');
    const modalInstaAds = document.getElementById('modal-insta-ads');
    const modalYoutubeAds = document.getElementById('modal-youtube-ads');
    const modalGoogleAds = document.getElementById('modal-google-ads');
  
    if (modalValor) {
      modalValor.value = ''; 
    }
    if (modalFacebookAds) {
      modalFacebookAds.checked = false; 
    }
    if (modalInstaAds) {
      modalInstaAds.checked = false; 
    }
    if (modalYoutubeAds) {
      modalYoutubeAds.checked = false; 
    }
    if (modalGoogleAds) {
      modalGoogleAds.checked = false; 
    }
  
  
    const personalizarLink = document.createElement('a');
    personalizarLink.href = 'javascript:void(0)';
    personalizarLink.classList.add('btn', 'btn-secondary', 'ml-2');
    personalizarLink.textContent = 'Personalizar';
  
    personalizarLink.addEventListener('click', () => {
      personalizarPlano(plano.id, modalValor.value, modalFacebookAds.checked, modalInstaAds.checked, modalYoutubeAds.checked, modalGoogleAds.checked);
    });
  

    const modalFooter = document.getElementById('modal-footer');
    if (modalFooter) {
      modalFooter.innerHTML = ''; 
      modalFooter.appendChild(personalizarLink);
    }
  
  
    $('#modalPersonalizacao').modal('show');
  }
  
  
  function personalizarPlano(planId, value, facebookAds, instaAds, youtubeAds, googleAds) {
    const formData = new FormData();
    formData.append('planId', planId);
    formData.append('value', value);
    formData.append('facebookAds', facebookAds);
    formData.append('instaAds', instaAds);
    formData.append('youtubeAds', youtubeAds);
    formData.append('googleAds', googleAds);
  
    fetch('/personalizar-plano', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Erro ao personalizar o plano');
      })
      .then(data => {
        console.log(data.message);
        // Lógica adicional após o sucesso da personalização do plano
      })
      .catch(error => {
        console.error('Erro ao personalizar o plano:', error);
        // Lógica adicional para lidar com erros
      });
  }
  