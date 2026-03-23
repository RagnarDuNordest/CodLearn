export type ResourceType = 'video' | 'artigo' | 'documentacao' | 'curso' | 'ferramenta' | 'livro';
export type ResourceLang = 'pt' | 'en';

export interface Resource {
  title: string;
  url: string;
  type: ResourceType;
  language: ResourceLang;
  free: boolean;
  description: string;
  author?: string;
}

export interface ModuleResources {
  moduleId: string;
  label: string;
  emoji: string;
  resources: Resource[];
}

const resourcesData: ModuleResources[] = [
  {
    moduleId: 'intro',
    label: 'Introdução a Programação',
    emoji: '📘',
    resources: [
      { title: 'CS50 — Introdução à Ciência da Computação', url: 'https://cs50.harvard.edu/x/', type: 'curso', language: 'en', free: true, description: 'O melhor curso introdutório do mundo, da Harvard. Cobre lógica, algoritmos, C, Python, SQL e mais.', author: 'Harvard / David Malan' },
      { title: 'Curso em Vídeo — Algoritmos', url: 'https://www.youtube.com/playlist?list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqbfh0', type: 'video', language: 'pt', free: true, description: 'Professor Gustavo Guanabara explica lógica e algoritmos do zero, em português.', author: 'Gustavo Guanabara' },
      { title: 'Visualgo — Algoritmos Visualizados', url: 'https://visualgo.net/pt', type: 'ferramenta', language: 'pt', free: true, description: 'Visualize algoritmos e estruturas de dados passo a passo de forma interativa.' },
      { title: 'Scratch — Programação Visual', url: 'https://scratch.mit.edu/', type: 'ferramenta', language: 'pt', free: true, description: 'Aprenda lógica de programação de forma visual, sem precisar de sintaxe.' },
      { title: 'Khan Academy — Intro to Programming', url: 'https://www.khanacademy.org/computing/intro-to-python-fundamentals', type: 'curso', language: 'en', free: true, description: 'Introdução gratuita e interativa à programação com Python.' },
    ],
  },
  {
    moduleId: 'logica',
    label: 'Lógica de Programação',
    emoji: '🧠',
    resources: [
      { title: 'Curso em Vídeo — Python 3', url: 'https://www.youtube.com/playlist?list=PLHz_AreHm4dlKP6QQCekuIPky1CiwmdI6', type: 'video', language: 'pt', free: true, description: 'Curso completo de Python do zero ao avançado com o professor Gustavo Guanabara.', author: 'Gustavo Guanabara' },
      { title: 'Automate the Boring Stuff with Python', url: 'https://automatetheboringstuff.com/', type: 'livro', language: 'en', free: true, description: 'Livro gratuito online que ensina Python através de projetos práticos do dia a dia.', author: 'Al Sweigart' },
      { title: 'LeetCode — Easy Problems', url: 'https://leetcode.com/problemset/?difficulty=EASY', type: 'ferramenta', language: 'en', free: true, description: 'Pratique lógica com problemas graduais. Comece pelos de dificuldade Easy.' },
      { title: 'Flowgorithm — Fluxogramas', url: 'http://www.flowgorithm.org/', type: 'ferramenta', language: 'en', free: true, description: 'Crie fluxogramas de algoritmos que executam de verdade. Ótimo para visualizar lógica.' },
      { title: 'Python Tutor — Visualizador de Código', url: 'https://pythontutor.com/', type: 'ferramenta', language: 'en', free: true, description: 'Veja seu código Python/C/Java executar passo a passo com visualização da memória.' },
    ],
  },
  {
    moduleId: 'linux',
    label: 'Linux e Terminal',
    emoji: '🐧',
    resources: [
      { title: 'The Linux Command Line (livro gratuito)', url: 'https://linuxcommand.org/tlcl.php', type: 'livro', language: 'en', free: true, description: 'O guia definitivo da linha de comando Linux. Do básico ao avançado com scripts bash.', author: 'William Shotts' },
      { title: 'OverTheWire: Bandit', url: 'https://overthewire.org/wargames/bandit/', type: 'ferramenta', language: 'en', free: true, description: 'Aprenda Linux de forma gamificada resolvendo desafios de segurança progressivos via SSH.' },
      { title: 'Explainshell', url: 'https://explainshell.com/', type: 'ferramenta', language: 'en', free: true, description: 'Cole qualquer comando Linux e veja a explicação de cada parte e flag.' },
      { title: 'Linux Journey', url: 'https://linuxjourney.com/', type: 'curso', language: 'en', free: true, description: 'Aprenda Linux de forma interativa e progressiva, do básico ao administração de sistemas.' },
      { title: 'Diolinux — Canal YouTube', url: 'https://www.youtube.com/@Diolinux', type: 'video', language: 'pt', free: true, description: 'Maior canal sobre Linux em português. Dicas, tutoriais e notícias do mundo open-source.', author: 'Diolinux' },
    ],
  },
  {
    moduleId: 'git',
    label: 'Git',
    emoji: '🌿',
    resources: [
      { title: 'Pro Git (livro oficial gratuito)', url: 'https://git-scm.com/book/pt-br/v2', type: 'livro', language: 'pt', free: true, description: 'O livro oficial do Git, disponível gratuitamente em português. Referência completa.', author: 'Scott Chacon & Ben Straub' },
      { title: 'Learn Git Branching', url: 'https://learngitbranching.js.org/?locale=pt_BR', type: 'ferramenta', language: 'pt', free: true, description: 'O melhor visualizador interativo de Git. Aprenda branches, merge e rebase de forma visual.' },
      { title: 'Oh My Git! — Jogo de Git', url: 'https://ohmygit.org/', type: 'ferramenta', language: 'en', free: true, description: 'Jogo de código aberto que ensina Git de forma visual e divertida.' },
      { title: 'Atlassian Git Tutorials', url: 'https://www.atlassian.com/git/tutorials', type: 'artigo', language: 'en', free: true, description: 'Guias práticos e detalhados de todos os conceitos do Git pela equipe do Bitbucket.' },
      { title: 'GitHub Skills', url: 'https://skills.github.com/', type: 'curso', language: 'en', free: true, description: 'Aprenda Git e GitHub de forma prática com projetos guiados oficiais do GitHub.' },
    ],
  },
  {
    moduleId: 'python',
    label: 'Python',
    emoji: '🐍',
    resources: [
      { title: 'Documentação Oficial Python 3', url: 'https://docs.python.org/pt-br/3/', type: 'documentacao', language: 'pt', free: true, description: 'Referência oficial da linguagem em português. Tutorial, library reference e guias.' },
      { title: 'Real Python', url: 'https://realpython.com/', type: 'artigo', language: 'en', free: false, description: 'Os melhores tutoriais práticos de Python da internet. Muito conteúdo gratuito disponível.' },
      { title: 'Python.org — The Tutorial', url: 'https://docs.python.org/3/tutorial/', type: 'documentacao', language: 'en', free: true, description: 'Tutorial oficial do Python. Excelente para quem quer aprender do jeito correto.' },
      { title: 'Fluent Python', url: 'https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/', type: 'livro', language: 'en', free: false, description: 'O livro mais completo sobre Python avançado. Cobre idioms, decoradores, metaclasses e mais.', author: 'Luciano Ramalho' },
      { title: 'PyPI — Python Package Index', url: 'https://pypi.org/', type: 'ferramenta', language: 'en', free: true, description: 'Repositório oficial de pacotes Python com mais de 500.000 projetos disponíveis.' },
      { title: 'Pense em Python (livro gratuito PT)', url: 'https://penseallen.github.io/PensePython2e/', type: 'livro', language: 'pt', free: true, description: 'Tradução gratuita do "Think Python" — excelente livro para iniciantes em Python.', author: 'Allen Downey' },
    ],
  },
  {
    moduleId: 'c',
    label: 'Linguagem C',
    emoji: '⚙️',
    resources: [
      { title: 'cppreference.com', url: 'https://en.cppreference.com/w/c', type: 'documentacao', language: 'en', free: true, description: 'Referência completa da linguagem C e C++ com exemplos e notas de compatibilidade.' },
      { title: 'Beej\'s Guide to C Programming', url: 'https://beej.us/guide/bgc/', type: 'livro', language: 'en', free: true, description: 'Guia informal, divertido e completo de C. Inclui ponteiros, alocação dinâmica e arquivos.', author: 'Brian "Beej" Hall' },
      { title: 'CS50 Week 1 — C', url: 'https://cs50.harvard.edu/x/2024/weeks/1/', type: 'video', language: 'en', free: true, description: 'A melhor introdução ao C, parte do famoso CS50 de Harvard.' },
      { title: 'Programiz — C Programming', url: 'https://www.programiz.com/c-programming', type: 'artigo', language: 'en', free: true, description: 'Tutoriais práticos de C com exemplos e exercícios organizados por tópico.' },
      { title: 'Valgrind — Detector de Memory Leaks', url: 'https://valgrind.org/', type: 'ferramenta', language: 'en', free: true, description: 'Ferramenta essencial para detectar memory leaks e erros de acesso à memória em C.' },
    ],
  },
  {
    moduleId: 'java',
    label: 'Java',
    emoji: '☕',
    resources: [
      { title: 'Documentação Oficial Java SE', url: 'https://docs.oracle.com/en/java/javase/21/', type: 'documentacao', language: 'en', free: true, description: 'Documentação oficial do Java SE 21 com API reference completa da biblioteca padrão.' },
      { title: 'Baeldung', url: 'https://www.baeldung.com/', type: 'artigo', language: 'en', free: true, description: 'O melhor site de tutoriais práticos de Java e Spring. Artigos detalhados e atualizados.' },
      { title: 'Effective Java', url: 'https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/', type: 'livro', language: 'en', free: false, description: 'O livro mais importante para programadores Java avançados. 90 práticas essenciais.', author: 'Joshua Bloch' },
      { title: 'Java Design Patterns', url: 'https://java-design-patterns.com/', type: 'artigo', language: 'en', free: true, description: 'Catálogo completo de design patterns com exemplos em Java. Open source e bem mantido.' },
      { title: 'Loiane Groner — Canal YouTube', url: 'https://www.youtube.com/@loianegroner', type: 'video', language: 'pt', free: true, description: 'Melhor canal de Java em português. Cursos completos de Java, Angular e Spring Boot.', author: 'Loiane Groner' },
    ],
  },
  {
    moduleId: 'estruturas',
    label: 'Estruturas de Dados',
    emoji: '🏗️',
    resources: [
      { title: 'Visualgo — Visualização de EDs', url: 'https://visualgo.net/pt', type: 'ferramenta', language: 'pt', free: true, description: 'Visualize pilhas, filas, árvores, grafos e algoritmos de ordenação de forma animada.' },
      { title: 'Introduction to Algorithms (CLRS)', url: 'https://mitpress.mit.edu/9780262046305/', type: 'livro', language: 'en', free: false, description: 'O "bíblia" de algoritmos e estruturas de dados. Referência acadêmica mundial.', author: 'Cormen, Leiserson, Rivest, Stein' },
      { title: 'Data Structures Easy to Advanced — freeCodeCamp', url: 'https://www.youtube.com/watch?v=RBSGKlAvoiM', type: 'video', language: 'en', free: true, description: 'Curso completo de 8 horas cobrindo todas as estruturas de dados essenciais.' },
      { title: 'LeetCode — Patterns', url: 'https://leetcode.com/explore/', type: 'ferramenta', language: 'en', free: true, description: 'Pratique estruturas de dados com problemas categorizados por tipo e dificuldade.' },
      { title: 'CS Fundamentals — Estruturas de Dados', url: 'https://cs.fyi/guide/understanding-data-structures', type: 'artigo', language: 'en', free: true, description: 'Guia visual e explicativo das principais estruturas de dados com animações.' },
    ],
  },
  {
    moduleId: 'algoritmos',
    label: 'Algoritmos',
    emoji: '🔢',
    resources: [
      { title: 'The Algorithm Design Manual', url: 'https://www.algorist.com/', type: 'livro', language: 'en', free: false, description: 'Livro prático sobre design de algoritmos com "guerra de algoritmos" para cada problema.', author: 'Steven Skiena' },
      { title: 'Algorithms, Part I — Coursera (Princeton)', url: 'https://www.coursera.org/learn/algorithms-part1', type: 'curso', language: 'en', free: true, description: 'Curso excelente de algoritmos de Princeton. Gratuito para estudar, certificado pago.' },
      { title: 'VisuAlgo — Animações de Algoritmos', url: 'https://visualgo.net/pt', type: 'ferramenta', language: 'pt', free: true, description: 'Veja Bubble Sort, Merge Sort, Dijkstra e mais algoritmos executando passo a passo.' },
      { title: 'Big-O Cheat Sheet', url: 'https://www.bigocheatsheet.com/', type: 'artigo', language: 'en', free: true, description: 'Referência rápida de complexidade de tempo e espaço dos algoritmos mais comuns.' },
      { title: 'Competitive Programmer\'s Handbook', url: 'https://cses.fi/book/book.pdf', type: 'livro', language: 'en', free: true, description: 'Guia gratuito para programação competitiva cobrindo algoritmos avançados.', author: 'Antti Laaksonen' },
    ],
  },
  {
    moduleId: 'sql',
    label: 'SQL e Banco de Dados',
    emoji: '🗄️',
    resources: [
      { title: 'SQLZoo — SQL Interativo', url: 'https://sqlzoo.net/wiki/SQL_Tutorial', type: 'curso', language: 'en', free: true, description: 'Pratique SQL com exercícios interativos direto no browser. Do SELECT básico ao avançado.' },
      { title: 'Mode SQL Tutorial', url: 'https://mode.com/sql-tutorial/', type: 'artigo', language: 'en', free: true, description: 'Tutorial completo de SQL com foco em análise de dados. Inclui exemplos práticos com datasets reais.' },
      { title: 'PostgreSQL Documentation', url: 'https://www.postgresql.org/docs/', type: 'documentacao', language: 'en', free: true, description: 'Documentação oficial do PostgreSQL — o banco de dados relacional open-source mais avançado.' },
      { title: 'DB Fiddle', url: 'https://www.db-fiddle.com/', type: 'ferramenta', language: 'en', free: true, description: 'Teste queries SQL online em vários bancos (PostgreSQL, MySQL, SQLite) sem instalar nada.' },
      { title: 'Use The Index, Luke!', url: 'https://use-the-index-luke.com/', type: 'artigo', language: 'en', free: true, description: 'Guia sobre performance em SQL com foco em índices. Essencial para otimizar queries.' },
    ],
  },
  {
    moduleId: 'html-css',
    label: 'HTML e CSS',
    emoji: '🌐',
    resources: [
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/pt-BR/', type: 'documentacao', language: 'pt', free: true, description: 'A documentação mais completa e confiável de HTML, CSS e JavaScript. Referência da Mozilla.' },
      { title: 'CSS Tricks', url: 'https://css-tricks.com/', type: 'artigo', language: 'en', free: true, description: 'Site de referência com guias definitivos de Flexbox, Grid, animações e tudo sobre CSS.' },
      { title: 'Flexbox Froggy', url: 'https://flexboxfroggy.com/#pt-br', type: 'ferramenta', language: 'pt', free: true, description: 'Aprenda Flexbox jogando — posicione sapos na tela usando propriedades CSS Flexbox.' },
      { title: 'Grid Garden', url: 'https://cssgridgarden.com/#pt-br', type: 'ferramenta', language: 'pt', free: true, description: 'Aprenda CSS Grid regando uma horta. Jogo interativo para fixar todos os conceitos do Grid.' },
      { title: 'web.dev — Google', url: 'https://web.dev/learn/', type: 'curso', language: 'en', free: true, description: 'Cursos oficiais do Google sobre HTML, CSS, JavaScript, performance e acessibilidade.' },
    ],
  },
  {
    moduleId: 'frontend',
    label: 'Frontend com JavaScript',
    emoji: '⚡',
    resources: [
      { title: 'JavaScript.info', url: 'https://javascript.info/', type: 'artigo', language: 'en', free: true, description: 'O tutorial mais completo e moderno de JavaScript. Cobre do básico a promises, proxies e mais.' },
      { title: 'You Don\'t Know JS (livro gratuito)', url: 'https://github.com/getify/You-Dont-Know-JS', type: 'livro', language: 'en', free: true, description: 'Série de livros gratuitos que explica JavaScript em profundidade. Essencial para avançar.', author: 'Kyle Simpson' },
      { title: 'freeCodeCamp — JavaScript Algorithms', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/', type: 'curso', language: 'en', free: true, description: 'Certificação gratuita de JavaScript com centenas de exercícios interativos.' },
      { title: 'Frontend Mentor', url: 'https://www.frontendmentor.io/', type: 'ferramenta', language: 'en', free: true, description: 'Desafios reais de frontend com designs do Figma para implementar. Ótimo para portfólio.' },
      { title: 'Rocketseat — Canal YouTube', url: 'https://www.youtube.com/@rocketseat', type: 'video', language: 'pt', free: true, description: 'Melhor canal de desenvolvimento web em português. JavaScript, React, Node.js e mais.', author: 'Rocketseat' },
    ],
  },
  {
    moduleId: 'backend',
    label: 'Backend com Python',
    emoji: '🖥️',
    resources: [
      { title: 'Flask Documentation', url: 'https://flask.palletsprojects.com/', type: 'documentacao', language: 'en', free: true, description: 'Documentação oficial do Flask. Microframework Python para APIs e aplicações web.' },
      { title: 'FastAPI Documentation', url: 'https://fastapi.tiangolo.com/', type: 'documentacao', language: 'en', free: true, description: 'O framework Python mais moderno para APIs. Validação automática, tipagem e documentação gerada.' },
      { title: 'Full Stack FastAPI — Tutorial', url: 'https://fastapi.tiangolo.com/tutorial/', type: 'artigo', language: 'en', free: true, description: 'Tutorial oficial completo do FastAPI cobrindo rotas, validação, banco de dados e autenticação.' },
      { title: 'TestDriven.io — Flask', url: 'https://testdriven.io/blog/topics/flask/', type: 'artigo', language: 'en', free: false, description: 'Tutoriais avançados de Flask: TDD, Docker, microservices, Celery e muito mais.' },
      { title: 'Refactoring Guru — Design Patterns', url: 'https://refactoring.guru/pt-br/design-patterns', type: 'artigo', language: 'pt', free: true, description: 'Guia visual de padrões de projeto em português com exemplos em Python e outras linguagens.' },
    ],
  },
];

export default resourcesData;
