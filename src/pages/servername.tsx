import { memo } from "react";

import CONFIG from "_/config";

import Title, { useTitlePath } from "_/components/title";
import Editors from "_/components/editors";

const Page = memo(() => {
  const titlePath = useTitlePath(CONFIG.navigation.serverName, CONFIG.editors.serverName.title);

  return (
    <>
      <Title path={titlePath} />
      <Editors editor="serverName" />
    </>
  );
});

export default Page;
