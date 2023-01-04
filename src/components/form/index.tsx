import { ChangeEventHandler, forwardRef, ReactNode, useCallback, useState } from "react";
import { FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";

import styled from "styled-components";

import useTheme from "_/theme";

import { getFormStateAsText } from "_/components/form/functions";
import { FormUploadState, UseUploadResponse } from "_/components/form/types";

type StyledUploadContainerProps = {
  borderColor: string;
};

const UPLOAD_MESSAGE = "Clique aqui para buscar pelo arquivo";

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
  onSubmit: SubmitHandler<object>;
  upload?: UseUploadResponse;
  children?: ReactNode;
};

const Form = forwardRef<HTMLFormElement, FormProps>((props: FormProps, forwardedRef) => {
  const { formMethods, onSubmit, children, upload } = props;
  const { handleSubmit } = formMethods;

  const { colors } = useTheme();

  const [lastUploadState, setLastUploadState] = useState<FormUploadState>("none");

  const onUploadInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      if (upload) {
        const target = e.currentTarget;
        if (target) {
          const { files } = target;
          if (files && files.length > 0) {
            const fr = new FileReader();
            fr.onload = () => {
              const { result } = fr;
              if (result instanceof ArrayBuffer) {
                const buffer = Buffer.from(result);
                setLastUploadState(upload.event(buffer));
                target.value = "";
              }
            };
            fr.readAsArrayBuffer(files[0]);
          }
        }
      }
    },
    [upload]
  );

  return (
    <FormProvider {...props.formMethods}>
      <StyledForm ref={forwardedRef} onSubmit={handleSubmit(onSubmit)}>
        {upload && (
          <StyledUploadContainer borderColor={colors.neutralTertiary}>
            <p>
              [{getFormStateAsText(lastUploadState)}]: {upload.messages?.upload ?? UPLOAD_MESSAGE}
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
