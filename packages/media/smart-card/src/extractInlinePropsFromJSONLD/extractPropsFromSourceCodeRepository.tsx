import { InlineCardResolvedViewProps } from '@atlaskit/media-ui';
import { extractInlineViewPropsFromObject } from './extractPropsFromObject';

export const extractInlineViewPropsFromSourceCodeRepository = (
  json: any,
): InlineCardResolvedViewProps => extractInlineViewPropsFromObject(json);
