import * as React from 'react';
// @ts-ignore
import { AtlaskitThemeProvider } from '@atlaskit/theme';
import DecisionItem from '../src/components/DecisionItem';
import {
  MessageContainer,
  SidebarContainer,
  dumpRef,
  getParticipants,
} from '../example-helpers/story-utils';

export default () => (
  <AtlaskitThemeProvider mode={'dark'}>
    <h3>Simple DecisionItem</h3>
    <DecisionItem contentRef={dumpRef}>
      Hello <b>world</b>.
    </DecisionItem>

    <h3>Long DecisionItem</h3>
    <DecisionItem contentRef={dumpRef}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </DecisionItem>

    <h3>Simple DecisionItem with placeholder</h3>
    <DecisionItem contentRef={dumpRef} showPlaceholder={true} />

    <h3>
      Simple DecisionItem with 1 participant, inline (shouldn't render
      participants)
    </h3>
    <MessageContainer>
      <DecisionItem
        contentRef={dumpRef}
        participants={getParticipants(1)}
        appearance="inline"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </DecisionItem>
    </MessageContainer>

    <h3>Simple DecisionItem with no participants</h3>
    <SidebarContainer>
      <DecisionItem contentRef={dumpRef} appearance="card">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </DecisionItem>
    </SidebarContainer>

    <h3>Simple DecisionItem with 1 participant</h3>
    <SidebarContainer>
      <DecisionItem
        contentRef={dumpRef}
        participants={getParticipants(1)}
        appearance="card"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </DecisionItem>
    </SidebarContainer>

    <h3>Simple DecisionItem with 2 participant</h3>
    <SidebarContainer>
      <DecisionItem
        contentRef={dumpRef}
        participants={getParticipants(2)}
        appearance="card"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </DecisionItem>
    </SidebarContainer>

    <h3>Simple DecisionItem with 3 participants</h3>
    <SidebarContainer>
      <DecisionItem
        contentRef={dumpRef}
        participants={getParticipants(3)}
        appearance="card"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </DecisionItem>
    </SidebarContainer>

    <h3>Simple DecisionItem with 4 participants</h3>
    <SidebarContainer>
      <DecisionItem
        contentRef={dumpRef}
        participants={getParticipants(4)}
        appearance="card"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </DecisionItem>
    </SidebarContainer>

    <h3>Simple DecisionItem with 5 participants</h3>
    <SidebarContainer>
      <DecisionItem
        contentRef={dumpRef}
        participants={getParticipants(5)}
        appearance="card"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </DecisionItem>
    </SidebarContainer>
  </AtlaskitThemeProvider>
);
