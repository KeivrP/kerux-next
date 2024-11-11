import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Typography, useTheme } from "@mui/material";
import { getIconByMode } from "./modal-utils";

interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  mode: "delete" | "confirm" | "alert"; // Modos de confirmación
  text?: string | null;
  title?: string | null;
  mensaje?: boolean; // Nueva prop para habilitar el campo de texto multilinea
  onMensajeChange?: (mensaje: string) => void; // Callback para manejar el cambio en el texto
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onConfirm,
  onCancel,
  mode,
  text = "¿Está seguro de que desea eliminar esta fila?",
  title = "CONFIRMAR ELIMINACIÓN",
  mensaje = false, // Valor por defecto para mensaje
  onMensajeChange, // Callback para manejar el cambio en el texto
}) => {
  const theme = useTheme();

  return (
    <Dialog
      sx={{
        borderRadius: "5rem",
      }}
      open={open}
    >
      {mensaje ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: theme.palette.background.default,
              padding: "10px",
              borderRadius: "1rem",
            }}
          >
            {getIconByMode(mode)}
            <Typography
              variant="h3"
              align="left"
              style={{ marginLeft: "10px" }}
            >
              {title}
            </Typography>
          </div>

          <DialogContent
            style={{
              display: "inline-flex",
              padding: "2.5rem 1.25rem 1.25rem 1.25rem",
              flexDirection: "column",
              minWidth: "35rem",
              borderRadius: "1rem",
              background: theme.palette.background.paper,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: -30,
                marginBottom: 20,
              }}
            >
              <br />
              <Typography variant="h3" sx={{ fontWeight: 200 }}>
                {text}
              </Typography>
            </div>
            <Typography variant="h3">Mensaje </Typography>
            <TextField
              multiline
              fullWidth
              rows={4}
              variant="outlined"
              onChange={(e) =>
                onMensajeChange && onMensajeChange(e.target.value)
              }
            />
          </DialogContent>
          <br />
          <DialogActions style={{ justifyContent: "right" }}>
            <Button
              variant="contained"
              color="secondary"
              style={{
                display: "flex",
                padding: "0.5rem 1.5625rem",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.625rem",
              }}
              onClick={onCancel}
            >
              <Typography variant="h3">Cancelar</Typography>
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{
                display: "flex",
                padding: "0.5rem 1.5625rem",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.625rem",
              }}
              onClick={onConfirm}
            >
              <Typography variant="h3">Enviar</Typography>
            </Button>
          </DialogActions>
        </>
      ) : (
        <DialogContent
          style={{
            display: "inline-flex",
            padding: "2.5rem 1.25rem 1.25rem 1.25rem",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "25rem",
            borderRadius: "1rem",
            background: theme.palette.background.paper,
          }}
        >
          {getIconByMode(mode)}

          <DialogTitle>
            <Typography variant="h1" color={"primary"}>
              {title}
            </Typography>
          </DialogTitle>

          <DialogContentText>
            <Typography variant="body1" align="center">
              {text}
            </Typography>
          </DialogContentText>
          <br />
          <DialogActions style={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              style={{
                display: "flex",
                padding: "0.5rem 1.5625rem",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.625rem",
              }}
              onClick={onCancel}
            >
              <Typography variant="h3">Cancelar</Typography>
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{
                display: "flex",
                padding: "0.5rem 1.5625rem",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.625rem",
              }}
              onClick={onConfirm}
            >
              <Typography variant="h3">Confirmar</Typography>
            </Button>
          </DialogActions>
        </DialogContent>
      )}
    </Dialog>
  );
};
