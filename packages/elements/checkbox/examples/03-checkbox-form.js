// @flow
import React, { PureComponent } from 'react';
import Button from '@atlaskit/button';
import Checkbox, { CheckboxGroup } from '../src';

const formTestUrl = '//httpbin.org/get';

export default class CheckboxGroupExample extends PureComponent<void> {
  render() {
    return (
      <div>
        <form
          action={formTestUrl}
          method="get"
          style={{ backgroundColor: 'white' }}
          target="submitFrame"
        >
          <CheckboxGroup>
            <Checkbox label="One" value="One" name="one" />
            <Checkbox label="Two" value="two" name="two" />
            <Checkbox label="Three" value="Three" name="three" />
          </CheckboxGroup>

          <p>
            When checkboxes have the same name their values are grouped when
            submitted.
          </p>

          <CheckboxGroup>
            <Checkbox
              label="Same Name - One"
              value="Same Name - One"
              name="same-name"
            />
            <Checkbox
              label="Same Name - Two"
              value="Same Name - Two"
              name="same-name"
            />
            <Checkbox
              label="Same Name - Three"
              value="Same Name - Three"
              name="same-name"
            />
          </CheckboxGroup>
          <p>
            <Button type="submit" appearance="primary">
              Submit
            </Button>
          </p>
        </form>
        <p>The data submitted by the form will appear below:</p>
        <iframe
          src=""
          title="Checkbox Resopnse Frame"
          id="submitFrame"
          name="submitFrame"
          style={{
            width: '95%',
            height: '300px',
            borderStyle: 'dashed',
            borderWidth: '1px',
            borderColor: '#ccc',
            padding: '0.5em',
            color: '#ccc',
            margin: '0.5em',
          }}
        />
      </div>
    );
  }
}
