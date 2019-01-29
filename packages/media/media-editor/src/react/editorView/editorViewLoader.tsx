import * as React from 'react';
import Loader from '../loader';
import EditorViewType, { EditorViewProps } from './editorView';

interface AsyncEditorViewState {
  EditorView?: typeof EditorViewType;
}

export default class AsyncEditorView extends React.PureComponent<
  EditorViewProps & AsyncEditorViewState,
  AsyncEditorViewState
> {
  static displayName = 'AsyncCard';
  static EditorView?: typeof EditorViewType;

  state = {
    // Set state value to equal to current static value of this class.
    EditorView: AsyncEditorView.EditorView,
  };

  componentWillMount() {
    if (!this.state.EditorView) {
      import(/* webpackChunkName:"@atlaskit-internal_EditorView" */
      './editorView').then(module => {
        AsyncEditorView.EditorView = module.default;
        this.setState({ EditorView: module.default });
      });
    }
  }

  render() {
    if (!this.state.EditorView) {
      return <Loader />;
    }

    return <this.state.EditorView {...this.props} />;
  }
}
