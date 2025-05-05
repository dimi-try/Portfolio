import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const PortfolioModal = ({ project, onClose }) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-lg p-6 max-w-lg w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
          <img
            src={`/project${project.title.includes('E-Commerce') ? 1 : project.title.includes('Task') ? 2 : 3}.jpg`}
            alt={project.title}
            className="w-full h-48 object-cover rounded mb-4"
          />
          <p className="text-gray-700 mb-4">{project.details}</p>
          <p className="text-gray-500 mb-4">
            <strong>{t('portfolio.technologies')}:</strong> {project.technologies}
          </p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {project.link}
          </a>
          <button
            onClick={onClose}
            className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
          >
            {t('portfolio.close')}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PortfolioModal;