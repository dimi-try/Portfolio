## 🛠 Используемые технологии

[![Technologies](https://skillicons.dev/icons?i=py,fastapi,js,react,html,css,postgres)](https://skillicons.dev)

## 📂 Структура проекта

```sh
Portfolio/
│
├── .github/
│   └── workflows/
│       └── docker-deploy.yml               # CI/CD: деплой Docker-контейнера
│
├──  client/
│    ├── public/                            # Статические файлы, доступные напрямую
│    │   └── vite.svg                       # Иконка vite
│    ├── src/                               # Исходный код приложения
│    │   ├── assets/                        # Статические ресурсы (изображения, шрифты)
│    │   │   ├── projects/
│    │   │   │   ├── project1.jpg           # Изображение для портфолио (проект 1)
│    │   │   │   ├── project2.jpg           # Изображение для портфолио (проект 2)
│    │   │   │   └── project3.jpg           # Изображение для портфолио (проект 3)
│    │   │   └── resume-bg.jpg              # Фоновое изображение (для стилизации)
│    │   ├── components/                    # Переиспользуемые компоненты
│    │   │   └── ...             
│    │   ├── pages/                         # Страницы приложения
│    │   │   └── ...             
│    │   ├── styles/                        # Глобальные стили
│    │   │   └── index.css                  # Основные стили, темы, переменные
│    │   ├── utils/                         # Утилиты и вспомогательные функции
│    │   │   ├── api.js                     # Функции для запросов к backend
│    │   │   └── pdfGenerator.js            # Логика генерации PDF
│    │   ├── App.jsx                        # Главный компонент приложения
│    │   ├── i18n.js                        # Конфигурация i18next для мультиязычности
│    │   └── main.jsx                       # Точка входа для React
│    ├── .dockerignore                      # Исключения для сборки контейнера
│    ├── .env.sample                        # Пример файла с переменными окружения
│    ├── .prettierrc                        # Настройки Prettier для форматирования
│    ├── docker-compose.yml                 # Docker Compose конфигурация
│    ├── Dockerfile                         # Docker конфигурация
│    ├── eslint.config.json                 # Настройки ESLint для линтинга кода
│    ├── index.html                         # Точка входа, рендер React-приложения
│    ├── nginx.conf                         # Конфиг Nginx для продакшн-сервера
│    ├── package-lock.json                   
│    ├── package.json                       # Зависимости и скрипты проекта
│    ├── tailwind.config.js                 # Конфигурация Tailwind CSS
│    └── vite.config.js                     # Конфигурация Vite
│
│    ├── server/                    
│    │   ├── app/                   
│    │   │   ├── translations/   
│    │   │   │   ├── cnr/                   # Montenegrin 
│    │   │   │   │   └── translation.json       
│    │   │   │   ├── en/                    # English 
│    │   │   │   │   └── translation.json
│    │   │   │   ├── hr/                    # Croatian 
│    │   │   │   │   └── translation.json
│    │   │   │   ├── ru/                    # Russian 
│    │   │   │   │   └── translation.json
│    │   │   │   ├── sl/                    # Slovenian 
│    │   │   │   │   └── translation.json
│    │   │   │   ├── sr/                    # Serbian 
│    │   │   │   │   └── translation.json
│    │   │   │   └── uk/                    # Ukrainian 
│    │   │   │       └── translation.json
│    │   │   ├── __init.py__
│    │   │   └── main.py 
│    │   ├── .dockerignore                  # Исключения для сборки контейнера
│    │   ├── .env.sample                    # Пример файла с переменными окружения
│    │   ├── docker-compose.yml             # Docker Compose конфигурация
│    │   ├── Dockerfile                     # Docker конфигурация
│    │   └── requirements.txt               # Python зависимости
│
├── .env.example                            # Пример файла переменных окружения для сервера
├── .gitignore                              # Git-игнорируемые файлы
├── docker-compose-server.yml               # Пример Docker Compose конфигурации для сервера
└── README.md                               # Документация проекта
```

---
## ⚡ Установка и запуск

### 1️⃣ Подготовка окружения

#### 📋 Настройка .env
Скопируйте `.env.sample`, переименуйте в `.env` и добавьте свои данные.

#### 🔧 Backend Создание виртуального окружения

Заходим в папку server
```bash
cd server
```

Создание 
```bash
python -m venv venv
```

#### 📌 Backend Установка зависимостей
```bash
pip install -r requirements.txt
```

#### 📥 Frontend Установка зависимостей  

Заходим в папку client, если вы в Portfolio
```bash
cd client
```
или если вы в папке server, то
```bash
cd ../client
```

```sh
npm install
```

### 2️⃣ Запуск

#### 🚀 Backend Запуск 
Заходим в папку server, если вы в Portfolio
```bash
cd server
```
или если вы в папке client, то
```bash
cd ../server
```

Активация виртуального окружения
```bash
venv\Scripts\activate  # Windows
```
```bash
source venv/bin/activate  # Linux/macOS
```

```bash
uvicorn app.main:app --reload
```

API будет доступно по адресу:  
📍 `http://localhost:8000`

#### 🚀 Frontend Запуск 

```sh
npm run dev
```

Приложение будет доступно по адресу:  
📍 `http://localhost:5173/`

---

## 🌍 Деплой

Доступны два способа:

### Вариант 1: Docker Compose вручную

1.  Проверьте `.env` и `docker-compose.yml` каждого образа из папок `/server` и `/client`
    
2.  Выполните сборку каждого образа из папок `/server` и `/client` и пуш:
    
```sh
docker compose build
```
```sh
docker compose up -d
```
```sh
docker push <your-dockerhub>
```

### Вариант 2: Автоматически через GitHub Actions

1.  В файле `.github/workflows/docker-deploy.yml` уже всё готово
    
2.  Перейдите в:  
    `GitHub → Settings → Secrets and variables → Actions`
    
3.  Добавьте переменные окружения (как `VITE_API_URL`, `DOCKERHUB_USERNAME` и т.д.)
    
4.  При пуше в `main` ветку произойдёт автоматическая сборка и публикация образа в DockerHub
    

На прод-сервере можете использовать `docker-compose-server.yml`. Скопируйте `.env.example`, переименуйте в `.env` и добавьте свои данные.

---
## ⚠️ Важные примечания по использованию проекта

В папке `client/src/assets/projects/` картинки должны называться строго по шаблону: `project<ID>.jpg`.

Пример из `/server/app/translations/en/translation.json`:

```json
"portfolio": {
  "projects": [
    {
      "id": "1", // будет использовать project1.jpg
      ...
    },
    {
      "id": "2", // будет использовать project2.jpg
      ...
    }
  ]
}

```

### Добавление перевода

1.  Создайте папку `server/app/translations/<код_языка>`
    
2.  Скопируйте туда `translation.json` из `en`
    
3.  Отредактируйте значения, сохранив структуру.

---

## 🛠 Полезные команды

### Backend
📌 **Просмотр установленных зависимостей**
```bash
pip list
```

💾 **Сохранение зависимостей**
```bash
pip freeze > requirements.txt
```

🗑 **Удаление всех зависимостей**
```bash
pip uninstall -y -r requirements.txt
```

🧹 **Удаление виртуального окружения venv**
```powershell
Get-ChildItem -Path . -Recurse -Directory -Filter "venv" | Remove-Item -Recurse -Force #windows
```

🧹 **Удаление кеша pycache**
```powershell
Get-ChildItem -Recurse -Directory -Include "__pycache__", ".mypy_cache", ".pytest_cache" | Remove-Item -Recurse -Force #windows
Get-ChildItem -Recurse -Include *.pyc | Remove-Item -Force #windows
```


### Frontend
##### 📌 Установка зависимостей  
```sh
npm install
```
##### 🚀 Запуск в продакшене  
```sh
npm run build
```
##### 🔄 Линтинг кода  
```sh
npm run lint
```
##### 🧹 Очистка кэша  
```sh
npm cache clean --force
```
##### 🗑 Очистка node_modules  
```sh
Get-ChildItem -Path . -Recurse -Directory -Filter "node_modules" | Remove-Item -Recurse -Force #windows
```
---

💡 **Если у вас есть вопросы или предложения по улучшению проекта, создайте issue!** 🚀