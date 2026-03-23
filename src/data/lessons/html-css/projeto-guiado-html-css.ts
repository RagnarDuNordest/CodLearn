import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-guiado-html-css',
  moduleId: 'html-css',
  title: 'Projeto: Página de Perfil Profissional',
  description:
    'Construa uma página de perfil completa e responsiva com HTML semântico e CSS moderno — o tipo de página que todo dev tem no portfólio.',
  order: 8,
  estimatedMinutes: 45,
  type: 'guided-project',
  sections: [],
  guidedProject: {
    id: 'gp-html-css',
    title: 'Perfil Profissional para Portfólio',
    language: 'html',
    scenario:
      'Você precisa criar uma página de perfil pessoal para colocar no seu portfólio como desenvolvedor. A página deve ser elegante, responsiva e mostrar suas habilidades para recrutadores.',
    objective:
      'Construir uma página HTML completa com estrutura semântica e CSS responsivo, seguindo as boas práticas de desenvolvimento web.',
    steps: [
      {
        id: 'gp-html-s1',
        title: 'Estrutura HTML semântica',
        description:
          'Crie o esqueleto HTML da página de perfil com: header (nome e cargo), section de sobre mim, section de habilidades (lista) e footer com contato.',
        starterCode:
          '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Meu Perfil</title>\n</head>\n<body>\n\n    <!-- Header com nome e cargo -->\n    <header>\n        <h1>Seu Nome</h1>\n        <p>Desenvolvedor Full Stack</p>\n    </header>\n\n    <!-- Section: Sobre mim -->\n    <!-- Section: Habilidades (ul com 4 li) -->\n    <!-- Footer: email de contato -->\n\n</body>\n</html>\n',
        solution:
          '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Meu Perfil</title>\n</head>\n<body>\n    <header>\n        <h1>Seu Nome</h1>\n        <p>Desenvolvedor Full Stack</p>\n    </header>\n    <main>\n        <section id="sobre">\n            <h2>Sobre Mim</h2>\n            <p>Desenvolvedor apaixonado por tecnologia com foco em soluções web modernas.</p>\n        </section>\n        <section id="habilidades">\n            <h2>Habilidades</h2>\n            <ul>\n                <li>HTML e CSS</li>\n                <li>JavaScript</li>\n                <li>Python</li>\n                <li>SQL</li>\n            </ul>\n        </section>\n    </main>\n    <footer>\n        <p>Contato: <a href="mailto:seuemail@email.com">seuemail@email.com</a></p>\n    </footer>\n</body>\n</html>',
        hints: [
          'Use tags semânticas: <header>, <main>, <section>, <footer>.',
          '<section id="sobre"> organiza as seções com identificadores.',
          '<ul> com <li> cria listas não ordenadas.',
        ],
        testCases: [
          { description: 'Página deve ter header, main com 2 sections e footer', inputs: [], expectedOutput: '' },
        ],
      },
      {
        id: 'gp-html-s2',
        title: 'Adicionar estilos CSS',
        description:
          'Adicione CSS na tag <style> no <head>: fonte sans-serif, header com fundo escuro e texto branco, sections com padding, lista de habilidades com badges coloridos.',
        starterCode:
          '<!-- Adicione ao <head> da sua pagina: -->\n<style>\n    * { margin: 0; padding: 0; box-sizing: border-box; }\n    body { font-family: sans-serif; background: #f5f5f5; color: #333; }\n\n    header {\n        background: #1a1a2e;\n        color: white;\n        padding: 40px;\n        text-align: center;\n    }\n\n    /* Estilize: main, section, h2, ul#habilidades li */\n    /* Sugestao: li com display:inline-block, background colorido, border-radius */\n\n    footer {\n        text-align: center;\n        padding: 20px;\n        background: #1a1a2e;\n        color: white;\n    }\n</style>\n',
        solution:
          '<style>\n    * { margin: 0; padding: 0; box-sizing: border-box; }\n    body { font-family: sans-serif; background: #f5f5f5; color: #333; }\n    header { background: #1a1a2e; color: white; padding: 40px; text-align: center; }\n    header p { color: #a0aec0; margin-top: 8px; }\n    main { max-width: 800px; margin: 40px auto; padding: 0 20px; }\n    section { background: white; padding: 24px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }\n    h2 { color: #1a1a2e; margin-bottom: 16px; }\n    #habilidades ul { list-style: none; display: flex; flex-wrap: wrap; gap: 10px; }\n    #habilidades li { background: #e0f2fe; color: #0277bd; padding: 6px 14px; border-radius: 20px; font-size: 14px; }\n    footer { text-align: center; padding: 20px; background: #1a1a2e; color: #a0aec0; margin-top: 40px; }\n    footer a { color: #63b3ed; }\n</style>',
        hints: [
          'max-width: 800px; margin: 40px auto; centraliza o conteúdo.',
          'display: flex; flex-wrap: wrap; gap: 10px; cria badges que quebram linha.',
          'border-radius: 20px cria o efeito de pílula (pill badge).',
        ],
        testCases: [
          { description: 'Página deve ter estilos aplicados e badges nas habilidades', inputs: [], expectedOutput: '' },
        ],
      },
      {
        id: 'gp-html-s3',
        title: 'Tornar responsivo com media queries',
        description:
          'Adicione media queries para que em telas menores que 600px o header tenha padding reduzido, as habilidades fiquem em coluna e as seções usem padding menor.',
        starterCode:
          '/* Adicione ao final do seu <style>: */\n\n/* Telas menores que 600px */\n@media (max-width: 600px) {\n    header {\n        padding: 24px 16px;\n    }\n    /* Reduza padding das sections para 16px */\n    /* Mude flex-wrap para column nas habilidades */\n    /* Reduza font-size de h1 para 1.5rem */\n}\n',
        solution:
          '@media (max-width: 600px) {\n    header { padding: 24px 16px; }\n    header h1 { font-size: 1.5rem; }\n    main { padding: 0 12px; margin: 20px auto; }\n    section { padding: 16px; }\n    #habilidades ul { flex-direction: column; }\n}',
        hints: [
          '@media (max-width: 600px) { ... } aplica regras apenas em telas menores.',
          'flex-direction: column empilha os badges verticalmente.',
        ],
        testCases: [
          { description: 'Página deve ajustar layout em telas pequenas', inputs: [], expectedOutput: '' },
        ],
      },
    ],
  },
};
