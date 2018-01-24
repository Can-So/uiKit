import {
  EmojiTypeAhead as AkEmojiTypeAhead,
  EmojiDescription,
  OptionalEmojiDescription,
} from '@atlaskit/emoji';
import * as React from 'react';
import { PureComponent } from 'react';
import { EmojiProvider } from '@atlaskit/emoji';
import { PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Popup } from '@atlaskit/editor-common';
import { EmojiState } from '../../plugins/emojis';
import { analyticsService } from '../../analytics';
import {
  getInsertTypeForKey,
  InsertType,
} from '../../analytics/fabric-analytics-helper';

export interface Props {
  editorView?: EditorView;
  pluginKey: PluginKey;
  reversePosition?: boolean;
  popupsBoundariesElement?: HTMLElement;
  popupsMountPoint?: HTMLElement;
  emojiProvider: Promise<EmojiProvider>;
}

export interface State {
  query?: string;
  anchorElement?: HTMLElement;
  queryActive?: boolean;
  focused?: boolean;
}

export default class EmojiTypeAhead extends PureComponent<Props, State> {
  private pluginState?: EmojiState;
  private openTime: number = 0;
  private lastKeyTyped?: string;

  state: State = {};
  typeAhead?: AkEmojiTypeAhead;

  componentWillMount() {
    this.setPluginState(this.props);
  }

  componentWillUpdate(nextProps: Props) {
    if (!this.pluginState) {
      this.setPluginState(nextProps);
    }
  }

  componentWillUnmount() {
    const { pluginState } = this;

    if (pluginState) {
      pluginState.unsubscribe(this.handlePluginStateChange);
    }
  }

  private setPluginState(props: Props) {
    const { editorView, pluginKey } = props;

    if (!editorView) {
      return;
    }

    const pluginState = pluginKey.getState(editorView.state);

    if (pluginState) {
      this.pluginState = pluginState;

      pluginState.subscribe(this.handlePluginStateChange);

      // note: these bindings are required otherwise 'this' context won't be available
      pluginState.onSelectPrevious = this.handleSelectPrevious;
      pluginState.onSelectNext = this.handleSelectNext;
      pluginState.onSelectCurrent = this.handleSelectCurrent;

      // note: AkEmojiTypeAhead.onClose does not work (product-fabric.atlassian.net/browse/FS-1640)
      pluginState.onDismiss = this.handleOnClose;
      pluginState.onSpaceSelectCurrent = this.handleSpaceSelectCurrent;
      pluginState.onSpaceTyped = this.handleSpaceTyped;
    }
  }

  private handlePluginStateChange = (state: EmojiState) => {
    const { anchorElement, query, queryActive, focused } = state;
    this.setState({ anchorElement, query, queryActive, focused });
  };

  handleEmojiTypeAheadRef = ref => {
    this.typeAhead = ref;
  };

  render() {
    const { anchorElement, query, queryActive, focused } = this.state;
    const {
      popupsBoundariesElement,
      popupsMountPoint,
      emojiProvider,
    } = this.props;

    if (
      !focused ||
      !this.pluginState ||
      !anchorElement ||
      !queryActive ||
      !emojiProvider
    ) {
      return null;
    }

    return (
      <Popup
        target={anchorElement}
        fitHeight={350}
        fitWidth={350}
        boundariesElement={popupsBoundariesElement}
        mountTo={popupsMountPoint}
        offset={[0, 3]}
      >
        <AkEmojiTypeAhead
          emojiProvider={emojiProvider}
          onSelection={this.handleSelectedEmoji}
          onOpen={this.handleOnOpen}
          query={query}
          ref={this.handleEmojiTypeAheadRef}
        />
      </Popup>
    );
  }

  private calculateElapsedTime = () => Date.now() - this.openTime;

  private handleSelectedEmoji = (
    emojiId: any,
    emoji: OptionalEmojiDescription,
  ) => {
    const _emoji = emoji as EmojiDescription;
    this.fireTypeAheadSelectedAnalytics(
      _emoji,
      this.lastKeyTyped,
      this.pluginState!.query,
    );
    this.pluginState!.insertEmoji(emojiId);
  };

  private handleSelectPrevious = (): boolean => {
    if (this.typeAhead) {
      (this.typeAhead as AkEmojiTypeAhead).selectPrevious();
      analyticsService.trackEvent('atlassian.fabric.emoji.typeahead.keyup', {});
    }
    return true;
  };

  private handleSelectNext = (): boolean => {
    if (this.typeAhead) {
      (this.typeAhead as AkEmojiTypeAhead).selectNext();
      analyticsService.trackEvent(
        'atlassian.fabric.emoji.typeahead.keydown',
        {},
      );
    }
    return true;
  };

  private fireTypeAheadSelectedAnalytics = (
    emoji?: EmojiDescription,
    key?: string,
    query?: string,
  ): void => {
    const queryLength = (query && query.length) || 0;
    const insertType = getInsertTypeForKey(key) || InsertType.SELECTED;

    analyticsService.trackEvent('atlassian.fabric.emoji.typeahead.select', {
      mode: insertType,
      duration: this.calculateElapsedTime() || 0,
      emojiId: (emoji && emoji.id) || '',
      type: (emoji && emoji.type) || '',
      queryLength,
    });
  };

  handleSpaceTyped = (): void => {
    analyticsService.trackEvent('atlassian.fabric.emoji.typeahead.space', {});
  };

  private handleSpaceSelectCurrent = (
    emoji: EmojiDescription,
    key?: string,
    query?: string,
  ): void => {
    this.fireTypeAheadSelectedAnalytics(emoji, key, query);
  };

  private handleSelectCurrent = (key?: string): boolean => {
    this.lastKeyTyped = key;

    if (this.getEmojisCount() > 0) {
      (this.typeAhead as AkEmojiTypeAhead).chooseCurrentSelection();
    } else {
      this.pluginState!.dismiss();
    }

    return true;
  };

  private getEmojisCount(): number {
    return (this.typeAhead && this.typeAhead.count()) || 0;
  }

  handleOnOpen = (): void => {
    this.lastKeyTyped = undefined;
    this.openTime = Date.now();
    analyticsService.trackEvent('atlassian.fabric.emoji.typeahead.open', {});
  };

  handleOnClose = (): void => {
    analyticsService.trackEvent('atlassian.fabric.emoji.typeahead.close', {});
  };
}
