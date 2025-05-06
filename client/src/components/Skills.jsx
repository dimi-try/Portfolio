import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styles from './Skills.module.css';

const Skills = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.section}
      id="skills-section"
    >
      <h2 className={styles.title}>{t('skills.title')}</h2>
      <div className={styles.skills}>
        {t('skills.items', { returnObjects: true }).map((skill, index) => (
          <span key={index} className={styles.skill}>
            {skill}
          </span>
        ))}
      </div>
    </motion.section>
  );
};

export default Skills;