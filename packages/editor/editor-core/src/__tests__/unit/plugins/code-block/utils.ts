import { Fragment, Node, Slice } from 'prosemirror-model';
import {
  p,
  defaultSchema,
  clean,
  code_block,
  layoutSection,
  layoutColumn,
} from '@atlaskit/editor-test-helpers';
import { transformSliceToJoinAdjacentCodeBlocks } from '../../../../plugins/code-block/utils';

const fragment = (...args) =>
  Fragment.from(args.map(i => clean(i)(defaultSchema)) as Node[]);

describe('codeBlock utils', () => {
  describe('transformSliceToJoinAdjacentCodeBlocks', () => {
    it('should join adjacent code-blocks in a slice with a newline', () => {
      const slice = new Slice(
        fragment(
          code_block({ langauge: 'javascript' })('hello world'),
          code_block()('goodbye world'),
        ),
        0,
        0,
      );
      expect(transformSliceToJoinAdjacentCodeBlocks(slice)).toEqual(
        new Slice(
          fragment(
            code_block({ langauge: 'javascript' })(
              'hello world\ngoodbye world',
            ),
          ),
          0,
          0,
        ),
      );
    });

    it('should not join code-blocks when they are not adjacent', () => {
      const slice = new Slice(
        fragment(
          code_block()('hello world'),
          p('gap'),
          code_block()('goodbye world'),
        ),
        0,
        0,
      );
      expect(transformSliceToJoinAdjacentCodeBlocks(slice)).toEqual(slice);
    });

    it('should join nested adjacent code-blocks in a slice with a newline', () => {
      const slice = new Slice(
        fragment(
          layoutSection()(
            layoutColumn(
              code_block()('hello world'),
              code_block()('goodbye world'),
            ),
            layoutColumn(code_block()('left'), code_block()('right')),
          ),
        ),
        0,
        0,
      );
      expect(transformSliceToJoinAdjacentCodeBlocks(slice)).toEqual(
        new Slice(
          fragment(
            layoutSection()(
              layoutColumn(code_block()('hello world\ngoodbye world')),
              layoutColumn(code_block()('left\nright')),
            ),
          ),
          0,
          0,
        ),
      );
    });
  });
});
