import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'responsividade',
  moduleId: 'html-css',
  title: 'Responsividade',
  description:
    'Aprenda a criar layouts responsivos com media queries, viewport, abordagem mobile-first e unidades responsivas.',
  order: 7,
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        'Seu site precisa funcionar no celular, tablet e computador. E como ter moveis que se reorganizam automaticamente quando voce muda o tamanho da sala!\n\n## O que e Responsividade?\n\nResponsividade e a capacidade de um site se adaptar a diferentes tamanhos de tela: celulares, tablets, notebooks e monitores grandes. Hoje, a maioria dos acessos a internet vem de dispositivos moveis, entao criar sites responsivos nao e mais opcional — e essencial.\n\nUm site responsivo ajusta automaticamente seu layout, tamanho de fonte, imagens e espacamentos para oferecer uma boa experiencia em qualquer dispositivo.\n\nPara isso, usamos tres ferramentas principais:\n- **Meta tag viewport**\n- **Media queries**\n- **Unidades responsivas**',
    },
    {
      type: 'text',
      content:
        '## A Meta Tag Viewport\n\nPara que o navegador mobile renderize a pagina corretamente, precisamos adicionar a meta tag viewport no `<head>` do HTML:\n\n```\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n```\n\n- **`width=device-width`**: Define a largura da pagina como a largura do dispositivo.\n- **`initial-scale=1.0`**: Define o zoom inicial como 100%.\n\nSem essa tag, o navegador mobile tenta renderizar a pagina como se fosse um monitor grande e depois reduz tudo, deixando o texto minusculo e dificil de ler.',
    },
    {
      type: 'text',
      content:
        '## Media Queries\n\n**Media queries** sao regras CSS que aplicam estilos diferentes dependendo das caracteristicas do dispositivo, como a largura da tela.\n\nA sintaxe basica e:\n\n```\n@media (condicao) {\n  /* estilos aplicados quando a condicao for verdadeira */\n}\n```\n\nAs condicoes mais usadas sao:\n- **`max-width`**: Aplica quando a tela e **menor ou igual** ao valor.\n- **`min-width`**: Aplica quando a tela e **maior ou igual** ao valor.\n\nBreakpoints comuns:\n- Celular: ate 768px\n- Tablet: 769px a 1024px\n- Desktop: acima de 1024px',
    },
    {
      type: 'code',
      codeExample: {
        language: 'css',
        filename: 'media-queries.css',
        code: '/* Estilo padrao (mobile-first) */\n.container {\n  width: 100%;\n  padding: 16px;\n}\n\n.coluna {\n  width: 100%;\n  margin-bottom: 16px;\n}\n\n/* Tablet: a partir de 768px */\n@media (min-width: 768px) {\n  .container {\n    max-width: 720px;\n    margin: 0 auto;\n  }\n\n  .coluna {\n    width: 48%;\n  }\n}\n\n/* Desktop: a partir de 1024px */\n@media (min-width: 1024px) {\n  .container {\n    max-width: 960px;\n  }\n\n  .coluna {\n    width: 30%;\n  }\n}',
        description:
          'Exemplo de abordagem mobile-first: o estilo padrao e para celular. Media queries com min-width adicionam estilos para telas maiores.',
      },
    },
    {
      type: 'text',
      content:
        '## Mobile-First\n\nA abordagem **mobile-first** significa comecar escrevendo os estilos para telas pequenas (celulares) e depois usar media queries com `min-width` para adicionar estilos para telas maiores.\n\nVantagens do mobile-first:\n\n- **Performance**: Celulares carregam apenas o CSS essencial.\n- **Prioridade**: Foca no conteudo mais importante primeiro.\n- **Simplicidade**: Layouts simples para mobile, progressivamente mais complexos para desktop.\n\nA abordagem oposta (desktop-first) usa `max-width` nas media queries e e menos recomendada hoje em dia.',
    },
    {
      type: 'text',
      content:
        '## Unidades Responsivas\n\nPara criar layouts verdadeiramente responsivos, evite usar apenas pixels (px). Use unidades que se adaptam ao contexto:\n\n### Porcentagem (%)\nRelativa ao elemento pai. Exemplo: `width: 50%` ocupa metade da largura do pai.\n\n### rem\nRelativa ao tamanho da fonte do elemento raiz (`<html>`). Por padrao, 1rem = 16px. E otima para fontes e espacamentos consistentes.\n\n### em\nRelativa ao tamanho da fonte do elemento pai. Util para espacamentos dentro de componentes.\n\n### vh e vw\n- **vh** (viewport height): 1vh = 1% da altura da tela.\n- **vw** (viewport width): 1vw = 1% da largura da tela.\n\nExemplo: `height: 100vh` faz o elemento ter a altura total da tela.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'css',
        filename: 'unidades-responsivas.css',
        code: 'html {\n  font-size: 16px; /* Base para rem */\n}\n\nbody {\n  font-size: 1rem;    /* 16px */\n  padding: 1.5rem;    /* 24px */\n}\n\n.hero {\n  height: 100vh;      /* Altura total da tela */\n  width: 100vw;       /* Largura total da tela */\n}\n\n.imagem {\n  width: 100%;        /* Largura total do pai */\n  max-width: 600px;   /* Nunca maior que 600px */\n  height: auto;       /* Mantem a proporcao */\n}\n\nh1 {\n  font-size: 2rem;    /* 32px */\n}\n\n@media (min-width: 768px) {\n  h1 {\n    font-size: 2.5rem; /* 40px em telas maiores */\n  }\n}',
        description:
          'Exemplos de unidades responsivas: rem para fontes e espacamentos, vh/vw para dimensoes da viewport, % para larguras relativas ao pai, e max-width para limitar o tamanho maximo.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Uma boa pratica para imagens responsivas: use width: 100% e max-width com um valor fixo. Assim a imagem se adapta a telas pequenas (100% do container) mas nao fica enorme em telas grandes (limitada pelo max-width).',
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Nao esqueca da meta tag viewport no <head> do seu HTML! Sem ela, as media queries nao funcionarao corretamente em dispositivos moveis e o layout nao sera responsivo.',
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
        '## A funcao clamp() -- Valores Fluidos\n\nA funcao `clamp()` permite criar valores CSS que se adaptam **fluidamente** entre um minimo e um maximo, sem precisar de media queries. Ela aceita tres argumentos:\n\n```\nclamp(minimo, preferido, maximo)\n```\n\n- **minimo**: O menor valor possivel.\n- **preferido**: O valor ideal, geralmente uma unidade relativa como `vw` ou `%`.\n- **maximo**: O maior valor possivel.\n\nIsso e especialmente poderoso para tipografia responsiva: o texto cresce e encolhe suavemente com a largura da tela, sem saltos bruscos nas media queries.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'css',
        filename: 'clamp-fluido.css',
        code: '/* Tipografia fluida com clamp */\nh1 {\n  /* Minimo: 24px, Preferido: 5vw, Maximo: 48px */\n  font-size: clamp(1.5rem, 5vw, 3rem);\n}\n\np {\n  /* Fonte entre 14px e 18px, crescendo com a tela */\n  font-size: clamp(0.875rem, 2vw, 1.125rem);\n}\n\n/* Espacamento fluido */\n.secao {\n  padding: clamp(16px, 4vw, 64px);\n}\n\n/* Largura fluida do container */\n.container {\n  width: min(90%, 1200px); /* 90% da tela, no maximo 1200px */\n  margin: 0 auto;\n}\n\n/* Combinando com variaveis CSS */\n:root {\n  --titulo-size: clamp(1.25rem, 4vw, 2.5rem);\n}\n\n.titulo {\n  font-size: var(--titulo-size);\n}',
        description: 'clamp() cria valores fluidos sem media queries. O tamanho varia suavemente entre o minimo e maximo. min() e max() funcionam de forma similar para outros casos.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Use `clamp()` para tipografia e espacamentos fluidos e `min()`/`max()` para larguras de container. Por exemplo, `width: min(90%, 1200px)` e uma forma moderna e elegante de substituir o padrao classico de `width: 90%; max-width: 1200px;`.',
    },
  ],
  challenges: [
    {
      id: 'resp-c1',
      title: 'Media query basica',
      description:
        'Escreva uma media query que, em telas com largura minima de 768px, mude a classe .menu para display flex com gap de 20px. No estilo padrao (mobile), o .menu deve ter display block.',
      language: 'css',
      starterCode: '/* Estilo padrao (mobile) */\n.menu {\n  display: block;\n}\n\n/* Adicione a media query para tablet/desktop aqui */\n',
      solution: '/* Estilo padrao (mobile) */\n.menu {\n  display: block;\n}\n\n/* Tablet/desktop */\n@media (min-width: 768px) {\n  .menu {\n    display: flex;\n    gap: 20px;\n  }\n}',
      hints: [
        'Use @media (min-width: 768px) { } para estilos de tablet/desktop.',
        'Dentro da media query, redefina as propriedades do .menu.',
        'display: flex e gap sao as propriedades que mudam.',
      ],
    },
    {
      id: 'resp-c2',
      title: 'Layout responsivo com colunas',
      description:
        'Crie um layout onde a classe .grid usa flex com wrap. No mobile, cada .coluna ocupa 100% da largura. Em telas de 768px ou mais, cada .coluna ocupa 48%. Em telas de 1024px ou mais, cada .coluna ocupa 31%.',
      language: 'css',
      starterCode: '/* Estilo mobile-first */\n.grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.coluna {\n  /* Adicione a largura mobile aqui */\n}\n\n/* Adicione as media queries aqui */\n',
      solution: '/* Estilo mobile-first */\n.grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.coluna {\n  width: 100%;\n}\n\n@media (min-width: 768px) {\n  .coluna {\n    width: 48%;\n  }\n}\n\n@media (min-width: 1024px) {\n  .coluna {\n    width: 31%;\n  }\n}',
      hints: [
        'No mobile, .coluna deve ter width: 100%.',
        'Use @media (min-width: 768px) para alterar a largura para 48%.',
        'Use @media (min-width: 1024px) para alterar a largura para 31%.',
      ],
    },
    {
      id: 'resp-c3',
      title: 'Unidades responsivas',
      description:
        'Estilize a classe .hero com: altura de toda a tela (100vh), display flex centralizado em ambos os eixos. Estilize o .titulo dentro de .hero com font-size de 2rem. Em telas de 768px ou mais, o .titulo deve ter font-size de 3.5rem.',
      language: 'css',
      starterCode: '/* Estilize a secao hero e o titulo aqui */\n',
      solution: '.hero {\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.titulo {\n  font-size: 2rem;\n}\n\n@media (min-width: 768px) {\n  .titulo {\n    font-size: 3.5rem;\n  }\n}',
      hints: [
        '100vh faz o elemento ocupar toda a altura da tela.',
        'Use rem para tamanhos de fonte responsivos.',
        'A media query altera o font-size do .titulo em telas maiores.',
      ],
    },
  ],
};
