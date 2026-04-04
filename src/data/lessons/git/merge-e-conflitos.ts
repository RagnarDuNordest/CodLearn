import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'merge-e-conflitos',
  moduleId: 'git',
  title: 'Merge e Conflitos',
  description:
    'Aprenda como unir branches com git merge, entenda a diferenca entre fast-forward e merge commit, e saiba como resolver conflitos de merge.',
  order: 2,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        'Depois de testar o final alternativo e gostar dele, voce decide juntar com a versao principal. Isso e um merge! Mas e se duas pessoas editaram o mesmo trecho? Ai temos um conflito.\n\n## O que e Merge?\n\nO **merge** (mesclagem) e o processo de unir o historico de duas branches. Quando voce termina o trabalho em uma branch de feature, voce faz merge dela na branch principal (main) para incorporar as mudancas.\n\nO Git oferece diferentes estrategias de merge dependendo do historico dos commits:\n\n- **Fast-forward**: quando a branch main nao teve novos commits desde que a feature foi criada. O Git simplesmente avanca o ponteiro da main.\n- **Merge commit**: quando ambas as branches tiveram novos commits. O Git cria um commit especial que une as duas linhas de desenvolvimento.\n\nPara fazer merge, voce primeiro vai para a branch de destino (geralmente main) e entao executa o merge da branch que deseja incorporar.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# ====================================\n# FAST-FORWARD MERGE\n# ====================================\n# Situacao: main nao teve commits novos\n#\n# ANTES:\n# main:     A --- B\n#                  \\\n# feature:          C --- D\n#\n# DEPOIS do merge:\n# main:     A --- B --- C --- D\n\n# 1. Voltar para main\ngit switch main\n\n# 2. Fazer merge da feature\ngit merge feature-login\n# Saida: Fast-forward\n#        2 files changed, 50 insertions(+)\n\n# ====================================\n# MERGE COMMIT (three-way merge)\n# ====================================\n# Situacao: ambas as branches tiveram commits\n#\n# ANTES:\n# main:     A --- B --- E\n#                  \\\n# feature:          C --- D\n#\n# DEPOIS do merge:\n# main:     A --- B --- E --- F (merge commit)\n#                  \\         /\n# feature:          C --- D\n\ngit switch main\ngit merge feature-cadastro\n# O Git abre o editor para a mensagem do merge commit\n# Ou use: git merge feature-cadastro -m "Merge feature-cadastro na main"',
        filename: 'merge-tipos.sh',
        description:
          'O fast-forward acontece quando nao ha divergencia entre as branches. O merge commit e criado quando ambas as branches evoluiram independentemente.',
      },
    },
    {
      type: 'text',
      content:
        '## Conflitos de Merge\n\nUm **conflito** acontece quando duas branches modificam a **mesma parte do mesmo arquivo** de formas diferentes. O Git nao sabe qual versao manter, entao ele marca o arquivo com indicadores especiais e pede para voce decidir.\n\nOs marcadores de conflito sao:\n\n```\n<<<<<<< HEAD\n(seu codigo na branch atual)\n=======\n(codigo da branch que esta sendo mergeada)\n>>>>>>> nome-da-branch\n```\n\n- Tudo entre `<<<<<<< HEAD` e `=======` e o codigo da sua branch atual\n- Tudo entre `=======` e `>>>>>>> nome-da-branch` e o codigo da outra branch\n\nPara resolver o conflito, voce deve:\n1. Abrir o arquivo com conflito\n2. Escolher qual versao manter (ou combinar as duas)\n3. Remover os marcadores `<<<<<<<`, `=======` e `>>>>>>>`\n4. Salvar o arquivo, adicionar com `git add` e fazer commit',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# ====================================\n# RESOLVENDO UM CONFLITO DE MERGE\n# ====================================\n\n# 1. Tentar fazer merge\ngit switch main\ngit merge feature-desconto\n# CONFLICT (content): Merge conflict in preco.js\n# Automatic merge failed; fix conflicts and then commit the result.\n\n# 2. Ver quais arquivos tem conflito\ngit status\n# Unmerged paths:\n#   both modified: preco.js\n\n# 3. Abrir o arquivo e ver o conflito\n# O arquivo preco.js tera algo assim:\n#\n# function calcularDesconto(preco) {\n# <<<<<<< HEAD\n#     return preco * 0.10;\n# =======\n#     return preco * 0.15;\n# >>>>>>> feature-desconto\n# }\n\n# 4. Editar o arquivo: escolher uma versao ou combinar\n# Resultado final (sem marcadores):\n#\n# function calcularDesconto(preco) {\n#     return preco * 0.15;\n# }\n\n# 5. Marcar como resolvido e commitar\ngit add preco.js\ngit commit -m "Resolve conflito: usa desconto de 15%"\n\n# ====================================\n# CANCELAR UM MERGE COM CONFLITO\n# ====================================\n\n# Se voce quiser desistir do merge e voltar ao estado anterior:\ngit merge --abort',
        filename: 'conflitos.sh',
        description:
          'Quando um conflito ocorre, o Git marca o arquivo com indicadores especiais. Voce deve editar manualmente, remover os marcadores e commitar o resultado.',
      },
    },
    {
      type: 'callout',
      content:
        'Boas praticas para evitar conflitos: faca commits pequenos e frequentes, mantenha suas branches atualizadas com a main (git merge main na sua branch regularmente), comunique-se com a equipe sobre quais arquivos estao sendo modificados, e evite branches de longa duracao.',
      calloutType: 'tip',
    },
    {
      type: 'callout',
      content:
        'Git parece complicado no inicio, mas depois que voce pega o jeito, nao consegue mais viver sem!',
      calloutType: 'tip',
    },
    {
      type: 'text',
      content:
        '## Como resolver conflitos passo a passo\n\nConflitos acontecem quando duas pessoas editam a mesma linha do mesmo arquivo. Git nao sabe qual versao manter — voce decide. O processo e simples:\n\n1. Rode `git merge branch-nome` e veja o erro de conflito\n2. Abra os arquivos com conflito (Git marca com `<<<<<<<`)\n3. Edite o arquivo deixando apenas o codigo correto\n4. Remova os marcadores `<<<<<<<`, `=======`, `>>>>>>>`\n5. Rode `git add arquivo-resolvido`\n6. Rode `git commit` para finalizar o merge',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        filename: 'resolver_conflito.sh',
        code: `# Situacao: voce esta na branch main e quer fazer merge de feature
git merge feature/nova-funcao
# CONFLICT (content): Merge conflict in app.py
# Automatic merge failed; fix conflicts and then commit the result.

# O arquivo app.py agora tem marcadores:
# <<<<<<< HEAD (sua versao atual)
# def calcular(x, y):
#     return x + y
# =======
# def calcular(a, b, operacao='soma'):
#     if operacao == 'soma':
#         return a + b
# >>>>>>> feature/nova-funcao

# Edite o arquivo e mantenha o que voce quer:
# def calcular(a, b, operacao='soma'):
#     if operacao == 'soma':
#         return a + b
# (remova os marcadores <<<<, ====, >>>>)

# Depois de editar:
git add app.py
git commit -m "merge: resolve conflito em calcular()"

# Ver quais arquivos tem conflito
git status
# both modified: app.py

# Abortar um merge (volta ao estado anterior)
git merge --abort`,
        description: 'Git marca conflitos com <<<<<<<. Edite o arquivo, remova os marcadores, git add e git commit.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'No VSCode, conflitos aparecem coloridos com botoes: "Accept Current Change" (sua versao), "Accept Incoming Change" (a outra branch), "Accept Both Changes" (mantem os dois). Isso facilita muito a resolucao! Apos clicar, o VSCode remove os marcadores automaticamente. Sempre leia o codigo de AMBAS as versoes antes de decidir o que manter.',
    },
  ],
  challenges: [
    {
      id: 'git3-c1',
      title: 'Fluxo completo de merge',
      description:
        'Escreva os comandos para: (1) criar e trocar para uma branch "feature-footer", (2) criar um arquivo footer.html e commitar, (3) voltar para main, (4) fazer merge da feature-footer na main, (5) deletar a branch feature-footer apos o merge.',
      language: 'bash',
      starterCode: '# Passo 1: Criar e trocar para feature-footer\n\n\n# Passo 2: Criar arquivo e commitar\n\n\n# Passo 3: Voltar para main\n\n\n# Passo 4: Fazer merge\n\n\n# Passo 5: Deletar a branch\n',
      solution: '# Passo 1: Criar e trocar para feature-footer\ngit switch -c feature-footer\n\n# Passo 2: Criar arquivo e commitar\necho "<footer>Copyright 2025</footer>" > footer.html\ngit add footer.html\ngit commit -m "Adiciona componente de footer"\n\n# Passo 3: Voltar para main\ngit switch main\n\n# Passo 4: Fazer merge\ngit merge feature-footer\n\n# Passo 5: Deletar a branch\ngit branch -d feature-footer',
      hints: [
        'Use "git switch -c nome" para criar e trocar de branch ao mesmo tempo.',
        'Para fazer merge, primeiro va para a branch de destino (main) e depois use "git merge nome-da-branch".',
        'Apos o merge, use "git branch -d nome" para limpar a branch que nao e mais necessaria.',
      ],
    },
    {
      id: 'git3-c2',
      title: 'Resolvendo um conflito de merge',
      description:
        'Simule a resolucao de um conflito: (1) tente fazer merge de feature-theme na main, (2) verifique o status para ver os conflitos, (3) apos resolver o conflito manualmente no arquivo styles.css, marque como resolvido e finalize o merge com commit.',
      language: 'bash',
      starterCode: '# Passo 1: Garantir que esta na main e tentar merge\n\n\n# Passo 2: Ver quais arquivos tem conflito\n\n\n# Passo 3: (Imagine que voce editou styles.css e removeu os marcadores)\n# Marcar o conflito como resolvido\n\n\n# Passo 4: Finalizar o merge com commit\n',
      solution: '# Passo 1: Garantir que esta na main e tentar merge\ngit switch main\ngit merge feature-theme\n\n# Passo 2: Ver quais arquivos tem conflito\ngit status\n\n# Passo 3: Marcar o conflito como resolvido\ngit add styles.css\n\n# Passo 4: Finalizar o merge com commit\ngit commit -m "Resolve conflito de merge: integra novo tema"',
      hints: [
        'Apos editar o arquivo com conflito, use "git add" para marcar como resolvido.',
        'O "git commit" apos resolver conflitos finaliza o merge.',
        'Se quiser cancelar o merge, use "git merge --abort" antes de resolver.',
      ],
    },
    {
      id: 'git3-c3',
      title: 'Cancelando um merge problematico',
      description:
        'Escreva os comandos para: (1) tentar fazer merge de "experimental" na main, (2) ao perceber que ha muitos conflitos, cancelar o merge completamente, (3) verificar que o repositorio voltou ao estado anterior.',
      language: 'bash',
      starterCode: '# Passo 1: Trocar para main e tentar merge\n\n\n# Passo 2: Cancelar o merge (muitos conflitos)\n\n\n# Passo 3: Verificar que esta tudo limpo\n',
      solution: '# Passo 1: Trocar para main e tentar merge\ngit switch main\ngit merge experimental\n\n# Passo 2: Cancelar o merge\ngit merge --abort\n\n# Passo 3: Verificar que esta tudo limpo\ngit status\ngit log --oneline -3',
      hints: [
        'O comando "git merge --abort" cancela um merge em andamento.',
        'Apos o abort, seu repositorio volta ao estado exato de antes do merge.',
        'Use "git status" para confirmar que nao ha conflitos pendentes.',
      ],
    },
  ],
};
