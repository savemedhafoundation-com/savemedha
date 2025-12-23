const DEFAULT_HREF = "https://dantura.com/";

export default function StartNaturalImmunotherapyButton({
  px = "px-8",
  py = "py-3",
  href = DEFAULT_HREF,
  target = "_blank",
  rel = "noopener noreferrer",
  className = "",
  children = "START NATURAL IMMUNOTHERAPY",
  onClick,
  ...rest
}) {
  const classes = [
    "bg-[#7BC043]",
    "hover:bg-green-600",
    "transition",
    "cursor-pointer",
    "text-white",
    "font-bold",
    "font-opensans",
    "rounded-[4px]",
    "shadow-md",
    "uppercase",
    "tracking-wider",
    "transition-colors",
    "text-base",
    "md:text-lg",
    "inline-flex",
    "text-center",
    "items-center",
    "justify-center",
    px,
    py,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
}

