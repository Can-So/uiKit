import * as React from 'react';
import styled from 'styled-components';
import { gridSize, colors } from '@atlaskit/theme';
import ManageButton from './manage-button';

const Wrapper = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 3 * ${gridSize()}px);
  padding-right: ${gridSize() * 4}px;
  padding-top: 5px;
`;

const Body = styled.div`
  min-height: calc(100% - 7.5 * ${gridSize}px);
`;
const Footer = styled.footer`
  border-top: 1px solid ${colors.N30A};
  padding: ${1.5 * gridSize()}px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: sticky;
  bottom: 0;
  background-color: ${colors.N0};
`;
const ErrorBoundaryWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 10rem;
  padding-right: 2rem;
`;

type SwitcherWrapperProps = {
  children: React.ReactNode;
  onRender?: () => void;
};

class SwitcherWrapper extends React.Component<SwitcherWrapperProps> {
  render() {
    const { children } = this.props;

    const manageButton = React.Children.toArray(children).filter(
      child =>
        React.isValidElement(child) &&
        React.Children.only(child).type === ManageButton,
    );
    const items = React.Children.toArray(children).filter(
      child =>
        React.isValidElement(child) &&
        React.Children.only(child).type !== ManageButton,
    );

    return (
      <Wrapper>
        <Body>{items}</Body>
        {manageButton.length ? <Footer>{manageButton}</Footer> : null}
      </Wrapper>
    );
  }
}

export { ErrorBoundaryWrapper };
export default SwitcherWrapper;
