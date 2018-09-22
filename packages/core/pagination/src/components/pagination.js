//@flow
import React, { Component, Fragment } from 'react';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@atlaskit/analytics-next';
import PageComponent from './page';
import { LeftNavigator, RightNavigator } from './navigators';
import Ellipsis from './ellipses';
import collapseRangeHelper from '../util/collapse-range';
import {
  name as packageName,
  version as packageVersion,
} from '../../package.json';
import { type PaginationPropTypes } from '../types';

type StateType = {
  selectedIndex: number,
};

class Pagination extends Component<PaginationPropTypes, StateType> {
  static defaultProps = {
    ellipsisComponent: Ellipsis,
    i18n: {
      prev: 'previous',
      next: 'next',
    },
    onChange: () => {},
    defaultSelectedIndex: 1,
    max: 7,
    collapseRange: collapseRangeHelper,
    innerStyles: {},
  };

  state = {
    selectedIndex: this.props.defaultSelectedIndex,
  };

  static getDerivedStateFromProps(props) {
    // selectedIndex is controlled
    if (props.selectedIndex) {
      return {
        selectedIndex: props.selectedIndex,
      };
    }
    return null;
  }

  createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

  onChangeAnalyticsCaller = () => {
    const { createAnalyticsEvent } = this.props;

    if (createAnalyticsEvent) {
      return this.createAndFireEventOnAtlaskit({
        action: 'changed',
        actionSubject: 'pageNumber',

        attributes: {
          componentName: 'pagination',
          packageName,
          packageVersion,
        },
      })(createAnalyticsEvent);
    }
    return undefined;
  };

  onChange = (event: SyntheticEvent<>, newSelectedPage: number) => {
    if (this.props.selectedIndex === undefined) {
      this.setState({
        selectedIndex: newSelectedPage,
      });
    }
    const analyticsEvent = this.onChangeAnalyticsCaller();
    if (this.props.onChange) {
      this.props.onChange(event, newSelectedPage, analyticsEvent);
    }
  };

  pagesToComponents = (pages: Array<any>) => {
    const { selectedIndex } = this.state;
    const { pageComponent, getPageLabel } = this.props;
    return pages.map((page, index) => (
      <PageComponent
        key={`page-${getPageLabel ? getPageLabel(page, index + 1) : index}`}
        component={pageComponent}
        onClick={event => this.onChange(event, index + 1)}
        isSelected={selectedIndex === index + 1}
        page={page}
      >
        {getPageLabel ? getPageLabel(page, index + 1) : page}
      </PageComponent>
    ));
  };

  renderPages = () => {
    const { selectedIndex } = this.state;
    const { pages, max, ellipsisComponent, collapseRange } = this.props;
    const pagesComponents = this.pagesToComponents(pages);

    return collapseRange(pagesComponents, selectedIndex, {
      max,
      ellipsisComponent,
    });
  };

  renderLeftNavigator = () => {
    const { previousPageComponent, pages, i18n } = this.props;
    const { selectedIndex } = this.state;
    const props = {
      ariaLabel: i18n.prev,
      pages,
      selectedIndex,
    };

    return (
      <LeftNavigator
        key="left-navigator"
        component={previousPageComponent}
        onClick={event => this.onChange(event, selectedIndex - 1)}
        isDisabled={selectedIndex === 1}
        {...props}
      />
    );
  };

  renderRightNavigator = () => {
    const { nextPageComponent, pages, i18n } = this.props;
    const { selectedIndex } = this.state;
    const props = {
      ariaLabel: i18n.next,
      selectedIndex,
      pages,
    };
    return (
      <RightNavigator
        key="right-navigator"
        component={nextPageComponent}
        onClick={event => this.onChange(event, selectedIndex + 1)}
        isDisabled={selectedIndex === pages.length}
        {...props}
      />
    );
  };

  render() {
    const { innerStyles } = this.props;
    return (
      <div style={{ display: 'flex', ...innerStyles }}>
        <Fragment>
          {this.renderLeftNavigator()}
          {this.renderPages()}
          {this.renderRightNavigator()}
        </Fragment>
      </div>
    );
  }
}

export default withAnalyticsContext({
  componentName: 'pagination',
  packageName,
  packageVersion,
})(withAnalyticsEvents()(Pagination));
