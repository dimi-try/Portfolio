import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styles from './Education.module.css';

const Education = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.section}
      id="education-section"
    >
      <h2 className={styles.title}>{t('education.title')}</h2>
      {t('education.items', { returnObjects: true }).map((edu, index) => (
        <div key={index} className={styles.item}>
          <h3 className={styles.institution}>{edu.institution}</h3>
          <p className={styles.specialty}>{edu.specialty}</p>
          <p className={styles.degree}>{edu.degree}</p>
          <p className={styles.period}>{edu.period}</p>
        </div>
      ))}
    </motion.section>
  );
};

export default Education;