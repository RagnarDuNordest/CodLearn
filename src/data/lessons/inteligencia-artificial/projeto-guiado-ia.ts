import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-guiado-ia',
  moduleId: 'inteligencia-artificial',
  title: 'Projeto: Classificador de Spam com ML',
  description: 'Construa um detector de spam completo: preprocessamento, treinamento, avaliacao e deploy — passo a passo.',
  order: 10,
  type: 'guided-project',
  estimatedMinutes: 60,
  sections: [
    {
      type: 'text',
      content:
        '## O Projeto\n\nVamos construir um **classificador de spam de emails** completo, aplicando tudo que aprendemos:\n\n1. Preprocessamento de texto (NLP)\n2. Vetorizacao com TF-IDF\n3. Treinamento de multiplos modelos\n4. Avaliacao e selecao do melhor\n5. Pipeline completo para novas mensagens\n\nEste e um projeto classico de ML e aparece com frequencia em entrevistas e trabalhos academicos.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `# ===== ETAPA 1: Dados e Preprocessamento =====
import pandas as pd
import numpy as np
import re
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report, confusion_matrix

# Dataset simulado (em producao, use o SMS Spam Collection do UCI)
emails = [
    ("GANHE R$ 5000 AGORA CLIQUE AQUI", "spam"),
    ("Ola, podemos marcar a reuniao?", "ham"),
    ("Voce ganhou iPhone GRATIS enviando seu CPF", "spam"),
    ("Arquivo em anexo conforme solicitado", "ham"),
    ("URGENTE: sua conta sera bloqueada, clique aqui", "spam"),
    ("Bom dia, vi seu email sobre o projeto", "ham"),
    ("Premio especial esperando por voce", "spam"),
    ("Confirma presenca na reuniao de segunda?", "ham"),
    ("Oferta exclusiva apenas hoje 90% desconto", "spam"),
    ("Segue o relatorio mensal em anexo", "ham"),
    ("Ganhe dinheiro trabalhando em casa", "spam"),
    ("Obrigado pelo retorno, ate logo", "ham"),
]

df = pd.DataFrame(emails, columns=['texto', 'label'])
df['label_num'] = (df['label'] == 'spam').astype(int)

print("Distribuicao:")
print(df['label'].value_counts())`,
        filename: 'spam_classifier.py',
        description: 'Etapa 1: carregamento e exploracao dos dados.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `# ===== ETAPA 2: Preprocessamento =====
def preprocessar_texto(texto):
    texto = texto.lower()
    texto = re.sub(r'http\S+', 'URL', texto)      # substituir URLs
    texto = re.sub(r'\d+', 'NUM', texto)           # substituir numeros
    texto = re.sub(r'[^a-z\s]', '', texto)         # remover pontuacao
    texto = re.sub(r'\s+', ' ', texto).strip()     # espacos duplos
    return texto

df['texto_limpo'] = df['texto'].apply(preprocessar_texto)
print(df[['texto', 'texto_limpo']].head())

# ===== ETAPA 3: Pipeline de ML =====
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.svm import LinearSVC

X = df['texto_limpo']
y = df['label_num']

X_treino, X_teste, y_treino, y_teste = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y
)

# Comparar 3 modelos com Pipeline
modelos = {
    'Naive Bayes': MultinomialNB(),
    'Regressao Logistica': LogisticRegression(max_iter=1000),
    'SVM Linear': LinearSVC(),
}

resultados = {}
for nome, modelo in modelos.items():
    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(ngram_range=(1,2), max_features=5000)),
        ('clf', modelo)
    ])
    scores = cross_val_score(pipeline, X, y, cv=3, scoring='f1')
    resultados[nome] = scores.mean()
    print(f"{nome}: F1 = {scores.mean():.3f} (+/- {scores.std():.3f})")`,
        filename: 'spam_classifier.py',
        description: 'Etapa 2-3: preprocessamento e comparacao de modelos com Pipeline.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `# ===== ETAPA 4: Treinar e Avaliar o Melhor Modelo =====
import pickle

# Escolher o melhor modelo
melhor_modelo = max(resultados, key=resultados.get)
print(f"Melhor modelo: {melhor_modelo}")

pipeline_final = Pipeline([
    ('tfidf', TfidfVectorizer(ngram_range=(1,2), max_features=5000)),
    ('clf', LogisticRegression(max_iter=1000))
])
pipeline_final.fit(X_treino, y_treino)

y_pred = pipeline_final.predict(X_teste)
print("\nRelatorio de Classificacao:")
print(classification_report(y_teste, y_pred, target_names=['Ham', 'Spam']))

# ===== ETAPA 5: Deploy — Classificar novos emails =====
def classificar_email(texto):
    texto_processado = preprocessar_texto(texto)
    predicao = pipeline_final.predict([texto_processado])[0]
    prob = pipeline_final.predict_proba([texto_processado])[0] if hasattr(pipeline_final['clf'], 'predict_proba') else None
    return 'SPAM' if predicao == 1 else 'HAM'

# Testar
testes = [
    "Sua conta bancaria foi comprometida, acesse agora",
    "Posso te ligar mais tarde para discutir o projeto?",
    "PARABENS voce foi selecionado para premio especial",
]

print("\n=== Classificacoes ===")
for email in testes:
    resultado = classificar_email(email)
    print(f"[{resultado}] {email[:50]}...")

# Salvar modelo
with open('spam_model.pkl', 'wb') as f:
    pickle.dump(pipeline_final, f)
print("\nModelo salvo em spam_model.pkl")`,
        filename: 'spam_classifier.py',
        description: 'Etapa 4-5: avaliacao final, classificacao de novos emails e salvamento do modelo.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Desafios extras: (1) Baixe o dataset real "SMS Spam Collection" do UCI ML Repository e treine com dados reais. (2) Adicione feature engineering: tamanho do email, presenca de URLs, proporcao de maiusculas. (3) Crie uma API Flask para receber emails e retornar a classificacao.',
    },
  ],
};
