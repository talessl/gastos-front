export class CalendarioView {
  constructor() {
    this.divCalendario = document.getElementById("calendario");
  }

  desenharCalendario(aoClicarNoDia) {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth() + 1; // getMonth() retorna 0-11, por isso o +1

    // Descobre quantos dias tem o mês atual
    const diasNoMes = new Date(ano, mes, 0).getDate();

    const mesFormatado = String(mes).padStart(2, "0");

    let html = ``;

    for (let i = 1; i <= diasNoMes; i++) {
      html += `<button>Dia ${i}</button> `;
    }
    this.divCalendario.innerHTML = html;

    const botoes = this.divCalendario.querySelectorAll("button");
    botoes.forEach((botao, index) => {
      botao.addEventListener("click", () => {
        const diaNumero = index + 1;
        const diaFormatado = String(diaNumero).padStart(2, "0");

        const dataFormatada = `${ano}-${mesFormatado}-${diaFormatado}`;

        document.getElementById("input-data").value = dataFormatada;
        aoClicarNoDia(dataFormatada);
      });
    });
  }
}
