import * as React from 'react';
import Editor from '../../../editor';
import EditorWithActions from '../../../labs/EditorWithActions';
import ChromeCollapsed from '../../../ui/ChromeCollapsed';

export interface Props {
  placeholder?: string;
  children?: any;
  isExpanded?: boolean;

  onFocus?: (e) => void;
  onExpand?: () => void;
}

export interface State {}

export default class CollapsedEditor extends React.Component<Props, State> {
  editorComponent?: Editor;
  shouldTriggerExpandEvent?: boolean;

  componentWillReceiveProps(nextProps, nextState) {
    if (!this.props.isExpanded && nextProps.isExpanded) {
      this.shouldTriggerExpandEvent = true;
    }
  }

  componentDidUpdate() {
    if (this.shouldTriggerExpandEvent && this.editorComponent) {
      this.shouldTriggerExpandEvent = false;
      if (this.props.onExpand) {
        this.props.onExpand();
      }
    }
  }

  handleEditorRef = (editorRef?: Editor, editorRefCallback?: any) => {
    if (editorRefCallback && typeof editorRefCallback === 'function') {
      editorRefCallback(editorRef);
    }
    this.editorComponent = editorRef;
  };

  render() {
    const child = React.Children.only(this.props.children);
    if (child.type !== Editor && child.type !== EditorWithActions) {
      throw new Error('Expected child to be of type `Editor`');
    }

    if (!this.props.isExpanded) {
      return (
        <ChromeCollapsed
          onFocus={this.props.onFocus}
          text={this.props.placeholder}
        />
      );
    }

    return React.cloneElement(child, {
      ref: editorComponent =>
        this.handleEditorRef(editorComponent, (child as any).ref),
    });
  }
}
