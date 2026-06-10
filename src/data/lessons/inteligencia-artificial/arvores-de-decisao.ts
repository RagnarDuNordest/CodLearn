import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'arvores-de-decisao',
  moduleId: 'inteligencia-artificial',
  title: 'Arvores de Decisao e Random Forest',
  description: 'Domine arvores de decisao, entenda como o modelo aprende regras e por que Random Forests sao tao poderosas.',
  order: 4,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content: '## Arvores de Decisao\n\nUma **arvore de decisao** toma decisoes atraves de perguntas sobre os dados — funciona como um fluxograma.\n\nCada **no interno** faz uma pergunta sobre uma feature.\nCada **folha** e uma decisao final.\n\nO algoritmo escolhe as perguntas que melhor **separam** os dados usando metricas como Gini Impurity e Information Gain.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'from sklearn.tree import DecisionTreeClassifier, export_text\nfrom sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\n\ndados = load_iris()\nX, y = dados.data, dados.target\n\nX_treino, X_teste, y_treino, y_teste = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\n\n# max_depth evita overfitting\narvore = DecisionTreeClassifier(max_depth=3, random_state=42)\narvore.fit(X_treino, y_treino)\n\nregras = export_text(arvore, feature_names=list(dados.feature_names))\nprint(regras)\nprint(f"Acuracia: {arvore.score(X_teste, y_teste):.2%}")\n\nfor feat, imp in zip(dados.feature_names, arvore.feature_importances_):\n    print(f"{feat}: {imp:.3f}")',
        filename: 'arvore_decisao.py',
        description: 'Arvore de decisao com visualizacao das regras aprendidas.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Arvores de decisao sofrem muito com overfitting se nao limitadas. Use max_depth para controlar. Sem limite, a arvore pode memorizar cada exemplo de treino.',
    },
    {
      type: 'text',
      content: '## Random Forest\n\nUm conjunto de dezenas ou centenas de arvores, cada uma treinada em uma amostra diferente dos dados. A decisao final e por **votacao majoritaria**.\n\n**Por que funciona melhor?**\n- Cada arvore comete erros diferentes\n- A maioria acerta na resposta correta\n- O conjunto e mais robusto que qualquer arvore individual\n\nIsso se chama **ensemble learning**.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'from sklearn.ensemble import RandomForestClassifier\nfrom sklearn.datasets import load_breast_cancer\nfrom sklearn.model_selection import train_test_split, cross_val_score\nimport numpy as np\n\ndados = load_breast_cancer()\nX, y = dados.data, dados.target\n\nX_treino, X_teste, y_treino, y_teste = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\n\nrf = RandomForestClassifier(n_estimators=100, random_state=42)\nrf.fit(X_treino, y_treino)\n\nprint(f"Acuracia: {rf.score(X_teste, y_teste):.2%}")\n\nscores = cross_val_score(rf, X, y, cv=5)\nprint(f"CV Media: {scores.mean():.2%} +/- {scores.std():.2%}")\n\nindices = np.argsort(rf.feature_importances_)[::-1][:5]\nfor i in indices:\n    print(f"{dados.feature_names[i]}: {rf.feature_importances_[i]:.3f}")',
        filename: 'random_forest.py',
        description: 'Random Forest com validacao cruzada.',
      },
    },
  ],
};
