export class TransacaoFormView {
  constructor(aoSubmeter) {
    this.modal = document.getElementById("modal-transacao");
    this.form = document.getElementById("form-transacao");
    this.titulo = document.getElementById("titulo-modal-transacao");
    this.inputId = document.getElementById("input-transacao-id");
    this.inputValor = document.getElementById("input-valor");
    this.inputTipo = document.getElementById("input-tipo");
    this.inputObservacao = document.getElementById("input-observacao");
    this.inputData = document.getElementById("input-data");

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const dados = {
        valor: parseFloat(this.inputValor.value),
        tipo: this.inputTipo.value,
        observacao: this.inputObservacao.value,
        data: this.inputData.value,
      };
      const idEmEdicao = this.inputId.value ? Number(this.inputId.value) : null;
      aoSubmeter(dados, idEmEdicao);
    });

    document
      .getElementById("btn-cancelar-transacao")
      .addEventListener("click", () => this.fechar());
  }

  abrirParaCriar() {
    const dataSelecionada = this.inputData.value;

    this.form.reset();
    this.inputId.value = "";
    this.titulo.textContent = "Nova transação";

    if (dataSelecionada) {
      this.inputData.value = dataSelecionada;
    }

    this.modal.classList.remove("modal-oculto");
  }

  abrirParaEditar(transacao) {
    this.inputId.value = transacao.id;
    this.inputValor.value = transacao.valor;
    this.inputTipo.value = transacao.tipo;
    this.inputObservacao.value = transacao.observacao;
    this.inputData.value = transacao.data;
    this.titulo.textContent = "Editar transação";
    this.modal.classList.remove("modal-oculto");
  }

  fechar() {
    this.modal.classList.add("modal-oculto");
  }
}
