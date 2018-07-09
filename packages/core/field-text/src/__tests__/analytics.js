// @flow
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@atlaskit/analytics-next';
import {
  name as packageName,
  version as packageVersion,
} from '../../package.json';
import '../FieldTextStateless';

// This is a global mock for this file that will mock all components wrapped with analytics
// and replace them with an empty SFC that returns null. This includes components imported
// directly in this file and others imported as dependencies of those imports.
jest.mock('@atlaskit/analytics-next', () => ({
  withAnalyticsEvents: jest.fn(() => jest.fn(() => () => null)),
  withAnalyticsContext: jest.fn(() => jest.fn(() => () => null)),
  createAndFireEvent: jest.fn(() => jest.fn(args => args)),
}));

describe('FieldTextStateless', () => {
  it('should be wrapped with analytics context', () => {
    expect(withAnalyticsContext).toHaveBeenCalledWith({
      componentName: 'fieldText',
      packageName,
      packageVersion,
    });
  });

  it('should be wrapped with analytics events', () => {
    expect(createAndFireEvent).toHaveBeenCalledWith('atlaskit');
    expect(withAnalyticsEvents).toHaveBeenLastCalledWith({
      onBlur: {
        action: 'blurred',
        actionSubject: 'fieldText',
        attributes: {
          componentName: 'fieldText',
          type: 'text',
          packageName,
          packageVersion,
        },
      },
      onChange: {
        action: 'changed',
        actionSubject: 'fieldText',
        attributes: {
          componentName: 'fieldText',
          type: 'text',
          packageName,
          packageVersion,
        },
      },
      onFocus: {
        action: 'focused',
        actionSubject: 'fieldText',
        attributes: {
          componentName: 'fieldText',
          type: 'text',
          packageName,
          packageVersion,
        },
      },
      onKeyDown: {
        action: 'keyDowned',
        actionSubject: 'fieldText',
        attributes: {
          componentName: 'fieldText',
          type: 'text',
          packageName,
          packageVersion,
        },
      },
      onKeyPress: {
        action: 'keyPressed',
        actionSubject: 'fieldText',
        attributes: {
          componentName: 'fieldText',
          type: 'text',
          packageName,
          packageVersion,
        },
      },
      onKeyUp: {
        action: 'keyUpped',
        actionSubject: 'fieldText',
        attributes: {
          componentName: 'fieldText',
          type: 'text',
          packageName,
          packageVersion,
        },
      },
    });
  });
});
