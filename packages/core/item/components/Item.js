import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import styledRootElement from '../styled/Item';
import { Before, After, Content, ContentWrapper, Description } from '../styled/ItemParts';

var Item =
/*#__PURE__*/
function (_Component) {
  _inherits(Item, _Component);

  // eslint-disable-next-line react/sort-comp
  function Item(props) {
    var _this;

    _classCallCheck(this, Item);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Item).call(this, props)); // The type of element rendered at the root of render() can vary based on the `href`
    // and `linkComponent` props provided. We generate this component here to avoid re-
    // generating the component inside render(). This is for performance reasons, and also
    // allows us to avoid generating a new `ref` for the root element each render().

    _defineProperty(_assertThisInitialized(_this), "rootComponent", void 0);

    _defineProperty(_assertThisInitialized(_this), "ref", void 0);

    _defineProperty(_assertThisInitialized(_this), "setRef", function (ref) {
      _this.ref = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "href", function () {
      return _this.props.isDisabled ? null : _this.props.href;
    });

    _this.rootComponent = styledRootElement({
      href: _this.href(),
      linkComponent: props.linkComponent
    });
    return _this;
  }

  _createClass(Item, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.ref && this.props.autoFocus) {
        this.ref.focus();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          _onClick = _this$props.onClick,
          _onKeyDown = _this$props.onKeyDown,
          isCompact = _this$props.isCompact,
          isDisabled = _this$props.isDisabled,
          isDragging = _this$props.isDragging,
          isHidden = _this$props.isHidden,
          isSelected = _this$props.isSelected,
          onMouseEnter = _this$props.onMouseEnter,
          onMouseLeave = _this$props.onMouseLeave,
          role = _this$props.role,
          dnd = _this$props.dnd,
          otherProps = _objectWithoutProperties(_this$props, ["onClick", "onKeyDown", "isCompact", "isDisabled", "isDragging", "isHidden", "isSelected", "onMouseEnter", "onMouseLeave", "role", "dnd"]);

      var Root = this.rootComponent;
      var dragHandleProps = dnd && dnd.dragHandleProps || null;
      var patchedEventHandlers = {
        onClick: function onClick(event) {
          var original = function original() {
            if (!isDisabled && _onClick) {
              _onClick(event);
            }
          };

          if (!dragHandleProps || !dragHandleProps.onClick) {
            original();
            return;
          } // Drag and drop has its own disabled mechansim
          // So not checking for isDisabled


          dragHandleProps.onClick(event); // if default is prevent - do not fire the onClick prop

          if (event.defaultPrevented) {
            return;
          }

          original();
        },
        onMouseDown: function onMouseDown(event) {
          if (dragHandleProps && dragHandleProps.onMouseDown) {
            dragHandleProps.onMouseDown(event);
          } // We want to prevent the item from getting focus when clicked


          event.preventDefault();
        },
        onKeyDown: function onKeyDown(event) {
          var original = function original() {
            if (!isDisabled && _onKeyDown) {
              _onKeyDown(event);
            }
          };

          if (!dragHandleProps || !dragHandleProps.onKeyDown) {
            original();
            return;
          }

          dragHandleProps.onKeyDown(event); // if default is prevent - do not fire other handlers

          if (event.defaultPrevented) {
            return;
          } // not allowing keyboard events on the element while dragging


          if (isDragging) {
            return;
          }

          original();
        }
      };

      var patchedInnerRef = function patchedInnerRef(ref) {
        _this2.setRef(ref);

        if (dnd && dnd.innerRef) {
          dnd.innerRef(ref);
        }
      };

      return React.createElement(Root, _extends({
        "aria-disabled": isDisabled,
        href: this.href(),
        isCompact: isCompact,
        isDisabled: isDisabled,
        isDragging: isDragging,
        isHidden: isHidden,
        isSelected: isSelected,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        role: role,
        tabIndex: isDisabled || isHidden || this.props.href ? null : 0,
        target: this.props.target,
        title: this.props.title,
        innerRef: patchedInnerRef
      }, dnd && dnd.draggableProps, dragHandleProps, patchedEventHandlers, otherProps), !!this.props.elemBefore && React.createElement(Before, {
        isCompact: isCompact
      }, this.props.elemBefore), React.createElement(ContentWrapper, null, React.createElement(Content, {
        allowMultiline: this.props.shouldAllowMultiline
      }, this.props.children), !!this.props.description && React.createElement(Description, {
        isCompact: this.props.isCompact,
        isDisabled: this.props.isDisabled
      }, this.props.description)), !!this.props.elemAfter && React.createElement(After, {
        isCompact: isCompact
      }, this.props.elemAfter));
    }
  }]);

  return Item;
}(Component);

_defineProperty(Item, "defaultProps", {
  autoFocus: false,
  description: '',
  isCompact: false,
  isDisabled: false,
  isHidden: false,
  role: 'button',
  shouldAllowMultiline: false
});

export { Item as default };