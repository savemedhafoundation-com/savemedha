import { useEffect } from "react";
import { getGeoData } from "../utils/getGeoData";

const SESSION_KEY = "geoCollected";
const CONSENT_KEY = "cookieConsent";
const COLLECT_ENDPOINT = "https://savemedhabackend.vercel.app/set-preferences";
const GEO_API_KEY = import.meta.env.VITE_IPGEOLOCATION_API_KEY;
const CONSENT_ACCEPTED_EVENT = "cookie-consent-accepted";

export default function TrackUserGeo() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent !== "true") return;

    const alreadyCollected = sessionStorage.getItem(SESSION_KEY);
    if (alreadyCollected === "true") return;

    const collectGeo = async () => {
      try {
        const geoData = await getGeoData(GEO_API_KEY);
        if (!geoData) return;

        await fetch(COLLECT_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // important for cookies
          body: JSON.stringify(geoData),
        });

        sessionStorage.setItem(SESSION_KEY, "true");
      } catch (error) {
        console.error("Geo tracking failed:", error);
      }
    };

    collectGeo();
    window.addEventListener(CONSENT_ACCEPTED_EVENT, collectGeo);

    return () => {
      window.removeEventListener(CONSENT_ACCEPTED_EVENT, collectGeo);
    };
  }, []);

  return null;
}
