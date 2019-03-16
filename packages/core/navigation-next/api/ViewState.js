import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

/**
 * @deprecated This module is deprecated in favour of the 'view-state' module.
 */
import { Container } from 'unstated';
import { diff } from 'deep-object-diff';
import Logger from '../services/logger';
var defaultOptions = {
  activeView: null,
  reducers: {},
  views: {},
  debug: false
};

var ViewState =
/*#__PURE__*/
function (_Container) {
  _inherits(ViewState, _Container);

  function ViewState(options) {
    var _this;

    _classCallCheck(this, ViewState);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ViewState).call(this));

    _defineProperty(_assertThisInitialized(_this), "reducers", {});

    _defineProperty(_assertThisInitialized(_this), "views", {});

    _defineProperty(_assertThisInitialized(_this), "debug", void 0);

    _defineProperty(_assertThisInitialized(_this), "logger", void 0);

    _defineProperty(_assertThisInitialized(_this), "setDebug", function (enabled) {
      _this.logger.setDebug(enabled);
    });

    _defineProperty(_assertThisInitialized(_this), "addReducer", function (viewKey, reducer) {
      var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'unknown';
      var reducerList = [].concat(_toConsumableArray(_this.reducers[viewKey] || []), [{
        source: source,
        fn: reducer
      }]);
      _this.reducers = _objectSpread({}, _this.reducers, _defineProperty({}, viewKey, reducerList));

      _this.logger.debug("Adding reducer from '".concat(source, " to '").concat(viewKey, "' view - %O"), reducer); // If we're adding a reducer to the active view we'll want to re-set it so
      // that the reducer gets applied.


      var activeView = _this.state.activeView;

      if (activeView && viewKey === activeView) {
        _this.setView(activeView);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "removeReducer", function (viewKey, reducer) {
      var viewReducerList = _this.reducers[viewKey];

      if (!viewReducerList) {
        return;
      }

      var reducerList = viewReducerList.filter(function (_ref) {
        var fn = _ref.fn;
        return fn !== reducer;
      });
      _this.reducers = _objectSpread({}, _this.reducers, _defineProperty({}, viewKey, reducerList)); // If we're removing a reducer from the active view we'll want to re-set it
      // so that the data gets re-evaluated.

      var activeView = _this.state.activeView;

      if (activeView && viewKey === activeView) {
        _this.setView(activeView);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "addView", function (viewKey, viewGetter) {
      var _this$state = _this.state,
          activeView = _this$state.activeView,
          nextView = _this$state.nextView; // Add the new view to the views map.

      var newViews = _objectSpread({}, _this.views, _defineProperty({}, viewKey, viewGetter));

      _this.views = newViews; // We need to call setView again for the following cases:
      // 1. The added view matches the activeView (if it returns a Promise we
      //    want to temporarily enter a loading state while it resolves).
      // 2. The added view matches the expected nextView and we want to
      //    resolve it.

      if (viewKey === activeView || viewKey === nextView) {
        _this.setView(viewKey);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setView", function (maybeViewKey) {
      if (maybeViewKey === null) {
        _this.setState({
          activeView: null,
          data: null
        });

        return;
      }

      var viewKey = maybeViewKey;
      var viewGetter = _this.views[viewKey]; // This view has already been added.

      if (viewGetter) {
        var view = viewGetter(); // This view returned a Promise.

        if (view instanceof Promise) {
          // Enter a temporary loading state.
          _this.setState({
            isLoading: true,
            nextView: viewKey
          }); // Wait for the promise to resolve.


          view.then(function (viewData) {
            _this.setViewData(viewKey, viewData);
          });
          return;
        } // This view returned an Object.


        _this.setViewData(viewKey, view);

        return;
      } // This view has not been added yet. We enter an indefinite loading
      // state until the view is added or another view is set.


      _this.setState({
        isLoading: true,
        nextView: viewKey
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setViewData", function (viewKey, viewData) {
      _this.logger.debugGroup("Setting active view");

      _this.logger.debug("Active view: '".concat(viewKey, "'")); // Pass the data through any reducers.


      var reducers = _this.reducers[viewKey] || [];
      var data = reducers.reduce(function (currentView, reducer) {
        _this.logger.debugGroupCollapsed("Applying '".concat(reducer.source, "' reducer"));

        var reducedData = reducer.fn(currentView, viewKey);

        _this.logger.debug("Data diff: %O", diff(currentView, reducedData));

        _this.logger.debug("Function: %O", reducer.fn);

        _this.logger.debugGroupEnd();

        return reducedData;
      }, viewData);

      _this.logger.debug("View data: %O", data);

      _this.logger.debugConditional(reducers.length > 0, "Diff after reducers: %O", diff(viewData, data));

      _this.logger.debugGroupEnd("Setting active view");

      _this.setState({
        activeView: viewKey,
        data: data,
        isLoading: false,
        nextView: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateActiveView", function (maybeViewKey) {
      var _this$state2 = _this.state,
          activeView = _this$state2.activeView,
          data = _this$state2.data;
      var viewKey = maybeViewKey || activeView;

      if (!viewKey || !data || viewKey !== activeView) {
        return;
      }

      _this.setView(viewKey);
    });

    var _defaultOptions$optio = _objectSpread({}, defaultOptions, options),
        _activeView = _defaultOptions$optio.activeView,
        _reducers = _defaultOptions$optio.reducers,
        views = _defaultOptions$optio.views,
        debug = _defaultOptions$optio.debug; // Initialise state


    _this.state = {
      activeView: _activeView,
      data: null,
      isLoading: !_activeView,
      nextView: null
    };
    _this.reducers = _reducers;
    _this.views = views;
    _this.logger = new Logger({
      debug: debug,
      prefix: 'Nav API'
    }); // Resolve the active view data if we have an activeView.

    if (_activeView) {
      _this.setView(_activeView);
    }

    return _this;
  }
  /**
   * Setters
   */


  return ViewState;
}(Container);

export { ViewState as default };