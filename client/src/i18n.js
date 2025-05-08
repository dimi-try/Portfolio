import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import axios from 'axios';

const loadTranslations = async (lng) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/translations/${lng}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to load translations for ${lng}`, error);
    return {}; // Возвращаем пустой объект в случае ошибки
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    resources: {}, // Пустые ресурсы, загружаем динамически
    load: 'languageOnly',
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage', 'cookie'],
    },
    react: {
      useSuspense: false, // Отключаем Suspense для асинхронной загрузки
    },
  });

// Инициализация переводов
const initializeTranslations = async () => {
  const lng = i18n.language || 'en';
  const translations = await loadTranslations(lng);
  i18n.addResourceBundle(lng, 'translation', translations, true, true);
  i18n.changeLanguage(lng);
};

// Загрузка переводов при смене языка
i18n.on('languageChanged', async (lng) => {
  const translations = await loadTranslations(lng);
  i18n.addResourceBundle(lng, 'translation', translations, true, true);
});

// Запускаем инициализацию
initializeTranslations();

export default i18n;