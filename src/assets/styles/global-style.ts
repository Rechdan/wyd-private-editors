import { createGlobalStyle } from "styled-components";

type GlobalStyleProps = {
  backgroundColor: string;
  fontColor: string;
};

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    border: 0;
    &:hover, &:focus, &:active{
      outline: none;
    }
    & > * {
      line-height: inherit;
      color: inherit;
      font: inherit;
    }
  }

  html {
    background-color: ${(p) => p.backgroundColor};
    font-family: "Open Sans", sans-serif;
    color: ${(p) => p.fontColor};
    overflow-y: scroll;
    overflow-x: auto;
    font-size: 14px;
  }

  a {
    text-decoration: none;
  }

  b, strong {
    font-weight: 700;
  }

  a, label, button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
