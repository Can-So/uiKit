export const snapTo = (target: number, points: number[]): number =>
  points.reduce((point, closest) => {
    return Math.abs(closest - target) < Math.abs(point - target)
      ? closest
      : point;
  });

export const handleSides: Array<'left' | 'right'> = ['left', 'right'];

export const alignmentLayouts = [
  'align-start',
  'align-end',
  'wrap-left',
  'wrap-right',
];

export const imageAlignmentMap = {
  left: 'start',
  right: 'end',
};
