import * as React from 'react';
import DecisionList from '../src/components/DecisionList';
import DecisionItem from '../src/components/DecisionItem';
import { MessageContainer, dumpRef } from '../example-helpers/story-utils';

export default () => (
  <div>
    <h3>Simple DecisionList</h3>
    <MessageContainer>
      <DecisionList>
        <DecisionItem contentRef={dumpRef}>
          Hello <b>world</b>.
        </DecisionItem>
        <DecisionItem contentRef={dumpRef}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </DecisionItem>
        <DecisionItem contentRef={dumpRef}>
          Hello <b>world</b>.
        </DecisionItem>
        <DecisionItem contentRef={dumpRef}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </DecisionItem>
      </DecisionList>
    </MessageContainer>

    <h3>Single item DecisionList</h3>
    <MessageContainer>
      <DecisionList>
        <DecisionItem contentRef={dumpRef}>
          Hello <b>world</b>.
        </DecisionItem>
      </DecisionList>
    </MessageContainer>

    <h3>Empty DecisionList</h3>
    <MessageContainer>
      <DecisionList />
    </MessageContainer>
  </div>
);
