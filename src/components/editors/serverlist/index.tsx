import { Fragment, memo, useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { merge } from "lodash";

import saveFile from "_/functions/save-file";

import useCustomKey from "_/hooks/custom-key";

import Form from "_/components/form";
import { FormOnUpload } from "_/components/form/types";
import { useUpload } from "_/components/form/hooks";

import TextField from "_/components/text-field";

import { StyledCol, StyledGrid } from "_/components/editors/shared/default-form-components";
import DefaultFormButtons from "_/components/editors/shared/default-form-buttons";

import { FormOnSubmit, StrServerListAny, StrServerListAnyPartialForm, Versions } from "_/components/editors/serverlist/types";

import { STRUCT, STRUCTS_DECODE, STRUCTS_ENCODE, STRUCTS_SIZE } from "_/components/editors/serverlist/consts";

import { ServerAddressField } from "_/components/editors/serverlist/fields";

const UPLOAD_MESSAGE = "Clique aqui para buscar o serverlist.bin";

type FormProps = {
  version: Versions;
};

const ServerListForm = memo(({ version }: FormProps) => {
  const [defaultValues, setDefaultValues] = useState<StrServerListAnyPartialForm>({});
  const [selectedServer, setSelectedServer] = useState(0);

  const [formKey, updateFormkey] = useCustomKey();

  const getStruct = useCallback((buffer?: Buffer) => STRUCT[version](buffer), [version]);

  const formMethods = useForm({ defaultValues });
  const { reset, register } = formMethods;

  const onValidSubmit = useCallback<FormOnSubmit>(
    (formData) => {
      const struct = getStruct();
      merge(struct, formData);
      const { buffer } = struct;
      STRUCTS_ENCODE[version](buffer);
      saveFile("serverlist.bin", buffer);
    },
    [getStruct, version]
  );

  const onUpload = useCallback<FormOnUpload>(
    (buffer) => {
      if (STRUCTS_SIZE[version] === buffer.length) {
        STRUCTS_DECODE[version](buffer);
        const { key, server } = getStruct(buffer) as StrServerListAny;
        const newValues = merge({}, { key, server });
        setDefaultValues(newValues);
        reset(newValues);
        updateFormkey();
        return "success";
      }
      return "error";
    },
    [getStruct, reset, updateFormkey, version]
  );

  const formUpload = useUpload(onUpload, { upload: UPLOAD_MESSAGE });

  const onReset = useCallback(() => {
    reset();
    updateFormkey();
  }, [reset, updateFormkey]);

  const servers = useMemo(() => {
    const arr: JSX.Element[] = [];
    for (let i = 0; i < 10; i++) {
      arr.push(<ServerAddressField key={`server.${i}`} register={register} serverId={i} setSelectedServer={setSelectedServer} />);
    }
    return arr;
  }, [register]);

  const ips = useMemo(() => {
    const arr: JSX.Element[] = [];
    for (let i = 0; i < 10; i++) {
      arr.push(<TextField key={`server.${selectedServer}.ip.${i}`} {...register(`server.${selectedServer}.ip.${i}`)} />);
    }
    return arr;
  }, [register, selectedServer]);

  return (
    <Form formMethods={formMethods} onSubmit={onValidSubmit} upload={formUpload}>
      <Fragment key={formKey}>
        {version === "global" && (
          <StyledGrid>
            <StyledCol>
              <TextField {...register("key")} />
            </StyledCol>
          </StyledGrid>
        )}
        <StyledGrid>
          <StyledCol>{servers}</StyledCol>
          <StyledCol>{ips}</StyledCol>
        </StyledGrid>
        <DefaultFormButtons onReset={onReset} submitText="Gerar serverlist.bin" />
      </Fragment>
    </Form>
  );
});

export default ServerListForm;
