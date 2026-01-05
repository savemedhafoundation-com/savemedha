import { Fragment, useMemo, createElement } from "react";

const TOKEN_PREFIX = "__BLOG_IMAGE_PLACEHOLDER__";
const TOKEN_SUFFIX = "__";
const TOKEN_SPLIT_REGEX = new RegExp(
  `(${TOKEN_PREFIX}\\d+${TOKEN_SUFFIX})`
);
const TOKEN_MATCH_REGEX = new RegExp(
  `^${TOKEN_PREFIX}(\\d+)${TOKEN_SUFFIX}$`
);
const PLACEHOLDER_PATTERNS = [
  /(?:<)?&amp;lt;?image:(\d+)&amp;gt;?(?:>)?/gi,
  /(?:<)?&lt;?image:(\d+)&gt;?(?:>)?/gi,
  /<image:(\d+)\s*\/?>/gi,
];

const INLINE_IMAGE_STYLE = {
  display: "block",
  maxWidth: "100%",
  height: "auto",
  margin: "1.5rem 0",
  borderRadius: "12px",
};

const ATTRIBUTE_MAP = {
  class: "className",
  for: "htmlFor",
  tabindex: "tabIndex",
  colspan: "colSpan",
  rowspan: "rowSpan",
  maxlength: "maxLength",
  minlength: "minLength",
  readonly: "readOnly",
  srcset: "srcSet",
  contenteditable: "contentEditable",
};

const BOOLEAN_ATTRIBUTES = new Set([
  "checked",
  "disabled",
  "selected",
  "multiple",
  "required",
  "autoplay",
  "controls",
  "loop",
  "muted",
  "playsinline",
  "readonly",
  "hidden",
  "open",
]);

const normalizePlaceholders = (html) => {
  if (typeof html !== "string") return "";
  let normalized = html;
  PLACEHOLDER_PATTERNS.forEach((pattern) => {
    normalized = normalized.replace(
      pattern,
      (_, index) => `${TOKEN_PREFIX}${index}${TOKEN_SUFFIX}`
    );
  });
  return normalized;
};

const parseStyleString = (styleValue) => {
  if (!styleValue) return undefined;
  const style = {};

  styleValue.split(";").forEach((rule) => {
    const [property, value] = rule.split(":");
    if (!property || !value) return;
    const key = property
      .trim()
      .toLowerCase()
      .replace(/-([a-z])/g, (_, char) => char.toUpperCase());
    style[key] = value.trim();
  });

  return Object.keys(style).length ? style : undefined;
};

const mapAttributes = (attributes) => {
  const props = {};

  Array.from(attributes).forEach((attribute) => {
    const rawName = attribute.name;
    const mappedName = ATTRIBUTE_MAP[rawName] || rawName;
    const rawValue = attribute.value;

    if (rawName === "style") {
      const style = parseStyleString(rawValue);
      if (style) props.style = style;
      return;
    }

    if (BOOLEAN_ATTRIBUTES.has(rawName) && rawValue === "") {
      props[mappedName] = true;
      return;
    }

    if (rawName === "tabindex") {
      const numeric = Number(rawValue);
      props[mappedName] = Number.isNaN(numeric) ? rawValue : numeric;
      return;
    }

    props[mappedName] = rawValue;
  });

  return props;
};

const createInlineImage = (imageUrl, imageIndex, key) => (
  <img
    key={key}
    src={imageUrl}
    alt={`Blog image ${imageIndex + 1}`}
    loading="lazy"
    style={INLINE_IMAGE_STYLE}
  />
);

const renderTextNode = (text, images, keyPrefix) => {
  if (!text) return null;
  if (!text.includes(TOKEN_PREFIX)) return text;

  const parts = text.split(TOKEN_SPLIT_REGEX);
  const nodes = [];

  parts.forEach((part, index) => {
    if (!part) return;
    const match = part.match(TOKEN_MATCH_REGEX);
    if (!match) {
      nodes.push(part);
      return;
    }

    const imageIndex = Number.parseInt(match[1], 10);
    const imageUrl = images[imageIndex]?.imageUrl;
    if (!imageUrl) return;

    nodes.push(createInlineImage(imageUrl, imageIndex, `${keyPrefix}-img-${index}`));
  });

  return nodes;
};

const renderNodes = (nodes, images, keyPrefix) => {
  const output = [];

  nodes.forEach((node, index) => {
    const key = `${keyPrefix}-${index}`;
    const rendered = renderNode(node, images, key);

    if (Array.isArray(rendered)) {
      rendered.forEach((item) => {
        if (item !== null && item !== undefined && item !== false) {
          output.push(item);
        }
      });
      return;
    }

    if (rendered !== null && rendered !== undefined && rendered !== false) {
      output.push(rendered);
    }
  });

  return output;
};

const renderNode = (node, images, keyPrefix) => {
  if (node.nodeType === Node.TEXT_NODE) {
    return renderTextNode(node.nodeValue || "", images, keyPrefix);
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const tagName = node.tagName.toLowerCase();
  if (tagName.startsWith("image:")) {
    const index = Number.parseInt(tagName.split(":")[1], 10);
    const imageUrl = images[index]?.imageUrl;
    if (!imageUrl) return null;
    return createInlineImage(imageUrl, index, `${keyPrefix}-img`);
  }

  const props = mapAttributes(node.attributes);
  const children = renderNodes(Array.from(node.childNodes), images, keyPrefix);

  return createElement(
    tagName,
    { ...props, key: keyPrefix },
    children.length ? children : undefined
  );
};

export default function BlogContentRenderer({ description = "", blogImage = [] }) {
  const images = Array.isArray(blogImage) ? blogImage : [];

  const content = useMemo(() => {
    const normalized = normalizePlaceholders(description);
    if (!normalized) return [];

    const parser = new DOMParser();
    const document = parser.parseFromString(normalized, "text/html");
    return renderNodes(Array.from(document.body.childNodes), images, "node");
  }, [description, images]);

  return <Fragment>{content}</Fragment>;
}
