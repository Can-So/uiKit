import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { Component } from 'react';
import { isSamePath } from '../../utils/path';
import { sameProps } from '../../utils/react';

var TreeItem =
/*#__PURE__*/
function (_Component) {
  _inherits(TreeItem, _Component);

  function TreeItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TreeItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TreeItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "patchDraggableProps", function (draggableProps, snapshot) {
      var _this$props = _this.props,
          path = _this$props.path,
          offsetPerLevel = _this$props.offsetPerLevel;
      var transitions = draggableProps.style && draggableProps.style.transition ? [draggableProps.style.transition] : [];

      if (snapshot.dropAnimation) {
        transitions.push("padding-left ".concat(snapshot.dropAnimation.duration, "s ").concat(snapshot.dropAnimation.curve));
      }

      var transition = transitions.join(', '); //$FlowFixMe

      return _objectSpread({}, draggableProps, {
        style: _objectSpread({}, draggableProps.style, {
          paddingLeft: (path.length - 1) * offsetPerLevel,
          transition: transition
        })
      });
    });

    return _this;
  }

  _createClass(TreeItem, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return !sameProps(this.props, nextProps, ['item', 'provided', 'snapshot']) || !isSamePath(this.props.path, nextProps.path);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          item = _this$props2.item,
          path = _this$props2.path,
          _onExpand = _this$props2.onExpand,
          _onCollapse = _this$props2.onCollapse,
          renderItem = _this$props2.renderItem,
          provided = _this$props2.provided,
          snapshot = _this$props2.snapshot,
          itemRef = _this$props2.itemRef;

      var innerRef = function innerRef(el) {
        itemRef(item.id, el);
        provided.innerRef(el);
      };

      var finalProvided = {
        draggableProps: this.patchDraggableProps(provided.draggableProps, snapshot),
        dragHandleProps: provided.dragHandleProps,
        innerRef: innerRef
      };
      return renderItem({
        item: item,
        depth: path.length - 1,
        onExpand: function onExpand(itemId) {
          return _onExpand(itemId, path);
        },
        onCollapse: function onCollapse(itemId) {
          return _onCollapse(itemId, path);
        },
        provided: finalProvided,
        snapshot: snapshot
      });
    }
  }]);

  return TreeItem;
}(Component);

export { TreeItem as default };