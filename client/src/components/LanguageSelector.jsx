import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import styles from './LanguageSelector.module.css';
import { useEffect, useState } from 'react';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const options = [
    { value: 'en', label: 'English' },
    { value: 'ru', label: 'Русский' },
    { value: 'sl', label: 'Slovenščina' },
    { value: 'sr', label: 'Српски' },
    { value: 'hr', label: 'Hrvatski' },
    { value: 'cnr', label: 'Crnogorski' },
  ];

  const handleChange = (selected) => {
    const newLang = selected.value;
    setSelectedLang(newLang);
    i18n.changeLanguage(newLang);
  };

  // Синхронизация с i18n.language
  useEffect(() => {
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