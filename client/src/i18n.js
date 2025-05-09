import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import axios from 'axios';

const supportedLngs = ['en', 'sr', 'ru', 'sl', 'hr', 'cnr']; // Поддерживаемые языки

const loadTranslations = async (lng) => {
  try {
    // Проверяем, поддерживается ли язык
    if (!supportedLngs.includes(lng)) {
      return null; // Возвращаем null, чтобы переключиться на fallbackLng
    }
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/translations/${lng}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to load translations for ${lng}`, error);
    return null;
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs,
    fallbackLng: 'en', // Английский по умолчанию
    interpolation: { escapeValue: false },
    resources: {},
    load: 'languageOnly',
    detection: {
      order: ['localStorage', 'navigator'], // Сначала проверяем localStorage
      caches: ['localStorage'], // Сохраняем язык в localStorage
    },
  });

// Загружаем переводы при инициализации
const initializeTranslations = async () => {
  const lng = i18n.language || 'en'; // Берем язык из детектора или английский
  const translations = await loadTranslations(lng);
  if (translations) {
    i18n.addResourceBundle(lng, 'translation', translations, true, true);
  } else {
    i18n.changeLanguage('en'); // Переключаем на английский, если язык не поддерживается
    const enTranslations = await loadTranslations('en');
    i18n.addResourceBundle('en', 'translation', enTranslations, true, true);
  }
};

// Загружаем переводы при смене языка
i18n.on('languageChanged', async (lng) => {
  if (!supportedLngs.includes(lng)) {
    i18n.changeLanguage('en'); // Переключаем на английский, если язык не поддерживается
    return;
  }
  const translations = await loadTranslations(lng);
  if (translations) {
    i18n.addResourceBundle(lng, 'translation', translations, true, true);
  }
});

// Инициализация
initializeTranslations();

export default i18n;