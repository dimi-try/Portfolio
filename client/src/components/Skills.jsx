import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styles from './Skills.module.css';

const Skills = () => {
  const { t, ready } = useTranslation();

  if (!ready) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.section}
        id="skills-section"
      >
        <h2 className={styles.title}>Loading...</h2>
      </motion.section>
    );
  }

  const items = t('skills.items', { returnObjects: true });
  const skillsItems = Array.isArray(items) ? items : [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.section}
      id="skills-section"
    >
      <h2 className={styles.title}>{t('skills.title')}</h2>
      {skillsItems.length > 0 ? (
        <div className={styles.skills}>
          {skillsItems.map((skill, index) => (
            <span key={index} className={styles.skill}>
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <p className={styles.empty}>No skills available.</p>
      )}
    </motion.section>
  );
};

export default Skills;