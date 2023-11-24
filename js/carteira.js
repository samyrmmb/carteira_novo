var valorCarteiraTeorica = 0;

var ativo = new Ativo('ticket', 1, 1, '0,00');
var ativos = new Map();

var ativoCarteiraTeorica = new AtivoCarteiraTeorica('ticket', 1);
var ativosCarteiraTeorica = new Map();

var ativoAdesao = new AtivoAdesao('ticker', 0, 0, 0, 0);
var ativosAdesao = new Map();


let moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

function lerArquivoAtivos() {
  ativos = new Map();
  const input = document.getElementById('fileInput');
  const file = input.files[0];
  if (!file) {
    console.error('Nenhum arquivo selecionado.');
    return;
  }
  const reader = new FileReader();
  reader.onload = function (e) {
    const conteudoDoArquivo = e.target.result;
    const linhas = conteudoDoArquivo.split('\n');
    linhas.forEach((linha, indice) => {
      const ativoTemp = linha.split(';');
      const ticker = ativoTemp[0];
      const qtd = ativoTemp[1];
      let precoMedio = "";
      if (linha[linha.length - 1] === '\r')
        precoMedio = ativoTemp[2].slice(0, -1);
      else
        precoMedio = ativoTemp[2];

      ativo = new Ativo(ticker, qtd, precoMedio, '0,00');
      ativos.set(ticker, ativo);
    });
    imprimeAtivos();
    saveAtivosStorage();
  };
  reader.onerror = function (error) {
    console.error('Erro ao ler o arquivo:', error);
  };
  reader.readAsText(file);
}


function lerCarteiraTeorica() {
  const input = document.getElementById('fileInput');
  const file = input.files[0];
  if (!file) {
    console.error('Nenhum arquivo selecionado.');
    return;
  }
  const reader = new FileReader();
  reader.onload = function (e) {
    const conteudoDoArquivo = e.target.result;
    const linhas = conteudoDoArquivo.split('\n');
    linhas.forEach((linha, indice) => {
      const ativoTemp = linha.split(';');
      const ticker = ativoTemp[0];
      if (linha[linha.length - 1] === '\r')
        participacao = ativoTemp[1].slice(0, -1);
      else
        participacao = ativoTemp[1];
      ativoCarteiraTeorica = new AtivoCarteiraTeorica(ticker, participacao);
      ativosCarteiraTeorica.set(ticker, ativoCarteiraTeorica);
    });
    imprimeAtivosCarteiraTeorica();
    saveCarteiraTeoricaStorage();
  };
  reader.onerror = function (error) {
    console.error('Erro ao ler o arquivo:', error);
  };
  reader.readAsText(file);
}


function imprimeAtivos() {
  let tabelaAtivos = document.getElementById('tabela_ativos')
  let somaCarteira = 0;
  let conteudoAtivos = `
    <table class="table table-striped table-hover">
      <thead>
          <tr>
              <th scope="col">Ativo</th>
              <th scope="col">Quantidade</th>
              <th scope="col">Preço Médio</th>
              <th scope="col">Valor Investido</th>
              <th scope="col">Cotação</th>
              <th scope="col">Status</th>
          </tr>
      </thead>
      <tbody class="table-group-divider">`
  for (let [chave, valor] of ativos) {
    conteudoAtivos += `<tr>
            <td id="${chave}">${chave}</td>
            <td id="${chave}Qtd">${valor.qtd}</td>
            <td id="${chave}PrecoMedio">${moeda.format(parseFloat(valor.precoMedio.replace(',', '.')))}</td>
            <td id="${chave}ValorInvestido">${moeda.format(valor.qtd * parseFloat(valor.precoMedio.replace(',', '.')))}</td>
            <td id="${chave}Cotacao">${moeda.format(parseFloat(valor.cotacao.replace(',', '.')))}</td>
            <td id="${chave}Status"> Status... <i class="bi bi-check-square-fill text-warning"></i> 
            <button type="button" onclick="cotacao('${chave}')">Cotacao</button></td>
            </tr>`
    somaCarteira += valor.qtd * parseFloat(valor.precoMedio.replace(',', '.'));
  }
  conteudoAtivos += `
      <th colspan=3>Valor total da carteira</td>
      <th>${moeda.format(somaCarteira)}</td>
      </tbody>
    </table>`
  let valorInvestido = document.getElementById('valorInvestido');
  valorInvestido.innerHTML = moeda.format(somaCarteira);
  tabelaAtivos.innerHTML = conteudoAtivos
}


function imprimeAtivosCarteiraTeorica() {
  let tabelaAtivos = document.getElementById('tabela_ativos')
  let conteudoAtivos = `
    <table class="table table-striped table-hover">
      <thead>
          <tr>
              <th scope="col">Ativo</th>
              <th scope="col">Participação</th>
              <th scope="col">Status</th>
          </tr>
      </thead>
      <tbody class="table-group-divider">`
  for (let [chave, valor] of ativosCarteiraTeorica) {
    conteudoAtivos += `<tr>
            <td id="${chave}">${chave}</td>
            <td id="${chave}Qtd">${valor.participacao}</td>
            <td id="${chave}Status"> Status... <i class="bi bi-check-square-fill text-warning"></i> </td>
            </tr>`
  }
  conteudoAtivos += `
      </tbody>
    </table>`
  tabelaAtivos.innerHTML = conteudoAtivos
}


function cotacao(cotarAtivo) {

  let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${cotarAtivo}.SA&apikey=NM1LJQNXSPI9BQC1`
  let statusAtivo = document.getElementById(`${cotarAtivo}Status`)
  let cotacaoForm = document.getElementById(`${cotarAtivo}Cotacao`)
  statusAtivo.innerHTML = '<i class="bi bi-x-square-fill text-danger"></i>'
  axios
    .get(url)
    .then((res) => {
      let responsedata = res.data;
      let quoteData = responsedata["Global Quote"]
      let cotacao = moeda.format(quoteData["05. price"])
      let ativo = ativos.get(cotarAtivo)
      console.log(quoteData)
      statusAtivo.innerHTML = `<i class="bi bi-check-square-fill text-success"></i> <button type="button" onclick="cotacao('${cotarAtivo}')">Cotacao</button>`
      cotacaoForm.innerHTML = cotacao
      ativo.cotacao = cotacao
    })
    .catch((err) => {
      console.warn(err)
    })

}


function cotacaoTudo() {


  for (let chave of ativos) {
    let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${chave[0]}.SA&apikey=NM1LJQNXSPI9BQC1`
    let statusAtivo = document.getElementById(`${chave[0]}Status`)
    let cotacaoForm = document.getElementById(`${chave[0]}Cotacao`)
    statusAtivo.innerHTML = `<i class="bi bi-x-square-fill text-danger"></i> <button type="button" onclick="cotacao('${chave[0]}')">Cotacao</button>`
    axios
      .get(url)
      .then((res) => {
        let responsedata = res.data;
        let quoteData = responsedata["Global Quote"]
        let cotacao = moeda.format(quoteData["05. price"])
        let ativo = ativos.get(chave[0])
        console.log(quoteData)
        statusAtivo.innerHTML = `<i class="bi bi-check-square-fill text-success"></i> <button type="button" onclick="cotacao('${chave[0]}')">Cotacao</button>`
        cotacaoForm.innerHTML = cotacao
        ativo.cotacao = cotacao
      })
      .catch((err) => {
        console.warn(err)
      })
  }
}


function formularioLeAtivos() {
  let formularioHtml = `
    <h1>Ler carteira de ativos:</h1>
    <input type="file" id="fileInput" />
    <button onclick="lerArquivoAtivos()">Ler Arquivo</button>
    <br /><br /><br/>`
  let formularios = document.getElementById('formularios')
  formularios.innerHTML = formularioHtml;
  imprimeAtivos();
}


function formularioLeCarteiraTeorica() {
  let formularioHtml = `
    <h1>Ler carteira teorica:</h1>
    <input type="file" id="fileInput" />
    <button onclick="lerCarteiraTeorica()">Ler Arquivo</button>
    <br /><br />
    `
  let formularios = document.getElementById('formularios')
  formularios.innerHTML = formularioHtml;
  imprimeAtivosCarteiraTeorica();
}


function calculaAdesao() {
  for (let [chave, valor] of ativosCarteiraTeorica) {
    if (ativos.has(chave)) {
      let ativotmp = ativos.get(chave)
      let tickerTmp = chave;
      let qtdtmp = ativotmp.qtd;
      let precoMediotmp = ativotmp.precoMedio;
      let cotacaoAtivotmp = ativotmp.cotacaoAtivo;
      let ativoTeoricaTmp = valor.get(chave)
      let participacaoTmp = ativoTeoricaTmp.participacao;
      ativoAdesao = new AtivoAdesao(tickerTmp, qtdtmp, precoMediotmp, cotacaoAtivotmp, participacaoTmp)
      ativosAdesao.set(chave, ativoAdesao);
      console.log(ativoAdesao)
    }
  }


}

function saveAtivosStorage() {
  let objAtivos = Object.fromEntries(ativos);
  let storedAtivos = JSON.stringify(objAtivos);
  localStorage.setItem("ativos",storedAtivos);
}

function saveCarteiraTeoricaStorage() {
  let objTeorica = Object.fromEntries(ativosCarteiraTeorica);
  storedAtivos = JSON.stringify(objTeorica);
  localStorage.setItem("teorica",storedAtivos);
}

function mensagemInicial(){
  let tabelaAtivos = document.getElementById('tabela_ativos')
  let mensagem = `<h1> Carteira de Ativos </h1>
                  <p> Verifica a adesão de carteira de ativos a uma carteira teórica </p>`
  tabelaAtivos.innerHTML = mensagem;
}

