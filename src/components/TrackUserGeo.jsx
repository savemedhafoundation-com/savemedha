import { useEffect } from "react";
import { getUserIP } from "../utils/getUserIP";
import { getGeoData } from "../utils/getGeoData";

const SESSION_KEY = "geoCollected";
const COLLECT_ENDPOINT = "https://savemedhabackend.vercel.app/set-preferences";
const GEO_API_KEY = import.meta.env?.VITE_IPGEOLOCATION_API_KEY || "";
const CONSENT_EVENTS = ["cookie-consent-accepted", "cookie-consent-updated"];

function hasCookieConsent() {
  if (typeof window === "undefined") return false;

  const explicitConsent = window.localStorage.getItem("cookieConsent") === "true";
  const bannerConsent =
    window.localStorage.getItem("cookie_consent") === "accepted";

  return explicitConsent || bannerConsent;
}

export default function TrackUserGeo() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;

    const collectGeo = async () => {
      if (cancelled) return;
      const alreadyCollected = sessionStorage.getItem(SESSION_KEY);
      if (alreadyCollected === "true") return;
      if (!hasCookieConsent()) return;

      const ip = await getUserIP();
      if (!ip || cancelled) return;

      const geoData = await getGeoData(ip, GEO_API_KEY);
      if (!geoData || cancelled) return;

      try {
        const response = await fetch(COLLECT_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(geoData),
          keepalive: true,
        });

        if (response.ok) {
          sessionStorage.setItem(SESSION_KEY, "true");
        }
      } catch {
        // Fail silently to avoid disrupting UX.
      }
    };

    const handleConsent = (event) => {
      if (event?.type === "cookie-consent-updated") {
        const consentValue = event?.detail?.consent;
        if (consentValue && consentValue !== "accepted") return;
      }
      void collectGeo();
    };

    void collectGeo();
    CONSENT_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, handleConsent);
    });

    return () => {
      cancelled = true;
      CONSENT_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, handleConsent);
      });
    };
  }, []);

  return null;
}
