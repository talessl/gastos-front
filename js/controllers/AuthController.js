// controllers/AuthController.js
import { AuthRepository } from "../repositories/AuthRepository.js";
import { LoginView } from "../views/LoginView.js";

export class AuthController {
  constructor(aoAutenticar) {
    this.authRepositorio = new AuthRepository();
    this.loginView = new LoginView();
    this.aoAutenticar = aoAutenticar; // callback chamado quando login der certo

    this.loginView.renderizar();

    document
      .getElementById("btn-login")
      .addEventListener("click", () => this.fazerLogin());
    document
      .getElementById("btn-registrar")
      .addEventListener("click", () => this.registrarUsuario());
    document
      .getElementById("btn-sair")
      ?.addEventListener("click", () => this.sair());
  }

  estaAutenticado() {
    return this.authRepositorio.estaAutenticado();
  }

  verificarAutenticacao() {
    if (this.estaAutenticado()) {
      this.loginView.mostrarTelaApp();
      this.aoAutenticar();
    } else {
      this.loginView.mostrarTelaLogin();
    }
  }

  async fazerLogin() {
    const { email, senha } = this.loginView.obterDadosFormulario();
    if (!email || !senha)
      return this.loginView.mostrarErro("Preencha todos os campos.");

    try {
      await this.authRepositorio.login(email, senha);
      this.loginView.esconderErro();
      this.verificarAutenticacao();
    } catch (erro) {
      this.loginView.mostrarErro(erro.message);
    }
  }

  async registrarUsuario() {
    const { email, senha } = this.loginView.obterDadosFormulario();
    if (!email || !senha)
      return this.loginView.mostrarErro("Preencha todos os campos.");

    try {
      await this.authRepositorio.registrar(email, senha);
      await this.fazerLogin();
    } catch (erro) {
      this.loginView.mostrarErro(erro.message);
    }
  }

  sair() {
    this.authRepositorio.logout();
    this.verificarAutenticacao();
  }
}
