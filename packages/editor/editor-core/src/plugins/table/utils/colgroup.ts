import { Node as PmNode, DOMSerializer } from 'prosemirror-model';
import { getFragmentBackingArray } from '../../../utils/slice';

export const generateColgroup = (node: PmNode) => {
  const cols: Array<string | { [attr: string]: string } | {}> = [];

  node.content.firstChild!.content.forEach(cell => {
    const colspan = cell.attrs.colspan || 1;
    if (Array.isArray(cell.attrs.colwidth)) {
      // We slice here to guard against our colwidth array having more entries
      // Than the we actually span. We'll patch the document at a later point.
      cell.attrs.colwidth.slice(0, colspan).forEach(width => {
        cols.push(['col', { style: `width: ${width}px;` }]);
      });
    } else {
      // When we have merged cells on the first row (firstChild),
      // We want to ensure we're creating the appropriate amount of
      // cols the table still has.
      cols.push(...Array.from({ length: colspan }, _ => ['col', {}]));
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
