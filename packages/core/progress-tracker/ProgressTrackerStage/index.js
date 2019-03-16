import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React, { PureComponent } from 'react';
import { CSSTransition } from 'react-transition-group';
import { colors } from '@atlaskit/theme';
import { GridColumn } from '@atlaskit/page';
import { ProgressTrackerStageContainer, ProgressTrackerStageMarker, ProgressTrackerStageBar, ProgressTrackerStageTitle } from './styled';
var semibold = '600';
var regular = '400';

var getMarkerColor = function getMarkerColor(status) {
  switch (status) {
    case 'unvisited':
      return colors.N70;

    case 'current':
      return colors.B300;

    case 'visited':
      return colors.B300;

    case 'disabled':
      return colors.B300;

    default:
      return null;
  }
};

var getTextColor = function getTextColor(status) {
  switch (status) {
    case 'unvisited':
      return colors.N300;

    case 'current':
      return colors.B300;

    case 'visited':
      return colors.N800;

    case 'disabled':
      return colors.N70;

    default:
      return null;
  }
};

var getFontWeight = function getFontWeight(status) {
  switch (status) {
    case 'unvisited':
      return regular;

    case 'current':
      return semibold;

    case 'visited':
      return semibold;

    case 'disabled':
      return semibold;

    default:
      return null;
  }
};

var Fade = function Fade(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  return React.createElement(CSSTransition, _extends({}, props, {
    classNames: "fade"
  }), children);
};

var ProgressTrackerStage =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ProgressTrackerStage, _PureComponent);

  function ProgressTrackerStage(props) {
    var _this;

    _classCallCheck(this, ProgressTrackerStage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ProgressTrackerStage).call(this, props));
    _this.state = {
      transitioning: false,
      oldMarkerColor: getMarkerColor(_this.props.item.status),
      oldPercentageComplete: 0
    };
    return _this;
  }

  _createClass(ProgressTrackerStage, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var newState = this.state;
      newState.transitioning = true;
      this.setState(newState);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {
      var newState = this.state;
      newState.transitioning = true;
      this.setState(newState);
    }
  }, {
    key: "shouldShowLink",
    value: function shouldShowLink() {
      return this.props.item.status === 'visited' && !this.props.item.noLink;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          item = _this$props.item,
          render = _this$props.render,
          transitionDelay = _this$props.transitionDelay,
          transitionSpeed = _this$props.transitionSpeed,
          transitionEasing = _this$props.transitionEasing;

      var onEntered = function onEntered() {
        _this2.setState({
          transitioning: false,
          oldMarkerColor: getMarkerColor(item.status),
          oldPercentageComplete: item.percentageComplete
        });
      };

      return React.createElement(GridColumn, {
        medium: 2
      }, React.createElement(ProgressTrackerStageContainer, null, React.createElement(Fade, {
        appear: true,
        in: this.state.transitioning,
        onEntered: onEntered,
        timeout: transitionDelay + transitionSpeed
      }, React.createElement(ProgressTrackerStageMarker, {
        oldMarkerColor: this.state.oldMarkerColor,
        color: getMarkerColor(item.status),
        transitionSpeed: transitionSpeed,
        transitionDelay: transitionDelay,
        transitionEasing: transitionEasing
      })), React.createElement(Fade, {
        appear: true,
        in: this.state.transitioning,
        onEntered: onEntered,
        timeout: transitionDelay + transitionSpeed
      }, React.createElement(ProgressTrackerStageBar, {
        oldPercentageComplete: this.state.oldPercentageComplete,
        percentageComplete: item.percentageComplete,
        transitionSpeed: transitionSpeed,
        transitionDelay: transitionDelay,
        transitionEasing: transitionEasing
      })), React.createElement(Fade, {
        appear: true,
        in: this.state.transitioning,
        onEntered: onEntered,
        timeout: transitionDelay + transitionSpeed
      }, React.createElement(ProgressTrackerStageTitle, {
        color: getTextColor(item.status),
        fontweight: getFontWeight(item.status),
        transitionSpeed: transitionSpeed,
        transitionDelay: transitionDelay
      }, this.shouldShowLink() ? render.link({
        item: item
      }) : item.label))));
    }
  }]);

  return ProgressTrackerStage;
}(PureComponent);

export { ProgressTrackerStage as default };