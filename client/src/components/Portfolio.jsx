import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PortfolioModal from './PortfolioModal';

const Portfolio = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = t('portfolio.projects', { returnObjects: true });

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white shadow-md rounded-lg mb-6"
      id="portfolio-section"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        {t('portfolio.title')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 rounded-lg overflow-hidden shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedProject(project)}
          >
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={`/project${index + 1}.jpg`}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                {project.technologies}
              </p>
              <button
                className="mt-4 text-blue-600 hover:underline"
                onClick={() => setSelectedProject(project)}
              >
                {t('portfolio.viewDetails')}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedProject && (
        <PortfolioModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </motion.section>
  );
};

export default Portfolio;