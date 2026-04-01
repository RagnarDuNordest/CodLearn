import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-dockerizando-aplicacao',
  moduleId: 'docker',
  title: 'Projeto: Dockerizando uma Aplicacao',
  description: 'Projeto completo: dockerize uma aplicacao Flask com PostgreSQL usando docker-compose, volumes para dados e variaveis de ambiente',
  order: 5,
  estimatedMinutes: 60,
  sections: [
    {
      type: 'text',
      content:
        '## Projeto: To-Do API com Flask e PostgreSQL\n\nNeste projeto voce vai dockerizar uma aplicacao real do zero. A aplicacao e uma API de lista de tarefas (To-Do) construida com Flask e PostgreSQL.\n\n### Estrutura do projeto\n\n```\ntodo-api/\n├── app/\n│   ├── __init__.py\n│   ├── models.py\n│   └── routes.py\n├── Dockerfile\n├── docker-compose.yml\n├── .dockerignore\n├── .env\n├── requirements.txt\n└── run.py\n```\n\n### O que a aplicacao faz\n\n- `GET /tasks` — lista todas as tarefas\n- `POST /tasks` — cria uma nova tarefa\n- `PUT /tasks/<id>` — marca tarefa como concluida\n- `DELETE /tasks/<id>` — remove uma tarefa\n\n### Tecnologias\n\n- **Flask** — framework web Python\n- **SQLAlchemy** — ORM para o banco de dados\n- **PostgreSQL** — banco de dados relacional\n- **Docker + Docker Compose** — empacotamento e orquestracao\n\n### Passo 1: O codigo da aplicacao',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# === run.py — ponto de entrada ===\nimport os\nfrom app import create_app\n\napp = create_app()\n\nif __name__ == "__main__":\n    port = int(os.getenv("PORT", 5000))\n    app.run(host="0.0.0.0", port=port)\n\n\n# === app/__init__.py ===\nfrom flask import Flask\nfrom flask_sqlalchemy import SQLAlchemy\n\ndb = SQLAlchemy()\n\ndef create_app():\n    app = Flask(__name__)\n    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(\n        "DATABASE_URL",\n        "sqlite:///local.db"  # fallback para dev sem Docker\n    )\n    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False\n    db.init_app(app)\n\n    with app.app_context():\n        from app import routes\n        db.create_all()  # cria tabelas se nao existirem\n\n    app.register_blueprint(routes.bp)\n    return app\n\n\n# === app/models.py ===\nfrom app import db\nfrom datetime import datetime\n\nclass Task(db.Model):\n    __tablename__ = "tasks"\n\n    id = db.Column(db.Integer, primary_key=True)\n    title = db.Column(db.String(200), nullable=False)\n    done = db.Column(db.Boolean, default=False)\n    created_at = db.Column(db.DateTime, default=datetime.utcnow)\n\n    def to_dict(self):\n        return {\n            "id": self.id,\n            "title": self.title,\n            "done": self.done,\n            "created_at": self.created_at.isoformat()\n        }',
        filename: 'app-flask.py',
        description:
          'Codigo da aplicacao Flask com SQLAlchemy. A DATABASE_URL vem de variavel de ambiente — quando rodando no Docker, aponta para o servico "db"; quando rodando localmente, usa SQLite como fallback.',
      },
    },
    {
      type: 'text',
      content:
        '### Passo 2: Configurando o ambiente Docker\n\nAgora vamos criar todos os arquivos de configuracao Docker.\n\n**requirements.txt:**\n```\nflask==3.0.0\nflask-sqlalchemy==3.1.1\npsycopg2-binary==2.9.9\ngunicorn==21.2.0\n```\n\n**Dockerfile:**\n```dockerfile\nFROM python:3.12-slim\n\nENV PYTHONDONTWRITEBYTECODE=1\nENV PYTHONUNBUFFERED=1\n\nWORKDIR /app\n\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\nCOPY . .\n\nEXPOSE 5000\n\nCMD ["gunicorn", "--bind", "0.0.0.0:5000", "run:app"]\n```\n\n**.dockerignore:**\n```\n__pycache__/\n*.pyc\n.env\n.git/\nvenv/\n.venv/\n*.sqlite\n```\n\n**.env:**\n```\nPOSTGRES_USER=todouser\nPOSTGRES_PASSWORD=todopass123\nPOSTGRES_DB=tododb\nDATABASE_URL=postgresql://todouser:todopass123@db:5432/tododb\nFLASK_ENV=production\nPORT=5000\n```\n\n### Passo 3: O docker-compose.yml\n\n```yaml\nversion: "3.9"\n\nservices:\n  web:\n    build: .\n    ports:\n      - "5000:5000"\n    env_file:\n      - .env\n    volumes:\n      - .:/app\n    depends_on:\n      db:\n        condition: service_healthy\n    restart: unless-stopped\n\n  db:\n    image: postgres:16\n    env_file:\n      - .env\n    volumes:\n      - postgres-data:/var/lib/postgresql/data\n    healthcheck:\n      test: ["CMD-SHELL", "pg_isready -U todouser -d tododb"]\n      interval: 5s\n      timeout: 5s\n      retries: 10\n\nvolumes:\n  postgres-data:\n```\n\n### Passo 4: Subindo e testando\n\nCom todos os arquivos criados, o deploy completo e:\n\n```bash\ndocker compose up -d --build\n```\n\nE para testar a API:\n\n```bash\ncurl -X POST http://localhost:5000/tasks \\\n  -H "Content-Type: application/json" \\\n  -d \'{"title": "Aprender Docker"}\'\n\ncurl http://localhost:5000/tasks\n```',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# === FLUXO COMPLETO DE DEPLOY ===\n\n# 1. Clonar ou entrar no diretorio do projeto\ncd todo-api\n\n# 2. Build e subida da stack completa\ndocker compose up -d --build\n# [+] Building 15.2s (10/10) FINISHED\n# [+] Running 3/3\n#  Container todo-api-db-1   Healthy\n#  Container todo-api-web-1  Started\n\n# 3. Verificar status\ndocker compose ps\n# NAME              IMAGE         STATUS         PORTS\n# todo-api-db-1     postgres:16   Up (healthy)   5432/tcp\n# todo-api-web-1    todo-api-web  Up             0.0.0.0:5000->5000/tcp\n\n# 4. Testar a API\ncurl -X POST http://localhost:5000/tasks \\\n  -H "Content-Type: application/json" \\\n  -d \'{"title": "Aprender Docker"}\'\n# {"id": 1, "title": "Aprender Docker", "done": false, ...}\n\ncurl http://localhost:5000/tasks\n# [{\"id\": 1, \"title\": \"Aprender Docker\", \"done\": false, ...}]\n\ncurl -X PUT http://localhost:5000/tasks/1\n# {\"id\": 1, \"title\": \"Aprender Docker\", \"done\": true, ...}\n\n# 5. Ver logs em tempo real\ndocker compose logs -f web\n\n# 6. Acessar o banco diretamente\ndocker compose exec db psql -U todouser -d tododb\n# tododb=# \\dt\n# tododb=# SELECT * FROM tasks;\n# tododb=# \\q\n\n# 7. Rebuild so do servico web (apos mudanca de codigo)\ndocker compose up -d --build web\n\n# 8. Encerrar tudo (preserva dados no volume)\ndocker compose down\n\n# 9. Encerrar e APAGAR os dados\ndocker compose down -v',
        filename: 'deploy-completo.sh',
        description:
          'Fluxo completo de deploy da To-Do API: build, verificacao de status, testes com curl, acesso ao banco via psql, rebuild parcial e encerramento. Com volumes, os dados persistem entre restarts.',
      },
    },
  ],
  challenges: [
    {
      id: 'docker-c6-dockerfile',
      title: 'Dockerfile para a To-Do API',
      description:
        'Escreva o Dockerfile completo para a To-Do API Flask. Use python:3.12-slim como base, defina as variaveis de ambiente necessarias para Python, configure o WORKDIR como /app, copie e instale as dependencias antes do codigo, e use gunicorn como servidor de producao na porta 5000.',
      language: 'bash',
      starterCode:
        '# Escreva o Dockerfile completo para a To-Do API\n# (represente o conteudo do Dockerfile como comentarios)\n\n# Requisitos:\n# - Imagem base: python:3.12-slim\n# - Variaveis ENV para Python (sem .pyc, sem buffering)\n# - WORKDIR: /app\n# - Copiar requirements.txt ANTES do restante do codigo\n# - Instalar dependencias com pip (sem cache)\n# - Copiar o restante do codigo\n# - Expor porta 5000\n# - Usar gunicorn: gunicorn --bind 0.0.0.0:5000 run:app\n\n',
      solution:
        '# Dockerfile completo para a To-Do API:\n\nFROM python:3.12-slim\n\nENV PYTHONDONTWRITEBYTECODE=1\nENV PYTHONUNBUFFERED=1\n\nWORKDIR /app\n\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\nCOPY . .\n\nEXPOSE 5000\n\nCMD ["gunicorn", "--bind", "0.0.0.0:5000", "run:app"]\n\n# Para buildar:\n# docker build -t todo-api:latest .\n\n# Para rodar standalone (sem compose):\n# docker run -d \\\n#   --name todo-api \\\n#   -p 5000:5000 \\\n#   -e DATABASE_URL=postgresql://user:pass@host/db \\\n#   todo-api:latest\n',
      hints: [
        'PYTHONDONTWRITEBYTECODE=1 evita criar arquivos .pyc; PYTHONUNBUFFERED=1 garante que logs apaream imediatamente',
        'A ordem COPY requirements.txt . / RUN pip install / COPY . . e fundamental para o cache do Docker funcionar corretamente',
        'Gunicorn e um servidor WSGI de producao — mais robusto que o servidor de desenvolvimento do Flask (app.run)',
      ],
    },
    {
      id: 'docker-c6-compose',
      title: 'docker-compose.yml Completo',
      description:
        'Escreva o docker-compose.yml completo para a To-Do API. O servico "web" deve usar build local, expor porta 5000, usar um arquivo .env, depender do servico "db" com condicao de healthcheck. O servico "db" deve usar postgres:16, env_file, volume "postgres-data" e ter um healthcheck configurado. Declare o volume no nivel raiz.',
      language: 'bash',
      starterCode:
        '# Escreva o conteudo do docker-compose.yml\n# (represente o YAML como comentarios)\n\n# version: "3.9"\n#\n# services:\n#   web:\n#     ___  (build, ports, env_file, depends_on com healthcheck)\n#\n#   db:\n#     ___  (image, env_file, volumes, healthcheck)\n#\n# volumes:\n#   ___\n',
      solution:
        '# docker-compose.yml completo:\n#\n# version: "3.9"\n#\n# services:\n#   web:\n#     build: .\n#     ports:\n#       - "5000:5000"\n#     env_file:\n#       - .env\n#     depends_on:\n#       db:\n#         condition: service_healthy\n#     restart: unless-stopped\n#\n#   db:\n#     image: postgres:16\n#     env_file:\n#       - .env\n#     volumes:\n#       - postgres-data:/var/lib/postgresql/data\n#     healthcheck:\n#       test: ["CMD-SHELL", "pg_isready -U todouser -d tododb"]\n#       interval: 5s\n#       timeout: 5s\n#       retries: 10\n#\n# volumes:\n#   postgres-data:\n\n# Comandos para subir e testar:\ndocker compose up -d --build\ndocker compose ps\ncurl http://localhost:5000/tasks\n',
      hints: [
        'Para usar healthcheck no depends_on, a sintaxe e: "depends_on: db: condition: service_healthy" — isso garante que o banco esta realmente pronto antes do web iniciar',
        'O healthcheck do PostgreSQL usa "pg_isready -U USUARIO -d BANCO" — o -U e o usuario criado pela variavel POSTGRES_USER',
        '"restart: unless-stopped" faz o container reiniciar automaticamente em caso de falha — importante para producao',
      ],
    },
  ],
};
