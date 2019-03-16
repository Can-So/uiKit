import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import FocusLock from 'react-focus-lock';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@atlaskit/analytics-next';
import { Popper } from '@atlaskit/popper';
import { name as packageName, version as packageVersion } from '../version.json';
import { Image } from '../styled/Dialog';
import SpotlightCard from './SpotlightCard';
import ValueChanged from './ValueChanged';

var SpotlightDialog =
/*#__PURE__*/
function (_Component) {
  _inherits(SpotlightDialog, _Component);

  function SpotlightDialog() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SpotlightDialog);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SpotlightDialog)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      focusLockDisabled: true
    });

    return _this;
  }

  _createClass(SpotlightDialog, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        // we delay the enabling of the focus lock to avoid the scroll position
        // jumping around in some situations
        _this2.setState({
          focusLockDisabled: false
        });
      }, 200);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          actions = _this$props.actions,
          actionsBeforeElement = _this$props.actionsBeforeElement,
          animationStyles = _this$props.animationStyles,
          children = _this$props.children,
          dialogPlacement = _this$props.dialogPlacement,
          dialogWidth = _this$props.dialogWidth,
          footer = _this$props.footer,
          header = _this$props.header,
          heading = _this$props.heading,
          image = _this$props.image,
          targetNode = _this$props.targetNode;
      var focusLockDisabled = this.state.focusLockDisabled;
      var translatedPlacement = dialogPlacement ? {
        'top left': 'top-start',
        'top center': 'top',
        'top right': 'top-end',
        'right top': 'right-start',
        'right middle': 'right',
        'right bottom': 'right-end',
        'bottom left': 'bottom-start',
        'bottom center': 'bottom',
        'bottom right': 'bottom-end',
        'left top': 'left-start',
        'left middle': 'left',
        'left bottom': 'left-end'
      }[dialogPlacement] : undefined;
      return React.createElement(Popper, {
        referenceElement: targetNode,
        placement: translatedPlacement
      }, function (_ref) {
        var ref = _ref.ref,
            style = _ref.style,
            scheduleUpdate = _ref.scheduleUpdate;
        return React.createElement(ValueChanged, {
          value: dialogWidth,
          onChange: scheduleUpdate
        }, React.createElement(FocusLock, {
          disabled: focusLockDisabled,
          returnFocus: false,
          autoFocus: true
        }, React.createElement(SpotlightCard, {
          ref: ref,
          theme: function theme(parent) {
            var _parent = parent(),
                container = _parent.container,
                others = _objectWithoutProperties(_parent, ["container"]);

            return _objectSpread({}, others, {
              container: _objectSpread({}, container, style, animationStyles)
            });
          },
          width: dialogWidth,
          actions: actions,
          actionsBeforeElement: actionsBeforeElement,
          image: image && React.createElement(Image, {
            alt: heading,
            src: image
          }),
          components: {
            Header: header,
            Footer: footer
          },
          heading: heading
        }, children)));
      });
    }
  }]);

  return SpotlightDialog;
}(Component);

var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'spotlight',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  targetOnClick: createAndFireEventOnAtlaskit({
    action: 'clicked',
    actionSubject: 'spotlight',
    attributes: {
      componentName: 'spotlight',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(SpotlightDialog));