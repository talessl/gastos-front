export class CalendarioView {
  constructor() {
    this.divCalendario = document.getElementById("calendario");
  }

  // Agora recebe ano/mês como parâmetros -- não decide nada sozinha,
  // só desenha o que o Controller mandar.
  desenharCalendario(ano, mes, aoClicarNoDia, aoMudarMes) {
    const diasNoMes = new Date(ano, mes, 0).getDate();
    const mesFormatado = String(mes).padStart(2, "0");

    const nomesDiasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const nomesMeses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    let html = `
      <div class="calendario-cabecalho">
        <button id="btn-mes-anterior" class="btn-navegar-mes">‹</button>
        <span class="calendario-titulo">${nomesMeses[mes - 1]} de ${ano}</span>
        <button id="btn-mes-proximo" class="btn-navegar-mes">›</button>
      </div>
      <div class="calendario-dias">
    `;

    for (let i = 1; i <= diasNoMes; i++) {
      const diaSemanaIndex = new Date(ano, mes - 1, i).getDay();
      const nomeDiaSemana = nomesDiasSemana[diaSemanaIndex];
      const ehFimDeSemana = diaSemanaIndex === 0 || diaSemanaIndex === 6;
      const classeExtra = ehFimDeSemana ? "dia-fim-de-semana" : "";

      html += `
        <button class="${classeExtra}">
          <span class="dia-numero">${i}</span>
          <span class="dia-semana">${nomeDiaSemana}</span>
        </button>
      `;
    }

    html += `</div>`;

    this.divCalendario.innerHTML = html;

    const botoes = this.divCalendario.querySelectorAll(
      ".calendario-dias button",
    );
    botoes.forEach((botao, index) => {
      botao.addEventListener("click", () => {
        const diaNumero = index + 1;
        const diaFormatado = String(diaNumero).padStart(2, "0");
        const dataFormatada = `${ano}-${mesFormatado}-${diaFormatado}`;

        document.getElementById("input-data").value = dataFormatada;
        aoClicarNoDia(dataFormatada);
      });
    });

    // A View só AVISA que o botão foi clicado -- quem decide o que
    // fazer com isso (qual o novo mês/ano) é o Controller.
    document
      .getElementById("btn-mes-anterior")
      .addEventListener("click", () => aoMudarMes(-1));

    document
      .getElementById("btn-mes-proximo")
      .addEventListener("click", () => aoMudarMes(1));
  }
}
