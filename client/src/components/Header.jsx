import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const { t } = useTranslation();

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 text-white p-6 text-center"
    >
      <h1 className="text-3xl font-bold">{t('header.title')}</h1>
      <LanguageSelector />
    </motion.header>
  );
};

export default Header;