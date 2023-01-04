import { Fragment, memo, useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { merge } from "lodash";

import saveFile from "_/functions/save-file";

import { strServerName } from "_/components/editors/servername/structs";
import { FormOnSubmit, StrServerNamePartialForm } from "_/components/editors/servername/types";
import DefaultFormButtons from "_/components/editors/shared/default-form-buttons";
import { StyledCol, StyledGrid } from "_/components/editors/shared/default-form-components";
import Form from "_/components/form";
import { useUpload } from "_/components/form/hooks";
import { FormOnUpload } from "_/components/form/types";
import TextField from "_/components/text-field";
import useCustomKey from "_/hooks/custom-key";

const UPLOAD_MESSAGE = "Clique aqui para buscar o sn.bin";

const ServerNameForm = memo(() => {
  const [defaultValues, setDefaultValues] = useState<StrServerNamePartialForm>({});

  const [formKey, updateFormkey] = useCustomKey();

  const getStruct = useCallback((buffer?: Buffer) => strServerName(buffer), []);

  const formMethods = useForm({ defaultValues });
  const { reset, register } = formMethods;

  const onValidSubmit = useCallback<FormOnSubmit>(
    (formData) => {
      const struct = getStruct();
      merge(struct, formData);
      const { buffer } = struct;
      buffer[0] += 100;
      saveFile("sn.bin", buffer);
    },
    [getStruct]
  );

  const onUpload = useCallback<FormOnUpload>(
    (buffer) => {
      if (strServerName.size === buffer.length) {
        buffer[0] -= 100;
        const { name, sort } = getStruct(buffer);
        const newValues = merge({}, { name, sort: sort.filter((v) => v > 0) });
        setDefaultValues(newValues);
        reset(newValues);
        updateFormkey();
        return "success";
      }
      return "error";
    },
    [getStruct, reset, updateFormkey]
  );

  const formUpload = useUpload(onUpload, { upload: UPLOAD_MESSAGE });

  const onReset = useCallback(() => {
    reset();
    updateFormkey();
  }, [reset, updateFormkey]);

  const names = useMemo(() => {
    const arr: JSX.Element[] = [];
    for (let i = 0; i < 11; i++) {
      arr.push(<TextField key={`name.${i}`} {...register(`name.${i}`)} />);
    }
    return arr;
  }, [register]);

  const sortings = useMemo(() => {
    const arr: JSX.Element[] = [];
    for (let i = 0; i < 11; i++) {
      arr.push(<TextField key={`sort.${i}`} {...register(`sort.${i}`)} />);
    }
    return arr;
  }, [register]);

  return (
    <Form formMethods={formMethods} onSubmit={onValidSubmit} upload={formUpload}>
      <Fragment key={formKey}>
        <StyledGrid>
          <StyledCol>{names}</StyledCol>
          <StyledCol>{sortings}</StyledCol>
        </StyledGrid>
        <DefaultFormButtons onReset={onReset} submitText="Gerar sn.bin" />
      </Fragment>
    </Form>
  );
});

export default ServerNameForm;
