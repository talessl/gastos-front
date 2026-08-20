export class ModalView {
  constructor() {
    this.modal = document.getElementById("modal-confirmacao");
  }

  abrir() {
    this.modal.classList.remove("modal-oculto");
  }

  fechar() {
    this.modal.classList.add("modal-oculto");
  }
}
