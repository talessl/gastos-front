export class CalendarioView {
  constructor() {
    this.divCalendario = document.getElementById("calendario");
  }

  desenharCalendario(aoClicarNoDia) {
    let html = ``;

    for (let i = 1; i <= 31; i++) {
      // Para cada volta, adicione um botão com o número do dia no HTML
      html += `<button>Dia ${i}</button> `;
    }
    this.divCalendario.innerHTML = html;
    const botoes = this.divCalendario.querySelectorAll("button");
    botoes.forEach((botao, index) => {
      botao.addEventListener("click", () => {
        const diaNumero = index + 1;

        const diaFormatado = String(diaNumero).padStart(2, "0");

        const dataFormatada = `2026-08-${diaFormatado}`;

        document.getElementById("input-data").value = dataFormatada;
        aoClicarNoDia(dataFormatada);
      });
    });
  }
}
