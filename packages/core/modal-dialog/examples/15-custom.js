// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Lorem from 'react-lorem-component';
import Button from '@atlaskit/button';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Avatar from '@atlaskit/avatar';
import InlineDialog from '@atlaskit/inline-dialog';
import { colors } from '@atlaskit/theme';
import Modal, {
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalTransition,
} from '../src';

const Hint = styled.span`
  align-items: center;
  color: ${colors.subtleText};
  cursor: help;
  display: flex;
`;
const HintText = styled.span`
  margin-left: 1em;
`;

const Image = styled.img`
  max-width: 100%;
  margin-bottom: 1em;
  margin-top: 1em;
`;

type Props = { onClose: Function, showKeyline: boolean };
const CustomHeader = ({ onClose, showKeyline }: Props) => (
  <ModalHeader showKeyline={showKeyline}>
    <ModalTitle>Custom Modal</ModalTitle>
    <Button onClick={onClose} appearance="link" spacing="none">
      <CrossIcon label="Close Modal" primaryColor={colors.R400} size="small" />
    </Button>
  </ModalHeader>
);

const bodyStyles = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  padding: 30,
};

// $FlowFixMe
const CustomBody = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} style={bodyStyles}>
      {props.children}
      <Button onClick={() => {}}>Custom Body Component</Button>
    </div>
  );
});

type FooterState = { isOpen: boolean };
// eslint-disable-next-line react/no-multi-comp
class CustomFooter extends Component<Props, FooterState> {
  state = { isOpen: false };
  open = () => this.setState({ isOpen: true });
  close = () => this.setState({ isOpen: false });
  render() {
    const { onClose, showKeyline } = this.props;
    const { isOpen } = this.state;

    return (
      <ModalFooter showKeyline={showKeyline}>
        <InlineDialog
          content="Some hint text?"
          isOpen={isOpen}
          position="top left"
        >
          <Hint onMouseEnter={this.open} onMouseLeave={this.close}>
            <Avatar size="small" />
            <HintText>Hover Me!</HintText>
          </Hint>
        </InlineDialog>
        <Button appearance="subtle" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    );
  }
}

type ExampleCustomState = { isOpen: boolean };
// eslint-disable-next-line react/no-multi-comp
export default class ExampleCustom extends Component<{}, ExampleCustomState> {
  state = { isOpen: false };
  open = () => this.setState({ isOpen: true });
  close = () => this.setState({ isOpen: false });
  render() {
    const { isOpen } = this.state;

    return (
      <div>
        <Button onClick={this.open}>Open Modal</Button>
        <ModalTransition>
          {isOpen && (
            <Modal
              components={{
                Header: CustomHeader,
                Body: CustomBody,
                Footer: CustomFooter,
              }}
              onClose={this.close}
              onCloseComplete={node =>
                console.log('exit transition complete', node)
              }
              shouldCloseOnEscapePress={false}
              shouldCloseOnOverlayClick={false}
              width={400}
            >
              <Lorem count={1} />
              <Image src="https://atlassian.design/react_assets/images/cards/personality.png" />
              <Lorem count={1} />
            </Modal>
          )}
        </ModalTransition>
      </div>
    );
  }
}
