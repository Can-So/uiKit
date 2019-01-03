// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';

import Form, { Field, CheckboxField } from '@atlaskit/form';
import { Checkbox } from '@atlaskit/checkbox';
import Textfield from '@atlaskit/textfield';
import RadioGroup, { AkRadio } from '@atlaskit/field-radio-group';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import { colors } from '@atlaskit/theme';

import ModalDialog, { ModalFooter, ModalTransition } from '../src';

const ResponseFrame = styled.pre`
  background: #f1ede4;
  display: flex;
  border: 0 solid #f7d87c;
  border-left-width: 5px;
  bottom: 16px;
  box-shadow: 0 2px 11px -1px rgba(0, 0, 0, 0.18);
  height: 200px;
  left: 16px;
  visibility: ${props => (props.hasData ? 'visibile' : 'hidden')};
  opacity: ${props => (props.hasData ? 1 : 0)};
  padding: 5px;
  position: absolute;
  transform: ${props =>
    props.hasData ? 'translateX(0)' : 'translateX(-30px)'};
  transition: opacity 200ms, visibility 200ms, transform 200ms ease-out;
  width: 400px;
  z-index: 500;
`;

const ResponseContent = styled.div`
  overflow-x: wrap;
  overflow-y: scroll;
  flex-grow: 1;
`;

type State = { hasData: boolean, isOpen: boolean, response: string };
export default class AtlaskitFormDemo extends Component<{}, State> {
  state = { hasData: false, isOpen: false, response: '' };

  handleLoad = () => this.setState({ hasData: true });
  onModalClose = () => this.setState({ hasData: false, response: '' });
  open = () => this.setState({ isOpen: true });
  close = () => this.setState({ isOpen: false });
  onFormSubmit = (data: Object) => {
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res =>
        this.setState({ response: JSON.stringify(res, undefined, 2) }),
      )
      .then(this.handleLoad());
  };

  render() {
    const { hasData, isOpen, response } = this.state;
    const footer = props => (
      <ModalFooter showKeyline={props.showKeyline}>
        <span />
        <Button appearance="primary" type="submit">
          Create issue
        </Button>
      </ModalFooter>
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
              heading="Atlaskit Form Demo"
              onClose={this.close}
              components={{
                Container: ({ children, className }) => (
                  <Form onSubmit={this.onFormSubmit}>
                    {({ formProps }) => (
                      <form {...formProps} className={className}>
                        {children}
                      </form>
                    )}
                  </Form>
                ),
                Footer: footer,
              }}
            >
              <p>Enter some text then submit the form to see the response.</p>
              <Field label="Name" name="my-name" defaultValue="">
                {({ fieldProps }) => <Textfield {...fieldProps} />}
              </Field>
              <Field label="Email" name="my-email" defaultValue="">
                {({ fieldProps }) => (
                  <Textfield
                    autoComplete="off"
                    placeholder="gbelson@hooli.com"
                    {...fieldProps}
                  />
                )}
              </Field>

              <CheckboxField name="checkbox" defaultIsChecked>
                {({ fieldProps }) => (
                  <Checkbox {...fieldProps} value="example" label="Checkbox" />
                )}
              </CheckboxField>

              <Field name="radiogroup" defaultValue="">
                {({ fieldProps: { value, ...others } }) => (
                  <RadioGroup
                    items={radioItems}
                    label="Basic Radio Group Example"
                    {...others}
                  >
                    <AkRadio name="standalone" value="singleButton">
                      Radio button
                    </AkRadio>
                  </RadioGroup>
                )}
              </Field>
            </ModalDialog>
          )}
        </ModalTransition>

        <ResponseFrame hasData={hasData} heading="Form POST test">
          <ResponseContent>{response}</ResponseContent>

          <Button onClick={this.onModalClose} display="block" appearance="link">
            <CrossIcon
              label="Close Modal"
              primaryColor={colors.R400}
              size="small"
            />
          </Button>
        </ResponseFrame>
      </div>
    );
  }
}
