// Importação de bibliotecas e utilitários
import promptSync from "prompt-sync";
import { Utils } from "./utils.js";

const prompt = promptSync({ sigint: true });

// Classe que representa o desafio final contra Zathor
export class DesafioCastelo {
  constructor() {
    this.erros = 0; // Contador de erros do jogador
  }

  // Método principal que executa o desafio
  async resolver() {
    // Introdução da fase
    console.log("🏰 DESAFIO FINAL: O Castelo de Zathor 🏰");
    await Utils.printSlow("As nuvens negras pairam pesadas sobre Numéria.");
    await Utils.printSlow(
      "O imponente Castelo de Zathor ergue-se diante de você,"
    );
    await Utils.printSlow(
      "envolto em trevas e desespero. Cada passo ecoa em meio"
    );
    await Utils.printSlow(
      "aos corredores sombrios, onde o vilão o aguarda para o confronto decisivo."
    );

    console.log(
      "\nAqui, não há ferramentas, não há objetos. Apenas o seu conhecimento poderá selar o destino do reino."
    );

    // Regras do desafio
    console.log("\n🎯 Objetivo da fase:");
    console.log(
      "Responder corretamente aos desafios de Zathor. São 3 enigmas de lógica e programação."
    );
    console.log("Você pode errar 1 vez e ainda continuar.");
    console.log("Se errar 2 vezes, será derrotado.");

    console.log("\n⚒️ Ferramentas e Objetos disponíveis:");
    console.log("Nenhum. Apenas sua sabedoria.");

    // Aparição de Zathor
    await Utils.printSlow("\n⚔️ O Duelo com Zathor");
    await Utils.printSlow("💀 Zathor surge em meio às chamas negras:");
    await Utils.printSlow(
      '"Então, herói... chegou até aqui. Mas seu destino será selado'
    );
    await Utils.printSlow(
      "não pela espada, mas pelo conhecimento. Se falhar mais de"
    );
    await Utils.printSlow('uma vez, Numéria mergulhará nas trevas eterna!"');

    // Lista de enigmas
    const enigmas = [
      {
        titulo: "Enigma 1",
        pergunta: "Qual é o resultado de 2 elevado à 5ª potência?",
        opcoes: ["8", "16", "32", "64"],
        resposta: "3", // opção correta é "32"
        mensagemAcerto: "✅ O poder da lógica está com você!",
        mensagemErro: "❌ Zathor sorri: 'Não é isso, herói... pense melhor!'",
      },
      {
        titulo: "Enigma 2",
        pergunta:
          "Qual método JavaScript transforma uma string em letras maiúsculas?",
        opcoes: ["toLowerCase()", "toUpperCase()", "capitalize()", "replace()"],
        resposta: "2", // opção correta é "toUpperCase()"
        mensagemAcerto: "✅ Você domina os feitiços da programação!",
        mensagemErro:
          "❌ Zathor ri: 'Ainda não é suficiente para me derrotar!'",
      },
      {
        titulo: "Enigma 3",
        pergunta: "Qual símbolo é usado para atribuição em JavaScript?",
        opcoes: ["==", "=", "=>", ":"],
        resposta: "2", // opção correta é "="
        mensagemAcerto: "✅ O último segredo foi revelado!",
        mensagemErro: "❌ Zathor grita: 'Fracassou no momento decisivo!'",
      },
    ];

    // Loop pelos enigmas
    for (let i = 0; i < enigmas.length; i++) {
      const e = enigmas[i];

      // Exibe enigma
      console.log(`\n${e.titulo}`);
      console.log(e.pergunta);

      console.log("\nOpções:");
      e.opcoes.forEach((op, idx) => console.log(`${idx + 1} - ${op}`));

      // Entrada do jogador
      const escolha = prompt("👉 Escolha uma opção: ").trim();

      // Verifica acerto
      if (escolha === e.resposta) {
        console.log(`\n${e.mensagemAcerto}`);

        // Perguntar se deseja continuar (exceto no último enigma)
        if (i < enigmas.length - 1) {
          const continuar = prompt(
            "\nO destino de Numéria está em suas mãos... deseja seguir adiante? (s/n): "
          )
            .trim()
            .toLowerCase();
          if (continuar !== "s") {
            console.log("💀 Você decidiu parar por aqui...");
            process.exit(0);
          }
        }
      } else {
        // Incrementa contador de erros
        this.erros++;

        if (this.erros === 1) {
          // Primeiro erro permitido
          console.log(`\n${e.mensagemErro}`);
          console.log(
            "⚠️ Você sente o peso da escuridão. Só resta mais uma chance de erro."
          );

          const continuar = prompt(
            "\nO destino de Numéria está em suas mãos... deseja seguir adiante? (s/n): "
          )
            .trim()
            .toLowerCase();
          if (continuar !== "s") {
            console.log("💀 Você decidiu parar por aqui...");
            process.exit(0);
          }
        } else if (this.erros >= 2) {
          // Derrota (dois erros ou mais)
          if (i === 2) {
            // Caso o erro seja no último enigma
            console.log(
              "\n❌ Você falhou novamente! Zathor absorve sua energia e o derrota sem piedade! Sua jornada termina aqui..."
            );

            console.log("\n🕶️ Comemoração da vitória de Zathor");
            console.log(
              '"Hahahaha! Venci! Nenhum mortal pode se igualar ao poder de Zathor!"'
            );
            console.log(
              '"O Reino de Numéria permanecerá em cinzas, condenado pela minha escuridão eterna!"'
            );
            console.log('"Que os fracos se curvem diante do meu reinado!"');
            console.log(
              '"Fracassou... e agora não há mais esperança para Numéria."'
            );
            console.log("💀 Fim de Jogo – As trevas dominam para sempre.");
          } else {
            console.log("\n❌❌ Zathor gargalha enquanto o castelo treme:");
            console.log(
              '"Acabou! Você falhou, e agora Numéria será minha para sempre!"'
            );
            console.log("💀 Fim de Jogo – O reino mergulha na escuridão.");
          }
          return false;
        }
      }

      // Pausa dramática entre enigmas
      if (i < enigmas.length - 1) {
        await Utils.printSlow("\n...");
      }
    }

    // Vitória - Todos os enigmas resolvidos
    console.log("\n🌟 Final da Vitória");
    await Utils.printSlow(
      "As trevas se dissipam, e o Castelo de Zathor desmorona em pó diante de seus olhos."
    );
    await Utils.printSlow(
      "No centro, o Cristal do Equilíbrio brilha com intensidade, unindo-se aos outros quatro."
    );
    await Utils.printSlow(
      "Os cinco cristais pairam no ar e, ao se unirem, uma luz radiante cobre todo o reino."
    );
    await Utils.printSlow(
      "As nuvens negras se desfazem, a esperança retorna, e a vida floresce novamente em Numéria."
    );

    console.log(
      "\nO povo emerge das vilas e cidades, ajoelhando-se diante de você."
    );
    console.log("Um ancião, com a voz carregada de emoção, declara:");
    console.log(
      '"Herói, tua coragem e sabedoria salvaram Numéria das trevas eternas.'
    );
    console.log("Mostraste força, inteligência e coração.");
    console.log("A partir de hoje, serás lembrado como Guardião de Numéria,");
    console.log('protetor da paz e da harmonia em nosso reino."');

    console.log(
      "\n🎉 Vitória! Você reuniu os cinco cristais e restaurou a luz de Numéria."
    );
    console.log(
      "O povo o aclama como salvador, e uma nova era de paz se inicia."
    );

    return true;
  }
}
