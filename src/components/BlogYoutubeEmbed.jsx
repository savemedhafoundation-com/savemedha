import { getYouTubeEmbedUrl } from "../utils/youtube";

export default function BlogYoutubeEmbed({ youtubeLink }) {
  const embedUrl = getYouTubeEmbedUrl(youtubeLink);
  if (!embedUrl) return null;

  return (
    <div className="my-6 w-full">
      <div className="relative w-full overflow-hidden rounded-xl bg-black aspect-video">
        <iframe
          title="YouTube video"
          src={embedUrl}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}
