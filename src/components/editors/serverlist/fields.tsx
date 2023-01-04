import { memo, useCallback } from "react";
import { UseFormRegister } from "react-hook-form";

import { StrServerListAnyForm } from "_/components/editors/serverlist/types";
import TextField from "_/components/text-field";

type ServerAddressFieldProps = {
  register: UseFormRegister<Partial<StrServerListAnyForm>>;
  serverId: number;
  setSelectedServer: (serverId: number) => void;
};

export const ServerAddressField = memo(({ register, serverId, setSelectedServer }: ServerAddressFieldProps) => {
  const onFocus = useCallback(() => setSelectedServer(serverId), [serverId, setSelectedServer]);

  return <TextField {...register(`server.${serverId}.address`)} onFocus={onFocus} />;
});
