import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'flexbox',
  moduleId: 'html-css',
  title: 'Flexbox',
  description:
    'Domine o Flexbox para criar layouts flexiveis com alinhamento e distribuicao de espacos entre elementos.',
  order: 6,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        'Imagine organizar livros em uma prateleira: voce pode alinha-los a esquerda, centralizar ou distribuir igualmente. Flexbox faz exatamente isso com elementos na tela!\n\n## O que e Flexbox?\n\n**Flexbox** (Flexible Box Layout) e um modelo de layout CSS que facilita a distribuicao de espaco e o alinhamento de elementos dentro de um container. Antes do Flexbox, criar layouts era complicado e envolvia truques com floats e posicionamento.\n\nCom Flexbox, voce define um **container flex** e os **itens flex** dentro dele sao organizados automaticamente. O Flexbox trabalha em **uma dimensao** por vez: ou na horizontal (linha) ou na vertical (coluna).\n\nPara ativar o Flexbox, basta adicionar `display: flex;` ao elemento pai (container).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'css',
        filename: 'flexbox-basico.css',
        code: '.container {\n  display: flex;\n  /* Os filhos agora sao itens flex e ficam lado a lado */\n}\n\n/* Exemplo com HTML:\n   <div class="container">\n     <div class="item">1</div>\n     <div class="item">2</div>\n     <div class="item">3</div>\n   </div>\n*/',
        description:
          'Ao adicionar display: flex ao container, todos os elementos filhos diretos se tornam itens flex e ficam lado a lado automaticamente.',
      },
    },
    {
      type: 'text',
      content:
        '## flex-direction\n\nA propriedade **`flex-direction`** define a direcao em que os itens sao organizados dentro do container:\n\n- **`row`** (padrao): Itens ficam em linha, da esquerda para a direita.\n- **`row-reverse`**: Itens ficam em linha, da direita para a esquerda.\n- **`column`**: Itens ficam em coluna, de cima para baixo.\n- **`column-reverse`**: Itens ficam em coluna, de baixo para cima.\n\nO eixo principal (main axis) e definido pelo flex-direction. O eixo cruzado (cross axis) e o perpendicular ao principal.',
    },
    {
      type: 'text',
      content:
        '## justify-content\n\nA propriedade **`justify-content`** controla como os itens sao distribuidos ao longo do **eixo principal** (horizontal por padrao):\n\n- **`flex-start`** (padrao): Itens alinhados no inicio.\n- **`flex-end`**: Itens alinhados no final.\n- **`center`**: Itens centralizados.\n- **`space-between`**: Espaco igual entre os itens (sem espaco nas bordas).\n- **`space-around`**: Espaco igual ao redor de cada item.\n- **`space-evenly`**: Espaco totalmente igual entre todos os itens e as bordas.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'css',
        filename: 'justify-align.css',
        code: '.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 10px 20px;\n  background-color: #333;\n}\n\n.centralizado {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}',
        description:
          'Dois exemplos comuns: uma barra de navegacao com itens distribuidos (space-between) e um container que centraliza o conteudo tanto horizontal quanto verticalmente.',
      },
    },
    {
      type: 'text',
      content:
        '## align-items\n\nA propriedade **`align-items`** controla o alinhamento dos itens no **eixo cruzado** (vertical por padrao):\n\n- **`stretch`** (padrao): Itens esticam para ocupar toda a altura do container.\n- **`flex-start`**: Itens alinhados no topo.\n- **`flex-end`**: Itens alinhados na base.\n- **`center`**: Itens centralizados verticalmente.\n- **`baseline`**: Itens alinhados pela linha de base do texto.',
    },
    {
      type: 'text',
      content:
        '## flex-wrap e gap\n\n### flex-wrap\nPor padrao, os itens flex tentam caber em uma unica linha, mesmo que fiquem espremidos. A propriedade **`flex-wrap`** controla esse comportamento:\n\n- **`nowrap`** (padrao): Todos os itens ficam em uma linha.\n- **`wrap`**: Itens quebram para a proxima linha quando nao cabem.\n- **`wrap-reverse`**: Itens quebram para a linha acima.\n\n### gap\nA propriedade **`gap`** define o espaco entre os itens flex. E mais pratica do que usar margin em cada item:\n\n- `gap: 10px;` — espaco de 10px entre linhas e colunas.\n- `gap: 10px 20px;` — 10px entre linhas, 20px entre colunas.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'css',
        filename: 'flex-wrap-gap.css',
        code: '.galeria {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n  justify-content: center;\n}\n\n.galeria .foto {\n  width: 200px;\n  height: 200px;\n  background-color: #ddd;\n  border-radius: 8px;\n}',
        description:
          'Uma galeria de fotos com Flexbox. Os itens quebram para a proxima linha quando nao cabem (flex-wrap: wrap) e tem um espaco de 16px entre eles (gap).',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Para centralizar um elemento na tela inteira, use: display: flex; justify-content: center; align-items: center; height: 100vh; no container. Essa e a forma mais simples de centralizar conteudo com CSS moderno.',
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
        '## flex-grow, flex-shrink e flex-basis\n\nAlgumas das propriedades mais poderosas do Flexbox sao aplicadas diretamente nos **itens** (nao no container):\n\n### flex-basis\nDefine o **tamanho inicial** do item antes de o espaco livre ser distribuido. Funciona como um `width` para itens em linha. Pode ser um valor fixo (`200px`) ou `auto` (usa o conteudo).\n\n### flex-grow\nDefine quanto o item **cresce** para ocupar o espaco disponivel no container. O valor e uma proporcao: se um item tem `flex-grow: 2` e outro tem `flex-grow: 1`, o primeiro ocupa o dobro do espaco livre.\n\n### flex-shrink\nDefine quanto o item **encolhe** quando o espaco do container for menor que o necessario. O valor `0` impede o item de encolher.\n\n### Atalho: flex\nAs tres propriedades podem ser definidas juntas: `flex: grow shrink basis`. O valor `flex: 1` e equivalente a `flex: 1 1 0` (cresce e encolhe igualmente).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'css',
        filename: 'flex-grow-shrink-basis.css',
        code: '.container {\n  display: flex;\n  gap: 16px;\n}\n\n/* Todos os itens crescem igualmente */\n.item {\n  flex: 1; /* flex-grow: 1, flex-shrink: 1, flex-basis: 0 */\n}\n\n/* Sidebar fixo + conteudo principal flexivel */\n.sidebar {\n  flex: 0 0 250px; /* nao cresce, nao encolhe, base de 250px */\n}\n\n.conteudo {\n  flex: 1; /* ocupa todo o espaco restante */\n}\n\n/* Itens com crescimento proporcional */\n.coluna-pequena {\n  flex: 1; /* 1 parte do espaco */\n}\n\n.coluna-grande {\n  flex: 2; /* 2 partes do espaco (o dobro da pequena) */\n}\n\n/* align-content: controla o espacamento entre linhas (com flex-wrap) */\n.galeria {\n  display: flex;\n  flex-wrap: wrap;\n  align-content: space-between; /* espaco entre as linhas */\n  height: 400px;\n}',
        description: 'Exemplos de flex-grow, flex-shrink e flex-basis. O layout sidebar+conteudo e um padrao classico: sidebar com tamanho fixo e conteudo ocupando o restante.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        '`align-content` funciona de forma parecida com `justify-content`, mas controla o espacamento entre as **linhas** quando ha multiplas linhas (requer `flex-wrap: wrap`). Ja `align-items` controla o alinhamento dos itens dentro de cada linha individualmente.',
    },
  ],
  challenges: [
    {
      id: 'flex-c1',
      title: 'Barra de navegacao',
      description:
        'Estilize a classe .navbar como um container flex com: itens distribuidos com espaco entre eles (space-between), alinhamento vertical centralizado (center), padding de 16px e cor de fundo #333.',
      language: 'css',
      starterCode: '/* Estilize a barra de navegacao aqui */\n',
      solution: '.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px;\n  background-color: #333;\n}',
      hints: [
        'Comece com display: flex para ativar o Flexbox.',
        'Use justify-content para distribuir os itens horizontalmente.',
        'Use align-items para alinhar verticalmente.',
      ],
    },
    {
      id: 'flex-c2',
      title: 'Centralizacao perfeita',
      description:
        'Estilize a classe .centro para centralizar seu conteudo tanto horizontal quanto verticalmente. O container deve ter altura de 100vh (toda a tela).',
      language: 'css',
      starterCode: '/* Centralize o conteudo aqui */\n',
      solution: '.centro {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}',
      hints: [
        'Use display: flex para ativar o Flexbox.',
        'justify-content: center centraliza horizontalmente.',
        'align-items: center centraliza verticalmente.',
        'height: 100vh faz o container ocupar toda a altura da tela.',
      ],
    },
    {
      id: 'flex-c3',
      title: 'Galeria com wrap',
      description:
        'Estilize a classe .galeria como flex container com: itens quebrando linha quando nao cabem (flex-wrap: wrap), espaco de 12px entre os itens (gap), direcao em linha (row) e itens centralizados horizontalmente.',
      language: 'css',
      starterCode: '/* Estilize a galeria aqui */\n',
      solution: '.galeria {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  gap: 12px;\n  justify-content: center;\n}',
      hints: [
        'flex-wrap: wrap permite que os itens quebrem para a proxima linha.',
        'gap define o espaco entre os itens sem usar margin.',
        'justify-content: center centraliza os itens horizontalmente.',
      ],
    },
  ],
};
