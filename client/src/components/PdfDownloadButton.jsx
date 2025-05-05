import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { generatePDF } from '../utils/pdfGenerator';

const PdfDownloadButton = () => {
  const { t } = useTranslation();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={generatePDF}
      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
    >
      {t('downloadPDF')}
    </motion.button>
  );
};

export default PdfDownloadButton;