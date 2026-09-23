// arquivo: js/repositories/AcaoRepository.js

export class AcaoRepository {
  constructor(baseUrl = "http://localhost:4000/graphql") {
    this.baseUrl = baseUrl;
  }

  async buscarOportunidades(precoMaximo = 10.0) {
    const query = `
            query BuscarOportunidades {
                buscarOportunidades(precoMaximo: ${precoMaximo}) {
                    ativo
                    preco
                    status
                    indicadores { rsi estocastico }
                }
            }
        `;

    const resposta = await fetch(this.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const resultado = await resposta.json();
    if (resultado.errors) {
      throw new Error(resultado.errors[0].message);
    }

    return resultado.data.buscarOportunidades;
  }
  async buscarAcaoEspecifica(ticker) {
    const query = `
      query BuscarAcao($ticker: String!) {
        buscarAcao(ticker: $ticker) {
          ticker
          precoAtual
          close
          datas
        }
      }
    `;

    try {
      const resposta = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
          variables: { ticker: ticker },
        }),
      });

      const json = await resposta.json();

      if (json.errors) {
        throw new Error(json.errors[0].message);
      }

      return json.data.buscarAcao;
    } catch (erro) {
      console.error("Erro na requisição GraphQL:", erro);
      throw erro; // Repassa o erro para o AppController tratar e mostrar na tela
    }
  }
}
