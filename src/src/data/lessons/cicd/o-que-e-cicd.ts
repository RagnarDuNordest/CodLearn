import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'o-que-e-cicd',
  moduleId: 'cicd',
  title: 'O que e CI/CD',
  description: 'Entenda integracao continua e entrega continua, por que automatizar e o ciclo completo: commit, build, test e deploy',
  order: 0,
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        '## O que e CI/CD\n\nCI/CD e um conjunto de praticas que automatiza as etapas entre o desenvolvedor escrever codigo e esse codigo chegar ao usuario final. A sigla significa:\n\n- **CI — Continuous Integration (Integracao Continua):** cada vez que um desenvolvedor envia codigo ao repositorio, o sistema automaticamente compila, testa e verifica se o novo codigo se integra sem quebrar o que ja existia.\n- **CD — Continuous Delivery / Continuous Deployment (Entrega/Deploy Continuo):** apos o CI aprovar o codigo, o sistema pode entregar automaticamente a nova versao para um ambiente de staging ou ate em producao.\n\n### Por que isso existe?\n\nAntes do CI/CD, times de desenvolvimento integravam codigo manualmente — geralmente uma vez por semana ou por mes. O resultado era o chamado "integration hell": conflitos enormes, bugs dificeis de rastrear e deploys estressantes que duravam horas.\n\nCom CI/CD:\n- Bugs sao descobertos em minutos, nao semanas\n- Cada commit pequeno e mais facil de testar e reverter\n- O time tem feedback rapido sobre a qualidade do codigo\n- O deploy vira um evento banal, nao um ritual de terror',
    },
    {
      type: 'text',
      content:
        '## O ciclo: commit -> build -> test -> deploy\n\nCada vez que voce faz `git push`, o pipeline CI/CD executa uma sequencia de etapas automaticas:\n\n```\n[DEV] git push\n        |\n        v\n[CI]  checkout do codigo\n        |\n        v\n[CI]  build (instalar dependencias, compilar)\n        |\n        v\n[CI]  test (rodar testes unitarios, de integracao)\n        |\n        v\n[CI]  lint / analise estatica de codigo\n        |\n        v\n[CD]  deploy para staging\n        |\n        v\n[CD]  testes de smoke / e2e\n        |\n        v\n[CD]  deploy para producao\n        |\n        v\n[OPS] monitoramento e alertas\n```\n\n### Integracao Continua vs Entrega Continua\n\n**Integracao Continua (CI)** para no momento em que o codigo e aprovado — build passou, testes passaram. O deploy ainda pode ser manual.\n\n**Entrega Continua (Continuous Delivery)** vai um passo alem: o codigo aprovado e automaticamente enviado para um ambiente de staging, pronto para deploy em producao com um clique.\n\n**Deploy Continuo (Continuous Deployment)** e o nivel maximo: o deploy para producao tambem e automatico — sem intervencao humana.',
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'CI e CD nao sao a mesma coisa. Voce pode ter CI sem CD (build e testes automaticos, mas deploy manual). A maioria dos times começa com CI e avança para CD conforme ganha confiança nos testes automaticos.',
    },
    {
      type: 'text',
      content:
        '## Por que automatizar?\n\nAutomatizar o pipeline traz beneficios concretos para o time e para o produto:\n\n### Velocidade e confianca\nCom um pipeline CI/CD bem configurado, um time consegue fazer dezenas de deploys por dia com segurança. Cada deploy e menor, mais focado e mais facil de reverter se algo der errado.\n\n### Padrao de qualidade consistente\nOs mesmos testes rodam para todo commit de todo desenvolvedor. Nao importa se e o senior ou o estagiario — o pipeline exige o mesmo nivel de qualidade.\n\n### Documentacao viva\nO arquivo de configuracao do pipeline (o workflow) documenta exatamente como o projeto e construido, testado e deployado. Qualquer desenvolvedor novo pode ler o arquivo e entender todo o processo.\n\n### Reducao de erros humanos\nEtapas manuais introduzem erros. "Esqueci de rodar os testes antes do deploy", "copiei o arquivo errado", "esqueci de atualizar a variavel de ambiente" — automatizar elimina esses erros.\n\n### Ferramentas populares de CI/CD\n- **GitHub Actions** — integrado ao GitHub, gratuito para projetos publicos\n- **GitLab CI/CD** — integrado ao GitLab\n- **Jenkins** — open source, altamente configuravel\n- **CircleCI** — cloud, facil de configurar\n- **Travis CI** — popular em projetos open source',
    },
  ],
  challenges: [
    {
      id: 'cicd-c1-conceitos',
      title: 'Mapeie o Pipeline',
      description:
        'A funcao abaixo simula um pipeline CI/CD simplificado. Complete as etapas faltantes para que o pipeline execute: checkout, install_deps, run_tests e deploy. Cada etapa deve imprimir seu nome e retornar True em caso de sucesso. Se qualquer etapa falhar (retornar False), o pipeline deve parar e imprimir "PIPELINE FALHOU na etapa: <nome>".',
      language: 'python',
      starterCode:
        '# Simulacao de um pipeline CI/CD\n# Complete as etapas faltantes\n\ndef checkout():\n    print("[ checkout ] Clonando repositorio...")\n    return True\n\ndef install_deps():\n    # TODO: imprimir "[ install_deps ] Instalando dependencias..."\n    # TODO: retornar True\n    pass\n\ndef run_tests():\n    # TODO: imprimir "[ run_tests ] Rodando testes..."\n    # TODO: retornar True\n    pass\n\ndef deploy():\n    # TODO: imprimir "[ deploy ] Fazendo deploy para producao..."\n    # TODO: retornar True\n    pass\n\ndef executar_pipeline():\n    etapas = [checkout, install_deps, run_tests, deploy]\n    for etapa in etapas:\n        resultado = etapa()\n        if not resultado:\n            print(f"PIPELINE FALHOU na etapa: {etapa.__name__}")\n            return False\n    print("PIPELINE CONCLUIDO COM SUCESSO!")\n    return True\n\nexecutar_pipeline()\n',
      solution:
        '# Simulacao de um pipeline CI/CD\n\ndef checkout():\n    print("[ checkout ] Clonando repositorio...")\n    return True\n\ndef install_deps():\n    print("[ install_deps ] Instalando dependencias...")\n    return True\n\ndef run_tests():\n    print("[ run_tests ] Rodando testes...")\n    return True\n\ndef deploy():\n    print("[ deploy ] Fazendo deploy para producao...")\n    return True\n\ndef executar_pipeline():\n    etapas = [checkout, install_deps, run_tests, deploy]\n    for etapa in etapas:\n        resultado = etapa()\n        if not resultado:\n            print(f"PIPELINE FALHOU na etapa: {etapa.__name__}")\n            return False\n    print("PIPELINE CONCLUIDO COM SUCESSO!")\n    return True\n\nexecutar_pipeline()\n',
      hints: [
        'Cada funcao de etapa segue o mesmo padrao: imprimir uma mensagem descritiva e retornar True',
        'O nome da etapa no print deve estar entre colchetes, como "[ install_deps ]", para ficar consistente com o checkout',
        'Nao altere a funcao executar_pipeline — ela ja itera sobre as etapas e verifica o resultado de cada uma',
      ],
    },
  ],
};
