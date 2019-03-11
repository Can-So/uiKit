import memoizeOne from 'memoize-one';

export const getModalProps = memoizeOne(
  (
    width: string | number,
    target: (ref: any) => Element,
    onFlip: Function,
  ) => ({
    searchThreshold: -1,
    controlShouldRenderValue: true,
    minMenuWidth: width,
    maxMenuWidth: width,
    autoFocus: false,
    target: target,
    popperProps: {
      modifiers: {
        handleFlipStyle: {
          enabled: true,
          order: 910,
          fn: (data: any) => onFlip(data),
        },
        preventOverflow: {
          boundariesElement: 'viewport',
        },
      },
    },
  }),
);
