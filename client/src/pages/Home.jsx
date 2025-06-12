import Header from '../components/Header';
import About from '../components/About';
import Education from '../components/Education';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Portfolio from '../components/Portfolio';
import SocialLinks from '../components/SocialLinks';
import PdfDownloadButton from '../components/PdfDownloadButton';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main} id="resume-content">
        <About />
        <Skills />
        <Experience />
        <Education />
        <Portfolio />
        <SocialLinks />
        <div className={styles.buttonContainer}>
          <PdfDownloadButton />
        </div>
      </main>
    </div>
  );
};

export default Home;