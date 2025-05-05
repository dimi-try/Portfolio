import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Skills = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white shadow-md rounded-lg mb-6"
      id="skills-section"
    >
      <h2 className="text-2xl font-bold mb-4">{t('skills.title')}</h2>
      <div className="flex flex-wrap gap-2">
        {t('skills.items', { returnObjects: true }).map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.section>
  );
};

export default Skills;