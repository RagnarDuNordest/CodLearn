import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'pilhas-e-filas',
  moduleId: 'estruturas',
  title: 'Pilhas e Filas',
  description: 'Aprenda duas estruturas essenciais: pilhas (LIFO) e filas (FIFO).',
  order: 1,
  type: 'lesson',
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content: '**Pilhas** e **filas** sao estruturas que controlam a ordem de acesso aos dados.\n\n**Pilha (Stack)** — Como uma pilha de pratos: o ultimo a entrar e o primeiro a sair. Isso se chama **LIFO** (Last In, First Out).\n\n**Fila (Queue)** — Como uma fila de banco: o primeiro a entrar e o primeiro a sair. Isso se chama **FIFO** (First In, First Out).',
    },
    {
      type: 'text',
      content: '## Pilha na Pratica\n\nEm Python, uma lista comum funciona perfeitamente como pilha. Os dois metodos principais sao:\n- **`append(item)`** — empilha um item no topo\n- **`pop()`** — desempilha e retorna o item do topo\n- **`lista[-1]`** — espia o topo sem remover (peek)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'pilha.py',
        code: `# Pilha usando lista em Python
pilha = []

# Push: adicionar no topo
pilha.append("A")
pilha.append("B")
pilha.append("C")
print(pilha)  # ['A', 'B', 'C']

# Pop: remover do topo (ultimo)
topo = pilha.pop()
print(topo)    # C
print(pilha)   # ['A', 'B']

# Peek: ver o topo sem remover
print(pilha[-1])  # B`,
        description: 'Uma pilha: append() empilha, pop() desempilha, sempre pelo topo.',
      },
    },
    {
      type: 'text',
      content: '## Fila na Pratica\n\nPara filas, usamos o **`deque`** (pronuncia-se "deck") do modulo `collections`. Por que nao usar uma lista comum? Porque remover o primeiro elemento de uma lista e lento O(n) — o Python precisa mover todos os outros elementos. O `deque` foi projetado para isso e faz adicao e remocao nas duas pontas em O(1).\n\nOs metodos principais sao:\n- **`append(item)`** — adiciona no final da fila (entrar na fila)\n- **`popleft()`** — remove e retorna o primeiro (ser atendido)\n- **`fila[0]`** — espia o proximo sem remover',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'fila.py',
        code: `from collections import deque

# Fila usando deque
fila = deque()

# Enqueue: adicionar no final
fila.append("Pessoa 1")
fila.append("Pessoa 2")
fila.append("Pessoa 3")
print(list(fila))  # ['Pessoa 1', 'Pessoa 2', 'Pessoa 3']

# Dequeue: remover do inicio (primeiro)
primeiro = fila.popleft()
print(primeiro)     # Pessoa 1
print(list(fila))   # ['Pessoa 2', 'Pessoa 3']`,
        description: 'Uma fila: enqueue adiciona no final, dequeue remove do inicio.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'Onde pilhas sao usadas? Botao "desfazer" (Ctrl+Z), historico de navegacao do browser, chamadas de funcao (call stack). Filas? Impressoras, atendimento, filas de mensagens.',
    },
  ],
  challenges: [
    {
      id: 'pilhas-filas-challenge-1',
      title: 'Implementar uma Pilha com Operacoes',
      description:
        'Implemente uma classe Pilha com os metodos: empilhar (push), desempilhar (pop), topo (peek) e esta_vazia. O metodo desempilhar e topo devem retornar None se a pilha estiver vazia.',
      language: 'python',
      starterCode: `class Pilha:
    def __init__(self):
        # Inicialize a estrutura interna da pilha
        pass

    def empilhar(self, valor):
        # Adicione um valor no topo da pilha
        pass

    def desempilhar(self):
        # Remova e retorne o valor do topo
        # Retorne None se a pilha estiver vazia
        pass

    def topo(self):
        # Retorne o valor do topo sem remover
        # Retorne None se a pilha estiver vazia
        pass

    def esta_vazia(self):
        # Retorne True se a pilha estiver vazia
        pass

# Testes
p = Pilha()
print(p.esta_vazia())    # True
p.empilhar(10)
p.empilhar(20)
p.empilhar(30)
print(p.topo())          # 30
print(p.desempilhar())   # 30
print(p.desempilhar())   # 20
print(p.topo())          # 10
print(p.esta_vazia())    # False`,
      solution: `class Pilha:
    def __init__(self):
        self.itens = []

    def empilhar(self, valor):
        self.itens.append(valor)

    def desempilhar(self):
        if self.esta_vazia():
            return None
        return self.itens.pop()

    def topo(self):
        if self.esta_vazia():
            return None
        return self.itens[-1]

    def esta_vazia(self):
        return len(self.itens) == 0

# Testes
p = Pilha()
print(p.esta_vazia())    # True
p.empilhar(10)
p.empilhar(20)
p.empilhar(30)
print(p.topo())          # 30
print(p.desempilhar())   # 30
print(p.desempilhar())   # 20
print(p.topo())          # 10
print(p.esta_vazia())    # False`,
      hints: [
        'Use uma lista Python (self.itens = []) como estrutura interna.',
        'append() adiciona no final (topo) e pop() remove do final (topo).',
        'Para ver o topo sem remover, use self.itens[-1] (ultimo elemento).',
      ],
    },
    {
      id: 'pilhas-filas-challenge-2',
      title: 'Verificar Parenteses Balanceados',
      description:
        'Escreva uma funcao que verifica se uma string tem parenteses, colchetes e chaves balanceados. Ex: "({[]})" e valida, "({[})" nao e valida.',
      language: 'python',
      starterCode: `def parenteses_balanceados(texto):
    # Verifique se os parenteses, colchetes e chaves estao balanceados
    # Use uma pilha!
    # Retorne True se balanceado, False caso contrario
    pass

# Testes
print(parenteses_balanceados("({[]})"))     # True
print(parenteses_balanceados("()[]{}"))     # True
print(parenteses_balanceados("({[})"))      # False
print(parenteses_balanceados("((()"))       # False
print(parenteses_balanceados(""))           # True`,
      solution: `def parenteses_balanceados(texto):
    pilha = []
    pares = {')': '(', ']': '[', '}': '{'}

    for char in texto:
        if char in '([{':
            pilha.append(char)
        elif char in ')]}':
            if len(pilha) == 0:
                return False
            if pilha[-1] != pares[char]:
                return False
            pilha.pop()

    return len(pilha) == 0

# Testes
print(parenteses_balanceados("({[]})"))     # True
print(parenteses_balanceados("()[]{}"))     # True
print(parenteses_balanceados("({[})"))      # False
print(parenteses_balanceados("((()"))       # False
print(parenteses_balanceados(""))           # True`,
      hints: [
        'Use uma pilha (lista). Empilhe cada caractere de abertura: (, [, {.',
        'Ao encontrar um fechamento (), ], }), verifique se o topo da pilha tem o par correspondente.',
        'No final, a pilha deve estar vazia se tudo estiver balanceado.',
      ],
    },
    {
      id: 'pilhas-filas-challenge-3',
      title: 'Simulador de Fila de Atendimento',
      description:
        'Implemente uma classe FilaAtendimento que simula uma fila de banco. Deve ter: adicionar_cliente (nome), atender (remove e retorna o proximo), proximo (mostra sem remover) e tamanho.',
      language: 'python',
      starterCode: `from collections import deque

class FilaAtendimento:
    def __init__(self):
        # Inicialize a fila
        pass

    def adicionar_cliente(self, nome):
        # Adicione um cliente ao final da fila
        pass

    def atender(self):
        # Atenda (remova) o proximo cliente da fila
        # Retorne o nome do cliente ou None se a fila estiver vazia
        pass

    def proximo(self):
        # Retorne o nome do proximo sem remover
        # Retorne None se a fila estiver vazia
        pass

    def tamanho(self):
        # Retorne a quantidade de clientes na fila
        pass

# Testes
fila = FilaAtendimento()
fila.adicionar_cliente("Ana")
fila.adicionar_cliente("Bruno")
fila.adicionar_cliente("Carlos")
print(fila.tamanho())     # 3
print(fila.proximo())     # Ana
print(fila.atender())     # Ana
print(fila.atender())     # Bruno
print(fila.tamanho())     # 1
print(fila.proximo())     # Carlos`,
      solution: `from collections import deque

class FilaAtendimento:
    def __init__(self):
        self.fila = deque()

    def adicionar_cliente(self, nome):
        self.fila.append(nome)

    def atender(self):
        if self.tamanho() == 0:
            return None
        return self.fila.popleft()

    def proximo(self):
        if self.tamanho() == 0:
            return None
        return self.fila[0]

    def tamanho(self):
        return len(self.fila)

# Testes
fila = FilaAtendimento()
fila.adicionar_cliente("Ana")
fila.adicionar_cliente("Bruno")
fila.adicionar_cliente("Carlos")
print(fila.tamanho())     # 3
print(fila.proximo())     # Ana
print(fila.atender())     # Ana
print(fila.atender())     # Bruno
print(fila.tamanho())     # 1
print(fila.proximo())     # Carlos`,
      hints: [
        'Use deque() do modulo collections como estrutura interna.',
        'append() adiciona no final da fila e popleft() remove do inicio.',
        'Para ver o proximo sem remover, acesse self.fila[0].',
      ],
    },
  ],
};
