import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-guiado-estruturas',
  moduleId: 'estruturas',
  title: 'Projeto: Pilha do Zero',
  description:
    'Implemente uma Pilha (Stack) completa do zero usando apenas listas Python — a estrutura de dados mais usada em sistemas reais.',
  order: 6,
  estimatedMinutes: 35,
  type: 'guided-project',
  sections: [],
  guidedProject: {
    id: 'gp-estruturas',
    title: 'Implementando uma Pilha (Stack)',
    language: 'python',
    scenario:
      'Você foi contratado por uma empresa de desenvolvimento de compiladores. O compilador precisa de uma pilha para verificar se parênteses, chaves e colchetes estão balanceados no código-fonte. Você vai construir a pilha do zero.',
    objective:
      'Implementar uma classe Pilha com os métodos push (empilhar), pop (desempilhar), topo e esta_vazia usando apenas listas Python.',
    steps: [
      {
        id: 'gp-est-s1',
        title: 'Criar push e mostrar o topo',
        description:
          'Crie a classe Pilha com __init__ (lista vazia), método push(valor) que adiciona ao topo, e topo() que retorna o último elemento. Teste empilhando 3 valores.',
        starterCode:
          '# Etapa 1: Pilha com push e topo\nclass Pilha:\n    def __init__(self):\n        self.dados = []\n\n    def push(self, valor):\n        # Adicione valor ao final da lista\n        pass\n\n    def topo(self):\n        # Retorne o ultimo elemento sem remover\n        # Se vazia, retorne None\n        pass\n\np = Pilha()\np.push(10)\np.push(20)\np.push(30)\nprint("Topo:", p.topo())\n',
        solution:
          'class Pilha:\n    def __init__(self):\n        self.dados = []\n\n    def push(self, valor):\n        self.dados.append(valor)\n\n    def topo(self):\n        if len(self.dados) == 0:\n            return None\n        return self.dados[-1]\n\np = Pilha()\np.push(10)\np.push(20)\np.push(30)\nprint("Topo:", p.topo())',
        hints: [
          'self.dados.append(valor) adiciona ao final da lista.',
          'self.dados[-1] acessa o último elemento (o topo da pilha).',
        ],
        testCases: [
          {
            description: 'Topo após push(10), push(20), push(30) é 30',
            inputs: [],
            expectedOutput: 'Topo: 30',
          },
        ],
      },
      {
        id: 'gp-est-s2',
        title: 'Adicionar pop e tamanho',
        description:
          'Adicione o método pop() que remove e retorna o elemento do topo (ou None se vazia), e tamanho() que retorna o número de elementos.',
        starterCode:
          '# Etapa 2: pop e tamanho\nclass Pilha:\n    def __init__(self):\n        self.dados = []\n\n    def push(self, valor):\n        self.dados.append(valor)\n\n    def topo(self):\n        if len(self.dados) == 0:\n            return None\n        return self.dados[-1]\n\n    def pop(self):\n        # Se vazia, retorne None\n        # Caso contrario, remova e retorne o ultimo\n        pass\n\n    def tamanho(self):\n        # Retorne o numero de elementos\n        pass\n\np = Pilha()\np.push(10)\np.push(20)\np.push(30)\nprint("Tamanho:", p.tamanho())\nprint("Pop:", p.pop())\nprint("Tamanho apos pop:", p.tamanho())\n',
        solution:
          'class Pilha:\n    def __init__(self):\n        self.dados = []\n\n    def push(self, valor):\n        self.dados.append(valor)\n\n    def topo(self):\n        if len(self.dados) == 0:\n            return None\n        return self.dados[-1]\n\n    def pop(self):\n        if len(self.dados) == 0:\n            return None\n        return self.dados.pop()\n\n    def tamanho(self):\n        return len(self.dados)\n\np = Pilha()\np.push(10)\np.push(20)\np.push(30)\nprint("Tamanho:", p.tamanho())\nprint("Pop:", p.pop())\nprint("Tamanho apos pop:", p.tamanho())',
        hints: [
          'self.dados.pop() remove e retorna o último elemento da lista.',
          'len(self.dados) retorna o tamanho.',
        ],
        testCases: [
          {
            description: 'Tamanho 3, pop retorna 30, tamanho vira 2',
            inputs: [],
            expectedOutput: 'Tamanho: 3\nPop: 30\nTamanho apos pop: 2',
          },
        ],
      },
      {
        id: 'gp-est-s3',
        title: 'Verificar parênteses balanceados',
        description:
          'Use sua Pilha para verificar se uma expressão tem parênteses balanceados. Para cada "(" faça push; para cada ")" faça pop. Se a pilha ficar vazia ao final E nunca tentar pop em pilha vazia, a expressão é válida.',
        starterCode:
          '# Etapa 3: Verificador de parenteses\nclass Pilha:\n    def __init__(self):\n        self.dados = []\n    def push(self, v):\n        self.dados.append(v)\n    def pop(self):\n        if len(self.dados) == 0:\n            return None\n        return self.dados.pop()\n    def esta_vazia(self):\n        return len(self.dados) == 0\n\ndef verificar_parenteses(expressao):\n    p = Pilha()\n    for char in expressao:\n        if char == "(":\n            p.push(char)\n        elif char == ")":\n            if p.pop() is None:\n                return "Invalido"\n    if p.esta_vazia():\n        return "Valido"\n    return "Invalido"\n\nprint(verificar_parenteses("(a + b) * (c - d)"))\nprint(verificar_parenteses("((x + y)"))\nprint(verificar_parenteses("(a) + (b) * (c)"))\n',
        solution:
          'class Pilha:\n    def __init__(self):\n        self.dados = []\n    def push(self, v):\n        self.dados.append(v)\n    def pop(self):\n        if len(self.dados) == 0:\n            return None\n        return self.dados.pop()\n    def esta_vazia(self):\n        return len(self.dados) == 0\n\ndef verificar_parenteses(expressao):\n    p = Pilha()\n    for char in expressao:\n        if char == "(":\n            p.push(char)\n        elif char == ")":\n            if p.pop() is None:\n                return "Invalido"\n    if p.esta_vazia():\n        return "Valido"\n    return "Invalido"\n\nprint(verificar_parenteses("(a + b) * (c - d)"))\nprint(verificar_parenteses("((x + y)"))\nprint(verificar_parenteses("(a) + (b) * (c)"))',
        hints: [
          'Percorra a expressão: for char in expressao:',
          'Se char == "(": empilhe. Se char == ")": desempilhe.',
          'Se ao desempilhar a pilha estiver vazia (pop retorna None) → inválido.',
          'No final, se a pilha estiver vazia → válido.',
        ],
        testCases: [
          {
            description: 'Testa três expressões: Valido, Invalido, Valido',
            inputs: [],
            expectedOutput: 'Valido\nInvalido\nValido',
          },
        ],
      },
    ],
  },
};
