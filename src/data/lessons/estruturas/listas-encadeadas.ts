import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'listas-encadeadas',
  moduleId: 'estruturas',
  title: 'Listas Encadeadas',
  description: 'Entenda listas encadeadas, uma alternativa flexivel aos arrays.',
  order: 2,
  type: 'lesson',
  estimatedMinutes: 18,
  sections: [
    {
      type: 'text',
      content: 'Uma **lista encadeada** e uma colecao de elementos onde cada elemento (chamado **no**) contem um valor e um ponteiro para o proximo no.\n\nImagine um trem: cada vagao (no) esta conectado ao proximo. Para chegar ao vagao 5, voce precisa passar pelos vagoes 1, 2, 3 e 4.',
    },
    {
      type: 'text',
      content: '## Implementando em C\n\nEm C, cada no e uma `struct` com dois campos. Para criar nos em quantidade dinamica, usamos funcoes de alocacao de memoria:\n\n- **`malloc(tamanho)`** — aloca memoria e retorna um ponteiro para o espaco reservado\n- **`sizeof(No)`** — calcula automaticamente quantos bytes um `No` ocupa\n- **`->`** — acessa campos de uma struct pelo ponteiro (ex: `novo->valor` e o mesmo que `(*novo).valor`)\n- **`NULL`** — valor especial que indica "ponteiro vazio", usado para marcar o fim da lista',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'lista_encadeada.c',
        code: `#include <stdio.h>
#include <stdlib.h>

// Definindo o no
typedef struct No {
    int valor;
    struct No *proximo;
} No;

// Criando um novo no
No* criarNo(int valor) {
    No *novo = (No *)malloc(sizeof(No));
    novo->valor = valor;
    novo->proximo = NULL;
    return novo;
}

int main() {
    // Criando a lista: 10 -> 20 -> 30
    No *inicio = criarNo(10);
    inicio->proximo = criarNo(20);
    inicio->proximo->proximo = criarNo(30);

    // Percorrendo a lista
    No *atual = inicio;
    while (atual != NULL) {
        printf("%d -> ", atual->valor);
        atual = atual->proximo;
    }
    printf("NULL\\n");
    // Saida: 10 -> 20 -> 30 -> NULL

    return 0;
}`,
        description: 'Cada no contem um valor e um ponteiro para o proximo no.',
      },
    },
    {
      type: 'text',
      content: 'Comparacao com arrays:\n\n**Array**: Acesso rapido O(1), insercao lenta no meio O(n), tamanho fixo\n\n**Lista encadeada**: Acesso lento O(n), insercao rapida O(1) se tiver o ponteiro, tamanho dinamico',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Listas encadeadas sao a base para muitas estruturas: pilhas, filas, grafos e tabelas hash. Entender ponteiros e essencial para domina-las!',
    },
  ],
  challenges: [
    {
      id: 'listas-enc-challenge-1',
      title: 'Implementar uma Lista Encadeada Simples',
      description:
        'Implemente uma lista encadeada com as operacoes: inserir_no_fim (valor), exibir (retorna lista de valores) e tamanho. Cada no deve ter um valor e um ponteiro para o proximo.',
      language: 'python',
      starterCode: `class No:
    def __init__(self, valor):
        self.valor = valor
        self.proximo = None

class ListaEncadeada:
    def __init__(self):
        self.inicio = None

    def inserir_no_fim(self, valor):
        # Insira um novo no no final da lista
        pass

    def exibir(self):
        # Retorne uma lista Python com todos os valores
        # Ex: [10, 20, 30]
        pass

    def tamanho(self):
        # Retorne a quantidade de nos na lista
        pass

# Testes
lista = ListaEncadeada()
lista.inserir_no_fim(10)
lista.inserir_no_fim(20)
lista.inserir_no_fim(30)
print(lista.exibir())    # [10, 20, 30]
print(lista.tamanho())   # 3`,
      solution: `class No:
    def __init__(self, valor):
        self.valor = valor
        self.proximo = None

class ListaEncadeada:
    def __init__(self):
        self.inicio = None

    def inserir_no_fim(self, valor):
        novo = No(valor)
        if self.inicio is None:
            self.inicio = novo
            return
        atual = self.inicio
        while atual.proximo is not None:
            atual = atual.proximo
        atual.proximo = novo

    def exibir(self):
        valores = []
        atual = self.inicio
        while atual is not None:
            valores.append(atual.valor)
            atual = atual.proximo
        return valores

    def tamanho(self):
        contador = 0
        atual = self.inicio
        while atual is not None:
            contador += 1
            atual = atual.proximo
        return contador

# Testes
lista = ListaEncadeada()
lista.inserir_no_fim(10)
lista.inserir_no_fim(20)
lista.inserir_no_fim(30)
print(lista.exibir())    # [10, 20, 30]
print(lista.tamanho())   # 3`,
      hints: [
        'Para inserir no fim, percorra a lista ate encontrar um no cujo "proximo" e None.',
        'Para exibir, percorra do inicio ate o fim coletando os valores em uma lista Python.',
        'Nao esqueca de tratar o caso especial: quando a lista esta vazia (self.inicio e None).',
      ],
    },
    {
      id: 'listas-enc-challenge-2',
      title: 'Encontrar o Elemento do Meio',
      description:
        'Dado uma lista encadeada (com os metodos inserir_no_fim, exibir e tamanho do desafio anterior), implemente o metodo elemento_do_meio() que retorna o valor do elemento do meio. Se a lista tiver numero par de elementos, retorne o segundo dos dois elementos centrais.',
      language: 'python',
      starterCode: `class No:
    def __init__(self, valor):
        self.valor = valor
        self.proximo = None

class ListaEncadeada:
    def __init__(self):
        self.inicio = None

    def inserir_no_fim(self, valor):
        novo = No(valor)
        if self.inicio is None:
            self.inicio = novo
            return
        atual = self.inicio
        while atual.proximo is not None:
            atual = atual.proximo
        atual.proximo = novo

    def tamanho(self):
        contador = 0
        atual = self.inicio
        while atual is not None:
            contador += 1
            atual = atual.proximo
        return contador

    def elemento_do_meio(self):
        # 1. Use tamanho() para saber o total de nos
        # 2. Calcule o indice do meio (total // 2)
        # 3. Percorra a lista ate o indice do meio
        # 4. Retorne o valor desse no
        pass

# Testes
lista = ListaEncadeada()
for v in [10, 20, 30, 40, 50]:
    lista.inserir_no_fim(v)
print(lista.elemento_do_meio())   # 30 (indice 2 de 5)

lista2 = ListaEncadeada()
for v in [1, 2, 3, 4]:
    lista2.inserir_no_fim(v)
print(lista2.elemento_do_meio())  # 3 (segundo dos dois centrais)`,
      solution: `class No:
    def __init__(self, valor):
        self.valor = valor
        self.proximo = None

class ListaEncadeada:
    def __init__(self):
        self.inicio = None

    def inserir_no_fim(self, valor):
        novo = No(valor)
        if self.inicio is None:
            self.inicio = novo
            return
        atual = self.inicio
        while atual.proximo is not None:
            atual = atual.proximo
        atual.proximo = novo

    def tamanho(self):
        contador = 0
        atual = self.inicio
        while atual is not None:
            contador += 1
            atual = atual.proximo
        return contador

    def elemento_do_meio(self):
        total = self.tamanho()
        meio = total // 2
        atual = self.inicio
        for _ in range(meio):
            atual = atual.proximo
        return atual.valor

lista = ListaEncadeada()
for v in [10, 20, 30, 40, 50]:
    lista.inserir_no_fim(v)
print(lista.elemento_do_meio())   # 30

lista2 = ListaEncadeada()
for v in [1, 2, 3, 4]:
    lista2.inserir_no_fim(v)
print(lista2.elemento_do_meio())  # 3`,
      hints: [
        'Primeiro calcule o tamanho total com self.tamanho(). Depois calcule meio = total // 2.',
        'Percorra a lista com um for loop: for _ in range(meio): atual = atual.proximo',
        'Depois do loop, atual aponta para o no do meio. Retorne atual.valor.',
      ],
    },
    {
      id: 'listas-enc-challenge-3',
      title: 'Buscar um Valor na Lista Encadeada',
      description:
        'Implemente o metodo buscar(valor) que percorre a lista encadeada e retorna True se o valor for encontrado, ou False caso contrario. Implemente tambem remover(valor) que remove a primeira ocorrencia de um valor.',
      language: 'python',
      starterCode: `class No:
    def __init__(self, valor):
        self.valor = valor
        self.proximo = None

class ListaEncadeada:
    def __init__(self):
        self.inicio = None

    def inserir_no_fim(self, valor):
        novo = No(valor)
        if self.inicio is None:
            self.inicio = novo
            return
        atual = self.inicio
        while atual.proximo is not None:
            atual = atual.proximo
        atual.proximo = novo

    def exibir(self):
        valores = []
        atual = self.inicio
        while atual is not None:
            valores.append(atual.valor)
            atual = atual.proximo
        return valores

    def buscar(self, valor):
        # Retorne True se o valor existir na lista, False caso contrario
        pass

    def remover(self, valor):
        # Remova a primeira ocorrencia do valor na lista
        # Retorne True se removeu, False se nao encontrou
        pass

# Testes
lista = ListaEncadeada()
lista.inserir_no_fim(10)
lista.inserir_no_fim(20)
lista.inserir_no_fim(30)
print(lista.buscar(20))     # True
print(lista.buscar(99))     # False
print(lista.remover(20))    # True
print(lista.exibir())       # [10, 30]
print(lista.remover(10))    # True
print(lista.exibir())       # [30]`,
      solution: `class No:
    def __init__(self, valor):
        self.valor = valor
        self.proximo = None

class ListaEncadeada:
    def __init__(self):
        self.inicio = None

    def inserir_no_fim(self, valor):
        novo = No(valor)
        if self.inicio is None:
            self.inicio = novo
            return
        atual = self.inicio
        while atual.proximo is not None:
            atual = atual.proximo
        atual.proximo = novo

    def exibir(self):
        valores = []
        atual = self.inicio
        while atual is not None:
            valores.append(atual.valor)
            atual = atual.proximo
        return valores

    def buscar(self, valor):
        atual = self.inicio
        while atual is not None:
            if atual.valor == valor:
                return True
            atual = atual.proximo
        return False

    def remover(self, valor):
        if self.inicio is None:
            return False
        # Caso especial: remover o primeiro no
        if self.inicio.valor == valor:
            self.inicio = self.inicio.proximo
            return True
        atual = self.inicio
        while atual.proximo is not None:
            if atual.proximo.valor == valor:
                atual.proximo = atual.proximo.proximo
                return True
            atual = atual.proximo
        return False

# Testes
lista = ListaEncadeada()
lista.inserir_no_fim(10)
lista.inserir_no_fim(20)
lista.inserir_no_fim(30)
print(lista.buscar(20))     # True
print(lista.buscar(99))     # False
print(lista.remover(20))    # True
print(lista.exibir())       # [10, 30]
print(lista.remover(10))    # True
print(lista.exibir())       # [30]`,
      hints: [
        'Para buscar, percorra a lista comparando cada no.valor com o valor buscado.',
        'Para remover, voce precisa do no ANTERIOR ao que sera removido, para ajustar o ponteiro.',
        'Trate o caso especial de remover o primeiro no (self.inicio) separadamente.',
      ],
    },
  ],
};
