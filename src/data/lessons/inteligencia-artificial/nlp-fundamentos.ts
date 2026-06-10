import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'nlp-fundamentos',
  moduleId: 'inteligencia-artificial',
  title: 'Processamento de Linguagem Natural (NLP)',
  description: 'Aprenda como computadores entendem texto: tokenizacao, embeddings, analise de sentimentos e modelos de linguagem.',
  order: 7,
  type: 'lesson',
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content: '## O que e NLP?\n\n**Processamento de Linguagem Natural (NLP)** permite que computadores **entendam, interpretem e gerem** linguagem humana.\n\nDesafios:\n- Linguagem e ambigua: "Banco" pode ser instituicao ou assento\n- Contexto: "Nao gostei. Mentira, adorei!" — ironia\n- Girias, erros de digitacao, abreviacoes\n\n**Aplicacoes:** chatbots, traducao automatica, analise de sentimentos, deteccao de spam, ChatGPT.',
    },
    {
      type: 'text',
      content: '## Pipeline Classico de NLP\n\n**1. Tokenizacao** — quebrar texto em unidades (tokens)\n\n**2. Normalizacao** — lowercase, remover pontuacao\n\n**3. Stopwords** — remover palavras sem significado ("o", "a", "de")\n\n**4. Stemming/Lemmatization** — forma base da palavra\n- Stemming: "correndo" → "corr"\n- Lemmatization: "correndo" → "correr"\n\n**5. Vetorizacao** — converter texto em numeros (Bag of Words, TF-IDF, Embeddings)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import re, math\n\ndef preprocessar(texto):\n    texto = texto.lower()\n    texto = re.sub(r\'[^a-z0-9\\s]\', \'\', texto)\n    tokens = texto.split()\n    stopwords = {\'o\', \'a\', \'de\', \'e\', \'que\', \'em\', \'um\', \'para\'}\n    return [t for t in tokens if t not in stopwords]\n\ntexto = "O Machine Learning e uma area fascinante da Inteligencia Artificial!"\ntokens = preprocessar(texto)\nprint("Tokens:", tokens)\n\n# TF-IDF simplificado\ndef tf(termo, doc): return doc.count(termo) / len(doc)\ndef idf(termo, docs): return math.log(len(docs) / (1 + sum(1 for d in docs if termo in d)))\n\ndocs = [\n    preprocessar("Machine Learning e incrivel"),\n    preprocessar("Deep Learning usa redes neurais"),\n    preprocessar("Machine e Deep Learning sao areas de IA")\n]\n\nfor termo in [\'machine\', \'learning\', \'deep\']:\n    val = tf(termo, docs[2]) * idf(termo, docs)\n    print(f"TF-IDF \'{termo}\': {val:.4f}")',
        filename: 'nlp_basico.py',
        description: 'Preprocessamento de texto e calculo de TF-IDF do zero.',
      },
    },
    {
      type: 'text',
      content: '## Word Embeddings\n\nRepresentar palavras como **vetores numericos** onde palavras similares ficam proximas:\n\n```\nvec("rei") - vec("homem") + vec("mulher") = vec("rainha")\n```\n\n**Word2Vec (2013)** — Google. Embeddings de bilhoes de palavras.\n\n**BERT (2018)** — Embeddings contextuais: "banco" tem vetor diferente em contextos diferentes.\n\n**GPT/LLMs** — Base do ChatGPT, treinados em praticamente toda a internet.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import classification_report\n\nreviews = [\n    "Produto excelente, adorei!", "Pessimo, nao recomendo",\n    "Muito bom, chegou rapido", "Horrivel, veio quebrado",\n    "Superou minhas expectativas", "Qualidade ruim",\n    "Otimo custo beneficio", "Decepcionante",\n    "Comprarei de novo!", "Perda de dinheiro",\n]\nsentimentos = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0]\n\nvetorizador = TfidfVectorizer(ngram_range=(1, 2))\nX = vetorizador.fit_transform(reviews)\n\nX_tr, X_te, y_tr, y_te = train_test_split(X, sentimentos, test_size=0.3)\nclf = LogisticRegression().fit(X_tr, y_tr)\n\nprint(classification_report(y_te, clf.predict(X_te),\n      target_names=[\'Negativo\', \'Positivo\']))',
        filename: 'analise_sentimentos.py',
        description: 'Classificador de sentimentos com TF-IDF.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Para NLP em portugues: use spaCy com modelo pt_core_news_sm, NLTK com corpus em portugues, ou a biblioteca NILC para recursos academicos brasileiros.',
    },
  ],
};
