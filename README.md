## 📂 Структура проекта

```sh
client/
├── public/                        # Статические файлы, доступные напрямую
│   ├── favicon.ico                # Иконка сайта
│   └── resume-bg.jpg              # Фоновое изображение (для стилизации)
├── src/                           # Исходный код приложения
│   ├── assets/                    # Статические ресурсы (изображения, шрифты)
│   │   ├── project1.jpg           # Изображение для портфолио (проект 1)
│   │   ├── project2.jpg           # Изображение для портфолио (проект 2)
│   │   └── project3.jpg           # Изображение для портфолио (проект 3)
│   ├── components/                # Переиспользуемые компоненты
│   │   ├── Header.jsx             # Шапка сайта с заголовком и переключателями
│   │   ├── Header.module.css      # Стили для шапки
│   │   ├── LanguageSelector.jsx   # Селектбокс для выбора языка
│   │   ├── LanguageSelector.module.css  # Стили для селектбокса
│   │   ├── Highlights.jsx         # Секция достижений
│   │   ├── Highlights.module.css  # Стили для достижений
│   │   ├── Experience.jsx         # Секция опыта работы
│   │   ├── Experience.module.css  # Стили для опыта
│   │   ├── Skills.jsx             # Секция навыков
│   │   ├── Skills.module.css      # Стили для навыков
│   │   ├── Portfolio.jsx          # Секция портфолио с карточками
│   │   ├── Portfolio.module.css   # Стили для портфолио
│   │   ├── PortfolioModal.jsx     # Модальное окно для деталей проекта
│   │   ├── PortfolioModal.module.css  # Стили для модалки
│   │   ├── ContactForm.jsx        # Форма для отправки сообщений
│   │   ├── ContactForm.module.css # Стили для формы
│   │   ├── PdfDownloadButton.jsx  # Кнопка для скачивания PDF
│   │   └── PdfDownloadButton.module.css  # Стили для кнопки
│   ├── pages/                     # Страницы приложения
│   │   ├── Home.jsx               # Главная страница, собирает все компоненты
│   │   └── Home.module.css        # Стили для главной страницы
│   ├── locales/                   # Файлы переводов для мультиязычности
│   │   ├── en/                    # Переводы на английский
│   │   │   └── translation.json
│   │   ├── ru/                    # Переводы на русский
│   │   │   └── translation.json
│   │   ├── sl/                    # Переводы на словенский
│   │   │   └── translation.json
│   │   ├── sr/                    # Переводы на сербский
│   │   │   └── translation.json
│   │   ├── hr/                    # Переводы на хорватский
│   │   │   └── translation.json
│   │   └── cnr/                   # Переводы на черногорский
│   │       └── translation.json
│   ├── styles/                    # Глобальные стили
│   │   └── index.css              # Основные стили, темы, переменные
│   ├── utils/                     # Утилиты и вспомогательные функции
│   │   ├── api.js                 # Функции для запросов к backend
│   │   └── pdfGenerator.js        # Логика генерации PDF
│   ├── App.jsx                    # Главный компонент приложения
│   ├── main.jsx                   # Точка входа для React
│   └── i18n.js                    # Конфигурация i18next для мультиязычности
├── .eslintrc.json                 # Настройки ESLint для линтинга кода
├── .prettierrc                    # Настройки Prettier для форматирования
├── package.json                   # Зависимости и скрипты проекта
├── tailwind.config.js             # Конфигурация Tailwind CSS
├── vite.config.js                 # Конфигурация Vite
└── README.md                      # Документация проекта
```

---

## ⚡ Установка и запуск

#### 📌 Установка зависимостей
```bash
npm install
```

#### 🚀 Запуск
```bash
npm run dev
```

