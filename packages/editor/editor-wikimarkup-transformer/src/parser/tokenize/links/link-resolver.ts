import { ContentLink } from './link-parser';
import { Token, TokenErrCallback } from '../index';
import { Node as PMNode, Schema } from 'prosemirror-model';
import { mentionLinkResolver } from './mention-link';
import { attachmentLinkResolver } from './attachment-link';
import { urlLinkResolver } from './url-link';

/**
 * Given some parsed link text, convert it into a link object that can then be rendered into
 * the page.  The parseAsContentLink() method must have been called on the GenericLinkParser
 * object before being passed to this method.
 *
 * @param context    The render context
 * @param parsedLink The parsed link information
 * @return the corresponding link. If no link can be created, null is returned
 */
type ContentLinkResolver = (
  parsedLink: ContentLink,
  schema: Schema,
  tokenErrCallback?: TokenErrCallback,
) => PMNode[] | undefined;

// jira-components/jira-core/src/main/resources/system-contentlinkresolvers-plugin.xml
// attachment resolver: 10
// anchor resolver: 20 - unsupported
// jiraissue resolver: 30 - unsupported
// user profile: 40
//
// Fall back to url link resolver
const linkResolverStrategies: ContentLinkResolver[] = [
  attachmentLinkResolver,
  mentionLinkResolver,
  urlLinkResolver,
];

export function resolveLink(
  link: ContentLink,
  schema: Schema,
  tokenErrCallback?: TokenErrCallback,
): Token {
  const length = link.originalLinkText.length + 2;

  for (const resolver of linkResolverStrategies) {
    const resolvedLink = resolver(link, schema, tokenErrCallback);

    if (resolvedLink) {
      return {
        length,
        nodes: resolvedLink,
        type: 'pmnode',
      };
    }
  }

  return {
    length,
    type: 'text',
    text: `[${link.originalLinkText}]`,
  };
}
