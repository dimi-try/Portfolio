import Header from '../components/Header';
import Highlights from '../components/Highlights';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Portfolio from '../components/Portfolio';
import ContactForm from '../components/ContactForm';
import PdfDownloadButton from '../components/PdfDownloadButton';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto p-6" id="resume-content">
        <Highlights />
        <Experience />
        <Skills />
        <Portfolio />
        <ContactForm />
        <div className="text-center mt-6">
          <PdfDownloadButton />
        </div>
      </main>
    </div>
  );
};

export default Home;