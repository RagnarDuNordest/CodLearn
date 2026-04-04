import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-pipeline-completo',
  moduleId: 'cicd',
  title: 'Projeto: Pipeline Completo',
  description: 'Crie um pipeline CI/CD completo com lint (flake8), testes (pytest), build de imagem Docker e notificacao de status',
  order: 4,
  type: 'lesson',
  estimatedMinutes: 60,
  sections: [
    {
      type: 'text',
      content:
        '## Projeto: Pipeline CI/CD Profissional\n\nVamos construir um pipeline completo que simula o que times de desenvolvimento reais usam. O pipeline tera quatro estagios que rodam em sequencia, onde cada estagio so comeca se o anterior passar.\n\n### Visao geral do pipeline\n\n```\n[PUSH para main]\n       |\n       v\n  [1. LINT]\n  flake8 verifica o estilo do codigo\n       |\n       v (se lint passou)\n  [2. TESTES]\n  pytest roda todos os testes\n       |\n       v (se testes passaram)\n  [3. BUILD DOCKER]\n  constroi a imagem e faz push para o registry\n       |\n       v (sempre, independente do resultado)\n  [4. NOTIFICACAO]\n  envia status para o Slack ou email\n```\n\n### O que e cada estagio?\n\n**Lint (flake8):** verifica se o codigo segue o estilo PEP 8 — indentacao correta, linhas nao muito longas, espacos corretos. Codigo mal formatado pode esconder bugs.\n\n**Testes (pytest):** roda todos os testes automatizados com relatorio de cobertura.\n\n**Build Docker:** cria uma imagem Docker da aplicacao e envia para o GitHub Container Registry (ghcr.io). A imagem e o artefato deployavel — o que vai para producao.\n\n**Notificacao:** informa o time sobre o resultado do pipeline, especialmente em caso de falha.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Arquivo: .github/workflows/pipeline-completo.yml\n# Estagio 1: Lint com flake8\n# Estagio 2: Testes com pytest\n\nname: Pipeline Completo\n\non:\n  push:\n    branches: [ main ]\n  pull_request:\n    branches: [ main ]\n\njobs:\n  # ─── ESTAGIO 1: LINT ────────────────────────────────────────\n  lint:\n    name: Lint (flake8)\n    runs-on: ubuntu-latest\n\n    steps:\n      - uses: actions/checkout@v4\n\n      - uses: actions/setup-python@v5\n        with:\n          python-version: "3.11"\n\n      - name: Instalar flake8\n        run: pip install flake8\n\n      - name: Rodar flake8\n        run: |\n          # Verifica todo o codigo em src/ e tests/\n          # --max-line-length=88 (compativel com black)\n          # --extend-ignore=E203 (ignora espaco antes de ":")\n          flake8 src/ tests/ \\\n            --max-line-length=88 \\\n            --extend-ignore=E203 \\\n            --statistics\n\n  # ─── ESTAGIO 2: TESTES ──────────────────────────────────────\n  testes:\n    name: Testes (pytest)\n    runs-on: ubuntu-latest\n    needs: lint          # so roda se lint passou\n\n    steps:\n      - uses: actions/checkout@v4\n\n      - uses: actions/setup-python@v5\n        with:\n          python-version: "3.11"\n\n      - name: Instalar dependencias\n        run: pip install -r requirements.txt pytest pytest-cov\n\n      - name: Rodar testes\n        run: |\n          pytest tests/ \\\n            --cov=src \\\n            --cov-report=xml:coverage.xml \\\n            --cov-report=term-missing \\\n            --cov-fail-under=75 \\\n            -v\n\n      - name: Salvar relatorio de cobertura\n        uses: actions/upload-artifact@v4\n        if: always()     # salva mesmo se pytest falhou\n        with:\n          name: coverage-xml\n          path: coverage.xml',
        filename: '.github/workflows/pipeline-completo.yml (parte 1)',
        description:
          'Primeiros dois jobs do pipeline: lint com flake8 (verifica estilo PEP 8) e testes com pytest (com cobertura minima de 75%). O job "testes" usa "needs: lint" para so rodar se o lint passou.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Arquivo: .github/workflows/pipeline-completo.yml (continuacao)\n# Estagio 3: Build Docker\n# Estagio 4: Notificacao\n\n  # ─── ESTAGIO 3: BUILD DOCKER ────────────────────────────────\n  build-docker:\n    name: Build e Push Docker\n    runs-on: ubuntu-latest\n    needs: testes        # so roda se testes passaram\n\n    # Permissao para escrever no GitHub Container Registry\n    permissions:\n      contents: read\n      packages: write\n\n    steps:\n      - uses: actions/checkout@v4\n\n      # Login no GitHub Container Registry\n      - name: Login no ghcr.io\n        uses: docker/login-action@v3\n        with:\n          registry: ghcr.io\n          username: ${{ github.actor }}\n          password: ${{ secrets.GITHUB_TOKEN }}\n\n      # O GITHUB_TOKEN e um secret automatico — nao precisa criar!\n\n      # Metadados da imagem (nome e tags)\n      - name: Extrair metadados Docker\n        id: meta\n        uses: docker/metadata-action@v5\n        with:\n          images: ghcr.io/${{ github.repository }}\n          tags: |\n            type=sha,prefix=sha-\n            type=raw,value=latest,enable=${{ github.ref == \'refs/heads/main\' }}\n\n      # Build e push da imagem\n      - name: Build e push da imagem\n        uses: docker/build-push-action@v5\n        with:\n          context: .\n          push: true\n          tags: ${{ steps.meta.outputs.tags }}\n          labels: ${{ steps.meta.outputs.labels }}\n\n  # ─── ESTAGIO 4: NOTIFICACAO ─────────────────────────────────\n  notificacao:\n    name: Notificar Status\n    runs-on: ubuntu-latest\n    needs: [ lint, testes, build-docker ]\n    # "if: always()" faz esse job rodar SEMPRE,\n    # mesmo que os jobs anteriores tenham falhado\n    if: always()\n\n    steps:\n      - name: Verificar status do pipeline\n        run: |\n          if [ "${{ needs.lint.result }}" = "success" ] && \\\n             [ "${{ needs.testes.result }}" = "success" ] && \\\n             [ "${{ needs.build-docker.result }}" = "success" ]; then\n            echo "STATUS=success" >> $GITHUB_ENV\n            echo "MENSAGEM=Pipeline concluido com sucesso!" >> $GITHUB_ENV\n          else\n            echo "STATUS=failure" >> $GITHUB_ENV\n            echo "MENSAGEM=Pipeline FALHOU! Verifique os logs." >> $GITHUB_ENV\n          fi\n\n      - name: Enviar notificacao Slack\n        # So envia se o secret SLACK_WEBHOOK estiver configurado\n        if: env.SLACK_WEBHOOK != \'\'\n        env:\n          SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}\n        run: |\n          curl -X POST "$SLACK_WEBHOOK" \\\n            -H "Content-type: application/json" \\\n            --data "{\\"text\\": \\"${{ env.MENSAGEM }}\\nRepo: ${{ github.repository }}\\nCommit: ${{ github.sha }}\\"}"',
        filename: '.github/workflows/pipeline-completo.yml (parte 2)',
        description:
          'Jobs 3 e 4: build e push da imagem Docker para o GitHub Container Registry usando GITHUB_TOKEN automatico, e notificacao de status via Slack. O job de notificacao usa "if: always()" para rodar mesmo com falhas.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'O "GITHUB_TOKEN" e um secret especial criado automaticamente pelo GitHub para cada execucao de workflow. Voce nao precisa criar — ele ja existe com permissoes limitadas ao repositorio atual. Use-o para fazer push de imagens Docker, criar releases e comentar em PRs.',
    },
  ],
  challenges: [
    {
      id: 'cicd-c5-pipeline',
      title: 'Monte o Pipeline Completo',
      description:
        'Complete o workflow abaixo que deve ter tres jobs em sequencia: (1) "lint" rodando "flake8 src/ --max-line-length=88", (2) "testes" (needs: lint) rodando "pytest tests/ --cov=src --cov-fail-under=70", (3) "relatorio" (needs: testes, if: always()) que faz upload do arquivo "coverage.xml" como artifact chamado "cobertura". Todos usam ubuntu-latest e Python 3.11.',
      language: 'bash',
      starterCode:
        '# Arquivo: .github/workflows/pipeline.yml\n# Complete os tres jobs do pipeline\n\nname: Pipeline\n\non:\n  push:\n    branches: [ main ]\n\njobs:\n  lint:\n    name: Lint\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: "3.11"\n      - run: pip install flake8\n      # TODO: adicione o step que roda flake8 src/ --max-line-length=88\n\n  testes:\n    name: Testes\n    runs-on: ubuntu-latest\n    # TODO: adicione "needs: lint"\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: "3.11"\n      - run: pip install pytest pytest-cov\n      # TODO: adicione o step que roda pytest com --cov=src --cov-fail-under=70\n      # e gera coverage.xml com --cov-report=xml:coverage.xml\n\n  relatorio:\n    name: Relatorio de Cobertura\n    runs-on: ubuntu-latest\n    # TODO: adicione "needs: testes" e "if: always()"\n    steps:\n      # TODO: adicione o step de upload do coverage.xml\n      # action: actions/upload-artifact@v4\n      # name: cobertura\n      # path: coverage.xml\n',
      solution:
        '# Arquivo: .github/workflows/pipeline.yml\n\nname: Pipeline\n\non:\n  push:\n    branches: [ main ]\n\njobs:\n  lint:\n    name: Lint\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: "3.11"\n      - run: pip install flake8\n      - name: Rodar flake8\n        run: flake8 src/ --max-line-length=88\n\n  testes:\n    name: Testes\n    runs-on: ubuntu-latest\n    needs: lint\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: "3.11"\n      - run: pip install pytest pytest-cov\n      - name: Rodar pytest\n        run: pytest tests/ --cov=src --cov-report=xml:coverage.xml --cov-fail-under=70\n\n  relatorio:\n    name: Relatorio de Cobertura\n    runs-on: ubuntu-latest\n    needs: testes\n    if: always()\n    steps:\n      - name: Salvar cobertura\n        uses: actions/upload-artifact@v4\n        with:\n          name: cobertura\n          path: coverage.xml\n',
      hints: [
        'O campo "needs:" fica no nivel do job (mesmo nivel que "runs-on"), nao dentro de steps. Para depender de um job: needs: nome-do-job',
        'O "if: always()" no job "relatorio" garante que ele rode mesmo que "testes" falhe — importante para sempre ter o relatorio disponivel para diagnostico',
        'O step de upload nao precisa de checkout porque o artifact coverage.xml ja existe na maquina virtual do job "testes". Jobs diferentes tem maquinas diferentes — por isso usamos upload-artifact para transferir arquivos entre jobs',
      ],
    },
    {
      id: 'cicd-c5-condicoes',
      title: 'Adicione Logica Condicional ao Pipeline',
      description:
        'Modifique o workflow para adicionar um job "deploy-producao" que: (1) depende de "testes", (2) so roda se a branch for "main" (use: if: github.ref == \'refs/heads/main\'), (3) usa ubuntu-latest e (4) tem um step que imprime "Deployando versao ${{ github.sha }} para producao...".',
      language: 'bash',
      starterCode:
        '# Arquivo: .github/workflows/deploy-condicional.yml\n# Adicione o job deploy-producao com condicao de branch\n\nname: Deploy Condicional\n\non:\n  push:\n\njobs:\n  testes:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: "3.11"\n      - run: pip install pytest\n      - run: pytest tests/ -v\n\n  # TODO: adicione o job "deploy-producao"\n  # Requisitos:\n  # - runs-on: ubuntu-latest\n  # - needs: testes\n  # - if: github.ref == \'refs/heads/main\'\n  # - step: imprimir "Deployando versao <sha> para producao..."\n  #   use echo com ${{ github.sha }} no comando run\n',
      solution:
        '# Arquivo: .github/workflows/deploy-condicional.yml\n\nname: Deploy Condicional\n\non:\n  push:\n\njobs:\n  testes:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: "3.11"\n      - run: pip install pytest\n      - run: pytest tests/ -v\n\n  deploy-producao:\n    runs-on: ubuntu-latest\n    needs: testes\n    if: github.ref == \'refs/heads/main\'\n    steps:\n      - name: Deploy para producao\n        run: echo "Deployando versao ${{ github.sha }} para producao..."\n',
      hints: [
        'O campo "if:" no nivel do job usa expressoes do GitHub sem os delimitadores ${{ }}. Exemplo: if: github.ref == \'refs/heads/main\'',
        'Mas dentro de "run:", para usar variaveis do contexto GitHub voce precisa dos delimitadores: ${{ github.sha }}',
        'Com esse condicional, pushes para branches de feature rodam os testes mas nao fazem deploy. Apenas pushes para main chegam ao estagio de producao — isso e exatamente o fluxo de GitFlow/trunk-based development',
      ],
    },
  ],
};
