import { memo } from "react";
import styled from "styled-components";

import Container from "_/components/container";

const StyledContainer = styled.div`
  flex: 0 0 auto;
  flex-flow: column;
  margin-top: auto;
  display: flex;
`;

const StyledContent = styled.div`
  flex: 0 0 auto;
  flex-flow: row;
  display: flex;
`;

const StyledCredits = styled.div`
  text-align: center;
  padding: 1rem 0;
  margin: 0 auto;
`;

const StyledGitHub = styled.a`
  font-weight: 700;
`;

const GitHub = memo(() => (
  <StyledGitHub href="https://github.com/Rechdan/wyd-private-editors" target="_blank" rel="noreferrer">
    GitHub
  </StyledGitHub>
));

const Footer = memo(() => (
  <StyledContainer>
    <Container>
      <StyledContent>
        <StyledCredits>
          Créditos aos contribuidores disponível no <GitHub />.
        </StyledCredits>
      </StyledContent>
    </Container>
  </StyledContainer>
));

export default Footer;
