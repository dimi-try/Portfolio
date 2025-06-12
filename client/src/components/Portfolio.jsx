import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PortfolioModal from './PortfolioModal';
import styles from './Portfolio.module.css';

// import.meta.glob с query
const imageImports = import.meta.glob(
  '/src/assets/projects/*.{jpg,png}',
  { eager: true, import: 'default', query: '?url' }
);

const Portfolio = () => {
  const { t, ready } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const images = useMemo(() => {
    const sortedKeys = Object.keys(imageImports).sort(); // сортируем по имени
    return sortedKeys.map((key) => imageImports[key]);
  }, []);

  if (!ready) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.section}
        id="portfolio-section"
      >
        <h2 className={styles.title}>Loading...</h2>
      </motion.section>
    );
  }

  const projects = t('portfolio.projects', { returnObjects: true });
  const portfolioProjects = Array.isArray(projects) ? projects : [];

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.section}
      id="portfolio-section"
    >
      <h2 className={styles.title}>{t('portfolio.title')}</h2>
      {portfolioProjects.length > 0 ? (
        <div className={styles.grid}>
          {portfolioProjects.map((project, index) => (
            <motion.div
              key={index}
              className={styles.card}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedProject({ ...project, image: images[index] })}
            >
              <div className={styles.imageWrapper}>
                {images[index] && !imageErrors[index] ? (
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src={images[index]}
                    alt={project.title}
                    className={styles.image}
                    onError={() => handleImageError(index)}
                  />
                ) : (
                  <div className={styles.placeholder}>No Image Available</div>
                )}
              </div>
              <div className={styles.content}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <p className={styles.technologies}>{project.technologies}</p>
                <div className={styles.links}>
                  {project.link.map((url, index) => (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      {url}
                    </a>
                  ))}
                </div>
                <button className={styles.button}>
                  {t('portfolio.viewDetails')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className={styles.empty}>No projects available.</p>
      )}

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
