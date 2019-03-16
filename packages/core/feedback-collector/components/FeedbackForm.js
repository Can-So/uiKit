import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Fragment, Component } from 'react';
import { Checkbox } from '@atlaskit/checkbox';
import TextArea from '@atlaskit/textarea';
import Form, { Field } from '@atlaskit/form';
import Modal from '@atlaskit/modal-dialog';
import Select from '@atlaskit/select';
export var fieldLabel = {
  bug: 'Describe the bug or issue',
  comment: "Let us know what's on your mind",
  suggestion: "Let us know what you'd like to improve",
  question: 'What would you like to know?',
  empty: 'Select an option'
};
var selectOptions = [{
  label: 'Ask a question',
  value: 'question'
}, {
  label: 'Leave a comment',
  value: 'comment'
}, {
  label: 'Report a bug',
  value: 'bug'
}, {
  label: 'Suggest an improvement',
  value: 'suggestion'
}];
var defaultSelectValue = {
  label: 'I want to...',
  value: 'empty'
};

var FeedbackForm =
/*#__PURE__*/
function (_Component) {
  _inherits(FeedbackForm, _Component);

  function FeedbackForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FeedbackForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FeedbackForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      type: 'empty',
      description: '',
      canBeContacted: false,
      enrollInResearchGroup: false
    });

    _defineProperty(_assertThisInitialized(_this), "isTypeSelected", function () {
      return _this.state.type !== 'empty';
    });

    _defineProperty(_assertThisInitialized(_this), "onSubmit", function () {
      var _this$state = _this.state,
          type = _this$state.type,
          description = _this$state.description,
          canBeContacted = _this$state.canBeContacted,
          enrollInResearchGroup = _this$state.enrollInResearchGroup;

      _this.props.onSubmit({
        type: type,
        description: description,
        canBeContacted: canBeContacted,
        enrollInResearchGroup: enrollInResearchGroup
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectChange", function (option) {
      _this.setState({
        type: option.value
      });
    });

    return _this;
  }

  _createClass(FeedbackForm, [{
    key: "getActions",
    value: function getActions() {
      var isDisabled = !this.isTypeSelected() || !this.state.description;
      return [{
        text: 'Send feedback',
        appearance: 'primary',
        type: 'submit',
        isDisabled: isDisabled,
        onClick: this.onSubmit
      }, {
        text: 'Cancel',
        onClick: this.props.onClose,
        appearance: 'subtle'
      }];
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(Modal, {
        actions: this.getActions(),
        heading: "Share your thoughts",
        onClose: this.props.onClose
      }, React.createElement(Form, {
        name: "feedback-collector",
        onSubmit: function onSubmit() {
          /* TODO: this is a NOOP until Modal can take a container prop */
        }
      }, function (_ref) {
        var formProps = _ref.formProps;
        return React.createElement("form", formProps, React.createElement(Select, {
          onChange: _this2.onSelectChange,
          menuPortalTarget: document.body,
          styles: {
            menuPortal: function menuPortal(base) {
              return _objectSpread({}, base, {
                zIndex: 9999
              });
            }
          },
          defaultValue: defaultSelectValue,
          options: selectOptions
        }), _this2.isTypeSelected() ? React.createElement(Fragment, null, React.createElement(Field, {
          label: fieldLabel[_this2.state.type],
          isRequired: true,
          name: "description"
        }, function (_ref2) {
          var fieldProps = _ref2.fieldProps;
          return React.createElement(TextArea, _extends({}, fieldProps, {
            name: "foo",
            minimumRows: 6,
            onChange: function onChange(e) {
              return _this2.setState({
                description: e.target.value
              });
            },
            value: _this2.state.description
          }));
        }), React.createElement(Field, {
          name: "can-be-contacted"
        }, function (_ref3) {
          var fieldProps = _ref3.fieldProps;
          return React.createElement(Checkbox, _extends({}, fieldProps, {
            label: "Atlassian can contact me about this feedback",
            onChange: function onChange(event) {
              return _this2.setState({
                canBeContacted: event.target.checked
              });
            }
          }));
        }), React.createElement(Field, {
          name: "enroll-in-research-group"
        }, function (_ref4) {
          var fieldProps = _ref4.fieldProps;
          return React.createElement(Checkbox, _extends({}, fieldProps, {
            label: "I'd like to participate in product research",
            onChange: function onChange(event) {
              return _this2.setState({
                enrollInResearchGroup: event.target.checked
              });
            }
          }));
        })) : React.createElement(Fragment, null));
      }));
    }
  }]);

  return FeedbackForm;
}(Component);

export { FeedbackForm as default };