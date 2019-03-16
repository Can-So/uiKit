/**
 * Inspired by analytics-web-react
 */
import * as tslib_1 from "tslib";
import * as last from 'lodash.last';
import * as merge from 'lodash.merge';
import { DEFAULT_SOURCE, UI_EVENT_TYPE, SCREEN_EVENT_TYPE, TRACK_EVENT_TYPE, OPERATIONAL_EVENT_TYPE, } from '@atlaskit/analytics-gas-types';
import { getSources, getExtraAttributes, getPackageInfo, getComponents, } from './extract-data-from-event';
import { version as listenerVersion } from '../version.json';
var NAVIGATION_TAG = 'navigation';
/**
 * This util exists to convert the analytics-next event format into the analytics platform format.
 *
 * Analytics-next event format:
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
    var _b = event.payload, _c = _b.eventType, eventType = _c === void 0 ? UI_EVENT_TYPE : _c, action = _b.action, actionSubject = _b.actionSubject, actionSubjectId = _b.actionSubjectId, payloadAttributes = _b.attributes, name = _b.name;
    var attributes = tslib_1.__assign({ listenerVersion: listenerVersion, sourceHierarchy: sources.join('.') || undefined, componentHierarchy: components.join('.') || undefined, packageHierarchy: packageHierarchy.join(',') || undefined }, { packageName: packageName, packageVersion: packageVersion }, merge(extraAttributes, payloadAttributes));
    // Ensure navigation tag is not duplicated by using Set
    var tags = new Set(event.payload.tags || []);
    tags.add(NAVIGATION_TAG);
    if (event.payload) {
        switch (eventType) {
            case UI_EVENT_TYPE:
            case OPERATIONAL_EVENT_TYPE:
                return {
                    eventType: eventType,
                    source: source,
                    actionSubject: actionSubject,
                    action: action,
                    actionSubjectId: actionSubjectId,
                    attributes: attributes,
                    tags: Array.from(tags),
                };
            case SCREEN_EVENT_TYPE:
                return {
                    eventType: eventType,
                    name: name,
                    attributes: attributes,
                    tags: Array.from(tags),
                };
            case TRACK_EVENT_TYPE:
                logger.error('Track events are currently not supported for navigation events');
                break;
            default:
                logger.error('Invalid event type', eventType);
                break;
        }
    }
    return null;
});
//# sourceMappingURL=process-event.js.map