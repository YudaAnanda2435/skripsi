import { useState, useCallback, useRef } from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import { AlertTriangle } from "lucide-react";
import { ConfirmContext } from "./useConfirm";

// ─── ConfirmProvider ──────────────────────────────────────────────────────────
/**
 * Wrap App.jsx dengan komponen ini agar useConfirm tersedia global.
 */
export const ConfirmProvider = ({ children }) => {
  const [state, setState] = useState({
    open: false,
    title: "",
    description: "",
    confirmLabel: "Ya, Lanjutkan",
    cancelLabel: "Batal",
    color: "danger",        // "danger" | "warning" | "primary" | "neutral"
  });

  // Ref untuk menyimpan resolve dari Promise aktif
  const resolveRef = useRef(null);

  /**
   * Tampilkan dialog konfirmasi dan tunggu pilihan user.
   *
   * @param {string} description   - Pesan utama dialog
   * @param {object} [options]     - Opsi tambahan
   * @param {string} [options.title]        - Judul dialog (default: "Konfirmasi")
   * @param {string} [options.confirmLabel] - Teks tombol konfirmasi
   * @param {string} [options.cancelLabel]  - Teks tombol batal
   * @param {string} [options.color]        - Warna tombol ("danger"|"warning"|"primary")
   * @returns {Promise<boolean>}
   */
  const confirm = useCallback(
    (
      description,
      {
        title = "Konfirmasi",
        confirmLabel = "Ya, Lanjutkan",
        cancelLabel = "Batal",
        color = "danger",
      } = {}
    ) => {
      return new Promise((resolve) => {
        resolveRef.current = resolve;
        setState({
          open: true,
          title,
          description,
          confirmLabel,
          cancelLabel,
          color,
        });
      });
    },
    []
  );

  const handleConfirm = () => {
    setState((prev) => ({ ...prev, open: false }));
    resolveRef.current?.(true);
  };

  const handleCancel = () => {
    setState((prev) => ({ ...prev, open: false }));
    resolveRef.current?.(false);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      <Modal
        open={state.open}
        onClose={handleCancel}
        sx={{ zIndex: 10000 }}
      >
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          sx={{
            maxWidth: 420,
            borderRadius: "xl",
            p: 3,
            boxShadow: "lg",
          }}
        >
          {/* ── Header ── */}
          <Stack direction="row" spacing={1.5} alignItems="center" mb={0.5}>
            <AlertTriangle
              size={22}
              strokeWidth={2}
              style={{ color: "var(--joy-palette-warning-500, #f59e0b)", flexShrink: 0 }}
            />
            <Typography level="title-lg" fontWeight={700}>
              {state.title}
            </Typography>
          </Stack>

          <Divider sx={{ my: 1.5 }} />

          {/* ── Body ── */}
          <Typography level="body-md" sx={{ color: "text.secondary", mb: 2.5, lineHeight: 1.6 }}>
            {state.description}
          </Typography>

          {/* ── Actions ── */}
          <Stack direction="row" spacing={1.5} justifyContent="flex-end">
            <Button
              variant="plain"
              color="neutral"
              onClick={handleCancel}
              sx={{ borderRadius: "lg" }}
            >
              {state.cancelLabel}
            </Button>
            <Button
              variant="solid"
              color={state.color}
              onClick={handleConfirm}
              sx={{ borderRadius: "lg" }}
            >
              {state.confirmLabel}
            </Button>
          </Stack>
        </ModalDialog>
      </Modal>
    </ConfirmContext.Provider>
  );
};
