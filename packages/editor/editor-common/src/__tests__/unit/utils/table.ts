import { calcTableWidth } from '../../../styles/shared/table';
import { akEditorFullWidthLayoutWidth } from '../../../styles/consts';

describe('@atlaskit/editor-common table utils', () => {
  describe('#calcTableWidth', () => {
    describe('when layout = "full-width"', () => {
      it(`should not exceed ${akEditorFullWidthLayoutWidth}px`, () => {
        const pageWidth = 2000;
        expect(calcTableWidth('full-width', pageWidth)).toEqual(
          `${akEditorFullWidthLayoutWidth}px`,
        );
      });
    });
  });
});
