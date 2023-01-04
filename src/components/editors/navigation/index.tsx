import { memo } from "react";

import styled from "styled-components";

import { LINK_GROUPS } from "_/components/editors/navigation/consts";
import Menu from "_/components/editors/navigation/menu";

const StyledContainer = styled.div`
  flex: 0 0 auto;
  margin: 2rem 2rem 0 0;
  width: 15rem;
`;

const StyledHeader = styled.div`
  flex: 0 0 auto;
  margin-bottom: 2rem;
  font-size: 1.25rem;
  font-weight: 700;
`;

const Navigation = memo(() => (
  <StyledContainer>
    <StyledHeader>Editores</StyledHeader>
    {LINK_GROUPS.map((link, i) => (
      <Menu key={i} {...link} />
    ))}
  </StyledContainer>
));

export default Navigation;
