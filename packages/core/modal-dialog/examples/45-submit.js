// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import Field from '@atlaskit/field-text';
import { Checkbox } from '@atlaskit/checkbox';
import RadioGroup, { AkRadio } from '@atlaskit/field-radio-group';

import ModalDialog, { ModalFooter, ModalTransition } from '../src';

const FRAME = 'submit-frame';
const Iframe = styled.iframe`
  background: #f1ede4;
  border: 0 solid #f7d87c;
  border-left-width: 5px;
  bottom: 16px;
  box-shadow: 0 2px 11px -1px rgba(0, 0, 0, 0.18);
  height: 200px;
  left: 16px;
  visibility: ${props => (props.hasData ? 'visibile' : 'hidden')};
  opacity: ${props => (props.hasData ? 1 : 0)};
  position: absolute;
  transform: ${props =>
    props.hasData ? 'translateX(0)' : 'translateX(-30px)'};
  transition: opacity 200ms, visibility 200ms, transform 200ms ease-out;
  width: 400px;
  z-index: 500;
`;

type State = { hasData: boolean, isOpen: boolean };
export default class SubmitDemo extends Component<{}, State> {
  state = { hasData: false, isOpen: false };
  handleLoad = () => this.setState({ hasData: true });
  open = () => this.setState({ isOpen: true });
  close = () => this.setState({ isOpen: false });

  render() {
    const { hasData, isOpen } = this.state;
    const footer = props => (
      <ModalFooter showKeyline={props.showKeyline}>
        <span />
        <Button appearance="primary" type="submit">
          Create issue
        </Button>
      </ModalFooter>
    );

    const formWrapper = ({ children }) => (
      <form action="https://httpbin.org/post" method="post" target={FRAME}>
        {children}
      </form>
    );

    const radioItems = [
      { name: 'color', value: 'red', label: 'Red' },
      { name: 'color', value: 'blue', label: 'Blue' },
      { name: 'color', value: 'yellow', label: 'Yellow' },
    ];

    return (
      <div>
        <Button onClick={this.open}>Open Modal</Button>
        <ModalTransition>
          {isOpen && (
            <ModalDialog
              components={{
                Container: formWrapper,
                Footer: footer,
              }}
              heading="Submit form demo"
              onClose={this.close}
            >
              <p>Enter some text then submit the form to see the response.</p>
              <Field
                label="Name"
                name="my-name"
                placeholder="Your name"
                value=""
              />
              <Field
                label="Email"
                name="my-email"
                placeholder="gbelson@hooli.com"
                value=""
              />
              <Checkbox name="checkbox" value="example" label="Checkbox" />
              <RadioGroup label="Basic Radio Group Example" items={radioItems}>
                <AkRadio
                  name="standalone"
                  value="singleButton"
                  onChange={e =>
                    console.log('standalone change', e.target.value)
                  }
                >
                  Radio button
                </AkRadio>
              </RadioGroup>
            </ModalDialog>
          )}
        </ModalTransition>

        <Iframe
          hasData={hasData}
          onLoad={this.handleLoad}
          name={FRAME}
          heading="Form POST test"
        />
      </div>
    );
  }
}
