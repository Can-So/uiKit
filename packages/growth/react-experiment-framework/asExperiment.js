import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component, Fragment } from 'react';
import CohortTracker from './CohortTracker';
import { ExperimentConsumer } from './ExperimentContext';
export default function asExperiment(experimentComponentMap, experimentKey, callbacks, LoadingComponent) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inherits(ExperimentSwitch, _Component);

    function ExperimentSwitch() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, ExperimentSwitch);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ExperimentSwitch)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "state", {
        forceFallback: false
      });

      _defineProperty(_assertThisInitialized(_this), "onReceiveContext", function (context) {
        var forceFallback = _this.state.forceFallback;
        var onExposure = callbacks.onExposure;

        if (forceFallback) {
          return _this.renderFallback();
        }

        if (!(experimentKey in context)) {
          throw new Error("Experiment Key ".concat(experimentKey, " does not exist in configuration"));
        }

        var experimentDetails = context[experimentKey];

        if (!experimentDetails.isEnrollmentDecided) {
          // kick off the async check of the resolver
          experimentDetails.enrollmentResolver(); // still waiting on whether or not to show an experiment

          if (LoadingComponent) {
            return React.createElement(LoadingComponent, null);
          }

          return null;
        }

        var enrollmentDetails = experimentDetails.enrollmentDetails;

        if (!enrollmentDetails) {
          throw new Error("Experiment ".concat(experimentKey, " has missing enrollment details"));
        }

        var cohort = enrollmentDetails.cohort,
            isEligible = enrollmentDetails.isEligible,
            ineligibilityReasons = enrollmentDetails.ineligibilityReasons;

        if (!(cohort in experimentComponentMap)) {
          throw new Error("Cohort ".concat(cohort, " does not exist for experiment ").concat(experimentKey));
        }

        var View = isEligible ? experimentComponentMap[cohort] : experimentComponentMap.fallback;
        var exposureDetails = {
          experimentKey: experimentKey,
          cohort: cohort,
          isEligible: isEligible,
          ineligibilityReasons: ineligibilityReasons
        };
        return React.createElement(Fragment, null, React.createElement(View, _extends({}, _this.props, {
          key: "experimentView"
        })), React.createElement(CohortTracker, {
          exposureDetails: exposureDetails,
          onExposure: onExposure,
          key: "cohortTracker"
        }));
      });

      _defineProperty(_assertThisInitialized(_this), "renderFallback", function () {
        var FallbackView = experimentComponentMap.fallback;
        return React.createElement(FallbackView, _this.props);
      });

      return _this;
    }

    _createClass(ExperimentSwitch, [{
      key: "componentDidCatch",
      value: function componentDidCatch(err) {
        var onError = callbacks.onError;
        onError(err);
        this.setState({
          forceFallback: true
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        return React.createElement(ExperimentConsumer, null, function (context) {
          return _this2.onReceiveContext(context);
        });
      }
    }]);

    return ExperimentSwitch;
  }(Component), _defineProperty(_class, "displayName", 'ExperimentSwitch'), _temp;
}