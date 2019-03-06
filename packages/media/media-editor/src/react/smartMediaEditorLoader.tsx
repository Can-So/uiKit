import * as React from 'react';

import { ModalSpinner } from '@atlaskit/media-ui';
import { colors } from '@atlaskit/theme';
import SmartMediaEditorType, {
  SmartMediaEditorProps,
} from './smartMediaEditor';

interface AsyncSmartMediaEditorState {
  SmartMediaEditor?: typeof SmartMediaEditorType;
}

export default class AsyncSmartMediaEditor extends React.PureComponent<
  SmartMediaEditorProps & AsyncSmartMediaEditorState,
  AsyncSmartMediaEditorState & { isErrored: boolean }
> {
  static displayName = 'AsyncSmartMediaEditor';
  static SmartMediaEditor?: typeof SmartMediaEditorType;

  state = {
    // Set state value to equal to current static value of this class.
    SmartMediaEditor: AsyncSmartMediaEditor.SmartMediaEditor,
    isErrored: false,
  };

  async componentWillMount() {
    if (!this.state.SmartMediaEditor) {
      try {
        const module = await import(/* webpackChunkName:"@atlaskit-internal_smart-media-editor" */
        './smartMediaEditor');
        AsyncSmartMediaEditor.SmartMediaEditor = module.default;
        this.setState({ SmartMediaEditor: module.default });
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.error(e);
        this.setState({ isErrored: true });
      }
    }
  }

  render() {
    const { isErrored } = this.state;

    if (isErrored) {
      return null;
    }
    if (!this.state.SmartMediaEditor) {
      return (
        <ModalSpinner blankedColor={colors.N700A} invertSpinnerColor={true} />
      );
    }

    return <this.state.SmartMediaEditor {...this.props} />;
  }
}
