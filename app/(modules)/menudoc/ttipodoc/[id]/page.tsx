"use client";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, Container, useTheme } from "@mui/material";
import Breadcrumbs from "@/components/breadcrumbs/breadcumbs";
import { ITipoSheet } from "../ttipodc-types";
import { FormProvider, useForm } from "react-hook-form";
import ButtonForms from "@/components/button/buttonForms";
import { PasosRutaForm } from "./components/pasos-rutas";
import { CabtipodocForm } from "./components/cabtipodoc-form";
import { useQueryData } from "@/server/fetch-data";
import { useEffect } from "react";
import { useCreateTipoDoc, useUpdateTipoDoc } from "../hook/useTipoDoc";
import SimpleBackdrop from "@/components/backdrop/backdrop";


export default function FtipodocPage() {
  const params = useParams();
  const { id } = params;

  if (!id) {
    return null;
  }


  const { data, isLoading } = useQueryData({
    entity: "tipos_docs",
    api: "doc",
    enabled: id !== '-' && !!id,
    type: id.toString(),
    dependency: [id],
  });

  const { mutate: create, isPending: isCreating } = useCreateTipoDoc();
  const { mutate: update, isPending: isUpdating } = useUpdateTipoDoc();




  const methods = useForm<ITipoSheet>({
    defaultValues: {
      cabtipodoc: {
        tipodoc: "",
        desctipodoc: "",
        indrefdoc: "",
        codruta: "",
        tipodocref: "",
        indactivo: "",
        descprocint: null
      },
      pasosruta: []
    }
  });

  useEffect(() => {
    if (data) {
      methods.reset({
        cabtipodoc: data.cabtipodoc,
        pasosruta: data.pasosruta
      });
    }
  }, [data]);

  const onSubmit = (data: ITipoSheet) => {
    if (id === "-") {
      create(data.cabtipodoc);
    } else {
      update({ id: Array.isArray(id) ? id[0] : id, data: data.cabtipodoc });
    }
  };


  return (
    <>
      <Container maxWidth="xl">
        <Breadcrumbs />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 2, marginBottom: 2 }}>


              <ButtonForms
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ width: 100 }}
              >
                Guardar
              </ButtonForms>
            </div>

            <CabtipodocForm isLoading={isLoading} />
            <PasosRutaForm />

          </form>
        </FormProvider>
      </Container>
      <SimpleBackdrop show={isCreating || isUpdating} />
    </>
  );
}
