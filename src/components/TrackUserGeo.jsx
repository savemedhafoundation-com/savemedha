import { useEffect } from "react";

const CONSENT_KEY = "cookie_consent";
const SESSION_KEY = "geoCollected";
const API_ENDPOINT = "https://savemedhabackend.vercel.app/set-preferences";

export default function TrackUserGeo() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasConsent = () =>
      localStorage.getItem(CONSENT_KEY) === "accepted";

    const collectGeo = async () => {
      if (!hasConsent()) return;
      if (sessionStorage.getItem(SESSION_KEY)) return;

      try {
        const res = await fetch(API_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cookieConsent: "accepted",
          }),
        });

        if (res.ok) {
          sessionStorage.setItem(SESSION_KEY, "true");
        }
      } catch (err) {
        console.error("Geo collection failed:", err);
      }
    };

    collectGeo();
  }, []);

  return null;
}
