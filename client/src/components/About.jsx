import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';
import styles from './About.module.css';

const About = () => {
  const { t } = useTranslation();

  const aboutItems = t('about.items', { returnObjects: true });

  // Загружаем английское имя и сохраняем в localStorage
  useEffect(() => {
    const loadEnglishName = async () => {
      try {
        console.log('Загружаем английский перевод для имени...');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/translations/en`);
        const enTranslations = response.data;
        if (enTranslations?.about?.items?.[0]?.fullName) {
          const englishFullName = enTranslations.about.items[0].fullName;
          localStorage.setItem('englishFullName', englishFullName);
          console.log('Сохранено englishFullName в localStorage:', englishFullName);
        } else {
          console.warn('fullName не найдено в английском переводе');
        }
      } catch (error) {
        console.error('Ошибка загрузки английского перевода:', error);
      }
    };

    if (!localStorage.getItem('englishFullName')) {
      loadEnglishName();
    }
  }, []);

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