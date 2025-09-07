// Importa o prompt-sync para entrada de dados no terminal
import promptSync from "prompt-sync";
// Importa utilitários auxiliares (ex.: função printSlow)
import { Utils } from "./utils.js";

// Inicializa o prompt para capturar entradas do usuário
const prompt = promptSync({ sigint: true });

// Classe principal do desafio "Cavernas da Lógica"
export class DesafioCavernas {
  constructor() {
    // Lista de enigmas que o jogador precisa resolver
    this.enigmas = [
      {
        pergunta: "Qual comando em JavaScript quebra um ciclo infinito?",
        pista:
          "🔍 Lupa da Sintaxe: Revela um trecho de código JavaScript que descreve a situação:",
        codigo: `// ciclo sem fim
let passos = 0;

while (true) {
    passos++;
    if (passos === 1) console.log("Passo 1: Avance");
    if (passos === 2) console.log("Passo 2: Gire à direita");
    if (passos === 3) console.log("Passo 3: Avance");
    if (passos === 4) {
        console.log("Passo 4: Gire à esquerda");
        passos = 0; // reinicia o ciclo
    }
    // sem a palavra mágica, o ciclo nunca termina...
}`,
        objeto: "✍️ Objeto: Chave do Comando",
        instrucaoObjeto:
          "Use a chave para escrever a palavra sagrada no ar. Se for correta, o feitiço se quebra.",
        resposta: "break",
      },
      {
        pergunta: "Anne – Paulo – Bianca – ? (padrão de posição da letra A)",
        pista:
          "🔍 Lupa da Sintaxe: 'O padrão é posicional de uma letra em específico que avança: 1ª → 2ª → 3ª → 4ª.'",
        opcoes: ["a) tela", "b) cardaço", "c) caneta", "d) cadeira"],
        objeto: "✍️ Objeto: Pedra da Condição",
        instrucaoObjeto:
          "A pedra se ilumina e a voz ecoa: 'Qual a palavra em que a letra 'A' ocupa a 4ª posição?'",
        resposta: "tela",
      },
    ];
  }

  // Exibe menu de ações dependendo do enigma
  exibirMenu(primeiroEnigma = true) {
    if (primeiroEnigma) {
      console.log("\nEscolha uma opção:");
      console.log("1 - Ferramenta");
      console.log("2 - Usar objeto");
      console.log("3 - Desistir");
    } else {
      console.log("\nOpções:");
      console.log("1 - Tentar uma palavra");
      console.log("2 - Ver ferramenta");
      console.log("3 - Usar objeto");
      console.log("4 - Desistir");
    }
  }

  // Fluxo principal do desafio
  async resolver() {
    // <-- Torna assíncrono
    console.log("🌑 DESAFIO 3: Cavernas da Lógica 🌑");
    await Utils.printSlow(
      "Você adentra cavernas escuras onde a luz é escassa e os caminhos são definidos por padrões lógicos."
    );
    await Utils.printSlow(
      "O ar é denso e ecoa com sussurros de enigmas não resolvidos."
    );
    await Utils.printSlow(
      "Atenção: Você precisa resolver 2 enigmas de lógica para recuperar o terceiro Cristal do Equilíbrio."
    );

    // Percorre todos os enigmas
    for (let i = 0; i < this.enigmas.length; i++) {
      const enigma = this.enigmas[i];
      let enigmaResolvido = false;
      let pistaUsada = false;

      // Introdução diferente para cada enigma
      if (i === 0) {
        console.log("\n💭 Enigma 1: O Ciclo sem Fim");
        await Utils.printSlow(
          "Você entra em uma sala circular onde uma voz ecoa repetidamente:"
        );
        await Utils.printSlow(
          '"Passo 1: Avance | Passo 2: Gire à direita | Passo 3: Avance | Passo 4: Gire à esquerda | Repita"'
        );
        await Utils.printSlow("Você percebe que está andando em círculos.");
      } else {
        console.log("\n💭 Enigma 2: O Eco das Letras");
        await Utils.printSlow(
          "Você encontra um muro coberto por nomes gravados em linhas de luz:"
        );
        await Utils.printSlow("Anne – Paulo – Bianca – ?");
        await Utils.printSlow("Uma voz sussurra:");
        await Utils.printSlow(
          "Pista: 'Observe os nomes, identifique o padrão que mostrará o caminho.'"
        );
      }

      // Laço até resolver cada enigma
      while (!enigmaResolvido) {
        this.exibirMenu(i === 0);

        const escolha = prompt(
          i === 0 ? "👉 O que você deseja fazer? " : "O que você deseja fazer? "
        ).trim();

        // Opção de ver ferramenta/pista
        if ((i === 0 && escolha === "1") || (i === 1 && escolha === "2")) {
          if (!pistaUsada) {
            await Utils.printSlow(enigma.pista);
            if (i === 0) {
              await Utils.printSlow(enigma.codigo);
            } else {
              await Utils.printSlow(
                "Temos quatro opções, escolha com sabedoria:"
              );
              for (const opcao of enigma.opcoes) {
                await Utils.printSlow(opcao);
              }
            }
            pistaUsada = true;
            await Utils.printSlow(
              "\nVocê usou sua ferramenta. Agora, use o objeto para desfazer a magia."
            );
          } else {
            await Utils.printSlow(
              "\nVocê já usou sua ferramenta. Agora, use o objeto para desfazer a magia."
            );
          }
        }
        // Opção de tentar resposta ou usar objeto
        else if (
          (i === 0 && escolha === "2") ||
          (i === 1 && (escolha === "3" || escolha === "1"))
        ) {
          if (i === 1 && escolha === "1") {
            // Tentar resposta diretamente no segundo enigma
            const resposta = prompt("Sua resposta: ").trim().toLowerCase();
            if (resposta === enigma.resposta) {
              await Utils.printSlow(
                "✅ Correto! A energia sombria que envolvia o cristal foi completamente dissipada!"
              );
              enigmaResolvido = true;
            } else {
              await Utils.printSlow("❌ Errado! Tente novamente.");
            }
            continue;
          }

          // Exibe objeto e instrução
          await Utils.printSlow(enigma.objeto);
          await Utils.printSlow(enigma.instrucaoObjeto);
          await Utils.printSlow(`💭 Enigma: ${enigma.pergunta}`);

          const resposta = prompt("Sua resposta: ").trim().toLowerCase();

          if (resposta === enigma.resposta) {
            if (i === 0) {
              await Utils.printSlow(
                "✅ Correto! A palavra mágica 'break' ecoa pelas cavernas, rompendo o ciclo eterno."
              );
              await Utils.printSlow(
                "A passagem secreta se abre diante de você."
              );
            } else {
              await Utils.printSlow(
                "✅ Correto! A energia sombria que envolvia o cristal foi completamente dissipada!"
              );
            }
            enigmaResolvido = true;

            // Pergunta se deseja continuar apenas se houver mais enigmas
            if (i < this.enigmas.length - 1) {
              await Utils.printSlow(
                `\nVocê tem mais ${
                  this.enigmas.length - i - 1
                } enigma(s) para resolver.`
              );
              const continuar = prompt("Deseja continuar? (s/n): ")
                .trim()
                .toLowerCase();
              if (continuar !== "s") {
                await Utils.printSlow("💀 Você decidiu parar por aqui...");
                process.exit(0);
              }
            }
          } else {
            await Utils.printSlow(
              "❌ Errado! O feitiço permanece... Tente novamente."
            );
          }
        }
        // Opção de desistir
        else if ((i === 0 && escolha === "3") || (i === 1 && escolha === "4")) {
          await Utils.printSlow("💀 Você desistiu da jornada...");
          process.exit(0);
        }
        // Entrada inválida
        else {
          await Utils.printSlow("❌ Opção inválida. Tente novamente.");
        }
      }
    }

    // Finalização após vencer os enigmas
    await Utils.printSlow(
      "\n💎 Parabéns, bravo(a) herói(ína)! Sua sagacidade e perspicácia brilharam mais uma vez"
    );
    await Utils.printSlow(
      "ao desvendar os enigmas do templo ancestral. O terceiro cristal agora repousa em suas"
    );
    await Utils.printSlow("mãos, irradiando poder puro e esperança!");
    await Utils.printSlow("\n🌌 Mas a jornada está longe do fim…");
    await Utils.printSlow(
      "O destino de Numéria ainda oscila na balança. Restam dois cristais poderosos,"
    );
    await Utils.printSlow(
      "espalhados por reinos sombrios, guardados por desafios inimagináveis."
    );
    await Utils.printSlow("\n🗡️ O tempo urge, e o mal não descansa.");
    await Utils.printSlow(
      "Você está preparado(a) para enfrentar o próximo desafio e gravar sua lenda nas páginas"
    );
    await Utils.printSlow("da história?");

    const continuar = prompt("🔮 Digite [s] para avançar ou [n] para recuar: ")
      .trim()
      .toLowerCase();
    if (continuar === "s") {
      return true;
    } else {
      await Utils.printSlow("💀 Você decidiu parar por aqui...");
      process.exit(0);
    }
  }
}
