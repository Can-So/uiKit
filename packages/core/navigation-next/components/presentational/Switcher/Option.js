import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { css as _css4 } from "emotion";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import { css as _css3 } from "emotion";
import { css as _css2 } from "emotion";
import _extends from "@babel/runtime/helpers/extends";
import { css as _css } from "emotion";
import React, { PureComponent } from 'react';
import { colors, fontSize, gridSize as gridSizeFn } from '@findable/theme';
import Avatar from '@findable/avatar';
import { components } from '@findable/select';
var gridSize = gridSizeFn();
var _ref = {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  overflowX: 'hidden'
};

var ContentWrapper = function ContentWrapper(props) {
  return React.createElement("div", _extends({
    className: _css(_ref)
  }, props));
};

var TextWrapper = function TextWrapper(props) {
  return React.createElement("div", _extends({
    className: _css2({
      flex: '1 1 auto',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      lineHeight: 16 / fontSize()
    })
  }, props));
};

var SubTextWrapper = function SubTextWrapper(props) {
  return React.createElement("div", _extends({
    className: _css3({
      color: colors.N200,
      flex: '1 1 auto',
      fontSize: 12,
      lineHeight: 14 / 12,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    })
  }, props));
};

var ElementWrapper = function ElementWrapper(_ref2) {
  var is = _ref2.is,
      props = _objectWithoutProperties(_ref2, ["is"]);

  var direction = {
    before: 'marginRight',
    after: 'marginLeft'
  };
  var margin = direction[is];
  return React.createElement("div", _extends({
    className: _css4(_defineProperty({
      alignItems: 'center',
      display: 'flex',
      flexShrink: 0
    }, margin, gridSize))
  }, props));
};

var Option =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Option, _PureComponent);

  function Option() {
    _classCallCheck(this, Option);

    return _possibleConstructorReturn(this, _getPrototypeOf(Option).apply(this, arguments));
  }

  _createClass(Option, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          innerProps = _this$props.innerProps,
          innerRef = _this$props.innerRef,
          _this$props$data = _this$props.data,
          avatar = _this$props$data.avatar,
          subText = _this$props$data.subText,
          text = _this$props$data.text;
      return React.createElement("div", _extends({
        ref: innerRef
      }, innerProps), React.createElement(components.Option, this.props, !!avatar && React.createElement(ElementWrapper, {
        is: "before"
      }, React.createElement(Avatar, {
        borderColor: "transparent",
        src: avatar,
        appearance: "square"
      })), React.createElement(ContentWrapper, null, React.createElement(TextWrapper, null, text), !!subText && React.createElement(SubTextWrapper, null, subText))));
    }
  }]);

  return Option;
}(PureComponent);

export { Option as default };