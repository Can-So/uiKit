import memoizeOne from 'memoize-one';

export const getModalProps = memoizeOne(
  (width: string | number, target: Element) => ({
    searchThreshold: -1,
    controlShouldRenderValue: true,
    minMenuWidth: width,
    maxMenuWidth: width,
    autoFocus: false,
    target: target,
    menuIsOpen: true,
  }),
);
