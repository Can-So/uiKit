import { PopupSelect } from '@atlaskit/select';
import * as React from 'react';
import { PopupUserPickerProps } from '../types';
import { getPopupComponents } from './components';
import { getPopupStyles } from './styles';
import { getPopupProps } from './popup';
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
    const styles = getPopupStyles(width, flipped);

    return (
      <BaseUserPicker
        {...this.props}
        SelectComponent={PopupSelect}
        width={width}
        styles={styles}
        components={getPopupComponents()}
        pickerProps={getPopupProps(width, target, this.handleFlipStyle)}
      />
    );
  }
}
