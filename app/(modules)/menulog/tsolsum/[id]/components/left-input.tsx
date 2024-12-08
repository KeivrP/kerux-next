import React from "react";
import Grid from "@mui/material/Grid2";
import { Autocomplete, TextField, Typography } from "@mui/material";
import { ConditionalWrapper } from "@/utils/main";
import { SkeletonInput } from "@/components/skeleton/detail";
import { FormContextProps } from "../../tsolsum-types";
import { Input, Textarea } from "@/components/ui/input";
import { useQueryData } from "@/server/fetch-data";
import TextDivider from "@/components/ui/textDivider";

interface DataInputProps extends FormContextProps {
  isLoading: boolean;
}

const LeftInput = ({ isLoading, formData, setFormData }: DataInputProps) => {
  const { data: log_coddependencia, isLoading: isLoadingCoddependencia } =
    useQueryData({
      entity: "log_coddependencia",
      params: {
        idsolsum: formData.cabsolsum.idsolsum,
      },
    });

  const { data: lst_ccosto, isLoading: isLoadingCcosto } = useQueryData({
    entity: "ccosto",
    params: {
      idsolsum: formData.cabsolsum.idsolsum,
    },
  });

  const { data: lst_codundcmp, isLoading: isLoadingCodundcmp } = useQueryData({
    entity: "codundcmp",
  });

  const { data: lst_codaccint, isLoading: isLstCcint } = useQueryData({
    entity: "codaccint",
    params: {
      fecsol: formData.cabsolsum.fecsol,
      ccosto: formData.cabsolsum.ccosto,
    },
    dependency: [formData.cabsolsum.ccosto],
  });

  const Dependencia = React.useMemo(() => {
    if (Array.isArray(log_coddependencia)) {
      return (
        log_coddependencia.find(
          (dependencia: { coddependencia: string }) =>
            dependencia.coddependencia === formData.cabsolsum.coddependencia
        )?.descdependencia || ""
      );
    }
    return "";
  }, [log_coddependencia, formData.cabsolsum.coddependencia]);

  const Ccosto = React.useMemo(() => {
    if (Array.isArray(lst_ccosto)) {
      return (
        lst_ccosto.find(
          (dependencia: { ccosto: string }) =>
            dependencia.ccosto === formData.cabsolsum.ccosto
        )?.nombre || ""
      );
    }
    return "";
  }, [lst_ccosto, formData.cabsolsum.ccosto]);

  const CUndCmp = React.useMemo(() => {
    if (Array.isArray(lst_codundcmp)) {
      return (
        lst_codundcmp.find(
          (dependencia: { codundcmp: string }) =>
            dependencia.codundcmp === formData.cabsolsum.codundcmp
        )?.nombundcmp || ""
      );
    }
    return "";
  }, [lst_codundcmp, formData.cabsolsum.codundcmp]);

  const CodAccionInt = React.useMemo(() => {
    if (Array.isArray(lst_codaccint)) {
      return (
        lst_codaccint.find(
          (dependencia: { codaccint: string }) =>
            dependencia.codaccint === formData.cabsolsum.codaccint
        )?.descripcion || ""
      );
    }
    return "";
  }, [lst_codaccint, formData.cabsolsum.codaccint]);

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <TextDivider>Solicitud</TextDivider>
      </Grid>
      <Grid size={12}>
        <Typography variant="h3" color="primary">
          ID
        </Typography>
        <Grid container spacing={1} mt={1}>
          <Grid size={3}>
            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
              <Input value={formData.cabsolsum.idsolsum} disabled />
            </ConditionalWrapper>
          </Grid>
          <Grid size={9}>
            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
              <Input
                value={formData.cabsolsum.desccorta}
                onChange={(e) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    cabsolsum: {
                      ...prevFormData.cabsolsum,
                      desccorta: e.target.value,
                    },
                  }));
                }}
              />
            </ConditionalWrapper>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={12}>
        <Typography variant="h3" color="primary" className="mb-2">
          Descripcion
        </Typography>

        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Textarea
            value={formData.cabsolsum.descsolsum}
            onChange={(e) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                cabsolsum: {
                  ...prevFormData.cabsolsum,
                  descsolsum: e.target.value,
                },
              }));
            }}
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={12}>
        <Typography variant="h3" color="primary">
          Dependencia
        </Typography>
        <Grid container spacing={1} mt={1}>
          <Grid size={3}>
            <ConditionalWrapper
              condition={isLoadingCoddependencia || isLoading}
              wrapper={SkeletonInput}
            >
              {/* --------------------- SELECCIONA DEPENDENCIA --------------------- */}
              <Autocomplete
                fullWidth
                size="small"
                options={
                  Array.isArray(log_coddependencia) ? log_coddependencia : []
                }
                getOptionLabel={(option: { coddependencia: string }) =>
                  option.coddependencia
                }
                renderInput={(params) => <TextField {...params} />}
                value={
                  Array.isArray(log_coddependencia)
                    ? log_coddependencia.find(
                        (option: { coddependencia: string | undefined }) =>
                          option.coddependencia ===
                          formData.cabsolsum.coddependencia
                      ) || null
                    : null
                }
                onChange={(_, newValue) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    cabsolsum: {
                      ...prevFormData.cabsolsum,
                      coddependencia: newValue?.coddependencia || "",
                    },
                  }));
                }}
              />
            </ConditionalWrapper>
          </Grid>
          <Grid size={9}>
            <ConditionalWrapper
              condition={isLoadingCoddependencia || isLoading}
              wrapper={SkeletonInput}
            >
              <Input value={Dependencia} disabled />
            </ConditionalWrapper>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={12}>
        <Typography variant="h3" color="primary">
          Centro de Costo
        </Typography>
        <Grid container spacing={1} mt={1}>
          <Grid size={3}>
            <ConditionalWrapper
              condition={isLoadingCcosto}
              wrapper={SkeletonInput}
            >
              {/* --------------------- SELECCIONA DEPENDENCIA --------------------- */}
              <Autocomplete
                fullWidth
                size="small"
                options={Array.isArray(lst_ccosto) ? lst_ccosto : []}
                getOptionLabel={(option: { ccosto: string }) => option.ccosto}
                renderInput={(params) => <TextField {...params} />}
                value={
                  Array.isArray(lst_ccosto)
                    ? lst_ccosto.find(
                        (option: { ccosto: string | undefined }) =>
                          option.ccosto === formData.cabsolsum.ccosto
                      ) || null
                    : null
                }
                onChange={(_, newValue) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    cabsolsum: {
                      ...prevFormData.cabsolsum,
                      ccosto: newValue?.ccosto || "",
                    },
                  }));
                }}
              />
            </ConditionalWrapper>
          </Grid>
          <Grid size={9}>
            <ConditionalWrapper
              condition={isLoadingCcosto}
              wrapper={SkeletonInput}
            >
              <Input value={Ccosto} disabled />
            </ConditionalWrapper>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={12}>
        <Typography variant="h3" color="primary">
          Accion Interna
        </Typography>
        <Grid container spacing={1} mt={1}>
          <Grid size={3}>
            <ConditionalWrapper condition={formData.cabsolsum.ccosto ? isLstCcint : isLoading} wrapper={SkeletonInput}>
              {/* --------------------- SELECCIONA DEPENDENCIA --------------------- */}
              <Autocomplete
              disabled={!formData.cabsolsum.ccosto}
                fullWidth
                size="small"
                options={Array.isArray(lst_codaccint) ? lst_codaccint : []}
                getOptionLabel={(option: { codaccint: string }) =>
                  option.codaccint
                }
                renderInput={(params) => <TextField {...params} />}
                value={
                  Array.isArray(lst_codaccint)
                    ? lst_codaccint.find(
                        (option: { codaccint: string | undefined }) =>
                          option.codaccint === formData.cabsolsum.codaccint
                      ) || null
                    : null
                }
                onChange={(_, newValue) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    cabsolsum: {
                      ...prevFormData.cabsolsum,
                      codaccint: newValue?.codaccint || "",
                    },
                  }));
                }}
              />
            </ConditionalWrapper>
          </Grid>
          <Grid size={9}>
          <ConditionalWrapper condition={formData.cabsolsum.ccosto ? isLstCcint : isLoading} wrapper={SkeletonInput}>
          <Input value={CodAccionInt} disabled />
            </ConditionalWrapper>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={12}>
        <Typography variant="h3" color="primary">
          Unidad de Compra
        </Typography>
        <Grid container spacing={1} mt={1}>
          <Grid size={3}>
            <ConditionalWrapper
              condition={isLoadingCodundcmp || isLoading}
              wrapper={SkeletonInput}
            >
              {/* --------------------- SELECCIONA DEPENDENCIA --------------------- */}
              <Autocomplete
                fullWidth
                size="small"
                options={Array.isArray(lst_codundcmp) ? lst_codundcmp : []}
                getOptionLabel={(option: { codundcmp: string }) =>
                  option.codundcmp
                }
                renderInput={(params) => <TextField {...params} />}
                value={
                  Array.isArray(lst_codundcmp)
                    ? lst_codundcmp.find(
                        (option: { codundcmp: string | undefined }) =>
                          option.codundcmp === formData.cabsolsum.codundcmp
                      ) || null
                    : null
                }
                onChange={(_, newValue) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    cabsolsum: {
                      ...prevFormData.cabsolsum,
                      codundcmp: newValue?.codundcmp || "",
                    },
                  }));
                }}
              />
            </ConditionalWrapper>
          </Grid>
          <Grid size={9}>
            <ConditionalWrapper
              condition={isLoadingCodundcmp || isLoading}
              wrapper={SkeletonInput}
            >
              <Input value={CUndCmp} disabled />
            </ConditionalWrapper>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={6}>
        <Typography variant="h3" color="primary" className="mb-2">
          Solicitante
        </Typography>

        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input
            value={formData.cabsolsum.nomubic}
            onChange={(e) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                cabsolsum: {
                  ...prevFormData.cabsolsum,
                  nomubic: e.target.value,
                },
              }));
            }}
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={6}>
        <Typography variant="h3" color="primary" className="mb-2">
          Telefono
        </Typography>

        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input
            value={formData.cabsolsum.telefubic}
            onChange={(e) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                cabsolsum: {
                  ...prevFormData.cabsolsum,
                  telefubic: e.target.value,
                },
              }));
            }}
          />
        </ConditionalWrapper>
      </Grid>
    </Grid>
  );
};

export default LeftInput;
