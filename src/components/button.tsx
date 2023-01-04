import { ButtonHTMLAttributes, memo, ReactNode } from "react";

import styled from "styled-components";

import useTheme, { ThemeColors } from "_/theme";

type StyledButtonOnlyProps = {
  colors: ThemeColors;
};

type StyledButtonProps = {
  bordered?: boolean;
  primary?: boolean;
};

const StyledButton = styled.button<StyledButtonOnlyProps & StyledButtonProps>(({ colors, bordered = true, primary }) => ({
  // backgroundColor: colors.white,
  padding: "0.75rem 1.5rem",
  borderRadius: "0.5rem",
  borderStyle: "solid",
  color: colors.black,
  fontWeight: 700,
  borderWidth: 1,
  ...(bordered && !primary
    ? {
        backgroundColor: colors.white,
        borderColor: colors.black,
      }
    : {
        borderColor: colors.themePrimary,
      }),
  ...(primary
    ? {
        backgroundColor: colors.themePrimary,
        color: colors.white,
      }
    : {}),
}));

type ButtonProps = StyledButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
  };

const Button = memo(({ children, ...props }: ButtonProps) => {
  const { colors } = useTheme();

  return (
    <StyledButton {...props} colors={colors}>
      {children}
    </StyledButton>
  );
});

export default Button;
