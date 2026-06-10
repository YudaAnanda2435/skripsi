import Form from "../elements/input/index";
import ButtonSecondary from "../elements/button/index";
import { useRef, useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

const FormRegister = () => {
  const nameRef = useRef(null);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pesan, setPesan] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setPesan("");
    setIsLoading(true);

    try {
      await api.post("/register", {
        nama: nama.trim(),
        email: email.trim(),
        password: password,
      });

      setIsSuccess(true);
      setPesan("Akun berhasil dibuat! Mengalihkan ke login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      if (error.response) {
        setPesan(error.response.data.detail);
      } else {
        setPesan("Server tidak merespon. Coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (nameRef.current) nameRef.current.focus();
  }, []);

  return (
    <div className="flex flex-col gap-2 font-jakarta">
      <form onSubmit={handleRegister} className="flex flex-col gap-2 sm:gap-3">
        {/* Nama */}
        <Form
          label={ isDesktop ? "Nama Lengkap" : "" }
          placeholder="Nama lengkap Anda"
          type="text"
          name="nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          ref={nameRef}
        />

        {/* Email */}
        <Form
          label={ isDesktop ? "Email" : "" }
          placeholder="Masukan email Anda"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <Form
          label= { isDesktop ? "Password" : "" }
          placeholder="Masukan password Anda"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Message (success / error) */}
        {pesan && (
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
            style={
              isSuccess
                ? {
                    background: "rgba(81,154,102,0.15)",
                    border: "1px solid rgba(81,154,102,0.4)",
                    color: "#7ce2a1",
                  }
                : {
                    background: "rgba(239,68,68,0.12)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    color: "#fca5a5",
                  }
            }
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isSuccess ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              )}
            </svg>
            {pesan}
          </div>
        )}

        {/* Submit button */}
        <ButtonSecondary
          type="submit"
          isLoading={isLoading}
          disabled={isLoading || isSuccess}
          className="w-full justify-center mt-2"
          style={{
            // background: isSuccess
            //   ? "linear-gradient(135deg, #35AF4F 0%, #27874a 100%)"
            //   : "linear-gradient(135deg, #519a66 0%, #3d7a50 100%)",
            boxShadow: "0 8px 25px rgba(81,154,102,0.35)",
            opacity: isLoading ? 0.75 : 1,
            transform: isLoading ? "scale(0.98)" : "scale(1)",
          }}
        >
          {isLoading ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
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
              Membuat akun...
            </>
          ) : isSuccess ? (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Akun Dibuat!
            </>
          ) : (
            <>Buat Akun Gratis</>
          )}
        </ButtonSecondary>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-black/50" />
        <span className="text-xs text-black" >
          atau
        </span>
        <div className="flex-1 h-px bg-black/50" />
      </div>

      {/* Login link */}
      <p className="text-center text-sm text-lp-gray">
        Sudah punya akun?{" "}
        <Link
          to="/login"
          className="font-semibold transition-colors duration-200 text-lp-muted"
          onMouseEnter={(e) => (e.target.style.color = "#000")}
          onMouseLeave={(e) => (e.target.style.color = "#4A5568")}
        >
          Masuk sekarang
        </Link>
      </p>
    </div>
  );
};

export default FormRegister;
