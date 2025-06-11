import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PortfolioModal.module.css';

const PortfolioModal = ({ project, onClose }) => {
  const { t } = useTranslation();
  const [isImageError, setIsImageError] = useState(false);

  const imageSrc = `/project${project.id}.jpg`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.overlay}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className={styles.title}>{project.title}</h3>

          <div className={styles.imageContainer}>
            {!isImageError ? (
              <img
                src={imageSrc}
                alt={project.title}
                className={styles.image}
                onError={() => setIsImageError(true)}
              />
            ) : (
              <div className={styles.placeholder}>
                No Image Available ({imageSrc})
              </div>
            )}
          </div>

          <p className={styles.details}>{project.details}</p>
          <p className={styles.technologies}>
            <strong>{t('portfolio.technologies')}:</strong> {project.technologies}
          </p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {project.link}
          </a>
          <button onClick={onClose} className={styles.closeButton}>
            {t('portfolio.close')}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PortfolioModal;
