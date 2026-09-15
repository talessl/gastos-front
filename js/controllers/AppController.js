import { Transacao, TipoTransacao } from "../models/Transacao.js";
import { TransacaoRepository } from "../repositories/TransacaoRepository.js";
import { AcaoRepository } from "../repositories/AcaoRepository.js";
import { TransacaoView } from "../views/TransacaoView.js";
import { ModalView } from "../views/ModalView.js";
import { AcoesView } from "../views/AcoesView.js";
import { AuthController } from "./AuthController.js";
import { CalendarioController } from "./CalendarioController.js";

export class AppController {
  constructor() {
    this.repositorio = new TransacaoRepository();
    this.acaoRepositorio = new AcaoRepository();
    this.transacaoView = new TransacaoView();
    this.modalView = new ModalView();
    this.acoesView = new AcoesView();

    this.transacoes = [];

    this.calendarioController = new CalendarioController(
      (data) => this.filtrarPorData(data),
      (ano, mes) => this.aoTrocarMesDoCalendario(ano, mes),
    );

    // AuthController avisa o AppController quando o login acontece
    // this.authController = new AuthController(() => this.carregarDados());
    // this.authController.verificarAutenticacao();

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
    document
      .getElementById("btn-buscar-acoes")
      .addEventListener("click", () => this.buscarOportunidadesDeAcoes());

    document
      .getElementById("painel-transacoes")
      .addEventListener("click", (event) => {
        if (event.target.classList.contains("btn-excluir")) {
          const id = event.target.getAttribute("data-id");
          this.remover(Number(id));
        }
      });

    this.carregarDados();
  }

  abrirModal() {
    this.modalView.abrir();
  }

  fecharModal() {
    this.modalView.fechar();
  }

  async carregarDados() {
    this.transacoes = await this.repositorio.buscarTodas();
    this.mostrarTodas();
    this.atualizarSaldoTotal();
  }

  aoTrocarMesDoCalendario(ano, mes) {
    // Exemplo futuro: this.repositorio.buscarPorMes(ano, mes)
  }

  atualizarSaldoTotal() {
    const saldo = this.calcularSaldo(this.transacoes);
    const elemento = document.getElementById("valor-saldo");
    if (elemento) {
      elemento.textContent = saldo.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
  }

  async limparTodas() {
    await this.repositorio.limparTudo();
    await this.carregarDados();
    this.fecharModal();
  }

  mostrarTodas() {
    document.getElementById("input-data").value = "";
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

  async remover(id) {
    if (!confirm("Tem certeza que deseja apagar este gasto?")) {
      return;
    }

    try {
      await this.repositorio.removerTransacao(id);

      await this.carregarDados();
    } catch (erro) {
      console.error("Erro ao excluir transação:", erro);
      alert(`Falha ao excluir: ${erro.message}`);
    }
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
    const listaFiltrada = this.transacoes.filter(
      (t) => t.data === dataSelecionada,
    );
    this.transacaoView.atualizar(
      listaFiltrada,
      this.calcularSaldo(listaFiltrada),
    );
  }

  async buscarOportunidadesDeAcoes() {
    this.acoesView.mostrarLoading();
    try {
      const precoMaximo = 10.0;
      const oportunidades =
        await this.acaoRepositorio.buscarOportunidades(precoMaximo);
      this.acoesView.atualizar(oportunidades);
    } catch (erro) {
      console.error("Erro no fluxo de ações:", erro);
      this.acoesView.mostrarErro();
    }
  }
}
