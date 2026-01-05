const extractArray = (candidate, seen = new Set()) => {
  if (!candidate || seen.has(candidate)) return [];
  if (Array.isArray(candidate)) return candidate;
  if (typeof candidate === "object") {
    seen.add(candidate);
    const keys = ["items", "docs", "results", "data"];
    for (const key of keys) {
      if (!(key in candidate)) continue;
      const arr = extractArray(candidate[key], seen);
      if (arr.length) return arr;
    }
  }
  return [];
};

export const normalizeEbookResponse = (payload) => extractArray(payload);

const slugify = (value) => {
  if (typeof value !== "string") return "";
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const getEbookSlug = (book) => {
  if (!book) return "";
  const rawSlug = book.slug || book.slugName || book.readSlug || "";
  if (rawSlug) {
    const normalizedSlug = slugify(String(rawSlug));
    if (normalizedSlug) return normalizedSlug;
  }

  if (book.readLink) {
    const parts = String(book.readLink).split("/").filter(Boolean);
    const tail = parts.length ? parts[parts.length - 1] : "";
    const normalizedLink = slugify(tail);
    if (normalizedLink) return normalizedLink;
  }

  const titleSlug = slugify(book.title || "");
  if (titleSlug) return titleSlug;

  const id = book._id || book.id;
  return id ? String(id) : "";
};

const resolveCoverImage = (book) => {
  return (
    book?.coverImage?.url ||
    book?.coverImage ||
    book?.imageUrl ||
    book?.image ||
    ""
  );
};

const resolveDownloadLink = (book) => {
  return (
    book?.downloadUrl ||
    book?.downloadLink ||
    book?.pdfUrl ||
    book?.pdf ||
    book?.fileUrl ||
    book?.file ||
    ""
  );
};

export const normalizeEbook = (book, index = 0) => {
  const id = book?._id || book?.id || `ebook-${index}`;
  const title = book?.title || "Untitled E-Book";
  const slug = getEbookSlug({ ...book, _id: id, id, title });

  const pagesValue = book?.pages || book?.pageCount;
  const pages = pagesValue ? `${pagesValue} pages` : "";

  return {
    id,
    slug,
    title,
    author:
      book?.writtenBy ||
      book?.author?.name ||
      book?.author ||
      "Save Medha Foundation",
    desc: book?.description || book?.desc || "",
    cover: resolveCoverImage(book),
    downloadLink: resolveDownloadLink(book),
    readLink: slug ? `/ebook/read/${slug}` : "",
    pages,
    readTime: book?.readTime || book?.duration || "",
    createdAt: book?.createdAt || book?.publishedAt || book?.updatedAt || "",
    category: book?.category || book?.tag || "",
  };
};
