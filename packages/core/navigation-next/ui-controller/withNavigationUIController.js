import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import UIControllerSubscriber from './UIControllerSubscriber';
export default (function (WrappedComponent) {
  var withNavigationUIController = function withNavigationUIController(props) {
    return React.createElement(UIControllerSubscriber, null, function (navigationUIController) {
      return React.createElement(WrappedComponent, _extends({
        navigationUIController: navigationUIController
      }, props));
    });
  };

  withNavigationUIController.displayName = "WithNavigationUIController(".concat(WrappedComponent.displayName || WrappedComponent.name, ")");
  return withNavigationUIController;
});