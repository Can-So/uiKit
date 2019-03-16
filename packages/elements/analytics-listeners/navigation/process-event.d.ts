/**
 * Inspired by analytics-web-react
 */
import { GasPayload, GasScreenEventPayload } from '@atlaskit/analytics-gas-types';
import Logger from '../helpers/logger';
import { UIAnalyticsEventInterface } from '@atlaskit/analytics-next-types';
declare const _default: (event: UIAnalyticsEventInterface, logger: Logger) => GasPayload | GasScreenEventPayload | null;
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
export default _default;
