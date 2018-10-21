import * as React from 'react';
import { ContainerWrapper } from './styled';
import { Vector2 } from '@atlaskit/media-ui';

export interface ContainerProps {
  width: number;
  height: number;
  margin: number;
  onDragStart: () => void;
  onDragMove: (delta: Vector2) => void;
  onWheel: (delta: number) => void;
}

export class Container extends React.Component<ContainerProps, {}> {
  dragClientStart?: Vector2;

  componentWillMount() {
    if (this.isTouch) {
      document.addEventListener('touchmove', this.onTouchMove);
      document.addEventListener('touchend', this.onMouseUp);
      document.addEventListener('touchcancel', this.onMouseUp);
    } else {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    }
  }

  get isTouch() {
    return typeof window.ontouchstart !== 'undefined';
  }

  private getFirstTouchEvent(e: any): Touch | null {
    if (e.touches && e.touches.length >= 1) {
      return e.touches[0];
    }
    return null;
  }

  onMouseDown = (e: any) => {
    if (e.which === 3) {
      return;
    }
    this.dragClientStart = new Vector2(e.clientX, e.clientY);
    this.props.onDragStart();
  };

  onTouchStart = (e: any) => {
    const touch = this.getFirstTouchEvent(e);
    if (touch) {
      this.dragClientStart = new Vector2(touch.clientX, touch.clientY);
      this.props.onDragStart();
    }
  };

  onMouseMove = (e: any) => {
    const { dragClientStart } = this;
    if (dragClientStart) {
      const delta = new Vector2(
        e.clientX - dragClientStart.x,
        e.clientY - dragClientStart.y,
      );
      this.props.onDragMove(delta);
    }
  };

  onTouchMove = (e: any) => {
    const { dragClientStart } = this;
    const touch = this.getFirstTouchEvent(e);
    if (touch && dragClientStart) {
      const delta = new Vector2(
        touch.clientX - dragClientStart.x,
        touch.clientY - dragClientStart.y,
      );
      this.props.onDragMove(delta);
    }
  };

  onMouseUp = () => {
    delete this.dragClientStart;
  };

  onWheel = (e: any) => {
    this.props.onWheel(e.deltaY);
  };

  render() {
    const isTouch = this.isTouch;
    const { width, height, children, margin } = this.props;
    const onMouseDown = isTouch ? undefined : this.onMouseDown;
    const onTouchStart = isTouch ? this.onTouchStart : undefined;

    return (
      <ContainerWrapper
        width={width}
        height={height}
        margin={margin}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onWheel={this.onWheel}
      >
        {children}
      </ContainerWrapper>
    );
  }
}
