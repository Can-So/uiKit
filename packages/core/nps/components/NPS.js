import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import { NPSWrapper, PageWrapper } from './styled/nps';
var Pages = {
  FEEDBACK: 'feedback',
  FOLLOWUP: 'followup',
  THANKYOU: 'thankyou'
};

var NPS =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NPS, _React$Component);

  function NPS(props) {
    var _this;

    _classCallCheck(this, NPS);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NPS).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onClose", function () {
      _this.props.onClose();
    });

    _defineProperty(_assertThisInitialized(_this), "onOptOut", function () {
      _this.props.onOptOut();
    });

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

    _defineProperty(_assertThisInitialized(_this), "onFeedbackSubmit", function (_ref) {
      var rating = _ref.rating,
          comment = _ref.comment;

      try {
        _this.setState({
          rating: rating,
          comment: comment,
          page: Pages.FOLLOWUP
        });

        var result = _this._getNPSResult();

        _this.props.onFeedbackSubmit(result);
      } catch (error) {
        /* Form submitted in invalid state, do nothing */
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onFollowupSubmit", function (_ref2) {
      var role = _ref2.role,
          allowContact = _ref2.allowContact;

      try {
        _this.setState({
          page: Pages.THANKYOU,
          role: role,
          allowContact: allowContact
        });

        var result = _this._getNPSResult();

        _this.props.onFollowupSubmit(result);

        _this.onFinish();
      } catch (error) {
        /* Form submitted in invalid state, do nothing */
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onRoleSelect", function (role) {
      _this.setState({
        role: role
      });

      _this.props.onRoleSelect(role);
    });

    _defineProperty(_assertThisInitialized(_this), "onAllowContactChange", function (allowContact) {
      _this.setState({
        allowContact: allowContact
      });

      _this.props.onAllowContactChange(allowContact);
    });

    _defineProperty(_assertThisInitialized(_this), "onFinish", function () {
      try {
        var result = _this._getNPSResult();

        _this.props.onFinish(result);
      } catch (error) {
        /* Form submitted in invalid state, do nothing */
      }
    });

    _this.state = {
      page: Pages.FEEDBACK,
      rating: null,
      comment: '',
      role: null,
      allowContact: false
    };
    return _this;
  }

  _createClass(NPS, [{
    key: "_getNPSResult",
    value: function _getNPSResult() {
      if (this.state.rating === null) {
        throw new Error('Could get create NPSResult from form values, rating is missing');
      }

      var _this$state = this.state,
          rating = _this$state.rating,
          comment = _this$state.comment,
          role = _this$state.role,
          allowContact = _this$state.allowContact;
      return {
        comment: comment,
        role: role,
        allowContact: allowContact,
        rating: rating
      };
    }
  }, {
    key: "getPage",
    value: function getPage() {
      var page = this.state.page;
      var _this$props = this.props,
          canClose = _this$props.canClose,
          canOptOut = _this$props.canOptOut;

      switch (page) {
        case Pages.FEEDBACK:
          {
            var renderFeedback = this.props.renderFeedback;
            return renderFeedback({
              canClose: canClose,
              canOptOut: canOptOut,
              onClose: this.onClose,
              onOptOut: this.onOptOut,
              onRatingSelect: this.onRatingSelect,
              onCommentChange: this.onCommentChange,
              onSubmit: this.onFeedbackSubmit
            });
          }

        case Pages.FOLLOWUP:
          {
            var renderFollowup = this.props.renderFollowup;
            return renderFollowup({
              canClose: canClose,
              canOptOut: canOptOut,
              onClose: this.onClose,
              onOptOut: this.onOptOut,
              onRoleSelect: this.onRoleSelect,
              onAllowContactChange: this.onAllowContactChange,
              onSubmit: this.onFollowupSubmit
            });
          }

        case Pages.THANKYOU:
          {
            var renderThankyou = this.props.renderThankyou;
            return renderThankyou({
              canClose: canClose,
              canOptOut: canOptOut,
              onClose: this.onClose,
              onOptOut: this.onOptOut
            });
          }

        default:
          {
            throw new Error("Page ".concat(page, " not found"));
          }
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(NPSWrapper, null, React.createElement(PageWrapper, null, this.getPage()));
    }
  }]);

  return NPS;
}(React.Component);

_defineProperty(NPS, "defaultProps", {
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

export { NPS as default };