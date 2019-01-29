import { InlineCardResolvedViewProps } from '@atlaskit/media-ui';
import { genericExtractPropsFromJSONLD } from '../genericExtractPropsFromJSONLD';
import { extractInlineViewPropsFromObject } from './extractPropsFromObject';
import { extractInlineViewPropsFromTask } from './extractPropsFromTask';
import { extractInlineViewPropsFromTextDocument } from './extractPropsFromTextDocument';
import { extractInlineViewPropsFromBlogPost } from './extractPropsFromBlogPost';
import { extractInlineViewPropsFromDocument } from './extractPropsFromDocument';
import { extractInlineViewPropsFromProject } from './extractPropsFromProject';
import { extractInlineViewPropsFromTemplate } from './extractPropsFromTemplate';

const extractorPrioritiesByType = {
  Object: 0,
  Document: 5,
  'schema:TextDigitalDocument': 10,
  'schema:BlogPosting': 10,
  'atlassian:Task': 10,
  'atlassian:Project': 10,
  'atlassian:Template': 10,
};

const extractorFunctionsByType = {
  Object: extractInlineViewPropsFromObject,
  Document: extractInlineViewPropsFromDocument,
  'schema:TextDigitalDocument': extractInlineViewPropsFromTextDocument,
  'schema:BlogPosting': extractInlineViewPropsFromBlogPost,
  'atlassian:Task': extractInlineViewPropsFromTask,
  'atlassian:Project': extractInlineViewPropsFromProject,
  'atlassian:Template': extractInlineViewPropsFromTemplate,
};

export function extractInlinePropsFromJSONLD(
  json: any,
): InlineCardResolvedViewProps {
  return genericExtractPropsFromJSONLD({
    extractorPrioritiesByType: extractorPrioritiesByType,
    extractorFunctionsByType: extractorFunctionsByType,
    defaultExtractorFunction: extractInlineViewPropsFromObject,
    json,
  });
}
