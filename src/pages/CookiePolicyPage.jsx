import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/cookieConsent.css";

export default function CookiePolicyPage({ onNavigate }) {
  return (
    <div className="cookie-policy-page">
      <Navbar currentPage="cookie-policy" onNavigate={onNavigate} />
      <main className="cookie-policy">
        <header className="cookie-policy__header">
          <h1>Cookie Policy</h1>
          <p>
            This Cookie Policy explains how Save Medha Foundation uses cookies
            and similar technologies to provide, improve, and secure our
            services.
          </p>
        </header>

        <section className="cookie-policy__section">
          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a
            website. They help websites remember your preferences and improve
            functionality.
          </p>
        </section>

        <section className="cookie-policy__section">
          <h2>How We Use Cookies</h2>
          <ul>
            <li>Essential cookies to enable core site functionality.</li>
            <li>Analytics cookies to understand traffic and performance.</li>
            <li>Preference cookies to remember your settings.</li>
          </ul>
        </section>

        <section className="cookie-policy__section">
          <h2>Your Choices</h2>
          <p>
            You can accept or reject cookies from the banner at any time by
            clearing your browser storage and revisiting the site.
          </p>
        </section>

        <section className="cookie-policy__section">
          <h2>Contact</h2>
          <p>
            If you have questions about this policy, please contact us at{" "}
            <a href="mailto:info@savemedha.com">info@savemedha.com</a>.
          </p>
        </section>
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
