import { PopupSelect } from '@atlaskit/select';
import * as React from 'react';
import { PopupUserPickerProps } from '../types';
import { getModalComponents } from './components';
import { getModalStyles } from './styles';
import { getModalProps } from './modal';
import { BaseUserPicker } from './BaseUserPicker';

interface State {
  flipped: boolean;
}

export class PopupUserPicker extends React.Component<
  PopupUserPickerProps,
  State
> {
  static defaultProps = {
    width: 300,
  };
  state = {
    flipped: false,
  };

  handleFlipStyle = (data: { flipped: boolean; styles: any; popper: any }) => {
    const {
      flipped,
      styles: { transform },
      popper: { height },
    } = data;
    this.setState({ flipped });
    if (!flipped) {
      return data;
    }

    data.styles.transform =
      transform + `translate(0, ${height}px) translate(0, -100%)`;
    return data;
  };

  render() {
    const { target } = this.props;
    const { flipped } = this.state;
    const width = this.props.width as string | number;
    const styles = getModalStyles(width, flipped);

    return (
      <BaseUserPicker
        {...this.props}
        SelectComponent={PopupSelect}
        width={width}
        styles={styles}
        components={getModalComponents()}
        pickerProps={getModalProps(width, target, this.handleFlipStyle)}
      />
    );
  }
}
