import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'etica-em-ia',
  moduleId: 'inteligencia-artificial',
  title: 'Etica em Inteligencia Artificial',
  description: 'Bias, transparencia, privacidade e responsabilidade — os desafios eticos que todo engenheiro de IA deve conhecer.',
  order: 9,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content: '## Por que Etica em IA Importa?\n\nSistemas de IA tomam decisoes que afetam vidas: concessao de credito, triagem de curriculos, sentencas judiciais, diagnosticos medicos.\n\nExemplos reais de falhas:\n- **2018:** Ferramenta de recrutamento da Amazon discriminou mulheres\n- **2020:** Sistemas de reconhecimento facial erravam 35% mais para mulheres negras\n- **2016:** Algoritmo de reincidencia criminal (COMPAS) mostrou bias racial\n\nEtica em IA e **engenharia responsavel**, nao apenas filosofia.',
    },
    {
      type: 'text',
      content: '## Bias (Vies) em IA\n\n**De onde vem o bias?**\n\n- **Dados historicos enviesados** — refletem discriminacoes do passado\n- **Dados nao representativos** — modelo treinado so com rostos claros erra em outros\n- **Definicao problematica** — acuracia media esconde falhas em grupos minoritarios\n- **Feedback loops** — policiamento preditivo gera mais arrestos, "confirmando" o modelo\n\n**Como detectar:**\n- Analisar metricas por subgrupos\n- Auditorias externas independentes',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import numpy as np\nfrom sklearn.metrics import classification_report\n\nnp.random.seed(42)\nn = 1000\n\ny_real_a = np.random.binomial(1, 0.7, n // 2)\ny_real_b = np.random.binomial(1, 0.7, n // 2)\n\n# Bias: modelo favorece grupo A, prejudica grupo B\ny_pred_a = np.where(np.random.random(n // 2) < 0.8, y_real_a, 0)\ny_pred_b = np.where(np.random.random(n // 2) < 0.5, y_real_b, 0)\n\ntaxa_a = y_pred_a.mean()\ntaxa_b = y_pred_b.mean()\ndi = taxa_b / taxa_a\n\nprint(f"Taxa aprovacao Grupo A: {taxa_a:.2%}")\nprint(f"Taxa aprovacao Grupo B: {taxa_b:.2%}")\nprint(f"Disparate Impact: {di:.2f}")\nprint("(< 0.8 indica discriminacao potencial)")',
        filename: 'analise_fairness.py',
        description: 'Detectando bias usando Disparate Impact.',
      },
    },
    {
      type: 'text',
      content: '## Principios de IA Responsavel\n\n**Transparencia** — usuarios devem saber quando interagem com IA.\n\n**Explicabilidade** — sistemas de alto impacto devem ser explicaveis. Por que meu credito foi negado?\n\n**Privacidade** — dados pessoais devem ser protegidos. Colete so o necessario.\n\n**Equidade** — trate grupos de forma justa, sem perpetuar discriminacoes.\n\n**Responsabilidade** — quem responde quando IA causa dano?\n\n**Seguranca** — sistemas criticos precisam de validacao rigorosa.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'A EU AI Act (2024) e o primeiro regulamento abrangente de IA do mundo. Classifica sistemas por nivel de risco e exige auditorias e transparencia. Como engenheiro de computacao, voce vai trabalhar dentro desse contexto legal.',
    },
  ],
};
