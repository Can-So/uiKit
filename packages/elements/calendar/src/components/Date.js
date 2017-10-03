import PropTypes from 'prop-types';
/* eslint no-confusing-arrow: 0 */

import React, { PureComponent } from 'react';
import { DateDiv, DateTd } from '../styled/Date';

export default class extends PureComponent {
  static propTypes = {
    children: PropTypes.number.isRequired,
    // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
    // eslint-disable-next-line react/no-unused-prop-types
    disabled: PropTypes.bool,
    // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
    // eslint-disable-next-line react/no-unused-prop-types
    focused: PropTypes.bool,
    // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
    // eslint-disable-next-line react/no-unused-prop-types
    isToday: PropTypes.bool,
    month: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
    // eslint-disable-next-line react/no-unused-prop-types
    previouslySelected: PropTypes.bool,
    selected: PropTypes.bool,
    // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
    // eslint-disable-next-line react/no-unused-prop-types
    sibling: PropTypes.bool,
    year: PropTypes.number.isRequired,
  }
  static defaultProps = {
    disabled: false,
    focused: false,
    onClick() {},
    previouslySelected: false,
    sibling: false,
    today: '',
  }
  state = {
    isActive: false,
  }
  onMouseDown = () => this.setState({ isActive: true });

  onMouseUp = () => {
    this.setState({ isActive: false });
    const { children: day, month, onClick, year } = this.props;
    onClick({ year, month, day });
  }
  render() {
    const {
      children,
      disabled,
      focused,
      isToday,
      previouslySelected,
      selected,
      sibling,
    } = this.props;
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <DateTd
        aria-live={focused ? 'polite' : ''}
        aria-selected={selected ? 'true' : 'false'}
        onClick={this.handleClick}
        role="gridcell"
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      >
        <DateDiv
          disabled={disabled}
          focused={focused}
          isToday={isToday}
          previouslySelected={previouslySelected}
          selected={selected}
          sibling={sibling}
          isActive={this.state.isActive}
        >
          {children}
        </DateDiv>
      </DateTd>
    );
  }
}
