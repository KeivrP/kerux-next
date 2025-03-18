import CardHead from "./cardHead";
import FilterButton, { Filter } from "../button/FilterButton";
import OrderButton, { Order } from "../button/OrderButton";
import { Button, ButtonProps, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQueryData } from "@/server/fetch-data";
import AutocompleteAsync from "@/components/ui/autocompleteAsync";
import { Compradoreslist } from "@/app/(modules)/menucomVFINAL/tcompdor/tcompdor-types";
import { Rows } from "lucide-react";
import { OptionType } from "@/types/main";
/* import { SearchInput } from "../searchInput"; */
import _ from "lodash";
import { useSession } from "next-auth/react";
import { UserLogin } from "next-auth";
import { Session } from '@/types/next-auth';
import { Comprador, UnidadCompra } from "@/app/(modules)/menulog/tsolsum/tsolsum-types";

interface ActionCardReasignarHeaderProps {
  children?: React.ReactNode;
  onApplyFilter?: (filters: Filter[]) => void;
  columnsFilter?: Filter[];
  onApplyOrder?: (order: Order[]) => void;
  columnsOrder?: Order[];
  add?: () => void;
  setOrder?: (a: any) => void;
  setFilter?: (a: any) => void;
  reasignar?: (a: any) => void;
  isAddButtonVisible?: boolean;
  isAddButtonAdicionalVisible?: boolean;
  isAddButtonAdicionalActive?: boolean;
  isAddFilterVisible?: boolean;
  isAddOrderVisible?: boolean;
  actions?: ButtonProps;
  title?: string | React.ReactNode;
  titleButton?: string;
}[];


const ActionCardReasignarHeader = ({
  children = [],
  columnsFilter = [],
  columnsOrder = [],
  setOrder,
  setFilter,
  add,
  title,
  isAddButtonVisible = true,
  isAddFilterVisible = true, // Set the default value to true
  isAddOrderVisible = true, // Set the default value to true
  isAddButtonAdicionalVisible = true, // Set the default value to true
  isAddButtonAdicionalActive = false, // Set the default value to true
  actions,
  titleButton,
  reasignar,
}: ActionCardReasignarHeaderProps) => {

  const [rows, setRows] = useState<Compradoreslist[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [initValue, setInitValue] = useState<string>('');
  const { data: session, status } = useSession();
  const [ comprador, setComprador]  = useState<Comprador>();
  const [ compradorSelected, setCompradorSelected]  = useState<string>();

  const  {data: data_comprador } = useQueryData({

    entity: "undcompra_comprador",
    api: 'comp',
    params: {
    },
    dependency: [],
  });


  const { data  } = useQueryData({
    entity: "comprador",
    api: 'comp',
    params: {
      codundcmp: comprador?.codundcmp
    },
    dependency: [data_comprador],
  });


  useEffect(() => {

    setComprador(data_comprador|| {codundcmpi:"", codcomprador:""});
  }, [data_comprador]);

  useEffect(() => {
    setRows(data|| []);
    setLoading(false);
  }, [data]);


    const options: OptionType[] = _.map(rows, (item) => {
        const label = String(item ? item.nomcomprador : "");
        const value = String(item ? item.codcomprador : "");

        return { label, value };
    });

  return (
    <>
      <CardHead>
        <div className="flex items-center justify-between">
                <AutocompleteAsync
                    text="value"
                    sx={{width: '35%'}}
                    loading={isLoading}
                    options={options}
                    defaultValue={initValue}
                    reset={false}
                    onSelectionChange={(e) =>
                      setCompradorSelected(e?.value ? e.value:"")
                    }
                />

          <div className="flex space-x-4">
            {isAddFilterVisible && (
              <FilterButton
                columns={columnsFilter}
                onApplyFilter={(a) => setFilter && setFilter(a)}
              />
            )}
            {isAddOrderVisible && (
              <OrderButton
                columns={columnsOrder}
                onApplyOrder={(a) => setOrder && setOrder(a)}
              />
            )}
            {isAddButtonVisible && (
              <Button
                onClick={() => add && add()}
                variant="contained"
                color={actions?.color || "primary"}
                disabled={actions?.disabled}
                sx={{ textTransform: "none" }}
              >
                <Typography variant="h3">{title || "+ AÑADIR"}</Typography>
              </Button>
            )}
            {isAddButtonAdicionalVisible && (
              <Button
                onClick={() => reasignar && reasignar(compradorSelected)}
                variant="contained"
                color={actions?.color || "primary"}
                disabled={isAddButtonAdicionalActive || compradorSelected == ""}
                sx={{ textTransform: "none" }}
              >
                <Typography variant="h3">{titleButton || "+ Adicional"}</Typography>
              </Button>
            )}
          </div>
        </div>
      </CardHead>
    </>
  );
};

export default ActionCardReasignarHeader;
