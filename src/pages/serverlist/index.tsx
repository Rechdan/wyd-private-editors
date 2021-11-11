import { useRouter } from "next/router";

import { memo, useEffect } from "react";

import CONFIG from "_/config";

const Page = memo(() => {
  const { push, route } = useRouter();

  useEffect(() => {
    push(CONFIG.editors.serverListGlobal.url);
  }, [push, route]);

  return null;
});

export default Page;
