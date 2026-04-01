import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'estrutura-de-projetos',
  moduleId: 'boas-praticas',
  title: 'Estrutura de Projetos',
  description: 'Como organizar arquivos e pastas para projetos que crescem sem virar um caos',
  order: 2,
  estimatedMinutes: 35,
  sections: [
    {
      type: 'text',
      content:
        '## Estrutura de Projetos\n\nA estrutura de um projeto comunica a arquitetura. Quando alguem abre o projeto pela primeira vez, a estrutura de pastas deve responder: O que esse projeto faz? Como esta organizado? Onde fica X?\n\n### Principios\n\n**(1) Agrupe por DOMINIO, nao por tipo de arquivo**\nOrganizar por tipo (`models/`, `controllers/`, `services/`) parece intuitivo mas escala mal. Quando voce trabalha em "usuarios", voce modifica arquivos em 3 pastas diferentes. Quando agrupa por dominio (`usuarios/`), tudo esta no mesmo lugar.\n\n**(2) Nomes de pasta no plural para colecoes**\nPastas que contem multiplos arquivos do mesmo tipo ficam no plural: `usuarios/`, `produtos/`, `pedidos/`, `tests/`.\n\n**(3) Um index.py/index.ts por modulo expoe a interface publica**\nO `__init__.py` em Python ou `index.ts` em TypeScript define o que e publico no modulo. Importacoes externas usam so esse arquivo.\n\n**(4) Separe codigo de configuracao, testes e documentacao**\nCodigo em `src/`, testes em `tests/`, configuracoes na raiz ou em `config/`, documentacao em `docs/`. Nao misture.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# RUIM: tudo na raiz (projeto flat)\nprojeto/\n  app.py\n  utils.py\n  helpers.py\n  database.py\n  models.py\n  routes.py\n  auth.py\n  email.py\n  config.py\n# Problema: impossivel saber o que pertence a que sem ler cada arquivo\n\n\n# TAMBEM RUIM: organizado so por tipo de arquivo\nprojeto/\n  models/\n    usuario.py\n    produto.py\n    pedido.py\n  controllers/\n    usuario_ctrl.py\n    produto_ctrl.py\n  services/\n    usuario_svc.py\n    produto_svc.py\n# Problema: para trabalhar em "usuarios", voce abre 3 pastas diferentes\n\n\n# BOM: organizado por dominio\nprojeto/\n  usuarios/\n    model.py        # dados e validacoes\n    service.py      # logica de negocio\n    routes.py       # endpoints HTTP\n    repository.py   # acesso ao banco\n  produtos/\n    model.py\n    service.py\n    routes.py\n    repository.py\n  pedidos/\n    model.py\n    service.py\n    routes.py\n    repository.py\n  shared/\n    database.py     # conexao compartilhada\n    auth.py         # middleware compartilhado\n    config.py       # configuracoes globais\n  app.py            # ponto de entrada\n  requirements.txt\n  .env.example\n  README.md\n# Vantagem: tudo relacionado a "usuarios" esta em uma pasta so',
        filename: 'estruturas_de_projeto.sh',
        description:
          'Tres formas de organizar o mesmo projeto. A estrutura flat e a pior: impossivel navegar. A estrutura por tipo parece organizada mas dispersa o trabalho. A estrutura por dominio mantem tudo relacionado junto, refletindo como os desenvolvedores realmente trabalham.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Regra do estranho: um desenvolvedor que nunca viu o projeto deve conseguir encontrar qualquer funcionalidade em menos de 30 segundos olhando so a estrutura de pastas.',
    },
    {
      type: 'text',
      content:
        '## Estruturas para diferentes tipos de projeto\n\n### Script simples\nTudo em um arquivo ate ~200 linhas. Se crescer alem disso, comece a extrair modulos.\n\n### CLI tool\n```\ncli_tool/\n  commands/     # um arquivo por comando\n  utils/        # funcoes auxiliares compartilhadas\n  config.py     # configuracoes e constantes\n  main.py       # ponto de entrada\n```\n\n### API REST\nUse a estrutura por dominio mostrada acima. Cada dominio e uma mini-aplicacao.\n\n### Frontend (React/Vue)\n```\nsrc/\n  components/   # componentes reutilizaveis\n  pages/        # paginas/rotas da aplicacao\n  hooks/        # logica de estado reutilizavel\n  utils/        # funcoes puras auxiliares\n  services/     # chamadas de API\n```\n\n### Full-stack\n```\nprojeto/\n  backend/      # API completa\n  frontend/     # aplicacao web\n  shared/       # tipos e validacoes compartilhados\n  docs/         # documentacao\n  docker-compose.yml\n```',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Exemplo real: e-commerce backend completo\ne_commerce/\n  produtos/\n    model.py          # dataclass Produto com validacoes\n    service.py        # buscar_produto, criar_produto, atualizar_estoque\n    routes.py         # GET /produtos, POST /produtos, GET /produtos/:id\n    repository.py     # queries SQL de produto\n  pedidos/\n    model.py          # dataclass Pedido, ItemPedido\n    service.py        # criar_pedido, calcular_total, aplicar_desconto\n    routes.py         # POST /pedidos, GET /pedidos/:id, PATCH /pedidos/:id/status\n    repository.py     # queries SQL de pedido e itens\n  usuarios/\n    model.py          # dataclass Usuario com hash de senha\n    service.py        # registrar, autenticar, atualizar_perfil\n    routes.py         # POST /auth/login, POST /auth/registro, GET /perfil\n    repository.py     # queries SQL de usuario\n  pagamentos/\n    model.py          # dataclass Pagamento, enum StatusPagamento\n    service.py        # processar_pagamento, verificar_status, estornar\n    routes.py         # POST /pagamentos, GET /pagamentos/:id\n    gateway.py        # integracao com API do gateway de pagamento\n  notificacoes/\n    service.py        # enviar_email, enviar_sms, enviar_push\n    templates/        # templates de email em HTML\n  shared/\n    database.py       # pool de conexoes SQLite/PostgreSQL\n    auth.py           # middleware JWT, decorador @requer_login\n    config.py         # variaveis de ambiente, constantes\n    exceptions.py     # excecoes customizadas da aplicacao\n  tests/\n    test_produtos.py\n    test_pedidos.py\n    test_usuarios.py\n  app.py              # cria o Flask app e registra os blueprints\n  requirements.txt    # dependencias Python\n  .env.example        # variaveis de ambiente necessarias (sem valores reais)\n  README.md           # como rodar o projeto localmente',
        filename: 'estrutura_ecommerce.sh',
        description:
          'Estrutura completa de um backend de e-commerce. Cada pasta e um dominio autonomo com seu model (dados), service (logica), routes (HTTP) e repository (banco). A pasta shared contem o que e genuinamente compartilhado entre dominios.',
      },
    },
  ],
  challenges: [
    {
      id: 'estrutura-c1',
      title: 'Reorganize Este Projeto',
      description:
        'Os 15 arquivos abaixo estao todos na pasta raiz do projeto. Proponha uma estrutura de pastas organizada por dominio para esses arquivos e justifique cada decisao de agrupamento nos comentarios.',
      language: 'bash',
      starterCode:
        '# Arquivos atuais (todos na raiz):\nprojeto/\n  user_model.py\n  product_model.py\n  order_model.py\n  user_routes.py\n  product_routes.py\n  order_routes.py\n  user_service.py\n  product_service.py\n  order_service.py\n  auth_middleware.py\n  email_sender.py\n  db_connection.py\n  config.py\n  app.py\n  requirements.txt\n\n# Sua tarefa: proponha uma estrutura por dominio\n# Explique em comentarios por que cada arquivo vai em cada pasta\nprojeto/\n  # ???\n',
      solution:
        '# Estrutura organizada por dominio:\nprojeto/\n  usuarios/\n    model.py          # era user_model.py\n    service.py        # era user_service.py\n    routes.py         # era user_routes.py\n  produtos/\n    model.py          # era product_model.py\n    service.py        # era product_service.py\n    routes.py         # era product_routes.py\n  pedidos/\n    model.py          # era order_model.py\n    service.py        # era order_service.py\n    routes.py         # era order_routes.py\n  shared/\n    database.py       # era db_connection.py — compartilhado por todos os dominios\n    auth.py           # era auth_middleware.py — transversal, nao pertence a um dominio\n    email.py          # era email_sender.py — infraestrutura compartilhada\n    config.py         # configuracoes globais\n  app.py              # ponto de entrada — registra os blueprints de cada dominio\n  requirements.txt    # na raiz — e uma configuracao do projeto, nao codigo\n\n# Justificativas:\n# 1. Agrupamos por dominio (usuarios, produtos, pedidos) porque quando voce\n#    trabalha em "usuarios", precisa de model + service + routes juntos\n# 2. shared/ contem o que e genuinamente transversal — banco, auth, email\n#    Esses arquivos nao pertencem a nenhum dominio especifico\n# 3. app.py e requirements.txt ficam na raiz porque sao do projeto como um todo\n',
      hints: [
        'Identifique os dominios primeiro: quais grupos de arquivos estao relacionados ao mesmo conceito de negocio?',
        'O que vai em shared/ e o que nao pertence a nenhum dominio especifico mas e usado por todos',
        'Arquivos de configuracao do projeto como requirements.txt ficam na raiz, nao em subpastas',
      ],
    },
    {
      id: 'estrutura-c2',
      title: 'O Que Esta Estrutura Comunica?',
      description:
        'Analise as 3 estruturas de pastas abaixo para o mesmo sistema de biblioteca. Para cada uma, escreva: (1) o que a estrutura comunica, (2) qual e o maior problema, (3) quando seria aceitavel usar.',
      language: 'bash',
      starterCode:
        '# Estrutura A: flat\nbiblioteca/\n  livro.py\n  usuario.py\n  emprestimo.py\n  multa.py\n  notificacao.py\n  relatorio.py\n  database.py\n  app.py\n# O que comunica? ___\n# Maior problema? ___\n# Quando e aceitavel? ___\n\n# Estrutura B: por tipo\nbiblioteca/\n  models/\n    livro.py\n    usuario.py\n    emprestimo.py\n  services/\n    livro_service.py\n    usuario_service.py\n    emprestimo_service.py\n  repositories/\n    livro_repo.py\n    usuario_repo.py\n    emprestimo_repo.py\n# O que comunica? ___\n# Maior problema? ___\n# Quando e aceitavel? ___\n\n# Estrutura C: por dominio\nbiblioteca/\n  acervo/\n    model.py\n    service.py\n    repository.py\n  membros/\n    model.py\n    service.py\n    repository.py\n  emprestimos/\n    model.py\n    service.py\n    repository.py\n  shared/\n    database.py\n    notificacoes.py\n    relatorios.py\n  app.py\n# O que comunica? ___\n# Maior problema? ___\n# Quando e aceitavel? ___\n',
      solution:
        '# Estrutura A: flat\n# O que comunica? "Este projeto tem 8 conceitos sem relacao clara entre eles"\n# A estrutura plana da a impressao de um script simples, nao de um sistema\n# Maior problema? Com 8 arquivos ja e confuso. Com 20, impossivel navegar\n# Quando e aceitavel? Projetos muito pequenos: ate ~5 arquivos, scripts de uso pessoal\n\n# Estrutura B: por tipo\n# O que comunica? "Este projeto usa arquitetura em camadas (MVC/Repository Pattern)"\n# Comunica a tecnologia usada, nao os dominios de negocio\n# Maior problema? Para trabalhar em "emprestimos" voce abre 3 pastas:\n# models/emprestimo.py, services/emprestimo_service.py, repositories/emprestimo_repo.py\n# Esse espalhamento aumenta o custo cognitivo de cada mudanca\n# Quando e aceitavel? Times que priorizam consistencia de camada; projetos pequenos com MVC estabelecido\n\n# Estrutura C: por dominio\n# O que comunica? "Este projeto gerencia acervo, membros e emprestimos de biblioteca"\n# A estrutura conta a historia do negocio, nao da tecnologia\n# Maior problema? Pode ser excessivo para projetos muito pequenos;\n# shared/ requer disciplina para nao virar uma pasta-lixo com tudo que nao tem lugar\n# Quando e aceitavel? Projetos medios a grandes, equipes multiplas,\n# sistemas que vao crescer — que e a maioria dos projetos reais\n',
      hints: [
        'Pense em quem vai navegar: um novo dev consegue encontrar a logica de emprestimos em menos de 30 segundos?',
        'A estrutura "por tipo" parece organizada mas esconde a relacao entre arquivos do mesmo dominio',
        'Uma boa estrutura reflete o vocabulario do negocio, nao os padroes tecnicos que voce usa',
      ],
    },
  ],
};
