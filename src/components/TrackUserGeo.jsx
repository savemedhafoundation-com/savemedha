import { useEffect } from "react";
import { getUserIP } from "../utils/getUserIP";
import { getGeoData } from "../utils/getGeoData";

const SESSION_KEY = "geoCollected";
const CONSENT_KEY = "cookie_consent";
const LEGACY_CONSENT_KEY = "cookieConsent";
const LOCAL_GEO_DATA_KEY = "geoPreferencePayload";
const CONSENT_EVENT = "cookie-consent-updated";
const API_BASE_URL =
  import.meta.env?.VITE_API_BASE_URL || "https://savemedhabackend.vercel.app";
const PRIMARY_PREFERENCES_ENDPOINT =
  import.meta.env?.VITE_PREFERENCES_ENDPOINT ||
  `${API_BASE_URL}/set-preferences`;
const PREFERENCES_ENDPOINTS = Array.from(
  new Set([
    PRIMARY_PREFERENCES_ENDPOINT,
    `${API_BASE_URL}/api/set-preferences`,
  ])
).filter(Boolean);
const GEO_API_KEY = import.meta.env?.VITE_IPGEOLOCATION_API_KEY || "";

export default function TrackUserGeo() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;
    let isCollecting = false;

    const hasConsent = () => {
      const consent = localStorage.getItem(CONSENT_KEY);
      const legacyConsent = localStorage.getItem(LEGACY_CONSENT_KEY);
      return consent === "accepted" || legacyConsent === "true";
    };

    const sendPayload = async (payload) => {
      let lastError = null;

      for (const endpoint of PREFERENCES_ENDPOINTS) {
        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            keepalive: true,
          });

          if (response.ok) {
            sessionStorage.setItem(SESSION_KEY, "true");
            localStorage.removeItem(LOCAL_GEO_DATA_KEY);
            return;
          }

          lastError = new Error(
            `Failed to save preferences (${response.status})`
          );

        } catch (error) {
          lastError = error;
        }
      }

      throw lastError || new Error("Failed to save preferences");
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

        const consent = localStorage.getItem(CONSENT_KEY);
        const legacyConsent = localStorage.getItem(LEGACY_CONSENT_KEY);
        const payload = {
          ...geoData,
          cookieConsent: consent || legacyConsent || "unknown",
        };

        localStorage.setItem(LOCAL_GEO_DATA_KEY, JSON.stringify(payload));
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
      if (event.key === CONSENT_KEY || event.key === LEGACY_CONSENT_KEY) {
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
