import { BaseTable } from "@/components/table-material/genericTable";
import { columnsHeadersFrngcom2 } from "./header-table";
import { formatDate } from "@/utils/main";
import { OrdenCompra } from "./frecomp-types";


interface FrengcomProps {
  isLoading: boolean;
  orden_compra: OrdenCompra[];
}

const FrengcomTable2 = ({ isLoading, orden_compra }: FrengcomProps) => {


  return (
    <>
      <BaseTable
        loading={isLoading}
        rows={orden_compra}
        headers={columnsHeadersFrngcom2}
        collapsible={{
          visible: (row) => {
            // Busca el objeto correspondiente en dataOrdenCompra

            return [
              { content: row.numbenef, align: "center" },
              { content: row.nombre, align: "left" },
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
