// from https://facebook.github.io/react/docs/higher-order-components.html
var getDisplayName = function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export default getDisplayName;