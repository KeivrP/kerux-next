import { BaseTable } from "@/components/table-material/genericTable";
import { formatDate } from "@/utils/main";
import { columnsHeadersFrngcom } from "./header-table";
import { Cotizacion } from "./frecomp-types";


interface FrengcomProps {
  isLoading: boolean;
  cotizacion: Cotizacion[];
}

const FrengcomTable = ({ isLoading, cotizacion }: FrengcomProps) => {


  return (
    <>
      <BaseTable
        loading={isLoading}
        rows={cotizacion}
        headers={columnsHeadersFrngcom}
        collapsible={{
          visible: (row) => {
            // Busca el objeto correspondiente en dataOrdenCompra
            return [
              { content: row.numprov, align: "center" },
              { content: row.nomprov, align: "left" },
              { content: row.cantsolicitada, align: "center" },
              { content: row.undcmp, align: "center" },
              { content: formatDate(row.feccot), align: "center" },
              { content: row.stsreng, align: "center" },
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

export default FrengcomTable;
