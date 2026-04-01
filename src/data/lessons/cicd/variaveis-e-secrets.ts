import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'variaveis-e-secrets',
  moduleId: 'cicd',
  title: 'Variaveis e Secrets',
  description: 'Use GitHub Secrets para dados sensiveis, variaveis de ambiente no workflow e artifacts para salvar resultados de testes',
  order: 3,
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        '## Dados Sensiveis no CI/CD\n\nWorkflows de CI/CD frequentemente precisam de informacoes confidenciais: tokens de API, senhas de banco de dados, chaves de acesso a servicos de cloud. Colocar esses valores diretamente no arquivo YAML seria um desastre de seguranca — qualquer pessoa com acesso ao repositorio poderia ve-los.\n\nO GitHub oferece tres mecanismos para isso:\n\n### 1. GitHub Secrets\nValores criptografados armazenados no GitHub, nunca exibidos em logs. Use para: senhas, tokens de API, chaves privadas, credenciais de cloud.\n\n### 2. GitHub Variables\nValores nao-sensiveis armazenados no GitHub, visiveis nos logs. Use para: URLs de ambiente, nomes de bucket, flags de configuracao.\n\n### 3. Variaveis de ambiente no workflow\nDefinidas diretamente no arquivo YAML. Use para: valores que variam por job/step e nao sao confidenciais.\n\n### Como adicionar um Secret\n1. Va no repositorio > **Settings** > **Secrets and variables** > **Actions**\n2. Clique em **New repository secret**\n3. Nome: `DATABASE_URL`, Valor: `postgres://user:senha@host/db`\n4. Clique em **Add secret**\n\nProto — agora voce pode usar `${{ secrets.DATABASE_URL }}` no workflow.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Arquivo: .github/workflows/deploy.yml\n# Demonstracao de secrets, variables e env vars\n\nname: Deploy com Secrets\n\non:\n  push:\n    branches: [ main ]\n\n# Variaveis de ambiente globais (disponiveis em todos os jobs)\nenv:\n  PYTHON_VERSION: "3.11"\n  APP_NAME: "minha-aplicacao"\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n\n    # Variaveis de ambiente especificas do job\n    env:\n      ENVIRONMENT: production\n\n    steps:\n      - uses: actions/checkout@v4\n\n      - name: Setup Python\n        uses: actions/setup-python@v5\n        with:\n          python-version: ${{ env.PYTHON_VERSION }}\n\n      - name: Instalar dependencias\n        run: pip install -r requirements.txt\n\n      # Usando secrets — NUNCA aparece nos logs\n      - name: Configurar credenciais\n        env:\n          DATABASE_URL: ${{ secrets.DATABASE_URL }}\n          API_KEY: ${{ secrets.API_KEY }}\n        run: |\n          echo "Conectando ao banco de dados..."\n          # O valor de DATABASE_URL esta disponivel aqui\n          # mas nao aparece nos logs do GitHub\n          python scripts/setup_db.py\n\n      # Usando uma GitHub Variable (nao-sensivel)\n      - name: Deploy para ${{ vars.DEPLOY_TARGET }}\n        env:\n          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}\n          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}\n        run: |\n          python deploy.py --target ${{ vars.DEPLOY_TARGET }}\n\n# IMPORTANTE: Se voce usar ${{ secrets.NOME_INEXISTENTE }},\n# o GitHub substitui por uma string vazia — nao gera erro!',
        filename: '.github/workflows/deploy.yml',
        description:
          'Workflow demonstrando secrets (criptografados, nao aparecem em logs), vars (variaveis de repositorio nao-sensiveis) e env (variaveis no proprio arquivo YAML).',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Nunca use "echo ${{ secrets.MINHA_SENHA }}" em um step — o GitHub mascara o valor nos logs, mas e uma ma pratica. Tambem nunca comite arquivos .env ou credentials.json. Use sempre GitHub Secrets para qualquer valor que nao pode ser publico.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Arquivo: .github/workflows/testes-com-artifacts.yml\n# Salvando e baixando artifacts: relatorios de teste e cobertura\n\nname: Testes com Artifacts\n\non: [ push, pull_request ]\n\njobs:\n  testes:\n    runs-on: ubuntu-latest\n\n    steps:\n      - uses: actions/checkout@v4\n\n      - uses: actions/setup-python@v5\n        with:\n          python-version: "3.11"\n\n      - name: Instalar dependencias\n        run: pip install pytest pytest-cov pytest-html\n\n      # Roda testes gerando relatorio HTML e XML\n      - name: Rodar testes\n        run: |\n          pytest tests/ \\\n            --cov=src \\\n            --cov-report=html:relatorios/cobertura \\\n            --html=relatorios/testes.html \\\n            --self-contained-html \\\n            -v\n        # O "continue-on-error: true" garante que o artifact\n        # seja salvo mesmo quando os testes falham\n        continue-on-error: true\n\n      # Salva os relatorios como artifact para download\n      - name: Salvar relatorios de teste\n        uses: actions/upload-artifact@v4\n        with:\n          name: relatorios-testes-${{ github.run_number }}\n          path: relatorios/\n          retention-days: 30   # mantém por 30 dias\n\n# Apos o workflow, voce pode baixar os relatorios em:\n# GitHub > aba Actions > clique no run > secao Artifacts\n#\n# O "github.run_number" e uma variavel automatica do GitHub\n# que incrementa a cada execucao do workflow (1, 2, 3...)',
        filename: '.github/workflows/testes-com-artifacts.yml',
        description:
          'Workflow que gera relatorios HTML de testes e cobertura, depois salva como artifacts para download. "continue-on-error: true" garante o upload mesmo com testes falhando.',
      },
    },
  ],
  challenges: [
    {
      id: 'cicd-c4-secrets',
      title: 'Proteja as Credenciais',
      description:
        'O workflow abaixo tem um problema grave: as credenciais estao expostas diretamente no YAML. Reescreva-o usando GitHub Secrets corretamente. As credenciais devem ser acessadas via ${{ secrets.NOME }} e passadas como variaveis de ambiente nos steps que precisam delas.',
      language: 'bash',
      starterCode:
        '# PROBLEMA: credenciais expostas no YAML!\n# Reescreva usando GitHub Secrets\n\nname: Deploy Inseguro\n\non:\n  push:\n    branches: [ main ]\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n\n    steps:\n      - uses: actions/checkout@v4\n\n      - name: Conectar ao banco\n        # ERRADO: senha exposta diretamente\n        run: python connect.py --url "postgres://admin:senha123@db.empresa.com/prod"\n\n      - name: Fazer deploy na AWS\n        # ERRADO: chaves AWS expostas diretamente\n        run: |\n          export AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"\n          export AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"\n          python deploy_aws.py\n',
      solution:
        '# CORRETO: credenciais protegidas com GitHub Secrets\n\nname: Deploy Seguro\n\non:\n  push:\n    branches: [ main ]\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n\n    steps:\n      - uses: actions/checkout@v4\n\n      - name: Conectar ao banco\n        env:\n          DATABASE_URL: ${{ secrets.DATABASE_URL }}\n        run: python connect.py --url "$DATABASE_URL"\n\n      - name: Fazer deploy na AWS\n        env:\n          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}\n          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}\n        run: python deploy_aws.py\n',
      hints: [
        'Nunca coloque senhas, chaves ou tokens diretamente no YAML. Adicione-os em: Settings > Secrets and variables > Actions > New repository secret',
        'Para usar um secret em um step, adicione um bloco "env:" dentro do step e atribua: NOME_VAR: ${{ secrets.NOME_DO_SECRET }}',
        'No comando "run", acesse a variavel de ambiente normalmente com $NOME_VAR (Linux). O GitHub nunca mostrara o valor real nos logs — ele aparece como ***',
      ],
    },
    {
      id: 'cicd-c4-artifacts',
      title: 'Salve o Relatorio de Cobertura',
      description:
        'Complete o workflow para: (1) rodar pytest gerando relatorio de cobertura em HTML no diretorio "coverage-report/", usando "--cov=src --cov-report=html:coverage-report" e (2) salvar esse diretorio como artifact chamado "coverage-report" com retencao de 7 dias.',
      language: 'bash',
      starterCode:
        '# Arquivo: .github/workflows/cobertura.yml\n# Complete os steps de testes e upload de artifact\n\nname: Cobertura de Testes\n\non: [ push ]\n\njobs:\n  cobertura:\n    runs-on: ubuntu-latest\n\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: "3.11"\n      - run: pip install pytest pytest-cov\n\n      - name: Rodar testes com cobertura\n        # TODO: rode pytest com:\n        # - diretorio "tests/"\n        # - flag --cov=src\n        # - flag --cov-report=html:coverage-report\n        # - adicione "continue-on-error: true"\n\n      - name: Salvar relatorio de cobertura\n        # TODO: use actions/upload-artifact@v4\n        # - name: "coverage-report"\n        # - path: coverage-report/\n        # - retention-days: 7\n',
      solution:
        '# Arquivo: .github/workflows/cobertura.yml\n\nname: Cobertura de Testes\n\non: [ push ]\n\njobs:\n  cobertura:\n    runs-on: ubuntu-latest\n\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: "3.11"\n      - run: pip install pytest pytest-cov\n\n      - name: Rodar testes com cobertura\n        run: pytest tests/ --cov=src --cov-report=html:coverage-report\n        continue-on-error: true\n\n      - name: Salvar relatorio de cobertura\n        uses: actions/upload-artifact@v4\n        with:\n          name: coverage-report\n          path: coverage-report/\n          retention-days: 7\n',
      hints: [
        '"continue-on-error: true" e um campo do step, no mesmo nivel de "name" e "run" — nao vai dentro de "run". Ele garante que o upload ocorra mesmo se os testes falharem',
        'A action "actions/upload-artifact@v4" recebe tres campos dentro de "with:": name (nome do artifact), path (arquivo ou pasta) e retention-days (quantos dias manter)',
        'O path "coverage-report/" deve ser o mesmo diretorio que voce passou para "--cov-report=html:coverage-report". O pytest gera os HTMLs dentro desse diretorio',
      ],
    },
  ],
};
