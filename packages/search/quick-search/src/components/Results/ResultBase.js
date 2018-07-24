// @flow
import React, { PureComponent, type Component } from 'react';
import { QS_ANALYTICS_EV_SUBMIT } from '../constants';
import ResultItem from '../ResultItem/ResultItem';
import type { AnalyticsData, ResultType as Props } from './types';
import { ResultContext, SelectedResultIdContext } from '../context';

const BASE_RESULT_TYPE = 'base';

interface HasAnalyticsData {
  getAnalyticsData(): AnalyticsData;
}
export type ResultBaseType = Component<Props> & HasAnalyticsData;

// ==========================================================================================
// This class enforces a standard set of props and behaviour for all result types to support.
// All "-Result" components (PersonResult, ContainerResult, ObjectResult, etc.) should extend
// this class to ensure consideration of these props.
// ==========================================================================================

class ResultBase extends PureComponent<Props> implements HasAnalyticsData {
  static defaultProps = {
    isCompact: false,
    isSelected: false,
    onClick: () => {},
    type: BASE_RESULT_TYPE,
    context: {
      isDirty: false,
      registerResult: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
      sendAnalytics: () => {},
      getIndex: () => {},
    },
    analyticsData: {},
  };

  registerResult() {
    const { context } = this.props;

    if (context.isDirty === true) {
      context.registerResult(this);
    }
  }

  componentDidMount() {
    this.registerResult();
  }

  componentDidUpdate() {
    this.registerResult();
  }

  getAnalyticsData() {
    const { resultId, analyticsData, type, context } = this.props;
    return {
      index: context.getIndex(resultId),
      type,
      resultId,
      ...analyticsData,
    };
  }

  handleClick = (e: ?MouseEvent) => {
    const { onClick, resultId, type } = this.props;

    this.props.context.sendAnalytics(QS_ANALYTICS_EV_SUBMIT, {
      ...this.getAnalyticsData(),
      method: 'click',
      newTab: e && (e.metaKey || e.shiftKey || e.ctrlKey),
    });
    onClick({ resultId, type });
  };

  handleMouseEnter = () => {
    this.props.context.onMouseEnter({
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
      subText,
      text,
      resultId,
      context,
    } = this.props;

    return (
      <SelectedResultIdContext.Consumer>
        {selectedResultId => (
          <ResultItem
            caption={caption}
            href={href}
            target={target}
            icon={icon}
            isCompact={isCompact}
            isSelected={resultId === selectedResultId}
            onClick={this.handleClick}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={context.onMouseLeave}
            subText={subText}
            text={text}
            textAfter={elemAfter}
            linkComponent={context.linkComponent}
          />
        )}
      </SelectedResultIdContext.Consumer>
    );
  }
}

export default (props: Props) => (
  <ResultContext.Consumer>
    {context => <ResultBase context={context} {...props} />}
  </ResultContext.Consumer>
);
