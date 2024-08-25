const fs = require('fs');

function binPackingBacktracking(itens, binCapacity) {
    function isValid(currentBins) {
        for (let bin of currentBins) {
            const binSum = bin.reduce((a, b) => a + b, 0);
            if (binSum > binCapacity) {
                return false;
            }
        }
        return true;
    }

    function packItems(index, currentBins) {
        if (index === itens.length) {
            return isValid(currentBins) ? currentBins : null;
        }

        for (let bin of currentBins) {
            bin.push(itens[index]);
            const result = packItems(index + 1, currentBins);
            if (result) {
                return result;
            }
            bin.pop();
        }

        const newBin = [itens[index]];
        currentBins.push(newBin);
        const result = packItems(index + 1, currentBins);
        if (result) {
            return result;
        }
        currentBins.pop();

        return null;
    }

    return packItems(0, []);
}

function main() {
    const inputFilePath = process.argv[2];
    
    const data = fs.readFileSync(inputFilePath, 'utf8').split('\n');
    const binCapacity = parseInt(data[0].trim());
    const itens = data[1].split(' ').map(Number);

    const startTime = process.hrtime();
    const result = binPackingBacktracking(itens, binCapacity);
    const endTime = process.hrtime(startTime);

    const elapsedTime = (endTime[0] * 1000 + endTime[1] / 1e6).toFixed(2);
    const numberOfBins = result.length;

    console.log(`Tempo de execução: ${elapsedTime} ms`);
    console.log(`Número de caixas: ${numberOfBins}`);
    result.forEach((bin, index) => {
        console.log(`Caixa ${index}: ${bin.join(', ')}`);
    });
}

main();
