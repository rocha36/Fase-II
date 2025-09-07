// Importa o prompt-sync para entrada de dados no terminal
import promptSync from "prompt-sync";
// Importa funções utilitárias personalizadas
import { Utils } from "./utils.js";

// Inicializa o prompt para capturar entradas do usuário
const prompt = promptSync({ sigint: true });

// Classe responsável pelo desafio da floresta
export class DesafioFloresta {
  constructor() {
    // Contador de acertos do jogador
    this.acertos = 0;

    // Lista de charadas com suas pistas, objetos e respostas
    this.charadas = [
      {
        pergunta: "Quanto mais você tira de mim, maior eu fico. O que sou?",
        pista:
          "Para me trazer à existência, você precisa usar uma cavadeira. Meu espaço cresce.",
        objeto: "Dois Gravetos Pontiagudos",
        instrucaoObjeto:
          "Use os gravetos pontiagudos para cavar, e o feitiço se desfaz....",
        resposta: "buraco",
      },
      {
        pergunta: "O que tem cabeça, tem dente, mas não é bicho nem gente?",
        pista: "É usado diariamente por muitas pessoas.",
        objeto: "Você encontra uma escova misteriosa entre as folhas.",
        instrucaoObjeto: "A escova parece pedir para ser usada...",
        resposta: "alho",
      },
      {
        pergunta: "Passa diante do sol e não faz sombra. O que é?",
        pista: "É algo invisível, mas você sente quando toca sua pele.",
        objeto: "Você encontra uma pena flutuando suavemente no ar.",
        instrucaoObjeto:
          "A pena se move sem que ninguém a toque, indicando a presença de algo que não pode ser visto.",
        resposta: "vento",
      },
    ];
  }

  // Exibe o menu de opções disponíveis para o jogador
  exibirMenu() {
    console.log("\nEscolha uma opção:");
    console.log("1 - Ver ferramenta (dica)");
    console.log("2 - Usar objeto (responder)");
    console.log("3 - Desistir");
  }

  // Método principal para iniciar e resolver o desafio
  async resolver() {
    // <-- Torna assíncrono
    console.log("🌲 DESAFIO 1: Floresta da Sabedoria 🌲");
    await Utils.printSlow(
      "Os anciãos espirituais testam sua inteligência com três charadas..."
    );

    // Percorre cada charada
    for (let i = 0; i < this.charadas.length; i++) {
      const charada = this.charadas[i];
      let charadaResolvida = false;
      let pistaUsada = false;

      // Continua até que a charada seja resolvida
      while (!charadaResolvida) {
        console.log(`\n💭 Charada ${i + 1}: ${charada.pergunta}`);
        this.exibirMenu();
        const escolha = prompt("O que você deseja fazer? ").trim();

        switch (escolha) {
          case "1": // Mostrar pista
            if (!pistaUsada) {
              await Utils.printSlow(charada.pista);
              pistaUsada = true;
              console.log(
                "\nVocê já usou sua ferramenta. Agora, use o objeto para desfazer a magia."
              );
            } else {
              console.log(
                "\nVocê já usou sua ferramenta. Agora, use o objeto para desfazer a magia."
              );
            }
            break;

          case "2": // Usar objeto e tentar responder
            await Utils.printSlow(charada.objeto);
            await Utils.printSlow(charada.instrucaoObjeto);
            console.log(`\n💭 Charada: ${charada.pergunta}`);

            const resposta = prompt("Sua resposta: ").trim().toLowerCase();

            if (resposta === charada.resposta) {
              console.log("✅ Correto! A magia foi desfeita.");
              this.acertos++;
              charadaResolvida = true;

              // Se ainda houver charadas, perguntar se o jogador deseja continuar
              if (this.acertos < this.charadas.length) {
                console.log(
                  `\nVocê tem mais ${
                    this.charadas.length - this.acertos
                  } charadas para resolver.`
                );
                const continuar = prompt("Deseja continuar? (s/n): ")
                  .trim()
                  .toLowerCase();
                if (continuar !== "s") {
                  console.log("💀 Você decidiu parar por aqui...");
                  process.exit(0);
                }
              }
            } else {
              console.log("❌ Errado! O feitiço permanece... Tente novamente.");
            }
            break;

          case "3": // Desistir do desafio
            console.log("💀 Você desistiu da jornada...");
            process.exit(0);

          default: // Opção inválida
            console.log("❌ Opção inválida. Tente novamente.");
            break;
        }
      }
    }

    // Resultado final após responder todas as charadas
    if (this.acertos >= 2) {
      await Utils.printSlow(
        "\n🎉 Parabéns! Você usou sua inteligência para responder as charadas dos anciãos espirituais e recuperou o primeiro cristal! 🎉"
      );
      await Utils.printSlow(
        "Mas a jornada ainda não acabou... Ainda restam 4 cristais para salvar Numéria."
      );

      const continuar = prompt("Você está pronto para continuar? (s/n): ")
        .trim()
        .toLowerCase();

      if (continuar === "s") {
        return true; // Continua para o próximo desafio
      } else {
        console.log("💀 Você decidiu parar por aqui...");
        process.exit(0);
      }
    } else {
      await Utils.printSlow(
        "\n💀 Você se perdeu na floresta e precisa começar do início da caverna..."
      );
      return false; // Não conseguiu avançar
    }
  }
}
