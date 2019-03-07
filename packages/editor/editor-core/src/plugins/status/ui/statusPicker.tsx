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
import { analyticsState, createStatusAnalyticsAndFire } from '../analytics';

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
  onTextChanged: (status: StatusType, isNew: boolean) => void;
  onEnter: (status: StatusType) => void;
  isNew?: boolean;
  defaultText?: string;
  defaultColor?: Color;
  defaultLocalId?: string;
  createAnalyticsEvent?: CreateUIAnalyticsEventSignature;
}

export interface State {
  color: Color;
  text: string;
  localId?: string;
  isNew?: boolean;
}

const PickerContainer = styled.div`
  background: ${colors.N0};
  padding: ${gridSize()}px 0;
  border-radius: ${borderRadius()}px;
  ${dropShadow};
`;

export class StatusPickerWithoutAnalytcs extends React.Component<Props, State> {
  private startTime!: number;
  private inputMethod?: InputMethod;
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

  private fireStatusPopupOpenedAnalytics(state: State) {
    const { color, text, localId, isNew } = state;
    this.startTime = Date.now();

    this.createStatusAnalyticsAndFireFunc({
      action: 'opened',
      actionSubject: 'statusPopup',
      attributes: {
        textLength: text ? text.length : 0,
        selectedColor: color,
        localId,
        state: analyticsState(isNew),
      },
    });
  }

  private fireStatusPopupClosedAnalytics(state: State) {
    const { color, text, localId, isNew } = state;
    this.createStatusAnalyticsAndFireFunc({
      action: 'closed',
      actionSubject: 'statusPopup',
      attributes: {
        inputMethod: this.inputMethod,
        duration: Date.now() - this.startTime,
        textLength: text ? text.length : 0,
        selectedColor: color,
        localId,
        state: analyticsState(isNew),
      },
    });
  }

  private reset() {
    this.startTime = Date.now();
    this.inputMethod = InputMethod.blur;
  }

  componentDidMount() {
    this.reset();
    this.fireStatusPopupOpenedAnalytics(this.state);
  }

  componentWillUnmount() {
    this.fireStatusPopupClosedAnalytics(this.state);
    this.startTime = 0;
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    _snapshot?: any,
  ): void {
    const element = this.props.target;

    if (prevProps.target !== element) {
      const newState = this.extractStateFromProps(this.props);
      this.setState(newState);

      this.fireStatusPopupClosedAnalytics(prevState);
      this.reset();
      this.fireStatusPopupOpenedAnalytics(newState);
    }
  }

  private extractStateFromProps(props: Props): State {
    const { defaultColor, defaultText, defaultLocalId, isNew } = props;
    return {
      color: defaultColor || DEFAULT_STATUS.color,
      text: defaultText || DEFAULT_STATUS.text,
      localId: defaultLocalId,
      isNew,
    } as State;
  }

  handleClickOutside = (event: Event) => {
    event.preventDefault();
    this.inputMethod = InputMethod.blur;
    this.props.closeStatusPicker();
  };

  private handleEscapeKeydown = (event: Event) => {
    event.preventDefault();
    this.inputMethod = InputMethod.escKey;
    this.props.onEnter(this.state);
  };

  render() {
    const { isNew, target } = this.props;
    const { color, text } = this.state;
    return (
      target && (
        <PopupWithListeners
          target={target}
          offset={[0, 8]}
          handleClickOutside={this.handleClickOutside}
          handleEscapeKeydown={this.handleEscapeKeydown}
          zIndex={akEditorFloatingDialogZIndex}
          fitHeight={40}
        >
          <PickerContainer onClick={this.handlePopupClick}>
            <AkStatusPicker
              autoFocus={isNew}
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

  private onColorHover = (color: Color) => {
    this.createStatusAnalyticsAndFireFunc({
      action: 'hovered',
      actionSubject: 'statusColorPicker',
      attributes: {
        color,
        localId: this.state.localId,
        state: analyticsState(this.props.isNew),
      },
    });
  };

  private onColorClick = (color: Color) => {
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
        state: analyticsState(this.props.isNew),
      },
    });
  };

  private onTextChanged = (text: string) => {
    const { color, localId } = this.state;
    this.setState({ text });
    this.props.onTextChanged(
      {
        text,
        color,
        localId,
      },
      !!this.props.isNew,
    );
  };

  private onEnter = () => {
    this.inputMethod = InputMethod.enterKey;
    this.props.onEnter(this.state);
  };

  // cancel bubbling to fix clickOutside logic:
  // popup re-renders its content before the click event bubbles up to the document
  // therefore click target element would be different from the popup content
  private handlePopupClick = (event: React.MouseEvent<HTMLElement>) =>
    event.nativeEvent.stopImmediatePropagation();
}

export default withAnalyticsEvents()(StatusPickerWithoutAnalytcs);
