import {
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";

import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { ArrowDownUp, CirclePlus, CircleX, X } from "lucide-react";
import ButtonForms from "./buttonForms";

type OrderType = "ASC" | "DESC";

export interface Order {
  operator?: OrderType;
  column: string;
  id?: string;
}

interface OrderButtonProps {
  columns: Order[];
  onApplyOrder: (orders: Order[]) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  menu: {
    width: "35.5625rem", // Cambia esto al tamaño que prefieras
    borderRadius: "10px", // Ajusta el radio del borde según lo necesites
    margin: '2px', // Ajusta el margen según lo necesites
  },
  title: {
    backgroundColor: '#e7edf3', // Cambia esto al color que prefieras
    padding: 5,
    fontWeight: 400,
    fontSize: "1rem",
    color: '#575E71', // Añade un poco de espacio alrededor del título
  },
}));


const OrderButton = ({
  columns,
  onApplyOrder,
}: OrderButtonProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const classes = useStyles();
  const theme = useTheme();

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleRemoveAllOrders = () => {
    setOrders([]);
    handleApplyOrders();
  };

  const handleAddOrder = () => {
    setOrders([...orders, { column: "", id: "", operator: 'ASC' }]);
  };

  const handleColumnChange = (index: number, columnId: string) => {
    const column = columns.find((option) => option.column === columnId);
    const newOrders = [...orders];
    newOrders[index].column = column?.column || "";
    newOrders[index].id = column?.id || "";
    setOrders(newOrders);
  };

  const handleValueChange = (index: number, value: OrderType) => {
    const newOrders = [...orders];
    newOrders[index].operator = value;
    setOrders(newOrders);
  };

  const handleRemoveOrder = (index: number) => {
    const newOrders = [...orders];
    newOrders.splice(index, 1);
    setOrders(newOrders);
  };

  const handleApplyOrders = () => {
    const appliedOrders = orders.filter((order) => order.column !== "");
    onApplyOrder(appliedOrders);
    handleCloseMenu();
  };

  return (
    <>
      <IconButton
        aria-label="Ordenar"
        sx={{
          borderRadius: 2,
          backgroundColor: orders.length > 0 ? theme.palette.paper.light : "",
        }}
        onClick={handleOpenMenu}
      >
        {orders.length > 0 && (
          <IconButton
            title="Borrar Orden"
            color="primary"
            sx={{ padding: 0 }}
            onClick={handleRemoveAllOrders}
          >
            <CircleX fontSize="small" />
          </IconButton>
        )}
        <ArrowDownUp color="primary" />
        <Typography variant="body1">Ordenar</Typography>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        slotProps={{
          paper: {
            className: classes.menu, // Aplica el estilo al menú
          },
        }}
      >
        <div className={classes.title}>
          <Typography variant="h2" sx={{ marginLeft: 1 }}>
            Ordenar por
          </Typography>
        </div>

        {orders.map((order, index) => (
          <MenuItem key={index}>
            <Grid container spacing={2} paddingX={2}>
              <Grid item xs={12} md={5.5}>
                <Typography variant="h3" sx={{ marginBottom: 1 }}>
                  Campo
                </Typography>
                <TextField
                  size="small"
                  select
                  fullWidth
                  value={order.column}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleColumnChange(index, event.target.value)
                  }
                >
                  {columns.map((column) => {
                    // Validar si el campo ya ha sido seleccionado
                    const isColumnSelected = orders.some(
                      (f) => f.column === column.column
                    );
                    if (!isColumnSelected || order.column === column.column) {
                      return (
                        <MenuItem key={column.column} value={column.column}>
                          {column.column}
                        </MenuItem>
                      );
                    }
                    return null;
                  })}
                </TextField>
              </Grid>
              <Grid item xs={12} md={5.5}>
                <Typography variant="h3" sx={{ marginBottom: 1 }}>
                  Operador
                </Typography>
                <TextField
                  size="small"
                  select
                  fullWidth
                  value={order.operator || ""}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleValueChange(index, event.target.value as OrderType)
                  }
                >
                  <MenuItem value="ASC">{`A → B`}</MenuItem>
                  <MenuItem value="DESC">{"B → A"}</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={1}>
                {/* Botón de borrar filtro */}
                <Box paddingTop={3.5}>
                  <IconButton
                    color="primary"
                    onClick={() => handleRemoveOrder(index)}
                  >
                    <X />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </MenuItem>
        ))}

        {orders.length !== columns.length && (
          <MenuItem>
            <Grid item>
              <ButtonForms
                color={theme.palette.secondary.main}
                onClick={handleAddOrder}
              >
                <CirclePlus />
                Añadir otro campo
              </ButtonForms>
            </Grid>
          </MenuItem>
        )}
        <MenuItem>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ paddingRight: 4 }}
          >
            <Grid item>
              {orders.length > 0 && (
                <ButtonForms
                  color={theme.palette.secondary.main}
                  onClick={handleRemoveAllOrders}
                >
                  <X fontSize="small" /> Quitar todos
                </ButtonForms>
              )}
            </Grid>
            <Grid item>
              {/* Botón de aplicar filtros */}
              <Button
                onClick={handleApplyOrders}
                variant="contained"
                color="primary"
                style={{
                  display: "flex",
                  padding: "0.5rem 2.5625rem",
                  gap: "0.625rem",
                }}
              >
                <Typography
                  style={{ textTransform: "capitalize" }}
                  variant="h3"
                >
                  aplicar
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </MenuItem>
      </Menu>
    </>
  );
};

export default OrderButton;
