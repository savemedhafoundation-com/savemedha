import { useEffect } from "react";
import { getUserIP } from "../utils/getUserIP";
import { getGeoData } from "../utils/getGeoData";

const SESSION_KEY = "geoCollected";
const COLLECT_ENDPOINT = "https://savemedhabackend.vercel.app/set-preferences";
const GEO_API_KEY = import.meta.env?.VITE_IPGEOLOCATION_API_KEY || "";
const CONSENT_ACCEPTED_EVENT = "cookie-consent-accepted";

export default function TrackUserGeo() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const collectGeo = async () => {
      const alreadyCollected = sessionStorage.getItem(SESSION_KEY);
      if (alreadyCollected === "true") return;

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

    window.addEventListener(CONSENT_ACCEPTED_EVENT, collectGeo);

    return () => {
      window.removeEventListener(CONSENT_ACCEPTED_EVENT, collectGeo);
    };
  }, []);

  return null;
}