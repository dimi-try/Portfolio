import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import axios from 'axios';

let supportedLngs = []; // Заполняем динамически

// Грузим список доступных языков
const loadSupportedLanguages = async () => {
  console.log('Пытаемся загрузить список доступных языков...');
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/translations/languages`);
    supportedLngs = response.data.map(lang => lang.code);
    console.log('Доступные языки:', supportedLngs);
    return supportedLngs;
  } catch (error) {
    console.error('Ошибка загрузки списка языков:', error);
    supportedLngs = ['en']; // Fallback на английский
    return supportedLngs;
  }
};

// Грузим переводы с бэкенда
const loadTranslations = async (lng) => {
  console.log(`Пытаемся загрузить перевод для языка: ${lng}`);
  try {
    if (!supportedLngs.includes(lng)) {
      console.log(`Язык ${lng} не поддерживается, возвращаем null`);
      return null;
    }
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/translations/${lng}`);
    console.log(`Перевод для ${lng} успешно загружен:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Ошибка загрузки перевода для ${lng}:`, error);
    return null;
  }
};

// Инициализация i18next
const initI18n = async () => {
  console.log('Запускаем инициализацию i18next...');
  // Сначала грузим список языков
  await loadSupportedLanguages();

  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      supportedLngs,
      fallbackLng: 'en', // Английский, если всё наебнулось
      interpolation: { escapeValue: false },
      resources: {}, // Пусто, заполняем потом
      load: 'languageOnly',
      detection: {
        order: ['localStorage', 'navigator'], // Сначала localStorage
        caches: ['localStorage'], // Сохраняем язык в localStorage
      },
    });

  // Берем начальный язык из localStorage или английский
  let initialLng = i18n.language || 'en';
  console.log(`Начальный язык: ${initialLng}`);
  if (!supportedLngs.includes(initialLng)) {
    console.log(`Язык ${initialLng} не поддерживается, берём английский`);
    initialLng = 'en';
  }

  // Грузим переводы
  let translations = await loadTranslations(initialLng);
  if (!translations) {
    console.log(`Не удалось загрузить перевод для ${initialLng}, берём английский`);
    translations = await loadTranslations('en');
    initialLng = 'en';
  }

  // Добавляем переводы в i18next
  console.log(`Добавляем перевод для ${initialLng} в i18next`);
  i18n.addResourceBundle(initialLng, 'translation', translations, true, true);
  console.log(`Переводы для ${initialLng} добавлены, переключаем язык`);
  await i18n.changeLanguage(initialLng);
};

// Экспортируем Promise для инициализации
export const initPromise = initI18n().catch(async (error) => {
  console.error('Бля, инициализация i18next наебнулась:', error);
  // Fallback: грузим английский
  const translations = await loadTranslations('en');
  i18n.addResourceBundle('en', 'translation', translations, true, true);
  await i18n.changeLanguage('en');
  console.log('Переключились на английский как fallback');
});

// Функция для смены языка
export const changeLanguage = async (lng) => {
  console.log(`Пытаемся переключить язык на: ${lng}`);
  if (!supportedLngs.includes(lng)) {
    console.log(`Язык ${lng} не поддерживается, переключаем на английский`);
    const translations = await loadTranslations('en');
    i18n.addResourceBundle('en', 'translation', translations, true, true);
    await i18n.changeLanguage('en');
    console.log('Переключились на английский как fallback');
    return;
  }

  if (i18n.hasResourceBundle(lng, 'translation')) {
    console.log(`Перевод для ${lng} уже есть, просто переключаем`);
    await i18n.changeLanguage(lng);
    return;
  }

  const translations = await loadTranslations(lng);
  if (translations) {
    console.log(`Добавляем перевод для ${lng} в i18next`);
    i18n.addResourceBundle(lng, 'translation', translations, true, true);
    await i18n.changeLanguage(lng);
    console.log(`Переводы для ${lng} загружены и применены`);
  } else {
    console.log(`Не удалось загрузить перевод для ${lng}, берём английский`);
    const enTranslations = await loadTranslations('en');
    i18n.addResourceBundle('en', 'translation', enTranslations, true, true);
    await i18n.changeLanguage('en');
    console.log('Переключились на английский как fallback');
  }
};

// Экспортируем supportedLngs для использования в других компонентах
export { supportedLngs, loadSupportedLanguages };

export default i18n;