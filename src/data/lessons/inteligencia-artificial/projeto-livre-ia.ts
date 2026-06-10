import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-livre-ia',
  moduleId: 'inteligencia-artificial',
  title: 'Projeto Livre: Seu Modelo de IA',
  description: 'Aplique tudo que aprendeu criando seu proprio projeto de IA — escolha um problema real e resolva com ML.',
  order: 11,
  type: 'guided-project',
  estimatedMinutes: 90,
  sections: [
    {
      type: 'text',
      content:
        '## Seu Projeto de IA\n\nChegou a hora de criar algo seu. Escolha um problema que te interessa e aplique as tecnicas que aprendeu neste modulo.\n\n**Ideias de projetos:**\n\n**Iniciante:**\n- Classificador de flores (Iris dataset)\n- Prever sobrevivencia no Titanic\n- Reconhecer digitos escritos a mao (MNIST)\n\n**Intermediario:**\n- Analise de sentimentos de reviews de produtos brasileiros\n- Classificador de genero musical por letra\n- Detector de emocoes em textos de redes sociais\n- Prever preco de imoveis usando dados do IBGE\n\n**Avancado:**\n- Detector de fake news em portugues\n- Classificacao de doencas em plantas por imagem\n- Sistema de recomendacao de cursos\n- Chatbot de perguntas frequentes com NLP',
    },
    {
      type: 'text',
      content:
        '## Roteiro do Projeto\n\nSiga este roteiro para garantir um projeto completo:\n\n**1. Definicao do Problema (10%)**\n- Qual pergunta quero responder?\n- E classificacao, regressao ou outro?\n- Como vou medir sucesso?\n\n**2. Coleta e Exploracao de Dados (20%)**\n- Encontrar dataset adequado (Kaggle, UCI, datasets brasileiros)\n- Analise exploratoria: distribuicoes, valores nulos, outliers\n- Visualizacoes para entender os dados\n\n**3. Preprocessamento (20%)**\n- Lidar com dados faltantes\n- Encoding de variaveis categoricas\n- Normalizacao/padronizacao\n- Feature engineering\n\n**4. Modelagem (25%)**\n- Testar ao menos 3 algoritmos diferentes\n- Validacao cruzada\n- Tuning de hiperparametros\n\n**5. Avaliacao (15%)**\n- Metricas adequadas ao problema\n- Analise de erros: onde o modelo falha?\n- Analise de fairness se aplicavel\n\n**6. Comunicacao (10%)**\n- README claro no GitHub\n- Conclusoes e aprendizados',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `# Template inicial para seu projeto
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report

# ========================================
# 1. CARREGAMENTO DE DADOS
# ========================================
# Substitua pelo seu dataset
# df = pd.read_csv('seu_dataset.csv')
# ou use datasets do scikit-learn:
from sklearn.datasets import load_wine
dados = load_wine()
df = pd.DataFrame(dados.data, columns=dados.feature_names)
df['target'] = dados.target

print("Shape:", df.shape)
print("\nPrimeiras linhas:")
print(df.head())

# ========================================
# 2. ANALISE EXPLORATORIA
# ========================================
print("\nEstatisticas descritivas:")
print(df.describe())

print("\nValores nulos:")
print(df.isnull().sum())

print("\nDistribuicao do target:")
print(df['target'].value_counts())

# ========================================
# 3. PREPROCESSAMENTO E MODELAGEM
# ========================================
X = df.drop('target', axis=1)
y = df['target']

X_treino, X_teste, y_treino, y_teste = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Adicione seus modelos aqui!
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier

modelos = {
    'Random Forest': RandomForestClassifier(n_estimators=100),
    'SVM': SVC(kernel='rbf'),
    'KNN': KNeighborsClassifier(n_neighbors=5),
}

print("\n=== Comparacao de Modelos ===")
for nome, modelo in modelos.items():
    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('clf', modelo)
    ])
    scores = cross_val_score(pipeline, X, y, cv=5, scoring='accuracy')
    print(f"{nome}: {scores.mean():.3f} (+/- {scores.std():.3f})")`,
        filename: 'projeto_template.py',
        description: 'Template completo para comecar seu projeto de ML do zero.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Onde encontrar datasets: Kaggle (kaggle.com/datasets), UCI ML Repository, dados.gov.br (dados brasileiros oficiais), IBGE, Hugging Face Datasets. Para NLP em portugues, procure o corpus MacMorpho, Hateval-PT ou datasets do NILC (USP).',
    },
  ],
};
