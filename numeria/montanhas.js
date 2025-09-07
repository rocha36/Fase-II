// Importa bibliotecas necessárias
import promptSync from "prompt-sync";
import { Utils } from "./utils.js";

const prompt = promptSync({ sigint: true });

/**
 * Classe responsável pelo Desafio das Montanhas
 * O jogador deve resolver três enigmas matemáticos utilizando itens da mochila.
 */
export class DesafioMontanhas {
  constructor() {
    // Mochila com itens auxiliares
    this.mochila = ["lápis", "caderno", "óculos", "calculadora"];

    // Lista de enigmas matemáticos
    this.enigmas = [
      {
        pergunta: "Escolha três números ímpares que somados resultam em 25.",
        numeros: [8, 7, 10, 5, 13, 3, 1, 9, 2, 4, 12],
        resposta: [7, 5, 13],
      },
      {
        pergunta:
          "Calcule o número de pedras para cobrir uma área de 24m² (cada pedra cobre 4m²).",
        resposta: 6,
      },
      {
        pergunta: "Qual é o menor número primo entre 20 a 30?",
        resposta: 23,
      },
    ];
  }

  /**
   * Exibe os itens disponíveis na mochila
   */
  abrirMochila() {
    if (this.mochila.length === 0) {
      console.log(
        "\n📦 A mochila está vazia. Todos os objetos já foram usados."
      );
      return false;
    }

    console.log("\n📦 Itens na mochila:");
    this.mochila.forEach((item, index) => {
      console.log(`${index + 1} - ${item}`);
    });
    return true;
  }

  /**
   * Usa um item da mochila para ajudar a resolver um enigma
   * @param {number} objetoIndex - Índice do item escolhido
   * @param {number} enigmaIndex - Índice do enigma atual
   */
  usarObjeto(objetoIndex, enigmaIndex) {
    // Valida escolha
    if (objetoIndex < 1 || objetoIndex > this.mochila.length) {
      console.log("❌ Opção inválida. Tente novamente.");
      return false;
    }

    const objeto = this.mochila[objetoIndex - 1];
    console.log(`\nVocê escolheu o objeto: ${objeto}.`);

    switch (objeto) {
      case "lápis":
        console.log("🎯 Efeito: Sugere combinações de números.");
        if (enigmaIndex === 0) {
          console.log("Números ímpares disponíveis: 1, 3, 5, 7, 9 e 13.");
          console.log("Exemplos de combinações possíveis:");
          console.log("• 7 + 9 + 5");
          console.log("• 5 + 7 + 13");
          console.log("• 3 + 9 + 7");
          console.log("Agora, escolha a combinação que resulta em 25.");
        } else if (enigmaIndex === 1) {
          console.log(
            "Dica: Quantidade de pedras = Área total ÷ Área de cada pedra."
          );
        } else if (enigmaIndex === 2) {
          console.log(
            "Liste os números entre 20 e 30 e verifique quais são primos."
          );
        }
        break;

      case "caderno":
        console.log("🎯 Efeito: Mostra exemplos resolvidos.");
        if (enigmaIndex === 0) {
          console.log(
            "Exemplo: 3 + 5 + 7 = 15 (três ímpares somando um valor)."
          );
        } else if (enigmaIndex === 1) {
          console.log("Exemplo: 16 ÷ 4 = 4 pedras.");
        } else if (enigmaIndex === 2) {
          console.log(
            "Exemplo: 17 é primo, pois só divide por 1 e por ele mesmo."
          );
        }
        break;

      case "óculos":
        console.log("🎯 Efeito: Destaca as partes importantes do enunciado.");
        if (enigmaIndex === 0) {
          console.log(
            "• Apenas números ímpares\n• Somar = 25\n• Exatamente 3 números"
          );
        } else if (enigmaIndex === 1) {
          console.log("• Área total = 24m²\n• Cada pedra = 4m²");
        } else if (enigmaIndex === 2) {
          console.log("• Procure o MENOR número primo\n• Intervalo: 20 a 30");
        }
        break;

      case "calculadora":
        console.log(
          "🎯 Efeito: Resolve o cálculo automaticamente (uso único)."
        );
        let confirmar;
        if (enigmaIndex === 0) {
          console.log("Você digita: 7 + 5 + 13 = 25");
          confirmar = prompt("Confirmar resposta? (s/n): ")
            .trim()
            .toLowerCase();
          if (confirmar === "s") return true;
        } else if (enigmaIndex === 1) {
          console.log("Você digita: 24 ÷ 4 = 6");
          confirmar = prompt("Confirmar resposta? (s/n): ")
            .trim()
            .toLowerCase();
          if (confirmar === "s") return true;
        } else if (enigmaIndex === 2) {
          console.log("Você testa divisores e conclui que 23 é primo.");
          confirmar = prompt("Confirmar resposta? (s/n): ")
            .trim()
            .toLowerCase();
          if (confirmar === "s") return true;
        }
        console.log("❌ Resposta não confirmada. Tente novamente.");
        break;

      default:
        console.log("❌ Objeto não encontrado na mochila.");
        return false;
    }

    // Remove o item após o uso
    this.mochila.splice(objetoIndex - 1, 1);
    return false;
  }

  /**
   * Inicia a resolução do desafio das Montanhas
   */
  async resolver() {
    // <-- Torna assíncrono
    console.log("⛰️ DESAFIO 2: Montanhas do Cálculo ⛰️");
    await Utils.printSlow(
      "O cristal está atrás de uma porta mágica que só se abre resolvendo três enigmas matemáticos..."
    );

    // Percorre cada enigma
    for (let i = 0; i < this.enigmas.length; i++) {
      const enigma = this.enigmas[i];
      console.log(`\n💭 Enigma ${i + 1}: ${enigma.pergunta}`);

      // Mostra números disponíveis no enigma 1
      if (i === 0) {
        console.log("🔢 Números: 8, 7, 10, 5, 13, 3, 1, 9, 2, 4, 12");
        console.log("⚠ Use apenas números ímpares que somem exatamente 25.");
      }

      let enigmaResolvido = false;

      // Loop até o enigma ser resolvido
      while (!enigmaResolvido) {
        console.log("\nEscolha uma opção:");
        console.log("1 - Abrir mochila");
        console.log("2 - Responder");
        console.log("3 - Desistir");

        const escolha = prompt("O que você deseja fazer? ").trim();

        switch (escolha) {
          case "1": // Abrir mochila
            if (this.abrirMochila()) {
              const itemEscolhido = parseInt(
                prompt("Qual item você deseja usar? (Digite o número): ").trim()
              );
              if (this.usarObjeto(itemEscolhido, i)) {
                enigmaResolvido = true;
              }
            }
            break;

          case "2": // Responder manualmente
            if (i === 0)
              console.log("💡 Digite três números separados por espaço.");
            if (i === 1)
              console.log("💡 Digite apenas a quantidade de pedras.");
            if (i === 2) console.log("💡 Digite apenas o número primo.");

            const resposta = prompt("Sua resposta: ").trim();
            let respostaValida = false;

            if (i === 0) {
              // Valida soma de três números ímpares
              const numeros = resposta
                .split(/[\s+=]/)
                .filter(Boolean)
                .map(Number);
              if (
                numeros.length === 3 &&
                numeros.reduce((a, b) => a + b, 0) === 25
              ) {
                respostaValida = true;
              }
            } else if (i === 1 || i === 2) {
              const numero = Number(resposta);
              if (numero === enigma.resposta) respostaValida = true;
            }

            if (respostaValida) {
              console.log("✅ Correto! A magia foi desfeita.");
              enigmaResolvido = true;
            } else {
              console.log("❌ Errado! O feitiço permanece... Tente novamente.");
            }
            break;

          case "3": // Desistir
            console.log("💀 Você desistiu da jornada...");
            process.exit(0);

          default:
            console.log("❌ Opção inválida. Tente novamente.");
        }
      }
    }

    // Conclusão do desafio
    await Utils.printSlow(
      "\n🎉 Parabéns! Você resolveu os enigmas e recuperou o segundo cristal!"
    );
    await Utils.printSlow("Ainda restam 3 cristais para salvar Numéria...");
    const continuar = prompt("Você está pronto para continuar? (s/n): ")
      .trim()
      .toLowerCase();

    if (continuar === "s") {
      return true;
    } else {
      console.log("💀 Você decidiu parar por aqui...");
      process.exit(0);
    }
  }
}
