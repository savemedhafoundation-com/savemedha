import { useEffect } from "react";
import { getUserIP } from "../utils/getUserIP";
import { getGeoData } from "../utils/getGeoData";

const SESSION_KEY = "geoCollected";
const CONSENT_KEY = "cookieConsent";
const COLLECT_ENDPOINT = "https://savemedhabackend.vercel.app/set-preferences";
const GEO_API_KEY = import.meta.env?.VITE_IPGEOLOCATION_API_KEY || "";

export default function TrackUserGeo() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent !== "true") return;

    const alreadyCollected = sessionStorage.getItem(SESSION_KEY);
    if (alreadyCollected === "true") return;

    const collectGeo = async () => {
      const ip = await getUserIP();
      if (!ip) return;

      const geoData = await getGeoData(ip, GEO_API_KEY);
      if (!geoData) return;

      try {
        await fetch(COLLECT_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(geoData),
          keepalive: true,
        });

        sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        // Fail silently to avoid disrupting UX.
      }
    };

    collectGeo();
  }, []);

  return null;
}
