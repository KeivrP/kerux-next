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
} from "@mui/material"; // Importamos los componentes necesarios de la librería Material-UI

import React, { useState } from "react"; // Importamos React y el hook useState
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/es";
import { makeStyles } from "@mui/styles"; // Importar makeStyles desde @mui/styles
import { CirclePlus, CircleX, Filter, Trash, X } from "lucide-react";
import ButtonForms from "./buttonForms";

const today = dayjs();

export interface Filter {
  id?: string;
  column: string;
  value: string | Date;
  type: "date" | "check" | "number" | "desc";
  operator?: string;
}
interface FilterButtonProps {
  columns: Filter[];
  onApplyFilter: (filters: Filter[]) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  menu: {
    width: "35.5625rem", // Cambia esto al tamaño que prefieras
    borderRadius: "10px", // Ajusta el radio del borde según lo necesites
    margin: "2px", // Ajusta el margen según lo necesites
  },
  title: {
    backgroundColor: "#e7edf3", // Cambia esto al color que prefieras
    padding: 5,
    fontWeight: 400,
    fontSize: "1rem",
    color: "#575E71", // Añade un poco de espacio alrededor del título
  },
}));

const FilterButton = ({
  columns,
  onApplyFilter,
}: FilterButtonProps): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Definimos los estados para el menú y los filtros
  const [filters, setFilters] = useState<Filter[]>([]);
  // Definimos las funciones para manejar la apertura y cierre del menú
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  // Definimos las funciones para manejar la adición, cambio y eliminación de filtros
  const handleAddFilter = () => {
    setFilters([...filters, { column: "", value: "", type: "desc", id: "" }]);
  };
  const handleColumnChange = (index: number, column: string) => {
    const newFilters = [...filters];
    const selectedColumn = columns.find((c) => c.column === column);
    if (selectedColumn) {
      newFilters[index] = {
        ...newFilters[index],
        column,
        id: selectedColumn.id,
        type: selectedColumn.type, // Actualizar el tipo de filtro con el valor de la columna seleccionada
        value: selectedColumn.type == "date" ? new Date() : "",
      };
    } else {
      newFilters[index].column = column;
    }
    setFilters(newFilters);
  };

  const handleValueChange = (index: number, value: string) => {
    setFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      newFilters[index].value = value === "Buscar.." ? "" : value;
      return newFilters;
    });
  };

  const handleRemoveFilter = (index: number) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    setFilters(newFilters);
  };

  const handleRemoveAllFilter = () => {
    setFilters([]);
    onApplyFilter([]);
    handleCloseMenu();
  };

  // Definimos la función para aplicar los filtros
  const handleApplyFilters = () => {
    const appliedFilters = filters.filter(
      (filter) => filter.column !== "" && filter.value !== ""
    );
    onApplyFilter(appliedFilters);
    // onApplyFilter(appliedFilters);
    handleCloseMenu();
  };

  const handleOperatorChange = (index: number, value: string) => {
    const newFilters = [...filters];
    newFilters[index] = {
      ...newFilters[index],
      operator: value,
    };
    setFilters(newFilters);
  };

  const handleCheckChange = (index: number, event: string) => {
    const newFilters = [...filters];
    const value = event; // Actualizar el valor del filtro dependiendo del estado del checkbox
    newFilters[index] = {
      ...newFilters[index],
      value,
      operator: "=", // Establecer el operador como "="
    };
    setFilters(newFilters);
  };

  const handleDateChange = (index: number, date: Date | null) => {
    const newFilters = [...filters];
    // Si no se selecciona ninguna fecha, usa la fecha actual
    const selectedDate = date ? date : new Date();
    const value = dayjs(selectedDate).format("YYYY-MM-DD"); // Guardar la fecha seleccionada como una cadena ISO
    newFilters[index] = {
      ...newFilters[index],
      value, // Actualizar el valor del filtro con la fecha seleccionada
    };
    setFilters(newFilters);
  };

  return (
    <>
      {/* Botón de filtro que abre el menú */}
      <IconButton
        aria-label="Filtro"
        sx={{
          borderRadius: 2,
          backgroundColor: filters.length > 0 ? theme.palette.paper.light : "",
        }}
        onClick={handleOpenMenu}
      >
        {filters.length > 0 && (
          <IconButton
            title="Borrar Filtros"
            color="primary"
            sx={{ padding: 0 }}
            onClick={handleRemoveAllFilter}
          >
            <X fontSize="small" />
          </IconButton>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#142F62"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-filter"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>

        <Typography variant="body1">Filtrar</Typography>
      </IconButton>
      {/* Menú que muestra los filtros */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        keepMounted
        onClose={handleCloseMenu}
        slotProps={{
          paper: {
            className: classes.menu, // Aplica el estilo al menú
          },
        }}
      >
        <div className={classes.title}>
          <Typography variant="h2" sx={{ marginLeft: 1 }}>
            Filtrar por
          </Typography>
        </div>

        {/* Mapea los filtros y los muestra como opciones */}
        {filters.map((filter, index) => (
          <MenuItem key={index}>
            {/* Grid para mostrar el selector de columna, el input de valor y el botón de borrar filtro */}
            <Grid container spacing={2} paddingX={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="h3" sx={{ marginBottom: 1 }}>
                  Campo
                </Typography>
                {/* Selector de columna */}
                <TextField
                  size="small"
                  select
                  fullWidth
                  value={filter.column}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleColumnChange(index, event.target.value)
                  }
                >
                  {/* Opciones del selector de columna */}
                  {columns.map((column) => {
                    // Validar si el campo ya ha sido seleccionado
                    const isColumnSelected = filters.some(
                      (f) => f.column === column.column
                    );
                    if (!isColumnSelected || filter.column === column.column) {
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

              {/* Condicionales para mostrar el tipo de filtro */}
              {filter.type === "date" && (
                <Grid item xs={12} md={7.5}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={5.5}>
                      <Typography variant="h3" sx={{ marginBottom: 1 }}>
                        Variable
                      </Typography>
                      <TextField
                        size="small"
                        select
                        fullWidth
                        value={filter.operator}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleOperatorChange(index, event.target.value)}
                      >
                        {/*                         <MenuItem value="=">Igual</MenuItem>
                         */}
                        <MenuItem value=">">Mayor que</MenuItem>
                        <MenuItem value="<">Menor que</MenuItem>
                        <MenuItem value=">=">Mayor igual que</MenuItem>
                        <MenuItem value="<=">Menor igual que</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} md={5.5}>
                      <Typography variant="h3" sx={{ marginBottom: 1 }}>
                        Valor
                      </Typography>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale={"es"}
                      >
                        <DatePicker
                          defaultValue={today}
                          slotProps={{ textField: { size: "small" } }}
                          //disableFuture
                          views={["year", "month", "day"]}
                          onChange={(date) => {
                            handleDateChange(
                              index,
                              date ? date.toDate() : null
                            );
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={1}>
                      {/* Botón de borrar filtro */}
                      <Box paddingTop={3.5}>
                        <IconButton
                          color="primary"
                          onClick={() => handleRemoveFilter(index)}
                        >
                          <CircleX />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {filter.type === "number" && (
                <Grid item xs={12} md={7.5}>
                  <Grid container spacing={2}>
                    <Grid item xs={5.5}>
                      <Typography variant="h3" sx={{ marginBottom: 1 }}>
                        Variable
                      </Typography>
                      <TextField
                        size="small"
                        select
                        fullWidth
                        value={filter.operator}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleOperatorChange(index, event.target.value)}
                      >
                        <MenuItem value="=">Igual</MenuItem>
                        <MenuItem value=">">Mayor que</MenuItem>
                        <MenuItem value="<">Menor que</MenuItem>
                        <MenuItem value=">=">Mayor igual que</MenuItem>
                        <MenuItem value="<=">Menor igual que</MenuItem>
                        <MenuItem value="in">Incluido en</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} md={5.5}>
                      {/* Input de valor */}
                      <Typography variant="h3" sx={{ marginBottom: 1 }}>
                        Campo
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        onKeyDown={(event) => {
                          event.stopPropagation();
                        }}
                        value={filter.value}
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const newValue = event.target.value;
                          if (newValue === "" || /^[0-9]+$/.test(newValue)) {
                            handleValueChange(index, newValue);
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      {/* Botón de borrar filtro */}
                      <Box paddingTop={3.5}>
                        <IconButton
                          color="primary"
                          onClick={() => handleRemoveFilter(index)}
                        >
                          <CircleX />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {filter.type === "desc" && (
                <Grid item xs={12} md={7.5}>
                  <Grid container spacing={2}>
                    <Grid item xs={5.5}>
                      <Typography variant="h3" sx={{ marginBottom: 1 }}>
                        Variable
                      </Typography>
                      <TextField
                        size="small"
                        fullWidth
                        select
                        value={filter.operator}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleOperatorChange(index, event.target.value)}
                      >
                        {/* <MenuItem value="=">Igual</MenuItem> */}
                        <MenuItem value="like">Como en</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} md={5.5}>
                      {/* Input de valor */}
                      <Typography variant="h3" sx={{ marginBottom: 1 }}>
                        Campo
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        onKeyDown={(event) => {
                          event.stopPropagation();
                        }}
                        value={filter.value}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleValueChange(index, event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      {/* Botón de borrar filtro */}
                      <Box paddingTop={3.5}>
                        <IconButton
                          color="primary"
                          onClick={() => handleRemoveFilter(index)}
                        >
                          <CircleX />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {filter.type === "check" && (
                <Grid item xs={12} md={7.5}>
                  <Grid container spacing={2}>
                    <Grid item xs={5.5}>
                      <Typography variant="h3" sx={{ marginBottom: 1 }}>
                        Variable
                      </Typography>
                      <TextField
                        size="small"
                        fullWidth
                        select
                        value={filter.operator}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleOperatorChange(index, event.target.value)}
                      >
                        {/* <MenuItem value="=">Igual</MenuItem> */}
                        <MenuItem value="=">Igual</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} md={5.5}>
                      {/* Input de valor */}
                      <Typography variant="h3" sx={{ marginBottom: 1 }}>
                        Campo
                      </Typography>
                      <TextField
                        size="small"
                        fullWidth
                        select
                        value={filter.operator}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleCheckChange(index, event.target.value)}
                      >
                        {/* <MenuItem value="=">Igual</MenuItem> */}
                        <MenuItem value="S">Si</MenuItem>
                        <MenuItem value="N">No</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={1}>
                      {/* Botón de borrar filtro */}
                      <Box paddingTop={3.5}>
                        <IconButton
                          color="primary"
                          onClick={() => handleRemoveFilter(index)}
                        >
                          <CircleX />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </MenuItem>
        ))}
        {/* Boton anadir y borrar */}
        <MenuItem>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ paddingRight: 4 }}
          >
            <Grid item>
              {filters.length !== columns.length && (
                <ButtonForms color="secondary" onClick={handleAddFilter}>
                  <CirclePlus />
                  Añadir otro campo
                </ButtonForms>
              )}
            </Grid>
            <Grid item></Grid>
          </Grid>
        </MenuItem>
        {/* Bonton Aplicar */}
        <MenuItem>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ paddingRight: 4 }}
          >
            <Grid item>
              {filters.length > 0 && (
                <ButtonForms color="secondary" onClick={handleRemoveAllFilter}>
                  <Trash fontSize="small" /> Quitar todos
                </ButtonForms>
              )}
            </Grid>
            <Grid item>
              {/* Botón de aplicar filtros */}
              <Button
                onClick={handleApplyFilters}
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

export default FilterButton;
