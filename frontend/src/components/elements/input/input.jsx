import { forwardRef, useState } from "react";

const EyeIcon = ({ open }) =>
  open ? (
    // Eye open
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    // Eye off
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const Input = forwardRef(
  ({ type, placeholder, name, id, value, onChange }, ref) => {
    const [showPass, setShowPass] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPass ? "text" : "password") : type;

    return (
      <div className="relative w-full">
        <input
          type={inputType}
          name={name}
          id={id}
          placeholder={placeholder}
          ref={ref}
          value={value}
          onChange={onChange}
          className="w-full text-sm text-lp-gray placeholder:text-lp-gray outline-none bg-transparent py-2.5 rounded-xl transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)",
            paddingLeft: "1rem",
            paddingRight: isPassword ? "2.75rem" : "1rem",
          }}
          onFocus={(e) => {
            // e.target.style.border = "1px solid rgba(81,154,102,0.7)";
            e.target.style.background = "rgba(255,255,255,0.09)";
            e.target.style.boxShadow = "0 0 0 3px rgba(81,154,102,0.12), inset 0 1px 3px rgba(0,0,0,0.2)";
          }}
          onBlur={(e) => {
            e.target.style.border = "1px solid rgba(255,255,255,0.12)";
            e.target.style.background = "rgba(255,255,255,0.06)";
            e.target.style.boxShadow = "inset 0 1px 3px rgba(0,0,0,0.2)";
          }}
        />

        {/* Toggle ikon mata — hanya untuk password */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
            style={{ color: showPass ? "rgba(124,226,161,0.85)" : "rgba(255,255,255,0.3)" }}
            tabIndex={-1}
            aria-label={showPass ? "Sembunyikan password" : "Tampilkan password"}
          >
            <EyeIcon open={showPass} />
          </button>
        )}
      </div>
    );
  }
);

export default Input;
