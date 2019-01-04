export interface Position {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface CalculatePositionParams {
  placement: [string, string];
  target?: HTMLElement;
  popup?: HTMLElement;
  offset: number[];
  stickToBottom?: boolean;
}

export function isBody(elem: HTMLElement | Element): boolean {
  return elem === document.body;
}

export function isTextNode(elem: HTMLElement | Element): boolean {
  return elem && elem.nodeType === 3;
}

/**
 * Decides if given fitHeight fits below or above the target taking boundaries into account.
 */
export function getVerticalPlacement(
  target: HTMLElement,
  boundariesElement: HTMLElement,
  fitHeight?: number,
  alignY?: string,
): string {
  if (alignY) {
    return alignY;
  }

  if (!fitHeight) {
    return 'bottom';
  }

  if (isTextNode(target)) {
    target = target.parentElement!;
  }

  const boundariesClientRect = boundariesElement.getBoundingClientRect();
  const { height: boundariesHeight } = boundariesClientRect;
  const boundariesTop = isBody(boundariesElement)
    ? 0
    : boundariesClientRect.top;

  const {
    top: targetTop,
    height: targetHeight,
  } = target.getBoundingClientRect();
  const spaceAbove = targetTop - (boundariesTop - boundariesElement.scrollTop);
  const spaceBelow =
    boundariesTop + boundariesHeight - (targetTop + targetHeight);

  if (spaceBelow >= fitHeight || spaceBelow >= spaceAbove) {
    return 'bottom';
  }

  return 'top';
}

/**
 * Decides if given fitWidth fits to the left or to the right of the target taking boundaries into account.
 */
export function getHorizontalPlacement(
  target: HTMLElement,
  boundariesElement: HTMLElement,
  fitWidth?: number,
  alignX?: string,
): string {
  if (alignX) {
    return alignX;
  }

  if (!fitWidth) {
    return 'left';
  }

  if (isTextNode(target)) {
    target = target.parentElement!;
  }

  const {
    left: targetLeft,
    width: targetWidth,
  } = target.getBoundingClientRect();
  const {
    left: boundariesLeft,
    width: boundariesWidth,
  } = boundariesElement.getBoundingClientRect();
  const spaceLeft = targetLeft - boundariesLeft + targetWidth;
  const spaceRight = boundariesLeft + boundariesWidth - targetLeft;

  if (spaceRight >= fitWidth || spaceRight >= spaceLeft) {
    return 'left';
  }

  return 'right';
}

export function calculatePlacement(
  target: HTMLElement,
  boundariesElement: HTMLElement,
  fitWidth?: number,
  fitHeight?: number,
  alignX?: string,
  alignY?: string,
): [string, string] {
  return [
    getVerticalPlacement(target, boundariesElement, fitHeight, alignY),
    getHorizontalPlacement(target, boundariesElement, fitWidth, alignX),
  ];
}

const calculateHorizontalPlacement = ({
  placement,
  targetLeft,
  targetRight,
  targetWidth,

  isPopupParentBody,
  popupOffsetParentLeft,
  popupOffsetParentRight,
  popupOffsetParentScrollLeft,

  popupClientWidth,
  offset,
}): Position => {
  const position = {} as Position;

  if (placement === 'left') {
    position.left = Math.ceil(
      targetLeft -
        popupOffsetParentLeft +
        (isPopupParentBody ? 0 : popupOffsetParentScrollLeft) +
        offset[0],
    );
  } else if (placement === 'center') {
    position.left = Math.ceil(
      targetLeft -
        popupOffsetParentLeft +
        (isPopupParentBody ? 0 : popupOffsetParentScrollLeft) +
        offset[0] +
        targetWidth / 2 -
        popupClientWidth / 2,
    );
  } else {
    position.right = Math.ceil(
      popupOffsetParentRight -
        targetRight -
        (isPopupParentBody ? 0 : popupOffsetParentScrollLeft) +
        offset[0],
    );
  }

  return position;
};

const calculateVerticalStickBottom = ({
  target,
  targetTop,
  targetHeight,

  popup,
  offset,
  position,
}): Position => {
  const scrollParent = findOverflowScrollParent(target);

  if (scrollParent) {
    let topOffsetTop = targetTop - scrollParent.getBoundingClientRect().top;
    let targetEnd = targetHeight + topOffsetTop;
    if (
      scrollParent.clientHeight - targetEnd <=
        popup.clientHeight + offset[1] * 2 &&
      topOffsetTop < scrollParent.clientHeight
    ) {
      const scroll = targetEnd - scrollParent.clientHeight + offset[1] * 2;
      let top = position.top || 0;
      top = top - (scroll + popup.clientHeight);

      position.top = top;
    }
  }

  return position;
};

const calculateVerticalPlacement = ({
  placement,
  targetTop,
  targetHeight,

  isPopupParentBody,

  popupOffsetParentHeight,
  popupOffsetParentTop,
  popupOffsetParentScrollTop,

  borderBottomWidth,
  offset,
}): Position => {
  const position = {} as Position;

  if (placement === 'top') {
    position.bottom = Math.ceil(
      popupOffsetParentHeight -
        (targetTop - popupOffsetParentTop) -
        (isPopupParentBody ? 0 : popupOffsetParentScrollTop) -
        borderBottomWidth +
        offset[1],
    );
  } else {
    let top = Math.ceil(
      targetTop -
        popupOffsetParentTop +
        targetHeight +
        (isPopupParentBody ? 0 : popupOffsetParentScrollTop) -
        borderBottomWidth +
        offset[1],
    );
    position.top = top;
  }

  return position;
};

/**
 * Calculates relative coordinates for placing popup along with the target.
 * Uses placement from calculatePlacement.
 */
export function calculatePosition({
  placement,
  target,
  popup,
  offset,
  stickToBottom,
}: CalculatePositionParams): Position {
  let position: Position = {};

  if (!target || !popup || !popup.offsetParent) {
    return position;
  }

  if (isTextNode(target)) {
    target = target.parentElement!;
  }

  const popupOffsetParent = popup.offsetParent as HTMLElement;
  const offsetParentStyle = popupOffsetParent.style;
  let borderBottomWidth = 0;
  if (offsetParentStyle && offsetParentStyle.borderBottomWidth) {
    borderBottomWidth = parseInt(offsetParentStyle.borderBottomWidth, 10);
  }
  const [verticalPlacement, horizontalPlacement] = placement;

  const {
    top: popupOffsetParentTop,
    left: popupOffsetParentLeft,
    right: popupOffsetParentRight,
    height: popupOffsetParentHeight,
  } = popupOffsetParent.getBoundingClientRect();

  const {
    top: targetTop,
    left: targetLeft,
    right: targetRight,
    height: targetHeight,
    width: targetWidth,
  } = target.getBoundingClientRect();

  const isPopupParentBody = isBody(popupOffsetParent);

  const verticalPosition = calculateVerticalPlacement({
    placement: verticalPlacement,
    targetTop,
    isPopupParentBody,
    popupOffsetParentHeight,
    popupOffsetParentTop,
    popupOffsetParentScrollTop: popupOffsetParent.scrollTop || 0,
    targetHeight,
    borderBottomWidth,
    offset,
  });

  position = Object.assign({}, position, verticalPosition);

  if (verticalPlacement !== 'top' && stickToBottom) {
    const verticalStickToBottomPosition = calculateVerticalStickBottom({
      target,
      targetTop,
      targetHeight,
      popup,
      offset,
      position,
    });

    position = Object.assign({}, position, verticalStickToBottomPosition);
  }

  const horizontalPosition = calculateHorizontalPlacement({
    placement: horizontalPlacement,
    targetLeft,
    targetRight,
    targetWidth,
    isPopupParentBody,
    popupOffsetParentLeft,
    popupOffsetParentRight,
    popupOffsetParentScrollLeft: popupOffsetParent.scrollLeft || 0,
    popupClientWidth: popup.clientWidth || 0,
    offset,
  });

  position = Object.assign({}, position, horizontalPosition);

  return position;
}

/**
 * Traverse DOM Tree upwards looking for popup parents with "overflow: scroll".
 */
export function findOverflowScrollParent(
  popup: HTMLElement | null,
): HTMLElement | false {
  let parent: HTMLElement | null = popup;

  if (!parent) {
    return false;
  }

  while ((parent = parent.parentElement)) {
    // IE11 on Window 8 doesn't show styles from CSS when accessing through element.style property.
    const style = window.getComputedStyle(parent);
    if (
      style.overflow === 'scroll' ||
      style.overflowX === 'scroll' ||
      style.overflowY === 'scroll' ||
      parent.classList.contains('fabric-editor-popup-scroll-parent')
    ) {
      return parent;
    }
  }

  return false;
}
