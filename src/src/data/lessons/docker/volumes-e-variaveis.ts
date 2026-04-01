import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'volumes-e-variaveis',
  moduleId: 'docker',
  title: 'Volumes e Variaveis de Ambiente',
  description: 'Persista dados com volumes e bind mounts, configure aplicacoes com variaveis de ambiente e exponha portas corretamente',
  order: 3,
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        '## O problema da persistencia\n\nPor padrao, containers Docker sao **efemeros** — qualquer dado gravado dentro de um container e perdido quando ele e removido. Se voce rodar um banco de dados em um container e remover esse container, todos os dados somem.\n\nPara persistir dados, o Docker oferece duas solucoes principais:\n\n### 1. Volumes gerenciados pelo Docker\n\nVolumes sao o mecanismo preferido para persistir dados. O Docker gerencia o armazenamento em um local controlado (`/var/lib/docker/volumes/` no Linux).\n\n**Vantagens:**\n- Gerenciados pelo Docker (facil backup, migrar entre containers)\n- Funcionam em Linux, Mac e Windows\n- Podem ser compartilhados entre containers\n- Persistem mesmo se o container for removido\n\n```bash\n# Criar volume nomeado\ndocker volume create dados-postgres\n\n# Usar volume no container\ndocker run -v dados-postgres:/var/lib/postgresql/data postgres:16\n```\n\n### 2. Bind Mounts\n\nBind mounts mapeiam um diretorio do host diretamente para dentro do container. O container ve e modifica os arquivos do host em tempo real.\n\n**Uso tipico:** desenvolvimento local — voce edita o codigo no host e o container ve as mudancas instantaneamente.\n\n```bash\n# Sintaxe: -v /caminho/host:/caminho/container\ndocker run -v /meu/projeto:/app python:3.12 python /app/script.py\n\n# Usando caminho relativo (apenas com $(pwd))\ndocker run -v $(pwd):/app python:3.12 python /app/script.py\n```',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# === VOLUMES GERENCIADOS ===\n\n# Criar um volume nomeado\ndocker volume create banco-dados\n\n# Listar volumes\ndocker volume ls\n# DRIVER    VOLUME NAME\n# local     banco-dados\n\n# Inspecionar volume (ver onde esta no host)\ndocker volume inspect banco-dados\n\n# Rodar PostgreSQL com volume persistente\ndocker run -d \\\n  --name postgres \\\n  -e POSTGRES_PASSWORD=minhasenha \\\n  -e POSTGRES_DB=meubanco \\\n  -v banco-dados:/var/lib/postgresql/data \\\n  -p 5432:5432 \\\n  postgres:16\n\n# Remover o container — os dados persistem no volume!\ndocker rm -f postgres\n\n# Novo container, mesmos dados\ndocker run -d \\\n  --name postgres-novo \\\n  -e POSTGRES_PASSWORD=minhasenha \\\n  -v banco-dados:/var/lib/postgresql/data \\\n  -p 5432:5432 \\\n  postgres:16\n\n# === BIND MOUNTS (desenvolvimento) ===\n\n# Montar diretorio atual dentro do container\ndocker run --rm \\\n  -v $(pwd):/app \\\n  -w /app \\\n  python:3.12-slim \\\n  python app.py\n\n# Remover volume\ndocker volume rm banco-dados',
        filename: 'volumes-pratico.sh',
        description:
          'Demonstracao completa de volumes: criacao, uso com PostgreSQL, persistencia apos remocao do container e bind mount para desenvolvimento. Note o uso de -v para montar e -w para definir o workdir.',
      },
    },
    {
      type: 'text',
      content:
        '## Variaveis de ambiente\n\nAplicacoes modernas usam variaveis de ambiente para configuracao — senhas, URLs de banco, chaves de API, modo de execucao (debug/producao). Nunca hardcode essas informacoes no codigo ou na imagem.\n\n### Passando variaveis com -e\n\n```bash\ndocker run -e NOME_VAR=valor imagem\ndocker run -e DB_HOST=localhost -e DB_PORT=5432 -e DB_PASS=segredo app\n```\n\n### Usando arquivo .env\n\nPara muitas variaveis, crie um arquivo `.env` e passe com `--env-file`:\n\n```bash\n# .env\nDB_HOST=localhost\nDB_PORT=5432\nDB_NAME=meubanco\nDB_USER=admin\nDB_PASS=segredo123\nFLASK_ENV=production\n```\n\n```bash\ndocker run --env-file .env minha-app\n```\n\n**Importante:** nunca commite o `.env` no Git — adicione ao `.gitignore`.\n\n## Mapeamento de portas\n\nPor padrao, nenhuma porta do container e acessivel do host. Voce precisa mapear explicitamente:\n\n```bash\n# -p PORTA_HOST:PORTA_CONTAINER\ndocker run -p 8080:80 nginx      # host:8080 -> container:80\ndocker run -p 5432:5432 postgres  # host:5432 -> container:5432\ndocker run -p 3000:3000 node-app  # mesma porta\n\n# Mapear todas as portas expostas com -P (maiusculo)\ndocker run -P nginx\n```',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# === VARIAVEIS DE AMBIENTE ===\n\n# Passando variaveis individualmente com -e\ndocker run -d \\\n  --name meu-app \\\n  -e FLASK_ENV=production \\\n  -e SECRET_KEY=minha-chave-secreta \\\n  -e DB_URL=postgresql://user:pass@localhost/db \\\n  -p 5000:5000 \\\n  minha-flask-app\n\n# Verificar variaveis dentro do container\ndocker exec meu-app env\n\n# Usando arquivo .env (mais organizado)\ncat .env\n# FLASK_ENV=production\n# SECRET_KEY=minha-chave-secreta\n# DB_URL=postgresql://user:pass@localhost/db\n\ndocker run -d \\\n  --name meu-app \\\n  --env-file .env \\\n  -p 5000:5000 \\\n  minha-flask-app\n\n# === LENDO VARIAVEIS NO PYTHON ===\ncat app.py\n# import os\n# from flask import Flask\n# app = Flask(__name__)\n# \n# DB_URL = os.getenv("DB_URL", "sqlite:///local.db")\n# SECRET_KEY = os.environ["SECRET_KEY"]  # obrigatorio\n# FLASK_ENV = os.getenv("FLASK_ENV", "development")\n\n# === MAPEAMENTO DE PORTAS ===\n\n# Nginx na porta 8080 do host\ndocker run -d -p 8080:80 nginx\n\n# PostgreSQL acessivel do host\ndocker run -d -p 5432:5432 -e POSTGRES_PASSWORD=pass postgres:16\n\n# Ver portas mapeadas de um container\ndocker port meu-app',
        filename: 'variaveis-e-portas.sh',
        description:
          'Uso completo de variaveis de ambiente: com -e individual, com --env-file, verificacao dentro do container e leitura via os.getenv no Python. Inclui exemplos de mapeamento de portas.',
      },
    },
  ],
  challenges: [
    {
      id: 'docker-c4-volumes',
      title: 'PostgreSQL com Volume Persistente',
      description:
        'Escreva os comandos para: criar um volume chamado "pg-data", iniciar um container PostgreSQL 15 usando esse volume para persistir dados, com senha "postgres123", banco "escola" e usuario "admin", expondo a porta 5432.',
      language: 'bash',
      starterCode:
        '# Desafio: PostgreSQL com persistencia de dados\n\n# 1. Crie um volume Docker chamado "pg-data"\n\n\n# 2. Inicie um container PostgreSQL 15 com:\n#    - Nome: banco-escola\n#    - Volume pg-data montado em /var/lib/postgresql/data\n#    - Variavel POSTGRES_PASSWORD=postgres123\n#    - Variavel POSTGRES_DB=escola\n#    - Variavel POSTGRES_USER=admin\n#    - Porta 5432 do host mapeada para 5432 do container\n#    - Rodando em background\n\n\n# 3. Verifique que o container esta rodando\n\n\n# 4. Remova o container (os dados devem persistir no volume)\n\n\n# 5. Liste os volumes para confirmar que pg-data ainda existe\n\n',
      solution:
        '# Desafio: PostgreSQL com persistencia de dados\n\n# 1. Crie um volume Docker chamado "pg-data"\ndocker volume create pg-data\n\n# 2. Inicie um container PostgreSQL 15 com todas as configuracoes\ndocker run -d \\\n  --name banco-escola \\\n  -v pg-data:/var/lib/postgresql/data \\\n  -e POSTGRES_PASSWORD=postgres123 \\\n  -e POSTGRES_DB=escola \\\n  -e POSTGRES_USER=admin \\\n  -p 5432:5432 \\\n  postgres:15\n\n# 3. Verifique que o container esta rodando\ndocker ps\n\n# 4. Remova o container (os dados persistem no volume)\ndocker rm -f banco-escola\n\n# 5. Liste os volumes para confirmar que pg-data ainda existe\ndocker volume ls\n# DRIVER    VOLUME NAME\n# local     pg-data\n',
      hints: [
        'Use "docker volume create NOME" para criar o volume antes de usar — ou o Docker cria automaticamente no run',
        'Monte o volume com -v pg-data:/var/lib/postgresql/data — esse e o caminho padrao de dados do PostgreSQL',
        'As variaveis de ambiente do PostgreSQL sao POSTGRES_PASSWORD, POSTGRES_DB e POSTGRES_USER',
      ],
    },
  ],
};
