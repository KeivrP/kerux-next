import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Typography, useTheme } from "@mui/material";

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

  const getIconByMode = (mode: string): React.ReactNode => {
    switch (mode) {
      case "delete":
        return <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="fluent-mdl2:status-error-full" clip-path="url(#clip0_562_14000)">
            <path id="Vector" d="M15 0C16.377 0 17.7051 0.175781 18.9844 0.527344C20.2637 0.878906 21.4551 1.38672 22.5586 2.05078C23.6621 2.71484 24.6729 3.49609 25.5908 4.39453C26.5088 5.29297 27.2949 6.30371 27.9492 7.42676C28.6035 8.5498 29.1064 9.74609 29.458 11.0156C29.8096 12.2852 29.9902 13.6133 30 15C30 16.377 29.8242 17.7051 29.4727 18.9844C29.1211 20.2637 28.6133 21.4551 27.9492 22.5586C27.2852 23.6621 26.5039 24.6729 25.6055 25.5908C24.707 26.5088 23.6963 27.2949 22.5732 27.9492C21.4502 28.6035 20.2539 29.1064 18.9844 29.458C17.7148 29.8096 16.3867 29.9902 15 30C13.623 30 12.2949 29.8242 11.0156 29.4727C9.73633 29.1211 8.54492 28.6133 7.44141 27.9492C6.33789 27.2852 5.32715 26.5039 4.40918 25.6055C3.49121 24.707 2.70508 23.6963 2.05078 22.5732C1.39648 21.4502 0.893555 20.2539 0.541992 18.9844C0.19043 17.7148 0.00976562 16.3867 0 15C0 13.623 0.175781 12.2949 0.527344 11.0156C0.878906 9.73633 1.38672 8.54492 2.05078 7.44141C2.71484 6.33789 3.49609 5.32715 4.39453 4.40918C5.29297 3.49121 6.30371 2.70508 7.42676 2.05078C8.5498 1.39648 9.74609 0.893555 11.0156 0.541992C12.2852 0.19043 13.6133 0.00976562 15 0ZM16.6553 15L21.665 9.99023L20.0098 8.33496L15 13.3447L9.99023 8.33496L8.33496 9.99023L13.3447 15L8.33496 20.0098L9.99023 21.665L15 16.6553L20.0098 21.665L21.665 20.0098L16.6553 15Z" fill="#BA1A1A" />
          </g>
          <defs>
            <clipPath id="clip0_562_14000">
              <rect width="30" height="30" fill="white" />
            </clipPath>
          </defs>
        </svg>
          ;
      case "confirm":
        return <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="Vector" d="M15 0C18.9782 0 22.7936 1.58035 25.6066 4.3934C28.4196 7.20644 30 11.0218 30 15C30 18.9782 28.4196 22.7936 25.6066 25.6066C22.7936 28.4196 18.9782 30 15 30C11.0218 30 7.20644 28.4196 4.3934 25.6066C1.58035 22.7936 0 18.9782 0 15C0 11.0218 1.58035 7.20644 4.3934 4.3934C7.20644 1.58035 11.0218 0 15 0ZM13.1314 17.9593L9.79928 14.625C9.67983 14.5055 9.53801 14.4108 9.38194 14.3461C9.22586 14.2815 9.05858 14.2482 8.88964 14.2482C8.72071 14.2482 8.55342 14.2815 8.39735 14.3461C8.24127 14.4108 8.09946 14.5055 7.98 14.625C7.73875 14.8663 7.60321 15.1935 7.60321 15.5346C7.60321 15.8758 7.73875 16.203 7.98 16.4443L12.2229 20.6871C12.342 20.8072 12.4837 20.9025 12.6398 20.9675C12.7959 21.0325 12.9634 21.066 13.1325 21.066C13.3016 21.066 13.4691 21.0325 13.6252 20.9675C13.7813 20.9025 13.923 20.8072 14.0421 20.6871L22.8279 11.8993C22.9489 11.7803 23.0452 11.6386 23.1112 11.4822C23.1772 11.3258 23.2116 11.158 23.2124 10.9882C23.2132 10.8185 23.1803 10.6503 23.1158 10.4934C23.0513 10.3364 22.9563 10.1937 22.8363 10.0737C22.7164 9.95358 22.5739 9.85843 22.417 9.79371C22.2601 9.72899 22.0919 9.69597 21.9222 9.69656C21.7525 9.69715 21.5846 9.73133 21.4281 9.79714C21.2717 9.86295 21.1298 9.95909 21.0107 10.08L13.1314 17.9593Z" fill="#1B6C31" />
        </svg>
          ;
      case "info":
        return <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="ooui:alert">
            <path id="Vector" d="M17.2952 3.44994C17.0935 2.99733 16.7743 2.60699 16.3707 2.31947C15.9671 2.03195 15.4939 1.85774 15.0002 1.81494C14.5092 1.86031 14.0391 2.0357 13.6384 2.32307C13.2376 2.61045 12.9207 2.99941 12.7202 3.44994L0.540223 24.5399C-0.719777 26.7149 0.315223 28.4999 2.82022 28.4999H27.1802C29.6852 28.4999 30.7202 26.7149 29.4602 24.5399L17.2952 3.44994ZM16.5002 23.9999H13.5002V20.9999H16.5002V23.9999ZM16.5002 17.9999H13.5002V8.99994H16.5002V17.9999Z" fill="#F9A825" />
          </g>
        </svg>
          ;
      case "alert":
        return <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="material-symbols:mail">
            <path id="Vector" d="M5 25C4.3125 25 3.72375 24.755 3.23375 24.265C2.74375 23.775 2.49917 23.1867 2.5 22.5V7.5C2.5 6.8125 2.745 6.22375 3.235 5.73375C3.725 5.24375 4.31334 4.99917 5 5H25C25.6875 5 26.2763 5.245 26.7663 5.735C27.2563 6.225 27.5008 6.81334 27.5 7.5V22.5C27.5 23.1875 27.255 23.7763 26.765 24.2663C26.275 24.7563 25.6867 25.0008 25 25H5ZM15 16.25L25 10V7.5L15 13.75L5 7.5V10L15 16.25Z" fill="#142F62" />
          </g>
        </svg>
          ;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open}>
      {mensaje ? ( // Mostrar el campo de texto si mensaje es true
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: theme.palette.background.default,
              padding: "10px",
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
              /*      gap: "0.25rem", */
              borderRadius: "0.5rem",
              background: theme.palette.background.paper,
              // boxShadow:            "0px 3px 14px 2px rgba(0, 0, 0, 0.12), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 5px 5px -3px rgba(0, 0, 0, 0.02)"
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
              } // Manejar el cambio en el texto
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
                //marginBottom: '16px',
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
                //marginBottom: '16px',
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
            /*      gap: "0.25rem", */
            borderRadius: "0.5rem",
            background: theme.palette.background.paper,
            // boxShadow:            "0px 3px 14px 2px rgba(0, 0, 0, 0.12), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 5px 5px -3px rgba(0, 0, 0, 0.02)"
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
                //marginBottom: '16px',
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
                //marginBottom: '16px',
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
