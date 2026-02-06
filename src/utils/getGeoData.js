const GEOLOCATION_API_BASE = "https://api.ipgeolocation.io/ipgeo";

export async function getGeoData(ip, apiKey) {
  if (!ip || !apiKey) return null;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7000);

  try {
    const url = `${GEOLOCATION_API_BASE}?apiKey=${encodeURIComponent(
      apiKey
    )}&ip=${encodeURIComponent(ip)}`;

    const response = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data ?? null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}
