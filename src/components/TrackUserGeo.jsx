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
const PREFERENCES_ENDPOINT =
  import.meta.env?.VITE_PREFERENCES_ENDPOINT ||
  `${API_BASE_URL}/set-preferences`;
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

    const normalizePayload = (payload = {}, ip = "") => {
      const consent = localStorage.getItem(CONSENT_KEY);
      const legacyConsent = localStorage.getItem(LEGACY_CONSENT_KEY);
      const source = payload && typeof payload === "object" ? payload : {};
      const timeZoneName =
        source?.time_zone?.name ||
        (typeof Intl !== "undefined"
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : "");

      return {
        country_name: source.country_name || source.country || "Unknown",
        country_code2: source.country_code2 || "",
        state_prov: source.state_prov || source.state || "",
        city: source.city || "",
        ip: source.ip || ip || "",
        latitude: source.latitude || "",
        longitude: source.longitude || "",
        time_zone: source.time_zone || { name: timeZoneName },
        cookieConsent: consent || legacyConsent || "unknown",
      };
    };

    const sendPayload = async (payload) => {
      const safePayload = normalizePayload(payload, payload?.ip || "");
      const response = await fetch(PREFERENCES_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(safePayload),
        keepalive: true,
      });

      if (!response.ok) {
        throw new Error(`Failed to save preferences (${response.status})`);
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
        const geoData = await getGeoData(ip, GEO_API_KEY);
        const payload = normalizePayload(geoData, ip || "");
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
