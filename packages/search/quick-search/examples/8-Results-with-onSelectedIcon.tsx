import * as React from 'react';
import Avatar from '@atlaskit/avatar';
import { randomJiraIconUrl, randomConfluenceIconUrl } from './utils/mockData';
import {
  ObjectResult,
  ContainerResult,
  PersonResult,
  ResultItemGroup,
} from '../src';

const defaultProps = {
  resultId: 'result_id',
};

export default class extends React.Component {
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
          <ContainerResult
            {...defaultProps}
            avatarUrl={getContainerAvatarUrl(3)}
            name="Cargo boxes"
            subText="They're big!"
          />
          <ContainerResult
            {...defaultProps}
            isPrivate
            name="Private container"
          />
          <PersonResult
            {...defaultProps}
            avatar={dummyAvatarComponent}
            mentionName="TheAvatarGod"
            mentionPrefix="#"
            name="David Soundararaj"
            presenceMessage="@dteen"
            presenceState="online"
          />
          <PersonResult
            {...defaultProps}
            key="4"
            name="Minimum detail person"
          />
        </ResultItemGroup>
      </div>
    );
  }
}
