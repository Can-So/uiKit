import { Slice } from 'prosemirror-model';
import {
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

  describe('hasOnlyNodesOfType()', () => {
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
