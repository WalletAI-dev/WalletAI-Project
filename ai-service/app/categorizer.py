import joblib
import os
import string
from nltk.corpus import stopwords

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model', 'transaction_classifier.pkl')

class TransactionCategorizer:
    def __init__(self):
        """
        Carrega o pipeline do modelo treinado.
        Este método é chamado apenas uma vez quando a aplicação inicia.
        """
        try:
            self.model = joblib.load(MODEL_PATH)
            print("Modelo de categorização carregado com sucesso.")
        except FileNotFoundError:
            print(f"Erro: Arquivo do modelo não encontrado em {MODEL_PATH}.")
            print("Por favor, execute o script 'train.py' primeiro.")
            self.model = None

    def _preprocess_text(self, text: str) -> str:
        """
        Pré-processa o texto da mesma forma que foi feito no treinamento.
        É CRUCIAL que este passo seja idêntico ao do script de treino.
        """
        text = text.lower()
        text = ''.join([char for char in text if char not in string.punctuation])
        stop_words = set(stopwords.words('portuguese'))
        words = text.split()
        words = [word for word in words if word not in stop_words]
        return ' '.join(words)

    def predict(self, description: str) -> str:
        """
        Recebe uma descrição e retorna a categoria prevista.
        """
        if not self.model:
            return "Outros" # Retorna uma categoria padrão se o modelo não foi carregado

        # Pré-processa a descrição
        processed_description = self._preprocess_text(description)
        
        # O pipeline cuida da vetorização e predição
        prediction = self.model.predict([processed_description])
        
        return prediction[0]

# Instancia o categorizador para que seja carregado na inicialização do módulo
categorizer_instance = TransactionCategorizer()