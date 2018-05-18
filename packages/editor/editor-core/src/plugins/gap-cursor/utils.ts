import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { findPositionOfNodeBefore, findDomRefAtPos } from 'prosemirror-utils';
import { tableMarginTop, tableMarginBottom } from '@atlaskit/editor-common';

import { GapCursorSelection, Side } from './selection';

// we don't show gap cursor for those nodes
const INGORED_NODES = [
  'paragraph',
  'listItem',
  'taskItem',
  'decisionItem',
  'heading',
  'blockquote',
];

// Returns DOM node's vertical margin. It descents into the node and reads margins of nested DOM nodes
const getDomNodeVerticalMargin = (
  ref: HTMLElement | null,
  side: 'top' | 'bottom',
): number => {
  let margin = 0;
  while (ref && ref.nodeType === 1) {
    const css = window.getComputedStyle(ref);
    const curMargin = parseInt(css[`margin-${side}`], 10);
    if (curMargin > margin) {
      margin = curMargin;
    }
    ref = ref[side === 'top' ? 'firstChild' : 'lastChild'] as HTMLElement;
  }
  return margin;
};

export const isIgnored = (node?: PMNode | null): boolean => {
  if (!node) {
    return false;
  }
  return INGORED_NODES.indexOf(node.type.name) > -1;
};

const isMediaSingle = (node?: HTMLElement | null): boolean => {
  if (!node) {
    return false;
  }
  const firstChild = node.firstChild as HTMLElement;
  return (
    !!firstChild &&
    firstChild.nodeType === 1 &&
    firstChild.classList.contains('media-single')
  );
};

// incapsulated this hack into a separate util function
export const fixCursorAlignment = (view: EditorView) => {
  const { state: { selection, schema }, domAtPos } = view;
  const { side, $from } = selection as GapCursorSelection;

  // gap cursor is positioned relative to that node
  const targetNode = side === Side.LEFT ? $from.nodeAfter! : $from.nodeBefore!;
  if (!targetNode) {
    return;
  }
  const targetNodePos =
    side === Side.LEFT ? $from.pos + 1 : findPositionOfNodeBefore(selection)!;
  let targetNodeRef = findDomRefAtPos(
    targetNodePos,
    domAtPos.bind(view),
  ) as HTMLElement;

  const gapCursorRef = view.dom.querySelector(
    '.ProseMirror-gapcursor span',
  ) as HTMLElement;

  const gapCursorParentNodeRef = gapCursorRef.parentNode! as HTMLElement;
  const previousSibling = gapCursorParentNodeRef.previousSibling as HTMLElement;
  const firstChild = targetNodeRef.firstChild as HTMLElement;
  const isTargetNodeMediaSingle = isMediaSingle(targetNodeRef);
  const isMediaWithWrapping =
    isTargetNodeMediaSingle &&
    /wrap-[right|left]/i.test(targetNode.attrs.layout);
  const prevNodeMarginBottom = getDomNodeVerticalMargin(
    previousSibling,
    'bottom',
  );

  const minHeight = 20;
  let height = 0;
  let width = 0;
  let marginTop = 0;
  let breakoutWidth = 0;

  // gets width and height of the prevNode DOM element, or its nodeView wrapper DOM element
  do {
    const css = window.getComputedStyle(
      isTargetNodeMediaSingle ? firstChild : targetNodeRef,
    );
    const isInTableCell = /td|th/i.test(targetNodeRef.parentNode!.nodeName);

    height = parseInt(css['height']!, 10);
    width = parseInt(css['width']!, 10);

    if (previousSibling || isMediaWithWrapping || isInTableCell) {
      const curNodeMarginTop = getDomNodeVerticalMargin(targetNodeRef, 'top');
      if (curNodeMarginTop > prevNodeMarginBottom) {
        marginTop = curNodeMarginTop - prevNodeMarginBottom;
      }
      if (isMediaWithWrapping) {
        marginTop = curNodeMarginTop;
      }
    }

    if (/table/i.test(targetNodeRef.nodeName) || isTargetNodeMediaSingle) {
      breakoutWidth = width;
    }

    targetNodeRef = targetNodeRef.parentNode as HTMLElement;
  } while (targetNodeRef && !targetNodeRef.contains(gapCursorRef));

  // height of the rule (<hr>) is 0, that's why we set minHeight
  if (height < minHeight) {
    height = minHeight;
    marginTop -= Math.round(minHeight / 2) - 1;
  }

  // table nodeView margin fix
  if (targetNode.type === schema.nodes.table) {
    height -= tableMarginTop + tableMarginBottom;
    marginTop = tableMarginTop;
  }

  // breakout mode
  if (/full-width|wide/i.test(targetNode.attrs.layout)) {
    gapCursorRef.setAttribute('layout', targetNode.attrs.layout);
  }

  // mediaSingle with layout="wrap-left" or "wrap-right"
  if (isMediaWithWrapping) {
    gapCursorParentNodeRef.setAttribute('layout', targetNode.attrs.layout);
    if (targetNode.attrs.layout === 'wrap-right') {
      gapCursorRef.style.marginLeft = `-${width}px`;
    }
  }

  gapCursorRef.style.height = `${height}px`;
  gapCursorRef.style.marginTop = `${marginTop}px`;
  gapCursorRef.style.width = `${breakoutWidth || width}px`;
};
