import { useEffect } from "react";
import { getUserIP } from "../utils/getUserIP";
import { getGeoData } from "../utils/getGeoData";

const SESSION_KEY = "geoCollected";
const CONSENT_KEYS = ["cookieConsent", "cookie_consent"];
const CONSENT_EVENT = "cookie-consent-updated";
const API_BASE_URL =
  import.meta.env?.VITE_API_BASE_URL || "https://savemedhabackend.vercel.app";
const PREFERENCES_ENDPOINT =
  import.meta.env?.VITE_PREFERENCES_ENDPOINT ||
  `${API_BASE_URL}/set-preferences`;
const GEO_API_KEY = import.meta.env?.VITE_IPGEOLOCATION_API_KEY || "";

export default function TrackUserGeo() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;
    let isCollecting = false;

    const getConsentValue = () => {
      for (const key of CONSENT_KEYS) {
        const value = localStorage.getItem(key);
        if (value) return value;
      }
      return "";
    };

    const hasConsent = () => {
      const consentValue = getConsentValue();
      return consentValue === "true" || consentValue === "accepted";
    };

    const sendPayload = async (payload) => {
      const response = await fetch(PREFERENCES_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        keepalive: true,
      });

      if (!response.ok) {
        throw new Error(`Failed to save preferences (${response.status})`);
      }

      sessionStorage.setItem(SESSION_KEY, "true");
    };

    const collectGeo = async () => {
      const ip = await getUserIP();
      if (!ip) return;

      const geoData = await getGeoData(ip, GEO_API_KEY);
      const consentValue = getConsentValue();
      const payload = {
        ...(geoData && typeof geoData === "object" ? geoData : {}),
        ip,
        cookieConsent: consentValue || "unknown",
        collectedAt: new Date().toISOString(),
      };

      if (cancelled) return;

      try {
        await sendPayload(payload);
      } catch {
        // Fail silently to avoid disrupting UX.
      }
    };

    const tryCollectGeo = async () => {
      if (cancelled || isCollecting) return;
      if (!hasConsent()) return;
      if (sessionStorage.getItem(SESSION_KEY) === "true") return;

      isCollecting = true;
      await collectGeo();
      isCollecting = false;
    };

    const onConsentUpdated = () => {
      tryCollectGeo();
    };

    const onStorage = (event) => {
      if (CONSENT_KEYS.includes(event.key)) {
        tryCollectGeo();
      }
    };

    tryCollectGeo();
    window.addEventListener(CONSENT_EVENT, onConsentUpdated);
    window.addEventListener("storage", onStorage);

    return () => {
      cancelled = true;
      window.removeEventListener(CONSENT_EVENT, onConsentUpdated);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return null;
}
