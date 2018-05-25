/**
 * Inspired by analytics-web-react
 */

declare namespace merge {

}

import * as last from 'lodash.last';
import * as merge from 'lodash.merge';

import {
  UI_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  OPERATIONAL_EVENT_TYPE,
  GasPayload,
} from '@atlaskit/analytics-gas-types';

import {
  getSources,
  getActionSubject,
  getExtraAttributes,
  getPackageInfo,
  getComponents,
} from './extract-data-from-event';
import { EventNextType } from '../types';

const ATLASKIT_TAG = 'atlaskit';

/**
 * This util exists to convert the Atlaskit event format into the analytics platform format.
 *
 * Atlaskit event format:
 * event {
 *      payload: {
 *          ...attributesFromLowestPointInTheTree
 *      },
 *      context: [{
 *          ...attributesFromHighestPointInTheTree
 *      }, {
 *          ...attributesFromSecondHighestPointInTheTree
 *      }]
 * }
 *
 * Analytics platform event format:
 *  event {
 *      type: @atlaskit/analytics-gas-types.EventType
 *      payload {
 *          ...mandatoryAttributesBasedOnEventType
 *          attributes: {
 *              ...arbitraryAttributes
 *          }
 *      }
 *  }
 */

export default (event: EventNextType): GasPayload | null => {
  const sources = getSources(event);
  const source = last(sources);
  const extraAttributes = getExtraAttributes(event);
  const components = getComponents(event);

  const packages = getPackageInfo(event);
  const { packageName, packageVersion } =
    last(getPackageInfo(event)) || ({} as any);
  const packageHierarchy = packages.map(
    p =>
      p.packageVersion ? `${p.packageName}@${p.packageVersion}` : p.packageName,
  );

  const {
    eventType,
    action,
    actionSubjectId,
    attributes: payloadAttributes,
  } = event.payload;
  const attributes = {
    sourceHierarchy: sources.join('.') || undefined,
    componentHierarchy: components.join('.') || undefined,
    packageHierarchy: packageHierarchy.join(',') || undefined,
    ...{ packageName, packageVersion },
    ...merge(extraAttributes, payloadAttributes),
  };
  // Ensure atlaskit tag is not duplicated by using Set
  const tags: Set<string> = new Set(event.payload.tags || []);
  tags.add(ATLASKIT_TAG);

  if (event.payload) {
    if (eventType === UI_EVENT_TYPE) {
      return {
        eventType: eventType,
        source,
        actionSubject: getActionSubject(event),
        action,
        actionSubjectId: actionSubjectId,
        attributes,
        tags: Array.from(tags),
      } as any;
    }

    if (
      eventType === TRACK_EVENT_TYPE ||
      eventType === OPERATIONAL_EVENT_TYPE ||
      eventType === SCREEN_EVENT_TYPE
    ) {
      // tslint:disable-next-line no-console
      console.error(
        'Track, screen and operational events are currently not supported for atlaskit events',
      );
    }
  }

  return null;
};
