import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-livre-estruturas',
  moduleId: 'estruturas',
  title: 'Projeto Livre: Fila de Atendimento',
  description:
    'Implemente uma Fila (Queue) completa para simular um sistema de atendimento ao cliente.',
  order: 7,
  estimatedMinutes: 30,
  type: 'free-project',
  sections: [],
  freeProject: {
    id: 'fp-estruturas',
    title: 'Fila de Atendimento ao Cliente',
    language: 'python',
    scenario:
      'Um banco precisa de um sistema de fila de atendimento. Clientes entram na fila (enqueue) e são atendidos na ordem de chegada (dequeue — o primeiro a entrar é o primeiro a sair).',
    objective:
      'Implementar uma classe Fila com enqueue, dequeue, frente e esta_vazia, depois simular um atendimento.',
    requirements: [
      'Classe Fila com: enqueue(valor) adiciona ao final, dequeue() remove do início',
      'Métodos frente() retorna o primeiro sem remover, e esta_vazia() retorna True/False',
      'Simular: enqueue de "Alice", "Bob", "Carlos". Depois dequeue dois e exibir quem foi atendido',
      'Ao final exibir "Proximo na fila: <nome>"',
    ],
    starterCode:
      '# Fila de Atendimento\nclass Fila:\n    def __init__(self):\n        self.dados = []\n\n    def enqueue(self, valor):\n        pass\n\n    def dequeue(self):\n        pass\n\n    def frente(self):\n        pass\n\n    def esta_vazia(self):\n        pass\n\n# Simule o atendimento\nf = Fila()\nf.enqueue("Alice")\nf.enqueue("Bob")\nf.enqueue("Carlos")\n# Atenda os dois primeiros\n# Exiba: "Atendido: <nome>"\n# Exiba: "Proximo na fila: <nome>"\n',
    solution:
      'class Fila:\n    def __init__(self):\n        self.dados = []\n\n    def enqueue(self, valor):\n        self.dados.append(valor)\n\n    def dequeue(self):\n        if len(self.dados) == 0:\n            return None\n        return self.dados.pop(0)\n\n    def frente(self):\n        if len(self.dados) == 0:\n            return None\n        return self.dados[0]\n\n    def esta_vazia(self):\n        return len(self.dados) == 0\n\nf = Fila()\nf.enqueue("Alice")\nf.enqueue("Bob")\nf.enqueue("Carlos")\nprint("Atendido:", f.dequeue())\nprint("Atendido:", f.dequeue())\nprint("Proximo na fila:", f.frente())',
    hints: [
      'enqueue: use append() para adicionar ao final.',
      'dequeue: use pop(0) para remover do início (primeiro elemento).',
      'frente: retorne self.dados[0] sem remover.',
    ],
    testCases: [
      {
        description: 'Alice e Bob atendidos; Carlos fica como próximo',
        inputs: [],
        expectedOutput: 'Atendido: Alice\nAtendido: Bob\nProximo na fila: Carlos',
      },
    ],
  },
};
