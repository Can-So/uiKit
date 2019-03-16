import _objectSpread from "@babel/runtime/helpers/objectSpread";

var getAppearanceProps = function getAppearanceProps(props) {
  var appearance = props.appearance,
      backgroundColor = props.backgroundColor,
      borderColor = props.borderColor,
      groupAppearance = props.groupAppearance,
      isActive = props.isActive,
      isDisabled = props.isDisabled,
      isFocus = props.isFocus,
      isHover = props.isHover,
      isInteractive = props.isInteractive,
      isSelected = props.isSelected,
      size = props.size,
      stackIndex = props.stackIndex;
  return {
    appearance: appearance,
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    groupAppearance: groupAppearance,
    isActive: isActive,
    isDisabled: isDisabled,
    isFocus: isFocus,
    isHover: isHover,
    isInteractive: isInteractive,
    isSelected: isSelected,
    size: size,
    stackIndex: stackIndex
  };
};

var getInteractionProps = function getInteractionProps(props) {
  var onBlur = props.onBlur,
      onClick = props.onClick,
      onFocus = props.onFocus,
      onKeyDown = props.onKeyDown,
      onKeyUp = props.onKeyUp,
      onMouseDown = props.onMouseDown,
      onMouseEnter = props.onMouseEnter,
      onMouseLeave = props.onMouseLeave,
      onMouseUp = props.onMouseUp,
      tabIndex = props.tabIndex;
  return {
    onBlur: onBlur,
    onClick: onClick,
    onFocus: onFocus,
    onKeyDown: onKeyDown,
    onKeyUp: onKeyUp,
    onMouseDown: onMouseDown,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onMouseUp: onMouseUp,
    tabIndex: tabIndex
  };
};

var getLinkElementProps = function getLinkElementProps(props) {
  var href = props.href,
      target = props.target; // handle security issue for consumer
  // https://mathiasbynens.github.io/rel-noopener

  var rel = target === '_blank' ? 'noopener noreferrer' : null;
  return {
    href: href,
    rel: rel,
    target: target
  };
};

var getButtonElementProps = function getButtonElementProps(props) {
  var id = props.id,
      isDisabled = props.isDisabled;
  return {
    id: id,
    type: 'button',
    disabled: isDisabled
  };
}; // TODO: type this correctly


export default function getProps(component) {
  var props = component.props;

  var defaultProps = _objectSpread({}, getAppearanceProps(props), getInteractionProps(props));

  if (props.component) {
    return _objectSpread({}, defaultProps, props);
  }

  if (props.href) {
    if (props.isDisabled) {
      return defaultProps;
    }

    return _objectSpread({}, defaultProps, getLinkElementProps(props));
  }

  if (props.onClick) {
    return _objectSpread({}, defaultProps, getButtonElementProps(props));
  }

  return defaultProps;
}