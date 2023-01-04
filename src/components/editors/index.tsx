import { memo } from "react";

import styled from "styled-components";

import { Editors as EditorsType } from "_/config";

import Container from "_/components/container";
import Footer from "_/components/editors/footer";
import Navigation from "_/components/editors/navigation";
import Switch from "_/components/editors/switch";

const StyledContainer = styled.div`
  flex: 0 0 auto;
  min-height: 100vh;
  flex-flow: column;
  display: flex;
  width: 100%;
`;

const StyledContent = styled.div`
  flex: 0 0 auto;
  flex-flow: row;
  display: flex;
`;

const StyledEditors = styled.div`
  flex: 1 1 auto;
  flex-flow: column;
  margin-top: 2rem;
  display: flex;
`;

type EditorProps = {
  editor: EditorsType;
};

const Editors = memo(({ editor }: EditorProps) => (
  <StyledContainer>
    <Container>
      <StyledContent>
        <Navigation />
        <StyledEditors>
          <Switch editor={editor} />
        </StyledEditors>
      </StyledContent>
    </Container>
    <Footer />
  </StyledContainer>
));

export default Editors;
