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
import { name as packageName, version as packageVersion } from '../version.json';
import { Container, IndicatorButton, IndicatorDiv } from '../styled/Dots';

var ProgressDots =
/*#__PURE__*/
function (_Component) {
  _inherits(ProgressDots, _Component);

  function ProgressDots() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ProgressDots);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ProgressDots)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "tablist", void 0);

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          selectedIndex = _this$props.selectedIndex,
          values = _this$props.values;
      var indicators = Array.from(_this.tablist.children); // bail if the target isn't an indicator

      if (!indicators.includes(event.target)) return; // bail if not valid arrow key

      var isLeft = event.key === 'ArrowLeft';
      var isRight = event.key === 'ArrowRight';
      if (!isLeft && !isRight) return; // bail if at either end of the values

      var isAlpha = isLeft && selectedIndex === 0;
      var isOmega = isRight && selectedIndex === values.length - 1;
      if (isAlpha || isOmega) return;
      var index = isLeft ? selectedIndex - 1 : selectedIndex + 1; // call the consumer's select method and focus the applicable indicator

      if (onSelect) {
        onSelect({
          event: event,
          index: index
        });
      }

      if (typeof indicators[index].focus === 'function') {
        indicators[index].focus();
      }
    });

    return _this;
  }

  _createClass(ProgressDots, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.onSelect) {
        document.addEventListener('keydown', this.handleKeyDown, false);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.onSelect) {
        document.removeEventListener('keydown', this.handleKeyDown);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // NOTE: `spacing` is a reserved HTML attribute and will be added to the
      // element, replaced with `gutter`.
      var _this$props2 = this.props,
          appearance = _this$props2.appearance,
          ariaControls = _this$props2.ariaControls,
          ariaLabel = _this$props2.ariaLabel,
          onSelect = _this$props2.onSelect,
          selectedIndex = _this$props2.selectedIndex,
          size = _this$props2.size,
          gutter = _this$props2.spacing,
          values = _this$props2.values;
      return React.createElement(Container, {
        innerRef: function innerRef(r) {
          _this2.tablist = r;
        },
        role: "tablist"
      }, values.map(function (val, index) {
        var selected = selectedIndex === index;
        var common = {
          appearance: appearance,
          key: index,
          selected: selected,
          size: size,
          gutter: gutter
        }; // did an || to avoid flow error of ariaLabel being undefined|null

        var tabId = "".concat(ariaLabel || 'tab').concat(index); // did an || to avoid flow error of ariaControls being undefined|null

        var panelId = "".concat(ariaControls || 'panel').concat(index);
        return onSelect ? React.createElement(IndicatorButton, _extends({}, common, {
          "aria-controls": panelId,
          "aria-label": tabId,
          "aria-selected": selected,
          id: tabId,
          onClick: function onClick(event) {
            return onSelect({
              event: event,
              index: index
            });
          },
          role: "tab",
          tabIndex: selected ? 0 : -1,
          type: "button"
        })) : React.createElement(IndicatorDiv, _extends({}, common, {
          role: "presentation"
        }));
      }));
    }
  }]);

  return ProgressDots;
}(Component);

_defineProperty(ProgressDots, "defaultProps", {
  appearance: 'default',
  ariaControls: 'panel',
  ariaLabel: 'tab',
  size: 'default',
  spacing: 'comfortable'
});

export { ProgressDots as ProgressDotsWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'progressIndicator',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onSelect: createAndFireEventOnAtlaskit({
    action: 'selected',
    actionSubject: 'progressIndicator',
    attributes: {
      componentName: 'progressIndicator',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(ProgressDots));