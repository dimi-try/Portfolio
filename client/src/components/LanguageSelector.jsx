import { useTranslation } from 'react-i18next';
import Select from 'react-select';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const options = [
    { value: 'en', label: 'English' },
    { value: 'ru', label: 'Русский' },
    { value: 'sl', label: 'Slovenščina' },
    { value: 'sr', label: 'Српски' },
    { value: 'hr', label: 'Hrvatski' },
    { value: 'cnr', label: 'Crnogorski' },
  ];

  const handleChange = (selected) => {
    i18n.changeLanguage(selected.value);
  };

  return (
    <div className="mt-4 max-w-xs mx-auto">
      <Select
        options={options}
        onChange={handleChange}
        value={options.find((opt) => opt.value === i18n.language)}
        placeholder={t('header.languageSelector')}
        className="text-black"
      />
    </div>
  );
};

export default LanguageSelector;