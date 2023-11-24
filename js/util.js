function barraDeNavegacao() {
    let barraHTML = `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"
        ><i class="bi bi-graph-up-arrow text-primary p-3"></i> Carteira de
        Ativos</a
      >
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul
          class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
          style="--bs-scroll-height: 100px"
        >
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >Ativos</a
            >
            <ul class="dropdown-menu">
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  onclick="formularioLeAtivos()"
                  >Ler carteira de ativos</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="#" onclick="imprimeAtivos()"
                  >Exibe ativos</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="#">... outra função ...</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul
          class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
          style="--bs-scroll-height: 100px"
        >
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >Carteira Teórica</a
            >
            <ul class="dropdown-menu">
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  onclick="formularioLeCarteiraTeorica()"
                  >Ler carteira teórica</a
                >
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  onclick="imprimeAtivosCarteiraTeorica()"
                  >Exibe carteira teórica</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="#">... outra função ...</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul
          class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
          style="--bs-scroll-height: 100px"
        >
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >Adesão a Carteira</a
            >
            <ul class="dropdown-menu">
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  onclick="formularioLeAtivos()"
                  >... outra função ...</a
                >
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  onclick="formularioLeCarteiraTeorica()"
                  >... outra função ...</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="#">... outra função ...</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul
          class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
          style="--bs-scroll-height: 100px"
        >
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >Backup</a
            >
            <ul class="dropdown-menu">
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  onclick="downloadLocalStorage()"
                  >Salva backup</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="#" onclick="formLeBackup()"
                  >Lê backup</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="#">... outra função ...</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <a class="navbar-brand"
        ><i class="bi bi-currency-dollar"></i> Valor Investido:
        <span id="valorInvestido">R$ 0,00 </span
        ><i class="bi bi-three-dots-vertical"></i>
        <i class="bi bi-currency-dollar"></i>Valor teorico:
        <span id="valorTeorico">R$ 0,00 </span></a
      >
    </div>
  </nav>
  `
    let barraDiv = document.getElementById('barraDeNavegacao');

    barraDiv.innerHTML = barraHTML;
}

function mensagem(msg) {
    let tabelaAtivos = document.getElementById('mensagens')
    let mensagem = `<p> ${msg} </p>`
    tabelaAtivos.innerHTML = mensagem;
}

function initialState() {
    let testAtivos = localStorage.getItem("ativos");
    let testTeorica = localStorage.getItem("teorica");

    if (testAtivos) {
        jsonAtivos = JSON.parse(testAtivos);
        ativos = new Map(Object.entries(jsonAtivos));
    }

    if (testTeorica) {
        jsonTeorica = JSON.parse(testTeorica);
        ativosCarteiraTeorica = new Map(Object.entries(jsonTeorica));
    }

    barraDeNavegacao();



}