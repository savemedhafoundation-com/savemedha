import { Fragment, useMemo } from "react";

export default function BlogContentRenderer({
  description = "",
  blogImage = [],
}) {
  const segments = useMemo(() => {
    if (typeof description !== "string" || description.length === 0) return [];
    return description.split("<image>");
  }, [description]);

  const images = Array.isArray(blogImage) ? blogImage : [];

  if (!segments.length) return null;

  return segments.map((segment, index) => {
    const imageUrl = images[index]?.imageUrl;
    const shouldRenderImage = index < segments.length - 1 && imageUrl;

    return (
      <Fragment key={`blog-content-${index}`}>
        {segment ? (
          <div
            dangerouslySetInnerHTML={{
              __html: segment,
            }}
          />
        ) : null}
        {shouldRenderImage ? (
          <div className="blog-inline-image">
            <img
              src={imageUrl}
              alt={`Blog inline ${index + 1}`}
              loading="lazy"
            />
          </div>
        ) : null}
      </Fragment>
    );
  });
}
