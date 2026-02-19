const IP_API_URL =
  import.meta.env.VITE_PUBLIC_IP_API_URL || "https://api.ipify.org?format=json";

export async function getUserIP(ipApiUrl = IP_API_URL) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(ipApiUrl, {
      method: "GET",
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data = await response.json();
    const ip = typeof data?.ip === "string" ? data.ip.trim() : "";

    return ip || null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}
