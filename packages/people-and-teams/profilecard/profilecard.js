import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { colors } from '@findable/theme';
import AkSpinner from '@findable/spinner';
import AkAvatar from '@findable/avatar';
import AkButton from '@findable/button';
import AkLozenge from '@findable/lozenge';
import ErrorMessage from './components/ErrorMessage';
import HeightTransitionWrapper from './components/HeightTransitionWrapper';
import IconLabel from './components/IconLabel';
import MessagesIntlProvider from './components/MessagesIntlProvider';
import relativeDate from './relative-date';
import messages from './messages';
import { ActionButtonGroup, ActionsFlexSpacer, AppTitleLabel, CardContainer, CardContent, DisabledInfo, DetailsGroup, FullNameLabel, JobTitleLabel, ProfileImage, SpinnerContainer, LozengeWrapper } from './styled/Card';

var Profilecard =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Profilecard, _PureComponent);

  function Profilecard(props) {
    var _this;

    _classCallCheck(this, Profilecard);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Profilecard).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_timeOpen", void 0);

    _defineProperty(_assertThisInitialized(_this), "clientFetchProfile", void 0);

    _defineProperty(_assertThisInitialized(_this), "callClientFetchProfile", function () {
      if (_this.props.clientFetchProfile) {
        var _this$props;

        (_this$props = _this.props).clientFetchProfile.apply(_this$props, arguments);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "callAnalytics", function (id, options) {
      if (_this.props.analytics) {
        _this.props.analytics(id, options);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_durationSince", function (from) {
      var fromParsed = parseInt(from, 10) || 0;
      return fromParsed > 0 ? Date.now() - fromParsed : null;
    });

    _this._timeOpen = null;

    _this.clientFetchProfile = function () {
      var _this2;

      _this.callAnalytics('profile-card.reload', {});

      (_this2 = _this).callClientFetchProfile.apply(_this2, arguments);
    };

    return _this;
  }

  _createClass(Profilecard, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._timeOpen = Date.now();
      this.callAnalytics('profile-card.view', {});
    }
  }, {
    key: "renderActionsButtons",
    value: function renderActionsButtons() {
      var _this3 = this;

      if (this.props.actions && this.props.actions.length === 0) {
        return null;
      }

      return React.createElement(ActionButtonGroup, null, this.props.actions && this.props.actions.map(function (action, idx) {
        return React.createElement(AkButton, {
          appearance: idx === 0 ? 'default' : 'subtle',
          compact: true,
          key: action.label,
          onClick: function onClick() {
            _this3.callAnalytics('profile-card.click', {
              id: action.id || null,
              duration: _this3._durationSince(_this3._timeOpen)
            });

            if (action.callback) {
              action.callback.apply(action, arguments);
            }
          }
        }, action.label);
      }));
    }
  }, {
    key: "renderErrorMessage",
    value: function renderErrorMessage() {
      return React.createElement(ErrorMessage, {
        reload: this.props.clientFetchProfile && this.clientFetchProfile,
        errorType: this.props.errorType
      });
    }
  }, {
    key: "renderCardDetailsDefault",
    value: function renderCardDetailsDefault() {
      var _this$props2 = this.props,
          meta = _this$props2.meta,
          nickname = _this$props2.nickname,
          fullName = _this$props2.fullName,
          location = _this$props2.location,
          email = _this$props2.email,
          timestring = _this$props2.timestring,
          companyName = _this$props2.companyName;
      return React.createElement(DetailsGroup, null, React.createElement(FullNameLabel, {
        noMeta: !meta
      }, fullName), meta && React.createElement(JobTitleLabel, null, meta), React.createElement(IconLabel, {
        icon: "email"
      }, email), React.createElement(IconLabel, {
        icon: "mention"
      }, nickname && "@".concat(nickname)), React.createElement(IconLabel, {
        icon: "time"
      }, timestring), React.createElement(IconLabel, {
        icon: "companyName"
      }, companyName), React.createElement(IconLabel, {
        icon: "location"
      }, location));
    }
  }, {
    key: "renderCardDetailsForDisabledAccount",
    value: function renderCardDetailsForDisabledAccount() {
      var _this$props3 = this.props,
          nickname = _this$props3.nickname,
          status = _this$props3.status,
          companyName = _this$props3.companyName,
          hasDisabledAccountLozenge = _this$props3.hasDisabledAccountLozenge;
      return React.createElement(DetailsGroup, null, React.createElement(FullNameLabel, {
        noMeta: true,
        isDisabledAccount: true
      }, this.getDisabledAccountName()), hasDisabledAccountLozenge && React.createElement(LozengeWrapper, null, React.createElement(AkLozenge, {
        appearance: "default",
        isBold: true
      }, status === 'inactive' && React.createElement(FormattedMessage, messages.inactiveAccountMsg), status === 'closed' && React.createElement(FormattedMessage, messages.closedAccountMsg))), React.createElement(DisabledInfo, null, this.getDisabledAccountDesc()), status === 'inactive' && React.createElement(React.Fragment, null, React.createElement(IconLabel, {
        icon: "mention"
      }, nickname && "@".concat(nickname)), React.createElement(IconLabel, {
        icon: "companyName"
      }, companyName)));
    }
  }, {
    key: "getDisabledAccountName",
    value: function getDisabledAccountName() {
      var _this$props4 = this.props,
          nickname = _this$props4.nickname,
          fullName = _this$props4.fullName,
          status = _this$props4.status;

      if (status === 'inactive') {
        return fullName || nickname;
      } else if (status === 'closed') {
        return nickname || React.createElement(FormattedMessage, messages.disabledAccountDefaultName);
      }

      return null;
    }
  }, {
    key: "getDisabledAccountDesc",
    value: function getDisabledAccountDesc() {
      var _this$props5 = this.props,
          _this$props5$status = _this$props5.status,
          status = _this$props5$status === void 0 ? 'closed' : _this$props5$status,
          statusModifiedDate = _this$props5.statusModifiedDate,
          disabledAccountMessage = _this$props5.disabledAccountMessage;
      var date = statusModifiedDate ? new Date(statusModifiedDate * 1000) : null;
      var relativeDateKey = relativeDate(date); // consumer does not want to use built-in message

      if (disabledAccountMessage) {
        return disabledAccountMessage;
      }

      var secondSentence = null;

      if (relativeDateKey) {
        secondSentence = React.createElement(FormattedMessage, messages["".concat(status, "AccountDescMsgHasDate").concat(relativeDateKey)]);
      } else {
        secondSentence = React.createElement(FormattedMessage, messages["".concat(status, "AccountDescMsgNoDate")]);
      }

      return React.createElement("p", null, React.createElement(FormattedMessage, messages.generalDescMsgForDisabledUser), ' ', secondSentence);
    }
  }, {
    key: "renderCardDetailsApp",
    value: function renderCardDetailsApp() {
      return React.createElement(DetailsGroup, null, React.createElement(FullNameLabel, null, this.props.fullName), React.createElement(AppTitleLabel, null, "App"), React.createElement(IconLabel, {
        icon: "mention"
      }, this.props.nickname && "@".concat(this.props.nickname)));
    }
  }, {
    key: "renderCardDetails",
    value: function renderCardDetails() {
      var _this$props6 = this.props,
          isBot = _this$props6.isBot,
          status = _this$props6.status;

      if (isBot) {
        return this.renderCardDetailsApp();
      }

      if (status === 'inactive' || status === 'closed') {
        return this.renderCardDetailsForDisabledAccount();
      }

      return this.renderCardDetailsDefault();
    }
  }, {
    key: "renderProfilecard",
    value: function renderProfilecard() {
      var status = this.props.status;
      this.callAnalytics('profile-card.loaded', {
        duration: this._durationSince(this._timeOpen)
      });
      var isDisabledUser = status === 'inactive' || status === 'closed';
      var actions = this.renderActionsButtons();
      return React.createElement(CardContainer, {
        isDisabledUser: isDisabledUser
      }, React.createElement(ProfileImage, null, React.createElement(AkAvatar, {
        size: "xlarge",
        src: this.props.status !== 'closed' ? this.props.avatarUrl : null,
        borderColor: colors.N0
      })), React.createElement(CardContent, null, this.renderCardDetails(), actions ? React.createElement(React.Fragment, null, React.createElement(ActionsFlexSpacer, null), actions) : null));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props7 = this.props,
          fullName = _this$props7.fullName,
          status = _this$props7.status;
      var customElevation = this.props.customElevation;
      var cardContent = null; // closed users have empty fullName field

      var isFetched = fullName || status === 'closed';

      if (this.props.hasError) {
        this.callAnalytics('profile-card.error', {});
        cardContent = this.renderErrorMessage();
      } else if (this.props.isLoading) {
        cardContent = React.createElement(SpinnerContainer, null, React.createElement(AkSpinner, null));
      } else if (isFetched) {
        cardContent = this.renderProfilecard();
      }

      return React.createElement(MessagesIntlProvider, null, React.createElement(HeightTransitionWrapper, {
        customElevation: customElevation
      }, cardContent));
    }
  }]);

  return Profilecard;
}(PureComponent);

_defineProperty(Profilecard, "defaultProps", {
  status: 'active',
  isBot: false,
  isNotMentionable: false,
  actions: [],
  isLoading: false,
  hasError: false,
  analytics: function analytics() {},
  clientFetchProfile: function clientFetchProfile() {},
  hasDisabledAccountLozenge: true
});

export { Profilecard as default };