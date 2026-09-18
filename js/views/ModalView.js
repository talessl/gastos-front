export class ModalView {
  constructor(idModal) {
    this.modal = document.getElementById(idModal);
  }

  abrir() {
    this.modal.classList.remove("modal-oculto");
  }

  fechar() {
    this.modal.classList.add("modal-oculto");
  }
}
