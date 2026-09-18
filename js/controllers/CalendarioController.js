import { CalendarioView } from "../views/CalendarioView.js";

export class CalendarioController {
  // aoSelecionarDia: chamado quando o usuário clica num dia (recebe a data "YYYY-MM-DD")
  // aoTrocarMes: chamado sempre que o mês visível muda (navegação anterior/próximo)
  constructor(aoSelecionarDia, aoTrocarMes) {
    this.view = new CalendarioView();
    this.aoSelecionarDia = aoSelecionarDia;
    this.aoTrocarMes = aoTrocarMes;

    this.datasDestacadas = [];

    const hoje = new Date();
    this.anoVisivel = hoje.getFullYear();
    this.mesVisivel = hoje.getMonth() + 1; // 1-12

    this.desenhar();
  }

  atualizarDiasComTransacao(datas) {
    this.datasDestacadas = datas;
    this.desenhar();
  }

  desenhar() {
    this.view.desenharCalendario(
      this.anoVisivel,
      this.mesVisivel,
      this.datasDestacadas,
      (data) => this.aoSelecionarDia(data),
      (delta) => this.mudarMes(delta),
    );
  }

  mudarMes(delta) {
    this.mesVisivel += delta;

    if (this.mesVisivel < 1) {
      this.mesVisivel = 12;
      this.anoVisivel -= 1;
    } else if (this.mesVisivel > 12) {
      this.mesVisivel = 1;
      this.anoVisivel += 1;
    }

    this.desenhar();

    // Avisa quem estiver ouvindo (ex: AppController) que o mês mudou,
    // caso precise recarregar/filtrar dados pro novo mês.
    if (this.aoTrocarMes) {
      this.aoTrocarMes(this.anoVisivel, this.mesVisivel);
    }
  }
}
