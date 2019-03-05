// @flow
import React, { Component } from 'react';
import Button from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import DownIcon from '@atlaskit/icon/glyph/hipchat/chevron-down';
import { PopupSelect } from '../src';

const options = [
  { label: 'Adelaide', value: 'adelaide' },
  { label: 'Brisbane', value: 'brisbane' },
  { label: 'Canberra', value: 'canberra' },
  { label: 'Darwin', value: 'darwin' },
  { label: 'Hobart', value: 'hobart' },
  { label: 'Melbourne', value: 'melbourne' },
  { label: 'Perth', value: 'perth' },
  { label: 'Sydney', value: 'sydney' },
];

const defaults = { options, placeholder: 'Choose a City' };

type State = {
  value: Object,
};
class MultiPopupSelectExample extends Component<*, State> {
  state = {
    value: options[0],
  };

  onChange = (value: any) => {
    this.setState({
      value,
    });
  };

  render() {
    const {
      value,
    } = this.state;

    return (
        <div>
          <PopupSelect
            {...defaults}
            value={value}
            target={({ref}) => <Button innerRef={ref}>Target</Button>}
            onChange={this.onChange}
          />
        </div>
      );
  }
}

export default MultiPopupSelectExample;
