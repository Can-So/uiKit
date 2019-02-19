import { mount } from 'enzyme';
import * as React from 'react';
import { IntlProvider, FormattedRelative } from 'react-intl';

import {
  buildRepositoryLink,
  buildRepositoryTitle,
  buildRepositoryDescription,
  buildRepositoryByline,
  setRepositoryContext,
  setRepositoryDetails,
} from '../../extractPropsFromSourceCodeRepository';

describe('extractPropsFromSourceCodeRepository', () => {
  describe('buildRepositoryLink', () => {
    it('should return empty link for empty url', () => {
      expect(buildRepositoryLink({})).toEqual({});
    });
    it('should return link key for non-empty url', () => {
      expect(buildRepositoryLink({ url: 'http://some/url' })).toEqual({
        link: 'http://some/url',
      });
    });
  });

  describe('buildRepositoryTitle', () => {
    it('should return empty title for empty name', () => {
      expect(buildRepositoryTitle({})).toEqual({});
    });
    it('should return title key for non-empty title', () => {
      expect(buildRepositoryTitle({ name: 'some-name' })).toEqual({
        title: { text: 'some-name' },
      });
    });
  });

  describe('buildRepositoryDescription', () => {
    it('should return empty description for empty summary', () => {
      expect(buildRepositoryDescription({})).toEqual({});
    });
    it('should return description key for non-empty summary', () => {
      expect(buildRepositoryDescription({ summary: 'some-summary' })).toEqual({
        description: { text: 'some-summary' },
      });
    });
  });

  describe('buildRepositoryByline', () => {
    it('should return empty when no dates supplied', () => {
      expect(buildRepositoryByline({})).toEqual({});
    });
    it('should return byline with last updated info when updatedBy information available', () => {
      const bylineProps = buildRepositoryByline({
        updated: '2018-01-23T15:08:40.834Z',
        'atlassian:updatedBy': {
          '@type': 'Person',
          image: 'some-image',
          name: 'some-user',
        },
      });
      expect(bylineProps).toHaveProperty('byline');

      const bylineComponent = bylineProps.byline as React.ReactElement<any>;
      const bylineWrapper = mount(
        <IntlProvider locale="en">{bylineComponent}</IntlProvider>,
      );
      expect(bylineWrapper.find(FormattedRelative).prop('value')).toEqual(
        '2018-01-23T15:08:40.834Z',
      );
      expect(bylineWrapper.text()).toContain('Updated by some-user');
    });
    it('should return byline with created info when updatedBy information not available', () => {
      const bylineProps = buildRepositoryByline({
        'schema:dateCreated': '2018-01-21T15:08:40.834Z',
        attributedTo: {
          '@type': 'Person',
          image: 'some-image',
          name: 'some-user-creator',
        },
        updated: '2018-01-23T15:08:40.834Z',
      });
      expect(bylineProps).toHaveProperty('byline');

      const bylineComponent = bylineProps.byline as React.ReactElement<any>;
      const bylineWrapper = mount(
        <IntlProvider locale="en">{bylineComponent}</IntlProvider>,
      );
      expect(bylineWrapper.find(FormattedRelative).prop('value')).toEqual(
        '2018-01-21T15:08:40.834Z',
      );
      expect(bylineWrapper.text()).toContain('Created by some-user-creator');
    });
  });

  describe('setRepositoryContext', () => {
    it('should return unchanged when not provided input', () => {
      const props = { context: { text: 'hello' } };
      expect(setRepositoryContext(props, {})).toEqual(props);
    });
    it('should return unchanged when provided context in props, and not given generator or context details', () => {
      expect(
        setRepositoryContext(
          {
            context: {
              text: 'some-text',
            },
          },
          {
            context: {
              name: 'some-context',
            },
          },
        ),
      ).toEqual({
        context: {
          text: 'some-text',
        },
      });
    });
    it('should set context when provided with it in props, and given generator + context details', () => {
      expect(
        setRepositoryContext(
          {
            context: {
              text: 'some-text',
            },
          },
          {
            generator: {
              name: 'some-generator',
            },
            context: {
              name: 'some-context',
            },
          },
        ),
      ).toEqual({
        context: {
          text: 'some-generator / some-context',
        },
      });
    });
  });

  describe('setRepositoryDetails', () => {
    it('should return unchanged when not provided input', () => {
      const props = { context: { text: 'hello' } };
      expect(setRepositoryDetails(props, {})).toEqual(props);
    });
    it('should set details when programmingLanguage provided', () => {
      const props = setRepositoryDetails(
        {},
        { 'schema:programmingLanguage': 'JavaScript' },
      );
      expect(props).toHaveProperty('details');
      expect(props.details).toEqual([
        { title: 'Language', text: 'JavaScript' },
      ]);
    });
    it('should set details when subscriberCount provided', () => {
      const props = setRepositoryDetails(
        {},
        { 'atlassian:subscriberCount': '2000' },
      );
      expect(props).toHaveProperty('details');
      expect(props.details).toEqual([{ title: 'Subscribers', text: '2000' }]);
    });
  });
});
