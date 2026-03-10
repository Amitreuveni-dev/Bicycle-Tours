import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import TourGallery from './components/TourGallery/TourGallery';
import WhyUs from './components/WhyUs/WhyUs';
import TourMatchForm from './components/TourMatchForm/TourMatchForm';
import FAQ from './components/FAQ/FAQ';
import FloatingWhatsApp from './components/FloatingWhatsApp/FloatingWhatsApp';
import styles from './App.module.scss';

// ─────────────────────────────────────────────────────────────────────────────
// App — root layout shell
// Sections map to the smooth-scroll anchors used by the Navbar.
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className={styles.app}>
      <Navbar />

      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="tours">
          <TourGallery />
        </section>

        <section id="why-us">
          <WhyUs />
        </section>

        <section id="match">
          <TourMatchForm />
        </section>

        <section id="faq">
          <FAQ />
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.brand}>TrailBlaze Israel</p>
          <p className={styles.copy}>
            © {new Date().getFullYear()} כל הזכויות שמורות · עיצוב בלב ❤️
          </p>
          <p className={styles.tagline}>רוכבים יחד, חווים יחד</p>
        </div>
      </footer>

      <FloatingWhatsApp />
    </div>
  );
}
