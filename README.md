# PROBLEMA DO BIN PACKING

## Algoritmos escolhidos pelo grupo:

- **First-Fit-Decreasing**: é um dos mais simples e eficientes, ele permite que o problema seja resolvido em tempo linear e consiste em colocar cada item em uma caixa, de modo que a soma dos pesos dos itens em cada caixa seja sempre menor ou igual ao tamanho da caixa.

- **Backtracking**: é um dos mais complexos e custosos, ele permite que o problema seja resolvido em tempo exponencial e consiste em tentar colocar cada item em uma caixa, de modo que a soma dos pesos dos itens em cada caixa seja sempre menor ou igual ao tamanho da caixa.


## Repositório no GitHub:
O repositório pode ser encontrado em: https://github.com/izaramos/problemas-classicos-BP.git

## Para executar:

Utilizamos o node para construção dos algoritmos.

Para certificar que a versão esteja correta, instale as dependências (mesmo que em sua máquina haja o node instalado, esse script vai reinstalar a versão correta (14)).

  1. **Instalando as dependências do node em sua máquina via terminal ou prompt de comando:**
  ```bash
   make
   ```
  
  2. **Executando o caso base (Teste número 1):**
  ```bash
   make run
   ```

  3. **Executando um caso específico para o backtracking (Teste 4):**
  ```bash
   node ./src/binPackingBacktracking.js ./testes/in-4.txt
   ```

  4. **Executando um caso específico para o FFD (Teste 4):**
  ```bash
   node ./src/binPackingFirstFit.js ./testes/in-4.txt
   ``` 