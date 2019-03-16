import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { ExperimentProvider } from './ExperimentContext';

var ExperimentController =
/*#__PURE__*/
function (_Component) {
  _inherits(ExperimentController, _Component);

  function ExperimentController(props) {
    var _this;

    _classCallCheck(this, ExperimentController);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ExperimentController).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "resolverPromises", {});

    var experimentEnrollmentConfig = _this.props.experimentEnrollmentConfig;
    var intialExperiments = Object.keys(experimentEnrollmentConfig).reduce(function (cumulative, experimentKey) {
      return _objectSpread({}, cumulative, _defineProperty({}, experimentKey, {
        isEnrollmentDecided: false,
        enrollmentResolver: function enrollmentResolver() {
          return _this.resolverPromises[experimentKey] || _this.resolveEnrollmentForExperiment(experimentKey);
        }
      }));
    }, {});
    _this.state = {
      experiments: intialExperiments
    };
    return _this;
  }

  _createClass(ExperimentController, [{
    key: "resolveEnrollmentForExperiment",
    value: function resolveEnrollmentForExperiment(experimentKey) {
      var _this2 = this;

      var experimentEnrollmentConfig = this.props.experimentEnrollmentConfig;
      var enrollmentResolver = experimentEnrollmentConfig[experimentKey]; // updates context after resolving

      var enrollmentPromise = enrollmentResolver();
      enrollmentPromise.then(function (enrollmentDetails) {
        _this2.setState({
          experiments: _defineProperty({}, experimentKey, {
            isEnrollmentDecided: true,
            enrollmentDetails: enrollmentDetails
          })
        });
      }); // cache the resolver promise to avoid resolving enrollment multiple times

      this.resolverPromises[experimentKey] = enrollmentPromise;
      return enrollmentPromise;
    }
  }, {
    key: "render",
    value: function render() {
      var experiments = this.state.experiments;
      var children = this.props.children;
      return React.createElement(ExperimentProvider, {
        value: experiments
      }, children);
    }
  }]);

  return ExperimentController;
}(Component);

_defineProperty(ExperimentController, "displayName", 'ExperimentController');

export default ExperimentController;