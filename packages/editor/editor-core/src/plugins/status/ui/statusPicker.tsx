import * as React from 'react';
import styled from 'styled-components';
import { Popup, akEditorFloatingDialogZIndex } from '@atlaskit/editor-common';
import { colors, borderRadius, gridSize } from '@atlaskit/theme';
import { StatusPicker as AkStatusPicker, Color } from '@atlaskit/status';
import { dropShadow } from '../../../ui/styles';
import withOuterListeners from '../../../ui/with-outer-listeners';
import { DEFAULT_STATUS } from '../actions';
import { StatusType } from '../plugin';

const PopupWithListeners = withOuterListeners(Popup);

export interface Props {
  target: HTMLElement | null;
  closeStatusPicker: () => void;
  onSelect: (status: StatusType) => void;
  onTextChanged: (status: StatusType) => void;
  onEnter: (status: StatusType) => void;
  autoFocus?: boolean;
  defaultText?: string;
  defaultColor?: Color;
  defaultLocalId?: string;
}

export interface State {
  color: Color;
  text: string;
  localId?: string;
}

const PickerContainer = styled.div`
  background: ${colors.N0};
  padding: ${gridSize()}px 0;
  border-radius: ${borderRadius()}px;
  ${dropShadow};
`;

export default class StatusPicker extends React.Component<Props, State> {
  static defaultProps = {
    autoFocus: false,
  };

  constructor(props: Props) {
    super(props);

    this.state = this.extractStateFromProps(props);
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot?: any,
  ): void {
    const element = this.props.target;
    if (prevProps.target !== element) {
      this.setState(this.extractStateFromProps(this.props));
    }
  }

  private extractStateFromProps(props: Props): State {
    let state = {} as State;
    const { defaultColor, defaultText, defaultLocalId } = props;
    state.color = defaultColor || DEFAULT_STATUS.color;
    state.text = defaultText || DEFAULT_STATUS.text;
    state.localId = defaultLocalId;

    return state;
  }

  render() {
    const { autoFocus, target, closeStatusPicker } = this.props;

    return (
      target && (
        <PopupWithListeners
          target={target}
          offset={[0, 8]}
          handleClickOutside={closeStatusPicker}
          handleEscapeKeydown={closeStatusPicker}
          zIndex={akEditorFloatingDialogZIndex}
          fitHeight={40}
        >
          <PickerContainer onClick={this.handlePopupClick}>
            <AkStatusPicker
              autoFocus={autoFocus}
              selectedColor={this.state.color}
              text={this.state.text}
              onColorClick={this.onColorClick}
              onTextChanged={this.onTextChanged}
              onEnter={this.onEnter}
            />
          </PickerContainer>
        </PopupWithListeners>
      )
    );
  }

  private onColorClick = color => {
    const { text, localId } = this.state;
    this.setState({ color });

    this.props.onSelect({
      text,
      color,
      localId,
    });
  };

  private onTextChanged = text => {
    const { color, localId } = this.state;
    this.setState({ text });
    this.props.onTextChanged({
      text,
      color,
      localId,
    });
  };

  private onEnter = () => {
    this.props.onEnter(this.state);
  };

  // cancel bubbling to fix clickOutside logic:
  // popup re-renders its content before the click event bubbles up to the document
  // therefore click target element would be different from the popup content
  private handlePopupClick = event =>
    event.nativeEvent.stopImmediatePropagation();
}
