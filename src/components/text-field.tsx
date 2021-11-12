import { FocusEventHandler, ForwardedRef, forwardRef, InputHTMLAttributes, useCallback, useState } from "react";
import styled from "styled-components";
import { useFormContext, UseFormRegisterReturn } from "react-hook-form";

import useTheme from "_/theme";

type StyledContainerProps = {
  hasFocus: boolean;
  hasValue: boolean;
  borderColor: string;
  focusBorderColor: string;
  valueBorderColor: string;
};

type StyledNameProps = {
  hasFocus: boolean;
  hasValue: boolean;
};

type StyledInputProps = {
  backgroundColor: string;
};

const StyledContainer = styled.div<StyledContainerProps>`
  flex: 0 0 auto;
  transition: 0.2s ease-in-out;
  transition-property: border-color;
  border: 1px solid ${(p) => (p.hasFocus ? p.focusBorderColor : p.hasValue ? p.valueBorderColor : p.borderColor)};
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
`;

const StyledName = styled.div<StyledNameProps>`
  transition: 0.2s ease-in-out;
  transition-property: transform, opacity;
  transform: translateY(${(p) => (p.hasFocus || p.hasValue ? "-125%" : "-50%")});
  opacity: ${(p) => (p.hasFocus || p.hasValue ? 0.5 : 1)};
  text-overflow: ellipsis;
  pointer-events: none;
  position: absolute;
  user-select: none;
  overflow: hidden;
  line-height: 1;
  right: 1rem;
  left: 1rem;
  top: 50%;
`;

const StyledInput = styled.input<StyledInputProps>`
  background-color: ${(p) => p.backgroundColor};
  padding: 2rem 1rem 0.5rem 1rem;
  height: 3.5rem;
  width: 100%;
`;

export type TextFieldProps = Omit<UseFormRegisterReturn, "ref"> & InputHTMLAttributes<HTMLInputElement>;

const TextField = forwardRef(
  ({ name, onChange, onFocus: onFocusProp, onBlur: onBlurProp, ...props }: TextFieldProps, forwardedRef: ForwardedRef<HTMLInputElement>) => {
    const { watch } = useFormContext();

    const [hasFocus, setHasFocus] = useState(false);

    const value = watch(name, "");
    const hasValue = typeof value !== "undefined" && value !== null && value !== "";

    const { colors } = useTheme();

    const onFocus = useCallback<FocusEventHandler<HTMLInputElement>>(
      (e) => {
        setHasFocus(true);
        onFocusProp?.(e);
      },
      [onFocusProp]
    );

    const onBlur = useCallback<FocusEventHandler<HTMLInputElement>>(
      (e) => {
        setHasFocus(false);
        onBlurProp(e);
      },
      [onBlurProp]
    );

    return (
      <StyledContainer
        hasFocus={hasFocus}
        hasValue={hasValue}
        borderColor={colors.neutralTertiary}
        focusBorderColor={colors.themeDark}
        valueBorderColor={colors.themeTertiary}
      >
        <StyledName hasFocus={hasFocus} hasValue={hasValue}>
          {name}
        </StyledName>
        <StyledInput
          {...props}
          ref={forwardedRef}
          name={name}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          defaultValue={value}
          backgroundColor={colors.white}
        />
      </StyledContainer>
    );
  }
);

export default TextField;
