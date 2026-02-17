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
      const sourceLocation =
        source.location && typeof source.location === "object"
          ? source.location
          : {};
      const sourceCountryMetadata =
        source.country_metadata && typeof source.country_metadata === "object"
          ? source.country_metadata
          : {};
      const timeZoneName =
        sourceCountryMetadata?.timezone ||
        source?.time_zone?.name ||
        sourceLocation?.time_zone?.name ||
        (typeof Intl !== "undefined"
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : "");
      const currencyCode =
        (typeof source.currency === "string" && source.currency) ||
        source?.currency?.code ||
        sourceLocation?.currency?.code ||
        "USD";

      return {
        country_name:
          sourceCountryMetadata.country_name ||
          source.country_name ||
          sourceLocation.country_name ||
          source.country ||
          "Unknown",
        country_code:
          sourceCountryMetadata.country_code ||
          source.country_code2 ||
          source.country_code ||
          sourceLocation.country_code2 ||
          sourceLocation.country_code ||
          "",
        state_prov:
          sourceCountryMetadata.state_prov ||
          source.state_prov ||
          sourceLocation.state_prov ||
          source.state ||
          "",
        city: sourceCountryMetadata.city || source.city || sourceLocation.city || "",
        ip: source.ip || sourceLocation.ip || ip || "0.0.0.0",
        latitude: source.latitude || sourceLocation.latitude || "",
        longitude: source.longitude || sourceLocation.longitude || "",
        timezone: timeZoneName || "UTC",
        currency: currencyCode,
        cookieConsent: consent || legacyConsent || "unknown",
      };
    };

    const buildRequestPayload = (payload = {}) => {
      const normalized = normalizePayload(payload, payload?.ip || "");
      const locationText =
        typeof payload?.location === "string" && payload.location.trim()
          ? payload.location.trim()
          : [normalized.city, normalized.state_prov, normalized.country_name]
              .filter(Boolean)
              .join(", ");

      // Backend contract requires these exact keys.
      return {
        ip: normalized.ip,
        location: locationText || normalized.country_name,
        country_metadata: {
          country_name: normalized.country_name,
          country_code: normalized.country_code,
          state_prov: normalized.state_prov,
          city: normalized.city,
          timezone: normalized.timezone,
          latitude: normalized.latitude,
          longitude: normalized.longitude,
        },
        currency: normalized.currency,
        cookieConsent: normalized.cookieConsent,
      };
    };

    const sendPayload = async (payload) => {
      const safePayload = buildRequestPayload(payload);
      const response = await fetch(PREFERENCES_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(safePayload),
        keepalive: true,
      });

      if (!response.ok) {
        let details = "";
        try {
          details = await response.text();
        } catch {
          details = "";
        }
        throw new Error(
          `Failed to save preferences (${response.status})${
            details ? `: ${details}` : ""
          }`
        );
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
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error("Geo preference sync failed:", error);
        }
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
