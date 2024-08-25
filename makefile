NODE = node
NVM_DIR = $(HOME)/.nvm
REQUIRED_NODE_VERSION = 14.0.0
SRCDIR = ./src
TESTDIR = ./testes
SCRIPT1 = $(SRCDIR)/binPackingBacktracking.js
SCRIPT2 = $(SRCDIR)/binPackingFirstFit.js
DEFAULT_INPUT = in-1.txt

# Preparação do ambiente
all:
	@if [ -s "$(NVM_DIR)/nvm.sh" ]; then \
		echo "Carregando nvm..."; \
		. "$(NVM_DIR)/nvm.sh"; \
		make check_node_with_nvm; \
	else \
		echo "nvm não encontrado."; \
		if command -v $(NODE) &> /dev/null; then \
			echo "Node.js encontrado."; \
			make check_node_version; \
		else \
			echo "Node.js não encontrado. Instalando Node.js..."; \
			make install_node_without_nvm; \
		fi \
	fi

# Verifica a versão do Node.js usando nvm
check_node_with_nvm:
	@. "$(NVM_DIR)/nvm.sh"; \
	CURRENT_VERSION=$$(nvm current); \
	if [ "$$(echo $$CURRENT_VERSION | grep $(REQUIRED_NODE_VERSION))" != "" ]; then \
		echo "Versão do Node.js ($$CURRENT_VERSION) está correta."; \
	else \
		echo "Versão do Node.js ($$CURRENT_VERSION) está incorreta. Instalando a versão correta..."; \
		nvm install $(REQUIRED_NODE_VERSION); \
		nvm use $(REQUIRED_NODE_VERSION); \
	fi

# Verifica a versão do Node.js sem nvm
check_node_version:
	@CURRENT_VERSION=$$($(NODE) -v | sed 's/v//'); \
	if [ "$$(echo $(REQUIRED_NODE_VERSION) $$CURRENT_VERSION | awk '{print ($$2 >= $$1)}')" = "1" ]; then \
		echo "Versão do Node.js ($$CURRENT_VERSION) está correta."; \
	else \
		echo "Versão do Node.js ($$CURRENT_VERSION) está incorreta. Desinstalando e instalando a versão correta..."; \
		make install_node_without_nvm; \
	fi

# Instalação do Node.js diretamente (sem nvm)
install_node_without_nvm:
	@echo "Instalando Node.js..."; \
	sudo apt-get remove --purge nodejs -y || true; \
	sudo apt-get install -y curl; \
	curl -fsSL https://deb.nodesource.com/setup_$(REQUIRED_NODE_VERSION).x | sudo -E bash -; \
	sudo apt-get install -y nodejs; \
	node -v

# Regra para rodar ambos os algoritmos com o arquivo padrão ou especificado
run:
	$(NODE) $(SCRIPT1) $(TESTDIR)/$(input)
	$(NODE) $(SCRIPT2) $(TESTDIR)/$(input)

# Regras para rodar testes individuais de força bruta
run_bruteforce-1:
	$(NODE) $(SCRIPT1) $(TESTDIR)/in-1.txt

run_bruteforce-2:
	$(NODE) $(SCRIPT1) $(TESTDIR)/in-2.txt

run_bruteforce-3:
	$(NODE) $(SCRIPT1) $(TESTDIR)/in-3.txt

run_bruteforce-4:
	$(NODE) $(SCRIPT1) $(TESTDIR)/in-4.txt

run_bruteforce-5:
	$(NODE) $(SCRIPT1) $(TESTDIR)/in-5.txt

run_bruteforce-6:
	$(NODE) $(SCRIPT1) $(TESTDIR)/in-6.txt

run_bruteforce-7:
	$(NODE) $(SCRIPT1) $(TESTDIR)/in-7.txt

run_bruteforce-8:
	$(NODE) $(SCRIPT1) $(TESTDIR)/in-8.txt

run_bruteforce-9:
	$(NODE) $(SCRIPT1) $(TESTDIR)/in-9.txt

run_bruteforce-10:
	$(NODE) $(SCRIPT1) $(TESTDIR)/in-10.txt

# Regras para rodar testes individuais com heurística
run_firstfit-1:
	$(NODE) $(SCRIPT2) $(TESTDIR)/in-1.txt

run_firstfit-2:
	$(NODE) $(SCRIPT2) $(TESTDIR)/in-2.txt

run_firstfit-3:
	$(NODE) $(SCRIPT2) $(TESTDIR)/in-3.txt

run_firstfit-4:
	$(NODE) $(SCRIPT2) $(TESTDIR)/in-4.txt

run_firstfit-5:
	$(NODE) $(SCRIPT2) $(TESTDIR)/in-5.txt

run_firstfit-6:
	$(NODE) $(SCRIPT2) $(TESTDIR)/in-6.txt

run_firstfit-7:
	$(NODE) $(SCRIPT2) $(TESTDIR)/in-7.txt

run_firstfit-8:
	$(NODE) $(SCRIPT2) $(TESTDIR)/in-8.txt

run_firstfit-9:
	$(NODE) $(SCRIPT2) $(TESTDIR)/in-9.txt

run_firstfit-10:
	$(NODE) $(SCRIPT2) $(TESTDIR)/in-10.txt

# Valor padrão para a variável input
input ?= $(DEFAULT_INPUT)

# Limpar arquivos de logs
clean:
	rm -f *.log
