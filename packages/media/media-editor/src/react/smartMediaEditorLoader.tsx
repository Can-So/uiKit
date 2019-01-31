import * as React from 'react';

import Loader from './loadingView';
import SmartMediaEditorType, {
  SmartMediaEditorProps,
} from './smartMediaEditor';

interface AsyncSmartMediaEditorState {
  SmartMediaEditor?: typeof SmartMediaEditorType;
}

export default class AsyncSmartMediaEditor extends React.PureComponent<
  SmartMediaEditorProps & AsyncSmartMediaEditorState,
  AsyncSmartMediaEditorState
> {
  static displayName = 'AsyncSmartMediaEditor';
  static SmartMediaEditor?: typeof SmartMediaEditorType;

  state = {
    // Set state value to equal to current static value of this class.
    SmartMediaEditor: AsyncSmartMediaEditor.SmartMediaEditor,
  };

  componentWillMount() {
    if (!this.state.SmartMediaEditor) {
      import(/* webpackChunkName:"@atlaskit-internal_smart-media-editor" */
      './smartMediaEditor').then(module => {
        AsyncSmartMediaEditor.SmartMediaEditor = module.default;
        this.setState({ SmartMediaEditor: module.default });
      });
    }
  }

  render() {
    if (!this.state.SmartMediaEditor) {
      return <Loader />;
    }

    return <this.state.SmartMediaEditor {...this.props} />;
  }
}
