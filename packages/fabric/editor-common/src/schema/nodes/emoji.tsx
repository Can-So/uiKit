import { Node, NodeSpec } from 'prosemirror-model';
import { acNameToEmoji, acShortcutToEmoji } from '../../utils/confluence/emoji';

/**
 * @name emoji_node
 */
export interface Definition {
  type: 'emoji';
  attrs: Attributes;
}

export interface Attributes {
  id?: string; // Optional to support legacy formats
  shortName: string;
  text?: string;
}

export const emoji: NodeSpec = {
  inline: true,
  group: 'inline',
  selectable: false,
  attrs: {
    shortName: { default: '' },
    id: { default: '' },
    text: { default: '' },
  },
  parseDOM: [
    {
      tag: 'span[data-emoji-short-name]',
      getAttrs: (dom: Element) => ({
        shortName: dom.getAttribute('data-emoji-short-name') || emoji.attrs!.shortName.default,
        id: dom.getAttribute('data-emoji-id') || emoji.attrs!.id.default,
        text: dom.getAttribute('data-emoji-text') || emoji.attrs!.text.default,
      })
    },
    // Handle copy/paste from old <ac:emoticon />
    {
      tag: 'img[data-emoticon-name]',
      getAttrs: (dom: Element) => acNameToEmoji(dom.getAttribute('data-emoticon-name')!)
    },
    // Handle copy/paste from old <ac:hipchat-emoticons />
    {
      tag: 'img[data-hipchat-emoticon]',
      getAttrs: (dom: Element) => acShortcutToEmoji(dom.getAttribute('data-hipchat-emoticon')!)
    }
  ],
  toDOM(node: Node) {
    const { shortName, id, text } = node.attrs;
    const attrs = {
      'data-emoji-short-name': shortName,
      'data-emoji-id': id,
      'data-emoji-text': text,
      'contenteditable': 'false',
    };
    return ['span', attrs, text];
  }
};
