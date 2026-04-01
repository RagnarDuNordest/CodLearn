import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'trade-offs-em-sistemas',
  moduleId: 'pensamento-sistemas',
  title: 'Trade-offs em Sistemas',
  description: 'Todo sistema e uma serie de escolhas — aprenda a identificar, avaliar e justificar os trade-offs de design',
  order: 4,
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content:
        '## Trade-offs em Sistemas\n\nNao existe sistema perfeito. Todo design e uma serie de escolhas onde ganhar em uma dimensao significa perder em outra.\n\nUm desenvolvedor que diz "e so usar X" sem mencionar os trade-offs ainda nao pensa em sistemas.\n\n### Os trade-offs mais comuns\n\n**Consistencia vs Disponibilidade**\nSe o servidor principal cair, voce prefere retornar erro (consistente mas indisponivel) ou dados possivelmente desatualizados (disponivel mas inconsistente)? Nao ha resposta certa — depende do contexto. Sistema bancario prefere consistencia. Rede social prefere disponibilidade.\n\n**Simplicidade vs Flexibilidade**\nCodigo simples e facil de entender mas dificil de adaptar. Codigo flexivel e extensivel mas mais complexo. Projete para os requisitos ATUAIS, nao para hipoteticos futuros.\n\n**Performance vs Legibilidade**\nCodigo otimizado e rapido mas geralmente mais dificil de ler. Otimize apenas quando voce tiver medicoes que justifiquem.\n\n**Custo vs Escala**\nSolucoes simples sao baratas mas nao escalam. Solucoes escalaveis sao caras de construir. Nao construa para 1 milhao de usuarios se voce tem 100.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Exemplo de trade-off: consistencia vs performance\n# Cenario: contagem de views de um artigo\n\n# OPCAO A: Consistente, mas gera carga no banco\nclass ContadorConsistente:\n    def registrar_view(self, artigo_id):\n        # Escreve no banco a cada acesso\n        self.banco.executar(\n            "UPDATE artigos SET views = views + 1 WHERE id = ?",\n            artigo_id\n        )\n        # Pro: contagem sempre exata\n        # Contra: 10.000 views/s = 10.000 escritas/s no banco\n\n# OPCAO B: Rapido, mas eventualmente consistente\nclass ContadorRapido:\n    def __init__(self):\n        self.buffer = {}  # acumula em memoria\n    \n    def registrar_view(self, artigo_id):\n        self.buffer[artigo_id] = self.buffer.get(artigo_id, 0) + 1\n        # Pro: suporta alto volume sem sobrecarregar o banco\n        # Contra: se o servidor reiniciar, perde as views do buffer\n    \n    def flush(self):\n        # Salva batch periodicamente (ex: a cada 30 segundos)\n        for artigo_id, views in self.buffer.items():\n            self.banco.executar(\n                "UPDATE artigos SET views = views + ? WHERE id = ?",\n                (views, artigo_id)\n            )\n        self.buffer.clear()\n\n# Blog pessoal (baixo volume): use Opcao A (simples e precisa)\n# Portal viral (alto volume): use Opcao B (escalavel)',
        filename: 'trade_off_exemplo.py',
        description:
          'Opcao A garante contagem exata mas cria gargalo em alto volume. Opcao B escala bem mas pode perder dados em falha. A escolha certa depende do volume e da importancia da precisao.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Quando alguem propuser uma solucao tecnica, pergunte: "quais sao os trade-offs?" Se a pessoa nao conseguir responder, ela nao entende completamente a solucao que esta propondo.',
    },
    {
      type: 'text',
      content:
        '## Como Avaliar Trade-offs\n\nQuatro perguntas para qualquer decisao de design:\n\n**1. Quais sao os requisitos reais?**\nNao o que voce acha que vai precisar — o que voce precisa HOJE?\n\n**2. Como cada opcao falha?**\nTodo sistema falha eventualmente. A opcao A falha silenciosamente ou com erro claro? Qual e menos danosa?\n\n**3. Qual e o custo de mudar de ideia?**\nAlgumas decisoes sao faceis de reverter (renomear variavel). Outras sao caras (trocar banco de dados). Quanto mais dificil de reverter, mais cuidado na decisao.\n\n**4. Quem arca com o custo?**\nPerformance vs legibilidade — custo e do dev que mantem. Disponibilidade vs consistencia — custo pode ser do usuario final.',
    },
  ],
  challenges: [
    {
      id: 'tradeoffs-c1',
      title: 'Justifique a Escolha de Design',
      description:
        'Dois designs de sistema de notas sao propostos abaixo. Dado os requisitos, analise os trade-offs de cada um nos comentarios e justifique qual voce escolheria.',
      language: 'python',
      starterCode:
        '# Requisitos:\n# - Professores consultam medias em tempo real durante a aula\n# - Medias precisam ser instantaneas\n# - Notas sao inseridas algumas vezes por semana\n# - 500 alunos por turma\n\n# DESIGN A: Calcula media na leitura\nclass SistemaNota_A:\n    def __init__(self):\n        self.notas = {}  # aluno_id -> lista de notas\n    \n    def adicionar_nota(self, aluno_id, nota):\n        if aluno_id not in self.notas:\n            self.notas[aluno_id] = []\n        self.notas[aluno_id].append(nota)\n    \n    def calcular_media(self, aluno_id):\n        notas = self.notas.get(aluno_id, [])\n        return sum(notas) / len(notas) if notas else 0\n\n# DESIGN B: Mantem media pre-calculada\nclass SistemaNota_B:\n    def __init__(self):\n        self.notas = {}\n        self.medias = {}  # cache da media\n    \n    def adicionar_nota(self, aluno_id, nota):\n        if aluno_id not in self.notas:\n            self.notas[aluno_id] = []\n        self.notas[aluno_id].append(nota)\n        notas = self.notas[aluno_id]\n        self.medias[aluno_id] = sum(notas) / len(notas)\n    \n    def calcular_media(self, aluno_id):\n        return self.medias.get(aluno_id, 0)  # O(1)\n\n# Responda nos comentarios:\n# 1. Qual design voce escolheria e por que?\n# 2. Trade-offs do Design A:\n# 3. Trade-offs do Design B:\n# 4. Em que cenario a resposta seria diferente?\n',
      solution:
        '# ANALISE:\n\n# Design A — calcula na leitura\n# Pros: simples, uma fonte de verdade, insercao O(1)\n# Contras: leitura O(n), 500 consultas simultaneas = 500 calculos\n\n# Design B — calcula na escrita\n# Pros: leitura O(1) instantanea, suporta muitas consultas\n# Contras: codigo mais complexo, dois estados para sincronizar\n\n# ESCOLHA: Design B\n# Justificativa:\n# - Requisito critico: "medias instantaneas em tempo real"\n# - Professores consultam muito mais do que inserem notas\n# - Insercao O(n) e aceitavel (poucas insercoes/dia)\n# - Com 500 alunos consultando simultaneamente, O(1) e essencial\n\n# Cenario diferente: se houvesse atualizacoes frequentes de notas\n# (ex: 100 atualizacoes/min), Design A seria melhor para evitar\n# recalculos constantes\n\nclass SistemaNota_B:\n    def __init__(self):\n        self.notas = {}\n        self.medias = {}\n    \n    def adicionar_nota(self, aluno_id, nota):\n        if aluno_id not in self.notas:\n            self.notas[aluno_id] = []\n        self.notas[aluno_id].append(nota)\n        notas = self.notas[aluno_id]\n        self.medias[aluno_id] = sum(notas) / len(notas)\n    \n    def calcular_media(self, aluno_id):\n        return self.medias.get(aluno_id, 0)\n',
      hints: [
        'Foque nos requisitos: "medias instantaneas" e "consultas em tempo real". Qual design atende melhor?',
        'Pense em frequencia: notas sao inseridas poucas vezes, mas medias sao consultadas constantemente. Qual operacao precisa ser mais rapida?',
        'Design B tem dois estados (notas e medias). O risco de inconsistencia e real, mas o ganho em leitura justifica dado os requisitos?',
      ],
    },
  ],
};
