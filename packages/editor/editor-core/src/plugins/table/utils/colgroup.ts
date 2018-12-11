import { Node as PmNode, DOMSerializer } from 'prosemirror-model';
import { getFragmentBackingArray } from '../../../utils/slice';

export const generateColgroup = (node: PmNode) => {
  const cols: Array<string | { [attr: string]: string } | {}> = [];

  node.content.firstChild!.content.forEach(cell => {
    if (Array.isArray(cell.attrs.colwidth)) {
      cell.attrs.colwidth.forEach(width => {
        cols.push(['col', { style: `width: ${width}px;` }]);
      });
    } else {
      cols.push(['col', {}]);
    }
  });

  return cols;
};

export const renderColgroupFromNode = (node: PmNode) => {
  const rendered = DOMSerializer.renderSpec(
    document,
    // @ts-ignore
    ['colgroup', {}].concat(generateColgroup(node)),
  );

  if (rendered.dom) {
    return rendered.dom;
  }
};

export const insertColgroupFromNode = (
  tableElem: HTMLTableElement,
  node: PmNode,
): HTMLCollection => {
  let colgroup = tableElem.querySelector('colgroup') as HTMLElement;
  if (colgroup) {
    tableElem.removeChild(colgroup);
  }

  colgroup = renderColgroupFromNode(node) as HTMLElement;
  tableElem.insertBefore(colgroup, tableElem.firstChild);

  return colgroup.children;
};

export const hasTableBeenResized = (node: PmNode) => {
  return !!getFragmentBackingArray(node.content.firstChild!.content).find(
    cell => cell.attrs.colwidth,
  );
};
