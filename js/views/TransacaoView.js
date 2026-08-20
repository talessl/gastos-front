export class TransacaoView {
  constructor() {
    this.painel = document.getElementById("painel-transacoes");
  }

  atualizar(lista, saldo) {
    let html = `<h2>Minhas Transações</h2>`;

    lista.forEach((transacao) => {
      const classeCss = transacao.tipo === "LUCRO" ? "cor-lucro" : "cor-gasto";
      html += `<p> 
        ${transacao.observacao} - 
        <span class="${classeCss}">R$ ${transacao.valor} (${transacao.tipo})</span> - ${new Date(transacao.data).toLocaleDateString("pt-BR")}
      </p>`;
    });

    const classeSaldo = saldo >= 0 ? "cor-lucro" : "cor-gasto";
    html += `<h3>Saldo Final: <span class="${classeSaldo}">R$ ${saldo}</span></h3>`;

    this.painel.innerHTML = html;
  }
}
