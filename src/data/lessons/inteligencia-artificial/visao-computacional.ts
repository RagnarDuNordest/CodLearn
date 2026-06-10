import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'visao-computacional',
  moduleId: 'inteligencia-artificial',
  title: 'Visao Computacional',
  description: 'Como computadores enxergam: processamento de imagens, deteccao de objetos e segmentacao semantica.',
  order: 8,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content: '## Como Computadores Enxergam?\n\nPara um computador, uma imagem e apenas uma **matriz de numeros**:\n- Escala de cinza: matriz 2D de valores 0-255\n- Colorida RGB: tensor 3D (altura x largura x 3 canais)\n\n**Aplicacoes:**\n- Reconhecimento facial (desbloqueio de celular)\n- Carros autonomos (detectar pedestres, semaforos)\n- Diagnostico medico (raio-X, exames)\n- Controle de qualidade industrial',
    },
    {
      type: 'text',
      content: '## Tarefas Principais\n\n**Classificacao** — "Que objeto esta aqui?" → 1 label\n\n**Deteccao de Objetos** — "Onde estao?" → labels + bounding boxes\n\n**Segmentacao Semantica** — "Que classe e cada pixel?" → mapa completo\n\n**Segmentacao de Instancias** — Como segmentacao, mas diferencia individuos',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import numpy as np\n\n# Imagem como matriz de numeros\nimagem = np.array([\n    [100, 120, 130, 140],\n    [110, 125, 135, 145],\n    [120, 130, 140, 150],\n    [130, 135, 145, 155],\n], dtype=np.uint8)\n\nprint(f"Shape: {imagem.shape}")\nprint(f"Min: {imagem.min()}, Max: {imagem.max()}")\n\n# Filtro de deteccao de bordas (Sobel)\nkernel = np.array([[-1, 0, 1],\n                   [-2, 0, 2],\n                   [-1, 0, 1]])\n\ndef aplicar_filtro(img, k):\n    h, w = img.shape\n    saida = np.zeros_like(img, dtype=float)\n    for i in range(1, h-1):\n        for j in range(1, w-1):\n            saida[i, j] = np.sum(img[i-1:i+2, j-1:j+2] * k)\n    return saida\n\nbordas = aplicar_filtro(imagem, kernel)\nprint(f"Bordas detectadas: {bordas.shape}")',
        filename: 'processamento_imagem.py',
        description: 'Imagens como matrizes e filtro de deteccao de bordas.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import tensorflow as tf\nfrom tensorflow import keras\n\n# Transfer Learning com MobileNetV2\nbase_model = keras.applications.MobileNetV2(\n    input_shape=(224, 224, 3),\n    include_top=False,\n    weights=\'imagenet\'\n)\nbase_model.trainable = False\n\ninputs = keras.Input(shape=(224, 224, 3))\nx = base_model(inputs, training=False)\nx = keras.layers.GlobalAveragePooling2D()(x)\nx = keras.layers.Dropout(0.2)(x)\noutputs = keras.layers.Dense(5, activation=\'softmax\')(x)\n\nmodelo = keras.Model(inputs, outputs)\nmodelo.compile(optimizer=\'adam\',\n               loss=\'sparse_categorical_crossentropy\',\n               metrics=[\'accuracy\'])\n\ntreinados = sum(v.numpy().size for v in modelo.trainable_variables)\ncongelados = sum(v.numpy().size for v in modelo.non_trainable_variables)\nprint(f"Treinados: {treinados:,} | Congelados: {congelados:,}")',
        filename: 'transfer_learning.py',
        description: 'Transfer Learning com MobileNetV2 para classificacao customizada.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'YOLO (You Only Look Once) e o algoritmo de deteccao em tempo real mais famoso. Com uma unica passagem pela rede, detecta multiplos objetos — rapido o suficiente para video ao vivo. Usado em cameras de seguranca e carros autonomos.',
    },
  ],
};
