import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'introducao-html',
  moduleId: 'html-css',
  title: 'Introducao ao HTML',
  description:
    'Aprenda o que e HTML, como funcionam as tags e a estrutura basica de uma pagina web com html, head e body.',
  order: 0,
  type: 'lesson',
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content:
        'Se um site fosse uma casa, o HTML seria a estrutura: paredes, portas, janelas e telhado. Sem HTML, nao existe pagina web. Vamos aprender a construir essa estrutura!\n\n## O que e HTML?\n\n**HTML** significa **HyperText Markup Language** (Linguagem de Marcacao de Hipertexto). E a linguagem usada para criar a estrutura de todas as paginas da internet. Quando voce acessa qualquer site, o navegador le o codigo HTML e transforma ele naquilo que voce ve na tela.\n\nHTML nao e uma linguagem de programacao — e uma linguagem de **marcacao**. Isso significa que ela nao faz calculos nem toma decisoes. Ela apenas organiza e estrutura o conteudo: textos, imagens, links, formularios e muito mais.',
    },
    {
      type: 'text',
      content:
        '## Tags HTML\n\nO HTML funciona com **tags**. Tags sao como etiquetas que dizem ao navegador o que cada parte do conteudo representa. A maioria das tags vem em pares: uma **tag de abertura** e uma **tag de fechamento**.\n\n- Tag de abertura: `<tag>`\n- Tag de fechamento: `</tag>`\n- O conteudo fica entre as duas tags\n\nPor exemplo, `<p>Ola mundo!</p>` cria um paragrafo com o texto "Ola mundo!". A tag `<p>` abre o paragrafo e `</p>` fecha.\n\nAlgumas tags nao precisam de fechamento, como `<br>` (quebra de linha) e `<img>` (imagem). Essas sao chamadas de **tags auto-fechantes**.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'html',
        filename: 'estrutura.html',
        code: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <title>Minha Primeira Pagina</title>\n</head>\n<body>\n  <h1>Ola, Mundo!</h1>\n  <p>Esta e minha primeira pagina HTML.</p>\n</body>\n</html>',
        description:
          'Esta e a estrutura basica de qualquer pagina HTML. O DOCTYPE declara o tipo do documento, o head contem metadados e o body contem o conteudo visivel.',
      },
    },
    {
      type: 'text',
      content:
        '## Entendendo a estrutura\n\nVamos entender cada parte:\n\n- **`<!DOCTYPE html>`**: Diz ao navegador que este e um documento HTML5. Deve ser sempre a primeira linha.\n- **`<html>`**: A tag raiz que envolve todo o conteudo da pagina. O atributo `lang="pt-BR"` indica o idioma.\n- **`<head>`**: Contem informacoes sobre a pagina que nao aparecem diretamente na tela, como o titulo da aba, o charset (codificacao de caracteres) e links para arquivos CSS.\n- **`<meta charset="UTF-8">`**: Define a codificacao de caracteres para suportar acentos e caracteres especiais.\n- **`<title>`**: Define o titulo que aparece na aba do navegador.\n- **`<body>`**: Contem todo o conteudo visivel da pagina — textos, imagens, links, etc.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Sempre comece seus documentos HTML com `<!DOCTYPE html>`. Sem ele, o navegador pode entrar no "modo de compatibilidade" e renderizar a pagina de forma inesperada.',
    },
    {
      type: 'text',
      content:
        '## Titulos e paragrafos\n\nO HTML possui seis niveis de titulos, de `<h1>` (o mais importante) ate `<h6>` (o menos importante). O `<h1>` deve ser usado para o titulo principal da pagina e geralmente aparece apenas uma vez.\n\nA tag `<p>` cria paragrafos de texto. O navegador adiciona automaticamente um espaco antes e depois de cada paragrafo para melhorar a legibilidade.\n\nComentarios em HTML sao escritos entre `<!--` e `-->`. Eles nao aparecem na pagina e servem para anotar o codigo.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'html',
        filename: 'titulos-paragrafos.html',
        code: '<body>\n  <h1>Titulo Principal</h1>\n  <h2>Subtitulo</h2>\n  <p>Este e um paragrafo de texto.</p>\n  <p>Este e outro paragrafo.</p>\n  <!-- Isto e um comentario HTML -->\n</body>',
        description:
          'Exemplo mostrando titulos e paragrafos dentro do body. O h1 cria o titulo principal, h2 o subtitulo e p cria paragrafos. Comentarios ficam entre <!-- e --> e nao aparecem na pagina.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'A indentacao (espacos no inicio das linhas) nao e obrigatoria em HTML, mas e uma boa pratica. Ela torna o codigo muito mais facil de ler e entender, especialmente quando a pagina cresce.',
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
        '## HTML Semantico\n\nHTML semantico significa usar as tags certas para o conteudo certo. Em vez de usar `<div>` para tudo, o HTML5 introduziu tags que descrevem o significado do conteudo que envolvem. Isso beneficia a acessibilidade, o SEO e a legibilidade do codigo.\n\nAs principais tags semanticas sao:\n\n- **`<header>`**: Cabecalho da pagina ou de uma secao, geralmente com logo e navegacao.\n- **`<nav>`**: Bloco de links de navegacao principal.\n- **`<main>`**: Conteudo principal e unico da pagina (use apenas um por pagina).\n- **`<section>`**: Uma secao tematica do conteudo, geralmente com um titulo.\n- **`<article>`**: Conteudo independente e autocontido (post de blog, noticia, comentario).\n- **`<aside>`**: Conteudo relacionado mas secundario, como uma barra lateral.\n- **`<footer>`**: Rodape da pagina ou de uma secao, com informacoes de contato, copyright, etc.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'html',
        filename: 'semantico.html',
        code: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <meta name="description" content="Blog de tecnologia com artigos sobre programacao">\n  <title>Blog Tech</title>\n</head>\n<body>\n  <header>\n    <nav>\n      <a href="/">Home</a>\n      <a href="/artigos">Artigos</a>\n      <a href="/sobre">Sobre</a>\n    </nav>\n  </header>\n\n  <main>\n    <section>\n      <h2>Artigos Recentes</h2>\n      <article>\n        <h3>Aprendendo HTML Semantico</h3>\n        <p>HTML semantico melhora acessibilidade e SEO...</p>\n      </article>\n    </section>\n\n    <aside>\n      <h3>Links Uteis</h3>\n      <ul>\n        <li><a href="#">MDN Web Docs</a></li>\n      </ul>\n    </aside>\n  </main>\n\n  <footer>\n    <p>&copy; 2024 Blog Tech. Todos os direitos reservados.</p>\n  </footer>\n</body>\n</html>',
        description: 'Estrutura semantica completa usando header, nav, main, section, article, aside e footer. Tambem mostra meta tags importantes para SEO e responsividade.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Use `&copy;` para o simbolo de copyright (©), `&amp;` para o e comercial (&), `&lt;` e `&gt;` para os sinais de menor e maior (< e >), e `&nbsp;` para um espaco sem quebra. Esses sao chamados de entidades HTML.',
    },
  ],
  challenges: [
    {
      id: 'intro-html-c1',
      title: 'Estrutura basica HTML',
      description:
        'Crie a estrutura basica de uma pagina HTML com DOCTYPE, html, head, title (com o texto "Minha Pagina") e body com um titulo h1 dizendo "Bem-vindo!".',
      language: 'html',
      starterCode: '<!-- Crie a estrutura basica de uma pagina HTML aqui -->\n',
      solution:
        '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <title>Minha Pagina</title>\n</head>\n<body>\n  <h1>Bem-vindo!</h1>\n</body>\n</html>',
      hints: [
        'Comece com <!DOCTYPE html> na primeira linha.',
        'Dentro de <html>, crie o <head> com <title> e o <body> com <h1>.',
        'Nao esqueca de fechar todas as tags abertas.',
      ],
    },
    {
      id: 'intro-html-c2',
      title: 'Paragrafos e titulos',
      description:
        'Dentro de um <body>, crie um titulo h1 com "Sobre Mim", seguido de dois paragrafos: o primeiro com "Estou aprendendo HTML." e o segundo com "E muito divertido!".',
      language: 'html',
      starterCode:
        '<body>\n  <!-- Adicione o titulo e os paragrafos aqui -->\n</body>',
      solution:
        '<body>\n  <h1>Sobre Mim</h1>\n  <p>Estou aprendendo HTML.</p>\n  <p>E muito divertido!</p>\n</body>',
      hints: [
        'Use a tag <h1> para o titulo.',
        'Use a tag <p> para cada paragrafo.',
        'Cada tag precisa ser aberta e fechada corretamente.',
      ],
    },
  ],
};
