import { Transacao, TipoTransacao } from "../models/Transacao.js";
import { TransacaoRepository } from "../repositories/TransacaoRepository.js";
import { CalendarioView } from "../views/CalendarioView.js";
import { TransacaoView } from "../views/TransacaoView.js";
import { ModalView } from "../views/ModalView.js";

export class AppController {
  constructor() {
    this.repositorio = new TransacaoRepository();
    this.calendarioView = new CalendarioView();
    this.transacaoView = new TransacaoView();
    this.modalView = new ModalView();

    this.transacoes = [];

    this.carregarDados();

    document
      .getElementById("form-transacao")
      .addEventListener("submit", (event) => this.adicionar(event));
    document
      .getElementById("btn-ver-todos")
      .addEventListener("click", () => this.mostrarTodas());
    document
      .getElementById("btn-limpar-tudo")
      .addEventListener("click", () => this.abrirModal());
    document
      .getElementById("btn-cancelar")
      .addEventListener("click", () => this.fecharModal());
    document
      .getElementById("btn-confirmar")
      .addEventListener("click", () => this.limparTodas());
  }

  async carregarDados() {
    // 1. Esperamos o repositório ir lá no GraphQL e voltar
    this.transacoes = await this.repositorio.buscarTodas();

    // 2. Só DEPOIS que os dados chegarem, nós desenhamos a tela
    this.mostrarTodas();
    this.calendarioView.desenharCalendario((data) => this.filtrarPorData(data));
  }

  abrirModal() {
    this.modalView.abrir();
  }

  fecharModal() {
    this.modalView.fechar();
  }

  async limparTodas() {
    await this.repositorio.limparTudo();

    await this.carregarDados();

    this.fecharModal();
  }

  mostrarTodas() {
    // Limpa o campo de data para o usuário saber que o filtro foi removido
    document.getElementById("input-data").value = "";

    // Manda a View atualizar usando a lista completa e o saldo total
    this.transacaoView.atualizar(
      this.transacoes,
      this.calcularSaldo(this.transacoes),
    );
  }

  async adicionar(event) {
    event.preventDefault();
    const valor = parseFloat(document.getElementById("input-valor").value);
    const tipo = document.getElementById("input-tipo").value;
    const observacao = document.getElementById("input-observacao").value;
    const data = document.getElementById("input-data").value;

    const novaTransacao = new Transacao(valor, tipo, observacao, data);

    await this.repositorio.salvar(novaTransacao);
    await this.carregarDados();

    document.getElementById("form-transacao").reset();
  }

  calcularSaldo(lista = this.transacoes) {
    let total = 0;

    lista.forEach((transacao) => {
      if (transacao.tipo == TipoTransacao.LUCRO) {
        total += transacao.valor;
      } else {
        total -= transacao.valor;
      }
    });

    return total;
  }

  filtrarPorData(dataSelecionada) {
    // 1. Cria uma nova lista apenas com as transações daquela data
    const listaFiltrada = this.transacoes.filter(
      (t) => t.data === dataSelecionada,
    );

    // 2. Manda a View atualizar usando apenas essa listinha e o saldo dela
    this.transacaoView.atualizar(
      listaFiltrada,
      this.calcularSaldo(listaFiltrada),
    );
  }
}
