import { Transacao, TipoTransacao } from "../models/Transacao.js";
import { TransacaoRepository } from "../repositories/TransacaoRepository.js";
import { AcaoRepository } from "../repositories/AcaoRepository.js";
import { TransacaoView } from "../views/TransacaoView.js";
import { ModalView } from "../views/ModalView.js";
import { AcoesView } from "../views/AcoesView.js";
import { AuthController } from "./AuthController.js";
import { TransacaoFormView } from "../views/TransacaoFormView.js";

import { CalendarioController } from "./CalendarioController.js";

export class AppController {
  constructor() {
    this.repositorio = new TransacaoRepository();
    this.acaoRepositorio = new AcaoRepository();
    this.transacaoView = new TransacaoView();
    this.modalConfirmacao = new ModalView("modal-confirmacao");
    this.transacaoFormView = new TransacaoFormView((dados, idEmEdicao) =>
      this.salvarFormulario(dados, idEmEdicao),
    );
    this.acoesView = new AcoesView((ticker) =>
      this.buscarAtivoEspecifico(ticker),
    );
    this.transacoes = [];

    this.calendarioController = new CalendarioController(
      (data) => this.filtrarPorData(data),
      (ano, mes) => this.aoTrocarMesDoCalendario(ano, mes),
    );

    document
      .getElementById("btn-nova-transacao")
      .addEventListener("click", () => this.transacaoFormView.abrirParaCriar());
    document
      .getElementById("btn-buscar-ticker")
      .addEventListener("click", () => this.buscarAtivoEspecifico());

    // AuthController avisa o AppController quando o login acontece
    // this.authController = new AuthController(() => this.carregarDados());
    // this.authController.verificarAutenticacao();

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
        if (event.target.classList.contains("btn-atualizar")) {
          const id = event.target.getAttribute("data-id");
          this.atualizarTransacao(Number(id));
        }
      });

    this.carregarDados();
  }

  abrirModal() {
    this.modalConfirmacao.abrir();
  }

  fecharModal() {
    this.modalConfirmacao.fechar();
  }

  async salvarFormulario(dados, idEmEdicao) {
    try {
      if (idEmEdicao) {
        await this.repositorio.atualizarTransacao(idEmEdicao, dados);
      } else {
        const novaTransacao = new Transacao(
          dados.valor,
          dados.tipo,
          dados.observacao,
          dados.data,
        );
        await this.repositorio.salvar(novaTransacao);
      }
      await this.carregarDados();
      this.transacaoFormView.fechar();
    } catch (erro) {
      console.error("Erro ao salvar transação:", erro);
      alert(`Falha ao salvar: ${erro.message}`);
    }
  }

  atualizarTransacao(id) {
    const transacao = this.transacoes.find((t) => String(t.id) === String(id));
    if (!transacao) {
      console.warn(`Transação ${id} não encontrada para edição.`);
      return;
    }

    this.transacaoFormView.abrirParaEditar(transacao);
  }

  async carregarDados() {
    this.transacoes = await this.repositorio.buscarTodas();
    this.mostrarTodas();
    this.atualizarSaldoTotal();

    const datasComTransacao = this.transacoes.map((t) =>
      String(t.data).substring(0, 10),
    );
    const datasUnicas = [...new Set(datasComTransacao)];

    this.calendarioController.atualizarDiasComTransacao(datasUnicas);
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

  async buscarAtivoEspecifico(tickerClicado) {
    const input = document.getElementById("input-ticker");
    const ticker = (tickerClicado ?? input.value).trim().toUpperCase();

    if (!ticker) {
      alert("Por favor, digite o código de uma ação (ex: PETR4).");
      return;
    }

    input.value = ticker; // mostra qual ação está no gráfico
    this.acoesView.mostrarLoadingGrafico();

    try {
      const acao = await this.acaoRepositorio.buscarAcaoEspecifica(ticker);
      this.acoesView.mostrarResultadoUnico(acao);
    } catch (erro) {
      console.error("Erro ao buscar ação:", erro);
      this.acoesView.mostrarErroGrafico(erro.message);
    }
  }
}
