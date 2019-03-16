import Select from 'react-select';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@atlaskit/analytics-next';
import { name as packageName, version as packageVersion } from './version.json';
import createSelect from './createSelect';
export var SelectWithoutAnalytics = createSelect(Select);
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'select',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onChange: createAndFireEventOnAtlaskit({
    action: 'changed',
    actionSubject: 'option',
    attributes: {
      componentName: 'select',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(SelectWithoutAnalytics));