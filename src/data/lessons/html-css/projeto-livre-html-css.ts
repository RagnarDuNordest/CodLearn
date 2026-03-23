import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-livre-html-css',
  moduleId: 'html-css',
  title: 'Projeto Livre: Landing Page de Produto',
  description:
    'Crie uma landing page completa para um produto fictício — o tipo de página que freelancers constroem para clientes no dia a dia.',
  order: 9,
  estimatedMinutes: 45,
  type: 'free-project',
  sections: [],
  freeProject: {
    id: 'fp-html-css',
    title: 'Landing Page de Produto',
    language: 'html',
    scenario:
      'Um cliente contratou você para criar a landing page de um aplicativo fictício. A página precisa ter uma seção hero (chamada principal), seção de recursos e formulário de contato.',
    objective:
      'Construir uma landing page completa e responsiva com hero section, cards de recursos e formulário de contato.',
    requirements: [
      'Hero section: título grande, subtítulo e botão CTA (Call to Action)',
      'Seção "Recursos" com 3 cards lado a lado (flex ou grid)',
      'Formulário de contato com campos nome, email e mensagem',
      'Design responsivo: em mobile os cards ficam empilhados',
      'CSS organizado e legível, sem usar frameworks',
    ],
    starterCode:
      '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>AppX - Solucao para seu negocio</title>\n    <style>\n        /* Seus estilos aqui */\n    </style>\n</head>\n<body>\n    <!-- Hero Section -->\n    <!-- Recursos (3 cards) -->\n    <!-- Formulario de Contato -->\n</body>\n</html>\n',
    solution:
      '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>AppX</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: sans-serif; color: #333; }\n        .hero { background: linear-gradient(135deg, #1a1a2e, #16213e); color: white; padding: 80px 20px; text-align: center; }\n        .hero h1 { font-size: 3rem; margin-bottom: 16px; }\n        .hero p { font-size: 1.2rem; color: #a0aec0; margin-bottom: 32px; }\n        .btn { background: #3b82f6; color: white; padding: 14px 32px; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; text-decoration: none; }\n        .recursos { padding: 60px 20px; max-width: 1000px; margin: 0 auto; }\n        .recursos h2 { text-align: center; margin-bottom: 40px; font-size: 2rem; }\n        .cards { display: flex; gap: 24px; }\n        .card { flex: 1; background: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; }\n        .card h3 { margin-bottom: 12px; color: #1a1a2e; }\n        form { max-width: 600px; margin: 0 auto 60px; padding: 0 20px; }\n        form h2 { text-align: center; margin-bottom: 24px; }\n        input, textarea { width: 100%; padding: 12px; margin-bottom: 16px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 1rem; }\n        @media (max-width: 600px) { .cards { flex-direction: column; } .hero h1 { font-size: 2rem; } }\n    </style>\n</head>\n<body>\n    <div class="hero">\n        <h1>Transforme seu negocio</h1>\n        <p>A solucao completa para sua empresa crescer.</p>\n        <a href="#contato" class="btn">Comece gratis</a>\n    </div>\n    <section class="recursos">\n        <h2>Por que escolher o AppX?</h2>\n        <div class="cards">\n            <div class="card"><h3>Rapido</h3><p>Performance otimizada para qualquer dispositivo.</p></div>\n            <div class="card"><h3>Seguro</h3><p>Seus dados protegidos com criptografia de ponta.</p></div>\n            <div class="card"><h3>Facil</h3><p>Interface intuitiva, sem curva de aprendizado.</p></div>\n        </div>\n    </section>\n    <form id="contato">\n        <h2>Entre em contato</h2>\n        <input type="text" placeholder="Seu nome">\n        <input type="email" placeholder="Seu e-mail">\n        <textarea rows="5" placeholder="Sua mensagem"></textarea>\n        <button type="submit" class="btn" style="width:100%">Enviar mensagem</button>\n    </form>\n</body>\n</html>',
    hints: [
      'Use display: flex para os cards lado a lado e flex-direction: column no media query.',
      'linear-gradient(135deg, #1a1a2e, #16213e) cria um fundo gradiente.',
      'max-width e margin: 0 auto centraliza o conteúdo.',
    ],
    testCases: [
      { description: 'Página deve ter hero, 3 cards de recursos e formulário de contato', inputs: [], expectedOutput: '' },
    ],
  },
};
