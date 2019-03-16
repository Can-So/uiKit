import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import AkProfilecardStatic from './profilecard';

var ProfilecardResourced =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ProfilecardResourced, _PureComponent);

  function ProfilecardResourced(props) {
    var _this;

    _classCallCheck(this, ProfilecardResourced);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ProfilecardResourced).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_isMounted", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isLoading: false,
      hasError: false,
      error: null,
      data: {}
    });

    _defineProperty(_assertThisInitialized(_this), "clientFetchProfile", function () {
      var _this$props = _this.props,
          cloudId = _this$props.cloudId,
          userId = _this$props.userId;

      _this.setState({
        isLoading: true,
        hasError: false,
        data: {}
      });

      _this.props.resourceClient.getProfile(cloudId, userId).then(function (res) {
        return _this.handleClientSuccess(res);
      }, function (err) {
        return _this.handleClientError(err);
      }).catch(function (err) {
        return _this.handleClientError(err);
      });
    });

    _this._isMounted = false;
    return _this;
  }

  _createClass(ProfilecardResourced, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;
      this.clientFetchProfile();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.userId !== prevProps.userId || this.props.cloudId !== prevProps.cloudId) {
        this.clientFetchProfile();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: "handleClientSuccess",
    value: function handleClientSuccess(res) {
      if (!this._isMounted) {
        return;
      }

      this.setState({
        isLoading: false,
        hasError: false,
        data: res
      });
    }
  }, {
    key: "handleClientError",
    value: function handleClientError(err) {
      if (!this._isMounted) {
        return;
      }

      this.setState({
        isLoading: false,
        hasError: true,
        error: err
      });
    }
  }, {
    key: "filterActions",
    value: function filterActions() {
      var _this2 = this;

      var actions = this.props.actions || [];
      return actions.filter(function (action) {
        if (!action.shouldRender) {
          return true;
        } else if (typeof action.shouldRender !== 'function') {
          return Boolean(action.shouldRender);
        }

        return action.shouldRender(_this2.state.data);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var newProps = _objectSpread({
        isLoading: this.state.isLoading,
        hasError: this.state.hasError,
        errorType: this.state.error,
        clientFetchProfile: this.clientFetchProfile,
        analytics: this.props.analytics
      }, this.state.data);

      return React.createElement(AkProfilecardStatic, _extends({}, newProps, {
        actions: this.filterActions()
      }));
    }
  }]);

  return ProfilecardResourced;
}(PureComponent);

_defineProperty(ProfilecardResourced, "defaultProps", {
  actions: []
});

export { ProfilecardResourced as default };