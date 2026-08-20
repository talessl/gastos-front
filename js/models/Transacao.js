export const TipoTransacao = {
  LUCRO: "LUCRO",
  GASTO: "GASTO",
};

export class Transacao {
  constructor(valor, tipo, observacao, data) {
    this.valor = valor;
    this.tipo = tipo;
    this.observacao = observacao;
    this.data = data;
  }
}
