import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import NPS from './NPS';
import Feedback from './Feedback';
import Followup from './Followup';
import Thankyou from './Thankyou';
export function getDefaultMessages(product) {
  return {
    feedbackTitle: 'Tell us what you think',
    feedbackDescription: "How likely are you to recommend ".concat(product, " to a friend or colleague?"),
    followupTitle: 'Tell us what you think',
    followupDescription: "Thanks for your response! To help us improve ".concat(product, ", we'd love to discuss your comment in more detail. If you're not keen to discuss it, uncheck the box below."),
    thankyouTitle: 'Thanks for your comment!',
    thankyouDescription: "We'll use your comment to improve ".concat(product, "."),
    optOut: 'Dismiss Forever',
    scaleLow: 'Not likely',
    scaleHigh: 'Extremely likely',
    commentPlaceholder: "What's the main reason for your score?",
    roleQuestion: 'Which of these best describes your role at your company? (Optional)',
    rolePlaceholder: 'Choose role',
    contactQuestion: "It's okay to contact me about my comment.",
    send: 'Send',
    done: 'Done'
  };
}
export var getDefaultRoles = function getDefaultRoles() {
  return ['Management', 'Software Engineering', 'Design', 'Quality Assurance', 'Product Management', 'Systems Administration', 'Other'];
};

// This component is stateless, but the Props documentation util did not work when this was a functional component
var DefaultNPS =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DefaultNPS, _React$Component);

  function DefaultNPS() {
    _classCallCheck(this, DefaultNPS);

    return _possibleConstructorReturn(this, _getPrototypeOf(DefaultNPS).apply(this, arguments));
  }

  _createClass(DefaultNPS, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          product = _this$props.product,
          canClose = _this$props.canClose,
          canOptOut = _this$props.canOptOut,
          roles = _this$props.roles,
          onClose = _this$props.onClose,
          onRatingSelect = _this$props.onRatingSelect,
          onCommentChange = _this$props.onCommentChange,
          onRoleSelect = _this$props.onRoleSelect,
          onAllowContactChange = _this$props.onAllowContactChange,
          onOptOut = _this$props.onOptOut,
          onFeedbackSubmit = _this$props.onFeedbackSubmit,
          onFollowupSubmit = _this$props.onFollowupSubmit,
          onFinish = _this$props.onFinish;
      var defaultMessages = getDefaultMessages(product);
      return React.createElement(NPS, {
        canClose: canClose,
        canOptOut: canOptOut,
        onClose: onClose,
        onOptOut: onOptOut,
        onRatingSelect: onRatingSelect,
        onCommentChange: onCommentChange,
        onRoleSelect: onRoleSelect,
        onAllowContactChange: onAllowContactChange,
        onFeedbackSubmit: onFeedbackSubmit,
        onFollowupSubmit: onFollowupSubmit,
        onFinish: onFinish,
        renderFeedback: function renderFeedback(feedbackProps) {
          return React.createElement(Feedback, _extends({}, feedbackProps, {
            messages: _objectSpread({}, defaultMessages, {
              optOutLabel: defaultMessages.optOut,
              title: defaultMessages.feedbackTitle,
              description: defaultMessages.feedbackDescription
            })
          }));
        },
        renderFollowup: function renderFollowup(followupProps) {
          return React.createElement(Followup, _extends({}, followupProps, {
            roles: roles,
            messages: _objectSpread({}, defaultMessages, {
              title: defaultMessages.followupTitle,
              description: defaultMessages.followupDescription
            })
          }));
        },
        renderThankyou: function renderThankyou(thankyouProps) {
          return React.createElement(Thankyou, _extends({}, thankyouProps, {
            messages: _objectSpread({}, defaultMessages, {
              title: defaultMessages.thankyouTitle,
              description: defaultMessages.thankyouDescription
            })
          }));
        }
      });
    }
  }]);

  return DefaultNPS;
}(React.Component);

_defineProperty(DefaultNPS, "defaultProps", {
  roles: getDefaultRoles(),
  canClose: true,
  canOptOut: false,
  onClose: function onClose() {},
  onOptOut: function onOptOut() {},
  onFinish: function onFinish() {},
  onRatingSelect: function onRatingSelect() {},
  onCommentChange: function onCommentChange() {},
  onRoleSelect: function onRoleSelect() {},
  onAllowContactChange: function onAllowContactChange() {},
  onFeedbackSubmit: function onFeedbackSubmit() {},
  onFollowupSubmit: function onFollowupSubmit() {}
});

export { DefaultNPS as default };