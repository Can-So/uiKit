import ResizeState, {
  ColType,
  amountFor,
  widthFor,
  moveSpaceFrom,
  getCandidates,
} from '../../../../../../../plugins/table/pm-plugins/table-resizing/resizer/resizeState';

import ColumnState from '../../../../../../../plugins/table/pm-plugins/table-resizing/resizer/columnState';

describe('ResizeState', () => {
  describe('amountFor()', () => {
    it('should negate positive amount for source', () => {
      expect(amountFor(ColType.SOURCE)(5)).toEqual(-5);
      expect(amountFor(ColType.SOURCE)(-5)).toEqual(-5);
      expect(amountFor(ColType.SOURCE)(0)).toEqual(0);
    });

    it('should negate negative amount for dest', () => {
      expect(amountFor(ColType.DEST)(5)).toEqual(5);
      expect(amountFor(ColType.DEST)(-5)).toEqual(5);
      expect(amountFor(ColType.DEST)(0)).toEqual(0);
    });
  });

  describe('widthFor()', () => {
    it('should always shrink width of source column', () => {
      const srcCol = new ColumnState(10, 0);
      const destCol = new ColumnState(30, 0);
      expect(widthFor(ColType.SOURCE)(5, srcCol, destCol)).toEqual(5);
      expect(widthFor(ColType.SOURCE)(-5, srcCol, destCol)).toEqual(5);
      expect(widthFor(ColType.SOURCE)(0, srcCol, destCol)).toEqual(10);
    });

    it('should always grow width of dest column', () => {
      const srcCol = new ColumnState(10, 0);
      const destCol = new ColumnState(30, 0);
      expect(widthFor(ColType.DEST)(5, srcCol, destCol)).toEqual(35);
      expect(widthFor(ColType.DEST)(-5, srcCol, destCol)).toEqual(35);
      expect(widthFor(ColType.DEST)(0, srcCol, destCol)).toEqual(30);
    });
  });

  describe('moveSpaceFrom()', () => {
    it('should return a new ResizeState', () => {
      const state = new ResizeState([new ColumnState(0, 0)], 0);
      const res = moveSpaceFrom(state, 0, 0, 0);
      expect(res.state).not.toBe(state);
    });

    it("should shrink src / grow dest columns' size", () => {
      const state = new ResizeState(
        [new ColumnState(10, 0), new ColumnState(5, 0)],
        0,
      );
      const res = moveSpaceFrom(state, 0, 1, 5);
      expect(res.state.cols[0].width).toEqual(5);
      expect(res.state.cols[1].width).toEqual(10);
      expect(res.amount).toEqual(5);
    });

    it('should keep minimum widths', () => {
      const state = new ResizeState(
        [new ColumnState(20, 0, 15), new ColumnState(5, 0, 5)],
        0,
      );
      const res = moveSpaceFrom(state, 0, 1, 10);
      expect(res.state.cols[0].width).toEqual(15);
      expect(res.state.cols[1].width).toEqual(10);
      expect(res.amount).toEqual(5);
    });
  });

  describe('getCandidates()', () => {
    it('should take columns before idx when amount is negative', () => {
      const state = new ResizeState(
        [
          new ColumnState(10, 0),
          new ColumnState(20, 0),
          new ColumnState(30, 0),
        ],
        0,
      );
      let candidates = getCandidates(state, 1, -5);
      expect(candidates.length).toEqual(1);
      expect(candidates[0].col.width).toEqual(10);
      expect(candidates[0].idx).toEqual(0);
    });

    it('should take columns after idx when amount is positive', () => {
      const state = new ResizeState(
        [
          new ColumnState(10, 0),
          new ColumnState(20, 0),
          new ColumnState(30, 0),
        ],
        0,
      );
      let candidates = getCandidates(state, 1, 5);
      expect(candidates.length).toEqual(1);
      expect(candidates[0].col.width).toEqual(30);
      expect(candidates[0].idx).toEqual(2);
    });
  });

  describe('ResizeState', () => {
    it('should almost be immutable', () => {
      const state = new ResizeState([], 0);
      expect(() => (state.cols = [])).toThrow();
      expect(() => (state.maxSize = 10)).toThrow();
      expect(() => (state.breakout = false)).toThrow();
      expect(() => (state.freeColFunc = () => 1)).toThrow();
    });

    describe('#totalWidth()', () => {
      it('should return columns summed width + border', () => {
        const state = new ResizeState(
          [
            new ColumnState(10, 0),
            new ColumnState(20, 0),
            new ColumnState(30, 0),
          ],
          0,
        );

        expect(state.totalWidth).toEqual(61);
      });
    });

    describe('#grow()', () => {
      it('should grow specified column', () => {
        const state = new ResizeState(
          [
            new ColumnState(10, 0),
            new ColumnState(20, 0),
            new ColumnState(30, 0),
          ],
          0,
        );

        const newState = state.grow(0, 5);
        expect(newState.cols[0].width).toEqual(15);
        expect(newState.cols[1].width).toEqual(15);
        expect(state.cols[0].width).toEqual(10);
        expect(state.cols[1].width).toEqual(20);
      });
    });

    describe('#shrink()', () => {
      it('should shrink specified column', () => {
        const state = new ResizeState(
          [
            new ColumnState(10, 0),
            new ColumnState(20, 0),
            new ColumnState(30, 0),
          ],
          0,
        );

        const newState = state.shrink(0, 5);
        expect(newState.cols[0].width).toEqual(5);
        expect(newState.cols[1].width).toEqual(25);
        expect(state.cols[0].width).toEqual(10);
        expect(state.cols[1].width).toEqual(20);
      });
    });

    describe('#resize()', () => {
      beforeEach(() => jest.clearAllMocks());

      it('should call #grow() for positive amount', () => {
        const state = new ResizeState([new ColumnState(10, 0)], 0);
        const growSpy = jest.spyOn(ResizeState.prototype, 'grow');
        const shrinkSpy = jest.spyOn(ResizeState.prototype, 'shrink');
        const newState = state.resize(0, 10);
        expect(growSpy).toHaveBeenCalled();
        expect(shrinkSpy).not.toHaveBeenCalled();
        expect(newState).not.toBe(state);
      });

      it('should call #shrink() for negative amount', () => {
        const growSpy = jest.spyOn(ResizeState.prototype, 'grow');
        const shrinkSpy = jest.spyOn(ResizeState.prototype, 'shrink');
        const state = new ResizeState([new ColumnState(10, 0)], 0);
        const newState = state.resize(0, -10);
        expect(growSpy).not.toHaveBeenCalled();
        expect(shrinkSpy).toHaveBeenCalled();
        expect(newState).not.toBe(state);
      });

      it('should always return new state', () => {
        const growSpy = jest.spyOn(ResizeState.prototype, 'grow');
        const shrinkSpy = jest.spyOn(ResizeState.prototype, 'shrink');
        const state = new ResizeState([new ColumnState(10, 0)], 0);
        const newState = state.resize(0, 0);
        expect(growSpy).not.toHaveBeenCalled();
        expect(shrinkSpy).not.toHaveBeenCalled();
        expect(newState).not.toBe(state);
      });
    });

    describe('#scaleColToMinWidth()', () => {
      beforeEach(() => jest.clearAllMocks());

      it('should call #resize() when cells', () => {
        const resizeSpy = jest.spyOn(ResizeState.prototype, 'resize');
        const state = new ResizeState([new ColumnState(10, 0)], 0);
        const newState = state.scaleColToMinWidth(0);
        expect(resizeSpy).toHaveBeenCalled();
        expect(newState).not.toBe(state);
      });

      it('should return new state when no cell', () => {
        const resizeSpy = jest.spyOn(ResizeState.prototype, 'resize');
        const state = new ResizeState([], 0);
        const newState = state.scaleColToMinWidth(0);
        expect(resizeSpy).not.toHaveBeenCalled();
        expect(newState).not.toBe(state);
      });
    });

    describe('#clone()', () => {
      it('should clone all properties', () => {
        const state = new ResizeState([new ColumnState(10, 0)], 0);
        const newState = state.clone();

        expect(newState).not.toBe(state);
        expect(newState.cols).not.toBe(state.cols);
        expect(newState.cols[0]).not.toBe(state.cols[0]);
      });
    });
  });
});
