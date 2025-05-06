import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styles from './Highlights.module.css';

const Highlights = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.section}
      id="highlights-section"
    >
      <h2 className={styles.title}>{t('highlights.title')}</h2>
      <ul className={styles.list}>
        {t('highlights.items', { returnObjects: true }).map((item, index) => (
          <li key={index} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </motion.section>
  );
};

export default Highlights;