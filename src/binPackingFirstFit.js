const fs = require('fs');

function binPackingFirstFit(itens, binCapacity) {
    itens.sort((a, b) => b - a);

    const bins = [];
    for (let item of itens) {
        let placed = false;
        for (let bin of bins) {
            if (bin.reduce((a, b) => a + b, 0) + item <= binCapacity) {
                bin.push(item);
                placed = true;
                break;
            }
        }
        if (!placed) {
            bins.push([item]);
        }
    }
    return bins;
}

function main() {
    const inputFilePath = process.argv[2];
    
    const data = fs.readFileSync(inputFilePath, 'utf8').split('\n');
    const binCapacity = parseInt(data[0].trim());
    const itens = data[1].split(' ').map(Number);

    const startTime = process.hrtime();
    const result = binPackingFirstFit(itens, binCapacity);
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
