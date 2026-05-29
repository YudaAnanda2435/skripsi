import { createContext, useContext } from "react";

export const ToastContext = createContext(null);

/**
 * useToast – Hook untuk menampilkan toast notification dari komponen manapun.
 *
 * @returns {{ showToast: (message: string, variant?: 'success'|'error'|'warning'|'info') => void }}
 *
 * @example
 * const { showToast } = useToast();
 * showToast("Login berhasil", "success");
 */
export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast harus digunakan di dalam <ToastProvider>");
  return ctx;
};
