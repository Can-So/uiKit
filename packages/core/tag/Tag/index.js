import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@findable/analytics-next';
import { name as packageName, version as packageVersion } from '../version.json';
import Chrome from '../Chrome';
import Content from '../Content';
import RemoveButton from '../RemoveButton';
import Before from './styledBefore';
import Container from './styledContainer';
var colorList = ['standard', 'green', 'blue', 'red', 'purple', 'grey', 'teal', 'yellow', 'greenLight', 'blueLight', 'redLight', 'purpleLight', 'greyLight', 'tealLight', 'yellowLight'];

var Tag =
/*#__PURE__*/
function (_Component) {
  _inherits(Tag, _Component);

  function Tag() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Tag);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Tag)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isRemoving: false,
      isRemoved: false,
      markedForRemoval: false,
      isFocused: false
    });

    _defineProperty(_assertThisInitialized(_this), "handleRemoveRequest", function () {
      if (_this.props.onBeforeRemoveAction && _this.props.onBeforeRemoveAction()) {
        _this.setState({
          isRemoving: true,
          isRemoved: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleRemoveComplete", function () {
      if (_this.props.onAfterRemoveAction) {
        _this.props.onAfterRemoveAction(_this.props.text);
      }

      _this.setState({
        isRemoving: false,
        isRemoved: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleHoverChange", function (hoverState) {
      _this.setState({
        markedForRemoval: hoverState
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleFocusChange", function (focusState) {
      _this.setState({
        isFocused: focusState
      });
    });

    return _this;
  }

  _createClass(Tag, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          isFocused = _this$state.isFocused,
          isRemoved = _this$state.isRemoved,
          isRemoving = _this$state.isRemoving,
          markedForRemoval = _this$state.markedForRemoval;
      var _this$props = this.props,
          appearance = _this$props.appearance,
          elemBefore = _this$props.elemBefore,
          href = _this$props.href,
          removeButtonText = _this$props.removeButtonText,
          text = _this$props.text,
          color = _this$props.color,
          linkComponent = _this$props.linkComponent;
      var safeColor = colorList.includes(color) ? color : 'standard';
      var isRemovable = Boolean(removeButtonText);
      var isRounded = appearance === 'rounded';
      var styled = {
        isFocused: isFocused,
        isRemovable: isRemovable,
        isRemoved: isRemoved,
        isRemoving: isRemoving,
        isRounded: isRounded,
        markedForRemoval: markedForRemoval,
        color: safeColor
      };

      var onAnimationEnd = function onAnimationEnd() {
        return isRemoving && _this2.handleRemoveComplete();
      };

      return React.createElement(Container, _extends({}, styled, {
        onAnimationEnd: onAnimationEnd
      }), React.createElement(Chrome, _extends({}, styled, {
        isLink: !!href,
        onFocusChange: this.handleFocusChange
      }), elemBefore ? React.createElement(Before, null, elemBefore) : null, React.createElement(Content, _extends({
        linkComponent: linkComponent
      }, styled, {
        href: href
      }), text), isRemovable ? React.createElement(RemoveButton, _extends({}, styled, {
        onHoverChange: this.handleHoverChange,
        onRemoveAction: this.handleRemoveRequest,
        removeText: removeButtonText
      })) : null));
    }
  }]);

  return Tag;
}(Component);

_defineProperty(Tag, "defaultProps", {
  color: 'standard',
  appearance: 'default',
  elemBefore: null,
  onAfterRemoveAction: function onAfterRemoveAction() {},
  onBeforeRemoveAction: function onBeforeRemoveAction() {
    return true;
  }
});

export { Tag as TagWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'tag',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onAfterRemoveAction: createAndFireEventOnAtlaskit({
    action: 'removed',
    actionSubject: 'tag',
    attributes: {
      componentName: 'tag',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(Tag));