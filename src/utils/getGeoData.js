const IP_GEOLOCATION_URL =
  import.meta.env.VITE_IPGEOLOCATION_API_URL ||
  "https://api.ipgeolocation.io/ipgeo";

export async function getGeoData(ip, apiKey, endpoint = IP_GEOLOCATION_URL) {
  if (!ip || !apiKey) return null;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7000);

  try {
    const url = new URL(endpoint);
    url.searchParams.set("apiKey", apiKey);
    url.searchParams.set("ip", ip);

    const response = await fetch(url.toString(), {
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
