import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'box-model-e-layout',
  moduleId: 'html-css',
  title: 'Box Model e Layout',
  description:
    'Entenda o modelo de caixa do CSS: margin, border, padding e content, alem de width, height, box-sizing e display.',
  order: 5,
  type: 'lesson',
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content:
        'Todo elemento HTML e como uma caixa de presente: tem o conteudo dentro, um acolchoamento ao redor (padding), uma borda visivel, e um espaco externo (margin). Entender isso e a chave do layout!\n\n## O que e o Box Model?\n\nNo CSS, todo elemento HTML e tratado como uma **caixa retangular**. O **Box Model** (Modelo de Caixa) descreve como essa caixa e composta. Entender o Box Model e fundamental para controlar o layout das suas paginas.\n\nCada caixa e formada por 4 camadas, de dentro para fora:\n\n1. **Content** (conteudo): A area onde o texto e os elementos filhos aparecem.\n2. **Padding** (preenchimento): Espaco entre o conteudo e a borda. E transparente.\n3. **Border** (borda): A linha ao redor do padding e do conteudo.\n4. **Margin** (margem): Espaco externo entre a borda e os outros elementos. E transparente.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'css',
        filename: 'box-model.css',
        code: '.caixa {\n  /* Conteudo */\n  width: 300px;\n  height: 200px;\n\n  /* Padding (espaco interno) */\n  padding: 20px;\n\n  /* Borda */\n  border: 2px solid #333;\n\n  /* Margem (espaco externo) */\n  margin: 10px;\n\n  background-color: #e0e0e0;\n}',
        description:
          'Exemplo do Box Model aplicado. O tamanho total visivel sera: 300 + 20*2 (padding) + 2*2 (border) = 344px de largura e 200 + 20*2 + 2*2 = 244px de altura. A margem fica fora da caixa.',
      },
    },
    {
      type: 'text',
      content:
        '## Padding e Margin detalhados\n\nTanto padding quanto margin podem ser definidos de varias formas:\n\n- **Um valor**: `padding: 20px;` — aplica 20px em todos os lados.\n- **Dois valores**: `padding: 10px 20px;` — 10px em cima/baixo, 20px esquerda/direita.\n- **Tres valores**: `padding: 10px 20px 30px;` — 10px cima, 20px laterais, 30px baixo.\n- **Quatro valores**: `padding: 10px 20px 30px 40px;` — cima, direita, baixo, esquerda (sentido horario).\n\nVoce tambem pode definir cada lado individualmente: `padding-top`, `padding-right`, `padding-bottom`, `padding-left` (e o mesmo para margin).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'css',
        filename: 'padding-margin.css',
        code: '.card {\n  /* Padding individual por lado */\n  padding-top: 10px;\n  padding-right: 20px;\n  padding-bottom: 10px;\n  padding-left: 20px;\n\n  /* Equivalente usando atalho */\n  /* padding: 10px 20px; */\n\n  /* Margem: centralizar horizontalmente */\n  margin: 0 auto;\n\n  /* Borda com estilo */\n  border: 1px solid #ccc;\n  border-radius: 8px;\n}',
        description:
          'Exemplo de padding individual e atalho. O margin: 0 auto centraliza o elemento horizontalmente (0 cima/baixo, auto nas laterais). O border-radius arredonda os cantos.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Por padrao, width e height definem apenas o tamanho do conteudo. O padding e a borda sao adicionados por fora, aumentando o tamanho total. Para mudar isso, use `box-sizing: border-box;` — assim width e height incluem padding e borda.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'css',
        filename: 'box-sizing.css',
        code: '/* Boa pratica: aplicar border-box em tudo */\n* {\n  box-sizing: border-box;\n}\n\n.exemplo {\n  width: 300px;\n  padding: 20px;\n  border: 2px solid black;\n  /* Com border-box, a largura total continua 300px */\n  /* O conteudo fica com 300 - 40 - 4 = 256px */\n}',
        description:
          'Com box-sizing: border-box, o padding e a borda sao incluidos dentro do width/height definido, facilitando muito os calculos de layout.',
      },
    },
    {
      type: 'text',
      content:
        '## Display: block, inline e inline-block\n\nA propriedade `display` controla como um elemento se comporta no fluxo da pagina:\n\n### `display: block`\n- Ocupa toda a largura disponivel.\n- Sempre comeca em uma nova linha.\n- Aceita width, height, margin e padding.\n- Exemplos: `<div>`, `<p>`, `<h1>` a `<h6>`, `<ul>`.\n\n### `display: inline`\n- Ocupa apenas a largura do seu conteudo.\n- Nao comeca em nova linha (fica ao lado de outros elementos).\n- **Nao aceita** width e height.\n- Exemplos: `<span>`, `<a>`, `<strong>`, `<em>`.\n\n### `display: inline-block`\n- Combina os dois: fica na mesma linha (inline) mas aceita width e height (block).\n- Muito util para botoes e menus de navegacao.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'css',
        filename: 'display.css',
        code: '/* Elemento block: ocupa toda a largura */\n.bloco {\n  display: block;\n  width: 200px;\n  height: 100px;\n  background-color: #ddd;\n  margin-bottom: 10px;\n}\n\n/* Elemento inline: lado a lado, sem width/height */\n.tag {\n  display: inline;\n  background-color: #e0f0ff;\n  padding: 4px 8px;\n}\n\n/* Inline-block: lado a lado COM width/height */\n.botao {\n  display: inline-block;\n  width: 120px;\n  padding: 10px;\n  text-align: center;\n  background-color: #007bff;\n  color: white;\n}',
        description:
          'Comparacao entre block (nova linha, largura total), inline (lado a lado, sem dimensoes) e inline-block (lado a lado com dimensoes).',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'A regra `* { box-sizing: border-box; }` e usada em praticamente todos os projetos modernos. Ela facilita muito o calculo de tamanhos, pois o width/height que voce define e o tamanho final do elemento, incluindo padding e borda.',
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
        '## Transicoes CSS\n\nTransicoes CSS permitem animar mudancas de propriedades de forma suave, em vez de aplicar instantaneamente. Elas sao ativadas quando uma propriedade muda de valor — geralmente em resposta a uma pseudo-classe como `:hover`.\n\nA propriedade `transition` aceita:\n- **Propriedade alvo**: qual propriedade CSS sera animada (ou `all` para todas).\n- **Duracao**: quanto tempo a transicao leva (em `s` ou `ms`).\n- **Funcao de tempo** (opcional): a curva de aceleracao (`ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out`).\n- **Atraso** (opcional): quanto tempo esperar antes de iniciar (em `s` ou `ms`).\n\nVoce pode animar multiplas propriedades separando-as por virgula.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'css',
        filename: 'transicoes.css',
        code: '.botao {\n  background-color: #007bff;\n  color: white;\n  padding: 12px 24px;\n  border: none;\n  border-radius: 6px;\n  /* Transicao suave em background e transform */\n  transition: background-color 0.3s ease, transform 0.2s ease;\n  cursor: pointer;\n}\n\n.botao:hover {\n  background-color: #0056b3;\n  transform: translateY(-2px); /* Sobe levemente ao passar o mouse */\n}\n\n.botao:active {\n  transform: translateY(0); /* Volta ao lugar ao clicar */\n}\n\n/* Card com sombra animada */\n.card {\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n  transition: box-shadow 0.3s ease, transform 0.3s ease;\n}\n\n.card:hover {\n  box-shadow: 0 8px 16px rgba(0,0,0,0.15);\n  transform: translateY(-4px);\n}',
        description: 'Transicoes aplicadas a botoes e cards. O hover anima a cor de fundo e um deslocamento vertical com transform. O transition define quais propriedades e a duracao de cada uma.',
      },
    },
  ],
  challenges: [
    {
      id: 'box-c1',
      title: 'Criando um card',
      description:
        'Estilize a classe .card com: largura de 350px, padding de 24px, borda de 1px solida cinza (#ddd), border-radius de 12px e margem inferior de 16px.',
      language: 'css',
      starterCode: '/* Estilize a classe .card aqui */\n',
      solution:
        '.card {\n  width: 350px;\n  padding: 24px;\n  border: 1px solid #ddd;\n  border-radius: 12px;\n  margin-bottom: 16px;\n}',
      hints: [
        'Use o seletor .card seguido de chaves.',
        'border aceita tres valores: espessura, estilo e cor (ex: 1px solid #ddd).',
        'border-radius arredonda os cantos da caixa.',
      ],
    },
    {
      id: 'box-c2',
      title: 'Box sizing global',
      description:
        'Aplique box-sizing: border-box em todos os elementos da pagina usando o seletor universal (*). Depois, estilize a classe .container com largura de 100%, padding de 0 20px e margin 0 auto.',
      language: 'css',
      starterCode:
        '/* Aplique box-sizing global e estilize .container aqui */\n',
      solution:
        '* {\n  box-sizing: border-box;\n}\n\n.container {\n  width: 100%;\n  padding: 0 20px;\n  margin: 0 auto;\n}',
      hints: [
        'O seletor * seleciona todos os elementos da pagina.',
        'padding: 0 20px aplica 0 em cima/baixo e 20px nas laterais.',
        'margin: 0 auto centraliza o elemento horizontalmente.',
      ],
    },
    {
      id: 'box-c3',
      title: 'Botoes inline-block',
      description:
        'Estilize a classe .botao com display inline-block, padding de 12px 24px, cor de fundo #007bff (background-color), cor do texto branca (white), borda nenhuma (border: none) e border-radius de 6px.',
      language: 'css',
      starterCode: '/* Estilize a classe .botao aqui */\n',
      solution:
        '.botao {\n  display: inline-block;\n  padding: 12px 24px;\n  background-color: #007bff;\n  color: white;\n  border: none;\n  border-radius: 6px;\n}',
      hints: [
        'display: inline-block permite que o botao fique na mesma linha de outros e aceite width/height.',
        'padding: 12px 24px define 12px vertical e 24px horizontal.',
        'border: none remove qualquer borda padrao.',
      ],
    },
  ],
};
