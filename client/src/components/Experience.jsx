import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Experience = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white shadow-md rounded-lg mb-6"
      id="experience-section"
    >
      <h2 className="text-2xl font-bold mb-4">{t('experience.title')}</h2>
      {t('experience.items', { returnObjects: true }).map((exp, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-semibold">{exp.company}</h3>
          <p className="text-gray-600">{exp.role}</p>
          <p className="text-gray-500">{exp.period}</p>
          <p className="mt-2">{exp.description}</p>
        </div>
      ))}
    </motion.section>
  );
};

export default Experience;