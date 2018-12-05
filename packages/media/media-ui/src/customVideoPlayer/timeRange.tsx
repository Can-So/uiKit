import * as React from 'react';
import { Component } from 'react';
import {
  TimeLine,
  CurrentTimeLine,
  Thumb,
  BufferedTime,
  CurrentTimeTooltip,
  TimeRangeWrapper,
} from './styled';
import { formatDuration } from '../formatDuration';

export interface TimeRangeProps {
  currentTime: number;
  bufferedTime: number;
  duration: number;
  onChange: (newTime: number) => void;
  disableThumbTooltip: boolean;
  isAlwaysActive: boolean;
}

export interface TimeRangeState {
  isHovering: boolean;
  isDragging: boolean;
}

export class TimeRange extends Component<TimeRangeProps, TimeRangeState> {
  wrapperElement?: HTMLElement;
  thumbElement?: HTMLElement;

  wrapperElementWidth: number = 0;

  state: TimeRangeState = {
    isDragging: false,
    isHovering: false,
  };

  static defaultProps: Partial<TimeRangeProps> = {
    disableThumbTooltip: false,
    isAlwaysActive: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.setWrapperWidth);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('resize', this.setWrapperWidth);
  }

  private setWrapperWidth = () => {
    if (!this.wrapperElement) {
      return;
    }

    this.wrapperElementWidth = this.wrapperElement.getBoundingClientRect().width;
  };

  onMouseMove = (e: MouseEvent) => {
    const { isDragging } = this.state;
    if (!isDragging) {
      return;
    }
    e.stopPropagation();

    const { currentTime, onChange, duration } = this.props;
    const { movementX } = e;
    const movementPercentage =
      (Math.abs(movementX) * duration) / this.wrapperElementWidth;
    const newTime =
      currentTime + (movementX > 0 ? movementPercentage : -movementPercentage);
    const newTimeWithBoundaries = Math.min(Math.max(newTime, 0), duration);

    onChange(newTimeWithBoundaries);
  };

  onMouseUp = () => {
    // As soon as user finished dragging, we should clean up events.
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);
    this.setState({
      isDragging: false,
    });
  };

  onThumbMouseDown = (e: React.SyntheticEvent<HTMLDivElement>) => {
    // We need to recalculate every time, because width can change (thanks, editor ;-)
    this.setWrapperWidth();

    // We are implementing drag and drop here. There is no reason to start listening for mouseUp or move
    // before that. Also if we start listening for mouseup before that we could pick up someone else's event
    // For example editors resizing of a inline video player.
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', this.onMouseMove);

    const { duration, onChange } = this.props;
    const event = e.nativeEvent as MouseEvent;
    const x = event.offsetX;
    const currentTime = (x * duration) / this.wrapperElementWidth;

    this.setState({
      isDragging: true,
    });

    // As soon as user clicks timeline we want to move thumb over to that place.
    onChange(currentTime);
  };

  private saveWrapperElement = (el?: HTMLElement) => {
    if (el) {
      this.wrapperElement = el;
      this.setWrapperWidth();
    }
  };

  private saveThumbElement = (el?: HTMLElement) => {
    if (el) {
      this.thumbElement = el;
    }
  };

  private setIsHovering = (isHovering: boolean) => () => {
    this.setState({ isHovering });
  };

  render() {
    const { isDragging, isHovering } = this.state;
    const {
      currentTime,
      duration,
      bufferedTime,
      disableThumbTooltip,
      isAlwaysActive,
    } = this.props;
    const currentPosition = (currentTime * 100) / duration;
    const bufferedTimePercentage = (bufferedTime * 100) / duration;

    return (
      <TimeRangeWrapper
        onMouseDown={this.onThumbMouseDown}
        onMouseEnter={this.setIsHovering(true)}
        onMouseLeave={this.setIsHovering(false)}
      >
        <TimeLine
          innerRef={this.saveWrapperElement}
          showAsActive={isHovering || isAlwaysActive}
        >
          <BufferedTime style={{ width: `${bufferedTimePercentage}%` }} />
          <CurrentTimeLine style={{ width: `${currentPosition}%` }}>
            <Thumb
              innerRef={this.saveThumbElement}
              showAsActive={isHovering || isAlwaysActive}
            >
              {disableThumbTooltip ? null : (
                <CurrentTimeTooltip
                  draggable={false}
                  isDragging={isDragging}
                  className="current-time-tooltip"
                >
                  {formatDuration(currentTime)}
                </CurrentTimeTooltip>
              )}
            </Thumb>
          </CurrentTimeLine>
        </TimeLine>
      </TimeRangeWrapper>
    );
  }
}
