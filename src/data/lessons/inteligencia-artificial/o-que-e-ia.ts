import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'o-que-e-ia',
  moduleId: 'inteligencia-artificial',
  title: 'O que e Inteligencia Artificial?',
  description: 'Entenda o que e IA, sua historia, areas de atuacao e como ela transforma o mundo da tecnologia.',
  order: 0,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        '## O que e Inteligencia Artificial?\n\nInteligencia Artificial (IA) e o campo da ciencia da computacao que busca criar sistemas capazes de realizar tarefas que, quando feitas por humanos, exigiriam **inteligencia** — como reconhecer imagens, entender linguagem, tomar decisoes e aprender com experiencias.\n\nA IA inclui:\n\n- **Machine Learning** — sistemas que aprendem com dados\n- **Redes Neurais** — modelos inspirados no cerebro humano\n- **NLP** — entender e gerar linguagem humana\n- **Visao Computacional** — interpretar imagens e videos\n- **Robotica** — sistemas fisicos inteligentes',
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'O termo "Inteligencia Artificial" foi criado por John McCarthy em 1956, durante a Conferencia de Dartmouth — o nascimento oficial da area.',
    },
    {
      type: 'text',
      content:
        '## Os Tres Niveis de IA\n\n**IA Estreita (ANI)** — faz uma coisa muito bem. E o que existe hoje: reconhecimento facial, traducao automatica. Nao consegue fazer nada alem de sua especialidade.\n\n**IA Geral (AGI)** — capacidade cognitiva equivalente a um humano. Ainda nao existe.\n\n**Super IA (ASI)** — hipotetica: supera humanos em todas as dimensoes.',
    },
    {
      type: 'text',
      content:
        '## IA na Engenharia da Computacao\n\nNa grade de EC, a IA aparece em:\n\n- **Inteligencia Artificial** — algoritmos de busca, logica, planejamento\n- **Machine Learning** — aprendizado supervisionado e nao supervisionado\n- **Visao Computacional** — processamento de imagens\n- **Redes Neurais e Deep Learning** — modelos de aprendizado profundo\n- **Robotica** — controle e percepcao de robos',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Todo sistema de IA que voce usa hoje — ChatGPT, Google Fotos, filtros do Instagram — e IA Estreita. Ele e excelente no que foi treinado, mas nao tem consciencia.',
    },
  ],
};
