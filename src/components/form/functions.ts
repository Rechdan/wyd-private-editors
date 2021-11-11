import { FormUploadState } from "_/components/form/types";

export const getFormStateAsText = (state: FormUploadState) => {
  switch (state) {
    case "success":
      return "Sucesso";
    case "error":
      return "Falha";
    default:
      return "Aguardando";
  }
};
