const fs = require('fs');

function binPackingFirstFit(sizes, binCapacity) {
    sizes.sort((a, b) => b - a);

    const bins = [];
    for (let size of sizes) {
        let placed = false;
        for (let bin of bins) {
            if (bin.reduce((a, b) => a + b, 0) + size <= binCapacity) {
                bin.push(size);
                placed = true;
                break;
            }
        }
        if (!placed) {
            bins.push([size]);
        }
    }
    return bins;
}

function main() {
    const inputFilePath = process.argv[2];
    
    const data = fs.readFileSync(inputFilePath, 'utf8').split('\n');
    const binCapacity = parseInt(data[0].trim());
    const sizes = data[1].split(' ').map(Number);

    const startTime = process.hrtime();
    const result = binPackingFirstFit(sizes, binCapacity);
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
