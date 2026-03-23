import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-livre-git',
  moduleId: 'git',
  title: 'Projeto Livre: Publicar no GitHub',
  description:
    'Crie um repositório, desenvolva uma feature, resolva um conflito e publique no GitHub com pull request — o fluxo real de trabalho em equipe.',
  order: 7,
  estimatedMinutes: 35,
  type: 'free-project',
  sections: [],
  freeProject: {
    id: 'fp-git',
    title: 'Portfólio no GitHub com Feature Branch',
    language: 'bash',
    scenario:
      'Você vai criar um repositório de portfólio no GitHub. Você desenvolverá em branches separadas, usará pull requests para revisão e manterá o histórico limpo com commits semânticos.',
    objective:
      'Criar repositório local e remoto, desenvolver em branches, abrir pull request e manter um histórico de commits semântico.',
    requirements: [
      'Criar repositório local com git init e conectar ao GitHub com git remote add origin',
      'Trabalhar em uma branch feature/sobre-mim com pelo menos 2 commits',
      'Fazer push da branch: git push origin feature/sobre-mim',
      'Abrir Pull Request no GitHub da feature/sobre-mim para main',
      'Fazer merge via GitHub ou localmente e atualizar main com git pull',
    ],
    starterCode:
      '# Fluxo completo de publicacao no GitHub\n\n# 1. Inicializar e conectar ao GitHub\ngit init\ngit remote add origin https://github.com/seu-usuario/meu-portfolio.git\n\n# 2. Criar branch e adicionar conteudo\ngit checkout -b feature/sobre-mim\n# Crie e edite arquivos...\n\n# 3. Commits e push\n# git add . && git commit -m "feat: adiciona pagina sobre-mim"\n# git push origin feature/sobre-mim\n\n# 4. Abra o Pull Request no GitHub\n# URL: github.com/seu-usuario/meu-portfolio/compare/feature/sobre-mim\n\n# 5. Apos merge, atualize local\n# git checkout main && git pull origin main\n',
    solution:
      '# Fluxo profissional completo\ngit init\ngit config user.name "Seu Nome"\ngit config user.email "email@email.com"\necho "# Meu Portfolio" > README.md\ngit add README.md\ngit commit -m "inicial: cria repositorio"\ngit remote add origin https://github.com/usuario/portfolio.git\ngit push -u origin main\n\ngit checkout -b feature/sobre-mim\necho "<h1>Sobre Mim</h1>" > sobre.html\ngit add sobre.html\ngit commit -m "feat: adiciona pagina sobre mim"\necho "p { font-family: sans-serif; }" > styles.css\ngit add styles.css\ngit commit -m "style: adiciona CSS basico"\ngit push origin feature/sobre-mim\n# Abrir PR no GitHub e fazer merge\ngit checkout main\ngit pull origin main',
    hints: [
      'git remote add origin URL conecta ao repositório remoto.',
      'git push -u origin main faz o primeiro push e configura o tracking.',
      'git push origin feature/nome envia a branch para o GitHub.',
    ],
    testCases: [
      { description: 'Repositório deve ter main com pelo menos 1 commit e feature/sobre-mim com 2+ commits', inputs: [], expectedOutput: '' },
    ],
  },
};
