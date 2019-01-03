import * as React from 'react';
import { PureComponent } from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import styled from 'styled-components';
import { ProviderFactory } from '@atlaskit/editor-common';
import { ReactNodeViewState } from '../../../plugins/base/pm-plugins/react-nodeview';
import { setNodeSelection } from '../../../utils';
import {
  ProsemirrorGetPosHandler,
  ReactComponentConstructor,
} from '../../types';
import { ReactNodeViewComponents } from '../';

interface Props {
  components: ReactNodeViewComponents;
  getPos: ProsemirrorGetPosHandler;
  node: PMNode;
  pluginState: ReactNodeViewState;
  providerFactory: ProviderFactory;
  view: EditorView;
}

const Wrapper = styled.div`
  width: 100%;
`;
Wrapper.displayName = 'WrapperClickArea';

interface State {
  selected: boolean;
}

// tslint:disable-next-line:variable-name
export default function wrapComponentWithClickArea(
  ReactComponent: ReactComponentConstructor,
): ReactComponentConstructor {
  return class WrapperClickArea extends PureComponent<Props, State> {
    state: State = { selected: false };

    componentDidMount() {
      const { pluginState } = this.props;
      pluginState.subscribe(this.handleDocumentSelectionChange);
    }

    componentWillUnmount() {
      const { pluginState } = this.props;
      pluginState.unsubscribe(this.handleDocumentSelectionChange);
    }

    render() {
      return (
        <Wrapper onClick={this.onClick}>
          <ReactComponent {...this.props} selected={this.state.selected} />
        </Wrapper>
      );
    }

    private handleDocumentSelectionChange = (
      anchorPos: number,
      headPos: number,
    ) => {
      const { getPos } = this.props;
      const nodePos = getPos();

      this.setState({
        selected: nodePos >= anchorPos && nodePos < headPos,
      });
    };

    private onClick = () => {
      const { getPos, view } = this.props;
      setNodeSelection(view, getPos());
    };
  };
}
