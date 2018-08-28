//@flow

import { getDestinationPath, getSourcePath } from '../../flat-tree';

import { flattenTree } from '../../tree';

import { treeWithTwoBranches } from '../../../../mockdata/treeWithTwoBranches';
import { complexTree } from '../../../../mockdata/complexTree';

const flatTreeWithTwoBranches = flattenTree(treeWithTwoBranches);
const flatComplexTree = flattenTree(complexTree);

describe('@atlaskit/tree - utils/flat-tree', () => {
  describe('#getSourcePath', () => {
    it('handles the top element', () => {
      expect(getSourcePath(flatTreeWithTwoBranches, 0)).toEqual([0]);
    });

    it('handles element deeper', () => {
      expect(getSourcePath(flatTreeWithTwoBranches, 1)).toEqual([0, 0]);
    });
  });

  describe('#getDestinationPath', () => {
    it('returns the same path if the index did not change', () => {
      expect(getDestinationPath(flatComplexTree, 1, 1)).toEqual([1]);
    });

    describe('moving down', () => {
      describe('same parent', () => {
        it('moves to the top of the list', () => {
          // not valid
        });
        it('moves to the middle of the list', () => {
          expect(getDestinationPath(flatComplexTree, 3, 4)).toEqual([2, 1]);
        });
        it('moves to the end of the list', () => {
          expect(getDestinationPath(flatComplexTree, 3, 6)).toEqual([2, 3]);
        });
      });

      describe('different parent', () => {
        describe('higher level', () => {
          it('moves to the top of the list', () => {
            // not valid
          });
          it('moves to the middle of the list', () => {
            expect(getDestinationPath(flatComplexTree, 4, 8)).toEqual([5]);
          });
          it('moves to the end of the list to the top level', () => {
            expect(getDestinationPath(flatComplexTree, 4, 20)).toEqual([9]);
          });
          it('moves to the end of the list to not top level', () => {
            expect(getDestinationPath(flatComplexTree, 15, 18)).toEqual([6, 5]);
          });
        });

        describe('same level', () => {
          it('moves to the top of the list', () => {
            expect(getDestinationPath(flatComplexTree, 4, 10)).toEqual([6, 0]);
          });
          it('moves to the middle of the list', () => {
            expect(getDestinationPath(flatComplexTree, 4, 12)).toEqual([6, 2]);
          });
          it('moves to the end of the list', () => {
            expect(getDestinationPath(flatComplexTree, 4, 18)).toEqual([6, 5]);
          });
        });

        describe('lower level', () => {
          it('moves to the top of the list', () => {
            expect(getDestinationPath(flatComplexTree, 4, 13)).toEqual([
              6,
              2,
              0,
            ]);
          });
          it('moves to the middle of the list', () => {
            expect(getDestinationPath(flatComplexTree, 4, 14)).toEqual([
              6,
              2,
              1,
            ]);
          });
          it('moves to the end of the list', () => {
            expect(getDestinationPath(flatComplexTree, 4, 16)).toEqual([6, 3]);
          });
        });
      });
    });

    describe('moving up', () => {
      describe('same parent', () => {
        it('moves to the top of the list', () => {
          expect(getDestinationPath(flatComplexTree, 4, 3)).toEqual([2, 0]);
        });
        it('moves to the middle of the list', () => {
          expect(getDestinationPath(flatComplexTree, 5, 4)).toEqual([2, 1]);
        });
        it('moves to the end of the list', () => {
          // not valid
        });
      });

      describe('different parent', () => {
        describe('higher level', () => {
          it('moves to the top of the list on the top level', () => {
            expect(getDestinationPath(flatComplexTree, 4, 0)).toEqual([0]);
          });
          it('moves to the top of the list not on the top level', () => {
            expect(getDestinationPath(flatComplexTree, 15, 11)).toEqual([6, 0]);
          });
          it('moves to the middle of the list', () => {
            expect(getDestinationPath(flatComplexTree, 4, 1)).toEqual([1]);
          });
          it('moves to the end of the list', () => {
            // not valid
          });
        });

        describe('same level', () => {
          it('moves to the top of the list on same level', () => {
            expect(getDestinationPath(flatComplexTree, 12, 3)).toEqual([2, 0]);
          });
          it('moves to the middle of the list', () => {
            expect(getDestinationPath(flatComplexTree, 12, 4)).toEqual([2, 1]);
          });
          it('moves to the end of the list', () => {
            expect(getDestinationPath(flatComplexTree, 12, 7)).toEqual([2, 4]);
          });
        });

        describe('lower level', () => {
          it('moves to the top of the list', () => {
            expect(getDestinationPath(flatComplexTree, 18, 14)).toEqual([
              6,
              2,
              0,
            ]);
          });
          it('moves to the middle of the list', () => {
            expect(getDestinationPath(flatComplexTree, 18, 15)).toEqual([
              6,
              2,
              1,
            ]);
          });
          it('moves to the end of the list', () => {
            expect(getDestinationPath(flatComplexTree, 18, 17)).toEqual([6, 3]);
          });
        });
      });
    });
  });
});
