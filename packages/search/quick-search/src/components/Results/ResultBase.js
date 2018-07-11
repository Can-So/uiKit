// @flow
import React, { PureComponent } from 'react';

import { QS_ANALYTICS_EV_SUBMIT } from '../constants';
import ResultItem from '../ResultItem/ResultItem';

import type { ResultType as Props } from './types';

const BASE_RESULT_TYPE = 'base';

// ==========================================================================================
// This class enforces a standard set of props and behaviour for all result types to support.
// All "-Result" components (PersonResult, ContainerResult, ObjectResult, etc.) should extend
// this class to ensure consideration of these props.
// ==========================================================================================

export default class ResultBase extends PureComponent<Props> {
  static defaultProps = {
    isCompact: false,
    isSelected: false,
    onClick: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    sendAnalytics: () => {},
    type: BASE_RESULT_TYPE,
  };

  handleClick = (e: ?MouseEvent) => {
    const {
      analyticsData,
      onClick,
      resultId,
      sendAnalytics,
      type,
      contentType,
    } = this.props;
    sendAnalytics(QS_ANALYTICS_EV_SUBMIT, {
      ...analyticsData,
      method: 'click',
      resultId,
      contentType,
      type,
      newTab: e && (e.metaKey || e.shiftKey || e.ctrlKey),
    });
    onClick({ resultId, type });
  };

  handleMouseEnter = () => {
    this.props.onMouseEnter({
      resultId: this.props.resultId,
      type: this.props.type,
    });
  };

  render() {
    const {
      caption,
      elemAfter,
      href,
      target,
      icon,
      isCompact,
      isSelected,
      onMouseLeave,
      text,
      subText,
      linkComponent,
    } = this.props;

    return (
      <ResultItem
        caption={caption}
        href={href}
        target={target}
        icon={icon}
        isCompact={isCompact}
        isSelected={isSelected}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={onMouseLeave}
        subText={subText}
        text={text}
        textAfter={elemAfter}
        linkComponent={linkComponent}
      />
    );
  }
}
