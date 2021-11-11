import { memo } from "react";
import styled from "styled-components";

import Title, { useTitlePath } from "_/components/title";

const StyledContainer = styled.div`
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-flow: column;
  display: flex;
  width: 100%;
`;

const StyledMessage = styled.div`
  flex: 0 0 auto;
  text-align: center;
  padding: 3rem 1rem;
  & a {
    font-weight: 700;
  }
`;

const GitHub = memo(() => (
  <a href="https://github.com/Rechdan/wyd-private-editors/pull/1" target="_blank" rel="noreferrer">
    GitHub
  </a>
));

const Page = memo(() => {
  const titlePath = useTitlePath("Página Inicial");

  return (
    <>
      <Title path={titlePath} />
      <StyledContainer>
        <StyledMessage>
          Ainda estou em desenvolvimento!
          <br />
          <br />
          Para saber mais, acesse o nosso <GitHub />!
          <br />
          <br />
          <br />
          Att, Rechdan. 😉
        </StyledMessage>
      </StyledContainer>
    </>
  );
});

export default Page;
