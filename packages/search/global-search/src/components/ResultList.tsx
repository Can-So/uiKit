import * as React from 'react';
import {
  ObjectResult as ObjectResultComponent,
  PersonResult as PersonResultComponent,
  ContainerResult as ContainerResultComponent,
} from '@atlaskit/quick-search';
import { FormattedMessage } from 'react-intl';
import { messages } from '../messages';
import {
  Result,
  ContainerResult,
  JiraResult,
  PersonResult,
  ResultType,
  ConfluenceObjectResult,
  JiraProjectType,
  ContentType,
} from '../model/Result';
import { SelectedIcon } from './styled';
import { getAvatarForConfluenceObjectResult } from '../util/confluence-avatar-util';
import { getDefaultAvatar } from '../util/jira-avatar-util';
import DarkReturn from '../assets/DarkReturn';

export interface Props {
  results: Result[];
  sectionIndex: number;
  analyticsData?: {};
}

const extractAvatarData = (jiraResult: JiraResult) =>
  jiraResult.avatarUrl
    ? { avatarUrl: jiraResult.avatarUrl }
    : {
        avatar: getDefaultAvatar(jiraResult.contentType),
      };

const selectedIcon = (
  <SelectedIcon>
    <DarkReturn />
  </SelectedIcon>
);

const getI18nJiraContainerName = (
  projectType: JiraProjectType,
): JSX.Element | undefined => {
  switch (projectType) {
    case JiraProjectType.Business: {
      return (
        <FormattedMessage {...messages.jira_project_type_business_project} />
      );
    }
    case JiraProjectType.Software: {
      return (
        <FormattedMessage {...messages.jira_project_type_software_project} />
      );
    }
    case JiraProjectType.ServiceDesk: {
      return (
        <FormattedMessage
          {...messages.jira_project_type_service_desk_project}
        />
      );
    }
    case JiraProjectType.Ops: {
      return <FormattedMessage {...messages.jira_project_type_ops_project} />;
    }
  }
};

const getI18nJiraContentType = (
  contentType: ContentType,
): JSX.Element | undefined => {
  switch (contentType) {
    case ContentType.JiraBoard: {
      return <FormattedMessage {...messages.jira_result_type_board} />;
    }
    case ContentType.JiraFilter: {
      return <FormattedMessage {...messages.jira_result_type_filter} />;
    }
  }
  return undefined;
};

export const getUniqueResultId = (result: Result): string =>
  result.key ? result.key : `${result.contentType}-${result.resultId}`;

export default class ResultList extends React.Component<Props> {
  render() {
    const { results, sectionIndex } = this.props;

    return results.map((result, index) => {
      const resultType: ResultType = result.resultType;
      const analyticsData = {
        sectionIndex,
        indexWithinSection: index,
        containerId: result.containerId,
        experimentId: result.experimentId,
        ...this.props.analyticsData,
        contentType: result.contentType,
        resultId: result.resultId,
      };

      // Make sure that key and resultId are unique across all search results
      const uniqueResultId = getUniqueResultId(result);

      switch (resultType) {
        case ResultType.ConfluenceObjectResult: {
          const confluenceResult = result as ConfluenceObjectResult;
          return (
            <ObjectResultComponent
              key={uniqueResultId}
              resultId={uniqueResultId}
              name={confluenceResult.name}
              href={confluenceResult.href}
              type={confluenceResult.analyticsType}
              containerName={confluenceResult.containerName}
              avatar={getAvatarForConfluenceObjectResult(confluenceResult)}
              analyticsData={analyticsData}
              selectedIcon={selectedIcon}
            />
          );
        }
        case ResultType.JiraProjectResult: {
          const jiraResult = result as JiraResult;
          const avatarData = extractAvatarData(jiraResult);

          const containerNameElement = jiraResult.projectType
            ? getI18nJiraContainerName(jiraResult.projectType)
            : null;

          return (
            <ContainerResultComponent
              key={uniqueResultId}
              resultId={uniqueResultId}
              name={jiraResult.name}
              href={jiraResult.href}
              type={jiraResult.analyticsType}
              subText={containerNameElement}
              {...avatarData}
              analyticsData={analyticsData}
              selectedIcon={selectedIcon}
            />
          );
        }
        case ResultType.JiraObjectResult: {
          const jiraResult = result as JiraResult;
          const avatarData = extractAvatarData(jiraResult);

          const objectKey =
            jiraResult.contentType === 'jira-board' ||
            jiraResult.contentType === 'jira-filter'
              ? getI18nJiraContentType(jiraResult.contentType)
              : jiraResult.objectKey;

          return (
            <ObjectResultComponent
              key={uniqueResultId}
              resultId={uniqueResultId}
              name={jiraResult.name}
              href={jiraResult.href}
              type={jiraResult.analyticsType}
              objectKey={objectKey}
              containerName={jiraResult.containerName}
              {...avatarData}
              analyticsData={analyticsData}
              selectedIcon={selectedIcon}
            />
          );
        }
        case ResultType.GenericContainerResult: {
          const containerResult = result as ContainerResult;
          return (
            <ContainerResultComponent
              key={uniqueResultId}
              resultId={uniqueResultId}
              name={containerResult.name}
              href={containerResult.href}
              type={containerResult.analyticsType}
              avatarUrl={containerResult.avatarUrl}
              analyticsData={analyticsData}
              selectedIcon={selectedIcon}
            />
          );
        }
        case ResultType.PersonResult: {
          const personResult = result as PersonResult;

          return (
            <PersonResultComponent
              key={uniqueResultId}
              resultId={uniqueResultId}
              name={personResult.name}
              href={personResult.href}
              type={personResult.analyticsType}
              avatarUrl={personResult.avatarUrl}
              mentionName={personResult.mentionName}
              presenceMessage={personResult.presenceMessage}
              analyticsData={analyticsData}
              selectedIcon={selectedIcon}
              target="_blank"
            />
          );
        }
        default: {
          // Make the TS compiler verify that all enums have been matched
          const _nonExhaustiveMatch: never = resultType;
          throw new Error(
            `Non-exhaustive match for result type: ${_nonExhaustiveMatch}`,
          );
        }
      }
    });
  }
}
