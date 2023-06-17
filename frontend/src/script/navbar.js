document.addEventListener("DOMContentLoaded", function() {
    const navbarContainer = document.getElementById("navbarContainer");
    const navbarHTML = `
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light custom-bg">
          <div class="container">
            <a class="navbar-brand" href="index.html">
              <img src="../img/stellebras-1-1.png" alt="Logo Stellebras" width="250" height="45">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="index.html">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link btn" href="quem_somos.html">Quem somos</a>
                </li>
                <li class="nav-item" id="orcamento-link">
                  <a class="nav-link" href="orcamento.html">Orçamento</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link " href="planos.html">Planos</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link " href="contatos.html">Contato</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="login-link" href="login.html">Login</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="cadastro-link" href="register.html">Cadastro</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    `;
    navbarContainer.innerHTML = navbarHTML;
  });
  