import {
  pickRandom,
  getMockCatchPhrase,
  getMockAbbreviation,
  getMockLastName,
} from './mockData';
import { JiraItem } from '../src/api/types';
import * as uuid from 'uuid/v4';

const issueTypeMap = {
  task: 10001,
  story: 10002,
  bug: 10003,
  epic: 10004,
};

const randomIssueKey = () => {
  const keys = ['ETH', 'XRP', 'ADA', 'TRON', 'DOGE'];
  return pickRandom(keys) + '-' + Math.floor(Math.random() * 1000);
};

const getIssueTypeId = name => issueTypeMap[name];
const getIssueAvatar = issueType =>
  `https://product-fabric.atlassian.net/images/icons/issuetypes/${issueType}.svg`;
const getIssueUrl = key => `https://product-fabric.atlassian.net/browse/${key}`;
const getProjectUrl = porjectKey =>
  `https://product-fabric.atlassian.net/browse/${porjectKey}`;
const getFilterUrl = () =>
  `https://product-fabric.atlassian.net/browse/filter=${Math.floor(
    (Math.random() * -10) % 5,
  )}`;

const randomIconUrl = () =>
  `https://placeimg.com/64/64/arch?bustCache=${Math.random()}`;

const getRandomIssueType = () => pickRandom(['task', 'story', 'bug', 'epic']);

export const generateRandomJiraIssue = (): JiraItem => {
  const issueTypeName = getRandomIssueType();
  const key = randomIssueKey();
  return {
    id: uuid(),
    name: getMockCatchPhrase(),
    url: getIssueUrl(key),
    attributes: {
      '@type': 'issue',
      containerId: uuid(),
      key,
      issueTypeName,
      issueTypeId: getIssueTypeId(issueTypeName),
      avatar: {
        url: getIssueAvatar(issueTypeName),
      },
    },
  };
};

export const generateRandomJiraProject = (): JiraItem => {
  const key = getMockAbbreviation();
  return {
    id: uuid(),
    name: getMockCatchPhrase(),
    url: getProjectUrl(key),
    attributes: {
      '@type': 'project',
      projectType: pickRandom([
        'Software project',
        'Core projects',
        'Servicedesk project',
      ]),
      avatar: {
        url: randomIconUrl(),
      },
    },
  };
};

export const generateRandomJiraBoard = (): JiraItem => {
  const key = getMockAbbreviation();
  return {
    id: uuid(),
    name: getMockCatchPhrase(),
    url: getProjectUrl(key),
    attributes: {
      '@type': 'board',
      containerId: uuid(),
      containerName: key,
      avatar: {
        url: randomIconUrl(),
      },
    },
  };
};

export const generateRandomJiraFilter = (): JiraItem => {
  return {
    id: uuid(),
    name: getMockCatchPhrase(),
    url: getFilterUrl(),
    attributes: {
      '@type': 'filter',
      ownerId: uuid(),
      ownerName: getMockLastName(),
      avatar: {
        url: randomIconUrl(),
      },
    },
  };
};

export const generateRandomIssueV1 = (): JiraItem => ({
  key: randomIssueKey(),
  fields: {
    summary: getMockCatchPhrase(),
    project: {
      name: getMockAbbreviation(),
    },
    issuetype: {
      iconUrl: getIssueAvatar(getRandomIssueType()),
    },
  },
});
