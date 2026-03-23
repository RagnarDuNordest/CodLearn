import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-livre-linux',
  moduleId: 'linux',
  title: 'Projeto Livre: Script de Backup Automático',
  description:
    'Crie um script de backup completo com compressão, data no nome do arquivo e limpeza automática de backups antigos.',
  order: 7,
  estimatedMinutes: 30,
  type: 'free-project',
  sections: [],
  freeProject: {
    id: 'fp-linux',
    title: 'Script de Backup com Rotação',
    language: 'bash',
    scenario:
      'Você é o sysadmin de uma startup. Toda noite o script de backup precisa copiar a pasta de projetos, comprimir em .tar.gz com a data no nome, e deletar backups com mais de 7 dias.',
    objective:
      'Criar um script Bash de backup que copia, comprime, nomeia com data e limpa backups antigos automaticamente.',
    requirements: [
      'Definir variáveis: ORIGEM (pasta a fazer backup) e DESTINO (pasta de backups)',
      'Criar nome do arquivo com data: backup_$(date +%Y%m%d).tar.gz',
      'Criar o backup com: tar -czf $DESTINO/$NOME $ORIGEM',
      'Deletar backups mais antigos que 7 dias: find $DESTINO -name "backup_*.tar.gz" -mtime +7 -delete',
      'Exibir mensagem de sucesso com o tamanho do backup criado',
    ],
    starterCode:
      '#!/bin/bash\n# Script de Backup com Rotacao\n\nORIGEM="/home/usuario/projetos"\nDESTINO="/home/usuario/backups"\n\n# Crie a pasta de destino se nao existir\n\n# Defina o nome do arquivo com a data atual\n\n# Crie o backup com tar\n\n# Delete backups antigos (mais de 7 dias)\n\n# Exiba o tamanho do backup criado com du -sh\n',
    solution:
      '#!/bin/bash\nORIGEM="/home/usuario/projetos"\nDESTINO="/home/usuario/backups"\nmkdir -p "$DESTINO"\nNOME="backup_$(date +%Y%m%d).tar.gz"\ntar -czf "$DESTINO/$NOME" "$ORIGEM"\nfind "$DESTINO" -name "backup_*.tar.gz" -mtime +7 -delete\necho "Backup criado: $NOME"\ndu -sh "$DESTINO/$NOME"',
    hints: [
      'date +%Y%m%d retorna a data no formato 20240115.',
      'tar -czf arquivo.tar.gz pasta/ comprime a pasta.',
      'find pasta -mtime +7 -delete remove arquivos mais antigos que 7 dias.',
      'du -sh arquivo exibe o tamanho em formato legível.',
    ],
    testCases: [
      { description: 'Script deve criar backup .tar.gz com data no nome e limpar antigos', inputs: [], expectedOutput: '' },
    ],
  },
};
