import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import Spinner from '@findable/spinner';
import { ButtonGroup } from '@findable/button';
import { ActionsContainer, Container, Description, Header, Image, SpinnerContainer } from '../styled';

var EmptyState =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EmptyState, _React$Component);

  function EmptyState() {
    _classCallCheck(this, EmptyState);

    return _possibleConstructorReturn(this, _getPrototypeOf(EmptyState).apply(this, arguments));
  }

  _createClass(EmptyState, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          header = _this$props.header,
          description = _this$props.description,
          size = _this$props.size,
          imageUrl = _this$props.imageUrl,
          imageWidth = _this$props.imageWidth,
          imageHeight = _this$props.imageHeight,
          maxImageWidth = _this$props.maxImageWidth,
          maxImageHeight = _this$props.maxImageHeight,
          primaryAction = _this$props.primaryAction,
          secondaryAction = _this$props.secondaryAction,
          tertiaryAction = _this$props.tertiaryAction,
          isLoading = _this$props.isLoading;
      var actionsContainer = primaryAction || secondaryAction || isLoading ? React.createElement(ActionsContainer, null, React.createElement(ButtonGroup, null, primaryAction, secondaryAction), React.createElement(SpinnerContainer, null, isLoading && React.createElement(Spinner, null))) : null;
      return React.createElement(Container, {
        size: size
      }, imageUrl && React.createElement(Image, {
        src: imageUrl,
        maxWidth: maxImageWidth,
        maxHeight: maxImageHeight,
        width: imageWidth,
        height: imageHeight
      }), React.createElement(Header, null, header), description && React.createElement(Description, null, description), actionsContainer, tertiaryAction);
    }
  }]);

  return EmptyState;
}(React.Component);

_defineProperty(EmptyState, "defaultProps", {
  size: 'wide',
  maxImageWidth: 160,
  maxImageHeight: 160
});

export { EmptyState as default };