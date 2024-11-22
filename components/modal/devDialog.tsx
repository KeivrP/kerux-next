import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {
  Dialog,
  DialogTitle,
  Grid2 as Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { DoorClosedIcon } from "lucide-react";
import { formatDate } from "@/utils/main";


interface DevDialogProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  fecsol: string;
  handleConfirm: (data: string) => void;
}

export default function DevDialog({
  open,
  handleClose,
  fecsol,
  handleConfirm,
  title,
}: DevDialogProps) {
  const [data, setData] = useState("");
  const theme = useTheme();
  return (
    <React.Fragment>
      <Dialog open={open}>
        <DialogTitle
          sx={{
            display: "flex",
            height: "4rem",
            padding: "0.8125rem 1.9375rem",
            // justifyContent: "center",
            alignItems: "center",
            gap: "54.9375rem",
            borderRadius: "0.5rem 0.5rem 0.5rem 0.5rem",
            background: theme.palette.background.default,
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid size={11} display="flex" alignItems="center">
              {/* Avatar */}
              
              <Typography
                align="left"
                variant="h1"
                ml={2}
                sx={{ color: theme.palette.paper.dark }}
              >
                {title}
              </Typography>
            </Grid>
            <Grid>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 12,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <DoorClosedIcon style={{ color: theme.palette.paper.dark }} />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent sx={{ marginTop: "53.5px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h3">Mensaje</Typography>
            <Typography variant="h3">{formatDate(fecsol)}</Typography>
          </div>
          <TextField
            autoFocus
            id="outlined-multiline-flexible"
            multiline
            value={data}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setData(event?.target.value)
            }
            rows={8}
            sx={{ width: "34.5rem" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleConfirm(data);
              handleClose();
              setData("");
            }}
            variant="contained"
            color="primary"
            sx={{ width: "150px" }}
          >
            <Typography variant="h3">ENVIAR</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
