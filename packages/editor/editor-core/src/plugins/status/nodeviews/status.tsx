import * as React from 'react';
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';
import { Node as PMNode } from 'prosemirror-model';
import { Selection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Status } from '@atlaskit/status';
import { pluginKey } from '../plugin';
import { setStatusPickerAt } from '../actions';

export const messages = defineMessages({
  placeholder: {
    id: 'fabric.editor.statusPlaceholder',
    defaultMessage: 'Set a status',
    description:
      'Placeholder description for an empty (new) status item in the editor',
  },
});

export interface Props {
  node: PMNode;
  view: EditorView;
  getPos: () => number;
}

export interface State {
  selected: boolean;
}

class StatusNodeView extends React.Component<Props & InjectedIntlProps, State> {
  constructor(props: Props & InjectedIntlProps) {
    super(props);
    this.state = {
      selected: false,
    };
  }

  componentDidMount() {
    const { view } = this.props;
    const { selectionChanges } = pluginKey.getState(view.state);
    if (selectionChanges) {
      selectionChanges.subscribe(this.handleSelectionChange);
    }
  }

  componentWillUnmount() {
    const { view } = this.props;
    const { selectionChanges } = pluginKey.getState(view.state);
    if (selectionChanges) {
      selectionChanges.unsubscribe(this.handleSelectionChange);
    }
  }

  private handleSelectionChange = (
    newSelection: Selection,
    prevSelection: Selection,
  ) => {
    const { getPos } = this.props;
    const { from, to } = newSelection;
    const statusPos = getPos();
    const selected = from <= statusPos && to > statusPos;

    if (this.state.selected !== selected) {
      this.setState({
        selected,
      });
    }
  };

  render() {
    const {
      node: {
        attrs: { text, color, localId },
      },
      intl: { formatMessage },
    } = this.props;
    const { selected } = this.state;
    const statusText = text ? text : formatMessage(messages.placeholder);

    return (
      <Status
        text={statusText}
        color={color}
        localId={localId}
        selected={selected}
        onClick={this.handleClick}
      />
    );
  }

  private handleClick = (event: React.SyntheticEvent<any>) => {
    if (event.nativeEvent.stopImmediatePropagation) {
      event.nativeEvent.stopImmediatePropagation();
    }
    const { state, dispatch } = this.props.view;
    setStatusPickerAt(state.selection.from)(state, dispatch);
  };
}

export default injectIntl(StatusNodeView);
