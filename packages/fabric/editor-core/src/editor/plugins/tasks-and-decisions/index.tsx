import * as React from 'react';
import {
  decisionItem,
  decisionList,
  taskItem,
  taskList,
} from '@atlaskit/editor-common';
import styled from 'styled-components';
import { EditorPlugin } from '../../types';
import { createPlugin } from '../../../plugins/tasks-and-decisions';
import pastePlugin from '../../../plugins/tasks-and-decisions/paste-plugin';
import inputRulePlugin from '../../../plugins/tasks-and-decisions/input-rules';
import keymap from '../../../plugins/tasks-and-decisions/keymaps';
import ToolbarDecision from '../../../ui/ToolbarDecision';
import ToolbarTask from '../../../ui/ToolbarTask';

// tslint:disable-next-line:variable-name
const TaskDecisionToolbarGroup = styled.div`
  display: flex;
`;

const tasksAndDecisionsPlugin: EditorPlugin = {
  nodes() {
    return [
      { name: 'decisionList', node: decisionList, rank: 1800 },
      { name: 'decisionItem', node: decisionItem, rank: 1900 },
      { name: 'taskList', node: taskList, rank: 2000 },
      { name: 'taskItem', node: taskItem, rank: 2100 },
    ];
  },

  pmPlugins() {
    return [
      { rank: 50, plugin: () => pastePlugin() }, // must before default paste plugin
      {
        rank: 500,
        plugin: ({ schema, props, dispatch, providerFactory }) => {
          const { delegateAnalyticsEvent } = props;
          return createPlugin({ delegateAnalyticsEvent }, providerFactory);
        },
      },
      { rank: 510, plugin: ({ schema }) => inputRulePlugin(schema) },
      { rank: 9800, plugin: ({ schema }) => keymap(schema) }, // Needs to be after "save-on-enter"
    ];
  },

  secondaryToolbarComponent(editorView) {
    return (
      <TaskDecisionToolbarGroup>
        <ToolbarDecision editorView={editorView} />
        <ToolbarTask editorView={editorView} />
      </TaskDecisionToolbarGroup>
    );
  },
};

export default tasksAndDecisionsPlugin;
