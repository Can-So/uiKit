import * as React from 'react';
import { findParentNodeOfTypeClosestToPos } from 'prosemirror-utils';
import { Context } from '@atlaskit/media-core';
import { MediaSingleLayout } from '@atlaskit/adf-schema';
import {
  akEditorWideLayoutWidth,
  calcPxFromColumns,
  calcPctFromPx,
  calcPxFromPct,
  akEditorBreakoutPadding,
  calcColumnsFromPx,
  breakoutWideScaleRatio,
} from '@atlaskit/editor-common';

import { Wrapper } from './styled';
import { Props, EnabledHandles } from './types';
import Resizer from './Resizer';
import {
  snapTo,
  handleSides,
  imageAlignmentMap,
  alignmentLayouts,
} from './utils';

type State = {
  offsetLeft: number;
  isVideoFile: boolean;
};

export default class ResizableMediaSingle extends React.Component<
  Props,
  State
> {
  state = {
    offsetLeft: this.calcOffsetLeft(),

    // We default to true until we resolve the file type
    isVideoFile: true,
  };

  componentDidUpdate() {
    const offsetLeft = this.calcOffsetLeft();
    if (offsetLeft !== this.state.offsetLeft && offsetLeft >= 0) {
      this.setState({ offsetLeft });
    }

    return true;
  }

  get wrappedLayout() {
    const { layout } = this.props;
    return (
      layout === 'wrap-left' ||
      layout === 'wrap-right' ||
      layout === 'align-start' ||
      layout === 'align-end'
    );
  }

  async componentDidMount() {
    const { viewContext } = this.props;
    if (viewContext) {
      this.checkVideoFile(viewContext);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.viewContext !== nextProps.viewContext) {
      this.checkVideoFile(nextProps.viewContext);
    }
  }

  async checkVideoFile(viewContext?: Context) {
    const $pos = this.$pos;
    if (!$pos || !viewContext) {
      return;
    }
    const getMediaNode = this.props.state.doc.nodeAt($pos.pos + 1);
    const state = await viewContext.file.getCurrentState(
      getMediaNode!.attrs.id,
    );
    if (state && state.status !== 'error' && state.mediaType === 'image') {
      this.setState({
        isVideoFile: false,
      });
    }
  }

  calcNewSize = (newWidth: number, stop: boolean) => {
    const { layout } = this.props;

    const newPct = calcPctFromPx(newWidth, this.props.lineLength) * 100;

    if (newPct <= 100) {
      let newLayout: MediaSingleLayout;
      if (this.wrappedLayout && (stop ? newPct !== 100 : true)) {
        newLayout = layout;
      } else {
        newLayout = 'center';
      }

      return {
        width: newPct,
        layout: newLayout,
      };
    } else {
      // wide or full-width
      const newLayout: MediaSingleLayout =
        newWidth <= akEditorWideLayoutWidth ? 'wide' : 'full-width';

      return {
        width: this.props.pctWidth || null,
        layout: newLayout,
      };
    }
  };

  get $pos() {
    const pos = this.props.getPos();
    if (Number.isNaN(pos as any) || typeof pos !== 'number') {
      return null;
    }

    // need to pass view because we may not get updated props in time
    return this.props.view.state.doc.resolve(pos);
  }

  /**
   * The maxmimum number of grid columns this node can resize to.
   */
  get gridWidth() {
    const { gridSize } = this.props;
    return !(this.wrappedLayout || this.insideInlineLike)
      ? gridSize / 2
      : gridSize;
  }

  calcOffsetLeft() {
    let offsetLeft = 0;

    if (this.wrapper && this.insideInlineLike) {
      let currentNode: HTMLElement | null = this.wrapper;
      const pm = this.props.view.dom as HTMLElement;

      while (
        currentNode &&
        currentNode.parentElement &&
        !currentNode.parentElement.classList.contains('ProseMirror') &&
        currentNode !== document.body
      ) {
        offsetLeft += currentNode.offsetLeft;
        currentNode = currentNode.parentElement;
      }

      offsetLeft -= pm.offsetLeft;
    }

    return offsetLeft;
  }

  calcColumnLeftOffset = () => {
    const { offsetLeft } = this.state;
    return this.insideInlineLike
      ? calcColumnsFromPx(
          offsetLeft,
          this.props.lineLength,
          this.props.gridSize,
        )
      : 0;
  };

  wrapper: HTMLElement | null;
  calcSnapPoints() {
    const { offsetLeft } = this.state;

    const { containerWidth, lineLength, appearance } = this.props;
    const snapTargets: number[] = [];
    for (let i = 0; i < this.gridWidth; i++) {
      snapTargets.push(
        calcPxFromColumns(i, lineLength, this.gridWidth) - offsetLeft,
      );
    }
    // full width
    snapTargets.push(lineLength - offsetLeft);

    const minimumWidth = calcPxFromColumns(
      this.wrappedLayout || this.insideInlineLike ? 1 : 2,
      lineLength,
      this.props.gridSize,
    );

    let snapPoints = snapTargets.filter(width => width >= minimumWidth);
    const $pos = this.$pos;
    if (!$pos) {
      return snapPoints;
    }

    const { isVideoFile } = this.state;

    snapPoints = isVideoFile
      ? snapPoints.filter(width => width > 320)
      : snapPoints;

    const isTopLevel = $pos.parent.type.name === 'doc';
    if (isTopLevel && appearance === 'full-page') {
      snapPoints.push(akEditorWideLayoutWidth);
      const fullWidthPoint = containerWidth - akEditorBreakoutPadding;
      if (fullWidthPoint > akEditorWideLayoutWidth) {
        snapPoints.push(fullWidthPoint);
      }
    }

    return snapPoints;
  }

  get insideInlineLike(): boolean {
    const $pos = this.$pos;
    if (!$pos) {
      return false;
    }

    const { table, listItem } = this.props.view.state.schema.nodes;
    return !!findParentNodeOfTypeClosestToPos($pos, [table, listItem]);
  }

  highlights = (newWidth: number, snapPoints: number[]) => {
    const snapWidth = snapTo(newWidth, snapPoints);

    if (snapWidth > akEditorWideLayoutWidth) {
      return ['full-width'];
    }

    const { layout, lineLength, gridSize } = this.props;
    const columns = calcColumnsFromPx(snapWidth, lineLength, gridSize);
    const columnWidth = Math.round(columns);
    const highlight: number[] = [];

    if (layout === 'wrap-left' || layout === 'align-start') {
      highlight.push(0, columnWidth);
    } else if (layout === 'wrap-right' || layout === 'align-end') {
      highlight.push(gridSize, gridSize - columnWidth);
    } else if (this.insideInlineLike) {
      highlight.push(Math.round(columns + this.calcColumnLeftOffset()));
    } else {
      highlight.push(
        Math.floor((gridSize - columnWidth) / 2),
        Math.ceil((gridSize + columnWidth) / 2),
      );
    }

    return highlight;
  };

  render() {
    const {
      width: origWidth,
      height: origHeight,
      layout,
      pctWidth,
      lineLength,
      containerWidth,
    } = this.props;

    let pxWidth = origWidth;
    if (layout === 'wide') {
      const wideWidth = lineLength * breakoutWideScaleRatio;
      pxWidth = wideWidth > containerWidth ? lineLength : wideWidth;
    } else if (layout === 'full-width') {
      pxWidth = containerWidth - akEditorBreakoutPadding;
    } else if (pctWidth && origWidth && origHeight) {
      pxWidth = Math.ceil(
        calcPxFromPct(pctWidth / 100, lineLength || containerWidth),
      );
    } else if (layout === 'center') {
      pxWidth = Math.min(origWidth, lineLength);
    } else if (alignmentLayouts.indexOf(layout) !== -1) {
      pxWidth = Math.min(origWidth / 2, lineLength);
    }

    // scale, keeping aspect ratio
    const height = (origHeight / origWidth) * pxWidth;
    const width = pxWidth;

    const enable: EnabledHandles = {};
    handleSides.forEach(side => {
      const oppositeSide = side === 'left' ? 'right' : 'left';
      enable[side] =
        ['full-width', 'wide', 'center']
          .concat(`wrap-${oppositeSide}` as MediaSingleLayout)
          .concat(`align-${
            imageAlignmentMap[oppositeSide]
          }` as MediaSingleLayout)
          .indexOf(layout) > -1;

      if (side === 'left' && this.insideInlineLike) {
        enable[side] = false;
      }
    });

    return (
      <Wrapper
        width={width}
        height={height}
        layout={layout}
        containerWidth={containerWidth || origWidth}
        innerRef={elem => (this.wrapper = elem)}
      >
        <Resizer
          {...this.props}
          width={width}
          height={height}
          selected={this.props.selected}
          enable={enable}
          calcNewSize={this.calcNewSize}
          snapPoints={this.calcSnapPoints()}
          scaleFactor={!this.wrappedLayout && !this.insideInlineLike ? 2 : 1}
          highlights={this.highlights}
        >
          {this.props.children}
        </Resizer>
      </Wrapper>
    );
  }
}
