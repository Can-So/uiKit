// @flow
import {
  withAnalyticsEvents,
  withAnalyticsContext,
} from '@atlaskit/analytics-next';
import {
  name as packageName,
  version as packageVersion,
} from '../../../package.json';
import '../Tooltip';

// This is a global mock for this file that will mock all components wrapped with analytics
// and replace them with an empty SFC that returns null. This includes components imported
// directly in this file and others imported as dependencies of those imports.
jest.mock('@atlaskit/analytics-next', () => ({
  withAnalyticsEvents: jest.fn(() => jest.fn(() => () => null)),
  withAnalyticsContext: jest.fn(() => jest.fn(() => () => null)),
  createAndFireEvent: jest.fn(() => jest.fn(args => args)),
}));

describe('Tooltip', () => {
  it('should be wrapped with analytics context', () => {
    expect(withAnalyticsContext).toHaveBeenCalledWith({
      componentName: 'tooltip',
      packageName,
      packageVersion,
    });
  });

  it('should be wrapped with analytics events', () => {
    expect(withAnalyticsEvents).toHaveBeenLastCalledWith({
      onMouseOver: {
        action: 'hovered',
        actionSubject: 'tooltip',
        attributes: {
          componentName: 'tooltip',
          packageName,
          packageVersion,
        },
      },
      onMouseOut: {
        action: 'unhovered',
        actionSubject: 'tooltip',
        attributes: {
          componentName: 'tooltip',
          packageName,
          packageVersion,
        },
      },
    });
  });
});
