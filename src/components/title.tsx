import NextHead from "next/head";

import { memo, useMemo } from "react";

export const useTitlePath = (...path: string[]): string[] => useMemo(() => path, [path]);

type TitleProps = {
  path?: string[];
};

const Title = memo(({ path = [] }: TitleProps) => (
  <NextHead>
    <title>{`${path.length > 0 ? `${path.join(" / ")} - ` : ""}WYD Private Editors`}</title>
  </NextHead>
));

export default Title;
