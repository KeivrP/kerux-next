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
            <Grid size={12} display="flex" alignItems="center">
              <Typography
                align="left"
                variant="h1"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fillRule="evenodd">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                    <path
                      fill={theme.palette.error.main}
                      d="m12 14.122l5.303 5.303a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879L6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.304a1.5 1.5 0 1 0 2.122 2.12z"
                    ></path>
                  </g>
                </svg>{" "}
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
