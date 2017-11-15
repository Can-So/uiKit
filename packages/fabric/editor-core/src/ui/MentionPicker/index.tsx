import { MentionPicker as AkMentionPicker, MentionProvider, MentionDescription } from '@atlaskit/mention';
import * as React from 'react';
import { PureComponent } from 'react';
import { PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { MentionsState } from '../../plugins/mentions';
import { Popup } from '@atlaskit/editor-common';

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
}

export default class MentionPicker extends PureComponent<Props, State> {
  state: State = {};
  content?: HTMLElement;
  private pluginState?: MentionsState;
  private picker?: AkMentionPicker;

  componentWillMount() {
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
    const { anchorElement, query } = state;
    this.setState({ anchorElement, query });
  }

  render() {
    const { anchorElement, query, mentionProvider } = this.state;
    const { popupsBoundariesElement, popupsMountPoint, presenceProvider } = this.props;

    if (!anchorElement || query === undefined || !mentionProvider) {
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
          query={query}
          ref={this.handleMentionPickerRef}
        />
      </Popup>
    );
  }

  private handleMentionPickerRef = (ref) => {
    this.picker = ref;
  }

  private handleSelectedMention = (mention: MentionDescription) => {
    this.pluginState!.insertMention(mention);
  }

  private handleSelectPrevious = (): boolean => {
    if (this.picker) {
      (this.picker as AkMentionPicker).selectPrevious();
    }

    return true;
  }

  private handleSelectNext = (): boolean => {
    if (this.picker) {
      (this.picker as AkMentionPicker).selectNext();
    }

    return true;
  }

  private handleSelectCurrent = (): boolean => {
    if (this.getMentionsCount() > 0 && this.picker) {
      (this.picker as AkMentionPicker).chooseCurrentSelection();
    } else {
      this.pluginState!.dismiss();
    }

    return true;
  }

  private getMentionsCount(): number {
    return (this.picker && this.picker.mentionsCount()) || 0;
  }
}
