import { AppProps } from "next/app";

import { memo, useEffect } from "react";

import useTheme from "_/theme";

import GlobalStyle from "_/assets/styles/global-style";

const App = memo(({ router: { route }, Component, pageProps }: AppProps) => {
  const { colors } = useTheme();

  useEffect(() => {
    window.scroll({ behavior: "smooth", top: 0 });
  }, [route]);

  return (
    <>
      <GlobalStyle backgroundColor={colors.white} fontColor={colors.black} />
      <Component {...pageProps} />
    </>
  );
});

export default App;
