import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'permissoes-e-usuarios',
  moduleId: 'linux',
  title: 'Permissoes e Usuarios',
  description:
    'Entenda o sistema de permissoes do Linux, como controlar quem pode ler, escrever e executar arquivos, e como funcionam usuarios e grupos.',
  order: 3,
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        'Imagine um predio com diferentes niveis de acesso: visitantes so entram no lobby, funcionarios acessam os andares, e o gerente tem a chave de tudo. Permissoes no Linux funcionam assim — cada arquivo e pasta tem regras sobre quem pode ver, modificar ou executar.\n\nO Linux e um sistema **multiusuario**, ou seja, varias pessoas podem usar o mesmo computador, cada uma com suas proprias configuracoes e arquivos. Para manter tudo organizado e seguro, o Linux possui um sistema de **permissoes** que controla quem pode fazer o que com cada arquivo e diretorio.\n\nQuando voce executa `ls -l`, a primeira coluna mostra as permissoes. Parece confuso no inicio, mas e mais simples do que parece:\n\n```\n-rwxr-xr--  1 usuario grupo  4096 jan 15 10:30 script.sh\n```\n\nO primeiro caractere indica o tipo (`-` para arquivo, `d` para diretorio). Os proximos 9 caracteres sao divididos em tres grupos de tres:\n\n- **rwx** (posicoes 2-4) — Permissoes do **dono** do arquivo\n- **r-x** (posicoes 5-7) — Permissoes do **grupo**\n- **r--** (posicoes 8-10) — Permissoes de **outros** (todos os demais)\n\nOnde: **r** = leitura (read), **w** = escrita (write), **x** = execucao (execute), **-** = sem permissao.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Ver permissoes detalhadas dos arquivos\nls -l\n\n# Descobrir quem voce e\nwhoami\n\n# Ver seu usuario, UID e grupos\nid\n\n# Ver apenas os grupos do usuario atual\ngroups',
        filename: 'permissoes-basico.sh',
        description:
          'Comandos para verificar permissoes e identidade do usuario no sistema.',
      },
    },
    {
      type: 'text',
      content:
        '## Alterando Permissoes com chmod\n\nO comando **chmod** (change mode) altera as permissoes de arquivos e diretorios. Existem duas formas de usa-lo:\n\n**Modo simbolico** — Usa letras para indicar quem e qual permissao:\n- `u` (user/dono), `g` (group/grupo), `o` (others/outros), `a` (all/todos)\n- `+` (adicionar), `-` (remover), `=` (definir exatamente)\n\n**Modo numerico** — Cada permissao tem um valor numerico:\n- **r = 4**, **w = 2**, **x = 1**\n- Some os valores para cada grupo. Exemplo: `rwx = 4+2+1 = 7`, `r-x = 4+0+1 = 5`, `r-- = 4+0+0 = 4`\n- Tres digitos representam dono, grupo e outros: `chmod 755 arquivo`',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Modo simbolico\nchmod u+x script.sh          # dar permissao de execucao ao dono\nchmod g+rw arquivo.txt       # dar leitura e escrita ao grupo\nchmod o-rwx privado.txt      # remover todas as permissoes de outros\nchmod a+r publico.txt        # dar leitura para todos\n\n# Modo numerico\nchmod 755 script.sh          # rwxr-xr-x (dono tudo, grupo e outros leem e executam)\nchmod 644 arquivo.txt        # rw-r--r-- (dono le e escreve, resto so le)\nchmod 700 privado.txt        # rwx------ (so o dono tem acesso)\nchmod 600 segredo.txt        # rw------- (dono le e escreve, ninguem mais)\n\n# Alterar o dono de um arquivo\nchown usuario arquivo.txt\n\n# Alterar dono e grupo\nchown usuario:grupo arquivo.txt\n\n# Alterar recursivamente (todos os arquivos dentro)\nchown -R usuario:grupo pasta/',
        filename: 'chmod-chown.sh',
        description:
          'Exemplos praticos de chmod (modo simbolico e numerico) e chown para gerenciar permissoes.',
      },
    },
    {
      type: 'text',
      content:
        '## Superusuario: sudo e su\n\nAlgumas acoes no Linux exigem privilegios de administrador (tambem chamado de **root**). Para executar comandos como root, usamos:\n\n- **sudo** — Executa um unico comando como superusuario. Pede sua senha para confirmar.\n- **su** — Troca para outro usuario. Sem argumentos, troca para root.\n\nO sudo e a forma mais segura porque voce executa apenas um comando por vez como root, em vez de ficar logado como administrador o tempo todo.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Executar um comando como superusuario\nsudo apt update\n\n# Editar um arquivo do sistema que exige permissao\nsudo nano /etc/hosts\n\n# Trocar para o usuario root\nsu\n\n# Trocar para outro usuario especifico\nsu outro-usuario\n\n# Saber quem voce e no momento\nwhoami',
        filename: 'sudo-su.sh',
        description:
          'O sudo permite executar comandos com privilegios de administrador de forma segura.',
      },
    },
    {
      type: 'callout',
      content:
        'Evite usar sudo sem necessidade. Executar comandos como root pode causar danos ao sistema se algo der errado. Sempre tente executar o comando sem sudo primeiro. Se receber "Permission denied", ai sim use sudo.',
      calloutType: 'warning',
    },
    {
      type: 'text',
      content:
        '## Gerenciando Usuarios e Grupos\n\nEm sistemas Linux multiusuario, o administrador pode criar e gerenciar contas. Os principais comandos de gerenciamento de usuarios sao:\n\n- **`adduser nome`** — Cria um novo usuario interativamente (com senha, home, etc.)\n- **`usermod -aG grupo usuario`** — Adiciona usuario a um grupo existente (`-a` = append, `-G` = grupos)\n- **`groups usuario`** — Lista todos os grupos de um usuario\n- **`passwd usuario`** — Altera a senha de um usuario\n- **`userdel usuario`** — Remove um usuario do sistema\n\nGrupos sao usados para dar permissoes compartilhadas. Por exemplo, o grupo `sudo` permite que o usuario execute comandos como root.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        filename: 'usuarios-grupos.sh',
        code: '# Ver todos os usuarios do sistema\ncat /etc/passwd\n\n# Ver todos os grupos\ncat /etc/group\n\n# Ver os grupos do usuario atual\ngroups\n\n# Ver grupos de outro usuario\ngroups joao\n\n# Adicionar usuario ao grupo docker (exige sudo)\nsudo usermod -aG docker $USER\n# IMPORTANTE: voce precisa fazer logout e login novamente\n# para as mudancas de grupo terem efeito!\n\n# Criar um novo usuario\nsudo adduser novousuario\n\n# Mudar senha de um usuario\nsudo passwd novousuario\n\n# Ver informacoes de um usuario\nid joao\n# uid=1001(joao) gid=1001(joao) groups=1001(joao),27(sudo)',
        description:
          'Gerenciando usuarios e grupos no Linux: adduser, usermod, groups e passwd.',
      },
    },
    {
      type: 'callout',
      content:
        'O comando `sudo usermod -aG docker $USER` e muito comum no dia a dia do desenvolvedor — ele adiciona seu usuario ao grupo docker para que voce possa usar o Docker sem precisar de sudo em cada comando. Lembre-se de fazer logout e login novamente para as mudancas terem efeito.',
      calloutType: 'tip',
    },
  ],
  challenges: [
    {
      id: 'pu-c1',
      title: 'Configurando permissoes de um script',
      description:
        'Voce criou um arquivo chamado "deploy.sh" e precisa configurar as permissoes para que: o dono possa ler, escrever e executar; o grupo possa ler e executar; e outros nao tenham nenhuma permissao. Use o modo numerico do chmod.',
      language: 'bash',
      starterCode: '# Configure as permissoes de deploy.sh usando chmod numerico\n# Dono: rwx (7), Grupo: r-x (5), Outros: --- (0)\n',
      solution: 'chmod 750 deploy.sh',
      hints: [
        'No modo numerico, r=4, w=2, x=1. Some para cada grupo.',
        'Dono rwx = 4+2+1 = 7, Grupo r-x = 4+0+1 = 5, Outros --- = 0.',
        'O comando fica: chmod 750 deploy.sh.',
      ],
    },
    {
      id: 'pu-c2',
      title: 'Protegendo um arquivo privado',
      description:
        'Voce tem um arquivo "senhas.txt" que so voce deve poder ler e escrever. Ninguem mais deve ter qualquer permissao. Depois, verifique as permissoes com ls -l.',
      language: 'bash',
      starterCode: '# 1. Configure senhas.txt para que so o dono possa ler e escrever\n\n# 2. Verifique as permissoes\n',
      solution: 'chmod 600 senhas.txt\nls -l senhas.txt',
      hints: [
        'rw para o dono e 6 (4+2), sem permissao para grupo e outros e 0.',
        'O comando numerico e chmod 600 senhas.txt.',
        'Use ls -l para confirmar que as permissoes estao como rw-------.',
      ],
    },
  ],
};
