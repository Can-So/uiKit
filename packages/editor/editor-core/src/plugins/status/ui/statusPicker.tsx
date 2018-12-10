import * as React from 'react';
import styled from 'styled-components';
import { Popup, akEditorFloatingDialogZIndex } from '@atlaskit/editor-common';
import { colors, borderRadius, gridSize } from '@atlaskit/theme';
import { StatusPicker as AkStatusPicker, Color } from '@atlaskit/status';
import { dropShadow } from '../../../ui/styles';
import withOuterListeners from '../../../ui/with-outer-listeners';
import { DEFAULT_STATUS } from '../actions';
import { StatusType } from '../plugin';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';
import { createStatusAnalyticsAndFire } from '../analytics';

const PopupWithListeners = withOuterListeners(Popup);

export enum InputMethod {
  blur = 'blur',
  escKey = 'escKey',
  enterKey = 'enterKey',
}

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
  createAnalyticsEvent?: CreateUIAnalyticsEventSignature;
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

class StatusPicker extends React.Component<Props, State> {
  private startTime: number;
  private inputMethod: InputMethod;
  private createStatusAnalyticsAndFireFunc: Function;

  static defaultProps = {
    autoFocus: false,
  };

  constructor(props: Props) {
    super(props);

    this.state = this.extractStateFromProps(props);
    this.createStatusAnalyticsAndFireFunc = createStatusAnalyticsAndFire(
      props.createAnalyticsEvent,
    );
  }

  componentDidMount() {
    const { color, text, localId } = this.state;

    this.startTime = Date.now();
    this.inputMethod = InputMethod.blur;

    this.createStatusAnalyticsAndFireFunc({
      action: 'opened',
      actionSubject: 'statusPopup',
      attributes: {
        textLength: text ? text.length : 0,
        selectedColor: color,
        localId,
      },
    });
  }

  componentWillUnmount() {
    const { color, text, localId } = this.state;
    const inputMethod = this.inputMethod;

    this.createStatusAnalyticsAndFireFunc({
      action: 'closed',
      actionSubject: 'statusPopup',
      attributes: {
        inputMethod,
        duration: Date.now() - this.startTime,
        textLength: text ? text.length : 0,
        selectedColor: color,
        localId,
      },
    });

    this.startTime = 0;
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

  private handleCloseStatusPicker = (inputMethod: InputMethod) => () => {
    this.inputMethod = inputMethod;
    this.props.closeStatusPicker();
  };

  render() {
    const { autoFocus, target } = this.props;
    const { color, text } = this.state;
    return (
      target && (
        <PopupWithListeners
          target={target}
          offset={[0, 8]}
          handleClickOutside={this.handleCloseStatusPicker(InputMethod.blur)}
          handleEscapeKeydown={this.handleCloseStatusPicker(InputMethod.escKey)}
          handleEnterKeydown={this.handleCloseStatusPicker(
            InputMethod.enterKey,
          )}
          zIndex={akEditorFloatingDialogZIndex}
          fitHeight={40}
        >
          <PickerContainer onClick={this.handlePopupClick}>
            <AkStatusPicker
              autoFocus={autoFocus}
              selectedColor={color}
              text={text}
              onColorClick={this.onColorClick}
              onColorHover={this.onColorHover}
              onTextChanged={this.onTextChanged}
              onEnter={this.onEnter}
            />
          </PickerContainer>
        </PopupWithListeners>
      )
    );
  }

  private onColorHover = color => {
    this.createStatusAnalyticsAndFireFunc({
      action: 'hovered',
      actionSubject: 'statusColorPicker',
      attributes: {
        color,
        localId: this.state.localId,
      },
    });
  };

  private onColorClick = color => {
    const { text, localId } = this.state;
    this.setState({ color });

    this.props.onSelect({
      text,
      color,
      localId,
    });

    this.createStatusAnalyticsAndFireFunc({
      action: 'clicked',
      actionSubject: 'statusColorPicker',
      attributes: {
        color,
        localId,
      },
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

export default withAnalyticsEvents()(StatusPicker);
