import { LessonQuiz } from '@/types/quiz';

const quizzes: LessonQuiz[] = [
  {
    lessonId: 'o-que-e-programacao',
    questions: [
      {
        id: 'oqep-1',
        question: 'O que é programação?',
        options: [
          'O processo de ligar e desligar um computador',
          'A arte de escrever instruções que o computador entende e executa',
          'O ato de usar programas já prontos no computador',
          'A fabricação de chips e processadores',
        ],
        correctIndex: 1,
        explanation:
          'Programação é escrever um conjunto de instruções (código) que o computador interpreta e executa para realizar uma tarefa.',
      },
      {
        id: 'oqep-2',
        question: 'O que é um algoritmo?',
        options: [
          'Um tipo de vírus de computador',
          'Um hardware especial para processamento rápido',
          'Uma sequência finita de passos para resolver um problema',
          'Um programa de edição de imagens',
        ],
        correctIndex: 2,
        explanation:
          'Um algoritmo é uma sequência lógica, finita e ordenada de passos que descreve como resolver um problema ou executar uma tarefa.',
      },
      {
        id: 'oqep-3',
        question: 'Qual das opções abaixo é um exemplo de algoritmo do dia a dia?',
        options: [
          'A tela de um celular',
          'Uma receita de bolo com ingredientes e modo de preparo',
          'A bateria de um notebook',
          'O teclado de um computador',
        ],
        correctIndex: 1,
        explanation:
          'Uma receita de bolo é um ótimo exemplo de algoritmo: tem ingredientes (dados de entrada) e um passo a passo ordenado para chegar ao resultado.',
      },
      {
        id: 'oqep-4',
        question: 'Para que serve um computador na programação?',
        options: [
          'Apenas para navegar na internet',
          'Para executar as instruções escritas pelo programador',
          'Para criar hardware novo automaticamente',
          'Apenas para armazenar arquivos pessoais',
        ],
        correctIndex: 1,
        explanation:
          'O computador é a máquina que lê e executa as instruções escritas em código pelo programador, realizando as tarefas definidas.',
      },
    ],
  },
  {
    lessonId: 'como-computadores-funcionam',
    questions: [
      {
        id: 'ccf-1',
        question: 'O que é um bit?',
        options: [
          'Um tipo de cabo de rede',
          'A menor unidade de informação, representada por 0 ou 1',
          'Um componente físico da placa-mãe',
          'Um tipo de memória RAM',
        ],
        correctIndex: 1,
        explanation:
          'Bit (Binary Digit) é a menor unidade de informação digital. Ele só pode assumir dois valores: 0 ou 1, representando estados como desligado/ligado.',
      },
      {
        id: 'ccf-2',
        question: 'Quantos bits formam 1 byte?',
        options: ['4', '16', '8', '2'],
        correctIndex: 2,
        explanation:
          '1 byte é formado por 8 bits. O byte é a unidade básica usada para representar um caractere, como uma letra ou número.',
      },
      {
        id: 'ccf-3',
        question: 'Qual componente é chamado de "cérebro" do computador?',
        options: [
          'HD (Hard Disk)',
          'RAM (Memória de Acesso Aleatório)',
          'GPU (Unidade de Processamento Gráfico)',
          'CPU (Unidade Central de Processamento)',
        ],
        correctIndex: 3,
        explanation:
          'A CPU (Central Processing Unit) é considerada o cérebro do computador pois é responsável por executar as instruções dos programas.',
      },
      {
        id: 'ccf-4',
        question: 'Qual é a diferença entre memória RAM e armazenamento (HD/SSD)?',
        options: [
          'Não há diferença, são a mesma coisa',
          'A RAM é permanente, o HD é temporário',
          'A RAM é temporária (perde ao desligar), o HD/SSD é permanente',
          'O HD é mais rápido que a RAM',
        ],
        correctIndex: 2,
        explanation:
          'A RAM armazena dados temporariamente enquanto o computador está ligado. O HD/SSD guarda os dados permanentemente, mesmo após desligar.',
      },
    ],
  },
  {
    lessonId: 'sistema-binario',
    questions: [
      {
        id: 'sb-1',
        question: 'Qual é o valor decimal do número binário 1010?',
        options: ['8', '10', '12', '6'],
        correctIndex: 1,
        explanation:
          '1010 em binário = 1×8 + 0×4 + 1×2 + 0×1 = 8 + 0 + 2 + 0 = 10 em decimal.',
      },
      {
        id: 'sb-2',
        question: 'Por que os computadores usam o sistema binário?',
        options: [
          'Por tradição histórica sem motivo técnico',
          'Porque é mais fácil para humanos entenderem',
          'Porque os circuitos eletrônicos operam com dois estados: ligado (1) e desligado (0)',
          'Porque o sistema decimal é muito lento',
        ],
        correctIndex: 2,
        explanation:
          'Computadores usam binário porque seus circuitos eletrônicos trabalham com dois estados físicos: tensão alta (1) e tensão baixa (0).',
      },
      {
        id: 'sb-3',
        question: 'Qual é o valor decimal do número binário 1111?',
        options: ['14', '16', '15', '8'],
        correctIndex: 2,
        explanation:
          '1111 em binário = 1×8 + 1×4 + 1×2 + 1×1 = 8 + 4 + 2 + 1 = 15 em decimal.',
      },
    ],
  },
  {
    lessonId: 'logica-de-programacao',
    questions: [
      {
        id: 'ldp-1',
        question: 'O que é lógica de programação?',
        options: [
          'A habilidade de digitar código rapidamente',
          'A capacidade de organizar o raciocínio para criar soluções computacionais passo a passo',
          'Um tipo de linguagem de programação específica',
          'A memória necessária para executar um programa',
        ],
        correctIndex: 1,
        explanation:
          'Lógica de programação é a forma de organizar o raciocínio de maneira lógica e sequencial para criar soluções que um computador possa executar.',
      },
      {
        id: 'ldp-2',
        question: 'O que é uma condição em programação?',
        options: [
          'Um erro no código',
          'Uma instrução que define o número de repetições',
          'Uma expressão que avalia verdadeiro ou falso para controlar o fluxo do programa',
          'O nome dado a uma variável',
        ],
        correctIndex: 2,
        explanation:
          'Uma condição é uma expressão lógica que resulta em verdadeiro (true) ou falso (false), usada em estruturas como if/else para controlar o fluxo de execução.',
      },
      {
        id: 'ldp-3',
        question: 'O que é um loop (laço de repetição)?',
        options: [
          'Um tipo de erro que trava o programa',
          'Uma estrutura que repete um bloco de código enquanto uma condição for verdadeira',
          'Uma função matemática complexa',
          'Um arquivo de configuração do sistema',
        ],
        correctIndex: 1,
        explanation:
          'Um loop é uma estrutura de controle que executa um bloco de código repetidamente enquanto uma condição for verdadeira, evitando a repetição manual do código.',
      },
      {
        id: 'ldp-4',
        question: 'Qual é a ordem correta das etapas para resolver um problema com programação?',
        options: [
          'Escrever o código → Entender o problema → Testar',
          'Testar → Escrever código → Entender o problema',
          'Entender o problema → Planejar a solução → Escrever o código → Testar',
          'Escrever o código → Testar → Entender o problema',
        ],
        correctIndex: 2,
        explanation:
          'O processo correto é: entender o problema, planejar a solução (algoritmo), escrever o código e testar. Pular etapas leva a soluções incorretas.',
      },
    ],
  },
  {
    lessonId: 'pensamento-computacional',
    questions: [
      {
        id: 'pc-1',
        question: 'O que é decomposição no pensamento computacional?',
        options: [
          'Deletar partes do código desnecessárias',
          'Dividir um problema complexo em partes menores e mais fáceis de resolver',
          'Transformar o código em linguagem de máquina',
          'Combinar vários programas em um só',
        ],
        correctIndex: 1,
        explanation:
          'Decomposição é o processo de dividir um problema grande e complexo em subproblemas menores, tornando cada parte mais fácil de entender e resolver.',
      },
      {
        id: 'pc-2',
        question: 'O que é reconhecimento de padrões no pensamento computacional?',
        options: [
          'Desenhar padrões gráficos com o computador',
          'Identificar similaridades e tendências em dados ou problemas para reutilizar soluções',
          'Criar senhas seguras com padrões de caracteres',
          'Organizar arquivos em pastas com nomes padronizados',
        ],
        correctIndex: 1,
        explanation:
          'Reconhecimento de padrões é identificar semelhanças entre problemas. Ao reconhecer padrões, podemos reutilizar soluções que já funcionaram antes.',
      },
      {
        id: 'pc-3',
        question: 'O que significa abstração no contexto da computação?',
        options: [
          'Criar arte digital com computador',
          'Focar apenas nos detalhes irrelevantes de um problema',
          'Ignorar os detalhes desnecessários e focar no que é essencial para resolver o problema',
          'Traduzir código para outra linguagem de programação',
        ],
        correctIndex: 2,
        explanation:
          'Abstração é a habilidade de identificar e focar apenas nas informações relevantes de um problema, ignorando detalhes desnecessários para simplificar a solução.',
      },
    ],
  },
  {
    lessonId: 'algoritmos-e-fluxogramas',
    questions: [
      {
        id: 'aef-1',
        question: 'O que é um fluxograma?',
        options: [
          'Um tipo de gráfico de barras para comparar dados',
          'Uma representação visual de um algoritmo usando símbolos e setas',
          'Um programa para criar animações',
          'Um diagrama que mostra a memória do computador',
        ],
        correctIndex: 1,
        explanation:
          'Um fluxograma é uma representação gráfica de um algoritmo, usando símbolos padronizados (retângulos, losangos, setas) para mostrar a sequência de passos e decisões.',
      },
      {
        id: 'aef-2',
        question: 'Qual símbolo representa uma decisão (condição) em um fluxograma?',
        options: [
          'Retângulo (□)',
          'Círculo (○)',
          'Losango (◇)',
          'Triângulo (△)',
        ],
        correctIndex: 2,
        explanation:
          'O losango (◇) representa um ponto de decisão no fluxograma, onde o fluxo se divide em dois caminhos: Sim ou Não, baseado em uma condição.',
      },
      {
        id: 'aef-3',
        question: 'Quais são as características obrigatórias de um bom algoritmo?',
        options: [
          'Deve ser escrito em inglês e ter pelo menos 100 linhas',
          'Deve ser finito, ter passos claros e produzir um resultado',
          'Deve usar apenas operações matemáticas complexas',
          'Deve ser executado somente por computadores de última geração',
        ],
        correctIndex: 1,
        explanation:
          'Um bom algoritmo deve ter: finitude (termina em algum momento), clareza (passos bem definidos), entradas e saídas definidas, e eficiência para resolver o problema.',
      },
      {
        id: 'aef-4',
        question: 'Qual é a vantagem de criar um fluxograma antes de escrever o código?',
        options: [
          'Nenhuma, é apenas trabalho extra desnecessário',
          'Ajuda a visualizar e planejar a lógica do programa antes de implementá-la',
          'Obrigatório para compilar o programa corretamente',
          'Substitui completamente a necessidade de escrever código',
        ],
        correctIndex: 1,
        explanation:
          'O fluxograma ajuda a visualizar o fluxo lógico do programa, identificar erros de lógica antes de codificar e comunicar a solução para outras pessoas.',
      },
    ],
  },
];

const quizzesMap: Record<string, LessonQuiz> = {};
for (const quiz of quizzes) {
  quizzesMap[quiz.lessonId] = quiz;
}

export function getQuizByLessonId(lessonId: string): LessonQuiz | undefined {
  return quizzesMap[lessonId];
}

export default quizzes;
