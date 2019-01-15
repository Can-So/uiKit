import { MarkSpec } from 'prosemirror-model';

/**
 * @name annotation_mark
 * @stage 0
 */
export interface AnnotationMarkDefinition {
  type: 'annotation';
  attrs: AnnotationMarkAttributes;
}

export interface AnnotationMarkAttributes {
  id: string;
  annotationType: AnnotationType;
}

export const INLINE_COMMENT = 'inlineComment';
export type AnnotationType = 'inlineComment';

export const annotation: MarkSpec = {
  inclusive: false,
  excludes: '',
  attrs: {
    id: {
      default: '',
    },
    annotationType: {
      default: INLINE_COMMENT,
    },
  },
  parseDOM: [{ tag: 'span[data-mark-type="annotation"]' }],
  toDOM(node) {
    /*
      Data attributes on the DOM node are a temporary means of
      incrementally switching over to the Annotation mark. Once renderer
      provides native support for inline comments the data attributes on the
      DOM nodes will be removed.
    */
    return [
      'span',
      {
        'data-mark-type': 'annotation',
        'data-mark-annotation-type': node.attrs.annotationType,
        'data-id': node.attrs.id,
      },
    ];
  },
};
