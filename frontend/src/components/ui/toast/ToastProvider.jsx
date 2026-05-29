import { useState, useCallback, useRef, useEffect } from "react";
import Snackbar from "@mui/joy/Snackbar";
import Alert from "@mui/joy/Alert";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";
import { ToastContext } from "./ToastContext";

// ─── Konfigurasi per variant ──────────────────────────────────────────────────
const VARIANT_CONFIG = {
  success: {
    color: "success",
    Icon: CheckCircle,
    label: "Berhasil",
  },
  error: {
    color: "danger",
    Icon: XCircle,
    label: "Error",
  },
  warning: {
    color: "warning",
    Icon: AlertTriangle,
    label: "Peringatan",
  },
  info: {
    color: "neutral",
    Icon: Info,
    label: "Info",
  },
};

let idCounter = 0;

// ─── ToastItem – satu item toast ─────────────────────────────────────────────
const ToastItem = ({ toast, onClose }) => {
  const { id, message, variant } = toast;
  const config = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.info;
  const { color, Icon, label } = config;

  return (
    <Snackbar
      key={id}
      open={toast.open}
      onClose={() => onClose(id)}
      autoHideDuration={toast.duration}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="soft"
      color={color}
      size="md"
      sx={{
        position: "static",       // posisi diatur oleh wrapper
        transform: "none",
        minWidth: 300,
        maxWidth: 420,
        borderRadius: "xl",
        boxShadow: "lg",
        gap: 1.5,
        px: 2,
        py: 1.5,
        "--Snackbar-inset": 0,
        animation: toast.open
          ? "toastIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          : "toastOut 0.25s ease-in forwards",
      }}
      startDecorator={<Icon size={20} strokeWidth={2} />}
      endDecorator={
        <IconButton
          size="sm"
          variant="plain"
          color={color}
          onClick={() => onClose(id)}
          sx={{ borderRadius: "50%" }}
        >
          <X size={16} />
        </IconButton>
      }
    >
      <div>
        <Typography level="title-sm" sx={{ fontWeight: 700 }}>
          {label}
        </Typography>
        <Typography level="body-sm" sx={{ opacity: 0.85 }}>
          {message}
        </Typography>
      </div>
    </Snackbar>
  );
};

// ─── ToastProvider ────────────────────────────────────────────────────────────
/**
 * Wrap App.jsx dengan komponen ini agar useToast tersedia global.
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  /** Tampilkan toast baru */
  const showToast = useCallback(
    (message, variant = "info", duration = 4000) => {
      const id = ++idCounter;
      setToasts((prev) => [
        ...prev,
        { id, message, variant, duration, open: true },
      ]);

      // Auto-remove dari DOM setelah animasi keluar selesai
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration + 350);
    },
    []
  );

  /** Tutup toast secara manual */
  const closeToast = useCallback((id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, open: false } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  // Listener untuk event sesi habis dari axios interceptor (di luar React)
  useEffect(() => {
    const handler = (e) => {
      showToast(e.detail?.message ?? "Sesi login kedaluwarsa.", "error", 5000);
    };
    window.addEventListener("agro:session-expired", handler);
    return () => window.removeEventListener("agro:session-expired", handler);
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* ── Container pojok kanan bawah ── */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          alignItems: "flex-end",
          pointerEvents: "none",
        }}
      >
        {toasts.map((toast) => (
          <div key={toast.id} style={{ pointerEvents: "auto" }}>
            <ToastItem toast={toast} onClose={closeToast} />
          </div>
        ))}
      </div>

      {/* ── Animasi keyframes ── */}
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(60px) scale(0.9); }
          to   { opacity: 1; transform: translateX(0)    scale(1);   }
        }
        @keyframes toastOut {
          from { opacity: 1; transform: translateX(0)    scale(1);   }
          to   { opacity: 0; transform: translateX(60px) scale(0.9); }
        }
      `}</style>
    </ToastContext.Provider>
  );
};
