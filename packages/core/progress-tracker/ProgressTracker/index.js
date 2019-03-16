import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import { Grid } from '@findable/page';
import { ThemeProvider } from 'styled-components';
import ProgressTrackerStage from '../ProgressTrackerStage';
import { ProgressTrackerContainer } from './styled';
import ProgressTrackerLink from '../ProgressTrackerLink';
var TRANSITION_SPEED = 300;
var LINEAR_TRANSITION_SPEED = 50;
var easeOut = 'cubic-bezier(0.15,1,0.3,1)';

var ProgressTracker =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ProgressTracker, _PureComponent);

  function ProgressTracker() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ProgressTracker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ProgressTracker)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "createTheme", function () {
      return {
        spacing: _this.props.spacing,
        columns: _this.props.items.length * 2
      };
    });

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    return _this;
  }

  _createClass(ProgressTracker, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        prevStages: this.props.items.map(function (stage) {
          return _objectSpread({}, stage, {
            percentageComplete: 0
          });
        })
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {
      var newState = this.state;
      newState.prevStages = this.props.items;
      this.setState(newState);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var progressChanges = this.props.items.filter(function (stage, index) {
        return stage.percentageComplete !== _this2.state.prevStages[index].percentageComplete;
      }).length;
      var totalStepsForward = this.props.items.filter(function (stage, index) {
        return stage.percentageComplete > _this2.state.prevStages[index].percentageComplete;
      }).length;
      var totalStepsBack = this.props.items.filter(function (stage, index) {
        return stage.percentageComplete < _this2.state.prevStages[index].percentageComplete;
      }).length;
      var stepsForward = totalStepsForward;
      var stepsBack = totalStepsBack;
      var items = this.props.items.map(function (stage, index) {
        var transitionSpeed = 0;
        var transitionDelay = 0;
        var transitionEasing = progressChanges > 1 ? 'linear' : easeOut;

        if (_this2.props.animated) {
          transitionSpeed = progressChanges > 1 ? LINEAR_TRANSITION_SPEED : TRANSITION_SPEED;

          if (stage.percentageComplete < _this2.state.prevStages[index].percentageComplete) {
            /** load each transition sequentially in reverse */
            transitionDelay = (stepsBack - 1) * transitionSpeed;
            stepsBack -= 1;
          } else if (stage.percentageComplete > _this2.state.prevStages[index].percentageComplete) {
            /** load each transition sequentially */
            transitionDelay = (totalStepsForward - stepsForward) * transitionSpeed;
            stepsForward -= 1;
          }
        }

        return React.createElement(ProgressTrackerStage, {
          key: stage.id,
          item: stage,
          render: _this2.props.render,
          transitionSpeed: transitionSpeed,
          transitionDelay: transitionDelay,
          transitionEasing: transitionEasing
        });
      });
      return React.createElement(ThemeProvider, {
        theme: this.createTheme()
      }, React.createElement(Grid, null, React.createElement(ProgressTrackerContainer, null, items)));
    }
  }]);

  return ProgressTracker;
}(PureComponent);

_defineProperty(ProgressTracker, "defaultProps", {
  items: [],
  spacing: 'cosy',
  render: {
    link: function link(props) {
      return React.createElement(ProgressTrackerLink, props);
    }
  },
  animated: true
});

export { ProgressTracker as default };