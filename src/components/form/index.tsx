import { ChangeEventHandler, forwardRef, ReactNode, useCallback, useState } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import styled from "styled-components";

import useTheme from "_/theme";

import { FormOnUpload, FormUploadState } from "_/components/form/types";

import { getFormStateAsText } from "_/components/form/functions";

import { FormOnSubmit } from "_/components/editors/serverlist/types";

type StyledUploadContainerProps = {
  borderColor: string;
};

const StyledForm = styled.form`
  flex: 1 1 auto;
  flex-flow: column;
  display: flex;
`;

const StyledUploadContainer = styled.label<StyledUploadContainerProps>`
  flex: 0 0 auto;
  border: 1px dashed ${(p) => p.borderColor};
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  flex-flow: column;
  display: flex;
  padding: 1rem;
`;

const StyledFields = styled.div`
  flex: 0 0 auto;
  flex-flow: column;
  display: flex;
`;

type FormProps = {
  formMethods: UseFormReturn;
  onSubmit: FormOnSubmit;
  children?: ReactNode;
  onUpload?: FormOnUpload;
  uploadMessage?: string;
  uploadSuccessMessage?: string;
  uploadErrorMessage?: string;
};

const Form = forwardRef<HTMLFormElement, FormProps>((props: FormProps, forwardedRef) => {
  const { formMethods, onSubmit, children, onUpload, uploadMessage } = props;
  const { handleSubmit } = formMethods;

  const { colors } = useTheme();

  const [lastUploadState, setLastUploadState] = useState<FormUploadState>("none");

  const onUploadInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      if (onUpload) {
        const target = e.currentTarget;
        if (target) {
          const { files } = target;
          if (files && files.length > 0) {
            const fr = new FileReader();
            fr.onload = () => {
              const { result } = fr;
              if (result instanceof ArrayBuffer) {
                const buffer = Buffer.from(result);
                setLastUploadState(onUpload(buffer));
                target.value = "";
              }
            };
            fr.readAsArrayBuffer(files[0]);
          }
        }
      }
    },
    [onUpload]
  );

  return (
    <FormProvider {...props.formMethods}>
      <StyledForm ref={forwardedRef} onSubmit={handleSubmit(onSubmit)}>
        {onUpload && uploadMessage && (
          <StyledUploadContainer borderColor={colors.neutralTertiary}>
            <p>
              [{getFormStateAsText(lastUploadState)}]: {uploadMessage}
            </p>
            <input hidden type="file" accept="application/octet-stream" onChange={onUploadInputChange} />
          </StyledUploadContainer>
        )}
        <StyledFields>{children}</StyledFields>
      </StyledForm>
    </FormProvider>
  );
});

export default Form;
