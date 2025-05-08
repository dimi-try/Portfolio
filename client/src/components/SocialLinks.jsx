import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaGithub, FaEnvelope, FaTelegram } from 'react-icons/fa';
import styles from './SocialLinks.module.css';

const SocialLinks = () => {
  const { t, ready } = useTranslation();

  if (!ready) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.section}
        id="social-links-section"
      >
        <h2 className={styles.title}>Loading...</h2>
      </motion.section>
    );
  }

  const links = [
    {
      name: 'GitHub',
      url: import.meta.env.VITE_GITHUB_URL,
      icon: <FaGithub className={styles.icon} />,
    },
    {
      name: 'Email',
      url: import.meta.env.VITE_EMAIL_ADDRESS,
      icon: <FaEnvelope className={styles.icon} />,
    },
    {
      name: 'Telegram',
      url: import.meta.env.VITE_TELEGRAM_URL,
      icon: <FaTelegram className={styles.icon} />,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.section}
      id="social-links-section"
    >
      <h2 className={styles.title}>{t('social.title')}</h2>
      <div className={styles.links}>
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {link.icon}
            <span>{link.name}</span>
          </a>
        ))}
      </div>
    </motion.section>
  );
};

export default SocialLinks;