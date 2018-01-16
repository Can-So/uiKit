import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PureComponent, ReactElement } from 'react';
import { PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Popup } from '@atlaskit/editor-common';
import { analyticsDecorator as analytics } from '../../analytics';
import { EmojiState } from '../../plugins/emojis';
import EmojiIcon from '@atlaskit/icon/glyph/editor/emoji';
import { EmojiPicker as AkEmojiPicker, EmojiProvider } from '@atlaskit/emoji';
import ToolbarButton from '../ToolbarButton';
import { OuterContainer } from './styles';

export interface Props {
  isReducedSpacing?: boolean;
  isDisabled?: boolean;
  editorView: EditorView;
  pluginKey: PluginKey;
  emojiProvider: Promise<EmojiProvider>;
  /**
   * The number of secondary toolbar buttons between and including ToolbarEmojiPicker and the right edge of the editor
   * This must be passed in by the integrator (e.g. SecondaryToolbar) that contains the buttons
   * TODO: Implement a better solution as part of ED-2565
   */
  numFollowingButtons: number;
  popupsMountPoint?: HTMLElement | undefined;
  popupsBoundariesElement?: HTMLElement | undefined;
}

export interface State {
  button?: HTMLElement;
  disabled?: boolean;
  isOpen: boolean;
}

/**
 * Checks if an element is detached (i.e. not in the current document)
 */
const isDetachedElement = el => !document.contains(el);

export default class ToolbarEmojiPicker extends PureComponent<Props, State> {
  private pickerRef: ReactElement<any>;
  private buttonRef: ReactElement<any>;
  private pluginState?: EmojiState;

  state: State = {
    isOpen: false,
  };

  componentWillMount() {
    this.setPluginState(this.props);
  }

  componentDidMount() {
    this.state.button = ReactDOM.findDOMNode(this.buttonRef) as HTMLElement;
    if (this.pluginState) {
      this.pluginState.subscribe(this.handlePluginStateChange);
    }
    // Keymapping must be added here at the document level as editor focus is lost
    // when the picker opens so plugins/emojis/keymaps.ts will not register ESC
    document.addEventListener('keydown', this.handleEscape);
  }

  componentWillReceiveProps(props) {
    if (!this.pluginState && props.pluginKey) {
      this.setPluginState(props);
    }
  }

  componentDidUpdate() {
    const { button } = this.state;
    if (!button || !button.getBoundingClientRect().width) {
      this.state.button = ReactDOM.findDOMNode(this.buttonRef) as HTMLElement;
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscape);
    if (this.pluginState) {
      this.pluginState.unsubscribe(this.handlePluginStateChange);
    }
  }

  handleEscape = e => {
    // ESC key pressed
    if (this.state.isOpen && (e.which === 27 || e.keyCode === 27)) {
      this.close();
    }
  };

  private setPluginState(props: Props) {
    const { editorView, pluginKey } = props;

    if (!editorView) {
      return;
    }

    const pluginState = pluginKey.getState(editorView.state);

    if (pluginState) {
      this.pluginState = pluginState;
      pluginState.subscribe(this.handlePluginStateChange);
      this.setState({
        disabled: !pluginState.isEnabled(),
      });
    }
  }

  private handlePluginStateChange = (pluginState: EmojiState) => {
    this.setState({
      disabled: !pluginState.isEnabled(),
    });
  };

  private handleButtonRef = (ref): void => {
    this.buttonRef = ref ? ref : null;
  };

  private onPickerRef = (ref: any) => {
    if (ref) {
      document.addEventListener('click', this.handleClickOutside);
    } else {
      document.removeEventListener('click', this.handleClickOutside);
    }
    this.pickerRef = ref;
  };

  private close = () => {
    this.setState({
      isOpen: false,
    });
  };

  private toggleOpen = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  private handleClickOutside = e => {
    const picker = ReactDOM.findDOMNode(this.pickerRef);
    // Ignore click events for detached elements.
    // Workaround for FS-1322 - where two onClicks fire - one when the upload button is
    // still in the document, and one once it's detached. Does not always occur, and
    // may be a side effect of a react render optimisation
    if (
      !picker ||
      (!isDetachedElement(e.target) && !picker.contains(e.target))
    ) {
      this.close();
    }
  };

  private renderPopup() {
    const { disabled, isOpen, button } = this.state;
    const {
      popupsMountPoint,
      popupsBoundariesElement,
      emojiProvider,
    } = this.props;
    if (disabled || !isOpen || !button) {
      return null;
    }

    return (
      <Popup
        target={button}
        fitHeight={350}
        fitWidth={350}
        offset={[0, 3]}
        mountTo={popupsMountPoint}
        boundariesElement={popupsBoundariesElement}
      >
        <AkEmojiPicker
          emojiProvider={emojiProvider}
          onSelection={this.handleSelectedEmoji}
          onPickerRef={this.onPickerRef}
        />
      </Popup>
    );
  }

  render() {
    const { isDisabled, isReducedSpacing } = this.props;
    const { isOpen, disabled } = this.state;
    const toolbarButton = (
      <ToolbarButton
        selected={isOpen}
        disabled={disabled || isDisabled}
        onClick={this.toggleOpen}
        iconBefore={<EmojiIcon label="Insert emoji (:)" />}
        ref={this.handleButtonRef}
        title="Insert emoji (:)"
        hideTooltip={isOpen}
        spacing={isReducedSpacing ? 'none' : 'default'}
      />
    );
    return (
      <OuterContainer width={isReducedSpacing ? 'large' : 'small'}>
        {toolbarButton}
        {this.renderPopup()}
      </OuterContainer>
    );
  }

  @analytics('atlassian.editor.emoji.button')
  private handleSelectedEmoji = (emojiId: any, emoji: any): boolean => {
    if (this.state.isOpen && this.pluginState) {
      this.pluginState.insertEmoji(emojiId);
      this.close();
      return true;
    }
    return false;
  };
}
