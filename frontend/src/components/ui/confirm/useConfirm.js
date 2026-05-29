import { createContext, useContext } from "react";

export const ConfirmContext = createContext(null);

/**
 * useConfirm – Hook untuk menampilkan dialog konfirmasi secara async.
 *
 * @returns {(message: string, title?: string) => Promise<boolean>}
 *
 * @example
 * const confirm = useConfirm();
 * const ok = await confirm("Yakin ingin menghapus data ini?");
 * if (ok) { ... }
 */
export const useConfirm = () => {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm harus digunakan di dalam <ConfirmProvider>");
  return ctx;
};
