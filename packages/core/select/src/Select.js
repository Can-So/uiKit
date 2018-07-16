// @flow

import Select from 'react-select';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@atlaskit/analytics-next';
import {
  name as packageName,
  version as packageVersion,
} from '../package.json';
import createSelect from './createSelect';

export const SelectWithoutAnalytics = createSelect(Select);
const createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

export default withAnalyticsContext({
  componentName: 'select',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onChange: createAndFireEventOnAtlaskit({
      action: 'selected',
      actionSubject: 'item',

      attributes: {
        componentName: 'select',
        packageName,
        packageVersion,
      },
    }),
  })(SelectWithoutAnalytics),
);
