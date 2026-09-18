export class CalendarioView {
  constructor() {
    this.divCalendario = document.getElementById("calendario");
  }

  // Agora recebe ano/mês como parâmetros -- não decide nada sozinha,
  // só desenha o que o Controller mandar.
  desenharCalendario(
    ano,
    mes,
    datasComTransacao = [],
    aoClicarNoDia,
    aoMudarMes,
  ) {
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

      // Monta a data no formato exato YYYY-MM-DD para checar no array
      const diaFormatado = String(i).padStart(2, "0");
      const dataFormatada = `${ano}-${mesFormatado}-${diaFormatado}`;

      // Verifica se o dia atual do loop está dentro da lista de transações
      const temTransacao = datasComTransacao.includes(dataFormatada);

      // Aplica as classes dinamicamente
      const classeFimSemana = ehFimDeSemana ? "dia-fim-de-semana" : "";
      const classeTransacao = temTransacao ? "dia-com-transacao" : "";

      html += `
        <button class="${classeFimSemana} ${classeTransacao}">
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
        // EFEITO 2: Remove a classe azul de todos os botões e aplica só no clicado
        botoes.forEach((b) => b.classList.remove("dia-selecionado"));
        botao.classList.add("dia-selecionado");

        const diaNumero = index + 1;
        const diaFormatado = String(diaNumero).padStart(2, "0");
        const dataFormatada = `${ano}-${mesFormatado}-${diaFormatado}`;

        document.getElementById("input-data").value = dataFormatada;
        aoClicarNoDia(dataFormatada);
      });
    });

    document
      .getElementById("btn-mes-anterior")
      .addEventListener("click", () => aoMudarMes(-1));
    document
      .getElementById("btn-mes-proximo")
      .addEventListener("click", () => aoMudarMes(1));
  }
}
