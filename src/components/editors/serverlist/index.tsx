import { Fragment, memo, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { merge } from "lodash";

import saveFile from "_/functions/save-file";

import useCustomKey from "_/hooks/custom-key";

import Form from "_/components/form";
import { FormOnUpload } from "_/components/form/types";
import TextField from "_/components/text-field";
import Button from "_/components/button";

import { FormOnSubmit, StrServerListAny, StrServerListAnyPartialForm, Versions } from "_/components/editors/serverlist/types";

import { STRUCT, STRUCTS_DECODE, STRUCTS_ENCODE, STRUCTS_SIZE } from "_/components/editors/serverlist/consts";

import { ServerAddressField } from "_/components/editors/serverlist/fields";
import { useUpload } from "_/components/form/hooks";

const UPLOAD_MESSAGE = "Clique aqui para buscar o serverlist.bin";

const StyledGrid = styled.div`
  flex: 1 1 auto;
  grid-template-columns: repeat(2, 1fr);
  display: grid;
  gap: 2rem;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const StyledCol = styled.div`
  grid-area: auto / auto;
  flex-flow: column;
  display: flex;
  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const StyledButtons = styled.div`
  flex: 0 0 auto;
  justify-content: flex-end;
  align-items: center;
  flex-flow: row;
  display: flex;
  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

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
        <StyledButtons>
          <Button type="button" onClick={onReset}>
            Resetar
          </Button>
          <Button type="submit" primary>
            Gerar serverlist.bin
          </Button>
        </StyledButtons>
      </Fragment>
    </Form>
  );
});

export default ServerListForm;
