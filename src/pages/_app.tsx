import { AppProps } from "next/app";

import { memo, useEffect } from "react";
import ReactGA from "react-ga";

import useTheme from "_/theme";

import GlobalStyle from "_/assets/styles/global-style";

const App = memo(({ router: { route }, Component, pageProps }: AppProps) => {
  const { colors } = useTheme();

  useEffect(() => {
    ReactGA.initialize("G-RH419E9JV3", { debug: process.env.NODE_ENV !== "production" });
  }, []);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [route]);

  return (
    <>
      <GlobalStyle backgroundColor={colors.white} fontColor={colors.black} />
      <Component {...pageProps} />
    </>
  );
});

export default App;
