import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/cookieConsent.css";
const STORAGE_KEY = "cookie_consent";
const SESSION_REJECT_KEY = "cookie_consent_rejected_session";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const rejectedThisSession =
      window.sessionStorage.getItem(SESSION_REJECT_KEY) === "true";
    setIsVisible(stored !== "accepted" && !rejectedThisSession);
  }, []);

  const handleChoice = (value) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, value);
      if (value === "rejected") {
        window.sessionStorage.setItem(SESSION_REJECT_KEY, "true");
      } else {
        window.sessionStorage.removeItem(SESSION_REJECT_KEY);
      }
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent banner"
    >
      <div className="cookie-banner__content">
        <div className="cookie-banner__text">
          <p className="cookie-banner__title">We use cookies</p>
          <p className="cookie-banner__description">
            We use cookies to improve your experience and analyze site usage.
            Read our{" "}
            <Link className="cookie-banner__link" to="/cookie-policy">
              Cookie Policy
            </Link>
            .
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button
            type="button"
            className="cookie-banner__button cookie-banner__button--reject"
            onClick={() => handleChoice("rejected")}
            aria-label="Reject cookies"
          >
            Reject
          </button>
          <button
            type="button"
            className="cookie-banner__button cookie-banner__button--accept"
            onClick={() => handleChoice("accepted")}
            aria-label="Accept cookies"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
