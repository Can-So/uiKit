// @flow
import React, { PureComponent } from 'react';
import { QS_ANALYTICS_EV_SUBMIT } from '../constants';
import ResultItem from '../ResultItem/ResultItem';
import type { ResultType as Props } from './types';
import { ResultContext, SelectedResultIdContext } from '../context';

const BASE_RESULT_TYPE = 'base';

// ==========================================================================================
// This class enforces a standard set of props and behaviour for all result types to support.
// All "-Result" components (PersonResult, ContainerResult, ObjectResult, etc.) should extend
// this class to ensure consideration of these props.
// ==========================================================================================

class ResultBase extends PureComponent<Props> {
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

  handleClick = () => {
    const { onClick, resultId, type, context } = this.props;
    const index = context.getIndex(this.props.resultId);

    this.props.context.sendAnalytics(QS_ANALYTICS_EV_SUBMIT, {
      index,
      method: 'click',
      type,
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
            onMouseLeave={this.props.context.onMouseLeave}
            subText={subText}
            text={text}
            textAfter={elemAfter}
          />
        )}
      </SelectedResultIdContext.Consumer>
    );
  }
}

export default (props: Props) => (
  <ResultContext.Consumer>
    {context => <ResultBase {...props} context={context} />}
  </ResultContext.Consumer>
);
