import * as React from 'react';
import { RefObject } from 'react';
import * as classnames from 'classnames';
import { MediaSingleLayout } from '@atlaskit/adf-schema';
import {
  calcColumnsFromPx,
  akEditorWideLayoutWidth,
} from '@atlaskit/editor-common';
import { Props, EnabledHandles } from './types';

import Resizable from 're-resizable';
import { ResizableDirection, NumberSize } from 're-resizable';

import { gridTypeForLayout } from '../../../grid';

export const handleSides = ['left', 'right'];
export const alignementLayouts = [
  'align-start',
  'align-end',
  'wrap-left',
  'wrap-right',
];

const snapTo = (target: number, points: number[]): number =>
  points.reduce((point, closest) => {
    return Math.abs(closest - target) < Math.abs(point - target)
      ? closest
      : point;
  });

type ResizerProps = Props & {
  selected: boolean;
  enable: EnabledHandles;
  calcNewSize: (
    newWidth: number,
    stop: boolean,
  ) => { layout: MediaSingleLayout; width: number | null };
  snapPoints: number[];
  scaleFactor?: number;
  getColumnLeft: () => number;
  isInlineLike: boolean;
};
type ResizerState = {
  isResizing: boolean;
};
export default class Resizer extends React.Component<
  ResizerProps,
  ResizerState
> {
  resizable: RefObject<Resizable>;
  state = {
    isResizing: false,
  };

  constructor(props: ResizerProps) {
    super(props);
    this.resizable = React.createRef();
  }

  handleResizeStart = () => {
    this.setState({ isResizing: true }, () => {
      this.props.displayGrid(
        true,
        gridTypeForLayout(this.props.layout),
        this.highlights(this.props.width),
      );
    });
  };

  handleResize = (
    event: MouseEvent | TouchEvent,
    direction: ResizableDirection,
    elementRef: HTMLDivElement,
    delta: NumberSize,
  ) => {
    const resizable = this.resizable.current;
    if (!resizable || !resizable.state.original) {
      return;
    }

    const newWidth = Math.max(
      resizable.state.original.width +
        delta.width * (this.props.scaleFactor || 1),
      this.props.snapPoints[0],
    );

    const newSize = this.props.calcNewSize(newWidth, false);
    if (newSize.layout !== this.props.layout) {
      this.props.updateSize(newSize.width, newSize.layout);
    }

    this.props.displayGrid(
      true,
      gridTypeForLayout(newSize.layout),
      this.highlights(newWidth),
    );
    resizable.updateSize({ width: newWidth, height: 'auto' });
  };

  highlights = newWidth => {
    const snapWidth = snapTo(newWidth, this.props.snapPoints);

    if (snapWidth > akEditorWideLayoutWidth) {
      return ['full-width'];
    }

    const columns = calcColumnsFromPx(
      snapWidth,
      this.props.lineLength,
      this.props.gridSize,
    );
    const columnWidth = Math.round(columns);

    const highlight: number[] = [];
    if (
      this.props.layout === 'wrap-left' ||
      this.props.layout === 'align-start'
    ) {
      highlight.push(0);
      highlight.push(columnWidth);
    } else if (
      this.props.layout === 'wrap-right' ||
      this.props.layout === 'align-end'
    ) {
      highlight.push(this.props.gridSize);
      highlight.push(this.props.gridSize - columnWidth);
    } else if (this.props.isInlineLike) {
      highlight.push(this.props.getColumnLeft() + Math.ceil(columns));
    } else {
      highlight.push(Math.floor((this.props.gridSize - columnWidth) / 2));
      highlight.push(Math.ceil((this.props.gridSize + columnWidth) / 2));
    }

    return highlight;
  };

  handleResizeStop = (
    event,
    direction,
    refToElement,
    delta: { width: number; height: number },
  ) => {
    const resizable = this.resizable.current;
    if (!resizable || !resizable.state.original) {
      return;
    }

    const newWidth = Math.max(
      resizable.state.original.width + delta.width,
      this.props.snapPoints[0],
    );

    const snapWidth = snapTo(newWidth, this.props.snapPoints);
    const newSize = this.props.calcNewSize(snapWidth, true);

    // show committed grid size
    this.props.displayGrid(
      true,
      gridTypeForLayout(newSize.layout),
      this.highlights(newWidth),
    );

    this.setState({ isResizing: false }, () => {
      this.props.updateSize(newSize.width, newSize.layout);
      this.props.displayGrid(false, gridTypeForLayout(this.props.layout));
    });
  };

  render() {
    /** equivalent to `calc: (50% - 12px)` from 40:MediaSingle/styled.ts */
    const halfSize = this.props.lineLength * 0.5 - 12;
    const shouldHalfSize =
      alignementLayouts.indexOf(this.props.layout) > -1 &&
      this.props.width > this.props.lineLength;
    const handleStyles = {};
    const handles = {};
    handleSides.forEach(side => {
      handles[side] = `mediaSingle-resize-handle-${side}`;
      handleStyles[side] = {
        width: '24px',
        [side]: '-13px',
        zIndex: 99,
      };
    });

    // Ideally, Resizable would let you pass in the component rather than
    // the div. For now, we just apply the same styles using CSS
    return (
      <Resizable
        ref={this.resizable}
        onResize={this.handleResize}
        size={{
          width: shouldHalfSize ? halfSize : this.props.width || 0,
        }}
        className={classnames(
          'media-single',
          `image-${this.props.layout}`,
          this.props.className,
          {
            'is-resizing': this.state.isResizing,
            'not-resized': !this.props.pctWidth,
            'mediaSingle-selected': this.props.selected,
            'media-wrapped':
              this.props.layout === 'wrap-left' ||
              this.props.layout === 'wrap-right',
          },
        )}
        handleWrapperClass={'mediaSingle-resize-wrapper'}
        handleClasses={handles}
        handleStyles={handleStyles}
        enable={this.props.enable}
        onResizeStop={this.handleResizeStop}
        onResizeStart={this.handleResizeStart}
      >
        {this.props.children}
      </Resizable>
    );
  }
}
