import { name as packageName, version as packageVersion } from '../../version.json';
export var hoveredPayload = {
  action: 'displayed',
  actionSubject: 'tooltip',
  attributes: {
    componentName: 'tooltip',
    packageName: packageName,
    packageVersion: packageVersion
  }
};
export var unhoveredPayload = {
  action: 'hidden',
  actionSubject: 'tooltip',
  attributes: {
    componentName: 'tooltip',
    packageName: packageName,
    packageVersion: packageVersion
  }
};