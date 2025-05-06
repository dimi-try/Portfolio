import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styles from './Experience.module.css';

const Experience = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.section}
      id="experience-section"
    >
      <h2 className={styles.title}>{t('experience.title')}</h2>
      {t('experience.items', { returnObjects: true }).map((exp, index) => (
        <div key={index} className={styles.item}>
          <h3 className={styles.company}>{exp.company}</h3>
          <p className={styles.role}>{exp.role}</p>
          <p className={styles.period}>{exp.period}</p>
          <p className={styles.description}>{exp.description}</p>
        </div>
      ))}
    </motion.section>
  );
};

export default Experience;