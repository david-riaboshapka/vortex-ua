export const metadata = {
  title: "ABOUT US",
  description: "ABOUT US",
};

// ... existing code ...
import styles from "./about.module.css";
import Section_about from "@/app/components/section-about";

const About = () => {
  return (
    <>
      {/* ... existing code ... */}
     <section className={`${styles.aboutVortex} container`}>
        {/* Темный верхний блок на всю ширину */}
        <div className={styles.a_top}>
          <div className="container">
            <h1>About VORTEX</h1>
            <span className={styles.subtitle}>Clarity. Performance. Purpose.</span>
            <p className={styles.description}>
              We don't just build websites. We create digital experiences that convert and grow.
            </p>
          </div>
        </div>

        {/* Светлый основной блок */}
        <div className={`${styles.a_main} container`}>
          <div className={styles.sectionBlock}>
            <h3>Who We Are</h3>
            <div className={styles.divider}></div>
            <p>
              VORTEX was founded by two developers who believe that simplicity is <strong>power</strong>.
            </p>
            <p>
              In a world overloaded with visual noise, we choose <strong>minimalism</strong>.
            </p>
            <p>
              In a market full of templates, we choose <strong>strategy</strong>.
            </p>
            <p>
              In projects driven by trends, we focus on <strong>long term value</strong>.
            </p>
          </div>

          <div className={styles.sectionBlock}>
            <h3>Our Philosophy</h3>
            <div className={styles.divider}></div>
            <h2>
              <strong>Minimalism</strong> with Strategy
            </h2>
            <ul className={styles.philosophyGrid}>
              <li>
                <span>✓</span> Clear Structure
              </li>
              <li>
                <span>✓</span> Strong Messaging
              </li>
              <li>
                <span>✓</span> Thoughtful UX
              </li>
              <li>
                <span>✓</span> Speed & Performance
              </li>
            </ul>
          </div>

          <div className={styles.sectionBlock}>
            <h3>What Makes Us Different</h3>
            <div className={styles.divider}></div>
            <div className={styles.mDifferentBox}>
              <div className={styles.mDBItem}>
                <div className={styles.iconPlaceholder}>📊</div>
                <p>Strategy First</p>
              </div>
              <div className={styles.mDBItem}>
                <div className={styles.iconPlaceholder}>💻</div>
                <p>Clean Code</p>
              </div>
              <div className={styles.mDBItem}>
                <div className={styles.iconPlaceholder}>⚡</div>
                <p>Performance Driven</p>
              </div>
              <div className={styles.mDBItem}>
                <div className={styles.iconPlaceholder}>💬</div>
                <p>Direct Communication</p>
              </div>
              <div className={styles.mDBItem}>
                <div className={styles.iconPlaceholder}>🔍</div>
                <p>Attention to Detail</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Section_about />
    </>
  );
};

export default About;
