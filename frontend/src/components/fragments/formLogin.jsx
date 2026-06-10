import Form from "../elements/input/index";
import ButtonSecondary from "../elements/button";
import { useRef, useEffect, useState } from "react";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../ui/toast/ToastContext";

const FormLogin = () => {
  const nameRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  const { showToast } = useToast();      // ← hook global

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const emailBersih = email.trim();

    try {
      const respons = await api.post("/login", {
        email: emailBersih,
        password: password,
      });

      localStorage.setItem("token", respons.data.access_token);
      localStorage.setItem("refreshToken", respons.data.refresh_token);

      // ── Toast sukses ──────────────────────────────────────────────────────
      showToast("Login berhasil! Selamat datang ✅", "success");

      setTimeout(() => navigate("/dashboard", {state: {fromLogin : true}}), 800);
    } catch (error) {
      // ── Toast error ───────────────────────────────────────────────────────
      const msg = error.response?.data?.detail ?? "Server tidak merespon. Coba lagi.";
      showToast(msg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (nameRef.current) nameRef.current.focus();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleLogin} className="flex flex-col gap-6">
        {/* Email */}
        <Form
          label={ isDesktop ? "Email" : "" }
          placeholder="nama@email.com"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          ref={nameRef}
        />

        {/* Password */}
        <Form
          label={ isDesktop ? "Password" : "" }
          placeholder="Masukkan password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit button */}
        <ButtonSecondary
          type="submit"
          isLoading={isLoading}
          className="w-full justify-center mt-2"
          style={{
            // background: "linear-gradient(135deg, #519a66 0%, #3d7a50 100%)",
            boxShadow: "0 8px 25px rgba(81,154,102,0.35)",
            opacity: isLoading ? 0.75 : 1,
            transform: isLoading ? "scale(0.98)" : "scale(1)",
          }}
        >
          Masuk ke Akun
        </ButtonSecondary>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div
          className="flex-1 h-px bg-black/50"
          
        />
        <span className="text-xs text-black" >
          atau
        </span>
        <div
          className="flex-1 h-px bg-black/50"
        />
      </div>

      {/* Register link */}
      <p className="text-center text-sm text-lg-gray">
        Belum punya akun?{" "}
        <Link
          to="/register"
          className="font-semibold transition-colors duration-200 text-lp-muted"
          onMouseEnter={(e) => (e.target.style.color = "#000")}
          onMouseLeave={(e) => (e.target.style.color = "#4A5568")}
        >
          Daftar gratis
        </Link>
      </p>
    </div>
  );
};

export default FormLogin;
