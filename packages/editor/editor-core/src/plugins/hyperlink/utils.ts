import { Slice, Fragment, Node, Schema } from 'prosemirror-model';
import * as LinkifyIt from 'linkify-it';

export const LINK_REGEXP = /(https?|ftp):\/\/[^\s]+/;

export interface Match {
  schema: any;
  index: number;
  lastIndex: number;
  raw: string;
  text: string;
  url: string;
  length?: number;
  input?: string;
}

const linkify = LinkifyIt();
linkify.add('sourcetree:', 'http:');

const tlds = 'biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф'.split(
  '|',
);
const tlds2Char =
  'a[cdefgilmnoqrtuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrtuvwxyz]|n[acefgilopruz]|om|p[aefghkmnrtw]|qa|r[eosuw]|s[abcdegijklmnrtuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]';
tlds.push(tlds2Char);
linkify.tlds(tlds, false);

export function getLinkMatch(str: string): Match | LinkifyMatch | null {
  if (!str) {
    return null;
  }
  let match = linkifyMatch(str);
  if (!match.length) {
    match = linkify.match(str);
  }
  return match && match[0];
}

/**
 * Instance of class LinkMatcher are used in autoformatting in place of Regex.
 * Hence it has been made similar to regex with an exec method.
 * Extending it directly from class Regex was introducing some issues, thus that has been avoided.
 */
export class LinkMatcher {
  exec(str: string): Match[] | null {
    if (str.endsWith(' ')) {
      const chunks = str.slice(0, str.length - 1).split(' ');
      const lastChunk = chunks[chunks.length - 1];
      const links: Match[] = linkify.match(lastChunk);
      if (links && links.length > 0) {
        const lastLink: Match = links[links.length - 1];
        lastLink.input = lastChunk;
        lastLink.length = lastLink.lastIndex - lastLink.index + 1;
        return [lastLink];
      }
    }
    return null;
  }
}

/**
 * Adds protocol to url if needed.
 */
export function normalizeUrl(url: string) {
  if (LINK_REGEXP.test(url)) {
    return url;
  }
  const match = getLinkMatch(url);
  return (match && match.url) || url;
}

export function linkifyContent(
  schema: Schema,
  slice: Slice,
): Slice | undefined {
  const fragment = linkinfyFragment(schema, slice.content);
  if (fragment) {
    return new Slice(fragment, slice.openStart, slice.openEnd);
  }
}

function linkinfyFragment(
  schema: Schema,
  fragment: Fragment,
): Fragment | undefined {
  const linkified: Node[] = [];
  for (let i = 0, len = fragment.childCount; i < len; i++) {
    const child: Node = fragment.child(i);
    if (child.type === schema.nodes.table) {
      return;
    }
    if (child.isText) {
      const text = child.textContent as string;
      const link = child.type.schema.marks['link'];
      const matches: any[] = findLinkMatches(text);
      let pos = 0;
      matches.forEach(match => {
        if (match.start > 0) {
          linkified.push(child.cut(pos, match.start));
        }
        linkified.push(
          child
            .cut(match.start, match.end)
            .mark(
              link
                .create({ href: normalizeUrl(match.href) })
                .addToSet(child.marks),
            ),
        );
        pos = match.end;
      });
      if (pos < text.length) {
        linkified.push(child.cut(pos));
      }
    } else {
      linkified.push(child.copy(linkinfyFragment(schema, child.content)));
    }
  }
  return Fragment.fromArray(linkified);
}

interface LinkMatch {
  start: number;
  end: number;
  title: string;
  href: string;
}

function findLinkMatches(text: string): LinkMatch[] {
  const matches: LinkMatch[] = [];
  let linkMatches: Match[] = text && linkify.match(text);
  if (linkMatches && linkMatches.length > 0) {
    linkMatches.forEach(match => {
      matches.push({
        start: match.index,
        end: match.lastIndex,
        title: match.raw,
        href: match.url,
      });
    });
  }
  return matches;
}

export interface LinkifyMatch {
  index: number;
  lastIndex: number;
  raw: string;
  url: string;
  text: string;
  schema: string;
}

export const linkifyMatch = (text: string): LinkifyMatch[] => {
  const matches: LinkifyMatch[] = [];

  if (!LINK_REGEXP.test(text)) {
    return matches;
  }

  let startpos = 0;
  let substr;

  while ((substr = text.substr(startpos))) {
    const link = (substr.match(LINK_REGEXP) || [''])[0];
    if (link) {
      const index = substr.search(LINK_REGEXP);
      const start = index >= 0 ? index + startpos : index;
      const end = start + link.length;
      matches.push({
        index: start,
        lastIndex: end,
        raw: link,
        url: link,
        text: link,
        schema: '',
      });
      startpos += end;
    } else {
      break;
    }
  }

  return matches;
};
