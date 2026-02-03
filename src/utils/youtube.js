const YOUTUBE_ID_PATTERN = /^[\w-]{11}$/;

export const getYouTubeEmbedUrl = (input) => {
  if (!input || typeof input !== "string") return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (YOUTUBE_ID_PATTERN.test(trimmed)) {
    return `https://www.youtube.com/embed/${trimmed}`;
  }

  try {
    const url = new URL(trimmed);
    const hostname = url.hostname.replace(/^www\./, "");

    if (hostname === "youtu.be") {
      const id = url.pathname.replace("/", "").split("/")[0];
      return YOUTUBE_ID_PATTERN.test(id)
        ? `https://www.youtube.com/embed/${id}`
        : null;
    }

    if (hostname.includes("youtube.com")) {
      const id = url.searchParams.get("v");
      return YOUTUBE_ID_PATTERN.test(id)
        ? `https://www.youtube.com/embed/${id}`
        : null;
    }
  } catch {
    return null;
  }

  return null;
};
