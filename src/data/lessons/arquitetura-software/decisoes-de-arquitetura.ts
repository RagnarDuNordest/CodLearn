import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'decisoes-de-arquitetura',
  moduleId: 'arquitetura-software',
  title: 'Documentando Decisoes de Arquitetura com ADR',
  description: 'Aprenda a registrar decisoes tecnicas importantes usando Architecture Decision Records, garantindo que o contexto e o raciocinio por tras das escolhas nao se percam com o tempo.',
  order: 10,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content: '## O problema: decisoes sem contexto\n\nTodo sistema acumula decisoes tecnicas ao longo do tempo. Por que usamos PostgreSQL em vez de MongoDB? Por que a autenticacao e feita com JWT e nao sessoes? Por que o deploy e manual e nao automatizado?\n\nSe voce entrou no projeto hoje, essas perguntas sao frustrantemente dificeis de responder. O codigo mostra **o que** foi feito, mas nao **por que** foi feito, quais alternativas foram consideradas e o que tornaria essa decisao errada no futuro.\n\nIsso cria varios problemas:\n- Desenvolvedores novos repetem discussoes que ja foram resolvidas\n- Decisoes sao revertidas sem entender as restricoes originais\n- O time perde tempo tentando entender restricoes que nao existem mais\n- Decisoes ruins persistem porque "ninguem sabe por que foi feito assim"\n\nA solucao e simples e poderosa: **documentar decisoes, nao apenas resultados.**',
    },
    {
      type: 'text',
      content: '## O que e um ADR (Architecture Decision Record)\n\nUm **Architecture Decision Record** e um documento curto que registra uma decisao arquitetural importante. O conceito foi popularizado por Michael Nygard em 2011.\n\nA ideia central: **cada decisao significativa recebe seu proprio documento**, com contexto, alternativas consideradas, a decisao tomada e suas consequencias.\n\nCaracteristicas de um bom ADR:\n- **Curto**: 1 a 2 paginas no maximo\n- **Imutavel**: uma vez registrado, nao se edita. Se a decisao mudar, cria-se um novo ADR que supersede o anterior\n- **Sequencial**: ADRs sao numerados (ADR-001, ADR-002...)\n- **Versionado com o codigo**: fica no mesmo repositorio, pasta `/docs/adr/`\n\n**O que documentar:** nao documente cada linha de codigo. Documente decisoes que:\n- Sao dificeis de reverter\n- Afetam varios times ou sistemas\n- Foram resultado de uma analise de alternativas\n- Ficariam confusas para alguem que entrar no projeto depois',
    },
    {
      type: 'text',
      content: '## Estrutura de um ADR: os cinco campos essenciais\n\nUm ADR bem escrito tem cinco partes:\n\n**Titulo:** breve e descritivo. "Usar PostgreSQL como banco de dados principal" ou "Adotar JWT para autenticacao de API".\n\n**Status:** Proposto | Aceito | Obsoleto | Supersedido por ADR-XXX\n\n**Contexto:** Qual problema existe? Quais forcas e restricoes estao em jogo? Nao e julgamento — e descricao neutra da situacao. O leitor deve entender o problema sem ter participado da discussao.\n\n**Decisao:** O que foi decidido? Uma frase direta: "Vamos usar X por causa de Y."\n\n**Consequencias:** O que muda? Quais sao os trade-offs aceitos? Inclua consequencias positivas E negativas. Um ADR honesto lista o que se ganha e o que se perde.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'adr_001_exemplo.py',
        code: `# ADR-001: Escolha do banco de dados para o sistema de catalogo de produtos
# Arquivo: docs/adr/ADR-001-banco-de-dados-catalogo.md (representado aqui como comentarios)

ADR_001 = """
# ADR-001: Usar PostgreSQL como banco de dados do catalogo

**Status:** Aceito
**Data:** 2026-03-29
**Autores:** Time de Plataforma

---

## Contexto

O sistema de catalogo de produtos precisa armazenar:
- Dados estruturados de produtos (id, nome, preco, categoria, atributos)
- Atributos variados por categoria (eletronicos tem voltagem; roupas tem tamanho e cor)
- Relacionamentos entre produtos (variantes, produtos relacionados)
- Volume estimado inicial: 500.000 produtos, crescimento de 20% ao ano

O time tem experiencia forte em SQL (5 anos de uso em outros sistemas da empresa).
O prazo para o primeiro deploy e de 3 meses.

---

## Alternativas Consideradas

### 1. MongoDB (NoSQL orientado a documentos)
**Pros:**
- Schema flexivel: facil de adicionar atributos por categoria
- Bom para documentos heterogeneos (cada produto e um documento)
**Contras:**
- Time nao tem experiencia: curva de aprendizado adiciona risco ao prazo
- Joins sao mais complexos: relatorios de BI que a empresa usa exigem SQL
- Consistencia eventual adiciona complexidade para operacoes criticas

### 2. DynamoDB (NoSQL gerenciado na AWS)
**Pros:**
- Escala automatica, zero operacao
**Contras:**
- Vendor lock-in severo
- Modelo de dados exige planejamento de acesso muito antecipado
- Custo imprevisivel com crescimento

### 3. PostgreSQL (SQL relacional)
**Pros:**
- Time ja domina: sem curva de aprendizado
- Tipo JSONB permite atributos flexiveis por categoria sem sacrificar SQL
- Usado nos outros sistemas: operacao padronizada
- ACID: consistencia forte para operacoes criticas de preco/estoque
**Contras:**
- Escala horizontal e mais complexa que NoSQL (mas volume atual nao exige)
- Schema rigido para tabelas principais (aceito como trade-off)

---

## Decisao

Usaremos PostgreSQL com o tipo JSONB para o campo de atributos por categoria.

---

## Consequencias

**Positivas:**
- Zero curva de aprendizado: time produtivo desde o primeiro dia
- Relatorios de BI funcionam sem adaptacao (ja usam SQL)
- Atributos flexiveis resolvidos com JSONB sem abrir mao de SQL

**Negativas:**
- Escala horizontal vai exigir solucao dedicada (read replicas, sharding) se o volume
  superar 10 milhoes de produtos — deve ser revisado em ADR futuro
- Migracao de schema exige downtime ou migracao online cuidadosa

**Condicoes para revisitar esta decisao:**
- Volume supera 5 milhoes de produtos com degradacao de performance
- Necessidade de geo-distribuicao de dados em diferentes regioes
"""

print(ADR_001)`,
        description: 'Exemplo completo de ADR: contexto, alternativas, decisao e consequencias. O leitor entende o porque, nao apenas o que.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'estrutura_adrs_no_projeto.py',
        code: `# Como organizar ADRs no repositorio

estrutura_projeto = """
meu-projeto/
  src/
    ...codigo...
  docs/
    adr/
      ADR-001-banco-de-dados.md         # Aceito
      ADR-002-autenticacao-jwt.md       # Aceito
      ADR-003-cache-redis.md            # Aceito
      ADR-004-mensageria-rabbitmq.md    # Supersedido por ADR-007
      ADR-005-deploy-manual.md          # Obsoleto
      ADR-006-framework-fastapi.md      # Aceito
      ADR-007-mensageria-kafka.md       # Aceito (supersede ADR-004)
  README.md
"""

# Convencoes importantes:
convencoes = {
    "numeracao": "Sequencial e nunca reutilizado. ADR-004 sempre foi ADR-004, mesmo obsoleto.",
    "imutabilidade": "Nao edite ADRs existentes. Crie um novo que supersede o anterior.",
    "status": [
        "Proposto - ainda em discussao",
        "Aceito - decisao tomada e em vigor",
        "Obsoleto - nao se aplica mais, mas nao foi substituido",
        "Supersedido por ADR-XXX - substituido por decisao mais recente",
    ],
    "o_que_registrar": [
        "Escolha de banco de dados, message broker, framework principal",
        "Padroes de autenticacao e autorizacao",
        "Estrategia de deploy e infra",
        "Decisoes de separacao de servicos (quando extrair um microservico)",
        "Politicas de versioning de API",
    ],
    "o_que_nao_registrar": [
        "Escolhas de implementacao locais (nome de variavel, algoritmo simples)",
        "Decisoes que se documentam no proprio codigo",
        "Configuracoes operacionais (ficam em runbooks, nao ADRs)",
    ],
}

print("Estrutura de ADRs no projeto:")
print(estrutura_projeto)
print("\\nO que registrar como ADR:")
for item in convencoes["o_que_registrar"]:
    print(f"  + {item}")`,
        description: 'ADRs ficam no repositorio, na pasta docs/adr/. Sao versionados junto com o codigo e nunca editados retroativamente.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Um ADR bem escrito responde a pergunta: "Por que isso foi feito assim?" Se alguem entrar no projeto daqui a 2 anos e conseguir entender o contexto e o raciocinio lendo o ADR, ele cumpriu seu papel. Se o ADR so diz "decidimos usar X", ele nao serve de muito.',
    },
  ],
  challenges: [
    {
      id: 'adr-challenge-1',
      title: 'Escrever um ADR para escolha entre SQL e NoSQL',
      description: 'Dado o cenario abaixo, escreva um ADR completo como comentarios Python estruturados. Cenario: um sistema de logs de acesso para um SaaS. O sistema vai registrar todas as acoes dos usuarios (login, visualizacao de pagina, clique em botao). Volume: 50 milhoes de eventos por mes. Os logs sao consultados raramente (debug e auditoria), mas escritos a todo momento. O time tem experiencia igual em SQL e NoSQL.',
      language: 'python',
      starterCode: `# Escreva o ADR completo como uma string Python estruturada
# Preencha todos os campos: status, contexto, alternativas, decisao e consequencias

ADR_LOGS = """
# ADR-00X: [Titulo descritivo aqui]

**Status:** [Proposto | Aceito | Obsoleto]
**Data:** 2026-03-29

---

## Contexto

[Descreva o problema e as restricoes. Responda:
 - O que o sistema precisa armazenar?
 - Qual o volume de dados?
 - Como os dados serao acessados (escrita x leitura)?
 - Quais restricoes existem (time, prazo, custo)?]

---

## Alternativas Consideradas

### 1. PostgreSQL (SQL relacional)
**Pros:**
- [liste os pros para este cenario especifico]
**Contras:**
- [liste os contras para este cenario especifico]

### 2. MongoDB (NoSQL orientado a documentos)
**Pros:**
- [liste os pros para este cenario especifico]
**Contras:**
- [liste os contras para este cenario especifico]

### 3. [Outra alternativa relevante - ex: Elasticsearch, Cassandra, S3 + Athena]
**Pros:**
- [...]
**Contras:**
- [...]

---

## Decisao

[Uma ou duas frases diretas: o que foi decidido e o motivo principal.]

---

## Consequencias

**Positivas:**
- [O que melhora com esta decisao?]

**Negativas / Trade-offs aceitos:**
- [O que se perde ou fica mais dificil?]

**Quando revisitar:**
- [Em que condicoes esta decisao deve ser questionada?]
"""

print(ADR_LOGS)
`,
      solution: `# ADR completo para sistema de logs de acesso

ADR_LOGS = """
# ADR-008: Usar MongoDB como armazenamento de logs de acesso

**Status:** Aceito
**Data:** 2026-03-29
**Autores:** Time de Plataforma

---

## Contexto

O sistema de logs de acesso precisa registrar todas as acoes dos usuarios do SaaS:
login, logout, visualizacao de pagina, cliques em acoes criticas e erros de frontend.

Caracteristicas do workload:
- Volume: ~50 milhoes de eventos por mes (~19 eventos/segundo na media)
- Padrao de acesso: write-heavy (99% das operacoes sao insercao)
- Leitura: esporadica, para debug de bugs e auditorias de seguranca
- Estrutura dos eventos: varia por tipo (login tem IP e user-agent; clique tem elemento e url)
- Retencao: 90 dias de dados quentes, depois arquivamento

O time tem experiencia equivalente em SQL (PostgreSQL) e NoSQL (MongoDB).
Nao ha restricoes de prazo urgentes.

---

## Alternativas Consideradas

### 1. PostgreSQL (SQL relacional)
**Pros:**
- Suporte a JSONB para eventos heterogeneos
- Transacoes ACID: util se precisarmos de garantia de escrita
- Facil de fazer queries complexas de auditoria com SQL
**Contras:**
- Write-heavy em SQL exige tuning cuidadoso de indices e WAL
- Schema de tabela com JSONB perde o beneficio de schema rigido e nao ganha o de schema livre
- Escala vertical: adicionar capacidade de escrita exige hardware maior

### 2. MongoDB (NoSQL orientado a documentos)
**Pros:**
- Schema livre: cada tipo de evento armazena seus proprios campos sem migrations
- Escrita muito rapida com write concern configuravel
- Escala horizontal nativa (sharding por data ou usuario)
- TTL index nativo: MongoDB deleta automaticamente logs com mais de 90 dias
- Modelo de documento encaixa naturalmente com eventos heterogeneos
**Contras:**
- Queries ad-hoc complexas sao menos ergonomicas que SQL
- Sem transacoes multi-documento em versoes antigas (a partir do 4.0 tem suporte)
- Aggregation pipeline tem curva de aprendizado

### 3. Elasticsearch
**Pros:**
- Busca full-text poderosa: util para buscar logs por mensagem de erro
- Kibana para visualizacao nativa
- Muito usado para logs (stack ELK)
**Contras:**
- Complexidade operacional alta: requer cluster dedicado, gestao de indices, ILM
- Custo de infraestrutura maior
- Overhead excessivo para um caso de uso simples de log estruturado sem busca de texto

### 4. Amazon S3 + Athena
**Pros:**
- Custo muito baixo para armazenamento de longo prazo
- Sem infraestrutura para gerenciar
**Contras:**
- Latencia de query alta (segundos a minutos): inaceitavel para debug em tempo real
- Nao adequado para consultas frequentes de desenvolvimento

---

## Decisao

Usaremos MongoDB com sharding por data de criacao e TTL index de 90 dias.

A escolha se baseia em: schema livre elimina migrations a cada novo tipo de evento;
escrita horizontal escala conforme o volume cresce; TTL index automatiza a retencao
sem jobs de limpeza manuais.

---

## Consequencias

**Positivas:**
- Insercao de novos tipos de evento: apenas inserir o documento, sem alterar schema
- Retencao automatica: TTL index apaga documentos antigos sem intervencao manual
- Escala horizontal disponivel quando volume exigir
- Queries de auditoria por usuario e data sao simples com indices compostos

**Negativas / Trade-offs aceitos:**
- Queries ad-hoc complexas exigem aggregation pipeline (mais verboso que SQL)
- Sem garantia de ordem de insercao sob alta carga (aceitavel para logs)
- Joins com outras colecoes (ex: dados do usuario) nao sao nativos: aplicacao faz o join

**Quando revisitar:**
- Se o time precisar de queries full-text nos logs (mensagens de erro): avaliar Elasticsearch
- Se o custo do MongoDB superar 20% do budget de infra: reavaliar S3 + Athena para dados frios
- Se houver necessidade de consistencia transacional nos logs: improvavel, mas reavaliar
"""

print(ADR_LOGS)
`,
      hints: [
        'No campo Contexto, foque nas caracteristicas do workload: 50M eventos/mes e write-heavy. Isso ja elimina algumas alternativas. Descreva tambem que os eventos sao heterogeneos (estrutura varia por tipo).',
        'Para cada alternativa, pense no cenario especifico: o que e bom e ruim para 50M insercoes/mes com leitura esporadica? Um banco ACID forte e necessario para logs?',
        'No campo Consequencias, seja honesto sobre os trade-offs negativos. Um bom ADR nao "vende" a decisao — ele explica o raciocinio e lista o que se perde.',
      ],
    },
  ],
};
