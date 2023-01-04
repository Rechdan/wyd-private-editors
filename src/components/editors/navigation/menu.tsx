import { memo } from "react";

import styled from "styled-components";

import Link from "_/components/editors/navigation/link";
import { NavigationOptions } from "_/components/editors/navigation/types";

const StyledContainer = styled.div`
  flex: 0 0 auto;
  flex-flow: column;
  display: flex;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const StyledSubHeader = styled.div`
  flex: 0 0 auto;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Menu = memo(({ title, url, links }: NavigationOptions) => {
  if (links) {
    return (
      <StyledContainer>
        <StyledSubHeader>{title}</StyledSubHeader>
        <div>
          {links.map((link, i) => (
            <Menu key={i} {...link} />
          ))}
        </div>
      </StyledContainer>
    );
  }

  if (url) {
    return <Link title={title} url={url} />;
  }

  return <StyledSubHeader>{title}</StyledSubHeader>;
});

export default Menu;
