import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@atlaskit/analytics-next';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import ChevronUpIcon from '@atlaskit/icon/glyph/chevron-up';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import { name as packageName, version as packageVersion } from '../../version.json';
import Container, { Description, DismissButton, Icon, Content, Title, Header } from './styledFlag';
import Expander from '../Expander';
import Actions from '../FlagActions';
import { flagFocusRingColor } from '../../theme';
export var DEFAULT_APPEARANCE = 'normal';

var Flag =
/*#__PURE__*/
function (_Component) {
  _inherits(Flag, _Component);

  function Flag() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Flag);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Flag)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isExpanded: false
    });

    _defineProperty(_assertThisInitialized(_this), "dismissFlag", function () {
      if (_this.props.isDismissAllowed && _this.props.onDismissed) {
        _this.props.onDismissed(_this.props.id);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "isBold", function () {
      return _this.props.appearance !== DEFAULT_APPEARANCE;
    });

    _defineProperty(_assertThisInitialized(_this), "toggleExpand", function () {
      _this.setState({
        isExpanded: !_this.state.isExpanded
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderToggleOrDismissButton", function () {
      var _this$props = _this.props,
          appearance = _this$props.appearance,
          description = _this$props.description,
          actions = _this$props.actions,
          isDismissAllowed = _this$props.isDismissAllowed,
          onDismissed = _this$props.onDismissed;

      var isBold = _this.isBold();

      if (!isDismissAllowed || !isBold && !onDismissed || isBold && !description && (!actions || !actions.length)) {
        return null;
      }

      var ChevronIcon = _this.state.isExpanded ? ChevronUpIcon : ChevronDownIcon;
      var ButtonIcon = isBold ? ChevronIcon : CrossIcon;
      var buttonLabel = isBold ? 'Toggle flag body' : 'Dismiss flag';
      var buttonAction = isBold ? _this.toggleExpand : _this.dismissFlag;
      var size = ButtonIcon === ChevronIcon ? 'large' : 'small';
      return React.createElement(DismissButton, {
        appearance: appearance,
        "aria-expanded": _this.state.isExpanded // $FlowFixMe - theme is not found in props
        ,
        focusRingColor: flagFocusRingColor(_this.props),
        onClick: buttonAction,
        type: "button"
      }, React.createElement(ButtonIcon, {
        label: buttonLabel,
        size: size
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "renderBody", function () {
      var _this$props2 = _this.props,
          actions = _this$props2.actions,
          appearance = _this$props2.appearance,
          description = _this$props2.description,
          linkComponent = _this$props2.linkComponent;
      var isExpanded = !_this.isBold() || _this.state.isExpanded;
      return React.createElement(Expander, {
        isExpanded: isExpanded
      }, description && React.createElement(Description, {
        appearance: appearance
      }, description), React.createElement(Actions, {
        actions: actions,
        appearance: appearance,
        linkComponent: linkComponent
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseDown", function (e) {
      e.preventDefault();
    });

    return _this;
  }

  _createClass(Flag, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var actions = nextProps.actions,
          description = nextProps.description;

      if (this.isBold() && this.state.isExpanded && !description && (!actions || !actions.length)) {
        this.toggleExpand();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          appearance = _this$props3.appearance,
          icon = _this$props3.icon,
          title = _this$props3.title,
          onMouseOver = _this$props3.onMouseOver,
          onFocus = _this$props3.onFocus,
          onMouseOut = _this$props3.onMouseOut,
          onBlur = _this$props3.onBlur;
      var autoDismissProps = {
        onMouseOver: onMouseOver,
        onFocus: onFocus,
        onMouseOut: onMouseOut,
        onBlur: onBlur
      };
      var OptionalDismissButton = this.renderToggleOrDismissButton;
      var Body = this.renderBody;
      return React.createElement(Container, _extends({
        appearance: appearance,
        role: "alert",
        tabIndex: "0",
        onMouseDown: this.handleMouseDown
      }, autoDismissProps), React.createElement(Header, null, React.createElement(Icon, null, icon), React.createElement(Title, {
        appearance: appearance
      }, title), React.createElement(OptionalDismissButton, null)), React.createElement(Content, null, React.createElement(Body, null)));
    }
  }]);

  return Flag;
}(Component);

_defineProperty(Flag, "defaultProps", {
  actions: [],
  appearance: DEFAULT_APPEARANCE,
  isDismissAllowed: false
});

export { Flag as FlagWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'flag',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onBlur: createAndFireEventOnAtlaskit({
    action: 'blurred',
    actionSubject: 'flag',
    attributes: {
      componentName: 'flag',
      packageName: packageName,
      packageVersion: packageVersion
    }
  }),
  onDismissed: createAndFireEventOnAtlaskit({
    action: 'dismissed',
    actionSubject: 'flag',
    attributes: {
      componentName: 'flag',
      packageName: packageName,
      packageVersion: packageVersion
    }
  }),
  onFocus: createAndFireEventOnAtlaskit({
    action: 'focused',
    actionSubject: 'flag',
    attributes: {
      componentName: 'flag',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(Flag));