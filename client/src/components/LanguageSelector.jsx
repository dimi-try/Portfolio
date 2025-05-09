import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import styles from './LanguageSelector.module.css';
import { useEffect, useState } from 'react';
import { changeLanguage } from '../i18n'; // Импортируем новую функцию

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  console.log('Текущий язык в селекторе:', i18n.language);

  const options = [
    { value: 'en', label: 'English' },
    { value: 'ru', label: 'Русский' },
    { value: 'sl', label: 'Slovenščina' },
    { value: 'sr', label: 'Српски' },
    { value: 'hr', label: 'Hrvatski' },
    { value: 'cnr', label: 'Crnogorski' },
  ];

  const handleChange = async (selected) => {
    const newLang = selected.value;
    console.log(`Выбран новый язык: ${newLang}`);
    if (newLang !== i18n.language) {
      setSelectedLang(newLang);
      await changeLanguage(newLang); // Используем новую функцию
      console.log(`Переключили на ${newLang}`);
    } else {
      console.log(`Язык ${newLang} уже активен, пропускаем`);
    }
  };

  // Синхронизируем селектор с i18n
  useEffect(() => {
    console.log(`Синхронизируем селектор с языком i18n: ${i18n.language}`);
    setSelectedLang(i18n.language);
  }, [i18n.language]);

  return (
    <div className={styles.container}>
      <Select
        options={options}
        onChange={handleChange}
        value={options.find((opt) => opt.value === selectedLang)}
        placeholder={t('header.languageSelector')}
        className={styles.select}
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default LanguageSelector;