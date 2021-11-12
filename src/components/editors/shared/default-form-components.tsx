import styled from "styled-components";

export const StyledGrid = styled.div`
  flex: 1 1 auto;
  grid-template-columns: repeat(2, 1fr);
  display: grid;
  gap: 2rem;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

export const StyledCol = styled.div`
  grid-area: auto / auto;
  flex-flow: column;
  display: flex;
  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;
