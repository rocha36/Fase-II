import promptSync from "prompt-sync";
import { Utils } from "./utils.js";

const prompt = promptSync({ sigint: true });

/**
 * Classe responsável pelo Desafio 4: Deserto da Estratégia.
 * O jogador deve usar estratégia para administrar recursos,
 * escolher rotas e responder uma questão de conhecimento.
 */
export class DesafioDeserto {
  constructor() {
    // Controle do uso de recursos
    this.mapaUsado = false;
    this.cantilUsado = false;
  }

  /**
   * Exibe opções formatadas como menu.
   * @param {string[]} opcoes - Lista de opções a serem exibidas
   */
  exibirMenu(opcoes) {
    console.log("\nEscolha uma opção:");
    opcoes.forEach((opcao, index) => {
      console.log(`${index + 1} - ${opcao}`);
    });
  }

  /**
   * Inicia a execução do desafio.
   * O jogador pode usar recursos, escolher rotas e enfrentar perguntas.
   */
  async resolver() {
    // <-- Torna assíncrono
    // Introdução narrativa
    console.log("🏜️ DESAFIO 4: Deserto da Estratégia 🏜️");
    await Utils.printSlow(
      "O vento quente sopra entre as dunas e o sol castiga sem piedade."
    );
    await Utils.printSlow(
      "O Deserto da Estratégia não testa apenas sua resistência física,"
    );
    await Utils.printSlow(
      "mas também sua capacidade de planejar, decidir e pensar rápido."
    );
    await Utils.printSlow("Cada escolha errada pode ser o fim da sua jornada.");

    console.log("\n🎯 Objetivo da fase:");
    console.log("Cruzar o deserto e conquistar o Cristal da Estratégia,");
    console.log(
      "tomando decisões certas e provando sua sabedoria em uma questão de conhecimento."
    );

    // --- Etapa 1: Uso inicial de recursos ---
    console.log("\nEscolha uma opção:");
    console.log("1 - Usar o Mapa Antigo para tentar achar a saída.");
    console.log("2 - Usar o Cantil da Resistência para recuperar forças.");
    console.log("3 - Desistir.");

    const escolhaRecurso = prompt("👉 O que você deseja fazer? ").trim();

    if (escolhaRecurso === "1") {
      // Uso do Mapa Antigo
      if (!this.mapaUsado) {
        console.log("\n📜 Você usa o Mapa Antigo:");
        console.log(
          "'As escolhas apressadas podem parecer atalhos, mas levam apenas a círculos sem fim.'"
        );
        await Utils.printSlow(
          "Mesmo com o mapa, você descobre que as dunas mudam constantemente e não há saída."
        );
        this.mapaUsado = true;
      } else {
        console.log(
          "\n📜 Você já usou o Mapa Antigo. Ele não mostra nada novo."
        );
      }
    } else if (escolhaRecurso === "2") {
      // Uso do Cantil
      if (!this.cantilUsado) {
        console.log(
          "\n💧 Você usa o Cantil da Resistência e recupera suas forças."
        );
        this.cantilUsado = true;
      } else {
        console.log("\n💧 O cantil está vazio. Não resta mais água.");
      }
    } else if (escolhaRecurso === "3") {
      // Saída do jogo
      console.log("💀 Você desistiu da jornada...");
      process.exit(0);
    } else {
      console.log("❌ Opção inválida.");
      return await this.resolver(); // Reinicia a etapa
    }

    // --- Etapa 2: Caminhada no deserto ---
    await Utils.printSlow("\nVocê anda horas, mas as miragens o enganam.");
    await Utils.printSlow("Quanto mais avança, mais se perde.");
    await Utils.printSlow("Seu corpo começa a fraquejar…");

    let tentarNovamente = true;

    // --- Loop principal de decisão de rotas ---
    while (tentarNovamente) {
      console.log("\n🔥 Você chega a um ponto de decisão:");
      this.exibirMenu([
        "Seguir pela Rota das Dunas (rápida, mas repleta de miragens perigosas)",
        "Seguir pela Rota das Rochas (mais longa, mas segura)",
        "Desistir",
      ]);

      const escolhaRota = prompt("👉 Qual caminho seguir? ").trim();

      // --- Opção 1: Rota das Dunas ---
      if (escolhaRota === "1") {
        console.log("\nVocê escolheu a Rota das Dunas.");

        // Reapresenta opções de recursos
        console.log("\nEscolha uma opção:");
        console.log("1 - Usar o Mapa Antigo para tentar achar a saída.");
        console.log("2 - Usar o Cantil da Resistência para recuperar forças.");
        console.log("3 - Desistir.");

        const escolhaDunas = prompt("👉 O que você deseja fazer? ").trim();

        if (escolhaDunas === "1") {
          // Uso do Mapa nas dunas
          if (!this.mapaUsado) {
            console.log("\n📜 Você usa o Mapa Antigo:");
            console.log(
              "'As escolhas apressadas podem parecer atalhos, mas levam apenas a círculos sem fim.'"
            );
            await Utils.printSlow(
              "Mesmo com o mapa, você descobre que as dunas mudam constantemente e não há saída."
            );
            this.mapaUsado = true;
          } else {
            console.log(
              "\n📜 Você já usou o Mapa Antigo. Ele não mostra nada novo."
            );
          }

          const certeza = prompt(
            "Tem certeza que deseja seguir por esse caminho (s/n)?: "
          )
            .trim()
            .toLowerCase();
          if (certeza === "s") {
            // Jogador insiste e falha
            console.log("💀 Você fica preso no deserto e falha no desafio.");

            // Opção de tentar novamente
            console.log("\nEscolha uma opção:");
            console.log("1 - Tentar novamente");
            console.log("2 - Desistir");

            const tentar = prompt("👉 O que você deseja fazer? ").trim();
            if (tentar === "1") {
              this.mapaUsado = false;
              this.cantilUsado = false;
              return await this.resolver(); // Reinicia o desafio
            } else {
              console.log("💀 Você desistiu da jornada...");
              process.exit(0);
            }
          } else {
            console.log("\n🔥 Você voltou ao ponto de decisão:");
          }
        } else if (escolhaDunas === "2") {
          // Uso do Cantil
          if (!this.cantilUsado) {
            console.log(
              "\n💧 Você usa o Cantil da Resistência e recupera suas forças."
            );
            this.cantilUsado = true;
            console.log("\n🔥 Você voltou ao ponto de decisão:");
          } else {
            console.log("\n💧 O cantil está vazio. Não resta mais água.");
          }
        } else if (escolhaDunas === "3") {
          console.log("💀 Você desistiu da jornada...");
          process.exit(0);
        } else {
          console.log("❌ Opção inválida. Tente novamente.");
        }

        // --- Opção 2: Rota das Rochas ---
      } else if (escolhaRota === "2") {
        console.log("\nVocê escolheu a Rota das Rochas.");
        await Utils.printSlow(
          "Após uma longa caminhada, você está diante de uma grande estátua antiga"
        );
        await Utils.printSlow("marcada por símbolos. Uma voz ecoa no deserto:");

        // Pergunta de conhecimento
        console.log("\n💭 Pergunta do Guardião:");
        console.log(
          '"A linguagem utilizada para estruturar o conteúdo da web é essencial'
        );
        console.log('para todo desenvolvedor. Qual é essa linguagem?"');

        this.exibirMenu(["CSS", "HTML", "JavaScript", "Python"]);
        const resposta = prompt("👉 O que você deseja responder? ").trim();

        if (resposta === "2" || resposta.toLowerCase() === "html") {
          // Resposta correta
          await Utils.printSlow(
            "\n✅ Correto! A estátua se abre, revelando uma passagem secreta"
          );
          await Utils.printSlow(
            "para o final da caverna. No centro dela, repousa o Cristal da Estratégia."
          );
          await Utils.printSlow("\n🎉 Você conquistou o quarto cristal!");
          await Utils.printSlow(
            "\n🎉 Parabéns! Sua inteligência e estratégia permitiram atravessar"
          );
          await Utils.printSlow("o deserto e conquistar o quarto cristal! 🎉");
          await Utils.printSlow(
            "\nAgora resta apenas um último desafio para salvar Numéria. 🌌"
          );

          const continuar = prompt(
            "👉 Você está pronto para a fase final? (s/n): "
          )
            .trim()
            .toLowerCase();
          if (continuar === "s") {
            return true;
          } else {
            await Utils.printSlow("💀 Você decidiu parar por aqui...");
            process.exit(0);
          }
        } else {
          // Resposta incorreta
          await Utils.printSlow("\n❌ Errado! A estátua se desfaz em areia,");
          await Utils.printSlow(
            "e você fica preso no deserto sem alcançar o cristal."
          );

          console.log("\nEscolha uma opção:");
          console.log("1 - Tentar novamente");
          console.log("2 - Desistir");

          const tentar = prompt("👉 O que você deseja fazer? ").trim();
          if (tentar === "1") {
            this.mapaUsado = false;
            this.cantilUsado = false;
            return await this.resolver(); // Reinicia o desafio
          } else {
            await Utils.printSlow("💀 Você desistiu da jornada...");
            process.exit(0);
          }
        }

        // --- Opção 3: Desistir ---
      } else if (escolhaRota === "3") {
        await Utils.printSlow("💀 Você desistiu da jornada...");
        process.exit(0);
      } else {
        console.log("❌ Opção inválida. Tente novamente.");
      }
    }
  }
}
