// arquivo: js/repositories/AuthRepository.js

export class AuthRepository {
  constructor(baseUrl = "http://localhost:4001/graphql") {
    this.baseUrl = baseUrl;
  }

  async _executar(query, variables = {}) {
    const resposta = await fetch(this.baseUrl, {
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

  async login(email, senha) {
    const minhaMutation = `
      mutation Login($email: String!, $senha: String!) {
        login(email: $email, senha: $senha) {
          accessToken
          tokenType
        }
      }
    `;

    const data = await this._executar(minhaMutation, { email, senha });

    localStorage.setItem("token", data.login.accessToken);

    return data.login;
  }

  async registrar(email, senha) {
    const minhaMutation = `
      mutation Registrar($email: String!, $senha: String!) {
        registrar(email: $email, senha: $senha) {
          id
          email
        }
      }
    `;

    const data = await this._executar(minhaMutation, { email, senha });
    return data.registrar;
  }

  logout() {
    localStorage.removeItem("token");
  }

  estaAutenticado() {
    return !!localStorage.getItem("token");
  }
}
