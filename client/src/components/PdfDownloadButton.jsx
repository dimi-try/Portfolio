import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { generatePDF } from '../utils/pdfGenerator';
import styles from './PdfDownloadButton.module.css';

const PdfDownloadButton = () => {
  const { t } = useTranslation();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={generatePDF}
      className={styles.button}
    >
      {t('downloadPDF')}
    </motion.button>
  );
};

export default PdfDownloadButton;