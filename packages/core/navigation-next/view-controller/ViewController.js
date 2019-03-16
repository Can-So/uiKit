import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { Container } from 'unstated';
var defaultProps = {
  isDebugEnabled: false
};

var ViewController =
/*#__PURE__*/
function (_Container) {
  _inherits(ViewController, _Container);

  function ViewController() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultProps,
        _isDebugEnabled = _ref.isDebugEnabled;

    _classCallCheck(this, ViewController);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ViewController).call(this));

    _defineProperty(_assertThisInitialized(_this), "state", {
      activeView: null,
      incomingView: null
    });

    _defineProperty(_assertThisInitialized(_this), "reducers", {});

    _defineProperty(_assertThisInitialized(_this), "views", {});

    _defineProperty(_assertThisInitialized(_this), "isDebugEnabled", false);

    _defineProperty(_assertThisInitialized(_this), "_updateViewController", function (view, initialData) {
      var id = view.id,
          type = view.type,
          getAnalyticsAttributes = view.getAnalyticsAttributes;
      var reducers = _this.reducers[id] || [];
      var data = reducers.reduce(function (d, reducer) {
        return reducer(d);
      }, initialData);
      var analyticsAttributes = getAnalyticsAttributes ? getAnalyticsAttributes(data) : undefined;

      _this.setState({
        activeView: {
          id: id,
          type: type,
          data: data,
          analyticsAttributes: analyticsAttributes
        },
        incomingView: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "addReducer", function (viewId, reducer) {
      var reducersForView = [].concat(_toConsumableArray(_this.reducers[viewId] || []), [reducer]);
      _this.reducers = _objectSpread({}, _this.reducers, _defineProperty({}, viewId, reducersForView)); // If we're adding a reducer to the active view we'll want to force an
      // update so that the reducer gets applied.

      _this.updateActiveView(viewId);
    });

    _defineProperty(_assertThisInitialized(_this), "removeReducer", function (viewId, reducer) {
      var reducersForView = _this.reducers[viewId];

      if (!reducersForView) {
        return;
      }

      var newReducers = reducersForView.filter(function (r) {
        return r !== reducer;
      });
      _this.reducers = _objectSpread({}, _this.reducers, _defineProperty({}, viewId, newReducers)); // If we're removing a reducer from the active view we'll want to force an
      // update so that the data gets re-evaluated.

      _this.updateActiveView(viewId);
    });

    _defineProperty(_assertThisInitialized(_this), "addView", function (view) {
      var id = view.id;
      _this.views = _objectSpread({}, _this.views, _defineProperty({}, id, view)); // We need to call setView again for the following cases:
      // 1. The added view matches the active view (if it returns a Promise we
      //    want to temporarily enter a loading state while it resolves).
      // 2. The added view matches the expected incoming view and we want to
      //    resolve it.

      var _this$state = _this.state,
          activeView = _this$state.activeView,
          incomingView = _this$state.incomingView;

      if (activeView && id === activeView.id || incomingView && id === incomingView.id) {
        _this.setView(id);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "removeView", function (viewId) {
      delete _this.views[viewId];
    });

    _defineProperty(_assertThisInitialized(_this), "setView", function (viewId) {
      var view = _this.views[viewId]; // The view has been added

      if (view) {
        var id = view.id,
            type = view.type,
            getItems = view.getItems;
        var returnedItems = getItems(); // This view returned a Promise

        if (returnedItems instanceof Promise) {
          // Enter a temporary loading state
          _this.setState({
            incomingView: {
              id: id,
              type: type
            }
          }); // Wait for the Promise to resolve


          returnedItems.then(function (data) {
            _this._updateViewController(view, data);
          });
          return;
        } // The view returned data


        _this._updateViewController(view, returnedItems);

        return;
      } // The view has not been added yet. We enter an indefinite loading state
      // until the view is added or another view is set.


      _this.setState({
        incomingView: {
          id: viewId,
          type: null
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateActiveView", function (maybeViewId) {
      var activeView = _this.state.activeView;

      if (!activeView) {
        return;
      }

      if (maybeViewId && maybeViewId === activeView.id) {
        _this.setView(maybeViewId);

        return;
      }

      if (!maybeViewId) {
        _this.setView(activeView.id);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setIsDebugEnabled", function (isDebugEnabled) {
      _this.isDebugEnabled = isDebugEnabled;
    });

    if (typeof _isDebugEnabled !== 'undefined') {
      _this.isDebugEnabled = _isDebugEnabled;
    }

    return _this;
  }
  /**
   * Helper function for reducing a view's data and updating the state.
   */


  return ViewController;
}(Container);

export { ViewController as default };