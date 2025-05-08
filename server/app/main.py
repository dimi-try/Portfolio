from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path
from fastapi.responses import JSONResponse
import logging

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Путь к переводам
TRANSLATIONS_DIR = Path(__file__).parent / "translations"

@app.get("/api/translations/{lang}")
async def get_translations(lang: str):
    file_path = TRANSLATIONS_DIR / f"{lang}/translation.json"
    logger.info(f"Requesting translations for {lang} at {file_path}")
    
    if not file_path.exists():
        logger.error(f"Translations for {lang} not found")
        return JSONResponse(status_code=404, content={"error": f"Translations for {lang} not found"})
    
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            translations = json.load(f)
        logger.info(f"Successfully loaded translations for {lang}")
        return translations
    except json.JSONDecodeError as e:
        logger.error(f"Invalid JSON in {lang}.json: {str(e)}")
        return JSONResponse(status_code=500, content={"error": f"Invalid JSON in {lang}.json"})