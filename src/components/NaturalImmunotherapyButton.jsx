import startNaturalIcon from "../assets/Photo/start_natural_immuno.png";

const NaturalImmunotherapyButton = ({
  href = "https://dantura.com/",
  label = "Start Natural Immunotherapy",
  className = "",
  target = "_blank",
  rel = "noreferrer",
  icon = (
    <img
      src={startNaturalIcon}
      alt="start natural immunotherapy"
      className="h-10 w-10 object-contain"
    />
  ),
  onClick,
}) => {
  const Element = href ? "a" : "button";
  return (
    <Element
      href={href}
      target={href ? target : undefined}
      rel={href ? rel : undefined}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#3aa123] to-[#3fa428] px-8 py-4 font-serif text-lg font-semibold text-white shadow-[0_12px_24px_rgba(0,0,0,0.18)] transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3fa428] focus-visible:ring-offset-white ${className}`}
    >
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      <span>{label}</span>
    </Element>
  );
};

export default NaturalImmunotherapyButton;
