import { memo } from "react";

import styled from "styled-components";

import Button from "_/components/button";

const StyledButtons = styled.div`
  flex: 0 0 auto;
  justify-content: flex-end;
  align-items: center;
  flex-flow: row;
  display: flex;
  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

type DefaultFormButtonsProps = {
  onReset: () => void;
  submitText: string;
};

const DefaultFormButtons = memo(({ onReset, submitText }: DefaultFormButtonsProps) => (
  <StyledButtons>
    <Button type="button" onClick={onReset}>
      Resetar
    </Button>
    <Button type="submit" primary>
      {submitText}
    </Button>
  </StyledButtons>
));

export default DefaultFormButtons;
