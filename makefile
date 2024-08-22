# Variáveis
CXX = g++            # Compilador C++
CXXFLAGS = -Wall -g  # Flags de compilação
SRCDIR = src         # Diretório dos arquivos fonte
TARGET1 = algoritmo_forcaB       # Nome do executável para algoritmo_forcaB
TARGET2 = algoritmo_aproximado       # Nome do executável para algoritmo_aproximado

# Arquivos de origem específicos
SRC1 = $(SRCDIR)/algoritmo_forcaB.cpp
SRC2 = $(SRCDIR)/algoritmo_aproximado.cpp

# Arquivos objeto correspondentes
OBJ1 = $(SRC1:.cpp=.o)
OBJ2 = $(SRC2:.cpp=.o)

# Regra padrão (compila todos os algoritmos)
all: $(TARGET1) $(TARGET2)

# Regra para construir o executável do algoritmo_forcaB
$(TARGET1): $(OBJ1)
	$(CXX) $(CXXFLAGS) -o $(TARGET1) $(OBJ1)

# Regra para construir o executável do algoritmo_aproximado
$(TARGET2): $(OBJ2)
	$(CXX) $(CXXFLAGS) -o $(TARGET2) $(OBJ2)

# Regra para compilar os arquivos .cpp em .o para algoritmo_forcaB
$(SRCDIR)/algoritmo_forcaB.o: $(SRCDIR)/algoritmo_forcaB.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

# Regra para compilar os arquivos .cpp em .o para algoritmo_aproximado
$(SRCDIR)/algoritmo_aproximado.o: $(SRCDIR)/algoritmo_aproximado.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

# Limpar arquivos compilados
clean:
	rm -f $(SRCDIR)/*.o $(TARGET1) $(TARGET2)

# Regra para executar o algoritmo_forcaB
run_algoritmo_forcaB: $(TARGET1)
	./$(TARGET1)

# Regra para executar o algoritmo_aproximado
run_algoritmo_aproximado: $(TARGET2)
	./$(TARGET2)