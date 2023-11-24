function downloadLocalStorage() {
    const conteudoLocalStorage = JSON.stringify(localStorage);

    const blob = new Blob([conteudoLocalStorage], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'CarteiraDeAtivosBackup.json';
    document.body.appendChild(a);
    console.log(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function formLeBackup(){
    let formularioHtml = `
    <h1>Ler backup da carteira de ativos:</h1>
    <input type="file" id="fileInput" />
    <button onclick="lerArquivoBackup()">Ler Arquivo</button>
    <br /><br /><br/>`
  let formularios = document.getElementById('formularios')
  formularios.innerHTML = formularioHtml;
}

function lerArquivoBackup() {
    const input = document.getElementById('fileInput');

    if (!input.files || input.files.length === 0) {
        console.error('Nenhum arquivo selecionado.');
        return;
    }

    const arquivo = input.files[0];
    const leitor = new FileReader();

    leitor.onload = function (evento) {
        const conteudoArquivo = evento.target.result;

        // Agora você pode manipular o conteúdo do arquivo, por exemplo, enviar para o localStorage
        try {
            const dados = JSON.parse(conteudoArquivo);
            for (let chave in dados) {
                if (dados.hasOwnProperty(chave)) {
                    localStorage.setItem(chave, dados[chave]);
                }
            }

            console.log('Dados do arquivo lido e armazenado no localStorage.');
            initialState();
            mensagem("Leitura de arquivo concluida");
        } catch (erro) {
            console.error('Erro ao processar o conteúdo do arquivo:', erro);
        }
    };

    leitor.readAsText(arquivo);



 //   location.reload();

}