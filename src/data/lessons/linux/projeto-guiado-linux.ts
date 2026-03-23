import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-guiado-linux',
  moduleId: 'linux',
  title: 'Projeto: Script de Organização de Arquivos',
  description:
    'Crie um script Bash real para organizar arquivos por extensão automaticamente — o tipo de automação que devs usam todos os dias no trabalho.',
  order: 6,
  estimatedMinutes: 35,
  type: 'guided-project',
  sections: [],
  guidedProject: {
    id: 'gp-linux',
    title: 'Organizador Automático de Arquivos',
    language: 'bash',
    scenario:
      'Você é sysadmin e sua pasta de Downloads está uma bagunça. Você foi contratado para criar um script que organiza automaticamente arquivos por tipo: imagens, documentos, vídeos e outros.',
    objective:
      'Criar um script Bash que lê uma pasta, cria subpastas por tipo de arquivo e move cada arquivo para a pasta correta.',
    steps: [
      {
        id: 'gp-linux-s1',
        title: 'Criar estrutura de diretórios',
        description:
          'Escreva os comandos para criar a estrutura base: uma pasta "organizado/" com subpastas "imagens/", "documentos/", "videos/" e "outros/".',
        starterCode:
          '#!/bin/bash\n# Etapa 1: Criar estrutura de pastas\n\n# Crie a pasta principal "organizado"\nmkdir -p organizado\n\n# Crie as subpastas dentro de organizado\n# mkdir -p organizado/imagens\n# Crie: documentos, videos, outros\n\necho "Estrutura criada!"\n',
        solution:
          '#!/bin/bash\nmkdir -p organizado/imagens\nmkdir -p organizado/documentos\nmkdir -p organizado/videos\nmkdir -p organizado/outros\necho "Estrutura criada!"',
        hints: [
          'mkdir -p cria diretórios e subdiretórios de uma vez, sem erro se já existirem.',
          'Ou use: mkdir -p organizado/{imagens,documentos,videos,outros}',
        ],
        testCases: [
          { description: 'As 4 subpastas devem ser criadas dentro de organizado/', inputs: [], expectedOutput: '' },
        ],
      },
      {
        id: 'gp-linux-s2',
        title: 'Mover arquivos por extensão',
        description:
          'Escreva o script completo: percorra todos os arquivos da pasta atual com `for`, verifique a extensão com `case` e mova para a pasta correta.',
        starterCode:
          '#!/bin/bash\nmkdir -p organizado/{imagens,documentos,videos,outros}\n\n# Percorra todos os arquivos do diretorio atual\nfor arquivo in *; do\n    # Ignore se for um diretorio\n    if [ -d "$arquivo" ]; then continue; fi\n\n    # Obtenha a extensao\n    extensao="${arquivo##*.}"\n\n    # Use case para decidir onde mover\n    # imagens: jpg, jpeg, png, gif\n    # documentos: pdf, docx, txt, xlsx\n    # videos: mp4, avi, mkv\n    # outros: qualquer outro\ndone\n\necho "Organizacao concluida!"\n',
        solution:
          '#!/bin/bash\nmkdir -p organizado/{imagens,documentos,videos,outros}\nfor arquivo in *; do\n    if [ -d "$arquivo" ]; then continue; fi\n    extensao="${arquivo##*.}"\n    case "$extensao" in\n        jpg|jpeg|png|gif|bmp|svg)\n            mv "$arquivo" organizado/imagens/ ;;\n        pdf|docx|txt|xlsx|pptx|csv)\n            mv "$arquivo" organizado/documentos/ ;;\n        mp4|avi|mkv|mov|wmv)\n            mv "$arquivo" organizado/videos/ ;;\n        *)\n            mv "$arquivo" organizado/outros/ ;;\n    esac\ndone\necho "Organizacao concluida!"',
        hints: [
          '${arquivo##*.} extrai a extensão do arquivo (tudo após o último ponto).',
          'case "$extensao" in jpg|png) mv ... ;; esac',
          '[ -d "$arquivo" ] verifica se é diretório; continue pula para o próximo.',
        ],
        testCases: [
          { description: 'Arquivos .jpg vão para imagens/, .pdf para documentos/, .mp4 para videos/', inputs: [], expectedOutput: '' },
        ],
      },
      {
        id: 'gp-linux-s3',
        title: 'Gerar relatório de organização',
        description:
          'Adicione ao final do script um relatório que conta quantos arquivos foram movidos para cada pasta e salva o resultado em "relatorio.txt".',
        starterCode:
          '#!/bin/bash\n# (script completo das etapas anteriores)\nmkdir -p organizado/{imagens,documentos,videos,outros}\nfor arquivo in *; do\n    if [ -d "$arquivo" ]; then continue; fi\n    extensao="${arquivo##*.}"\n    case "$extensao" in\n        jpg|jpeg|png|gif) mv "$arquivo" organizado/imagens/ ;;\n        pdf|docx|txt|xlsx) mv "$arquivo" organizado/documentos/ ;;\n        mp4|avi|mkv) mv "$arquivo" organizado/videos/ ;;\n        *) mv "$arquivo" organizado/outros/ ;;\n    esac\ndone\n\n# Gere o relatorio\n# Use $(ls organizado/pasta | wc -l) para contar arquivos\n# Salve em relatorio.txt com >\n',
        solution:
          '#!/bin/bash\nmkdir -p organizado/{imagens,documentos,videos,outros}\nfor arquivo in *; do\n    if [ -d "$arquivo" ]; then continue; fi\n    extensao="${arquivo##*.}"\n    case "$extensao" in\n        jpg|jpeg|png|gif) mv "$arquivo" organizado/imagens/ ;;\n        pdf|docx|txt|xlsx) mv "$arquivo" organizado/documentos/ ;;\n        mp4|avi|mkv) mv "$arquivo" organizado/videos/ ;;\n        *) mv "$arquivo" organizado/outros/ ;;\n    esac\ndone\n\necho "=== Relatorio de Organizacao ===" > relatorio.txt\necho "Imagens:    $(ls organizado/imagens | wc -l) arquivo(s)" >> relatorio.txt\necho "Documentos: $(ls organizado/documentos | wc -l) arquivo(s)" >> relatorio.txt\necho "Videos:     $(ls organizado/videos | wc -l) arquivo(s)" >> relatorio.txt\necho "Outros:     $(ls organizado/outros | wc -l) arquivo(s)" >> relatorio.txt\n\ncat relatorio.txt\necho "Organizacao concluida!"',
        hints: [
          'ls pasta | wc -l conta o número de arquivos.',
          '> cria/sobrescreve o arquivo; >> acrescenta.',
          'cat relatorio.txt exibe o conteúdo no terminal.',
        ],
        testCases: [
          { description: 'relatorio.txt deve ser criado com contagem por tipo', inputs: [], expectedOutput: '' },
        ],
      },
    ],
  },
};
