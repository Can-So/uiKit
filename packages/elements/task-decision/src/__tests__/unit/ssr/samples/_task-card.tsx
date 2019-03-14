import * as React from 'react';
import TaskItem from '../../../../components/TaskItem';
import {
  SidebarContainer,
  dumpRef,
  action,
  getParticipants,
} from '../../../../../example-helpers/story-utils';

export default () => (
  <div>
    <h3>Simple TaskItem with no participants</h3>
    <SidebarContainer>
      <TaskItem
        taskId="task-3"
        contentRef={dumpRef}
        onChange={action('onChange')}
        appearance="card"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </TaskItem>
    </SidebarContainer>

    <h3>Simple TaskItem with 1 participant</h3>
    <SidebarContainer>
      <TaskItem
        taskId="task-3"
        contentRef={dumpRef}
        onChange={action('onChange')}
        participants={getParticipants(1)}
        appearance="card"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </TaskItem>
    </SidebarContainer>

    <h3>Simple TaskItem with 4 participants</h3>
    <SidebarContainer>
      <TaskItem
        taskId="task-3"
        contentRef={dumpRef}
        onChange={action('onChange')}
        participants={getParticipants(4)}
        appearance="card"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </TaskItem>
    </SidebarContainer>

    <h3>Simple TaskItem with 5 participants</h3>
    <SidebarContainer>
      <TaskItem
        taskId="task-3"
        contentRef={dumpRef}
        onChange={action('onChange')}
        participants={getParticipants(5)}
        appearance="card"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </TaskItem>
    </SidebarContainer>
  </div>
);
