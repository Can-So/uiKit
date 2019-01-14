import * as React from 'react';
import { findParentNodeOfTypeClosestToPos } from 'prosemirror-utils';
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
import Resizer, { handleSides } from './Resizer';
import { fileStreamsCache } from '@atlaskit/media-core';

const imageAlignmentMap = {
  left: 'start',
  right: 'end',
};

export default class ResizableMediaSingle extends React.Component<Props> {
  state = {
    // We default to true until we resolve the file type
    isVideoFile: true,
  };

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
    const $pos = this.$pos;
    if (!$pos) {
      return;
    }

    const getMediaNode = this.props.state.doc.nodeAt($pos.pos + 1);
    // TODO: use mediaContext don't use fileStreamsCache directly
    const state = await fileStreamsCache.getCurrentState(
      getMediaNode!.attrs.id,
    );
    if (state.status !== 'error' && state.mediaType === 'image') {
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

    return this.props.state.doc.resolve(pos);
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
      const pm = document.querySelector('.ProseMirror')! as HTMLElement;

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

  calcColumnLeft = () => {
    const offsetLeft = this.calcOffsetLeft();
    return this.insideInlineLike
      ? Math.floor(
          calcColumnsFromPx(
            offsetLeft,
            this.props.lineLength,
            this.props.gridSize,
          ),
        )
      : 0;
  };

  wrapper: HTMLElement | null;
  get snapPoints() {
    const offsetLeft = this.calcOffsetLeft();

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

    const { table, listItem } = this.props.state.schema.nodes;
    return !!findParentNodeOfTypeClosestToPos($pos, [table, listItem]);
  }

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
          snapPoints={this.snapPoints}
          scaleFactor={!this.wrappedLayout && !this.insideInlineLike ? 2 : 1}
          isInlineLike={this.insideInlineLike}
          getColumnLeft={this.calcColumnLeft}
        >
          {this.props.children}
        </Resizer>
      </Wrapper>
    );
  }
}
