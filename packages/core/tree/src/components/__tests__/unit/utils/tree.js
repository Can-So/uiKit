//@flow

import { flattenTree, isSamePath, mutateTree } from '../../../../utils/tree';
import { treeWithThreeLeaves } from '../../../../../mockdata/treeWithThreeLeaves';
import { treeWithTwoBranches } from '../../../../../mockdata/treeWithTwoBranches';

describe('@atlaskit/tree - utils/tree', () => {
  describe('#flattenTree', () => {
    it('returns empty list if no children', () => {
      expect(flattenTree({ rootId: 'x', items: {} }).length).toBe(0);
    });

    it('returns a flat list with path for one level tree', () => {
      const flatResults = flattenTree(treeWithThreeLeaves);
      expect(flatResults.length).toBe(3);
      expect(flatResults[0]).toEqual({
        item: treeWithThreeLeaves.items['1-1'],
        path: [0],
      });
      expect(flatResults[1]).toEqual({
        item: treeWithThreeLeaves.items['1-2'],
        path: [1],
      });
      expect(flatResults[2]).toEqual({
        item: treeWithThreeLeaves.items['1-3'],
        path: [2],
      });
    });

    it('returns a flat list with path for branches', () => {
      const flatResults = flattenTree(treeWithTwoBranches);
      expect(flatResults.length).toBe(6);
      expect(flatResults[0]).toEqual({
        item: treeWithTwoBranches.items['1-1'],
        path: [0],
      });
      expect(flatResults[1]).toEqual({
        item: treeWithTwoBranches.items['1-1-1'],
        path: [0, 0],
      });
      expect(flatResults[2]).toEqual({
        item: treeWithTwoBranches.items['1-1-2'],
        path: [0, 1],
      });
      expect(flatResults[3]).toEqual({
        item: treeWithTwoBranches.items['1-2'],
        path: [1],
      });
      expect(flatResults[4]).toEqual({
        item: treeWithTwoBranches.items['1-2-1'],
        path: [1, 0],
      });
      expect(flatResults[5]).toEqual({
        item: treeWithTwoBranches.items['1-2-2'],
        path: [1, 1],
      });
    });

    it("doesn't show collapsed subtrees", () => {
      const collapsedTree = {
        rootId: treeWithTwoBranches.rootId,
        items: {
          ...treeWithTwoBranches.items,
          '1-1': {
            ...treeWithTwoBranches.items['1-1'],
            isExpanded: false,
          },
        },
      };
      const flatResults = flattenTree(collapsedTree);
      expect(flatResults.length).toBe(4);
      expect(flatResults[0]).toEqual({
        item: collapsedTree.items['1-1'],
        path: [0],
      });
      expect(flatResults[1]).toEqual({
        item: collapsedTree.items['1-2'],
        path: [1],
      });
      expect(flatResults[2]).toEqual({
        item: collapsedTree.items['1-2-1'],
        path: [1, 0],
      });
      expect(flatResults[3]).toEqual({
        item: collapsedTree.items['1-2-2'],
        path: [1, 1],
      });
    });
  });

  describe('#mutateTree', () => {
    it('mutates the root', () => {
      const rootId = treeWithThreeLeaves.rootId;
      const mutatedTree = mutateTree(treeWithThreeLeaves, rootId, {
        children: [],
      });
      expect(mutatedTree).not.toBe(treeWithThreeLeaves);
      expect(mutatedTree.rootId).toBe(treeWithThreeLeaves.rootId);
      expect(mutatedTree.items).not.toBe(treeWithThreeLeaves.items);
      expect(mutatedTree.items[rootId].children.length).toBe(0);
      expect(mutatedTree.items[rootId].hasChildren).toBe(true);
      expect(mutatedTree.items[rootId].isExpanded).toBe(true);
      expect(mutatedTree.items[rootId].isChildrenLoading).toBe(false);
      expect(mutatedTree.items[rootId].data).toBe(
        treeWithThreeLeaves.items[rootId].data,
      );
      expect(treeWithThreeLeaves.items[rootId].children.length).toBe(3);
    });

    it('changes only the changed child', () => {
      const itemId = '1-2';
      const mutatedTree = mutateTree(treeWithThreeLeaves, itemId, {
        isChildrenLoading: true,
      });
      expect(mutatedTree).not.toBe(treeWithThreeLeaves);
      expect(mutatedTree.items['1-1']).toBe(treeWithThreeLeaves.items['1-1']);
      expect(mutatedTree.items['1-2']).not.toBe(
        treeWithThreeLeaves.items['1-2'],
      );
      expect(mutatedTree.items['1-2'].isChildrenLoading).toBe(true);
      expect(treeWithThreeLeaves.items['1-2'].isChildrenLoading).toBe(false);
    });

    it('changes only the changed item', () => {
      const itemId = '1-2-2';
      const mutatedTree = mutateTree(treeWithTwoBranches, itemId, {
        isChildrenLoading: true,
      });
      expect(mutatedTree).not.toBe(treeWithTwoBranches);
      expect(mutatedTree.items['1-1']).toBe(treeWithTwoBranches.items['1-1']);
      expect(mutatedTree.items['1-2']).toBe(treeWithTwoBranches.items['1-2']);
      expect(mutatedTree.items['1-2-1']).toBe(
        treeWithTwoBranches.items['1-2-1'],
      );
      expect(mutatedTree.items['1-2-2']).not.toBe(
        treeWithTwoBranches.items['1-2-2'],
      );
      expect(mutatedTree.items['1-2-2'].isChildrenLoading).toBe(true);
      expect(treeWithTwoBranches.items['1-2-2'].isChildrenLoading).toBe(false);
    });

    it('does not change if item not found', () => {
      expect(
        mutateTree(treeWithTwoBranches, 'notfound', { isExpanded: true }),
      ).toBe(treeWithTwoBranches);
    });
  });

  describe('#isSamePath', () => {
    it('returns true if for the same instances', () => {
      const path = [1, 1];
      expect(isSamePath(path, path)).toBe(true);
    });

    it("returns true if it's the same", () => {
      expect(isSamePath([1, 1], [1, 1])).toBe(true);
    });

    it("returns false if it's not", () => {
      expect(isSamePath([1, 1, 1], [1, 1])).toBe(false);
    });

    it('returns false if any of them is empty', () => {
      expect(isSamePath([], [1, 1])).toBe(false);
      expect(isSamePath([1], [])).toBe(false);
    });
  });
});
