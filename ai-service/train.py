import pandas as pd
import nltk
import string
import joblib
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score
import os

# --- Pré-requisitos NLTK ---
# Baixar as stopwords (palavras comuns como 'e', 'ou', 'de')
try:
    stopwords.words('portuguese')
except LookupError:
    print("Baixando stopwords do NLTK...")
    nltk.download('stopwords')
    print("Download concluído.")

# --- Constantes ---
TRAIN_DATA_PATH = 'train_data.csv'
MODEL_DIR = 'app/model'
VECTORIZER_PATH = os.path.join(MODEL_DIR, 'tfidf_vectorizer.pkl')
MODEL_PATH = os.path.join(MODEL_DIR, 'transaction_classifier.pkl')

# --- Funções ---
def preprocess_text(text):
    """Função para pré-processar o texto: minúsculas, remove pontuação e stopwords."""
    # Converte para minúsculas
    text = text.lower()
    # Remove pontuação
    text = ''.join([char for char in text if char not in string.punctuation])
    # Remove stopwords
    stop_words = set(stopwords.words('portuguese'))
    words = text.split()
    words = [word for word in words if word not in stop_words]
    return ' '.join(words)

def train_model():
    """Função principal para carregar os dados, treinar e salvar o modelo."""
    print("Iniciando o treinamento do modelo...")

    # 1. Carregar os dados
    if not os.path.exists(TRAIN_DATA_PATH):
        print(f"Erro: Arquivo de dados '{TRAIN_DATA_PATH}' não encontrado.")
        return
    
    df = pd.read_csv(TRAIN_DATA_PATH)
    print(f"Dados carregados: {len(df)} amostras.")

    # 2. Pré-processar a coluna de descrição
    df['processed_description'] = df['description'].apply(preprocess_text)

    # 3. Dividir dados em treino e teste
    X = df['processed_description']
    y = df['category']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    # 4. Criar e treinar o pipeline
    # O pipeline combina a vetorização e a classificação em um único passo
    pipeline = Pipeline([
        ('vectorizer', TfidfVectorizer()),
        ('classifier', MultinomialNB())
    ])

    print("Treinando o pipeline...")
    pipeline.fit(X_train, y_train)

    # 5. Avaliar o modelo
    y_pred = pipeline.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Acurácia do modelo nos dados de teste: {accuracy:.2f}")

    # 6. Salvar o pipeline treinado
    if not os.path.exists(MODEL_DIR):
        os.makedirs(MODEL_DIR)
        
    joblib.dump(pipeline, MODEL_PATH)
    print(f"Modelo salvo em: {MODEL_PATH}")

    print("Treinamento concluído com sucesso!")


if __name__ == '__main__':
    train_model()