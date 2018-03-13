import * as React from 'react';
import styled from 'styled-components';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import {
  akColorN40,
  akColorN800,
  akColorN30A,
  akColorR50,
  akColorR75,
  akColorR500,
  akBorderRadius,
  akColorB200,
} from '@atlaskit/util-shared-styles';
import {
  timestampToString,
  timestampToTaskContext,
  isPastDate,
} from '@atlaskit/editor-common';
import { selectElement } from '../actions';

const Overlay = styled.div`
  background: transparent;
  border-radius: ${akBorderRadius};
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const DateNode = styled.span`
  background: ${akColorN30A};
  border-radius: ${akBorderRadius};
  color: ${akColorN800};
  padding: 2px 4px;
  margin: 0 1px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: ${akColorN40};
  }
  .ProseMirror-selectednode & > div {
    border: 2px solid ${akColorB200};
  }
  &.past-due {
    background: ${akColorR50};
    color: ${akColorR500};

    &:hover {
      background: ${akColorR75};
    }
  }
`;

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
}

export default class DateNodeView extends React.Component<Props, any> {
  render() {
    const { attrs: { timestamp } } = this.props.node;
    const { view: { state: { schema, selection } } } = this.props;
    const withinTask = selection.$from.parent.type === schema.nodes.taskItem;

    return (
      <DateNode
        onClick={this.handleClick}
        className={withinTask && isPastDate(timestamp) ? 'past-due' : ''}
      >
        <Overlay />
        {withinTask
          ? timestampToTaskContext(timestamp)
          : timestampToString(timestamp)}
      </DateNode>
    );
  }

  private handleClick = (event: React.SyntheticEvent<any>) => {
    const { state, dispatch } = this.props.view;
    selectElement(event.currentTarget.parentElement)(state, dispatch);
  };
}
