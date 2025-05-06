import Header from '../components/Header';
import Highlights from '../components/Highlights';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Portfolio from '../components/Portfolio';
import ContactForm from '../components/ContactForm';
import PdfDownloadButton from '../components/PdfDownloadButton';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main} id="resume-content">
        <Highlights />
        <Experience />
        <Skills />
        <Portfolio />
        <ContactForm />
        <div className={styles.buttonContainer}>
          <PdfDownloadButton />
        </div>
      </main>
    </div>
  );
};

export default Home;