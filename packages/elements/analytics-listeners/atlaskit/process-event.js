/**
 * Inspired by analytics-web-react
 */
import * as tslib_1 from "tslib";
import * as last from 'lodash.last';
import * as merge from 'lodash.merge';
import { DEFAULT_SOURCE, UI_EVENT_TYPE, SCREEN_EVENT_TYPE, TRACK_EVENT_TYPE, OPERATIONAL_EVENT_TYPE, } from '@atlaskit/analytics-gas-types';
import { getSources, getActionSubject, getExtraAttributes, getPackageInfo, getComponents, } from './extract-data-from-event';
import { version as listenerVersion } from '../version.json';
var ATLASKIT_TAG = 'atlaskit';
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
export default (function (event, logger) {
    var sources = getSources(event);
    var source = last(sources) || DEFAULT_SOURCE;
    var extraAttributes = getExtraAttributes(event);
    var components = getComponents(event);
    var packages = getPackageInfo(event);
    var _a = last(getPackageInfo(event)) || {}, packageName = _a.packageName, packageVersion = _a.packageVersion;
    var packageHierarchy = packages.map(function (p) {
        return p.packageVersion ? p.packageName + "@" + p.packageVersion : p.packageName;
    });
    var _b = event.payload, _c = _b.eventType, eventType = _c === void 0 ? UI_EVENT_TYPE : _c, action = _b.action, actionSubjectId = _b.actionSubjectId, payloadAttributes = _b.attributes;
    var attributes = tslib_1.__assign({ listenerVersion: listenerVersion, sourceHierarchy: sources.join('.') || undefined, componentHierarchy: components.join('.') || undefined, packageHierarchy: packageHierarchy.join(',') || undefined }, { packageName: packageName, packageVersion: packageVersion }, merge(extraAttributes, payloadAttributes));
    // Ensure atlaskit tag is not duplicated by using Set
    var tags = new Set(event.payload.tags || []);
    tags.add(ATLASKIT_TAG);
    if (event.payload) {
        if (eventType === UI_EVENT_TYPE) {
            return {
                eventType: eventType,
                source: source,
                actionSubject: getActionSubject(event),
                action: action,
                actionSubjectId: actionSubjectId,
                attributes: attributes,
                tags: Array.from(tags),
            };
        }
        if (eventType === TRACK_EVENT_TYPE ||
            eventType === OPERATIONAL_EVENT_TYPE ||
            eventType === SCREEN_EVENT_TYPE) {
            logger.error('Track, screen and operational events are currently not supported for atlaskit events');
        }
        else {
            logger.error('Invalid event type', eventType);
        }
    }
    return null;
});
//# sourceMappingURL=process-event.js.map