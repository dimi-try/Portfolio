import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Highlights = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white shadow-md rounded-lg mb-6"
      id="highlights-section"
    >
      <h2 className="text-2xl font-bold mb-4">{t('highlights.title')}</h2>
      <ul className="list-disc pl-6">
        {t('highlights.items', { returnObjects: true }).map((item, index) => (
          <li key={index} className="mb-2">
            {item}
          </li>
        ))}
      </ul>
    </motion.section>
  );
};

export default Highlights;