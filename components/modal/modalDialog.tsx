import React from "react";
import {
  Button,
  Dialog,
  Typography,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  useTheme,
  
} from "@mui/material";


interface BaseDialogProps {
  width?: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  dialogOpen: boolean;
  handleClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  alternativeFooter?: React.ReactNode;
  cancelText?: string;
  confirm?: () => void;
  formId?: string;
  confirmText?: string;
  disableCancelButton?: boolean;
  [key: string]: any; // Prop para recibir cualquier otra prop
}

const ModalDialog: React.FC<BaseDialogProps> = ({
  width,
  dialogOpen,
  handleClose,
  title,
  children,
  alternativeFooter,
  cancelText,
  confirm,
  formId,
  confirmText,
  disableCancelButton,
  ...otherProps
}) => {
  return (
    <Dialog
      fullWidth
      maxWidth={width || "lg"}
      onClose={handleClose}
      open={dialogOpen}
      style={{ zIndex: 50 }} // Set a lower z-index

      {...otherProps}
    >
      <DialogTitle onClose={handleClose}>{title || "Nameless"}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      {alternativeFooter ? (
        alternativeFooter
      ) : (
        <DialogActions>
          {!disableCancelButton && ( // Check the disableCancelButton prop
            <Button onClick={handleClose} color="secondary">
              <Typography textTransform="uppercase">
                {cancelText || "Cancel"}
              </Typography>
            </Button>
          )}
          {confirm &&
            (formId ? (
              <Button type="submit" form={formId} color="secondary">
                <Typography textTransform="uppercase">
                  {confirmText || "Save"}
                </Typography>
              </Button>
            ) : (
              <Button onClick={confirm} color="secondary">
                <Typography textTransform="uppercase">
                  {confirmText || "Save"}
                </Typography>
              </Button>
            ))}
        </DialogActions>
      )}
    </Dialog>
  );
};

interface DialogTitleProps {
  children: React.ReactNode;
  onClose?: () => void;
}

const DialogTitle: React.FC<DialogTitleProps> = ({ children, onClose }) => {
  const theme = useTheme();

  return (
    <MuiDialogTitle
      sx={{
        height: "4rem",
        background: theme.palette.background.default,
      }}
    >
      <div className="flex justify-between items-center mb-4">
          <h5
            id="drawer-label"
            className="inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400"
          >
            {children}
          </h5>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
        </div>
    </MuiDialogTitle>
  );
};

interface DialogContentProps {
  children: React.ReactNode;
  newPadding?: number;
}

const DialogContent: React.FC<DialogContentProps> = ({ children }) => (
  <MuiDialogContent
    style={{
      paddingTop: 16,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
    }}
  >
    {children}
  </MuiDialogContent>
);

interface DialogActionsProps {
  children: React.ReactNode;
}

const DialogActions: React.FC<DialogActionsProps> = ({ children }) => (
  <MuiDialogActions>{children}</MuiDialogActions>
);

export default ModalDialog;
