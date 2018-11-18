//@flow
import Ellipsis from '../../../components/ellipsis';
import collapseRange from '../../../util/collapse-range';
import { name } from '../../../../package.json';

describe(`${name} - collapse range`, () => {
  it('should not throw', () => {
    expect(() => {
      collapseRange([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2, {
        max: 5,
        ellipsisComponent: () => Ellipsis,
      });
    }).not.toThrow();
  });
  it('should not add ellipsis when not needed', () => {
    const pages = collapseRange([1, 2, 3, 4], 2, {
      max: 4,
      ellipsisComponent: () => Ellipsis,
    });
    expect(pages).toEqual([1, 2, 3, 4]);
  });
  it('should show ellipsis in start with there < 3 add ellipsis when not needed', () => {
    const pages = collapseRange([1, 2, 3, 4], 2, {
      max: 4,
      ellipsisComponent: () => Ellipsis,
    });
    expect(pages).toEqual([1, 2, 3, 4]);
  });
});
