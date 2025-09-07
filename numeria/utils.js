// Classe de utilidades com métodos estáticos
export class Utils {
  /**
   * Exibe o texto letra por letra com um pequeno atraso entre os caracteres.
   * @param {string} text - Texto que será exibido lentamente.
   * @param {number} delay - Tempo (em ms) de atraso entre cada caractere. Padrão: 50ms.
   */
  static async printSlow(text, delay = 50) {
    for (let char of text) {
      process.stdout.write(char); // imprime sem quebra de linha
      await Utils.sleep(delay); // espera o tempo configurado
    }
    console.log(); // quebra de linha no final
  }

  /**
   * Pausa a execução por um determinado tempo.
   * @param {number} milliseconds - Tempo em milissegundos para aguardar.
   * @returns {Promise<void>}
   */
  static sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
}
