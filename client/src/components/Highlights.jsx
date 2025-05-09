import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styles from './Highlights.module.css';

const Highlights = () => {
  const { t, ready } = useTranslation();

  if (!ready) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.section}
        id="highlights-section"
      >
        <h2 className={styles.title}>Loading...</h2>
      </motion.section>
    );
  }

  const items = t('highlights.items', { returnObjects: true });
  const highlightsItems = Array.isArray(items) ? items : [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.section}
      id="highlights-section"
    >
      <h2 className={styles.title}>{t('highlights.title')}</h2>
      {highlightsItems.length > 0 ? (
        <ul className={styles.list}>
          {highlightsItems.map((item, index) => (
            <li key={index} className={styles.item}>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>No highlights available.</p>
      )}
    </motion.section>
  );
};

export default Highlights;