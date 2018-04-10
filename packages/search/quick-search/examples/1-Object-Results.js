// @flow
import React, { Component } from 'react';
import { randomJiraIconUrl, randomConfluenceIconUrl } from './utils/mockData';
import { ObjectResult, ResultItemGroup } from '../src';

const defaultProps = {
  resultId: 'result_id',
};

export default class extends Component<*> {
  render() {
    return (
      <div>
        <h3>Objects</h3>
        <p>
          Like containers, objects have square avatars and a name and can be
          marked as private, however, instead of a free subText field, they
          display the name of their containing entity. They can optionally
          display an object key.
        </p>

        <ResultItemGroup title="Object examples">
          <ObjectResult
            {...defaultProps}
            name="quick-search is too hilarious!"
            avatarUrl={randomJiraIconUrl()}
            objectKey="AK-007"
            containerName="Search'n'Smarts"
          />
          <ObjectResult
            {...defaultProps}
            avatarUrl={randomConfluenceIconUrl()}
            name="Yeah, I cut my dev loop in half, but you'll never guess what happened next!"
            containerName="Buzzfluence"
          />
          <ObjectResult
            {...defaultProps}
            avatarUrl={randomConfluenceIconUrl()}
            name="Prank schedule: April 2017"
            containerName="The Scream Team"
            isPrivate
          />
        </ResultItemGroup>
      </div>
    );
  }
}
