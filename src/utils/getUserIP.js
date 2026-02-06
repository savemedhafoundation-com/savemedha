export async function getUserIP() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch("https://api.ipify.org?format=json", {
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
