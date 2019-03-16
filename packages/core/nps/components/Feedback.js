import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import Button, { ButtonGroup } from '@findable/button';
import FieldTextArea from '@findable/field-text-area';
import { Header, Description } from './common';
import { ScoreContainer, Scale, Comment as StyledComment } from './styled/feedback';
import { Wrapper, ButtonWrapper } from './styled/common';
export var CommentBox = function CommentBox(_ref) {
  var placeholder = _ref.placeholder,
      onCommentChange = _ref.onCommentChange;
  return React.createElement(StyledComment, null, React.createElement(FieldTextArea, {
    autoFocus: true,
    shouldFitContainer: true,
    placeholder: placeholder,
    isLabelHidden: true,
    minimumRows: 3,
    onChange: function onChange(e) {
      return onCommentChange(e.target.value);
    }
  }));
};
export var SendButton = function SendButton(_ref2) {
  var onClick = _ref2.onClick,
      sendLabel = _ref2.sendLabel;
  return React.createElement(ButtonWrapper, null, React.createElement(Button, {
    appearance: "primary",
    onClick: onClick
  }, sendLabel));
};
export var RatingsButtons = function RatingsButtons(_ref3) {
  var selected = _ref3.selected,
      onRatingSelect = _ref3.onRatingSelect;
  return React.createElement(ButtonGroup, null, Array.from(Array(11), function (_, i) {
    return React.createElement(Button, {
      key: "nps-button-rating-".concat(i),
      isSelected: selected === i,
      onClick: function onClick() {
        onRatingSelect(i);
      }
    }, i.toString());
  }));
};

var Feedback =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Feedback, _React$Component);

  function Feedback(props) {
    var _this;

    _classCallCheck(this, Feedback);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Feedback).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onRatingSelect", function (rating) {
      _this.setState({
        rating: rating
      });

      _this.props.onRatingSelect(rating);
    });

    _defineProperty(_assertThisInitialized(_this), "onCommentChange", function (comment) {
      _this.setState({
        comment: comment
      });

      _this.props.onCommentChange(comment);
    });

    _defineProperty(_assertThisInitialized(_this), "onSubmit", function () {
      var _this$state = _this.state,
          rating = _this$state.rating,
          comment = _this$state.comment;

      _this.props.onSubmit({
        rating: rating,
        comment: comment
      });
    });

    _this.state = {
      rating: null,
      comment: ''
    };
    return _this;
  }

  _createClass(Feedback, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          messages = _this$props.messages,
          canClose = _this$props.canClose,
          onClose = _this$props.onClose,
          canOptOut = _this$props.canOptOut,
          onOptOut = _this$props.onOptOut;
      return React.createElement("div", null, React.createElement(Header, {
        title: messages.title,
        canClose: canClose,
        onClose: onClose,
        canOptOut: canOptOut,
        onOptOut: onOptOut,
        optOutLabel: messages.optOut
      }), React.createElement(Description, null, messages.description), React.createElement(Wrapper, null, React.createElement(ScoreContainer, null, React.createElement(Scale, null, messages.scaleLow), React.createElement(RatingsButtons, {
        selected: this.state.rating,
        onRatingSelect: this.onRatingSelect
      }), React.createElement(Scale, null, messages.scaleHigh))), this.state.rating !== null ? React.createElement(Wrapper, null, React.createElement(CommentBox, {
        placeholder: messages.commentPlaceholder,
        onCommentChange: this.onCommentChange
      }), React.createElement(SendButton, {
        onClick: this.onSubmit,
        sendLabel: messages.done
      })) : null);
    }
  }]);

  return Feedback;
}(React.Component);

_defineProperty(Feedback, "defaultProps", {
  onRatingSelect: function onRatingSelect() {},
  onCommentChange: function onCommentChange() {}
});

export { Feedback as default };