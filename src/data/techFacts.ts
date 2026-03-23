export interface TechFact {
  id: string;
  fact: string;
  emoji: string;
  category: 'história' | 'curiosidade' | 'linguagem' | 'internet' | 'hardware';
}

export const techFacts: TechFact[] = [
  {
    id: 'tf01',
    fact: 'Python foi criado por Guido van Rossum em 1991 e o nome vem do grupo de humor britânico Monty Python, não da cobra.',
    emoji: '🐍',
    category: 'linguagem',
  },
  {
    id: 'tf02',
    fact: 'O primeiro bug de computador foi literalmente um inseto: uma mariposa encontrada presa num relé do Harvard Mark II em 1947 por Grace Hopper.',
    emoji: '🦗',
    category: 'história',
  },
  {
    id: 'tf03',
    fact: 'Existem mais de 700 linguagens de programação no mundo, mas apenas cerca de 20 delas são amplamente utilizadas.',
    emoji: '💻',
    category: 'curiosidade',
  },
  {
    id: 'tf04',
    fact: 'O código que levou os astronautas do Apollo 11 à Lua tinha apenas 4KB de memória — menos do que um emoji de alta resolução atual.',
    emoji: '🚀',
    category: 'história',
  },
  {
    id: 'tf05',
    fact: 'O JavaScript foi criado por Brendan Eich em apenas 10 dias em 1995 enquanto trabalhava na Netscape.',
    emoji: '⚡',
    category: 'linguagem',
  },
  {
    id: 'tf06',
    fact: 'O email foi inventado antes da World Wide Web. Ray Tomlinson enviou o primeiro email em 1971 — mais de 20 anos antes da web existir.',
    emoji: '📧',
    category: 'internet',
  },
  {
    id: 'tf07',
    fact: 'O nome "Google" é uma grafia errada de "googol", que é o número 1 seguido de 100 zeros.',
    emoji: '🔢',
    category: 'internet',
  },
  {
    id: 'tf08',
    fact: 'A linguagem C foi criada por Dennis Ritchie entre 1969 e 1973 e ainda é usada amplamente hoje, inclusive no kernel do Linux.',
    emoji: '🔧',
    category: 'linguagem',
  },
  {
    id: 'tf09',
    fact: 'O primeiro computador comercial, o UNIVAC I, pesava 7 toneladas e custava o equivalente a milhões de dólares hoje.',
    emoji: '🏋️',
    category: 'hardware',
  },
  {
    id: 'tf10',
    fact: 'Ada Lovelace é considerada a primeira programadora da história, escrevendo algoritmos para a Máquina Analítica de Charles Babbage por volta de 1843.',
    emoji: '👩‍💻',
    category: 'história',
  },
  {
    id: 'tf11',
    fact: 'O Linux foi criado por Linus Torvalds em 1991 quando ele tinha apenas 21 anos, como um projeto pessoal.',
    emoji: '🐧',
    category: 'história',
  },
  {
    id: 'tf12',
    fact: 'A Lei de Moore previa que o número de transistores em chips dobraria a cada dois anos — e essa previsão se manteve por mais de 50 anos.',
    emoji: '📈',
    category: 'hardware',
  },
  {
    id: 'tf13',
    fact: 'O primeiro domínio .com registrado foi symbolics.com em 15 de março de 1985.',
    emoji: '🌐',
    category: 'internet',
  },
  {
    id: 'tf14',
    fact: 'Java foi inicialmente desenvolvida pela Sun Microsystems com o codinome "Oak" (carvalho), nome tirado de uma árvore em frente ao escritório de James Gosling.',
    emoji: '☕',
    category: 'linguagem',
  },
  {
    id: 'tf15',
    fact: 'O teclado QWERTY foi projetado em 1873 para reduzir o travamento de teclas nas máquinas de escrever mecânicas, não para maximizar velocidade de digitação.',
    emoji: '⌨️',
    category: 'hardware',
  },
  {
    id: 'tf16',
    fact: 'A Wikipedia tem mais de 60 milhões de artigos em mais de 300 idiomas, todos mantidos por voluntários.',
    emoji: '📚',
    category: 'internet',
  },
  {
    id: 'tf17',
    fact: 'O primeiro mouse foi inventado por Douglas Engelbart em 1964 e era feito de madeira.',
    emoji: '🖱️',
    category: 'hardware',
  },
  {
    id: 'tf18',
    fact: 'PHP originalmente significava "Personal Home Page", mas hoje significa "PHP: Hypertext Preprocessor" — um acrônimo recursivo.',
    emoji: '🐘',
    category: 'linguagem',
  },
  {
    id: 'tf19',
    fact: 'A internet tem mais de 5 bilhões de usuários ativos, representando cerca de 65% da população mundial.',
    emoji: '🌍',
    category: 'internet',
  },
  {
    id: 'tf20',
    fact: 'O conceito de "null" em programação foi criado por Tony Hoare em 1965, que depois chamou isso de seu "erro de um bilhão de dólares".',
    emoji: '🚫',
    category: 'curiosidade',
  },
  {
    id: 'tf21',
    fact: 'Git foi criado por Linus Torvalds em 2005 em apenas dois dias, após uma disputa de licença com o BitKeeper.',
    emoji: '🌿',
    category: 'curiosidade',
  },
  {
    id: 'tf22',
    fact: 'O primeiro videogame comercial foi o Pong, lançado pela Atari em 1972. O protótipo foi tão simples que Atari pediu ao engenheiro para simplificar mais.',
    emoji: '🎮',
    category: 'história',
  },
  {
    id: 'tf23',
    fact: 'A linguagem SQL foi desenvolvida pela IBM na década de 1970 e ainda é um dos idiomas de dados mais usados no mundo.',
    emoji: '🗄️',
    category: 'linguagem',
  },
  {
    id: 'tf24',
    fact: 'O número de transistores no iPhone atual é maior do que o número de estrelas estimadas na Via Láctea.',
    emoji: '🌌',
    category: 'hardware',
  },
  {
    id: 'tf25',
    fact: 'O protocolo HTTP foi criado por Tim Berners-Lee em 1989 enquanto trabalhava no CERN, na Suíça.',
    emoji: '🔗',
    category: 'internet',
  },
  {
    id: 'tf26',
    fact: 'Ruby on Rails, lançado em 2004, popularizou o conceito de "convenção sobre configuração" e influenciou dezenas de frameworks modernos.',
    emoji: '💎',
    category: 'linguagem',
  },
  {
    id: 'tf27',
    fact: 'O código-fonte do sistema operacional original do Macintosh de 1984 foi publicado em 2021, contendo comentários bem-humorados dos desenvolvedores.',
    emoji: '🍎',
    category: 'história',
  },
  {
    id: 'tf28',
    fact: 'Um processador moderno pode executar mais de 3 bilhões de instruções por segundo — mais do que o número de batimentos cardíacos em uma vida humana.',
    emoji: '⚙️',
    category: 'hardware',
  },
  {
    id: 'tf29',
    fact: 'O Stackoverflow recebe cerca de 50 milhões de perguntas e respostas. Foi fundado por Joel Spolsky e Jeff Atwood em 2008.',
    emoji: '🤔',
    category: 'internet',
  },
  {
    id: 'tf30',
    fact: 'A linguagem COBOL, criada em 1959, ainda processa trilhões de dólares em transações bancárias todos os dias nos EUA.',
    emoji: '🏦',
    category: 'linguagem',
  },
  {
    id: 'tf31',
    fact: 'O conceito de "nuvem" em computação em nuvem vem de diagramas de rede onde a internet era representada como uma nuvem.',
    emoji: '☁️',
    category: 'curiosidade',
  },
  {
    id: 'tf32',
    fact: 'O primeiro site da World Wide Web ainda está no ar: info.cern.ch, publicado em agosto de 1991.',
    emoji: '🕰️',
    category: 'história',
  },
  {
    id: 'tf33',
    fact: 'TypeScript foi criado pela Microsoft e lançado em 2012. Hoje é uma das linguagens mais amadas pelos desenvolvedores.',
    emoji: '🔷',
    category: 'linguagem',
  },
  {
    id: 'tf34',
    fact: 'Os emojis foram criados por Shigetaka Kurita no Japão em 1999 para o iMode da NTT DoCoMo, com apenas 176 ícones originais.',
    emoji: '😊',
    category: 'curiosidade',
  },
  {
    id: 'tf35',
    fact: 'O primeiro algoritmo de ordenação eficiente, o Quicksort, foi inventado por Tony Hoare em 1959 quando tinha apenas 25 anos.',
    emoji: '🔀',
    category: 'história',
  },
  {
    id: 'tf36',
    fact: 'Um SSD moderno pode ler dados a mais de 7.000 MB/s — suficiente para baixar um filme HD em menos de um segundo.',
    emoji: '💾',
    category: 'hardware',
  },
  {
    id: 'tf37',
    fact: 'A maior parte do tráfego da internet atual (mais de 60%) é gerada por bots e programas automatizados, não por humanos.',
    emoji: '🤖',
    category: 'internet',
  },
  {
    id: 'tf38',
    fact: 'O Rust foi eleito a linguagem mais amada pelos desenvolvedores pelo 8º ano consecutivo na pesquisa do Stack Overflow em 2023.',
    emoji: '🦀',
    category: 'linguagem',
  },
  {
    id: 'tf39',
    fact: 'A criptografia RSA, base da segurança da internet, foi publicada em 1977 por Rivest, Shamir e Adleman. Os mesmos princípios ainda protegem seus dados hoje.',
    emoji: '🔐',
    category: 'curiosidade',
  },
  {
    id: 'tf40',
    fact: 'O código-fonte do Linux tem mais de 27 milhões de linhas e é mantido por milhares de desenvolvedores ao redor do mundo.',
    emoji: '🌐',
    category: 'curiosidade',
  },
];

export function getRandomFact(excludeIds?: string[]): TechFact {
  const available = excludeIds && excludeIds.length > 0
    ? techFacts.filter((f) => !excludeIds.includes(f.id))
    : techFacts;

  const pool = available.length > 0 ? available : techFacts;
  return pool[Math.floor(Math.random() * pool.length)];
}
