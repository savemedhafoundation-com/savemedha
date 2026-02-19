import { useEffect } from "react";
import { getGeoData } from "../utils/getGeoData";
import { getUserIP } from "../utils/getUserIP";

const SESSION_KEY = "geoCollectedThisSession";
const CONSENT_KEY = "cookieConsent";
const COLLECT_ENDPOINT =
  import.meta.env.VITE_GEO_COLLECT_ENDPOINT ||
  "https://savemedhabackend.vercel.app/set-preferences";
const GEO_API_KEY = import.meta.env.VITE_IPGEOLOCATION_API_KEY;

const CONSENT_EVENTS = ["cookie-consent-accepted", "cookie-consent-updated"];

function hasCookieConsent() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(CONSENT_KEY) === "true";
}

export default function TrackUserGeo() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;

    const collectGeoOncePerSession = async () => {
      if (cancelled) return;
      if (!hasCookieConsent()) return;
      if (window.sessionStorage.getItem(SESSION_KEY) === "true") return;

      // Lock immediately to avoid duplicate calls from strict mode or multiple events.
      window.sessionStorage.setItem(SESSION_KEY, "true");

      const ip = await getUserIP();
      if (!ip || cancelled) return;

      const geoData = await getGeoData(ip, GEO_API_KEY);
      if (!geoData || cancelled) return;

      try {
        await fetch(COLLECT_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(geoData),
        });
      } catch {
        // Intentionally no-op to fail gracefully.
      }
    };

    const handleConsentEvent = () => {
      void collectGeoOncePerSession();
    };

    const handleStorageEvent = (event) => {
      if (event.key !== CONSENT_KEY) return;
      void collectGeoOncePerSession();
    };

    void collectGeoOncePerSession();

    CONSENT_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, handleConsentEvent);
    });
    window.addEventListener("storage", handleStorageEvent);

    return () => {
      cancelled = true;
      CONSENT_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, handleConsentEvent);
      });
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, []);

  return null;
}
