import { PopupSelect } from '@atlaskit/select';
import * as React from 'react';
import { PopupUserPickerProps } from '../types';
import { getModalComponents } from './components';
import { getModalStyles } from './styles';
import { getModalProps } from './modal';
import { BaseUserPicker } from './BaseUserPicker';

export class PopupUserPicker extends React.Component<PopupUserPickerProps, {}> {
  static defaultProps = {
    width: 300,
  };

  render() {
    const { target } = this.props;

    const width = this.props.width as string | number;
    const styles = getModalStyles(width);

    return (
      <BaseUserPicker
        {...this.props}
        open
        SelectComponent={PopupSelect}
        width={width}
        styles={styles}
        components={getModalComponents()}
        pickerProps={getModalProps(width, target)}
      />
    );
  }
}
