import * as React from 'react';
import DecisionItem from '../../../../components/DecisionItem';
import {
  SidebarContainer,
  dumpRef,
  getParticipants,
} from '../../../../../example-helpers/story-utils';

export default () => (
  <div>
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
  </div>
);
