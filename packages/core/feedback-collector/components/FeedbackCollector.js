import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import truncate from 'lodash.truncate';
import FeedbackForm from './FeedbackForm';
var MAX_SUMMARY_LENGTH_CHARS = 100;

var singleLineTruncatedText = function singleLineTruncatedText(text) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : MAX_SUMMARY_LENGTH_CHARS;
  var singleLineText = text.replace(/\n/g, ' ');
  return truncate(singleLineText, {
    length: length
  });
};

var FeedbackCollector =
/*#__PURE__*/
function (_Component) {
  _inherits(FeedbackCollector, _Component);

  function FeedbackCollector() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FeedbackCollector);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FeedbackCollector)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "postFeedback", function (formValues) {
      var body = _this.mapFormToJSD(formValues);

      fetch("https://jsd-widget.atlassian.com/api/embeddable/".concat(_this.props.embeddableKey, "/request?requestTypeId=").concat(_this.props.requestTypeId), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      _this.props.onClose(); // slightly delay confirming submit since we don't wait for the REST call to succeed


      setTimeout(_this.props.onSubmit, _this.props.timeoutOnSubmit);
    });

    return _this;
  }

  _createClass(FeedbackCollector, [{
    key: "getTypeFieldValue",
    value: function getTypeFieldValue(type) {
      switch (type) {
        case 'bug':
          return this.props.typeBugDefaultValue;

        case 'comment':
          return this.props.typeCommentDefaultValue;

        case 'suggestion':
          return this.props.typeSuggestionDefaultValue;

        case 'question':
          return this.props.typeQuestionDefaultValue;

        case 'empty':
        default:
          return this.props.typeEmptyDefaultValue;
      }
    }
  }, {
    key: "getEmail",
    value: function getEmail(formValues) {
      return formValues.canBeContacted && this.props.email ? this.props.email : this.props.emailDefaultValue;
    }
  }, {
    key: "getDescription",
    value: function getDescription(formValues) {
      return formValues.description || this.props.descriptionDefaultValue;
    }
  }, {
    key: "getSummary",
    value: function getSummary(formValues) {
      return singleLineTruncatedText(formValues.description, this.props.summaryTruncateLength) || this.props.summaryDefaultValue;
    }
  }, {
    key: "getCustomerName",
    value: function getCustomerName() {
      return this.props.name || this.props.customerNameDefaultValue;
    }
  }, {
    key: "mapFormToJSD",
    value: function mapFormToJSD(formValues) {
      var fields = [{
        id: this.props.typeFiedlId,
        value: this.getTypeFieldValue(formValues.type)
      }, {
        id: this.props.summaryFieldId,
        value: this.getSummary(formValues)
      }, {
        id: this.props.descriptionFieldId,
        value: this.getDescription(formValues)
      }, {
        id: this.props.emailFieldId,
        value: this.getEmail(formValues)
      }, {
        id: this.props.customerNameFieldId,
        value: this.getCustomerName()
      }];
      return {
        fields: [].concat(fields, [formValues.canBeContacted ? {
          id: this.props.canBeContactedFieldId,
          value: this.props.canBeContactedDefaultValue
        } : undefined, formValues.enrollInResearchGroup ? {
          id: this.props.enrollInResearchFieldId,
          value: this.props.enrollInResearchDefaultValue
        } : undefined], _toConsumableArray(this.props.additionalFields)).filter(Boolean)
      };
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(FeedbackForm, {
        onSubmit: this.postFeedback,
        onClose: this.props.onClose
      });
    }
  }]);

  return FeedbackCollector;
}(Component);

_defineProperty(FeedbackCollector, "defaultProps", {
  canBeContactedFieldId: 'customfield_10043',
  canBeContactedDefaultValue: [{
    id: '10109'
  }],
  additionalFields: [],
  customerNameFieldId: 'customfield_10045',
  customerNameDefaultValue: 'unknown',
  descriptionFieldId: 'description',
  descriptionDefaultValue: '',
  enrollInResearchFieldId: 'customfield_10044',
  enrollInResearchDefaultValue: [{
    id: '10110'
  }],
  emailFieldId: 'email',
  emailDefaultValue: 'do-not-reply@atlassian.com',
  summaryFieldId: 'summary',
  summaryDefaultValue: '',
  summaryTruncateLength: 100,
  timeoutOnSubmit: 700,
  typeFiedlId: 'customfield_10042',
  typeBugDefaultValue: {
    id: '10105'
  },
  typeCommentDefaultValue: {
    id: '10106'
  },
  typeSuggestionDefaultValue: {
    id: '10107'
  },
  typeQuestionDefaultValue: {
    id: '10108'
  },
  typeEmptyDefaultValue: {
    id: 'empty'
  },
  onClose: function onClose() {},
  onSubmit: function onSubmit() {}
});

export { FeedbackCollector as default };