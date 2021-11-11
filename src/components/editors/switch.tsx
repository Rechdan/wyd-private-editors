import { memo } from "react";

import { Editors as EditorsType } from "_/config";

import ServerListForm from "_/components/editors/serverlist";
import ServerNameForm from "_/components/editors/servername/form";

type SwitchProps = {
  editor: EditorsType;
};

const Switch = memo(({ editor }: SwitchProps) => {
  switch (editor) {
    case "serverListGlobal":
      return <ServerListForm version="global" />;
    case "serverListBr":
      return <ServerListForm version="br" />;
    case "serverName":
      return <ServerNameForm />;
    default:
      return null;
  }
});

export default Switch;
