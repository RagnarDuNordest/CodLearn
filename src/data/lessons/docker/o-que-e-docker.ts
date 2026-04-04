import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'o-que-e-docker',
  moduleId: 'docker',
  title: 'O que e Docker',
  description: 'Entenda o que sao containers, como Docker surgiu, a diferenca entre imagens e containers, e como o Docker Hub funciona',
  order: 0,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        '## O problema que o Docker resolve\n\nVoce ja ouviu a frase "na minha maquina funciona"? Esse e exatamente o problema que o Docker foi criado para resolver.\n\nAnte do Docker, implantar uma aplicacao significava:\n- Instalar manualmente todas as dependencias no servidor\n- Rezar para que as versoes fossem compativeis\n- Lidar com conflitos entre aplicacoes rodando no mesmo servidor\n- Gastar horas configurando ambientes de producao identicos ao de desenvolvimento\n\n### O que e um container?\n\nUm **container** e um pacote isolado que contem tudo o que uma aplicacao precisa para rodar:\n- O codigo da aplicacao\n- O interpretador ou runtime (Python, Node, Java)\n- As bibliotecas e dependencias\n- Variaveis de ambiente e configuracoes\n\nContainers compartilham o kernel do sistema operacional do host, mas ficam completamente isolados uns dos outros. Isso os torna extremamente leves e rapidos.',
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'Docker nao inventou os containers — a tecnologia de isolamento (namespaces e cgroups do Linux) ja existia desde 2008. O que o Docker fez foi criar uma interface amigavel e um ecossistema completo que tornou containers acessiveis a qualquer desenvolvedor.',
    },
    {
      type: 'text',
      content:
        '## Containers vs Maquinas Virtuais\n\nContainers e VMs resolvem problemas similares, mas de formas bem diferentes:\n\n### Maquina Virtual (VM)\n- Emula hardware completo\n- Contem um sistema operacional inteiro (kernel + userspace)\n- Ocupa varios GB de disco\n- Demora minutos para iniciar\n- Isolamento total: cada VM tem seu proprio kernel\n\n### Container\n- Compartilha o kernel do host\n- Contem apenas a aplicacao e suas dependencias\n- Ocupa dezenas a centenas de MB\n- Inicia em milissegundos a segundos\n- Isolamento via namespaces e cgroups do Linux\n\n**Quando usar VMs:** quando voce precisa rodar sistemas operacionais diferentes (Windows em host Linux, por exemplo) ou precisa de isolamento total de kernel.\n\n**Quando usar containers:** para a grande maioria das aplicacoes modernas — microservicos, APIs, workers, bancos de dados.\n\n## Imagens vs Containers\n\nEssa e uma das confusoes mais comuns para quem esta comeando:\n\n- **Imagem Docker**: e o "molde" — um arquivo somente-leitura que define como o container vai ser. Pense como a receita de um bolo.\n- **Container**: e uma instancia em execucao de uma imagem — o bolo ja assado. Voce pode criar varios containers a partir da mesma imagem.\n\nUma imagem pode gerar N containers simultaneos. Cada container e independente e tem seu proprio estado.\n\n## Docker Hub\n\nO **Docker Hub** (hub.docker.com) e o repositorio publico oficial de imagens Docker. La voce encontra:\n\n- **Imagens oficiais**: `python`, `node`, `nginx`, `postgres`, `redis`, `mysql` — mantidas pelas proprias organizacoes\n- **Imagens da comunidade**: qualquer desenvolvedor pode publicar suas imagens\n- **Imagens privadas**: para uso interno em empresas\n\nAlguns exemplos de imagens oficiais populares:\n- `python:3.12-slim` — Python 3.12 minimalista\n- `nginx:alpine` — servidor web Nginx baseado em Alpine Linux\n- `postgres:16` — PostgreSQL versao 16\n- `node:20-alpine` — Node.js 20 em Alpine Linux',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Baixar uma imagem do Docker Hub (sem criar container)\ndocker pull python:3.12-slim\n\n# Verificar imagens baixadas localmente\ndocker images\n\n# Saida esperada:\n# REPOSITORY   TAG         IMAGE ID       CREATED        SIZE\n# python       3.12-slim   a1b2c3d4e5f6   2 weeks ago    130MB\n\n# Rodar um container a partir da imagem\ndocker run python:3.12-slim python --version\n# Saida: Python 3.12.x\n\n# Cada "docker run" cria um NOVO container\n# A imagem continua intacta — e apenas o molde',
        filename: 'primeiros-comandos.sh',
        description:
          'Demonstracao do fluxo basico: baixar imagem, listar imagens locais e criar um container. Note que a imagem fica armazenada localmente apos o pull e pode ser reutilizada.',
      },
    },
  ],
  challenges: [
    {
      id: 'docker-c1-conceitos',
      title: 'Identificando Componentes Docker',
      description:
        'Complete os comandos bash para explorar os conceitos basicos do Docker: baixe a imagem oficial do Python, liste as imagens disponíveis localmente e rode um container que imprime a versao do Python.',
      language: 'bash',
      starterCode:
        '# Desafio: complete os comandos para explorar o Docker\n\n# 1. Baixe a imagem python:3.11-slim do Docker Hub\n# docker ______ python:3.11-slim\n\n# 2. Liste todas as imagens disponiveis localmente\n# docker ______\n\n# 3. Crie um container que execute "python --version" e depois seja removido automaticamente\n# docker run ______ python:3.11-slim python --version\n\n# 4. Quantos containers foram criados com os comandos acima?\n# Resposta nos comentarios: ______\n',
      solution:
        '# Desafio: complete os comandos para explorar o Docker\n\n# 1. Baixe a imagem python:3.11-slim do Docker Hub\ndocker pull python:3.11-slim\n\n# 2. Liste todas as imagens disponiveis localmente\ndocker images\n\n# 3. Crie um container que execute "python --version" e depois seja removido automaticamente\ndocker run --rm python:3.11-slim python --version\n\n# 4. Quantos containers foram criados com os comandos acima?\n# Resposta: 1 container (o docker pull nao cria containers, apenas baixa a imagem)\n# Com --rm o container e removido automaticamente apos terminar\n',
      hints: [
        'O comando para baixar imagens e "docker pull" — ele apenas faz o download, nao cria nenhum container',
        'Para listar imagens locais use "docker images" — voce vera repositorio, tag, ID, data e tamanho',
        'A flag "--rm" no "docker run" faz o container ser removido automaticamente apos terminar — util para testes rapidos',
      ],
    },
  ],
};
