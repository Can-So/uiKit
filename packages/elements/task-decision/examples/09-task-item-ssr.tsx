import * as React from 'react';
import TaskItem from '../src/components/TaskItem';
import {
  MessageContainer,
  SidebarContainer,
  dumpRef,
  action,
  getParticipants,
} from '../example-helpers/story-utils';

export default () => (
  <div>
    <h3>Simple TaskItem</h3>
    <MessageContainer>
      <TaskItem
        taskId="task-1"
        contentRef={dumpRef}
        onChange={action('onChange')}
      >
        Hello <b>world</b>.
      </TaskItem>
    </MessageContainer>

    <h3>Long TaskItem</h3>
    <MessageContainer>
      <TaskItem taskId="task-1" contentRef={dumpRef}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </TaskItem>
    </MessageContainer>

    <h3>Simple Completed TaskItem </h3>
    <MessageContainer>
      <TaskItem
        taskId="task-2"
        isDone={true}
        contentRef={dumpRef}
        onChange={action('onChange')}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </TaskItem>
    </MessageContainer>

    <h3>Simple TaskItem with placeholder</h3>
    <MessageContainer>
      <TaskItem
        taskId="task-1"
        contentRef={dumpRef}
        onChange={action('onChange')}
        showPlaceholder={true}
      />
    </MessageContainer>

    <h3>
      Simple TaskItem with 1 participant, inline (shouldn\'t render
      participants)
    </h3>
    <MessageContainer>
      <TaskItem
        taskId="task-3"
        contentRef={dumpRef}
        onChange={action('onChange')}
        participants={getParticipants(1)}
        appearance="inline"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </TaskItem>
    </MessageContainer>

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

    <h3>Simple TaskItem with 2 participant</h3>
    <SidebarContainer>
      <TaskItem
        taskId="task-3"
        contentRef={dumpRef}
        onChange={action('onChange')}
        participants={getParticipants(2)}
        appearance="card"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </TaskItem>
    </SidebarContainer>

    <h3>Simple TaskItem with 3 participants</h3>
    <SidebarContainer>
      <TaskItem
        taskId="task-3"
        contentRef={dumpRef}
        onChange={action('onChange')}
        participants={getParticipants(3)}
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
