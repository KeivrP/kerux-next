import { BaseTable, HeadersName } from "@/components/table-material/genericTable";
import { formatCurrency, formatDate } from "@/utils/main";
import { Cotizacion } from "./frecomp-types";

interface FrengcomProps {
  isLoading: boolean;
  cotizacion: Cotizacion[];
  cnsprov: string;
}

const FrengcomTable = ({ isLoading, cotizacion, cnsprov }: FrengcomProps) => {
   const columnsHeadersFrngcom: HeadersName[] = [
    { label: "N°", align: "center", minWidth: 90, padding: "6px" },
    ...(cnsprov === 'S' ? [{ label: "Nombre del Proveedor", minWidth: 140, padding: "6px" }] : []), // Conditional header
    { label: "Cant Cotizada", align: "center", padding: "6px" },
    { label: "Unidades", align: "center", minWidth: 130, padding: "6px" },
    { label: "Fechas Sol Cot", align: "center", minWidth: 80, padding: "6px" },
    { label: "Estado", align: "center", minWidth: 80, padding: "6px" },
    { label: "Fecha Estado", align: "center", minWidth: 80, padding: "6px" },
    { label: "Precio Unit", align: "center", minWidth: 80, padding: "6px" },
    { label: "Total", align: "center", minWidth: 80, padding: "6px" },
  ];

  return (
    <>
      <BaseTable
        loading={isLoading}
        rows={cotizacion}
        headers={columnsHeadersFrngcom}
        collapsible={{
          visible: (row: Cotizacion) => {
            const content = [
              { content: row.numcot, align: "center" as "center" },
              ...(cnsprov === 'S' ? [{ content: row.nomprov, align: "left" as "left" }] : []), // Conditional content
              { content: row.cantsolicitada, align: "center" as "center" },
              { content: row.undcmp, align: "center" as "center" },
              { content: formatDate(row.feccot), align: "center" as "center" },
              { content: row.stsreng, align: "center" as "center" },
              { content: formatDate(row.fecsts), align: "center" as "center" },
              { content: row.preciounit, align: "center" as "center" },
              { content: formatCurrency(row.total_reng), align: "center" as "center" },
            ];
            return content;
          },
          collapsed: () => [],
        }}
      ></BaseTable>
    </>
  );
};

export default FrengcomTable;