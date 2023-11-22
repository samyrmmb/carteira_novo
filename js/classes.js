class Ativo {
    constructor(ticker, qtd, precoMedio, cotacao) {
        this.ticker = ticker;
        this.qtd = qtd;
        this.precoMedio = precoMedio;
        this.cotacao = cotacao;
    }
};

class AtivoCarteiraTeorica {
    constructor(ticker, participacao) {
        this.ticker = ticker;
        this.participacao = participacao;
    }
};

class AtivoAdesao{
    constructor(ticker, qtd, precoMedio, cotacaoAtivo, participacao){
        this.ticker = ticker;
        this.qtd = qtd;
        this.precoMedio = precoMedio;
        this.cotacaoAtivo = cotacaoAtivo;
        this.participacao = participacao;        
    }

    qtdtorica(){
        return this.cotacaoAtivo*this.participacao;
    }
}

