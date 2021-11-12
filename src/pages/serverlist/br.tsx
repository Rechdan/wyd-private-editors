import { memo } from "react";

import CONFIG from "_/config";

import Title, { useTitlePath } from "_/components/title";
import Editors from "_/components/editors";

const Page = memo(() => {
  const titlePath = useTitlePath(CONFIG.navigation.serverList, CONFIG.editors.serverListBr.title);

  return (
    <>
      <Title path={titlePath} />
      <Editors editor="serverListBr" />
    </>
  );
});

export default Page;
