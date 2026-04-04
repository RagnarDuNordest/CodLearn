import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'o-que-e-react',
  moduleId: 'react',
  title: 'O que e React',
  description: 'Entenda o que e React, por que ele existe, como funciona o JSX e como criar seu primeiro componente funcional',
  order: 0,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        '## O que e React?\n\nReact e uma biblioteca JavaScript criada pelo Facebook para construir interfaces de usuario. Ela resolve um problema classico do desenvolvimento web: como atualizar a tela de forma eficiente quando os dados mudam?\n\n### Por que React se tornou popular?\n\n**(1) Componentes reutilizaveis**\nVoce divide a interface em pecas independentes chamadas componentes. Um botao, um card, um formulario — cada um e seu proprio componente que pode ser reusado em qualquer lugar da aplicacao.\n\n**(2) Virtual DOM**\nEm vez de manipular o DOM do navegador diretamente (o que e lento), React mantem uma copia virtual do DOM em memoria. Quando algo muda, React compara o virtual DOM com o estado anterior, descobre exatamente o que precisa mudar, e aplica somente essas mudancas minimas no DOM real. Isso e chamado de reconciliacao.\n\n**(3) Fluxo de dados previsivel**\nDados fluem em uma direcao: do componente pai para o filho. Isso torna o comportamento da aplicacao previsivel e facil de depurar.\n\n**(4) Ecosistema enorme**\nReact tem milhares de bibliotecas complementares, uma comunidade gigante e e usado por empresas como Facebook, Instagram, Airbnb, Netflix e Uber.',
    },
    {
      type: 'text',
      content:
        '## JSX: JavaScript + HTML juntos\n\nJSX e uma extensao de sintaxe do JavaScript que permite escrever HTML dentro do codigo JS. Nao e HTML real — e acucar sintatico que o compilador (Babel/SWC) transforma em chamadas `React.createElement()`.\n\n### Regras do JSX\n\n- Todo componente deve retornar **um unico elemento raiz** (use `<div>` ou `<>` Fragment)\n- Atributos HTML viram camelCase: `class` -> `className`, `for` -> `htmlFor`\n- Expressoes JavaScript ficam dentro de `{ }`: `{nome}`, `{2 + 2}`, `{lista.map(...)}`\n- Tags sem filhos devem ser auto-fechadas: `<img />`, `<br />`\n- Comentarios dentro do JSX: `{/* comentario */}`',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: '// JSX parece HTML mas e JavaScript\nconst elemento = <h1 className="titulo">Ola, Mundo!</h1>;\n\n// O compilador transforma isso em:\nconst elemento = React.createElement(\n  "h1",\n  { className: "titulo" },\n  "Ola, Mundo!"\n);\n\n// Expressoes JavaScript dentro de JSX\nconst nome = "Maria";\nconst saudacao = <p>Bem-vinda, {nome}!</p>;\n\n// Condicional com operador ternario\nconst logado = true;\nconst mensagem = (\n  <div>\n    {logado ? <p>Voce esta logado</p> : <p>Faca login</p>}\n  </div>\n);\n\n// Renderizacao de lista\nconst frutas = ["Maca", "Banana", "Laranja"];\nconst lista = (\n  <ul>\n    {frutas.map((fruta, index) => (\n      <li key={index}>{fruta}</li>\n    ))}\n  </ul>\n);',
        filename: 'jsx-basico.jsx',
        description:
          'JSX e transformado em chamadas React.createElement pelo compilador. Expressoes JavaScript entram entre chaves. A propriedade key e obrigatoria em listas para que o React identifique cada item.',
      },
    },
    {
      type: 'text',
      content:
        '## Primeiro componente funcional\n\nUm componente funcional e simplesmente uma funcao JavaScript que retorna JSX. Convencoes importantes:\n\n- O nome **sempre começa com letra maiuscula** (PascalCase): `MeuComponente`, nao `meuComponente`\n- Deve retornar JSX ou `null`\n- Pode receber um objeto de `props` como parametro',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: '// Componente mais simples possivel\nfunction Saudacao() {\n  return <h1>Ola, Mundo!</h1>;\n}\n\n// Componente com props\nfunction CartaoDeUsuario({ nome, email, avatar }) {\n  return (\n    <div className="cartao">\n      <img src={avatar} alt={`Foto de ${nome}`} />\n      <h2>{nome}</h2>\n      <p>{email}</p>\n    </div>\n  );\n}\n\n// Componente composto — usando outros componentes\nfunction ListaDeUsuarios() {\n  const usuarios = [\n    { id: 1, nome: "Ana Silva", email: "ana@email.com", avatar: "/ana.jpg" },\n    { id: 2, nome: "Bruno Costa", email: "bruno@email.com", avatar: "/bruno.jpg" },\n  ];\n\n  return (\n    <section>\n      <h1>Equipe</h1>\n      {usuarios.map((usuario) => (\n        <CartaoDeUsuario\n          key={usuario.id}\n          nome={usuario.nome}\n          email={usuario.email}\n          avatar={usuario.avatar}\n        />\n      ))}\n    </section>\n  );\n}\n\nexport default ListaDeUsuarios;',
        filename: 'componentes.jsx',
        description:
          'Componentes funcionais sao funcoes que retornam JSX. Eles podem ser compostos: ListaDeUsuarios usa CartaoDeUsuario internamente, formando uma arvore de componentes.',
      },
    },
    {
      type: 'text',
      content:
        '## Renderizacao no DOM\n\nPara exibir um componente React na pagina, e necessario usar ReactDOM para "montar" a arvore de componentes em um elemento HTML existente. Em projetos modernos com React 18, usa-se `createRoot`.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: '// index.html (arquivo HTML base)\n// <div id="root"></div>\n\n// main.jsx — ponto de entrada da aplicacao\nimport { StrictMode } from "react";\nimport { createRoot } from "react-dom/client";\nimport App from "./App";\n\n// 1. Seleciona o elemento HTML onde o React vai morar\nconst elementoRaiz = document.getElementById("root");\n\n// 2. Cria a raiz do React\nconst raiz = createRoot(elementoRaiz);\n\n// 3. Renderiza o componente App (e todos os filhos dele)\nraiz.render(\n  <StrictMode>\n    <App />\n  </StrictMode>\n);\n\n// App.jsx — componente raiz da aplicacao\nfunction App() {\n  return (\n    <div>\n      <h1>Minha Aplicacao React</h1>\n      <p>Tudo que aparece aqui e renderizado pelo React.</p>\n    </div>\n  );\n}\n\nexport default App;',
        filename: 'main.jsx',
        description:
          'createRoot monta a aplicacao React em um elemento HTML (geralmente uma div com id="root"). StrictMode ativa avisos extras em desenvolvimento, ajudando a encontrar problemas antes de chegar em producao.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Ao criar um projeto React com Vite (recomendado), execute: `npm create vite@latest meu-projeto -- --template react`. Isso cria toda a estrutura automaticamente. O Vite e muito mais rapido que o Create React App.',
    },
  ],
  challenges: [
    {
      id: 'react-c1-card',
      title: 'Crie um Componente Card',
      description:
        'Crie um componente chamado Card que receba as props: titulo (string), descricao (string) e tag (string). O componente deve renderizar um div com className "card" contendo: um h2 com o titulo, um p com a descricao, e um span com className "tag" exibindo a tag. Em seguida, exporte um componente App que renderize dois Cards diferentes.',
      language: 'javascript',
      starterCode:
        '// Crie o componente Card e um componente App que o usa\n\nfunction Card({ titulo, descricao, tag }) {\n  // Implemente o componente aqui\n}\n\nfunction App() {\n  // Renderize dois Cards aqui\n  // Card 1: titulo="React Hooks", descricao="Aprenda useState e useEffect", tag="Intermediario"\n  // Card 2: titulo="JSX Basico", descricao="Aprenda a sintaxe JSX do React", tag="Iniciante"\n}\n\nexport default App;\n',
      solution:
        'function Card({ titulo, descricao, tag }) {\n  return (\n    <div className="card">\n      <h2>{titulo}</h2>\n      <p>{descricao}</p>\n      <span className="tag">{tag}</span>\n    </div>\n  );\n}\n\nfunction App() {\n  return (\n    <div>\n      <Card\n        titulo="React Hooks"\n        descricao="Aprenda useState e useEffect"\n        tag="Intermediario"\n      />\n      <Card\n        titulo="JSX Basico"\n        descricao="Aprenda a sintaxe JSX do React"\n        tag="Iniciante"\n      />\n    </div>\n  );\n}\n\nexport default App;\n',
      hints: [
        'Componentes funcionais sao funcoes que recebem props como parametro e retornam JSX.',
        'Use desestruturacao no parametro: function Card({ titulo, descricao, tag }) para acessar cada prop diretamente.',
        'Dentro do JSX, coloque expressoes JavaScript entre chaves: <h2>{titulo}</h2>.',
        'O componente App precisa de um elemento raiz unico — use uma <div> para envolver os dois Cards.',
      ],
    },
  ],
};
