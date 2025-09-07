import { Utils } from "./utils.js";
import { DesafioFloresta } from "./floresta.js";
import { DesafioMontanhas } from "./montanhas.js";
import { DesafioCavernas } from "./cavernas.js";
import { DesafioDeserto } from "./deserto.js";
import { DesafioCastelo } from "./castelo.js";

export class Jogo {
  constructor() {
    this.desafios = [
      new DesafioFloresta(),
      new DesafioMontanhas(),
      new DesafioCavernas(),
      new DesafioDeserto(),
      new DesafioCastelo(),
    ];
  }

  // Torna a função assíncrona para aguardar printSlow
  async introducao() {
    console.log("🌍 Bem-vindo ao Reino de Numéria! 🌍");
    await Utils.printSlow(
      "O equilíbrio do reino foi destruído quando Zathor roubou os cinco Cristais do Equilíbrio..."
    );
    await Utils.printSlow(
      "Agora, apenas um herói corajoso pode enfrentar os desafios e restaurar a harmonia."
    );
    console.log(
      "\n💎 Sua missão: Recupere os cinco cristais e salve Numéria! 💎\n"
    );
  }

  // Torna jogar assíncrona para aguardar introducao
  async jogar() {
    await this.introducao();
    for (let desafio of this.desafios) {
      while (!(await desafio.resolver())) {
        // <-- CORREÇÃO: adicione await aqui!
        console.log("\nTente novamente!");
      }
      console.log("\n--------------------------------------------------\n");
    }

    console.log("✨ Fim da jornada! Você restaurou a luz em Numéria! ✨");
  }
}
