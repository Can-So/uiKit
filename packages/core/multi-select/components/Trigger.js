import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import { FieldBaseStateless } from '@atlaskit/field-base';
import TagGroup from '@atlaskit/tag-group';
import Tag from '@atlaskit/tag';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import Spinner from '@atlaskit/spinner';
import { Content, Expand, Input, TriggerDiv } from '../styled/Trigger';
import { mapAppearanceToFieldBase } from '../internal/appearances';

var Trigger =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Trigger, _PureComponent);

  function Trigger() {
    _classCallCheck(this, Trigger);

    return _possibleConstructorReturn(this, _getPrototypeOf(Trigger).apply(this, arguments));
  }

  _createClass(Trigger, [{
    key: "render",
    // disabled because all of the accessibility is handled manually

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    value: function render() {
      var _this$props = this.props,
          appearance = _this$props.appearance,
          filterValue = _this$props.filterValue,
          handleItemRemove = _this$props.handleItemRemove,
          handleOnChange = _this$props.handleOnChange,
          handleTriggerClick = _this$props.handleTriggerClick,
          inputRefFunction = _this$props.inputRefFunction,
          icon = _this$props.icon,
          isDisabled = _this$props.isDisabled,
          isFocused = _this$props.isFocused,
          isInvalid = _this$props.isInvalid,
          invalidMessage = _this$props.invalidMessage,
          isLoading = _this$props.isLoading,
          isRequired = _this$props.isRequired,
          onBlur = _this$props.onBlur,
          onFocus = _this$props.onFocus,
          placeholder = _this$props.placeholder,
          selectedItems = _this$props.selectedItems,
          tagGroupRefFunction = _this$props.tagGroupRefFunction;
      return React.createElement(FieldBaseStateless, {
        appearance: mapAppearanceToFieldBase(appearance),
        isDisabled: isDisabled,
        isFitContainerWidthEnabled: true,
        isDialogOpen: isFocused,
        isFocused: isFocused,
        isInvalid: isInvalid,
        invalidMessage: invalidMessage,
        isPaddingDisabled: true,
        isRequired: isRequired,
        onBlur: onBlur,
        onFocus: onFocus
      }, React.createElement(TriggerDiv, {
        isDisabled: isDisabled,
        onClick: handleTriggerClick
      }, React.createElement(Content, null, React.createElement(TagGroup, {
        ref: tagGroupRefFunction
      }, selectedItems.map(function (item) {
        return React.createElement(Tag, {
          appearance: item.tag ? item.tag.appearance : undefined,
          elemBefore: item.tag ? item.tag.elemBefore : undefined,
          key: item.value,
          onAfterRemoveAction: function onAfterRemoveAction() {
            handleItemRemove(item);
          },
          removeButtonText: isDisabled ? undefined : "".concat(item.content, ", remove"),
          text: item.content
        });
      }), isDisabled ? null : React.createElement(Input, {
        disabled: isDisabled,
        onChange: handleOnChange,
        placeholder: placeholder,
        innerRef: inputRefFunction,
        type: "text",
        value: filterValue
      }))), React.createElement(Expand, null, isFocused && isLoading ? React.createElement(Spinner, null) : icon)));
    }
    /* eslint-enable jsx-a11y/no-static-element-interactions */

  }]);

  return Trigger;
}(PureComponent);

_defineProperty(Trigger, "defaultProps", {
  isDisabled: false,
  isLoading: false,
  onClick: function onClick() {},
  icon: React.createElement(ExpandIcon, {
    label: ""
  })
});

export { Trigger as default };