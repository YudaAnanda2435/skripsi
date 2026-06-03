import { Link } from "react-router-dom";


const ButtonSecondary = ({
  children,
  to,
  onClick,
  type = "button",
  disabled = false,
  isLoading = false,
  className = "",
  style = {},
}) => {
  const baseClass =
    "py-3 md:py-2.5 px-3.5 md:px-5 w-fit rounded-md flex items-center cursor-pointer transition-transform duration-300 bg-lp text-white group";

  const content = isLoading ? (
    <>
      <svg className="w-4 h-4  animate-spin" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      <span className="pl-2"> Memproses...</span>
    </>
  ) : (
    <div className="flex items-center text-[16px]! md:text-[18px] font-helvetica leading-5 tracking-normal">
      {children}
      <svg
        className="w-5.5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className={`${baseClass} ${className}`} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClass} ${className}`}
      style={style}
    >
      {content}
    </button>
  );
};

export default ButtonSecondary;
