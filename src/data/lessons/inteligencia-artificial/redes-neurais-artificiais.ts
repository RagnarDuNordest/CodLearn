import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'redes-neurais-artificiais',
  moduleId: 'inteligencia-artificial',
  title: 'Redes Neurais Artificiais',
  description: 'Entenda como funcionam as redes neurais: neuronios artificiais, camadas, funcoes de ativacao e backpropagation.',
  order: 5,
  type: 'lesson',
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content: '## Inspiracao Biologica\n\nO cerebro humano tem cerca de **86 bilhoes de neuronios**. Redes Neurais Artificiais (RNA) sao inspiradas nessa estrutura:\n\n- **Neuronio artificial** — recebe entradas, calcula soma ponderada e passa por funcao de ativacao\n- **Pesos (w)** — determinam a forca de cada conexao\n- **Camadas** — grupos de neuronios organizados em profundidade\n\nCada neuronio calcula: `saida = ativacao(w1*x1 + w2*x2 + ... + b)`',
    },
    {
      type: 'text',
      content: '## Funcoes de Ativacao\n\nSem funcoes de ativacao, uma rede seria apenas uma regressao linear. Elas introduzem **nao-linearidade**:\n\n**ReLU:** `max(0, x)` — a mais usada. Simples e eficaz.\n\n**Sigmoid:** transforma em probabilidade (0 a 1). Para classificacao binaria.\n\n**Softmax:** distribuicao de probabilidades. Para multiplas classes.\n\n**Tanh:** varia entre -1 e 1.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import tensorflow as tf\nfrom tensorflow import keras\nfrom sklearn.datasets import load_digits\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\n\ndados = load_digits()\nX, y = dados.data, dados.target\n\nscaler = StandardScaler()\nX = scaler.fit_transform(X)\n\nX_treino, X_teste, y_treino, y_teste = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\n\nmodelo = keras.Sequential([\n    keras.layers.Dense(128, activation=\'relu\', input_shape=(64,)),\n    keras.layers.Dropout(0.3),\n    keras.layers.Dense(64, activation=\'relu\'),\n    keras.layers.Dropout(0.3),\n    keras.layers.Dense(10, activation=\'softmax\'),\n])\n\nmodelo.compile(\n    optimizer=\'adam\',\n    loss=\'sparse_categorical_crossentropy\',\n    metrics=[\'accuracy\']\n)\n\nmodelo.fit(X_treino, y_treino, epochs=50, validation_split=0.1, verbose=0)\n\nloss, acc = modelo.evaluate(X_teste, y_teste, verbose=0)\nprint(f"Acuracia: {acc:.2%}")',
        filename: 'rede_neural.py',
        description: 'Rede neural com TensorFlow/Keras para reconhecer digitos.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'Backpropagation e o algoritmo que treina a rede: calcula o erro na saida e propaga de volta por todas as camadas, ajustando os pesos. O otimizador Adam faz isso de forma eficiente e adaptativa.',
    },
    {
      type: 'text',
      content: '## Dropout — Evitando Overfitting\n\nDropout desativa aleatoriamente uma porcentagem dos neuronios durante o treinamento. Isso forca a rede a aprender representacoes mais robustas, pois nao pode depender de neuronios especificos.\n\nEm avaliacao, todos os neuronios sao ativados e seus pesos sao escalonados.',
    },
  ],
};
