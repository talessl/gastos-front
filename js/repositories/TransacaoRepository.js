export class TransacaoRepository {
  constructor() {
    this.url = "http://localhost:4000/graphql";
  }

  // _getHeaders() {
  //   const token = localStorage.getItem("token");
  //   return {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   };
  // }

  async _executar(query, variables = {}) {
    const resposta = await fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });

    const resultado = await resposta.json();
    if (resultado.errors) {
      throw new Error(resultado.errors[0].message);
    }

    return resultado.data;
  }

  async removerTransacao(id) {
    const query = `
    mutation DeletarTransacao($id: Int!) {
      removerTransacao(id: $id)
    }
  `;

    const data = await this._executar(query, { id: id });

    return data.removerTransacao;
  }

  async buscarTodas() {
    const minhaQuery = `
      query {
        buscarTransacoes {
          id
          valor
          tipo
          observacao
          data
        }
      }
    `;

    const data = await this._executar(minhaQuery);
    return data.buscarTransacoes;
  }

  async atualizarTransacao(id, dados) {
    const minhaMutation = `
      mutation AtualizarTransacao($id: Int!, $valor: Float!, $tipo: String!, $observacao: String!, $data: String!) {
        atualizarTransacao(
          id: $id,
          valor: $valor,
          tipo: $tipo,
          observacao: $observacao,
          data: $data
        ) {
          id
          valor
          tipo
          observacao
          data
        }
      }
    `;

    const data = await this._executar(minhaMutation, {
      id: id,
      valor: dados.valor,
      tipo: dados.tipo,
      observacao: dados.observacao,
      data: dados.data,
    });

    return data.atualizarTransacao;
  }

  async salvar(transacao) {
    const minhaMutation = `
      mutation AdicionarTransacao($valor: Float!, $tipo: String!, $observacao: String!, $data: String!) {
        adicionarTransacao(
          valor: $valor,
          tipo: $tipo,
          observacao: $observacao,
          data: $data
        ) {
          id
          valor
          tipo
          observacao
          data
        }
      }
    `;

    const data = await this._executar(minhaMutation, {
      valor: transacao.valor,
      tipo: transacao.tipo,
      observacao: transacao.observacao,
      data: transacao.data,
    });

    return data.adicionarTransacao;
  }

  async limparTudo() {
    const minhaMutation = `
      mutation {
        limparTodasTransacoes
      }
    `;

    const data = await this._executar(minhaMutation);
    return data.limparTransacoes;
  }
}
