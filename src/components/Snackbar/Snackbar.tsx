import * as React from "react";
import { Alert, Snackbar as MuiSnackbar } from "@mui/material";
import { useSnackbar } from "@/contexts/snackbar-context/snackbar-context";

export default function Snackbar() {
  const { open, message, closeSnackbar, severity } = useSnackbar();

  const handleClose = () => {
    closeSnackbar();
  };

  return (
    <div>
      <MuiSnackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={severity} variant="filled">
          {message}
        </Alert>
      </MuiSnackbar>
    </div>
  );
}
