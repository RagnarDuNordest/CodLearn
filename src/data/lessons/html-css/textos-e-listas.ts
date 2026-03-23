import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'textos-e-listas',
  moduleId: 'html-css',
  title: 'Textos e Listas em HTML',
  description:
    'Aprenda a usar titulos, paragrafos, formatacao de texto, citacoes e listas ordenadas e nao ordenadas em HTML.',
  order: 1,
  estimatedMinutes: 12,
  sections: [
    {
      type: 'text',
      content:
        'Assim como um documento do Word tem titulos, paragrafos e listas, o HTML tem tags especiais para organizar o texto da pagina. Vamos aprender as principais!\n\n## Titulos em HTML (h1 a h6)\n\nO HTML oferece seis niveis de titulos, de `<h1>` (o mais importante) ate `<h6>` (o menos importante). Eles servem para organizar o conteudo da pagina de forma hierarquica, assim como capitulos e subcapitulos de um livro.\n\n- **`<h1>`**: Titulo principal da pagina. Use apenas um por pagina.\n- **`<h2>`**: Subtitulo ou secao principal.\n- **`<h3>` a `<h6>`**: Subdivisoes cada vez menores.\n\nOs navegadores exibem cada nivel com um tamanho de fonte diferente, sendo o `<h1>` o maior e o `<h6>` o menor.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'html',
        filename: 'titulos.html',
        code: '<h1>Titulo Principal (h1)</h1>\n<h2>Subtitulo (h2)</h2>\n<h3>Secao (h3)</h3>\n<h4>Subsecao (h4)</h4>\n<h5>Detalhe (h5)</h5>\n<h6>Detalhe menor (h6)</h6>',
        description:
          'Os seis niveis de titulos HTML. Cada nivel tem um tamanho de fonte padrao diferente, do maior (h1) ao menor (h6).',
      },
    },
    {
      type: 'text',
      content:
        '## Paragrafos e formatacao de texto\n\nA tag `<p>` cria paragrafos. O navegador adiciona automaticamente um espaco antes e depois de cada paragrafo.\n\nPara formatar texto dentro de paragrafos, usamos:\n\n- **`<strong>`**: Deixa o texto em **negrito** e indica que ele e importante semanticamente.\n- **`<em>`**: Deixa o texto em *italico* e indica enfase.\n- **`<br>`**: Insere uma quebra de linha sem criar um novo paragrafo.\n- **`<hr>`**: Insere uma linha horizontal de separacao entre secoes de conteudo.\n\nA diferenca entre `<strong>` e `<b>` (e entre `<em>` e `<i>`) e que `<strong>` e `<em>` tem significado semantico — eles dizem ao navegador que o conteudo e importante ou enfatizado, nao apenas que deve ter uma aparencia diferente.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'html',
        filename: 'formatacao.html',
        code: '<p>Este e um paragrafo normal.</p>\n\n<p>Este paragrafo tem uma palavra <strong>importante</strong> e outra com <em>enfase</em>.</p>\n\n<p>Esta linha tem uma<br>quebra de linha no meio.</p>\n\n<hr>\n\n<p>Este paragrafo esta separado por uma linha horizontal.</p>',
        description:
          'Exemplo de paragrafos com formatacao. O strong cria negrito semantico, o em cria italico semantico, o br quebra a linha e o hr insere uma linha horizontal divisoria.',
      },
    },
    {
      type: 'text',
      content:
        '## Citacoes com blockquote\n\nA tag `<blockquote>` e usada para representar uma citacao em bloco, ou seja, um trecho de texto que foi retirado de outra fonte. O navegador geralmente exibe o blockquote com um recuo (margem a esquerda).\n\nVoce pode usar o atributo `cite` para indicar a URL da fonte original da citacao. Dentro do blockquote, e comum usar tags `<p>` para os paragrafos do texto citado.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'html',
        filename: 'citacao.html',
        code: '<blockquote cite="https://exemplo.com/artigo">\n  <p>A educacao e a arma mais poderosa que voce pode usar para mudar o mundo.</p>\n</blockquote>\n\n<p>— Nelson Mandela</p>',
        description:
          'Exemplo de citacao em bloco com blockquote. O atributo cite indica a fonte original. O navegador aplica um recuo automatico ao conteudo.',
      },
    },
    {
      type: 'text',
      content:
        '## Listas\n\nHTML oferece dois tipos de listas:\n\n### Lista nao ordenada (`<ul>`)\nCria uma lista com marcadores (bolinhas). Cada item e definido com `<li>`.\n\n### Lista ordenada (`<ol>`)\nCria uma lista numerada automaticamente. Tambem usa `<li>` para cada item.\n\nVoce pode aninhar listas, colocando uma lista dentro de um item `<li>` de outra lista. Isso cria sublistas com niveis diferentes de recuo.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'html',
        filename: 'listas.html',
        code: '<h2>Minha lista de compras</h2>\n<ul>\n  <li>Arroz</li>\n  <li>Feijao</li>\n  <li>Macarrao</li>\n</ul>\n\n<h2>Passos para fazer cafe</h2>\n<ol>\n  <li>Ferva a agua</li>\n  <li>Coloque o po de cafe no filtro</li>\n  <li>Despeje a agua quente</li>\n  <li>Sirva e aproveite!</li>\n</ol>',
        description:
          'Exemplo de lista nao ordenada (ul) com marcadores e lista ordenada (ol) com numeros. Cada item usa a tag li.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Use listas ordenadas (<ol>) quando a ordem dos itens importa (como instrucoes passo a passo). Use listas nao ordenadas (<ul>) quando a ordem nao faz diferenca (como uma lista de compras).',
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'A tag <hr> e auto-fechante e cria uma linha horizontal na pagina. Use-a para separar secoes de conteudo tematicamente diferentes dentro de uma mesma pagina.',
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
        '## Entidades HTML\n\nAlguns caracteres tem significado especial no HTML (como `<` e `>`) e nao podem ser usados diretamente no texto. Para exibi-los, usamos **entidades HTML** — codigos especiais que comecam com `&` e terminam com `;`.\n\nAs entidades mais usadas sao:\n\n- **`&lt;`** → `<` (menor que)\n- **`&gt;`** → `>` (maior que)\n- **`&amp;`** → `&` (e comercial)\n- **`&quot;`** → `"` (aspas duplas)\n- **`&copy;`** → `©` (copyright)\n- **`&reg;`** → `®` (marca registrada)\n- **`&trade;`** → `™` (trademark)\n- **`&nbsp;`** → espaco sem quebra (non-breaking space)\n- **`&euro;`** → `€` (euro)\n\nAlternativamente, muitos caracteres especiais podem ser inseridos diretamente se o arquivo estiver salvo em UTF-8 (que e o recomendado com `<meta charset="UTF-8">`).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'html',
        filename: 'entidades.html',
        code: '<p>Para criar um link em HTML, use a tag &lt;a&gt; com o atributo href.</p>\n\n<p>A empresa se chama Tecnologia &amp; Inovacao Ltda.</p>\n\n<p>&copy; 2024 Todos os direitos reservados.</p>\n\n<p>Preco: R$&nbsp;99,90</p>\n\n<p>5 &gt; 3 e 2 &lt; 7</p>',
        description: 'Uso de entidades HTML para exibir caracteres especiais. O &nbsp; e usado para criar um espaco que nao quebra em linha nova — util entre valores e unidades.',
      },
    },
    {
      type: 'text',
      content:
        '## Listas de Definicao\n\nAlem de listas ordenadas e nao ordenadas, o HTML tem um terceiro tipo: a **lista de definicao** (`<dl>`). Ela e usada para pares de termos e suas definicoes ou descricoes — como um glossario ou FAQ.\n\nA estrutura e:\n- **`<dl>`**: O container da lista de definicao.\n- **`<dt>`** (definition term): O termo a ser definido.\n- **`<dd>`** (definition description): A descricao ou definicao do termo.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'html',
        filename: 'lista-definicao.html',
        code: '<h2>Glossario de Programacao</h2>\n<dl>\n  <dt>HTML</dt>\n  <dd>Linguagem de marcacao usada para estruturar conteudo na web.</dd>\n\n  <dt>CSS</dt>\n  <dd>Linguagem de estilos usada para definir a aparencia visual de paginas HTML.</dd>\n\n  <dt>JavaScript</dt>\n  <dd>Linguagem de programacao que adiciona interatividade e logica as paginas web.</dd>\n</dl>',
        description: 'Lista de definicao com dl, dt e dd. Ideal para glossarios, FAQs e qualquer conteudo onde um termo precisa de uma descricao associada.',
      },
    },
  ],
  challenges: [
    {
      id: 'txt-list-c1',
      title: 'Titulos e paragrafos formatados',
      description:
        'Crie um titulo h1 com "Meu Blog", um subtitulo h2 com "Primeiro Post" e um paragrafo com o texto "Hoje eu aprendi HTML!" onde a palavra "HTML" esteja em negrito usando <strong>.',
      language: 'html',
      starterCode: '<!-- Crie os titulos e o paragrafo aqui -->\n',
      solution:
        '<h1>Meu Blog</h1>\n<h2>Primeiro Post</h2>\n<p>Hoje eu aprendi <strong>HTML</strong>!</p>',
      hints: [
        'Use <h1> para o titulo principal e <h2> para o subtitulo.',
        'Envolva a palavra "HTML" com <strong> e </strong> dentro do paragrafo.',
      ],
    },
    {
      id: 'txt-list-c2',
      title: 'Lista de compras',
      description:
        'Crie um titulo h2 com "Lista de Compras" e uma lista nao ordenada (<ul>) com 4 itens: Leite, Pao, Ovos e Manteiga.',
      language: 'html',
      starterCode: '<!-- Crie o titulo e a lista de compras aqui -->\n',
      solution:
        '<h2>Lista de Compras</h2>\n<ul>\n  <li>Leite</li>\n  <li>Pao</li>\n  <li>Ovos</li>\n  <li>Manteiga</li>\n</ul>',
      hints: [
        'Use <ul> para criar a lista nao ordenada.',
        'Cada item da lista deve estar dentro de <li> e </li>.',
        'A lista inteira (<ul> com os <li>) deve vir depois do titulo <h2>.',
      ],
    },
    {
      id: 'txt-list-c3',
      title: 'Receita com lista ordenada e citacao',
      description:
        'Crie um titulo h2 com "Como fazer suco de laranja", uma lista ordenada (<ol>) com 3 passos: "Descasque as laranjas", "Coloque no liquidificador" e "Sirva com gelo". Depois adicione um <hr> e um <blockquote> com o texto "Suco natural e sempre a melhor opcao!".',
      language: 'html',
      starterCode: '<!-- Crie a receita com lista ordenada e citacao aqui -->\n',
      solution:
        '<h2>Como fazer suco de laranja</h2>\n<ol>\n  <li>Descasque as laranjas</li>\n  <li>Coloque no liquidificador</li>\n  <li>Sirva com gelo</li>\n</ol>\n<hr>\n<blockquote>\n  <p>Suco natural e sempre a melhor opcao!</p>\n</blockquote>',
      hints: [
        'Use <ol> em vez de <ul> para uma lista numerada.',
        'Use <hr> para inserir a linha horizontal de separacao.',
        'O <blockquote> envolve o texto da citacao, com <p> dentro.',
      ],
    },
  ],
};
