const fs = require('fs');

function binPackingBacktracking(sizes, binCapacity) {
    function isValid(configuration) {
        for (let bin of configuration) {
            const binSum = bin.reduce((a, b) => a + b, 0);
            if (binSum > binCapacity) {
                return false;
            }
        }
        return true;
    }

    function packItems(index, currentBins) {
        if (index === sizes.length) {
            return isValid(currentBins) ? currentBins : null;
        }

        for (let bin of currentBins) {
            bin.push(sizes[index]);
            const result = packItems(index + 1, currentBins);
            if (result) {
                return result;
            }
            bin.pop();
        }

        const newBin = [sizes[index]];
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
    const sizes = data[1].split(' ').map(Number);

    const startTime = process.hrtime();
    const result = binPackingBacktracking(sizes, binCapacity);
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
