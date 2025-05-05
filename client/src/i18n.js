import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en/translation.json';
// import ru from './locales/ru/translation.json';
// import sl from './locales/sl/translation.json';
import sr from './locales/sr/translation.json';
// import hr from './locales/hr/translation.json';
// import cnr from './locales/cnr/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      // ru: { translation: ru },
      // sl: { translation: sl },
      sr: { translation: sr },
      // hr: { translation: hr },
      // cnr: { translation: cnr },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;