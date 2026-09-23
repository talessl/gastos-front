// arquivo: js/views/AcoesView.js

export class AcoesView {
  constructor(aoSelecionarTicker) {
    this.listaAcoes = document.getElementById("lista-acoes");
    this.painelGrafico = document.getElementById("painel-grafico");
    this.grafico = null;

    this.listaAcoes.addEventListener("click", (e) => {
      const item = e.target.closest("li[data-ticker]");
      if (!item) return;
      aoSelecionarTicker(item.dataset.ticker);
    });
  }

  mostrarLoadingGrafico() {
    if (this.grafico) {
      this.grafico.destroy();
      this.grafico = null;
    }
    this.painelGrafico.innerHTML = `
    <div style="text-align: center; padding: 20px;">
      <div class="spinner"></div>
      <p style="margin-top: 10px; color: #555;">Carregando gráfico...</p>
    </div>
  `;
  }

  mostrarErroGrafico(mensagem) {
    this.painelGrafico.innerHTML = `<p style="color: #ef4444;">${mensagem}</p>`;
  }

  mostrarLoading() {
    this.listaAcoes.innerHTML = `
      <li style="list-style: none; text-align: center; padding: 20px;">
        <div class="spinner"></div>
        <p style="margin-top: 10px; color: #555;">
          Garimpando ações promissoras abaixo do preço... 
          <br><small>Buscando no Brapi e analisando gráficos no Yahoo Finance</small>
        </p>
      </li>
    `;
  }

  mostrarErro() {
    this.listaAcoes.innerHTML =
      "<li>Erro ao carregar oportunidades. Verifique a conexão com a API.</li>";
  }

  mostrarResultadoUnico(acao) {
    const variacaoPositiva = acao.close[acao.close.length - 1] >= acao.close[0];
    const cor = variacaoPositiva ? "#10b981" : "#ef4444";

    this.painelGrafico.innerHTML = `
    <div style="border-left: 4px solid ${cor}; padding-left: 12px;">
      <strong>${acao.ticker}</strong> - R$ ${acao.precoAtual.toFixed(2)} <br>
      <small>Cotação atualizada (Yahoo Finance)</small>
      <div style="position: relative; height: 300px; margin-top: 12px;">
        <canvas id="grafico-acao"></canvas>
      </div>
    </div>
  `;

    if (this.grafico) this.grafico.destroy();

    this.grafico = new Chart(document.getElementById("grafico-acao"), {
      type: "line",
      data: {
        labels: acao.datas,
        datasets: [
          {
            label: `${acao.ticker} - Fechamento (R$)`,
            data: acao.close,
            borderColor: cor,
            backgroundColor: cor + "22",
            fill: true,
            tension: 0.3,
            pointRadius: 0,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        scales: {
          x: { ticks: { maxTicksLimit: 8 } },
          y: { ticks: { callback: (v) => `R$ ${v.toFixed(2)}` } },
        },
      },
    });
  }

  atualizar(oportunidades) {
    this.listaAcoes.innerHTML = ""; // Limpa a lista

    if (oportunidades.length === 0) {
      this.listaAcoes.innerHTML =
        "<li>Nenhuma oportunidade encontrada hoje abaixo deste preço.</li>";
      return;
    }

    oportunidades.forEach((op) => {
      const li = document.createElement("li");
      li.dataset.ticker = op.ativo;
      li.style.cursor = "pointer";
      li.innerHTML = `
    <strong>${op.ativo}</strong> - ${op.preco} <br>
    <small>Status: ${op.status} | RSI: ${op.indicadores.rsi} | Estocástico: ${op.indicadores.estocastico}</small>
  `;
      this.listaAcoes.appendChild(li);
    });
  }
}
