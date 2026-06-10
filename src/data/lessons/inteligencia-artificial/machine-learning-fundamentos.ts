import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'machine-learning-fundamentos',
  moduleId: 'inteligencia-artificial',
  title: 'Fundamentos de Machine Learning',
  description: 'Entenda o que e Machine Learning, como os modelos aprendem com dados e os tres tipos principais de aprendizado.',
  order: 2,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content: '## O que e Machine Learning?\n\n**Machine Learning (ML)** e um subcampo da IA onde os sistemas **aprendem padroes a partir de dados**, sem serem explicitamente programados.\n\nEm vez de escrever regras manualmente, voce fornece exemplos e deixa o modelo **descobrir as regras sozinho**.\n\nIsso e poderoso porque existem problemas onde:\n- As regras sao dificeis de escrever (reconhecimento facial)\n- Ha muitos parametros para considerar (recomendacao de filmes)\n- Os padroes mudam com o tempo (deteccao de fraude)',
    },
    {
      type: 'text',
      content: '## Os 3 Tipos de Aprendizado\n\n**1. Aprendizado Supervisionado**\nO modelo aprende com dados **rotulados** — cada exemplo tem entrada e saida esperada.\n- Exemplos: prever preco de imoveis, classificar emails como spam\n\n**2. Aprendizado Nao Supervisionado**\nO modelo encontra **padroes em dados sem rotulos**.\n- Exemplos: segmentar clientes, deteccao de anomalias\n\n**3. Aprendizado por Reforco**\nO modelo aprende por **tentativa e erro**, recebendo recompensas por boas acoes.\n- Exemplos: jogos (AlphaGo), robos que aprendem a andar',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.metrics import accuracy_score\n\n# 1. Carregar dados\ndados = load_iris()\nX = dados.data    # entradas: caracteristicas das flores\ny = dados.target  # saida: especie (0, 1 ou 2)\n\n# 2. Dividir em treino e teste\nX_treino, X_teste, y_treino, y_teste = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\n\n# 3. Treinar\nmodelo = KNeighborsClassifier(n_neighbors=3)\nmodelo.fit(X_treino, y_treino)\n\n# 4. Avaliar\npredicoes = modelo.predict(X_teste)\nacuracia = accuracy_score(y_teste, predicoes)\nprint(f"Acuracia: {acuracia:.2%}")',
        filename: 'ml_intro.py',
        description: 'Primeiro modelo de ML com scikit-learn classificando especies de flores.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'O fluxo basico de ML e sempre o mesmo: Coletar dados → Preparar → Escolher modelo → Treinar → Avaliar → Ajustar. Aprenda esse ciclo e voce consegue trabalhar com qualquer algoritmo.',
    },
    {
      type: 'text',
      content: '## Conceitos Essenciais\n\n**Feature:** uma variavel de entrada. Ex: tamanho da casa.\n\n**Label:** a saida que queremos prever. Ex: preco da casa.\n\n**Overfitting:** o modelo memoriza os dados de treino mas vai mal em dados novos.\n\n**Underfitting:** o modelo e simples demais e nao captura os padroes.\n\n**Validacao cruzada:** tecnica para avaliar o modelo de forma mais confiavel.',
    },
  ],
};
