import * as React from 'react';
import styled from 'styled-components';
import { Color as StatusColor } from '@atlaskit/status';
import { Field } from '@atlaskit/form';
import AkButton from '@atlaskit/button';
import AkFieldText from '@atlaskit/field-text';
import AkSelect from '@atlaskit/select';
import MobileEditor from '../src/editor/mobile-editor-element';
import WebToNativeReporter from '../example-helpers/WebToNativeReporter';
import { bridge } from '../src/editor/mobile-editor-element';

export interface State {
  text: string;
  color: { value: string; label: string };
  uuid: string;
}

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: left;

  > * {
    flex: 0 1 auto;
    margin-right: 8px;
  }
`;

const Container: React.ComponentClass<
  React.HTMLAttributes<{}> & { height?: string }
> = styled.div`
  height: ${props => (props.height ? props.height : 'auto')};
  border: 1px solid #ddd;
  margin: 16px;
  padding: 8px;
`;

const colorOptions = [
  { value: 'neutral', label: 'Neutral' },
  { value: 'purple', label: 'Purple' },
  { value: 'blue', label: 'Blue' },
  { value: 'red', label: 'Red' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
];

export default class Example extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      color: colorOptions[0],
      uuid: '1234',
    };
  }

  private submitOnStatusUpdate = event => {
    event.preventDefault();
    const { text, color, uuid } = this.state;
    bridge.onStatusUpdate(text, color.value as StatusColor, uuid);
  };

  private onStatusTextChange = event => {
    this.setState({
      text: event.target.value,
    });
  };

  private onStatusColorChange = option => {
    this.setState({
      color: option,
    });
  };

  private onStatusUuidChange = event => {
    this.setState({
      uuid: event.target.value,
    });
  };

  private onStatusPickerDismissed = event => {
    event.preventDefault();
    bridge.onStatusPickerDismissed();
  };

  render() {
    const { text, color, uuid } = this.state;
    return (
      <div>
        <Container height="250px">
          <h3>Mobile editor</h3>
          <MobileEditor />
        </Container>

        <Container>
          <h3>Native to Web</h3>
          <Form onSubmit={this.submitOnStatusUpdate}>
            <AkFieldText
              label="Text"
              value={text}
              onChange={this.onStatusTextChange}
            />
            <Field label="Color">
              <AkSelect
                className="single-select"
                classNamePrefix="react-select"
                options={colorOptions}
                value={color}
                onChange={this.onStatusColorChange}
                styles={{
                  container: css => ({ ...css, width: 150 }),
                }}
              />
            </Field>
            <AkFieldText
              label="uuid"
              value={uuid}
              onChange={this.onStatusUuidChange}
            />
            <AkButton type="submit">onStatusUpdate</AkButton>
          </Form>
          <hr />
          <form onSubmit={this.onStatusPickerDismissed}>
            <AkButton type="submit">onStatusPickerDismissed</AkButton>
          </form>
        </Container>

        <Container height="200px">
          <h3>Web to native</h3>
          <WebToNativeReporter
            filter={['showStatusPicker', 'dismissStatusPicker']}
          />
        </Container>
      </div>
    );
  }
}
