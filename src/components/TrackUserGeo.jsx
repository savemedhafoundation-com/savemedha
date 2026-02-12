import { useEffect } from "react";
import { getUserIP } from "../utils/getUserIP";
import { getGeoData } from "../utils/getGeoData";

const SESSION_KEY = "geoCollected";
const CONSENT_KEY = "cookie_consent";
const LEGACY_CONSENT_KEY = "cookieConsent";
const LOCAL_GEO_DATA_KEY = "geoPreferencePayload";
const COLLECT_ENDPOINT = "https://savemedhabackend.vercel.app/set-preferences";
const GEO_API_KEY = import.meta.env?.VITE_IPGEOLOCATION_API_KEY || "";

export default function TrackUserGeo() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const consent = localStorage.getItem(CONSENT_KEY);
    const legacyConsent = localStorage.getItem(LEGACY_CONSENT_KEY);
    const hasConsent = consent === "accepted" || legacyConsent === "true";
    if (!hasConsent) return;

    const alreadyCollected = sessionStorage.getItem(SESSION_KEY);
    if (alreadyCollected === "true") return;

    const sendPayload = async (payload) => {
      const response = await fetch(COLLECT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        keepalive: true,
      });

      if (!response.ok) {
        throw new Error("Failed to save preferences");
      }

      sessionStorage.setItem(SESSION_KEY, "true");
      localStorage.removeItem(LOCAL_GEO_DATA_KEY);
    };

    const collectGeo = async () => {
      try {
        const pendingPayloadRaw = localStorage.getItem(LOCAL_GEO_DATA_KEY);
        if (pendingPayloadRaw) {
          const pendingPayload = JSON.parse(pendingPayloadRaw);
          await sendPayload(pendingPayload);
          return;
        }

        const ip = await getUserIP();
        if (!ip) return;

        const geoData = await getGeoData(ip, GEO_API_KEY);
        if (!geoData) return;

        localStorage.setItem(LOCAL_GEO_DATA_KEY, JSON.stringify(geoData));
        await sendPayload(geoData);
      } catch {
        // Fail silently to avoid disrupting UX.
      }
    };

    collectGeo();
  }, []);

  return null;
}
