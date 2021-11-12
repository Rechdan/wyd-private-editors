import { AppProps } from "next/app";

import { memo, useEffect } from "react";
import ReactGA from "react-ga4";

import useTheme from "_/theme";

import GlobalStyle from "_/assets/styles/global-style";

const GA_KEY = process.env.NEXT_PUBLIC_GA;

const App = memo(({ router: { route }, Component, pageProps }: AppProps) => {
  const { colors } = useTheme();

  useEffect(() => {
    if (GA_KEY) {
      ReactGA.initialize(GA_KEY);
    }
  }, []);

  useEffect(() => {
    if (GA_KEY) {
      ReactGA.send("pageview");
    }
  }, [route]);

  return (
    <>
      <GlobalStyle backgroundColor={colors.white} fontColor={colors.black} />
      <Component {...pageProps} />
    </>
  );
});

export default App;
