import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'primeiros-passos-com-docker',
  moduleId: 'docker',
  title: 'Primeiros Passos com Docker',
  description: 'Aprenda os comandos essenciais do Docker: run, pull, ps, images, stop, rm e como rodar containers interativos',
  order: 1,
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content:
        '## Os comandos essenciais do Docker\n\nO Docker e operado principalmente pela linha de comando. Dominar um conjunto pequeno de comandos cobre 90% do uso diario.\n\n### docker run\n\nO comando mais importante. Ele cria e inicia um container a partir de uma imagem:\n\n```bash\ndocker run <imagem>\n```\n\nSe a imagem nao existir localmente, o Docker automaticamente faz o pull do Docker Hub antes de criar o container.\n\n**Flags essenciais do docker run:**\n\n| Flag | Significado | Exemplo |\n|------|-------------|--------|\n| `-d` | Detached — roda em background | `docker run -d nginx` |\n| `-it` | Interativo + TTY — terminal interativo | `docker run -it ubuntu bash` |\n| `--name` | Da um nome ao container | `docker run --name meu-nginx nginx` |\n| `-p` | Mapeia portas host:container | `docker run -p 8080:80 nginx` |\n| `--rm` | Remove container ao terminar | `docker run --rm python:3.12 python -c "print(1)"` |\n| `-e` | Define variavel de ambiente | `docker run -e DEBUG=true myapp` |',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# === CICLO DE VIDA DE UM CONTAINER ===\n\n# 1. Rodar container em background (-d = detached)\ndocker run -d --name meu-nginx -p 8080:80 nginx\n# Saida: a3f8b2c1d4e5... (ID do container)\n\n# 2. Listar containers EM EXECUCAO\ndocker ps\n# CONTAINER ID   IMAGE   COMMAND   CREATED   STATUS   PORTS                  NAMES\n# a3f8b2c1d4e5   nginx   ...       5s ago    Up 5s    0.0.0.0:8080->80/tcp   meu-nginx\n\n# 3. Listar TODOS os containers (incluindo parados)\ndocker ps -a\n\n# 4. Parar o container (envia SIGTERM, aguarda, depois SIGKILL)\ndocker stop meu-nginx\n\n# 5. Iniciar um container parado\ndocker start meu-nginx\n\n# 6. Remover o container (precisa estar parado)\ndocker rm meu-nginx\n\n# Parar e remover em um comando so\ndocker rm -f meu-nginx\n\n# === GERENCIAR IMAGENS ===\n\n# Listar imagens locais\ndocker images\n\n# Remover uma imagem\ndocker rmi nginx\n\n# Baixar imagem sem criar container\ndocker pull ubuntu:22.04',
        filename: 'comandos-essenciais.sh',
        description:
          'Ciclo completo de vida de um container: criacao, listagem, parada, reinicio e remocao. Note a diferenca entre "docker ps" (so containers rodando) e "docker ps -a" (todos os containers).',
      },
    },
    {
      type: 'text',
      content:
        '## Containers interativos\n\nNem sempre voce quer que o container rode em background. Muitas vezes voce precisa de um terminal dentro do container para explorar, depurar ou executar comandos manualmente.\n\n### A combinacao -it\n\n- `-i` (interactive): mantem o STDIN aberto\n- `-t` (tty): aloca um pseudo-terminal\n\nJuntos, criam uma sessao de terminal interativa dentro do container.\n\n### Executar comando em container ja rodando\n\nCom `docker exec` voce pode executar comandos adicionais em um container que ja esta rodando:\n\n```bash\n# Abrir terminal em container ja rodando\ndocker exec -it meu-nginx bash\n\n# Executar comando pontual\ndocker exec meu-nginx nginx -v\n```\n\n### Ver logs de um container\n\n```bash\n# Ver logs do container\ndocker logs meu-nginx\n\n# Seguir logs em tempo real (como tail -f)\ndocker logs -f meu-nginx\n```\n\n### Inspecionar um container\n\n```bash\n# Ver detalhes completos em JSON\ndocker inspect meu-nginx\n\n# Ver uso de recursos em tempo real\ndocker stats\n```',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# === CONTAINERS INTERATIVOS ===\n\n# Rodar Ubuntu interativamente e abrir bash\ndocker run -it ubuntu:22.04 bash\n# Agora voce esta DENTRO do container\n# root@a3f8b2c1:/#\n\n# Dentro do container voce pode:\napt-get update\napt-get install -y curl\ncurl https://example.com\nexit  # sai e para o container\n\n# Rodar Python interativamente (REPL)\ndocker run -it python:3.12-slim python\n# Python 3.12.x ...\n# >>> print("Hello from container!")\n# Hello from container!\n# >>> exit()\n\n# Rodar container, abrir shell, e REMOVER ao sair (--rm)\ndocker run --rm -it alpine:latest sh\n# / # ls\n# / # cat /etc/os-release\n# / # exit\n# Container removido automaticamente\n\n# === EXECUTAR EM CONTAINER JA RODANDO ===\n\n# Primeiro inicie um container em background\ndocker run -d --name app nginx\n\n# Abra um shell nele sem para-lo\ndocker exec -it app bash\n# root@a3f8b2c1:/# cat /etc/nginx/nginx.conf\n# root@a3f8b2c1:/# exit\n\n# O container continua rodando mesmo apos o exec terminar\ndocker ps  # app ainda aparece como "Up"',
        filename: 'containers-interativos.sh',
        description:
          'Exemplos de uso interativo: shell dentro de Ubuntu, REPL do Python, Alpine com remocao automatica e exec em container em execucao. O container so para quando o processo principal termina.',
      },
    },
  ],
  challenges: [
    {
      id: 'docker-c2-comandos',
      title: 'Gerenciando o Ciclo de Vida',
      description:
        'Escreva a sequencia de comandos Docker para: iniciar um container Nginx em background na porta 9090, verificar que esta rodando, ver seus logs, e depois para-lo e remove-lo.',
      language: 'bash',
      starterCode:
        '# Desafio: gerencie o ciclo de vida completo de um container Nginx\n\n# 1. Inicie um container Nginx em background, com nome "web-server",\n#    mapeando a porta 9090 do host para a porta 80 do container\n\n\n# 2. Verifique que o container esta em execucao\n\n\n# 3. Veja os logs do container\n\n\n# 4. Execute o comando "nginx -v" dentro do container sem para-lo\n\n\n# 5. Pare e remova o container em um unico comando\n\n',
      solution:
        '# Desafio: gerencie o ciclo de vida completo de um container Nginx\n\n# 1. Inicie um container Nginx em background, com nome "web-server",\n#    mapeando a porta 9090 do host para a porta 80 do container\ndocker run -d --name web-server -p 9090:80 nginx\n\n# 2. Verifique que o container esta em execucao\ndocker ps\n\n# 3. Veja os logs do container\ndocker logs web-server\n\n# 4. Execute o comando "nginx -v" dentro do container sem para-lo\ndocker exec web-server nginx -v\n\n# 5. Pare e remova o container em um unico comando\ndocker rm -f web-server\n',
      hints: [
        'Para mapear portas use -p PORTA_HOST:PORTA_CONTAINER — a porta do host vem primeiro',
        '"docker logs NOME" mostra os logs; adicione -f para seguir em tempo real como "tail -f"',
        '"docker rm -f" force-remove o container mesmo que esteja rodando — equivale a "stop" + "rm" em um comando',
      ],
    },
    {
      id: 'docker-c2-interativo',
      title: 'Explorando um Container',
      description:
        'Escreva o comando para rodar um container Python 3.11 interativamente, que seja removido automaticamente ao sair, e dentro dele execute um script Python que imprime os numeros de 1 a 5.',
      language: 'bash',
      starterCode:
        '# Desafio: rode Python interativamente em um container descartavel\n\n# Comando para rodar container Python 3.11-slim interativo e descartavel:\n\n\n# Dentro do container, o script Python a executar:\n# for i in range(1, 6):\n#     print(i)\n\n# Dica: voce pode passar o script direto com: python -c "codigo aqui"\n# Neste caso nao precisa de -it, apenas --rm\n',
      solution:
        '# Desafio: rode Python interativamente em um container descartavel\n\n# Versao 1: passando o script direto pelo -c (sem terminal interativo)\ndocker run --rm python:3.11-slim python -c "for i in range(1, 6): print(i)"\n\n# Versao 2: abrindo terminal interativo e executando la dentro\ndocker run --rm -it python:3.11-slim python\n# Dentro do REPL:\n# >>> for i in range(1, 6):\n# ...     print(i)\n# ...\n# 1\n# 2\n# 3\n# 4\n# 5\n',
      hints: [
        'Use --rm para que o container seja removido automaticamente apos terminar',
        'Para passar codigo Python diretamente sem abrir o REPL, use: python -c "seu codigo"',
        'Para abrir o REPL interativo do Python dentro do container, use as flags -it antes do nome da imagem',
      ],
    },
  ],
};
