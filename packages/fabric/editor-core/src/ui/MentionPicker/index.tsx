import {
  MentionPicker as AkMentionPicker,
  MentionProvider,
  MentionDescription,
  isSpecialMention,
} from '@atlaskit/mention';
import * as React from 'react';
import { PureComponent } from 'react';
import { PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { MentionsState } from '../../plugins/mentions';
import { Popup } from '@atlaskit/editor-common';
import { analyticsService } from '../../analytics';
import * as keymaps from '../../keymaps';

enum InsertType {
  SELECTED = 'selected',
  ENTER = 'enter',
  SHIFT_ENTER = 'shift-enter',
  SPACE = 'space',
  TAB = 'tab',
}

export interface Props {
  editorView?: EditorView;
  mentionProvider: Promise<MentionProvider>;
  pluginKey: PluginKey;
  presenceProvider?: any;
  reversePosition?: boolean;
  target?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsMountPoint?: HTMLElement;
}

export interface State {
  query?: string;
  anchorElement?: HTMLElement;
  mentionProvider?: MentionProvider;
  focused?: boolean;
}

export default class MentionPicker extends PureComponent<Props, State> {
  state: State = {};
  content?: HTMLElement;
  private pluginState?: MentionsState;
  private picker?: AkMentionPicker;
  private pickerOpenTime: number;
  private pickerElapsedTime: number;
  private insertType?: InsertType;

  componentWillMount() {
    this.pickerOpenTime = 0;
    this.pickerElapsedTime = 0;
    this.setPluginState(this.props);
  }

  componentDidMount() {
    this.resolveResourceProvider(this.props.mentionProvider);
  }

  componentWillUnmount() {
    const { pluginState } = this;

    if (pluginState) {
      pluginState.unsubscribe(this.handlePluginStateChange);
    }
  }

  componentWillUpdate(nextProps: Props) {
    if (!this.pluginState) {
      this.setPluginState(nextProps);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.mentionProvider !== this.props.mentionProvider) {
      this.resolveResourceProvider(nextProps.mentionProvider);
    }
  }

  private setPluginState(props: Props) {
    const { editorView, pluginKey } = props;
    if (!editorView) {
      return;
    }

    const pluginState: MentionsState = pluginKey.getState(editorView.state);

    if (pluginState) {
      this.pluginState = pluginState;

      pluginState.subscribe(this.handlePluginStateChange);
      pluginState.onSelectPrevious = this.handleSelectPrevious;
      pluginState.onSelectNext = this.handleSelectNext;
      pluginState.onSelectCurrent = this.handleSelectCurrent;
      pluginState.onDismiss = this.handleOnClose;
    }
  }

  private resolveResourceProvider(resourceProvider): void {
    if (resourceProvider) {
      resourceProvider.then((mentionProvider: MentionProvider) => {
        this.setState({ mentionProvider });
      });
    } else {
      this.setState({ mentionProvider: undefined });
    }
  }

  private handlePluginStateChange = (state: MentionsState) => {
    const { anchorElement, query, focused } = state;
    this.setState({ anchorElement, query, focused });
  };

  private handleOnOpen = () => {
    this.pickerOpenTime = Date.now();
  };

  private calculateElapsedTime = () => {
    this.pickerElapsedTime = Date.now() - this.pickerOpenTime;
  };

  private handleOnClose = (): boolean => {
    this.calculateElapsedTime();

    analyticsService.trackEvent('atlassian.fabric.mention.picker.close', {
      duration: this.pickerElapsedTime || 0,
    });

    return true;
  };

  render() {
    const { focused, anchorElement, query, mentionProvider } = this.state;
    const {
      popupsBoundariesElement,
      popupsMountPoint,
      presenceProvider,
    } = this.props;

    if (!focused || !anchorElement || query === undefined || !mentionProvider) {
      return null;
    }

    return (
      <Popup
        target={anchorElement}
        fitHeight={300}
        fitWidth={340}
        boundariesElement={popupsBoundariesElement}
        mountTo={popupsMountPoint}
        offset={[0, 3]}
      >
        <AkMentionPicker
          resourceProvider={mentionProvider}
          presenceProvider={presenceProvider}
          onSelection={this.handleSelectedMention}
          onOpen={this.handleOnOpen}
          onClose={this.handleOnClose}
          query={query}
          ref={this.handleMentionPickerRef}
        />
      </Popup>
    );
  }

  private handleMentionPickerRef = ref => {
    this.picker = ref;
  };

  private handleSelectedMention = (mention: MentionDescription) => {
    this.calculateElapsedTime();
    this.pluginState!.insertMention(mention);
    this.fireMentionInsertAnalytics(mention);
  };

  private handleSelectPrevious = (): boolean => {
    if (this.picker) {
      (this.picker as AkMentionPicker).selectPrevious();
    }

    return true;
  };

  private handleSelectNext = (): boolean => {
    if (this.picker) {
      (this.picker as AkMentionPicker).selectNext();
    }

    return true;
  };

  private getInsertTypeForKey(key?: string) {
    if (key === keymaps.space.common) {
      return InsertType.SPACE;
    }
    if (key === keymaps.enter.common) {
      return InsertType.ENTER;
    }
    if (key === keymaps.tab.common) {
      return InsertType.TAB;
    }
    if (key === keymaps.insertNewLine.common) {
      return InsertType.SHIFT_ENTER;
    }
    return undefined;
  }

  private handleSelectCurrent = (key): boolean => {
    if (this.getMentionsCount() > 0 && this.picker) {
      this.insertType = this.getInsertTypeForKey(key);

      (this.picker as AkMentionPicker).chooseCurrentSelection();
    } else {
      this.insertType = undefined;
      this.pluginState!.dismiss();
    }

    this.handleOnClose();
    return true;
  };

  private fireMentionInsertAnalytics = (mention: MentionDescription) => {
    const { accessLevel } = mention;
    const lastQuery = this.pluginState!.lastQuery;

    analyticsService.trackEvent('atlassian.fabric.mention.picker.insert', {
      mode: this.insertType || InsertType.SELECTED,
      isSpecial: isSpecialMention(mention) || false,
      accessLevel: accessLevel || '',
      queryLength: lastQuery ? lastQuery.length : 0,
      duration: this.pickerElapsedTime || 0,
    });

    this.insertType = undefined;
  };

  private getMentionsCount(): number {
    return (this.picker && this.picker.mentionsCount()) || 0;
  }
}
