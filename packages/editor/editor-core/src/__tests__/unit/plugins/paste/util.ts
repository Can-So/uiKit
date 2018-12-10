import { Slice } from 'prosemirror-model';
import {
  blockquote,
  defaultSchema,
  doc,
  em,
  emoji,
  p,
  strong,
} from '@atlaskit/editor-test-helpers';

import { toJSON } from '../../../../utils';
import {
  applyTextMarksToSlice,
  extractSingleTextNodeFromSlice,
  hasOnlyNodesOfType,
  isSingleLine,
} from '../../../../plugins/paste/util';

describe('paste util', () => {
  describe('isSingleLine()', () => {
    it('should return true for single line of text', () => {
      expect(isSingleLine('only one line')).toBe(true);
    });

    it('should return false for multiple lines of text', () => {
      expect(isSingleLine('first line\nsecond line')).toBe(false);
    });
  });

  describe('extractSingleTextNodeFromSlice()', () => {
    it('should return nothing for undefined slice', () => {
      expect(extractSingleTextNodeFromSlice()).toBeFalsy();
    });

    it('should return nothing for slice with different openStart/openEnd depth', () => {
      const json = toJSON(p('some text')(defaultSchema));
      const slice = Slice.fromJSON(defaultSchema, {
        content: json.content,
        openStart: 1,
        openEnd: 2,
      });
      const node = extractSingleTextNodeFromSlice(slice);

      expect(node).toBeFalsy();
    });

    it('should return text node for slice containing single text node', () => {
      const json = toJSON(p('some text')(defaultSchema));
      const slice = Slice.fromJSON(defaultSchema, {
        content: json.content,
        openStart: 1,
        openEnd: 1,
      });
      const node = extractSingleTextNodeFromSlice(slice);

      expect(node).toBeTruthy();
      expect(node!.isText).toBeTruthy();
    });

    it('should return nothing for slice containing multiple text nodes', () => {
      const json = toJSON(
        p('some text', strong('another text'))(defaultSchema),
      );
      const slice = Slice.fromJSON(defaultSchema, {
        content: json.content,
        openStart: 1,
        openEnd: 1,
      });
      const node = extractSingleTextNodeFromSlice(slice);

      expect(node).toBeFalsy();
    });

    it('should return text node for slice containing single paragraph & text node', () => {
      const json = toJSON(doc(p('some text'))(defaultSchema));
      const slice = Slice.fromJSON(defaultSchema, {
        content: json.content,
        openStart: 2,
        openEnd: 2,
      });
      const node = extractSingleTextNodeFromSlice(slice);

      expect(node).toBeTruthy();
      expect(node!.isText).toBeTruthy();
    });

    it('should return text node for slice containing single blockquote, paragraph & text node', () => {
      const json = toJSON(doc(blockquote(p('some text')))(defaultSchema));
      const slice = Slice.fromJSON(defaultSchema, {
        content: json.content,
        openStart: 3,
        openEnd: 3,
      });
      const node = extractSingleTextNodeFromSlice(slice);

      expect(node).toBeTruthy();
      expect(node!.isText).toBeTruthy();
    });

    it('should return nothing for slice containing multiple parapgraphs', () => {
      const json = toJSON(
        doc(p('some text'), p('another text'))(defaultSchema),
      );
      const slice = Slice.fromJSON(defaultSchema, {
        content: json.content,
        openStart: 2,
        openEnd: 2,
      });
      const node = extractSingleTextNodeFromSlice(slice);

      expect(node).toBeFalsy();
    });
  });

  describe('hasOnlyNodesOfType()', () => {
    it('should return true for undefined slice', () => {
      expect(hasOnlyNodesOfType()).toBeTruthy();
    });

    it('should return true for a slice containing only specified nodes', () => {
      const {
        nodes: { paragraph, text },
      } = defaultSchema;

      const json = toJSON(
        doc(p('some text'), p('another text'))(defaultSchema),
      );
      const slice = Slice.fromJSON(defaultSchema, {
        content: json.content,
        openStart: 1,
        openEnd: 1,
      });

      expect(hasOnlyNodesOfType(paragraph, text)(slice)).toBeTruthy();
    });

    it('should return false for a slice containing unspecified nodes', () => {
      const {
        nodes: { paragraph, text },
      } = defaultSchema;

      const json = toJSON(
        doc(
          p(emoji({ shortName: ':grinning:', text: '😀' })()),
          p('another text'),
        )(defaultSchema),
      );
      const slice = Slice.fromJSON(defaultSchema, {
        content: json.content,
        openStart: 1,
        openEnd: 1,
      });

      expect(hasOnlyNodesOfType(paragraph, text)(slice)).toBeFalsy();
    });
  });

  describe('applyTextMarksToSlice()', () => {
    it('should return input slice when no marks', () => {
      const json = toJSON(doc(p('some text'))(defaultSchema));
      const slice = Slice.fromJSON(defaultSchema, {
        content: json.content,
        openStart: 1,
        openEnd: 1,
      });

      expect(applyTextMarksToSlice(defaultSchema, [])(slice)).toEqual(slice);
    });

    it('should return input slice when undefined', () => {
      expect(applyTextMarksToSlice(defaultSchema)()).toBeUndefined();
    });

    it('should return new slice when marks', () => {
      const {
        marks: { code },
      } = defaultSchema;
      const json = toJSON(doc(p('some text'))(defaultSchema));
      const slice = Slice.fromJSON(defaultSchema, {
        content: json.content,
        openStart: 1,
        openEnd: 1,
      });

      const transformedSlice = applyTextMarksToSlice(defaultSchema, [
        code.create(),
      ])(slice);

      expect(transformedSlice).not.toBe(slice);
    });

    it('should apply all marks to slice', () => {
      const {
        marks: { em: emMark, strong: strongMark },
      } = defaultSchema;

      const json = toJSON(doc(p('some text'))(defaultSchema));
      const slice = Slice.fromJSON(defaultSchema, {
        content: json.content,
        openStart: 1,
        openEnd: 1,
      });

      const transformedSlice = applyTextMarksToSlice(defaultSchema, [
        emMark.create(),
        strongMark.create(),
      ])(slice);

      expect(transformedSlice).toBeTruthy();
      expect(transformedSlice).toEqual(
        Slice.fromJSON(defaultSchema, {
          content: toJSON(doc(p(em(strong('some text'))))(defaultSchema))
            .content,
          openStart: 1,
          openEnd: 1,
        }),
      );
    });
  });
});
