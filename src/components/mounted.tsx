import { memo, ReactNode } from "react";

import useMounted from "_/hooks/mounted";

type MountedProps = {
  children: ReactNode;
};

const Mounted = memo(({ children }: MountedProps) => {
  const mounted = useMounted();

  if (!mounted) return null;

  return <>{children}</>;
});

export default Mounted;
