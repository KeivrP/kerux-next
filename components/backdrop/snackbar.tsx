import {
  Button,
  DialogContentText,
  IconButton,
  Snackbar,
  SnackbarContent,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createContext, useContext, useState } from "react";
import { makeStyles } from "@mui/styles";
import { isResponse, isString } from "../../utils/main";
import { Response, SnackMessage } from "../../utils/types";
import {
  DialogActionsCentered,
  DialogContentCentered,
  DialogStyled,
  DialogTitleCentered,
} from "../dialog/alertDialog";
import ErrorIcon from "../../icons/snackbarIcon/errorIcon.svg";
import SuccessIcon from "../../icons/snackbarIcon/succesIcon.svg";
import AlertIcon from "../../icons/snackbarIcon/alertIcon.svg";
import InfoIcon from "../../icons/snackbarIcon/infoIcon.svg";

interface SnackbarGlobalProps {
  children: React.ReactNode;
}

interface SnackbarContextProps {
  handleSnack: (msg: string, open: boolean, mode: string) => void;
}
//Este contexto se puede utilizar para compartir datos
//entre componentes en una aplicación de React.
const SanckbarContext = createContext<SnackbarContextProps | undefined>(
  undefined
);

//La fucnion para acceder al valor almacendado en el contexto
export const useSnackbar = () => {
  const context = useContext(SanckbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used");
  }
  return context;
};

const useStyles = makeStyles(() => ({
  snack: {
    borderRadius: "0.3125rem",
    boxShadow:
      "0px 4px 7px 0px rgba(0, 0, 0, 0.15), 0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.20)",
    display: "center-flex",
    height: "3.75rem",
    padding: "0rem 1.5625rem",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "1.0625rem",
    flexShrink: 0,
  },
}));

const getIconByMode = (mode: string): React.ReactNode => {
  switch (mode) {
    case "error":
      return <img src={ErrorIcon} />;
    case "success":
      return <img src={SuccessIcon} />;
    case "info":
      return <img src={InfoIcon} />;
    case "alert":
      return <img src={AlertIcon} />;
    default:
      return null;
  }
};

const getSnackTitle = (mode: string): string => {
  switch (mode) {
    case "error":
      return "MENSAJE DE ERROR";
    case "success":
      return "MENSAJE DE CONFIRMACIÓN";
    case "info":
      return "MENSAJE DE INFO";
    case "alert":
      return "MENSAJE DE ALERTA";
    default:
      return "";
  }
};

const SnackbarGlobal: React.FC<SnackbarGlobalProps> = ({ children }) => {
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackMode, setSnackMode] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const snackTitle = getSnackTitle(snackMode);

  const handleSnack = (
    msg: SnackMessage,
    open: boolean,
    modeOptional: string
  ) => {
    if (isResponse(msg)) {
      handleResponse(msg as Response, open);
    } else if (isString(msg)) {
      console.log(msg);
      handleString(msg, open, modeOptional);
    } else if (Array.isArray(msg)) {
      // console.log(msg);
      handleString(msg[0], open, modeOptional);
    }
  };
  const resetStates = () => {
    setSnackMsg("");
    setSnackMode("");
    setOpenDialog(false);
    setOpen(false);
  };

  const handleResponse = (response: Response, open: boolean) => {
    setSnackMode(response.mode);
    setSnackMsg(response.message);
    console.log(response);

    if (response.alert === "A") {
      setOpenDialog(open);
      console.log(open);
    } else if (response.alert === "S") {
      setOpen(open);
    }
  };

  const handleString = (str: string, open: boolean, mode: string) => {
    setSnackMsg(str);
    setOpen(open);
    setSnackMode(mode);
  };

  const AlertDialog: React.FC = () => {
    return (
      <DialogStyled open={openDialog} onClose={() => resetStates()}>
        <DialogTitleCentered>
          <Typography variant="h1" color="primary">
            {snackTitle}
          </Typography>
        </DialogTitleCentered>
        <DialogContentCentered>
          {getIconByMode(snackMode)}
          <DialogContentText style={{ textAlign: "center" }}>
            <Typography variant="body1">{snackMsg}</Typography>
          </DialogContentText>
        </DialogContentCentered>
        <DialogActionsCentered>
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
            onClick={() => resetStates()}
          >
            <Typography variant="h3">Confirmar</Typography>
          </Button>
        </DialogActionsCentered>
      </DialogStyled>
    );
  };

  return (
    <SanckbarContext.Provider value={{ handleSnack }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={() => resetStates()}
      >
        <SnackbarContent
          sx={{ background: theme.palette.background.paper }}
          className={classes.snack}
          message={
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                {getIconByMode(snackMode)}
                <Typography
                  variant="h3"
                  sx={{ marginLeft: 2 }}
                  color={theme.palette.paper.dark}
                >
                  {snackMsg}
                </Typography>
              </div>
            </>
          }
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => resetStates()}
            >
              <CloseIcon
                fontSize="small"
                sx={{ color: theme.palette.paper.dark }}
              />
            </IconButton>
          }
        />
      </Snackbar>
      <AlertDialog />
    </SanckbarContext.Provider>
  );
};
export default SnackbarGlobal;
