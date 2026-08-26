// arquivo: js/views/AcoesView.js

export class AcoesView {
  constructor() {
    this.listaAcoes = document.getElementById("lista-acoes");
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

  atualizar(oportunidades) {
    this.listaAcoes.innerHTML = ""; // Limpa a lista

    if (oportunidades.length === 0) {
      this.listaAcoes.innerHTML =
        "<li>Nenhuma oportunidade encontrada hoje abaixo deste preço.</li>";
      return;
    }

    oportunidades.forEach((op) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${op.ativo}</strong> - ${op.preco} <br>
        <small>Status: ${op.status} | RSI: ${op.indicadores.rsi} | Estocástico: ${op.indicadores.estocastico}</small>
      `;
      this.listaAcoes.appendChild(li);
    });
  }
}
