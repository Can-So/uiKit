import * as React from 'react';
import { MouseEvent, Component } from 'react';
import * as cx from 'classnames';
import { MediaType } from '@atlaskit/media-core';
import TickIcon from '@atlaskit/icon/glyph/check';
import { Ellipsify } from '@atlaskit/media-ui';
// We dont require things directly from "utils" to avoid circular dependencies
import { FileIcon } from '../../fileIcon';
import { ErrorIcon } from '../../errorIcon';
import { Menu } from '../../menu';
import { CardAction, CardEventHandler } from '../../../actions';

import {
  TickBox,
  Overlay,
  ErrorLine,
  LeftColumn,
  TopRow,
  BottomRow,
  RightColumn,
  ErrorMessage,
  Retry,
  TitleWrapper,
  Subtitle,
  Metadata,
  ErrorWrapper,
} from './styled';

export interface CardOverlayProps {
  mediaType?: MediaType;
  mediaName?: string;
  subtitle?: string;

  selectable?: boolean;
  selected?: boolean;
  persistent: boolean;

  error?: string;
  onRetry?: () => void;

  actions?: Array<CardAction>;
  icon?: string;
}

export interface CardOverlayState {
  isMenuExpanded: boolean;
}

export class CardOverlay extends Component<CardOverlayProps, CardOverlayState> {
  static defaultProps = {
    actions: [],
    mediaName: '',
  };

  constructor(props: CardOverlayProps) {
    super(props);

    this.state = {
      isMenuExpanded: false,
    };
  }

  private get wrapperClassNames() {
    const { error, selectable, selected, mediaType, persistent } = this.props;
    const { isMenuExpanded } = this.state;

    return error
      ? cx('overlay', { error, active: isMenuExpanded })
      : cx('overlay', mediaType, {
          active: isMenuExpanded,
          selectable,
          selected,
          persistent: !persistent,
        });
  }

  render() {
    const { error, mediaName, persistent, actions } = this.props;
    const titleText = error || !mediaName ? '' : mediaName;
    const menuTriggerColor = !persistent ? 'white' : undefined;

    return (
      <Overlay hasError={!!error} className={this.wrapperClassNames}>
        <TopRow className={'top-row'}>
          {this.errorLine()}
          <TitleWrapper className={'title'}>
            <Ellipsify text={titleText} lines={2} />
          </TitleWrapper>
          {this.tickBox()}
        </TopRow>
        <BottomRow className={'bottom-row'}>
          <LeftColumn>{this.bottomLeftColumn()}</LeftColumn>
          <RightColumn>
            <Menu
              actions={actions}
              onToggle={this.onMenuToggle}
              triggerColor={menuTriggerColor}
            />
          </RightColumn>
        </BottomRow>
      </Overlay>
    );
  }

  errorLine() {
    const error = this.props.error;
    return (
      error && (
        <ErrorLine>
          <ErrorMessage>{this.props.error}</ErrorMessage>
        </ErrorLine>
      )
    );
  }

  tickBox() {
    const { selected, selectable } = this.props;
    const tick = <TickIcon label="tick" />;
    const className = cx('tickbox', { selected });

    return selectable && <TickBox className={className}> {tick} </TickBox>;
  }

  bottomLeftColumn() {
    const { error, onRetry } = this.props;

    if (error) {
      if (!onRetry) {
        return <ErrorIcon />;
      }

      return (
        <ErrorWrapper>
          <ErrorIcon />
          <Retry onClick={onRetry}>Retry</Retry>
        </ErrorWrapper>
      );
    } else {
      const { mediaType, subtitle, icon } = this.props;
      const classNames = cx('metadata');

      const fileIcon =
        mediaType || icon ? (
          <FileIcon mediaType={mediaType} iconUrl={icon} />
        ) : null;

      const subtitleEl = subtitle ? (
        <Subtitle className="file-size">{subtitle}</Subtitle>
      ) : null;

      return (
        <div>
          <Metadata className={classNames}>
            {fileIcon}
            {subtitleEl}
          </Metadata>
        </div>
      );
    }
  }

  onMenuToggle = (attrs: { isOpen: boolean }) => {
    this.setState({ isMenuExpanded: attrs.isOpen });
  };

  removeBtnClick(handler: CardEventHandler) {
    return (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      handler();
    };
  }
}
