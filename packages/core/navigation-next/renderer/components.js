import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "@babel/runtime/helpers/extends";
import { css as _css2 } from "emotion";
import { css as _css } from "emotion";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React, { PureComponent } from 'react';
import { gridSize as gridSizeFn } from '@findable/theme';
import { navigationItemClicked } from '../common/analytics';
import RenderBlocker from '../components/common/RenderBlocker';
import ContainerHeaderComponent from '../components/presentational/ContainerHeader';
import GroupComponent from '../components/presentational/Group';
import GroupHeadingComponent from '../components/presentational/GroupHeading';
import HeaderSectionComponent from '../components/presentational/HeaderSection';
import MenuSectionComponent from '../components/presentational/MenuSection';
import SectionComponent from '../components/presentational/Section';
import SectionHeadingComponent from '../components/presentational/SectionHeading';
import Separator from '../components/presentational/Separator';
import Switcher from '../components/presentational/Switcher';
import Wordmark from '../components/presentational/Wordmark';
import BackItem from '../components/connected/BackItem';
import ConnectedItem from '../components/connected/ConnectedItem';
import GoToItem from '../components/connected/GoToItem';
import SortableContextComponent from '../components/connected/SortableContext';
import SortableGroupComponent from '../components/connected/SortableGroup';
import SortableItem from '../components/connected/SortableItem';
var gridSize = gridSizeFn();
/**
 * ITEMS
 */
// Title

var GroupHeading = function GroupHeading(_ref) {
  var text = _ref.text,
      props = _objectWithoutProperties(_ref, ["text"]);

  return React.createElement(GroupHeadingComponent, props, text);
}; // SectionHeading


var SectionHeading = function SectionHeading(_ref2) {
  var text = _ref2.text,
      props = _objectWithoutProperties(_ref2, ["text"]);

  return React.createElement(SectionHeadingComponent, props, text);
}; // ContainerHeader


var _ref3 = {
  paddingBottom: gridSize * 2.5 - 2
};

var ContainerHeader = function ContainerHeader(props) {
  return (// -2px here to account for the extra space at the top of a MenuSection for
    // the scroll hint.
    React.createElement("div", {
      className: _css(_ref3)
    }, React.createElement(ContainerHeaderComponent, props))
  );
};

var _ref4 = {
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  fontSize: '10px',
  overflowX: 'auto',
  padding: "".concat(gridSize / 2, "px")
};

var Debug = function Debug(props) {
  return React.createElement("pre", {
    className: _css2(_ref4)
  }, JSON.stringify(props, null, 2));
};
/**
 * GROUPS
 */
// Group


var Group = function Group(_ref5) {
  var customComponents = _ref5.customComponents,
      hasSeparator = _ref5.hasSeparator,
      heading = _ref5.heading,
      items = _ref5.items,
      id = _ref5.id;
  return items.length ? React.createElement(GroupComponent, {
    heading: heading,
    hasSeparator: hasSeparator,
    id: id
  }, React.createElement(TypedItemsRenderer, {
    items: items,
    customComponents: customComponents
  })) : null;
};

var SortableGroup = function SortableGroup(_ref6) {
  var customComponents = _ref6.customComponents,
      hasSeparator = _ref6.hasSeparator,
      heading = _ref6.heading,
      items = _ref6.items,
      id = _ref6.id;
  return items && items.length ? React.createElement(SortableGroupComponent, {
    heading: heading,
    hasSeparator: hasSeparator,
    id: id
  }, React.createElement(RenderBlocker, {
    items: items,
    customComponents: customComponents
  }, React.createElement(TypedItemsRenderer, {
    items: items,
    customComponents: customComponents
  }))) : null;
}; // Section


var Section = function Section(_ref7) {
  var _ref7$alwaysShowScrol = _ref7.alwaysShowScrollHint,
      alwaysShowScrollHint = _ref7$alwaysShowScrol === void 0 ? false : _ref7$alwaysShowScrol,
      customComponents = _ref7.customComponents,
      id = _ref7.id,
      items = _ref7.items,
      nestedGroupKey = _ref7.nestedGroupKey,
      parentId = _ref7.parentId,
      shouldGrow = _ref7.shouldGrow;
  return items.length ? React.createElement(SectionComponent, {
    alwaysShowScrollHint: alwaysShowScrollHint,
    id: id,
    key: nestedGroupKey,
    parentId: parentId,
    shouldGrow: shouldGrow
  }, function (_ref8) {
    var className = _ref8.className;
    return React.createElement("div", {
      className: className
    }, React.createElement(TypedItemsRenderer, {
      items: items,
      customComponents: customComponents
    }));
  }) : null;
};

var HeaderSection = function HeaderSection(_ref9) {
  var customComponents = _ref9.customComponents,
      id = _ref9.id,
      items = _ref9.items,
      nestedGroupKey = _ref9.nestedGroupKey;
  return items.length ? React.createElement(HeaderSectionComponent, {
    id: id,
    key: nestedGroupKey
  }, function (_ref10) {
    var className = _ref10.className;
    return React.createElement("div", {
      className: className
    }, React.createElement(TypedItemsRenderer, {
      items: items,
      customComponents: customComponents
    }));
  }) : null;
};

var MenuSection = function MenuSection(_ref11) {
  var alwaysShowScrollHint = _ref11.alwaysShowScrollHint,
      customComponents = _ref11.customComponents,
      id = _ref11.id,
      items = _ref11.items,
      nestedGroupKey = _ref11.nestedGroupKey,
      parentId = _ref11.parentId;
  return React.createElement(MenuSectionComponent, {
    alwaysShowScrollHint: alwaysShowScrollHint,
    id: id,
    key: nestedGroupKey,
    parentId: parentId
  }, function (_ref12) {
    var className = _ref12.className;
    return React.createElement("div", {
      className: className
    }, React.createElement(TypedItemsRenderer, {
      items: items,
      customComponents: customComponents
    }));
  });
};

var SortableContext = function SortableContext(_ref13) {
  var customComponents = _ref13.customComponents,
      id = _ref13.id,
      items = _ref13.items,
      onDragStart = _ref13.onDragStart,
      onDragUpdate = _ref13.onDragUpdate,
      onDragEnd = _ref13.onDragEnd;
  return items && items.length ? React.createElement(SortableContextComponent, {
    id: id,
    onDragStart: onDragStart,
    onDragUpdate: onDragUpdate,
    onDragEnd: onDragEnd
  }, React.createElement(TypedItemsRenderer, {
    items: items,
    customComponents: customComponents
  })) : null;
};

var itemComponents = {
  BackItem: BackItem,
  ContainerHeader: ContainerHeader,
  Debug: Debug,
  GoToItem: GoToItem,
  GroupHeading: GroupHeading,
  Item: ConnectedItem,
  SortableItem: SortableItem,
  SectionHeading: SectionHeading,
  Separator: Separator,
  Switcher: Switcher,
  Wordmark: Wordmark
};

var renderItemComponent = function renderItemComponent(props, key, index) {
  var element = null; // We need an explicit conditional against each type for flow type refinement to work

  if (props.type === 'BackItem') {
    var type = props.type,
        compProps = _objectWithoutProperties(props, ["type"]);

    element = React.createElement(BackItem, _extends({
      key: key
    }, compProps, {
      index: index
    }));
  } else if (props.type === 'ContainerHeader') {
    var _type = props.type,
        _compProps = _objectWithoutProperties(props, ["type"]);

    element = React.createElement(ContainerHeader, _extends({
      key: key
    }, _compProps));
  } else if (props.type === 'Debug') {
    var _type2 = props.type,
        _compProps2 = _objectWithoutProperties(props, ["type"]);

    element = React.createElement(Debug, _extends({
      key: key
    }, _compProps2));
  } else if (props.type === 'GoToItem') {
    var _type3 = props.type,
        _compProps3 = _objectWithoutProperties(props, ["type"]);

    element = React.createElement(GoToItem, _extends({
      key: key
    }, _compProps3, {
      index: index
    }));
  } else if (props.type === 'Item') {
    var _type4 = props.type,
        _compProps4 = _objectWithoutProperties(props, ["type"]);

    element = React.createElement(ConnectedItem, _extends({
      key: key
    }, _compProps4, {
      index: index
    }));
  } else if (props.type === 'SortableItem') {
    var _type5 = props.type,
        _compProps5 = _objectWithoutProperties(props, ["type"]);

    element = React.createElement(SortableItem, _extends({
      key: key
    }, _compProps5, {
      index: index
    }));
  } else if (props.type === 'SectionHeading') {
    var _type6 = props.type,
        id = props.id,
        _compProps6 = _objectWithoutProperties(props, ["type", "id"]);

    element = React.createElement(SectionHeading, _extends({
      key: key
    }, _compProps6));
  } else if (props.type === 'Separator') {
    var _type7 = props.type,
        _id = props.id,
        _compProps7 = _objectWithoutProperties(props, ["type", "id"]);

    element = React.createElement(Separator, _extends({
      key: key
    }, _compProps7));
  } else if (props.type === 'Switcher') {
    var _type8 = props.type,
        _compProps8 = _objectWithoutProperties(props, ["type"]);

    element = React.createElement(Switcher, _extends({
      key: key
    }, _compProps8));
  } else if (props.type === 'Wordmark') {
    var _type9 = props.type,
        _id2 = props.id,
        _compProps9 = _objectWithoutProperties(props, ["type", "id"]);

    element = React.createElement(Wordmark, _extends({
      key: key
    }, _compProps9));
  }

  return element;
};

var groupComponents = {
  Group: Group,
  HeaderSection: HeaderSection,
  MenuSection: MenuSection,
  Section: Section,
  SortableContext: SortableContext,
  SortableGroup: SortableGroup
};

var renderGroupComponent = function renderGroupComponent(props, key, customComponents) {
  var element = null; // We need an explicit conditional against each type for flow type refinement to work

  if (props.type === 'Group') {
    var type = props.type,
        compProps = _objectWithoutProperties(props, ["type"]);

    element = React.createElement(Group, _extends({
      key: key
    }, compProps, {
      customComponents: customComponents
    }));
  } else if (props.type === 'HeaderSection') {
    var _type10 = props.type,
        _compProps10 = _objectWithoutProperties(props, ["type"]);

    element = React.createElement(HeaderSection, _extends({
      key: key
    }, _compProps10, {
      customComponents: customComponents
    }));
  } else if (props.type === 'MenuSection') {
    var _type11 = props.type,
        _compProps11 = _objectWithoutProperties(props, ["type"]);

    element = React.createElement(MenuSection, _extends({
      key: key
    }, _compProps11, {
      customComponents: customComponents
    }));
  } else if (props.type === 'Section') {
    var _type12 = props.type,
        _compProps12 = _objectWithoutProperties(props, ["type"]);

    element = React.createElement(Section, _extends({
      key: key
    }, _compProps12, {
      customComponents: customComponents
    }));
  } else if (props.type === 'SortableContext') {
    var _type13 = props.type,
        _compProps13 = _objectWithoutProperties(props, ["type"]);

    element = React.createElement(SortableContext, _extends({
      key: key
    }, _compProps13, {
      customComponents: customComponents
    }));
  } else if (props.type === 'SortableGroup') {
    var _type14 = props.type,
        _compProps14 = _objectWithoutProperties(props, ["type"]);

    element = React.createElement(SortableGroup, _extends({
      key: key
    }, _compProps14, {
      customComponents: customComponents
    }));
  }

  return element;
}; // Exported for testing purposes only.


export var components = _objectSpread({}, itemComponents, groupComponents);
/**
 * RENDERER
 */

var TypedItemsRenderer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(TypedItemsRenderer, _PureComponent);

  function TypedItemsRenderer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TypedItemsRenderer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TypedItemsRenderer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "customComponentsWithAnalytics", new Map());

    _defineProperty(_assertThisInitialized(_this), "getCustomComponent", function (component) {
      // cache custom components wrapped with analytics
      // to prevent re-mounting of component on re-render
      var _this$props$customCom = _this.props.customComponents,
          customComponents = _this$props$customCom === void 0 ? {} : _this$props$customCom;

      var cachedComponent = _this.customComponentsWithAnalytics.get(component);

      if (!cachedComponent) {
        cachedComponent = typeof component === 'string' ? navigationItemClicked(customComponents[component], component) : navigationItemClicked(component, component.displayName || 'inlineCustomComponent');

        _this.customComponentsWithAnalytics.set(component, cachedComponent);
      }

      return cachedComponent;
    });

    return _this;
  }

  _createClass(TypedItemsRenderer, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          _this$props$customCom2 = _this$props.customComponents,
          customComponents = _this$props$customCom2 === void 0 ? {} : _this$props$customCom2,
          items = _this$props.items; // We cannot destructure props.type otherwise flow type refinment does not work
      // https://github.com/facebook/flow/issues/5259

      return items.map(function (props, index) {
        var key = typeof props.nestedGroupKey === 'string' ? props.nestedGroupKey : props.id;

        if (props.type === 'InlineComponent') {
          var type = props.type,
              component = props.component,
              componentProps = _objectWithoutProperties(props, ["type", "component"]); // If they've provided a component as the type


          var CustomComponent = _this2.getCustomComponent(props.component);

          return React.createElement(CustomComponent, _extends({
            key: key
          }, componentProps, {
            index: index // We pass our in-built components through to custom components so
            // they can wrap/render them if they want to.
            ,
            components: components,
            customComponents: customComponents
          }));
        } else if (Object.keys(groupComponents).includes(props.type)) {
          // If they've provided a type which matches one of our in-built group
          // components
          return renderGroupComponent(props, key, customComponents); // If they've provided a type which matches one of our in-built item
          // components.
        } else if (Object.keys(itemComponents).includes(props.type)) {
          return renderItemComponent(props, key, index);
        } else if (Object.keys(customComponents).includes(props.type)) {
          var _type15 = props.type,
              _componentProps = _objectWithoutProperties(props, ["type"]); // If they've provided a type which matches one of their defined custom
          // components.


          var _CustomComponent = _this2.getCustomComponent(_type15);

          return React.createElement(_CustomComponent, _extends({
            key: key
          }, _componentProps, {
            index: index // We pass our in-built components through to custom components so
            // they can wrap/render them if they want to.
            ,
            components: components,
            customComponents: customComponents
          }));
        }

        return React.createElement(Debug, _extends({
          key: key,
          type: props.type
        }, props));
      });
    }
  }]);

  return TypedItemsRenderer;
}(PureComponent);

export default TypedItemsRenderer;