export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  tags: string[];
  tip?: string;
}

export const interviewQuestions: InterviewQuestion[] = [
  // Python Basics
  {
    id: 'q1', difficulty: 'Fácil', category: 'Python Básico',
    question: 'Qual a diferença entre lista e tupla em Python?',
    answer: 'Listas são mutáveis (podem ser modificadas após a criação) e usam colchetes `[]`. Tuplas são imutáveis (não podem ser alteradas) e usam parênteses `()`. Tuplas são mais rápidas e usadas para dados que não devem mudar.',
    tags: ['python', 'estruturas-de-dados'],
    tip: 'Lembre: Lista = Lata (pode modificar), Tupla = Tatuagem (permanente)'
  },
  {
    id: 'q2', difficulty: 'Fácil', category: 'Python Básico',
    question: 'O que é um dicionário em Python?',
    answer: 'Um dicionário é uma coleção de pares chave-valor. As chaves devem ser únicas e imutáveis. Dicionários são implementados como hash tables, garantindo busca em O(1). Exemplo: `{"nome": "Ana", "idade": 25}`.',
    tags: ['python', 'dicionarios'],
  },
  {
    id: 'q3', difficulty: 'Fácil', category: 'Python Básico',
    question: 'Para que serve a palavra-chave `pass` em Python?',
    answer: '`pass` é uma operação nula — não faz nada. É usada quando uma declaração é sintaticamente necessária mas você não quer executar nenhum código. Útil em funções/classes vazias durante o desenvolvimento.',
    tags: ['python', 'sintaxe'],
  },
  {
    id: 'q4', difficulty: 'Fácil', category: 'Python Básico',
    question: 'Qual a diferença entre `==` e `is` em Python?',
    answer: '`==` compara os **valores** de dois objetos. `is` compara a **identidade** — verifica se dois nomes apontam para o mesmo objeto na memória. Ex: `[1,2] == [1,2]` é True, mas `[1,2] is [1,2]` é False.',
    tags: ['python', 'operadores'],
    tip: '`is` é como perguntar "são a mesma pessoa?", `==` é como perguntar "têm o mesmo nome?"'
  },
  {
    id: 'q5', difficulty: 'Médio', category: 'Python Básico',
    question: 'O que são list comprehensions? Dê um exemplo.',
    answer: 'List comprehension é uma forma concisa de criar listas. Sintaxe: `[expressão for item in iterável if condição]`. Exemplo: `quadrados = [x**2 for x in range(10) if x % 2 == 0]` cria uma lista dos quadrados dos números pares de 0 a 9.',
    tags: ['python', 'listas', 'boas-praticas'],
  },
  {
    id: 'q6', difficulty: 'Médio', category: 'Python Básico',
    question: 'Explique o que é mutabilidade em Python.',
    answer: 'Objetos mutáveis podem ter seu conteúdo alterado após a criação (listas, dicionários, sets). Objetos imutáveis não podem ser modificados (int, float, str, tuple). Isso afeta como objetos são passados para funções e como são armazenados na memória.',
    tags: ['python', 'memoria'],
  },

  // Functions & OOP
  {
    id: 'q7', difficulty: 'Fácil', category: 'Funções & POO',
    question: 'O que é uma função recursiva? Qual o risco de usá-la?',
    answer: 'Uma função recursiva é aquela que chama a si mesma. Deve ter uma condição de parada (caso base) para não entrar em loop infinito. O risco é o `RecursionError` (stack overflow) se a profundidade for muito grande. Python tem limite padrão de ~1000 chamadas.',
    tags: ['funcoes', 'recursao'],
  },
  {
    id: 'q8', difficulty: 'Médio', category: 'Funções & POO',
    question: 'O que são *args e **kwargs em Python?',
    answer: '`*args` permite que uma função receba um número variável de argumentos posicionais (como uma tupla). `**kwargs` permite argumentos nomeados variáveis (como um dicionário). Ex: `def f(*args, **kwargs)` pode ser chamada com qualquer número de argumentos.',
    tags: ['python', 'funcoes'],
  },
  {
    id: 'q9', difficulty: 'Médio', category: 'Funções & POO',
    question: 'Explique os 4 pilares da Programação Orientada a Objetos.',
    answer: '1. **Encapsulamento**: agrupa dados e métodos, esconde detalhes internos. 2. **Herança**: uma classe pode herdar atributos/métodos de outra. 3. **Polimorfismo**: objetos de diferentes classes podem ser usados de forma intercambiável. 4. **Abstração**: expõe apenas o necessário, oculta complexidade.',
    tags: ['poo', 'conceitos'],
    tip: 'Memorize como EHPA ou o acrônimo A-PHE'
  },
  {
    id: 'q10', difficulty: 'Médio', category: 'Funções & POO',
    question: 'Qual a diferença entre método de instância, de classe e estático?',
    answer: 'Método de instância: recebe `self`, acessa atributos do objeto. Método de classe (`@classmethod`): recebe `cls`, acessa atributos da classe. Método estático (`@staticmethod`): não recebe `self` nem `cls`, é como uma função comum dentro da classe.',
    tags: ['poo', 'python'],
  },

  // Data Structures & Algorithms
  {
    id: 'q11', difficulty: 'Fácil', category: 'Estruturas de Dados',
    question: 'O que é uma pilha (stack) e qual sua estrutura de acesso?',
    answer: 'Uma pilha é uma estrutura LIFO (Last In, First Out) — o último elemento inserido é o primeiro a sair. Como uma pilha de pratos. Operações principais: push (inserir no topo) e pop (remover do topo). Em Python, pode ser implementada com lista usando `.append()` e `.pop()`.',
    tags: ['estruturas-de-dados', 'algoritmos'],
  },
  {
    id: 'q12', difficulty: 'Fácil', category: 'Estruturas de Dados',
    question: 'O que é uma fila (queue) e como difere de uma pilha?',
    answer: 'Uma fila é FIFO (First In, First Out) — o primeiro a entrar é o primeiro a sair. Como uma fila de banco. Ao contrário da pilha (LIFO). Em Python, use `collections.deque` para eficiência com `appendleft()` e `pop()` ou `append()` e `popleft()`.',
    tags: ['estruturas-de-dados', 'algoritmos'],
  },
  {
    id: 'q13', difficulty: 'Médio', category: 'Estruturas de Dados',
    question: 'Qual a diferença entre O(n) e O(1)? Dê exemplos.',
    answer: 'O(1) = tempo constante, independente do tamanho da entrada. Ex: acessar elemento de lista por índice, busca em dicionário. O(n) = tempo cresce linearmente com a entrada. Ex: busca linear em lista, percorrer todos os elementos. O(1) é sempre preferível para operações frequentes.',
    tags: ['algoritmos', 'complexidade'],
  },
  {
    id: 'q14', difficulty: 'Difícil', category: 'Estruturas de Dados',
    question: 'O que é uma árvore binária de busca (BST)?',
    answer: 'Uma BST é uma árvore onde cada nó tem no máximo 2 filhos. Para cada nó: todos os nós à esquerda têm valores menores, à direita maiores. Busca, inserção e remoção em O(log n) no melhor caso. Pode degenerar para O(n) se desbalanceada.',
    tags: ['estruturas-de-dados', 'algoritmos', 'avancado'],
  },

  // Web & General
  {
    id: 'q15', difficulty: 'Fácil', category: 'Web & Geral',
    question: 'O que é REST API?',
    answer: 'REST (Representational State Transfer) é um estilo arquitetural para APIs web. Usa métodos HTTP: GET (buscar), POST (criar), PUT/PATCH (atualizar), DELETE (remover). Stateless: cada requisição é independente. Recursos são identificados por URLs.',
    tags: ['web', 'api'],
  },
  {
    id: 'q16', difficulty: 'Fácil', category: 'Web & Geral',
    question: 'Qual a diferença entre GET e POST no HTTP?',
    answer: 'GET: busca dados, parâmetros ficam na URL, pode ser cacheado, não deve alterar dados no servidor. POST: envia dados no corpo da requisição, usado para criar/enviar dados, não é cacheado, mais seguro para dados sensíveis.',
    tags: ['web', 'http'],
  },
  {
    id: 'q17', difficulty: 'Médio', category: 'Web & Geral',
    question: 'O que é controle de versão e por que é importante?',
    answer: 'Controle de versão (como Git) rastreia mudanças em arquivos ao longo do tempo. Permite: voltar a versões anteriores, trabalhar em equipe sem conflitos, ver quem mudou o quê e quando, criar branches para desenvolver features sem afetar o código principal.',
    tags: ['git', 'ferramentas'],
  },
  {
    id: 'q18', difficulty: 'Médio', category: 'Web & Geral',
    question: 'O que é SQL e para que serve?',
    answer: 'SQL (Structured Query Language) é a linguagem para gerenciar bancos de dados relacionais. Comandos principais: SELECT (buscar), INSERT (inserir), UPDATE (atualizar), DELETE (remover), CREATE (criar tabelas), JOIN (combinar tabelas). Usada em PostgreSQL, MySQL, SQLite.',
    tags: ['banco-de-dados', 'sql'],
  },
  {
    id: 'q19', difficulty: 'Fácil', category: 'Web & Geral',
    question: 'O que significa DRY em programação?',
    answer: 'DRY = "Don\'t Repeat Yourself" (Não Se Repita). O princípio diz que cada peça de conhecimento deve ter uma representação única e definitiva no sistema. Evita duplicação de código, facilita manutenção: quando precisa mudar algo, muda em um lugar só.',
    tags: ['boas-praticas', 'principios'],
    tip: 'O oposto é WET: "Write Everything Twice" ou "We Enjoy Typing"'
  },
  {
    id: 'q20', difficulty: 'Médio', category: 'Web & Geral',
    question: 'O que é um algoritmo de ordenação? Cite 3 exemplos.',
    answer: 'Algoritmo de ordenação organiza elementos de uma coleção. Exemplos: 1. **Bubble Sort** O(n²) — simples mas lento. 2. **Merge Sort** O(n log n) — divide e conquista, eficiente. 3. **Quick Sort** O(n log n) médio — muito usado na prática. Python usa Timsort (híbrido Merge+Insertion).',
    tags: ['algoritmos', 'ordenacao'],
  },
  {
    id: 'q21', difficulty: 'Fácil', category: 'Python Básico',
    question: 'O que é `None` em Python?',
    answer: '`None` é o valor nulo em Python, similar ao `null` de outras linguagens. É o único valor do tipo `NoneType`. Funções sem `return` retornam `None` implicitamente. Verificação correta: `if var is None:` (não `== None`).',
    tags: ['python', 'tipos'],
  },
  {
    id: 'q22', difficulty: 'Médio', category: 'Python Básico',
    question: 'O que são decoradores em Python? Dê um exemplo simples.',
    answer: 'Decoradores são funções que modificam o comportamento de outras funções. Usam a sintaxe `@decorador`. Exemplo: `@staticmethod`, `@property`, `@classmethod`. Um decorador personalizado: `def log(func): def wrapper(*args): print("Chamado"); return func(*args); return wrapper`.',
    tags: ['python', 'avancado', 'funcoes'],
  },
  {
    id: 'q23', difficulty: 'Difícil', category: 'Funções & POO',
    question: 'O que são geradores (generators) em Python?',
    answer: 'Geradores são funções que usam `yield` em vez de `return`, produzindo valores um a um sob demanda. São lazy — só calculam o próximo valor quando necessário. Economizam memória para sequências grandes. Ex: `def contar(): yield 1; yield 2; yield 3`.',
    tags: ['python', 'avancado'],
  },
  {
    id: 'q24', difficulty: 'Médio', category: 'Web & Geral',
    question: 'O que é programação orientada a eventos?',
    answer: 'Paradigma onde o fluxo do programa é determinado por eventos (cliques, mensagens, sensores). O programa fica em loop de espera e reage aos eventos. Comum em interfaces gráficas, JavaScript no browser, e sistemas assíncronos. Contrasta com fluxo sequencial imperativo.',
    tags: ['paradigmas', 'programacao'],
  },
  {
    id: 'q25', difficulty: 'Fácil', category: 'Web & Geral',
    question: 'O que é o princípio KISS?',
    answer: 'KISS = "Keep It Simple, Stupid" (Mantenha Simples). Soluções simples são melhores que complexas. Código simples é mais fácil de entender, manter e debugar. Evite over-engineering: não adicione complexidade que não é necessária agora.',
    tags: ['boas-praticas', 'principios'],
  },
];

export const categories = [...new Set(interviewQuestions.map((q) => q.category))];
export const difficulties = ['Fácil', 'Médio', 'Difícil'] as const;
