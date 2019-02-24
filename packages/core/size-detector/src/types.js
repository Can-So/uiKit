// @flow
import type { Node } from 'react';

export type SizeDetectorPropType = {
  /** Function that accepts an object parameter containing 'height' and 'width' properties */
  children: SizeDetectorSizeMetrics => Node,
  /** Optional styles object to be applied to the containing element */
  containerStyle?: Object,
  /** Called when the component is resized. */
  onResize?: SizeDetectorSizeMetrics => void,
};

export type SizeDetectorSizeMetricsType = {
  width: ?number,
  height: ?number,
};
