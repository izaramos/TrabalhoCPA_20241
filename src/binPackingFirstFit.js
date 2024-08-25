// Importa o módulo 'fs' para ler arquivos
const fs = require('fs');

// Função que implementa o algoritmo de bin packing first fit
function binPackingFirstFit(itens, binCapacity) {
  // Ordena os itens em ordem decrescente de tamanho
  itens.sort((a, b) => b - a);

  // Inicializa uma lista vazia de caixas
  const bins = [];

  // Itera sobre os itens
  for (let item of itens) {
    // Flag para indicar se o item foi colocado em uma caixa
    let placed = false;

    // Itera sobre as caixas existentes
    for (let bin of bins) {
      // Verifica se o item pode ser colocado na caixa atual
      if (bin.reduce((a, b) => a + b, 0) + item <= binCapacity) {
        // Coloca o item na caixa
        bin.push(item);
        placed = true;
        break;
      }
    }

    // Se o item não foi colocado em nenhuma caixa, cria uma nova caixa
    if (!placed) {
      bins.push([item]);
    }
  }

  // Retorna a lista de caixas
  return bins;
}

// Função principal que lê o arquivo de entrada e executa o algoritmo
function main() {
  // Lê o arquivo de entrada especificado como argumento de linha de comando
  const inputFilePath = process.argv[2];
  
  // Lê o conteúdo do arquivo e extrai a capacidade da caixa e os itens
  const data = fs.readFileSync(inputFilePath, 'utf8').split('\n');
  const binCapacity = parseInt(data[0].trim());
  const itens = data[1].split(' ').map(Number);

  // Registra o tempo de início da execução
  const startTime = process.hrtime();

  // Executa o algoritmo de bin packing first fit
  const result = binPackingFirstFit(itens, binCapacity);

  // Registra o tempo de fim da execução
  const endTime = process.hrtime(startTime);

  // Calcula o tempo de execução em milissegundos
  const elapsedTime = (endTime[0] * 1000 + endTime[1] / 1e6).toFixed(2);

  // Calcula o número de caixas utilizadas
  const numberOfBins = result.length;

  // Imprime os resultados
  console.log(`Tempo de execução: ${elapsedTime} ms`);
  console.log(`Número de caixas: ${numberOfBins}`);
  result.forEach((bin, index) => {
    console.log(`Caixa ${index}: ${bin.join(', ')}`);
  });
}

// Executa a função principal
main();