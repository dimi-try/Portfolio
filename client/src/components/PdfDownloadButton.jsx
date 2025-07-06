import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { generatePDF } from '../utils/pdfGenerator';
import styles from './PdfDownloadButton.module.css';

const PdfDownloadButton = () => {
  const { t } = useTranslation();

  const handleDownloadWithoutProjects = () => {
    generatePDF({ includeImages: true, excludeProjects: true });
  };

  const handleDownloadWithImages = () => {
    generatePDF({ includeImages: true, excludeProjects: false });
  };

  const handleDownloadWithoutImages = () => {
    generatePDF({ includeImages: false, excludeProjects: false });
  };

  return (
    <div className={styles.buttonContainer}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleDownloadWithoutProjects}
        className={styles.button}
        title={t('pdfDownload.withoutProjects')}
      >
        {t('pdfDownload.withoutProjects')}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleDownloadWithImages}
        className={styles.button}
        title={t('pdfDownload.withImages')}
      >
        {t('pdfDownload.withImages')}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleDownloadWithoutImages}
        className={styles.button}
        title={t('pdfDownload.withoutImages')}
      >
        {t('pdfDownload.withoutImages')}
      </motion.button>
    </div>
  );
};

export default PdfDownloadButton;