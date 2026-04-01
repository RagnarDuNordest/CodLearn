import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'criando-imagens-com-dockerfile',
  moduleId: 'docker',
  title: 'Criando Imagens com Dockerfile',
  description: 'Aprenda a criar suas proprias imagens Docker usando Dockerfile: instrucoes FROM, RUN, COPY, WORKDIR, EXPOSE, CMD e ENTRYPOINT',
  order: 2,
  estimatedMinutes: 35,
  sections: [
    {
      type: 'text',
      content:
        '## O que e um Dockerfile\n\nUm **Dockerfile** e um arquivo de texto com instrucoes para construir uma imagem Docker personalizada. Cada instrucao cria uma nova "camada" na imagem.\n\nPense no Dockerfile como uma receita: voce descreve passo a passo como preparar o ambiente da sua aplicacao, e o Docker segue essas instrucoes para criar uma imagem reproducivel.\n\n### Por que criar imagens proprias?\n\n- Empacotar sua aplicacao junto com todas as dependencias\n- Garantir que o ambiente de desenvolvimento = producao\n- Distribuir sua aplicacao facilmente (push para Docker Hub ou registry privado)\n- Automatizar builds em pipelines de CI/CD\n\n## As instrucoes essenciais\n\n### FROM — imagem base\nToda imagem comeca com uma imagem base. Voce raramente constroi do zero.\n\n```dockerfile\nFROM python:3.12-slim\n```\n\n### WORKDIR — diretorio de trabalho\nDefine o diretorio onde os proximos comandos serao executados dentro do container.\n\n```dockerfile\nWORKDIR /app\n```\n\n### COPY — copiar arquivos\nCopia arquivos do host para dentro da imagem.\n\n```dockerfile\nCOPY requirements.txt .\nCOPY . .\n```\n\n### RUN — executar comandos\nExecuta comandos durante o build. Cada RUN cria uma nova camada.\n\n```dockerfile\nRUN pip install --no-cache-dir -r requirements.txt\n```\n\n### EXPOSE — documentar porta\nDocumenta que o container escuta em determinada porta (nao abre a porta — apenas documenta).\n\n```dockerfile\nEXPOSE 5000\n```\n\n### CMD — comando padrao\nDefine o comando executado quando o container inicia. Pode ser sobrescrito no `docker run`.\n\n```dockerfile\nCMD ["python", "app.py"]\n```\n\n### ENTRYPOINT — ponto de entrada fixo\nSimilar ao CMD, mas nao pode ser facilmente sobrescrito. Use quando o container tem um proposito fixo.\n\n```dockerfile\nENTRYPOINT ["python", "app.py"]\n```',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Estrutura do projeto\n# minha-app/\n# ├── Dockerfile\n# ├── .dockerignore\n# ├── requirements.txt\n# └── app.py\n\n# === Conteudo do Dockerfile ===\ncat Dockerfile\n# FROM python:3.12-slim\n#\n# WORKDIR /app\n#\n# COPY requirements.txt .\n# RUN pip install --no-cache-dir -r requirements.txt\n#\n# COPY . .\n#\n# EXPOSE 5000\n#\n# CMD ["python", "app.py"]\n\n# === Build da imagem ===\n# Sintaxe: docker build -t NOME:TAG CONTEXTO\ndocker build -t minha-app:1.0 .\n\n# Build com tag adicional "latest"\ndocker build -t minha-app:1.0 -t minha-app:latest .\n\n# Ver a imagem criada\ndocker images minha-app\n\n# Rodar a imagem recem-criada\ndocker run -d --name app -p 5000:5000 minha-app:1.0\n\n# Verificar que esta rodando\ndocker ps\ncurl http://localhost:5000',
        filename: 'build-e-run.sh',
        description:
          'Fluxo completo de build: estrutura do projeto, conteudo do Dockerfile, build com tag versionada, listagem e execucao da imagem criada.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Boas praticas de Dockerfile: (1) Copie primeiro o requirements.txt e instale as dependencias ANTES de copiar o restante do codigo. Assim, se apenas o codigo mudar, o Docker reutiliza a camada de dependencias do cache, acelerando muito o build. (2) Use imagens "slim" ou "alpine" para reduzir o tamanho final. (3) Combine comandos RUN com && para reduzir o numero de camadas.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# === .dockerignore — o que NAO copiar para a imagem ===\n# Similar ao .gitignore. Evita copiar arquivos desnecessarios\n# que aumentam o tamanho da imagem e vazam segredos.\n\ncat .dockerignore\n# __pycache__/\n# *.pyc\n# *.pyo\n# .env\n# .git/\n# .gitignore\n# README.md\n# tests/\n# .pytest_cache/\n# venv/\n# .venv/\n# node_modules/\n\n# === Dockerfile otimizado com boas praticas ===\ncat Dockerfile\n# FROM python:3.12-slim\n#\n# # Variaveis de ambiente para Python nao criar .pyc e nao bufferizar output\n# ENV PYTHONDONTWRITEBYTECODE=1\n# ENV PYTHONUNBUFFERED=1\n#\n# WORKDIR /app\n#\n# # Copiar dependencias PRIMEIRO (cache eficiente)\n# COPY requirements.txt .\n# RUN pip install --no-cache-dir -r requirements.txt\n#\n# # Copiar codigo depois\n# COPY . .\n#\n# # Criar usuario nao-root por seguranca\n# RUN adduser --disabled-password --gecos "" appuser\n# USER appuser\n#\n# EXPOSE 5000\n#\n# CMD ["python", "app.py"]\n\n# Verificar tamanho das camadas\ndocker history minha-app:1.0',
        filename: 'dockerfile-otimizado.sh',
        description:
          'Dockerfile com boas praticas: .dockerignore para excluir arquivos desnecessarios, variaveis ENV para Python, ordem de COPY otimizada para cache e usuario nao-root por seguranca.',
      },
    },
  ],
  challenges: [
    {
      id: 'docker-c3-dockerfile',
      title: 'Crie um Dockerfile para Flask',
      description:
        'Crie um Dockerfile completo para uma aplicacao Flask simples. O arquivo app.py ja existe e usa a porta 8080. O arquivo requirements.txt contem apenas "flask". A imagem deve ser baseada em python:3.11-slim, ter um WORKDIR definido, instalar dependencias, copiar o codigo e iniciar o app.',
      language: 'bash',
      starterCode:
        '# Conteudo do app.py (nao edite, apenas referencia):\n# from flask import Flask\n# app = Flask(__name__)\n# @app.route("/")\n# def home():\n#     return "Hello from Docker!"\n# if __name__ == "__main__":\n#     app.run(host="0.0.0.0", port=8080)\n\n# Conteudo do requirements.txt:\n# flask\n\n# Escreva o Dockerfile abaixo:\n# (cada linha deve ser uma instrucao valida do Dockerfile)\n\n',
      solution:
        '# Conteudo do app.py (nao edite, apenas referencia):\n# from flask import Flask\n# app = Flask(__name__)\n# @app.route("/")\n# def home():\n#     return "Hello from Docker!"\n# if __name__ == "__main__":\n#     app.run(host="0.0.0.0", port=8080)\n\n# Conteudo do requirements.txt:\n# flask\n\n# Dockerfile:\nFROM python:3.11-slim\n\nENV PYTHONDONTWRITEBYTECODE=1\nENV PYTHONUNBUFFERED=1\n\nWORKDIR /app\n\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\nCOPY . .\n\nEXPOSE 8080\n\nCMD ["python", "app.py"]\n\n# Para buildar e rodar:\n# docker build -t flask-app:1.0 .\n# docker run -d --name flask-app -p 8080:8080 flask-app:1.0\n',
      hints: [
        'Comece sempre com FROM para definir a imagem base — use python:3.11-slim para manter a imagem pequena',
        'A ordem importa para o cache: copie requirements.txt e instale as dependencias ANTES de copiar o restante do codigo com "COPY . ."',
        'Use CMD com a forma de array JSON: CMD ["python", "app.py"] — essa forma e mais segura pois nao usa shell',
      ],
    },
  ],
};
