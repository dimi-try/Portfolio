import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { generatePDF } from '../utils/pdfGenerator';
import styles from './PdfDownloadButton.module.css';

const PdfDownloadButton = () => {
  const { t } = useTranslation();

  const handleDownloadWithImages = () => {
    generatePDF({ includeImages: true });
  };

  const handleDownloadWithoutImages = () => {
    generatePDF({ includeImages: false });
  };

  return (
    <div className={styles.buttonContainer}>
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