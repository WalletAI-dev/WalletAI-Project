from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from .categorizer import categorizer_instance

# --- Inicialização da API ---
app = FastAPI(
    title="WalletAI - Serviço de Categorização",
    description="Uma API para categorizar transações financeiras usando Machine Learning.",
    version="1.0.0"
)

# --- Modelos de Dados (Pydantic) ---
# Modelo para o corpo da requisição
class CategorizeRequest(BaseModel):
    description: str

# Modelo para o corpo da resposta
class CategorizeResponse(BaseModel):
    category: str

# --- Endpoint ---
@app.post("/categorize", response_model=CategorizeResponse)
async def categorize_transaction(request: CategorizeRequest):
    """
    Recebe a descrição de uma transação e retorna a categoria mais provável.
    """
    if not request.description.strip():
        raise HTTPException(status_code=400, detail="A descrição não pode estar vazia.")

    # Utiliza a instância do categorizador que já carregou o modelo
    if not categorizer_instance.model:
        raise HTTPException(status_code=503, detail="Modelo não está disponível. Treine o modelo primeiro.")

    predicted_category = categorizer_instance.predict(request.description)
    
    return CategorizeResponse(category=predicted_category)


@app.get("/")
def read_root():
    return {"message": "WalletAI - AI Service está funcionando!"}