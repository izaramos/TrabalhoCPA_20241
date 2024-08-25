// Importa o módulo 'fs' para ler arquivos
const fs = require('fs');

// Função que implementa o algoritmo de bin packing com backtracking
function binPackingBacktracking(itens, binCapacity) {
  // Função auxiliar que verifica se a solução atual é válida
  function isValid(currentBins) {
    // Verifica se a soma dos itens em cada caixa não ultrapassa a capacidade
    for (let bin of currentBins) {
      const binSum = bin.reduce((a, b) => a + b, 0);
      if (binSum > binCapacity) {
        return false;
      }
    }
    return true;
  }

  // Função auxiliar que tenta empacotar os itens em caixas
  function packItems(index, currentBins) {
    // Se todos os itens foram empacotados, retorna a solução
    if (index === itens.length) {
      return isValid(currentBins) ? currentBins : null;
    }

    // Tenta adicionar o item atual a cada caixa existente
    for (let bin of currentBins) {
      bin.push(itens[index]);
      const result = packItems(index + 1, currentBins);
      if (result) {
        return result;
      }
      bin.pop();
    }

    // Se não foi possível adicionar o item a nenhuma caixa existente, cria uma nova caixa
    const newBin = [itens[index]];
    currentBins.push(newBin);
    const result = packItems(index + 1, currentBins);
    if (result) {
      return result;
    }
    currentBins.pop();

    // Se não foi possível encontrar uma solução, retorna null
    return null;
  }

  // Inicia o processo de empacotamento com uma lista vazia de caixas
  return packItems(0, []);
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

  // Executa o algoritmo de bin packing com backtracking
  const result = binPackingBacktracking(itens, binCapacity);

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