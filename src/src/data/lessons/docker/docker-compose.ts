import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'docker-compose',
  moduleId: 'docker',
  title: 'Docker Compose',
  description: 'Orquestre multiplos containers com docker-compose.yml: services, volumes, networks, depends_on e stacks Flask + PostgreSQL',
  order: 4,
  estimatedMinutes: 40,
  sections: [
    {
      type: 'text',
      content:
        '## Por que o Docker Compose existe\n\nAplicacoes reais raramente sao compostas por um unico container. Um sistema tipico tem:\n- Um container com a aplicacao web (Flask, Django, FastAPI)\n- Um container com o banco de dados (PostgreSQL, MySQL)\n- Um container com cache (Redis)\n- Talvez um container com o servidor web (Nginx)\n\nGerenciar isso manualmente com varios `docker run` e tedioso e propenso a erros. O **Docker Compose** resolve isso com um arquivo de configuracao declarativo.\n\n### O arquivo docker-compose.yml\n\nVoce descreve todos os servicos, volumes e redes em um unico arquivo YAML. Depois, um comando sobe tudo:\n\n```bash\ndocker compose up      # Sobe todos os servicos\ndocker compose down    # Para e remove tudo\n```\n\n## Estrutura basica do docker-compose.yml\n\n```yaml\nservices:\n  nome-do-servico:\n    image: imagem:tag         # ou build: .\n    ports:\n      - "HOST:CONTAINER"\n    environment:\n      - VARIAVEL=valor\n    volumes:\n      - nome-volume:/caminho\n    depends_on:\n      - outro-servico\n\nvolumes:\n  nome-volume:\n\nnetworks:\n  nome-rede:\n```\n\n### Conceitos importantes\n\n**services:** cada servico e um container. O nome do servico funciona como hostname na rede interna.\n\n**volumes:** volumes nomeados declarados no nivel raiz do arquivo.\n\n**networks:** redes personalizadas. Por padrao, o Compose cria uma rede para todos os servicos do arquivo.\n\n**depends_on:** define ordem de inicializacao — o servico so inicia apos os dependentes estarem prontos.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# === docker-compose.yml: Flask + PostgreSQL ===\n\ncat docker-compose.yml\n# version: "3.9"\n#\n# services:\n#   web:\n#     build: .                    # build do Dockerfile neste diretorio\n#     ports:\n#       - "5000:5000"\n#     environment:\n#       - FLASK_ENV=development\n#       - DATABASE_URL=postgresql://admin:senha123@db:5432/meubanco\n#     volumes:\n#       - .:/app                  # bind mount para hot-reload\n#     depends_on:\n#       - db\n#\n#   db:\n#     image: postgres:16\n#     environment:\n#       - POSTGRES_USER=admin\n#       - POSTGRES_PASSWORD=senha123\n#       - POSTGRES_DB=meubanco\n#     volumes:\n#       - postgres-data:/var/lib/postgresql/data\n#     ports:\n#       - "5432:5432"\n#\n# volumes:\n#   postgres-data:\n\n# === COMANDOS ESSENCIAIS ===\n\n# Subir todos os servicos (em background)\ndocker compose up -d\n\n# Ver status dos servicos\ndocker compose ps\n\n# Ver logs de todos os servicos\ndocker compose logs\n\n# Ver logs de um servico especifico\ndocker compose logs -f web\n\n# Parar todos os servicos (sem remover)\ndocker compose stop\n\n# Parar E remover containers e redes\ndocker compose down\n\n# Parar, remover containers, redes E volumes\ndocker compose down -v',
        filename: 'compose-flask-postgres.sh',
        description:
          'docker-compose.yml completo com Flask e PostgreSQL: o servico "web" usa build local, o servico "db" usa imagem oficial. Note que "db" e o hostname do banco na URL de conexao — o Compose cria uma rede interna.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'O "depends_on" garante apenas a ORDEM de inicializacao dos containers, nao que o servico dentro do container esteja pronto para aceitar conexoes. O PostgreSQL leva alguns segundos para inicializar apos o container subir. Para lidar com isso, use bibliotecas de retry na aplicacao (como "tenacity" em Python) ou um health check no docker-compose.yml.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# === EXEMPLO COMPLETO: Flask + PostgreSQL + Redis ===\n\ncat docker-compose.yml\n# version: "3.9"\n#\n# services:\n#   web:\n#     build:\n#       context: .\n#       dockerfile: Dockerfile\n#     ports:\n#       - "5000:5000"\n#     env_file:\n#       - .env\n#     volumes:\n#       - .:/app\n#     depends_on:\n#       - db\n#       - cache\n#     restart: unless-stopped\n#\n#   db:\n#     image: postgres:16\n#     env_file:\n#       - .env\n#     volumes:\n#       - postgres-data:/var/lib/postgresql/data\n#     healthcheck:\n#       test: ["CMD-SHELL", "pg_isready -U $$POSTGRES_USER"]\n#       interval: 5s\n#       timeout: 5s\n#       retries: 5\n#\n#   cache:\n#     image: redis:7-alpine\n#     volumes:\n#       - redis-data:/data\n#\n# volumes:\n#   postgres-data:\n#   redis-data:\n\n# === COMANDOS EXTRAS ===\n\n# Buildar imagens sem subir containers\ndocker compose build\n\n# Rebuildar e subir (forcando rebuild)\ndocker compose up -d --build\n\n# Executar comando em servico\ndocker compose exec web python manage.py migrate\n\n# Escalar um servico (3 instancias do web)\ndocker compose up -d --scale web=3\n\n# Ver variaveis de ambiente resolvidas\ndocker compose config',
        filename: 'compose-avancado.sh',
        description:
          'Configuracao avancada do Compose: tres servicos (Flask, PostgreSQL, Redis), uso de env_file, healthcheck no banco, restart policy e comandos adicionais como exec, build e scale.',
      },
    },
  ],
  challenges: [
    {
      id: 'docker-c5-compose',
      title: 'Escreva um docker-compose.yml',
      description:
        'Crie um arquivo docker-compose.yml para uma aplicacao com dois servicos: "api" (construida a partir do Dockerfile local, porta 8000) e "banco" (PostgreSQL 15, com usuario "dev", senha "dev123" e banco "appdb"). O servico "api" deve depender do "banco" e a conexao com o banco deve usar a variavel DATABASE_URL. O banco deve ter um volume nomeado "db-data".',
      language: 'bash',
      starterCode:
        '# Escreva o conteudo do docker-compose.yml abaixo\n# (use comentarios bash para representar o YAML)\n\n# version: "3.9"\n#\n# services:\n#   api:\n#     ____\n#\n#   banco:\n#     ____\n#\n# volumes:\n#   ____\n',
      solution:
        '# Conteudo do docker-compose.yml:\n#\n# version: "3.9"\n#\n# services:\n#   api:\n#     build: .\n#     ports:\n#       - "8000:8000"\n#     environment:\n#       - DATABASE_URL=postgresql://dev:dev123@banco:5432/appdb\n#     depends_on:\n#       - banco\n#\n#   banco:\n#     image: postgres:15\n#     environment:\n#       - POSTGRES_USER=dev\n#       - POSTGRES_PASSWORD=dev123\n#       - POSTGRES_DB=appdb\n#     volumes:\n#       - db-data:/var/lib/postgresql/data\n#\n# volumes:\n#   db-data:\n\n# Para subir a stack:\ndocker compose up -d\n\n# Para verificar:\ndocker compose ps\n\n# Para derrubar e remover volumes:\ndocker compose down -v\n',
      hints: [
        'O hostname do servico "banco" na DATABASE_URL deve ser exatamente "banco" — o Compose usa o nome do servico como hostname na rede interna',
        'Use "build: ." para construir a partir do Dockerfile local e "image: postgres:15" para usar imagem do registry',
        'Volumes nomeados devem ser declarados tanto em "volumes:" dentro do servico quanto na secao "volumes:" no nivel raiz do arquivo',
      ],
    },
    {
      id: 'docker-c5-comandos',
      title: 'Comandos do Compose',
      description:
        'Escreva os comandos docker compose para: subir a stack em background, verificar o status dos servicos, ver os logs do servico "api" em tempo real, executar "python manage.py migrate" dentro do servico "api" e depois derrubar tudo removendo os volumes.',
      language: 'bash',
      starterCode:
        '# Desafio: comandos essenciais do Docker Compose\n\n# 1. Subir todos os servicos em background\n\n\n# 2. Ver status dos servicos\n\n\n# 3. Ver logs do servico "api" em tempo real\n\n\n# 4. Executar "python manage.py migrate" dentro do servico "api"\n\n\n# 5. Derrubar a stack E remover os volumes\n\n',
      solution:
        '# Desafio: comandos essenciais do Docker Compose\n\n# 1. Subir todos os servicos em background\ndocker compose up -d\n\n# 2. Ver status dos servicos\ndocker compose ps\n\n# 3. Ver logs do servico "api" em tempo real\ndocker compose logs -f api\n\n# 4. Executar "python manage.py migrate" dentro do servico "api"\ndocker compose exec api python manage.py migrate\n\n# 5. Derrubar a stack E remover os volumes\ndocker compose down -v\n',
      hints: [
        'Para rodar em background use a flag -d (detached) — igual ao docker run',
        '"docker compose logs -f SERVICO" segue os logs em tempo real — o -f vem de "follow"',
        '"docker compose exec SERVICO COMANDO" e o equivalente do "docker exec" para o Compose — nao precisa do container ID',
      ],
    },
  ],
};
