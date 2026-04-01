import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'graphql-vs-rest',
  moduleId: 'redes',
  title: 'GraphQL vs REST',
  description: 'Entenda as diferencas entre GraphQL e REST, quando cada um brilha e os trade-offs de cada abordagem',
  order: 4,
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content: '## GraphQL vs REST\n\n### O Problema do REST\n\nREST modela recursos como URLs fixas. Isso cria dois problemas classicos:\n\n**Overfetching**: voce recebe mais dados do que precisa.\n```\nGET /usuarios/123\n-> retorna: id, nome, email, endereco, telefone, data_nascimento, foto...\n(voce so precisava do nome e email)\n```\n\n**Underfetching**: voce precisa de multiplas requisicoes para montar uma tela.\n```\nGET /posts/1         -> post\nGET /usuarios/123    -> autor do post\nGET /posts/1/tags    -> tags do post\n(3 requisicoes para montar uma unica tela)\n```\n\n### GraphQL: o cliente define o que quer\n\nEm GraphQL ha um unico endpoint (`/graphql`) e o cliente especifica exatamente quais campos quer:\n\n```graphql\nquery {\n  post(id: "1") {\n    titulo\n    autor {\n      nome        # so nome, nao email/telefone/etc\n    }\n    tags {\n      nome\n    }\n  }\n}\n```\n\nUma unica requisicao, exatamente os campos necessarios.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Comparando REST vs GraphQL para a mesma operacao\n# Contexto: montar a tela de perfil de usuario com posts recentes\n\n# COM REST: 3 requisicoes necessarias\nimport requests\n\ndef montar_perfil_rest(usuario_id: int) -> dict:\n    base = "https://api.exemplo.com"\n    \n    # Requisicao 1: dados do usuario\n    usuario = requests.get(f"{base}/usuarios/{usuario_id}").json()\n    # Recebe: id, nome, email, telefone, endereco, data_nascimento... (overfetch)\n    \n    # Requisicao 2: posts do usuario\n    posts = requests.get(f"{base}/usuarios/{usuario_id}/posts").json()\n    # Recebe: todos os posts com todos os campos\n    \n    # Requisicao 3: contagem de seguidores\n    seguidores = requests.get(f"{base}/usuarios/{usuario_id}/seguidores/count").json()\n    \n    return {\n        "nome": usuario["nome"],\n        "bio": usuario["bio"],\n        "posts_recentes": [p["titulo"] for p in posts[:3]],\n        "seguidores": seguidores["total"]\n    }\n\n# COM GRAPHQL: 1 requisicao, so os campos necessarios\ndef montar_perfil_graphql(usuario_id: int) -> dict:\n    query = """\n    query PerfilUsuario($id: ID!) {\n        usuario(id: $id) {\n            nome\n            bio\n            posts(limite: 3) {\n                titulo\n            }\n            totalSeguidores\n        }\n    }\n    """\n    resposta = requests.post(\n        "https://api.exemplo.com/graphql",\n        json={"query": query, "variables": {"id": usuario_id}}\n    ).json()\n    return resposta["data"]["usuario"]',
        filename: 'rest_vs_graphql.py',
        description: 'REST requer 3 requisicoes para montar o perfil, com overfetching em cada uma. GraphQL faz tudo em 1 requisicao com exatamente os campos necessarios.',
      },
    },
    {
      type: 'text',
      content: '## Quando Usar Cada Um\n\n**Use REST quando:**\n- API publica simples com poucos endpoints\n- Recursos bem definidos e pouco variados\n- Cache HTTP e importante (GraphQL e mais dificil de cachear)\n- Time pequeno sem experiencia com GraphQL\n- CRUD simples\n\n**Use GraphQL quando:**\n- Frontend mobile com dados limitados (evitar overfetch economiza bateria/dados)\n- Multiplos clientes com necessidades diferentes (web, mobile, parceiros)\n- Dados relacionados que sempre sao buscados juntos\n- Frontend-driven development (frontend define o que precisa)\n\n**Trade-offs do GraphQL:**\n- Curva de aprendizado maior\n- Cache HTTP nao funciona nativamente\n- Queries maliciosas podem sobrecarregar o servidor (precisa de rate limiting e depth limiting)\n- Tooling mais complexo',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'A maioria das APIs nao precisa de GraphQL. Comece com REST. Se voce sentir a dor de overfetching ou underfetching frequentemente, entao avalie GraphQL.',
    },
  ],
  challenges: [
    {
      id: 'graphql-c1',
      title: 'Projete os Endpoints',
      description: 'Dado o sistema abaixo, projete: (1) os endpoints REST necessarios para montar a tela descrita, (2) a query GraphQL equivalente que resolveria tudo em uma requisicao. Use comentarios Python para documentar.',
      language: 'python',
      starterCode: '# Sistema: plataforma de cursos online\n# Tela: pagina de um curso especifico\n# Precisa mostrar:\n#   - Titulo e descricao do curso\n#   - Nome e foto do instrutor\n#   - Lista de modulos (titulo + duracao)\n#   - Avaliacao media e numero de avaliacoes\n#   - Se o usuario atual ja esta matriculado\n\n# PARTE 1: projete os endpoints REST\n# Quantas requisicoes sao necessarias?\n# Quais endpoints voce criaria?\n\n# Endpoints REST necessarios:\n# GET /cursos/{id} -> ?\n# GET /instrutores/{id} -> ?\n# GET ... -> ?\n\n# PARTE 2: escreva a query GraphQL equivalente\n# Como seria uma unica query que busca tudo de uma vez?\n\nGRAPHQL_QUERY = """\n# Escreva a query aqui\nquery {\n    # ...\n}\n"""\n\n# BONUS: qual abordagem voce escolheria para este caso e por que?\n# ESCOLHA: ???\n# MOTIVO: ???\n',
      solution: '# PARTE 1: endpoints REST\n# Necessaria pelo menos 4 requisicoes:\n\n# GET /cursos/{id}\n# Retorna: {id, titulo, descricao, instrutor_id, avaliacao_media, total_avaliacoes}\n\n# GET /instrutores/{instrutor_id}\n# Retorna: {id, nome, foto_url, bio}\n\n# GET /cursos/{id}/modulos\n# Retorna: [{id, titulo, duracao_minutos, ordem}]\n\n# GET /cursos/{id}/matricula?usuario_id={id}\n# Retorna: {matriculado: true/false}\n\n# Problema: 4 requisicoes sequenciais (instrutor depende do curso)\n# OU 3 paralelas + 1 sequencial\n\n# PARTE 2: query GraphQL equivalente\nGRAPHQL_QUERY = """\nquery PaginaCurso($cursoId: ID!, $usuarioId: ID!) {\n    curso(id: $cursoId) {\n        titulo\n        descricao\n        avaliacao {\n            media\n            total\n        }\n        instrutor {\n            nome\n            fotoUrl\n        }\n        modulos {\n            titulo\n            duracaoMinutos\n        }\n        estaMatriculado(usuarioId: $usuarioId)\n    }\n}\n"""\n# Uma requisicao, exatamente os campos necessarios\n\n# ESCOLHA: GraphQL\n# MOTIVO:\n# - A tela precisa de dados de 4 fontes diferentes\n# - Mobile vai acessar: economizar 3 requisicoes = menos bateria/dados\n# - O frontend sabe exatamente o que precisa — GraphQL e ideal\n# - Se fosse uma API publica simples para terceiros, usaria REST\n',
      hints: [
        'Para montar a tela, conte quantos recursos diferentes voce precisa: curso, instrutor, modulos, matricula',
        'No REST, dados de recursos diferentes geralmente exigem requisicoes separadas — a menos que voce crie endpoints especializados (anti-REST)',
        'Na query GraphQL, voce pode navegar pelas relacoes: curso -> instrutor, curso -> modulos, tudo em uma unica query',
      ],
    },
  ],
};
