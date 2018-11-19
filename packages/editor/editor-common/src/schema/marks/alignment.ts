import { MarkSpec } from 'prosemirror-model';

export interface AlignmentAttributes {
  align: 'start' | 'center' | 'end';
}

/**
 * @name alignment_mark
 * @stage 0
 */
export interface AlignmentMarkDefinition {
  type: 'alignment';
  attrs: AlignmentAttributes;
}

export const alignment: MarkSpec = {
  attrs: {
    align: {
      default: 'start',
    },
  },
  parseDOM: [
    {
      getAttrs: (dom: Element) => {
        return {
          align: dom.getAttribute('align'),
        };
      },
    },
  ],
  toDOM(mark) {
    return [
      'div',
      { class: `align-${mark.attrs.align}`, 'data-align': mark.attrs.align },
      0,
    ];
  },
};
