import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styles from './About.module.css';

const About = () => {
  const { t } = useTranslation();

  const aboutItems = t('about.items', { returnObjects: true });

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.section}
      id="about-section"
    >
      <h2 className={styles.title}>{t('about.title')}</h2>
      {aboutItems.map((item, index) => (
        <div key={index} className={styles.item}>
          <h3 className={styles.fullName}>{item.fullName}</h3>
          <p className={styles.profession}>{item.profession}</p>
          <p className={styles.description}>{item.description}</p>
        </div>
      ))}
    </motion.section>
  );
};

export default About;