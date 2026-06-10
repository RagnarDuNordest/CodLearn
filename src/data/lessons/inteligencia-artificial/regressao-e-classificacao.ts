import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'regressao-e-classificacao',
  moduleId: 'inteligencia-artificial',
  title: 'Regressao e Classificacao',
  description: 'Aprenda os dois problemas centrais do aprendizado supervisionado: prever valores numericos e categorizar dados.',
  order: 3,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content: '## Regressao vs Classificacao\n\n**Regressao** — prever um **valor numerico continuo**\n- Qual sera o preco desta casa?\n- Qual a temperatura amanha?\n\n**Classificacao** — prever uma **categoria**\n- Este email e spam ou nao?\n- Esta imagem mostra um gato, cachorro ou passaro?\n\nA diferenca fundamental esta na saida: numero real (regressao) vs categoria (classificacao).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import numpy as np\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import r2_score\n\n# Tamanho (m2) -> preco (mil R$)\ntamanhos = np.array([[40], [60], [80], [100], [120], [150]])\nprecos = np.array([180, 250, 320, 400, 480, 590])\n\nmodelo = LinearRegression()\nmodelo.fit(tamanhos, precos)\n\nprint(f"Coeficiente: {modelo.coef_[0]:.2f}")\nprint(f"Intercepto:  {modelo.intercept_:.2f}")\nprint(f"R2 Score: {r2_score(precos, modelo.predict(tamanhos)):.4f}")\n\npreco_90 = modelo.predict([[90]])\nprint(f"Previsao para 90m2: R$ {preco_90[0]:.0f} mil")',
        filename: 'regressao_linear.py',
        description: 'Regressao linear para prever precos de imoveis.',
      },
    },
    {
      type: 'text',
      content: '## Regressao Logistica — Para Classificacao\n\nApesar do nome, a **regressao logistica** e usada para **classificacao**. Ela calcula a **probabilidade** de um exemplo pertencer a uma classe.\n\nUsa a funcao **sigmoide** para converter qualquer numero em uma probabilidade entre 0 e 1. Se probabilidade > 50%, classifica como positivo.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'from sklearn.linear_model import LogisticRegression\nfrom sklearn.datasets import load_breast_cancer\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import classification_report\n\ndados = load_breast_cancer()\nX, y = dados.data, dados.target\n\nX_treino, X_teste, y_treino, y_teste = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\n\nclf = LogisticRegression(max_iter=10000)\nclf.fit(X_treino, y_treino)\n\ny_pred = clf.predict(X_teste)\nprint(classification_report(y_teste, y_pred,\n      target_names=[\'Maligno\', \'Benigno\']))\n\nprob = clf.predict_proba(X_teste[:1])\nprint(f"Prob Benigno: {prob[0][1]:.2%}")',
        filename: 'classificacao_logistica.py',
        description: 'Classificador binario com regressao logistica.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Metricas importantes: **Precisao** (dos que previ positivo, quantos eram?), **Recall** (dos que eram positivos, quantos encontrei?), **F1-Score** (media harmonica). Em diagnostico medico, recall e critico!',
    },
  ],
};
