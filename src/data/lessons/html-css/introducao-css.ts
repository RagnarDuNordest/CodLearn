import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'introducao-css',
  moduleId: 'html-css',
  title: 'Introducao ao CSS',
  description:
    'Aprenda o que e CSS, como funcionam os seletores, as propriedades basicas de estilo e como conectar CSS ao HTML.',
  order: 4,
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content:
        'Se o HTML e a estrutura da casa, o CSS e a decoracao: cores das paredes, tamanho dos moveis, posicao dos quadros. Com CSS, voce transforma uma pagina sem graca em algo bonito!\n\n## O que e CSS?\n\n**CSS** significa **Cascading Style Sheets** (Folhas de Estilo em Cascata). E a linguagem usada para definir a aparencia visual das paginas HTML — cores, fontes, espacamentos, layouts e muito mais.\n\nSe o HTML e a estrutura de uma casa (paredes, portas, janelas), o CSS e a decoracao (pintura, moveis, iluminacao). Sem CSS, todas as paginas da internet seriam apenas texto preto em fundo branco.\n\nO CSS funciona com um conceito simples: voce **seleciona** um elemento HTML e define **propriedades** visuais para ele.',
    },
    {
      type: 'text',
      content:
        '## Sintaxe do CSS\n\nA estrutura basica do CSS e:\n\n```\nseletor {\n  propriedade: valor;\n}\n```\n\n- **Seletor**: Define qual elemento HTML sera estilizado.\n- **Propriedade**: O aspecto visual que voce quer alterar (cor, tamanho, etc.).\n- **Valor**: O valor da propriedade (vermelho, 16px, etc.).\n- Cada declaracao termina com ponto e virgula `;`.\n- As declaracoes ficam entre chaves `{ }`.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'css',
        filename: 'seletores.css',
        code: '/* Seletor de tag - estiliza todos os paragrafos */\np {\n  color: blue;\n  font-size: 16px;\n}\n\n/* Seletor de classe - estiliza elementos com class="destaque" */\n.destaque {\n  color: red;\n  font-weight: bold;\n}\n\n/* Seletor de ID - estiliza o elemento com id="titulo" */\n#titulo {\n  color: green;\n  font-size: 32px;\n}',
        description:
          'Os tres tipos de seletores mais comuns: tag (aplica a todos os elementos daquela tag), classe (usa ponto antes do nome) e ID (usa cerquilha antes do nome).',
      },
    },
    {
      type: 'text',
      content:
        '## Seletores CSS\n\nExistem tres seletores basicos que voce precisa conhecer:\n\n### Seletor de tag\nSeleciona todos os elementos de uma tag. Exemplo: `p { }` estiliza todos os paragrafos.\n\n### Seletor de classe (`.`)\nSeleciona elementos que possuem uma determinada classe. No HTML, definimos a classe com o atributo `class`. Exemplo: `.destaque { }` estiliza todos os elementos com `class="destaque"`. Um elemento pode ter varias classes.\n\n### Seletor de ID (`#`)\nSeleciona um unico elemento pelo seu ID. No HTML, definimos o ID com o atributo `id`. Exemplo: `#titulo { }` estiliza o elemento com `id="titulo"`. Cada ID deve ser unico na pagina.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Prefira usar classes em vez de IDs para estilizacao. Classes podem ser reutilizadas em varios elementos, enquanto IDs devem ser unicos. Use IDs apenas quando realmente precisar identificar um elemento unico.',
    },
    {
      type: 'text',
      content:
        '## Como vincular CSS ao HTML\n\nExistem tres formas de adicionar CSS a uma pagina HTML:\n\n### 1. CSS Externo (recomendado)\nCrie um arquivo `.css` separado e vincule-o no `<head>` do HTML usando a tag `<link>`. Essa e a melhor pratica pois separa estrutura (HTML) e estilo (CSS).\n\n### 2. CSS Interno\nColoque o CSS dentro de uma tag `<style>` no `<head>` do HTML. Util para estilos especificos de uma unica pagina.\n\n### 3. CSS Inline\nAdicione estilos diretamente no elemento HTML usando o atributo `style`. Nao e recomendado para uso frequente pois mistura HTML e CSS.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'html',
        filename: 'vinculando-css.html',
        code: '<!DOCTYPE html>\n<html>\n<head>\n  <!-- CSS Externo (recomendado) -->\n  <link rel="stylesheet" href="estilos.css">\n\n  <!-- CSS Interno -->\n  <style>\n    h1 {\n      color: navy;\n    }\n  </style>\n</head>\n<body>\n  <h1>Titulo Estilizado</h1>\n\n  <!-- CSS Inline (evite usar muito) -->\n  <p style="color: red; font-size: 18px;">Texto vermelho</p>\n</body>\n</html>',
        description:
          'As tres formas de adicionar CSS ao HTML: arquivo externo com link, tag style no head e atributo style no elemento.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'css',
        filename: 'propriedades-basicas.css',
        code: 'body {\n  background-color: #f0f0f0;\n  font-family: Arial, sans-serif;\n}\n\nh1 {\n  color: #333333;\n  font-size: 28px;\n  text-align: center;\n}\n\np {\n  color: #666666;\n  font-size: 16px;\n  line-height: 1.5;\n}',
        description:
          'Propriedades CSS basicas: background-color muda o fundo, color muda a cor do texto, font-size o tamanho da fonte, font-family a fonte e text-align o alinhamento.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'Cores em CSS podem ser definidas de varias formas: pelo nome (red, blue), hexadecimal (#ff0000), RGB (rgb(255, 0, 0)) ou HSL (hsl(0, 100%, 50%)). O formato hexadecimal e o mais comum.',
    },
    {
      type: 'callout',
      content:
        'Voce nao precisa decorar todas as tags! Com a pratica, as mais usadas ficam automaticas.',
      calloutType: 'tip',
    },
    {
      type: 'text',
      content:
        '## Variaveis CSS (Custom Properties)\n\nVariaveis CSS, tambem chamadas de **Custom Properties**, permitem armazenar valores reutilizaveis diretamente no CSS. Isso facilita a manutencao: basta mudar o valor da variavel em um lugar e ele se propaga por todo o projeto.\n\nVariaveis CSS sao declaradas com dois hifens (`--`) e lidas com a funcao `var()`.\n\nO local ideal para declarar variaveis globais e dentro do seletor especial **`:root`**, que representa o elemento raiz do documento (equivalente ao `<html>`). Variaveis declaradas em `:root` ficam disponiveis em todo o CSS.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'css',
        filename: 'variaveis-css.css',
        code: ':root {\n  /* Declarando variaveis de cor */\n  --cor-primaria: #007bff;\n  --cor-secundaria: #6c757d;\n  --cor-texto: #333333;\n  --cor-fundo: #f8f9fa;\n\n  /* Variaveis de espacamento */\n  --espaco-pequeno: 8px;\n  --espaco-medio: 16px;\n  --espaco-grande: 32px;\n\n  /* Variavel de fonte */\n  --fonte-base: "Arial", sans-serif;\n}\n\nbody {\n  font-family: var(--fonte-base);\n  color: var(--cor-texto);\n  background-color: var(--cor-fundo);\n}\n\n.botao {\n  background-color: var(--cor-primaria);\n  padding: var(--espaco-pequeno) var(--espaco-medio);\n  color: white;\n}\n\n/* Sobrescrevendo uma variavel localmente */\n.botao-secundario {\n  background-color: var(--cor-secundaria);\n}',
        description: 'Variaveis CSS declaradas em :root ficam disponiveis em todo o documento. Use var() para utilizar o valor. Isso centraliza as cores e espacamentos do projeto.',
      },
    },
    {
      type: 'text',
      content:
        '## Pseudo-classes e Pseudo-elementos\n\n### Pseudo-classes\nPseudo-classes selecionam elementos em um **estado especial**. Elas sao adicionadas apos o seletor com dois pontos (`:`).\n\n- **`:hover`**: Quando o cursor esta sobre o elemento.\n- **`:focus`**: Quando o elemento esta em foco (clicado ou navegado por teclado).\n- **`:active`**: Enquanto o elemento esta sendo clicado.\n- **`:nth-child(n)`**: Seleciona o n-esimo filho. Aceita numeros, `odd` (impares) ou `even` (pares).\n- **`:first-child`** e **`:last-child`**: Primeiro e ultimo filho.\n\n### Pseudo-elementos\nPseudo-elementos permitem estilizar **partes especificas** de um elemento. Usam dois pontos duplos (`::`).\n\n- **`::before`**: Insere conteudo antes do conteudo do elemento.\n- **`::after`**: Insere conteudo apos o conteudo do elemento.\n- **`::placeholder`**: Estiliza o texto placeholder de inputs.\n\nPseudo-elementos com `::before` e `::after` precisam da propriedade `content` para funcionar.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'css',
        filename: 'pseudo-classes-elementos.css',
        code: '/* Pseudo-classes de estado */\na:hover {\n  color: #0056b3;\n  text-decoration: underline;\n}\n\ninput:focus {\n  outline: 2px solid #007bff;\n  border-color: #007bff;\n}\n\n/* nth-child: zebrar linhas de uma tabela */\ntr:nth-child(even) {\n  background-color: #f2f2f2;\n}\n\n/* Primeiro e ultimo filho */\nli:first-child {\n  font-weight: bold;\n}\n\nli:last-child {\n  border-bottom: none;\n}\n\n/* Pseudo-elementos ::before e ::after */\n.destaque::before {\n  content: "★ ";\n  color: gold;\n}\n\n.citacao::after {\n  content: " — Fonte";\n  font-style: italic;\n  color: gray;\n}\n\n/* Estilizando o placeholder */\ninput::placeholder {\n  color: #aaa;\n  font-style: italic;\n}',
        description: 'Pseudo-classes para estados interativos (:hover, :focus) e estruturais (:nth-child). Pseudo-elementos ::before e ::after para adicionar conteudo decorativo via CSS.',
      },
    },
  ],
  challenges: [
    {
      id: 'intro-css-c1',
      title: 'Primeiros estilos',
      description:
        'Escreva CSS para estilizar a tag h1 com cor azul (blue), tamanho de fonte 36px e alinhamento centralizado (text-align: center).',
      language: 'css',
      starterCode: '/* Estilize a tag h1 aqui */\n',
      solution:
        'h1 {\n  color: blue;\n  font-size: 36px;\n  text-align: center;\n}',
      hints: [
        'Use o seletor de tag h1 seguido de chaves { }.',
        'Dentro das chaves, defina cada propriedade: valor; em uma linha.',
        'As propriedades sao color, font-size e text-align.',
      ],
    },
    {
      id: 'intro-css-c2',
      title: 'Seletores de classe e ID',
      description:
        'Crie um estilo para a classe "alerta" com cor vermelha (red) e negrito (font-weight: bold), e um estilo para o ID "cabecalho" com fundo cinza (#cccccc) e padding de 20px.',
      language: 'css',
      starterCode: '/* Estilize a classe .alerta e o ID #cabecalho aqui */\n',
      solution:
        '.alerta {\n  color: red;\n  font-weight: bold;\n}\n\n#cabecalho {\n  background-color: #cccccc;\n  padding: 20px;\n}',
      hints: [
        'Use .alerta para selecionar a classe e #cabecalho para selecionar o ID.',
        'font-weight: bold deixa o texto em negrito.',
        'background-color define a cor de fundo e padding adiciona espaco interno.',
      ],
    },
    {
      id: 'intro-css-c3',
      title: 'Estilizando o body',
      description:
        'Estilize o body com: cor de fundo #f5f5f5 (background-color), fonte Arial (font-family: Arial, sans-serif), cor de texto #333 e line-height de 1.6.',
      language: 'css',
      starterCode: '/* Estilize o body aqui */\n',
      solution:
        'body {\n  background-color: #f5f5f5;\n  font-family: Arial, sans-serif;\n  color: #333;\n  line-height: 1.6;\n}',
      hints: [
        'Use o seletor de tag body.',
        'font-family define a fonte. Coloque fonts alternativas separadas por virgula.',
        'line-height define a altura da linha (espacamento entre linhas de texto).',
      ],
    },
  ],
};
