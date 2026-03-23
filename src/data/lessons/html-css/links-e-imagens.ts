import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'links-e-imagens',
  moduleId: 'html-css',
  title: 'Links e Imagens',
  description:
    'Aprenda a criar links para outras paginas, inserir imagens e usar figure e figcaption para legendas semanticas.',
  order: 2,
  estimatedMinutes: 12,
  sections: [
    {
      type: 'text',
      content:
        'Links sao como portas que levam de uma pagina para outra. Imagens sao como quadros na parede. Juntos, eles transformam uma pagina simples em algo navegavel e visual!\n\n## Links com a tag `<a>`\n\nLinks sao a base da web — e por causa deles que podemos navegar de uma pagina para outra. Em HTML, criamos links com a tag `<a>` (de "anchor", que significa ancora).\n\nA tag `<a>` precisa do atributo **`href`** (hypertext reference) que define para onde o link aponta. O texto entre `<a>` e `</a>` e o que o usuario ve e clica.\n\nO valor do `href` pode ser:\n- **URL absoluta**: endereco completo, como `https://www.google.com`\n- **URL relativa**: caminho para outra pagina no mesmo site, como `sobre.html`\n- **Ancora**: link para uma secao da mesma pagina, como `#contato`',
    },
    {
      type: 'code',
      codeExample: {
        language: 'html',
        filename: 'links.html',
        code: '<!-- Link externo (URL absoluta) -->\n<a href="https://www.google.com">Ir para o Google</a>\n\n<!-- Link interno (URL relativa) -->\n<a href="contato.html">Pagina de Contato</a>\n\n<!-- Link que abre em nova aba -->\n<a href="https://www.google.com" target="_blank">Abrir Google em nova aba</a>\n\n<!-- Link ancora para secao da mesma pagina -->\n<a href="#rodape">Ir para o rodape</a>',
        description:
          'Exemplos de links: externo com URL completa, interno com caminho relativo, link que abre em nova aba com target="_blank" e link ancora para uma secao da mesma pagina.',
      },
    },
    {
      type: 'text',
      content:
        '## O atributo `target`\n\nPor padrao, quando o usuario clica em um link, a pagina de destino abre na mesma aba. Usando o atributo **`target="_blank"`**, o link abre em uma nova aba do navegador.\n\nIsso e util para links externos, onde voce nao quer que o usuario saia do seu site. Para links internos (dentro do mesmo site), geralmente nao usamos `target="_blank"`.\n\nOutros valores possiveis de target sao `_self` (padrao, mesma aba), `_parent` e `_top`, mas `_blank` e o mais utilizado alem do padrao.',
    },
    {
      type: 'text',
      content:
        '## Imagens com a tag `<img>`\n\nPara inserir imagens em uma pagina HTML, usamos a tag `<img>`. Essa e uma **tag auto-fechante** — ela nao tem tag de fechamento.\n\nA tag `<img>` precisa de dois atributos importantes:\n\n- **`src`** (source): O caminho ou URL da imagem.\n- **`alt`** (alternative text): Um texto alternativo que descreve a imagem. Ele aparece quando a imagem nao carrega e e essencial para acessibilidade (leitores de tela usam esse texto).\n\nOpcionalmente, voce pode definir `width` (largura) e `height` (altura) em pixels.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'html',
        filename: 'imagens.html',
        code: '<!-- Imagem com caminho relativo -->\n<img src="fotos/gato.jpg" alt="Um gato dormindo no sofa">\n\n<!-- Imagem com URL absoluta -->\n<img src="https://exemplo.com/logo.png" alt="Logo da empresa">\n\n<!-- Imagem com largura e altura definidas -->\n<img src="foto.jpg" alt="Minha foto" width="300" height="200">',
        description:
          'Exemplos de insercao de imagens. O atributo src define o caminho da imagem e o alt fornece uma descricao textual para acessibilidade.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Nunca esqueca o atributo alt nas imagens! Alem de ser importante para acessibilidade (pessoas que usam leitores de tela), ele tambem ajuda no SEO (mecanismos de busca como o Google) e aparece quando a imagem nao consegue carregar.',
    },
    {
      type: 'text',
      content:
        '## Figure e Figcaption\n\nAs tags `<figure>` e `<figcaption>` sao usadas para associar uma legenda a uma imagem de forma semantica. O `<figure>` envolve a imagem e o `<figcaption>` contem o texto da legenda.\n\nIsso e melhor do que simplesmente colocar um paragrafo abaixo da imagem, porque o navegador e os leitores de tela entendem que a legenda pertence aquela imagem.\n\nO `<figure>` tambem pode ser usado para graficos, diagramas, trechos de codigo e outros conteudos que precisam de legenda.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'html',
        filename: 'figure-figcaption.html',
        code: '<figure>\n  <img src="paisagem.jpg" alt="Paisagem de montanhas ao por do sol">\n  <figcaption>Vista das montanhas durante o por do sol em Minas Gerais.</figcaption>\n</figure>\n\n<!-- Imagem como link -->\n<a href="https://www.exemplo.com">\n  <img src="logo.png" alt="Logo da empresa - Clique para visitar">\n</a>',
        description:
          'Exemplo de figure com figcaption para legenda semantica. Tambem mostra como colocar uma imagem dentro de um link para torna-la clicavel.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Caminhos relativos sao baseados na localizacao do arquivo HTML atual. Se o HTML esta na pasta raiz e a imagem esta em uma pasta "imagens", o caminho seria "imagens/foto.jpg". Use "../" para voltar uma pasta acima.',
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
        '## Imagens Responsivas e Acessibilidade\n\n### Imagens responsivas com CSS\nPara que imagens se adaptem a diferentes tamanhos de tela, use CSS em vez de atributos HTML fixos. A combinacao `width: 100%` e `height: auto` faz a imagem ocupar o espaco disponivel mantendo a proporcao original.\n\n### O elemento `<picture>`\nO elemento `<picture>` permite fornecer diferentes versoes de uma imagem para diferentes situacoes — como formatos modernos (WebP) com fallback, ou imagens diferentes para mobile e desktop.\n\n### Acessibilidade em imagens\nO atributo `alt` e essencial para acessibilidade:\n- Para imagens informativas, descreva o que a imagem mostra.\n- Para imagens decorativas (puramente visuais), use `alt=""` — leitores de tela vao ignora-las.\n- Nunca omita o atributo `alt`, mesmo que vazio.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'html',
        filename: 'imagens-responsivas.html',
        code: '<!-- Imagem responsiva com CSS -->\n<img src="foto.jpg"\n  alt="Equipe da empresa reunida em escritorio moderno"\n  style="width: 100%; height: auto; display: block;">\n\n<!-- Imagem decorativa: alt vazio para leitores de tela ignorarem -->\n<img src="divisor-decorativo.png" alt="">\n\n<!-- Picture: formatos modernos com fallback -->\n<picture>\n  <source srcset="foto.webp" type="image/webp">\n  <source srcset="foto.jpg" type="image/jpeg">\n  <img src="foto.jpg" alt="Paisagem de montanhas ao amanhecer">\n</picture>\n\n<!-- Picture: imagens diferentes por tamanho de tela -->\n<picture>\n  <source media="(min-width: 768px)" srcset="banner-desktop.jpg">\n  <img src="banner-mobile.jpg" alt="Banner promocional">\n</picture>',
        description: 'Imagens responsivas com CSS, elemento picture para formatos modernos e fallback, e boas praticas de acessibilidade com alt descritivo ou vazio para imagens decorativas.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Para melhorar o desempenho de carregamento da pagina, adicione `loading="lazy"` nas imagens que ficam abaixo da area visivel inicial. Isso instrui o navegador a carrega-las apenas quando o usuario estiver prestes a rola-las para a tela: `<img src="foto.jpg" alt="..." loading="lazy">`.',
    },
  ],
  challenges: [
    {
      id: 'link-img-c1',
      title: 'Criando links',
      description:
        'Crie dois links: o primeiro com o texto "Visite o Google" apontando para "https://www.google.com" e abrindo em nova aba, e o segundo com o texto "Pagina Inicial" apontando para "index.html".',
      language: 'html',
      starterCode: '<!-- Crie os dois links aqui -->\n',
      solution:
        '<a href="https://www.google.com" target="_blank">Visite o Google</a>\n<a href="index.html">Pagina Inicial</a>',
      hints: [
        'Use a tag <a> com o atributo href para definir o destino.',
        'Adicione target="_blank" apenas no link externo.',
        'O texto entre <a> e </a> e o que aparece na pagina.',
      ],
    },
    {
      id: 'link-img-c2',
      title: 'Inserindo imagens',
      description:
        'Insira uma imagem com src="paisagem.jpg" e alt="Uma bela paisagem com montanhas" com largura de 400 pixels.',
      language: 'html',
      starterCode: '<!-- Insira a imagem aqui -->\n',
      solution:
        '<img src="paisagem.jpg" alt="Uma bela paisagem com montanhas" width="400">',
      hints: [
        'A tag <img> e auto-fechante, nao precisa de </img>.',
        'Use o atributo src para o caminho e alt para a descricao.',
        'Use o atributo width para definir a largura em pixels.',
      ],
    },
    {
      id: 'link-img-c3',
      title: 'Figure com legenda',
      description:
        'Crie um <figure> contendo uma imagem (src="foto.jpg", alt="Foto da praia") e um <figcaption> com o texto "Praia de Copacabana no verao".',
      language: 'html',
      starterCode: '<!-- Crie o figure com imagem e legenda aqui -->\n',
      solution:
        '<figure>\n  <img src="foto.jpg" alt="Foto da praia">\n  <figcaption>Praia de Copacabana no verao</figcaption>\n</figure>',
      hints: [
        'Comece com a tag <figure> que envolve tudo.',
        'Dentro de <figure>, coloque a tag <img> com src e alt.',
        'Adicione <figcaption> com o texto da legenda dentro de <figure>.',
      ],
    },
  ],
};
