import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import GlobalItem from './GlobalItem';
import DrawerTriggerInner from '../styled/DrawerTriggerInner';

export default class DrawerTrigger extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    onActivate: PropTypes.func,
  };
  static defaultProps = {
    onActivate: () => {},
  };

  render() {
    if (this.props.children === null) return null;
    return (
      <DrawerTriggerInner>
        <GlobalItem
          role="button"
          aria-haspopup="true"
          onClick={this.props.onActivate}
          onMouseDown={e => e.preventDefault()}
          size="medium"
        >
          {this.props.children}
        </GlobalItem>
      </DrawerTriggerInner>
    );
  }
}
