import * as React from 'react';
import * as PropTypes from 'prop-types';
import EditorActions from '../../actions';

export type EditorContextProps = { editorActions?: EditorActions };

export default class EditorContext extends React.Component<
  EditorContextProps,
  {}
> {
  static childContextTypes = {
    editorActions: PropTypes.object,
  };

  private editorActions: EditorActions;

  constructor(props: EditorContextProps) {
    super(props);
    this.editorActions = props.editorActions || new EditorActions();
  }

  getChildContext() {
    return {
      editorActions: this.editorActions,
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
