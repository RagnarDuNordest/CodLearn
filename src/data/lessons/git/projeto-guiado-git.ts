import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-guiado-git',
  moduleId: 'git',
  title: 'Projeto: Fluxo Completo de Feature',
  description:
    'Execute o fluxo profissional de desenvolvimento com Git: branch, commits, merge e pull request — exatamente como é feito em empresas de tecnologia.',
  order: 6,
  estimatedMinutes: 40,
  type: 'guided-project',
  sections: [],
  guidedProject: {
    id: 'gp-git',
    title: 'Feature Branch Workflow',
    language: 'bash',
    scenario:
      'Você entrou em um time de desenvolvimento. O projeto já tem um repositório Git. Sua tarefa é adicionar uma nova funcionalidade seguindo o fluxo padrão: criar branch, fazer commits e abrir pull request.',
    objective:
      'Executar o fluxo completo de Feature Branch: criar repositório, desenvolver em branch separada, fazer commits semânticos e fazer merge.',
    steps: [
      {
        id: 'gp-git-s1',
        title: 'Inicializar repositório e primeiro commit',
        description:
          'Crie um novo repositório, configure seu usuário, adicione um arquivo README.md e faça o primeiro commit.',
        starterCode:
          '# Etapa 1: Criar e configurar o repositorio\n\n# Crie uma pasta e entre nela\nmkdir meu-projeto && cd meu-projeto\n\n# Inicialize o repositorio Git\ngit init\n\n# Configure nome e email (apenas para este repo)\ngit config user.name "Seu Nome"\ngit config user.email "email@exemplo.com"\n\n# Crie o README.md\necho "# Meu Projeto" > README.md\necho "Projeto de exemplo para praticar Git." >> README.md\n\n# Adicione ao staging e faca o primeiro commit\n# git add README.md\n# git commit -m "inicial: adiciona README"\n',
        solution:
          'mkdir meu-projeto && cd meu-projeto\ngit init\ngit config user.name "Dev"\ngit config user.email "dev@exemplo.com"\necho "# Meu Projeto" > README.md\necho "Projeto de exemplo para praticar Git." >> README.md\ngit add README.md\ngit commit -m "inicial: adiciona README"',
        hints: [
          'git init cria o repositório na pasta atual.',
          'git add arquivo.txt adiciona ao staging area.',
          'git commit -m "mensagem" cria o commit.',
        ],
        testCases: [
          { description: 'git log deve mostrar 1 commit com a mensagem correta', inputs: [], expectedOutput: '' },
        ],
      },
      {
        id: 'gp-git-s2',
        title: 'Criar branch de feature e fazer commits',
        description:
          'Crie uma branch chamada "feature/login", adicione dois arquivos (login.html e login.js) com commits separados.',
        starterCode:
          '# Etapa 2: Branch de feature\n\n# Crie e entre na branch feature/login\ngit checkout -b feature/login\n\n# Crie login.html e faca um commit\necho "<form>Login</form>" > login.html\n# git add login.html && git commit -m "feat: adiciona HTML do formulario de login"\n\n# Crie login.js e faca outro commit\necho "// Logica de autenticacao" > login.js\n# git add login.js && git commit -m "feat: adiciona JavaScript do login"\n',
        solution:
          'git checkout -b feature/login\necho "<form>Login</form>" > login.html\ngit add login.html\ngit commit -m "feat: adiciona HTML do formulario de login"\necho "// Logica de autenticacao" > login.js\ngit add login.js\ngit commit -m "feat: adiciona JavaScript do login"',
        hints: [
          'git checkout -b nome cria e entra na nova branch.',
          'Faça um commit por arquivo para ter um histórico claro.',
          'Commits semânticos: feat: para novas funcionalidades, fix: para correções.',
        ],
        testCases: [
          { description: 'git log deve mostrar 2 commits na branch feature/login', inputs: [], expectedOutput: '' },
        ],
      },
      {
        id: 'gp-git-s3',
        title: 'Merge na main e resolver conflito',
        description:
          'Volte para a branch main, adicione uma alteração no README (para criar um conflito), depois faça o merge da feature/login e resolva o conflito.',
        starterCode:
          '# Etapa 3: Merge e conflito\n\n# Volte para main\ngit checkout main\n\n# Modifique o README na main (simulando outro dev)\necho "## Ultima atualizacao: $(date)" >> README.md\ngit add README.md\ngit commit -m "docs: atualiza README com data"\n\n# Faca o merge da feature/login\ngit merge feature/login\n\n# Se houver conflito:\n# 1. Abra o arquivo conflitante\n# 2. Edite manualmente (remova as marcacoes <<<< ==== >>>>)\n# 3. git add arquivo && git commit\n\n# Verifique o historico\ngit log --oneline\n',
        solution:
          'git checkout main\necho "## Ultima atualizacao" >> README.md\ngit add README.md\ngit commit -m "docs: atualiza README"\ngit merge feature/login\ngit log --oneline',
        hints: [
          'git merge branch une o histórico das duas branches.',
          'Em conflito: edite o arquivo, remova <<<<<< HEAD, ======, >>>>>> feature/login.',
          'git log --oneline --graph exibe o histórico de forma visual.',
        ],
        testCases: [
          { description: 'git log deve mostrar todos os commits das duas branches após o merge', inputs: [], expectedOutput: '' },
        ],
      },
    ],
  },
};
