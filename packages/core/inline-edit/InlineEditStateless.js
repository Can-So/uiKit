import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component, cloneElement } from 'react';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@findable/analytics-next';
import Button from '@findable/button';
import ConfirmIcon from '@findable/icon/glyph/check';
import CancelIcon from '@findable/icon/glyph/cross';
import FieldBase, { Label } from '@findable/field-base';
import { name as packageName, version as packageVersion } from './version.json';
import RootWrapper from './styled/RootWrapper';
import ContentWrapper from './styled/ContentWrapper';
import ReadViewContentWrapper from './styled/ReadViewContentWrapper';
import FieldBaseWrapper from './styled/FieldBaseWrapper';
import ButtonsWrapper from './styled/ButtonsWrapper';
import ButtonWrapper from './styled/ButtonWrapper';
import EditButton from './styled/EditButton';
var DRAG_THRESHOLD = 5;

var InlineEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(InlineEdit, _Component);

  function InlineEdit() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, InlineEdit);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(InlineEdit)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "confirmButtonRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "cancelButtonRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      fieldBaseWrapperIsHover: false,
      wasFocusReceivedSinceLastBlur: false,
      startX: 0,
      startY: 0
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseDown", function (client) {
      return _this.setState({
        startX: client.clientX,
        startY: client.clientY
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onWrapperClick", function (e) {
      if (!_this.isReadOnly() && !_this.props.isEditing && !_this.mouseHasMoved(e)) {
        _this.props.onEditRequested();
      } else {
        e.preventDefault();
        e.stopPropagation();
      }

      _this.setState({
        startX: 0,
        startY: 0
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onWrapperBlur", function () {
      if (_this.isReadOnly() || !_this.props.isEditing || _this.props.isConfirmOnBlurDisabled) {
        return;
      }

      _this.setState({
        wasFocusReceivedSinceLastBlur: false
      });

      setTimeout(_this.confirmIfUnfocused, 10);
    });

    _defineProperty(_assertThisInitialized(_this), "onWrapperFocus", function () {
      _this.setState({
        wasFocusReceivedSinceLastBlur: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onConfirmClick", function (event) {
      if (_this.confirmButtonRef) {
        _this.confirmButtonRef.focus();
      }

      event.preventDefault();

      _this.props.onConfirm();
    });

    _defineProperty(_assertThisInitialized(_this), "onCancelClick", function (event) {
      if (_this.cancelButtonRef) {
        _this.cancelButtonRef.focus();
      }

      event.preventDefault();

      _this.props.onCancel();
    });

    _defineProperty(_assertThisInitialized(_this), "onDialogClick", function (event) {
      event.stopPropagation();
    });

    _defineProperty(_assertThisInitialized(_this), "onFieldBaseWrapperMouseEnter", function () {
      return _this.setState({
        fieldBaseWrapperIsHover: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onFieldBaseWrapperMouseLeave", function () {
      return _this.setState({
        fieldBaseWrapperIsHover: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "mouseHasMoved", function (event) {
      var startX = _this.state.startX;
      var startY = _this.state.startY;
      return Math.abs(startX - event.clientX) >= DRAG_THRESHOLD || Math.abs(startY - event.clientY) >= DRAG_THRESHOLD;
    });

    _defineProperty(_assertThisInitialized(_this), "confirmIfUnfocused", function () {
      if (!_this.state.wasFocusReceivedSinceLastBlur) {
        _this.props.onConfirm();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "isReadOnly", function () {
      return !_this.props.editView;
    });

    _defineProperty(_assertThisInitialized(_this), "shouldShowEditView", function () {
      return _this.props.isEditing && !_this.isReadOnly();
    });

    _defineProperty(_assertThisInitialized(_this), "shouldRenderEditIcon", function () {
      return !_this.isReadOnly() && !_this.props.isInvalid;
    });

    _defineProperty(_assertThisInitialized(_this), "shouldRenderSpinner", function () {
      return _this.props.isWaiting && _this.props.isEditing;
    });

    _defineProperty(_assertThisInitialized(_this), "wrapWithFieldBase", function (children) {
      var _this$props = _this.props,
          invalidMessage = _this$props.invalidMessage,
          isEditing = _this$props.isEditing,
          isFitContainerWidthReadView = _this$props.isFitContainerWidthReadView,
          isInvalid = _this$props.isInvalid;
      return React.createElement(FieldBase, {
        isInvalid: isInvalid,
        isReadOnly: _this.isReadOnly(),
        isFitContainerWidthEnabled: isEditing || isFitContainerWidthReadView,
        appearance: isEditing ? 'standard' : 'subtle',
        isDisabled: _this.shouldRenderSpinner(),
        isLoading: _this.shouldRenderSpinner(),
        invalidMessage: invalidMessage,
        onDialogClick: _this.onDialogClick
      }, children);
    });

    _defineProperty(_assertThisInitialized(_this), "renderActionButtons", function () {
      return _this.props.isEditing && !_this.props.areActionButtonsHidden ? React.createElement(ButtonsWrapper, null, React.createElement(ButtonWrapper, null, React.createElement(Button, {
        ariaLabel: _this.props.confirmButtonLabel,
        type: "submit",
        iconBefore: React.createElement(ConfirmIcon, {
          size: "small"
        }),
        onClick: _this.onConfirmClick,
        shouldFitContainer: true,
        innerRef: function innerRef(ref) {
          _this.confirmButtonRef = ref;
        }
      })), React.createElement(ButtonWrapper, null, React.createElement(Button, {
        ariaLabel: _this.props.cancelButtonLabel,
        iconBefore: React.createElement(CancelIcon, {
          size: "small"
        }),
        onClick: _this.onCancelClick,
        shouldFitContainer: true,
        innerRef: function innerRef(ref) {
          _this.cancelButtonRef = ref;
        }
      }))) : null;
    });

    _defineProperty(_assertThisInitialized(_this), "renderReadView", function () {
      return _this.wrapWithFieldBase(React.createElement(ReadViewContentWrapper, null, _this.props.readView, React.createElement(EditButton, {
        "aria-label": _this.props.editButtonLabel,
        type: "button",
        fieldBaseWrapperIsHover: _this.state.fieldBaseWrapperIsHover
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "renderEditView", function () {
      var editView = _this.props.shouldConfirmOnEnter ? // $FlowFixMe - suppress errors because of issues with not being able to define iterable
      cloneElement(_this.props.editView, {
        onConfirm: _this.props.onConfirm
      }) : _this.props.editView;
      return _this.props.disableEditViewFieldBase ? editView : _this.wrapWithFieldBase(editView);
    });

    return _this;
  }

  _createClass(InlineEdit, [{
    key: "render",
    value: function render() {
      var showEditView = this.shouldShowEditView();
      var displayFullWidth = showEditView || this.props.isFitContainerWidthReadView;
      return React.createElement(RootWrapper, {
        isEditing: this.props.isEditing
      }, React.createElement("div", {
        style: {
          position: this.props.isLabelHidden ? 'absolute' : 'relative'
        }
      }, React.createElement(Label, {
        appearance: "inline-edit",
        label: this.props.label,
        isLabelHidden: this.props.isLabelHidden,
        htmlFor: this.isReadOnly() ? undefined : this.props.labelHtmlFor,
        onClick: this.onWrapperClick,
        onMouseDown: this.onMouseDown
      })), React.createElement(ContentWrapper, {
        onBlur: this.onWrapperBlur,
        onFocus: this.onWrapperFocus
      }, React.createElement(FieldBaseWrapper // eslint-disable-line jsx-a11y/no-static-element-interactions
      , {
        onClick: this.onWrapperClick,
        onMouseEnter: this.onFieldBaseWrapperMouseEnter,
        onMouseLeave: this.onFieldBaseWrapperMouseLeave,
        onMouseDown: this.onMouseDown,
        displayFullWidth: displayFullWidth
      }, showEditView ? this.renderEditView() : this.renderReadView()), !this.shouldRenderSpinner() ? this.renderActionButtons() : null));
    }
  }]);

  return InlineEdit;
}(Component);

_defineProperty(InlineEdit, "defaultProps", {
  areActionButtonsHidden: false,
  disableEditViewFieldBase: false,
  invalidMessage: '',
  isConfirmOnBlurDisabled: false,
  isInvalid: false,
  isLabelHidden: false,
  isWaiting: false,
  shouldConfirmOnEnter: false,
  editButtonLabel: 'Edit',
  confirmButtonLabel: 'Confirm',
  cancelButtonLabel: 'Cancel'
});

export { InlineEdit as InlineEditStatelessWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'inlineEdit',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onCancel: createAndFireEventOnAtlaskit({
    action: 'canceled',
    actionSubject: 'inlineEdit',
    attributes: {
      componentName: 'inlineEdit',
      packageName: packageName,
      packageVersion: packageVersion
    }
  }),
  onConfirm: createAndFireEventOnAtlaskit({
    action: 'confirmed',
    actionSubject: 'inlineEdit',
    attributes: {
      componentName: 'inlineEdit',
      packageName: packageName,
      packageVersion: packageVersion
    }
  }),
  onEditRequested: createAndFireEventOnAtlaskit({
    action: 'focused',
    actionSubject: 'inlineEdit',
    attributes: {
      componentName: 'inlineEdit',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(InlineEdit));