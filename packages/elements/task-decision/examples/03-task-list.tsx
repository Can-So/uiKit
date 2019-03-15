import * as React from 'react';
import { ReactRenderer as Renderer } from '@atlaskit/renderer';
import TaskList from '../src/components/TaskList';
import TaskItem from '../src/components/TaskItem';
import {
  MessageContainer,
  dumpRef,
  document,
  TaskStateManager,
} from '../example-helpers/story-utils';

export default () => (
  <div>
    <h3>Simple TaskList</h3>
    <TaskStateManager
      render={(taskStates, onChangeListener) => (
        <TaskList>
          <TaskItem
            contentRef={dumpRef}
            taskId="task-1"
            onChange={onChangeListener}
            isDone={taskStates.get('task-1')}
          >
            Hello <b>world</b>.
          </TaskItem>
          <TaskItem
            contentRef={dumpRef}
            taskId="task-2"
            onChange={onChangeListener}
            isDone={taskStates.get('task-2')}
          >
            <Renderer document={document} />
          </TaskItem>
          <TaskItem
            contentRef={dumpRef}
            taskId="task-3"
            onChange={onChangeListener}
            isDone={taskStates.get('task-3')}
          >
            Hello <b>world</b>.
          </TaskItem>
          <TaskItem
            contentRef={dumpRef}
            taskId="task-4"
            onChange={onChangeListener}
            isDone={taskStates.get('task-4')}
          >
            <Renderer document={document} />
          </TaskItem>
        </TaskList>
      )}
    />
    <h3>Single item TaskList</h3>
    <TaskStateManager
      render={(taskStates, onChangeListener) => (
        <TaskList>
          <TaskItem
            contentRef={dumpRef}
            taskId="task-5"
            onChange={onChangeListener}
            isDone={taskStates.get('task-5')}
          >
            Hello <b>world</b>.
          </TaskItem>
        </TaskList>
      )}
    />

    <h3>Empty TaskList</h3>
    <MessageContainer>
      <TaskList />
    </MessageContainer>
  </div>
);
