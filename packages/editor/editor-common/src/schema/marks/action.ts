import { MarkSpec } from 'prosemirror-model';
import { LINK, COLOR } from '../groups';

/**
 * @name action_mark
 */
export interface Definition {
  type: 'action';
  attrs: Attributes;
}

export interface Attributes extends Action {
  title: string;
}

export interface Action {
  key?: string;
  target: {
    receiver?: string;
    key: string;
  };
  parameters?: object;
}

export const action: MarkSpec = {
  excludes: COLOR,
  group: LINK,
  attrs: {
    key: { default: null },
    title: { default: null },
    target: { default: null },
    parameters: { default: null },
  },
  inclusive: false,
  parseDOM: [
    {
      tag: 'span[data-mark-type="action"]',
      getAttrs: (dom: Element) => {
        const key = dom.getAttribute('data-action-mark-key');
        const targetReceiver = dom.getAttribute(
          'data-action-mark-target-receiver',
        );
        const targetKey = dom.getAttribute('data-action-mark-target-key');
        const title = dom.getAttribute('data-action-mark-title');

        return {
          key,
          title,
          target: {
            receiver: targetReceiver,
            key: targetKey,
          },
        };
      },
    },
  ],
  toDOM(node): [string, any] {
    const { title, key, target } = node.attrs;
    return [
      'span',
      {
        'data-mark-type': 'action',
        'data-action-mark-key': key,
        'data-action-mark-title': title,
        'data-action-mark-target-receiver': target && target.receiver,
        'data-action-mark-target-key': target && target.key,
      },
    ];
  },
};
