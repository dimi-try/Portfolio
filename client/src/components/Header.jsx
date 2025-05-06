import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import LanguageSelector from './LanguageSelector';
import styles from './Header.module.css';
import { useState } from 'react';

const Header = () => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.header}
    >
      <h1 className={styles.title}>{t('header.title')}</h1>
      <div className={styles.controls}>
        <LanguageSelector />
        <button onClick={toggleTheme} className={`${styles.themeToggle} no-print`}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </motion.header>
  );
};

export default Header;