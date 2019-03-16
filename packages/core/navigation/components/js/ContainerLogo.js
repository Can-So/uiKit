import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { PureComponent } from 'react';
import { withTheme } from 'styled-components';
import ContainerLogoStyled from '../styled/ContainerLogo';
import { rootKey } from '../../theme/util';

var ContainerLogo =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ContainerLogo, _PureComponent);

  function ContainerLogo() {
    _classCallCheck(this, ContainerLogo);

    return _possibleConstructorReturn(this, _getPrototypeOf(ContainerLogo).apply(this, arguments));
  }

  _createClass(ContainerLogo, [{
    key: "render",
    value: function render() {
      /* eslint-disable react/prop-types */
      // theme is passed in via context and not part of the props API for this component
      var isNavCollapsed = this.props.theme[rootKey] ? this.props.theme[rootKey].isCollapsed : false;
      /* eslint-enable react/prop-types */

      return isNavCollapsed ? null : React.createElement(ContainerLogoStyled, null, this.props.children);
    }
  }]);

  return ContainerLogo;
}(PureComponent);

export default withTheme(ContainerLogo);