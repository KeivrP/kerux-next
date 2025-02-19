import { BaseTable, HeadersName } from "@/components/table-material/genericTable";
import { formatDate } from "@/utils/main";
import { OrdenCompra } from "./frecomp-types";


interface FrengcomProps {
  isLoading: boolean;
  orden_compra: OrdenCompra[];
  cnsprov: string
}

const FrengcomTable2 = ({ isLoading, orden_compra, cnsprov }: FrengcomProps) => {

const columnsHeadersFrngcom2: HeadersName[] = [
    { label: "N°", align: "center", minWidth: 90, padding: "6px" },
    ...(cnsprov === 'S' ? [{ label: "Nombre del Proveedor", minWidth: 140, padding: "6px" }] : []), // Conditional header
    { label: "Fecha de Orden", align: "center", padding: "6px" },
    { label: "Cant. Comprada", align: "center", minWidth: 130, padding: "6px" },
    { label: "Unidades", align: "center", minWidth: 80, padding: "6px" },
    { label: "Cant.Entregada", align: "center", minWidth: 80, padding: "6px" },
    { label: "Ult.Seguimiento", align: "center", minWidth: 80, padding: "6px" },
    { label: "Precio Unit", align: "center", minWidth: 80, padding: "6px" },
    { label: "Total", align: "center", minWidth: 80, padding: "6px" },
  ];


  return (
    <>
      <BaseTable
        loading={isLoading}
        rows={orden_compra}
        headers={columnsHeadersFrngcom2}
        collapsible={{
          visible: (row: OrdenCompra) => {
            // Busca el objeto correspondiente en dataOrdenCompra

            return [
              { content: row.numoc, align: "center" },
            ...(cnsprov === 'S' ? [{ content: row.nombre, align: "left" as "left" }] : []), // Conditional content
              { content: formatDate(row.fecoc), align: "center" },
              { content: row.cantactoc, align: "center" },
              { content: row.undcmp, align: "center" },
              { content: row.cantrecoc, align: "center" },
              { content: formatDate(row.fecsts), align: "center" },
              { content: row.preciounit, align: "center" },
              { content: row.total_reng, align: "center" },
            ];
          },

          collapsed: () => [],
        }}
      ></BaseTable>
    </>
  );
};

export default FrengcomTable2;
