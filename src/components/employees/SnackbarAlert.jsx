import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function SnackbarAlert({ message, onClose }) {
  return (
    <Snackbar open={!!message} autoHideDuration={3000} onClose={onClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <MuiAlert onClose={onClose} severity="success" variant="filled">{message}</MuiAlert>
    </Snackbar>
  );
}
