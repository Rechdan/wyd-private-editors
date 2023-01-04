import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";

import { ServerStyleSheet } from "styled-components";

type DocumentProps = {
  styleTags: string;
  serializedStylesheet: string;
};

export default class extends Document<DocumentProps> {
  static getInitialProps = async (ctx: DocumentContext) => {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({ enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />) });
      const initialProps = await Document.getInitialProps(ctx);
      return { ...initialProps, styles: [initialProps.styles, sheet.getStyleElement()] };
    } finally {
      sheet.seal();
    }
  };

  render = () => (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
