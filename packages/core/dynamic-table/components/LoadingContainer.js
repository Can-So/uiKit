import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import Spinner from '@atlaskit/spinner';
import { LARGE, LOADING_CONTENTS_OPACITY } from '../internal/constants';
import { Container, ContentsContainer, SpinnerContainer } from '../styled/LoadingContainer';

var LoadingContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(LoadingContainer, _Component);

  function LoadingContainer() {
    _classCallCheck(this, LoadingContainer);

    return _possibleConstructorReturn(this, _getPrototypeOf(LoadingContainer).apply(this, arguments));
  }

  _createClass(LoadingContainer, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          isLoading = _this$props.isLoading,
          spinnerSize = _this$props.spinnerSize,
          contentsOpacity = _this$props.contentsOpacity;
      return React.createElement(Container, null, !isLoading ? children : React.createElement(ContentsContainer, {
        contentsOpacity: contentsOpacity
      }, children), isLoading && React.createElement(SpinnerContainer, null, React.createElement(Spinner, {
        size: spinnerSize
      })));
    }
  }]);

  return LoadingContainer;
}(Component);

_defineProperty(LoadingContainer, "defaultProps", {
  isLoading: true,
  spinnerSize: LARGE,
  contentsOpacity: LOADING_CONTENTS_OPACITY
});

export { LoadingContainer as default };