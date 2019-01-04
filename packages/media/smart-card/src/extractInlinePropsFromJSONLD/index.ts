import { InlineCardResolvedViewProps } from '@atlaskit/media-ui';
import { genericExtractPropsFromJSONLD } from '../genericExtractPropsFromJSONLD';
import { extractPropsFromObject } from './extractPropsFromObject';
import { extractInlineViewPropsFromTask } from './extractPropsFromTask';

const extractorPrioritiesByType = {
  Object: 0,
  'atlassian:Task': 10,
};

const extractorFunctionsByType = {
  Object: extractPropsFromObject,
  'atlassian:Task': extractInlineViewPropsFromTask,
};

export function extractInlinePropsFromJSONLD(
  json: any,
): InlineCardResolvedViewProps {
  return genericExtractPropsFromJSONLD({
    extractorPrioritiesByType: extractorPrioritiesByType,
    extractorFunctionsByType: extractorFunctionsByType,
    defaultExtractorFunction: extractPropsFromObject,
    json,
  });
}
