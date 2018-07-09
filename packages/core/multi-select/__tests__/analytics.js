// @flow
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@atlaskit/analytics-next';
import {
  name as packageName,
  version as packageVersion,
} from '../package.json';
import '../src/components/Stateless';

// This is a global mock for this file that will mock all components wrapped with analytics
// and replace them with an empty SFC that returns null. This includes components imported
// directly in this file and others imported as dependencies of those imports.
jest.mock('@atlaskit/analytics-next', () => ({
  withAnalyticsEvents: jest.fn(() => jest.fn(() => () => null)),
  withAnalyticsContext: jest.fn(() => jest.fn(() => () => null)),
  createAndFireEvent: jest.fn(() => jest.fn(args => args)),
}));

describe('MultiSelectStateless', () => {
  it('should be wrapped with analytics context', () => {
    expect(withAnalyticsContext).toHaveBeenCalledWith({
      componentName: 'multiSelect',
      packageName,
      packageVersion,
    });
  });

  it('should be wrapped with analytics events', () => {
    expect(createAndFireEvent).toHaveBeenCalledWith('atlaskit');
    expect(withAnalyticsEvents).toHaveBeenLastCalledWith({
      onFilterChange: {
        action: 'filtered',
        actionSubject: 'multiSelect',
        attributes: {
          componentName: 'multiSelect',
          packageName,
          packageVersion,
        },
      },
      onNewItemCreated: {
        action: 'created',
        actionSubject: 'multiSelect',
        attributes: {
          componentName: 'multiSelect',
          packageName,
          packageVersion,
        },
      },
      onSelected: {
        action: 'selected',
        actionSubject: 'multiSelect',
        attributes: {
          componentName: 'multiSelect',
          packageName,
          packageVersion,
        },
      },
      onOpenChange: {
        action: 'opened',
        actionSubject: 'multiSelect',
        attributes: {
          componentName: 'multiSelect',
          packageName,
          packageVersion,
        },
      },
    });
  });
});
