import { useRouter } from "next/router";
import NextLink from "next/link";

import { memo, useMemo } from "react";
import styled from "styled-components";
import classNames from "classnames";

import useTheme from "_/theme";

import { NavigationLink, StyledLinkProps } from "_/components/editors/navigation/types";

const StyledLink = styled.a<StyledLinkProps>`
  flex: 0 0 auto;
  background-color: ${(p) => p.normalColor};
  border-radius: 0.5rem;
  padding: 0.75rem;
  flex-flow: row;
  display: flex;
  &.active {
    background-color: ${(p) => p.activeColor};
  }
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const Link = memo(({ title, url }: NavigationLink) => {
  const { route } = useRouter();

  const { colors } = useTheme();

  const linkClassNames = useMemo(() => classNames({ active: url === route }), [route, url]);

  return (
    <NextLink href={url} passHref>
      <StyledLink className={linkClassNames} normalColor={colors.themeLight} activeColor={colors.themeTertiary}>
        {title}
      </StyledLink>
    </NextLink>
  );
});

export default Link;
