import Select, { CreatableSelect } from '@atlaskit/select';
import * as React from 'react';
import { UserPickerProps } from '../types';
import { BaseUserPicker } from './BaseUserPicker';
import { getStyles } from './styles';
import { getComponents } from './components';
import { getCreatableProps } from './creatable';

type Props = UserPickerProps;

export class UserPicker extends React.Component<Props, {}> {
  static defaultProps: UserPickerProps = {
    width: 350,
  };

  render() {
    const { allowEmail, isMulti, isValidEmail, anchor } = this.props;
    const width = this.props.width as string | number;

    const SelectComponent = allowEmail ? CreatableSelect : Select;
    const pickerProps = allowEmail ? getCreatableProps(isValidEmail) : {};

    return (
      <BaseUserPicker
        {...this.props}
        width={width}
        SelectComponent={SelectComponent}
        styles={getStyles(width)}
        components={getComponents(isMulti, anchor)}
        pickerProps={pickerProps}
      />
    );
  }
}
