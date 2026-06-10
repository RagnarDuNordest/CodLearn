import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'deep-learning',
  moduleId: 'inteligencia-artificial',
  title: 'Deep Learning e Redes Convolucionais',
  description: 'Entenda o que diferencia deep learning de ML classico, aprenda sobre CNNs e como elas processam imagens.',
  order: 6,
  type: 'lesson',
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content: '## O que e Deep Learning?\n\n**Deep Learning** usa redes neurais com **muitas camadas**. O que tornou revolucionario a partir de 2012:\n\n1. **Grandes volumes de dados** — a internet gerou dados suficientes\n2. **GPUs** — paralelismo massivo reduziu o tempo de treinamento\n3. **Algoritmos melhores** — ReLU, BatchNorm, Dropout\n\nHoje domina: visao computacional, reconhecimento de voz, traducao, geracao de texto (ChatGPT).',
    },
    {
      type: 'text',
      content: '## Redes Convolucionais (CNN)\n\nCNNs sao especializadas em **processar imagens**. Usam filtros que deslizam pela imagem detectando padroes:\n\n- **Primeiras camadas:** bordas, curvas, texturas simples\n- **Camadas intermediarias:** formas (olhos, rodas)\n- **Camadas profundas:** objetos completos (rosto, carro)\n\n**Componentes:**\n- **Conv2D** — aplica filtros\n- **MaxPooling** — reduz tamanho preservando informacoes\n- **BatchNorm** — estabiliza treinamento\n- **Flatten + Dense** — classificacao final',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import tensorflow as tf\nfrom tensorflow import keras\nfrom tensorflow.keras import layers\n\n(X_treino, y_treino), (X_teste, y_teste) = keras.datasets.cifar10.load_data()\nX_treino = X_treino.astype(\'float32\') / 255.0\nX_teste = X_teste.astype(\'float32\') / 255.0\n\nmodelo = keras.Sequential([\n    layers.Conv2D(32, (3,3), activation=\'relu\', padding=\'same\', input_shape=(32,32,3)),\n    layers.BatchNormalization(),\n    layers.MaxPooling2D(2,2),\n    layers.Dropout(0.25),\n\n    layers.Conv2D(64, (3,3), activation=\'relu\', padding=\'same\'),\n    layers.BatchNormalization(),\n    layers.MaxPooling2D(2,2),\n    layers.Dropout(0.25),\n\n    layers.Flatten(),\n    layers.Dense(512, activation=\'relu\'),\n    layers.Dropout(0.5),\n    layers.Dense(10, activation=\'softmax\'),\n])\n\nmodelo.compile(optimizer=\'adam\',\n               loss=\'sparse_categorical_crossentropy\',\n               metrics=[\'accuracy\'])\nprint(f"Parametros: {modelo.count_params():,}")',
        filename: 'cnn_cifar10.py',
        description: 'CNN para classificar imagens do CIFAR-10.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'Transfer Learning: voce nao precisa treinar do zero! Modelos como ResNet e EfficientNet foram treinados em milhoes de imagens. Reutilize esses pesos e apenas ajuste as ultimas camadas — economizando dias de treinamento.',
    },
    {
      type: 'text',
      content: '## Arquiteturas Famosas\n\n**LeNet (1998)** — Primeira CNN de sucesso, para reconhecimento de digitos.\n\n**AlexNet (2012)** — Venceu o ImageNet. Inicio da era moderna.\n\n**ResNet (2015)** — "Conexoes residuais" permitem treinar redes com 100+ camadas.\n\n**Transformer (2017)** — Revolucionou NLP e depois visao. Base do ChatGPT e BERT.\n\n**Diffusion Models (2020s)** — Base do DALL-E e Stable Diffusion.',
    },
  ],
};
