export class TransacaoRepository {
  constructor() {
    this.url = "http://localhost:4000/graphql";
  }

  async buscarTodas() {
    const minhaQuery = `
      query {
        buscarTransacoes {
          valor
          tipo
          observacao
          data
        }
      }
    `;

    // O 'await' espera o servidor responder
    const resposta = await fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: minhaQuery }),
    });

    const resultado = await resposta.json();
    return resultado.data.buscarTransacoes; // Devolve o array que veio da API
  }

  async salvar(transacao) {
    const minhaMutation = `
      mutation {
        adicionarTransacao(
          valor: ${transacao.valor}, 
          tipo: "${transacao.tipo}", 
          observacao: "${transacao.observacao}", 
          data: "${transacao.data}"
        ) {
          valor
        }
      }
    `;

    await fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: minhaMutation }),
    });
  }

  async limparTudo() {
    const minhaMutation = `
      mutation {
        limparTransacoes
      }
    `;

    await fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: minhaMutation }),
    });
  }
}
