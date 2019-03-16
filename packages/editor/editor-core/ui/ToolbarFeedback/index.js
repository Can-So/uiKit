import * as tslib_1 from "tslib";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import Spinner from '@atlaskit/spinner';
import { Popup } from '@atlaskit/editor-common';
import Button, { ButtonGroup } from '@atlaskit/button';
import { withAnalytics } from '../../analytics';
import ToolbarButton from '../ToolbarButton';
import { version as coreVersion } from '../../version.json';
import withOuterListeners from '../with-outer-listeners';
import { Wrapper, ButtonContent, ConfirmationPopup, ConfirmationText, ConfirmationHeader, ConfirmationImg, } from './styles';
import { analyticsEventKey, } from '../../plugins/analytics';
import { createDispatch } from '../../event-dispatcher';
var PopupWithOutsideListeners = withOuterListeners(Popup);
var POPUP_HEIGHT = 388;
var POPUP_WIDTH = 280;
var JIRA_ISSUE_COLLECTOR_URL = 'https://product-fabric.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/-w0bwo4/b/14/e73395c53c3b10fde2303f4bf74ffbf6/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs.js?locale=en-US&collectorId=98644b9c';
var EDITOR_IMAGE_URL = 'https://confluence.atlassian.com/download/attachments/945114421/editorillustration@2x.png?api=v2';
/**
 * Inspired from:
 * https://stackoverflow.com/questions/11219582/how-to-detect-my-browser-version-and-operating-system-using-javascript
 */
export var getBrowserInfo = function (nAgt) {
    var browserName;
    var browserVersion;
    var nameOffset;
    var verOffset;
    var index;
    // In Opera 15+, version is after "OPR/"
    if ((verOffset = nAgt.indexOf('OPR/')) !== -1) {
        browserName = 'Opera';
        browserVersion = nAgt.substring(verOffset + 4);
    }
    else if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
        // In older Opera, version is after "Opera" or after "Version"
        browserName = 'Opera';
        if ((verOffset = nAgt.indexOf('Version')) !== -1) {
            browserVersion = nAgt.substring(verOffset + 8);
        }
        else {
            browserVersion = nAgt.substring(verOffset + 6);
        }
    }
    else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
        // In MSIE, version is after "MSIE" in userAgent
        browserName = 'Microsoft Internet Explorer';
        browserVersion = nAgt.substring(verOffset + 5);
    }
    else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
        // In Chrome, version is after "Chrome"
        browserName = 'Chrome';
        browserVersion = nAgt.substring(verOffset + 7);
    }
    else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
        // In Safari, version is after "Safari" or after "Version"
        browserName = 'Safari';
        if ((verOffset = nAgt.indexOf('Version')) !== -1) {
            browserVersion = nAgt.substring(verOffset + 8);
        }
        else {
            browserVersion = nAgt.substring(verOffset + 7);
        }
    }
    else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
        // In Firefox, version is after "Firefox"
        browserName = 'Firefox';
        browserVersion = nAgt.substring(verOffset + 8);
    }
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
        (verOffset = nAgt.lastIndexOf('/'))) {
        // In most other browsers, "name/version" is at the end of userAgent
        browserName = nAgt.substring(nameOffset, verOffset);
        browserVersion = nAgt.substring(verOffset + 1);
        if (browserName.toLowerCase() === browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }
    else {
        browserName = navigator.appName;
        browserVersion = '' + parseFloat(navigator.appVersion);
    }
    // trim the versionStr string at semicolon/space if present
    if ((index = browserVersion.indexOf(';')) !== -1) {
        browserVersion = browserVersion.substring(0, index);
    }
    if ((index = browserVersion.indexOf(' ')) !== -1) {
        browserVersion = browserVersion.substring(0, index);
    }
    return browserName + " " + browserVersion;
};
/**
 * Inspired from:
 * https://stackoverflow.com/questions/9514179/how-to-find-the-operating-system-version-using-javascript
 */
export var getDeviceInfo = function (nAgt, nVersion) {
    var os = '';
    var osVersion = '';
    var clientStrings = [
        { s: 'Windows 3.11', r: /Win16/ },
        { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
        { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
        { s: 'Windows 98', r: /(Windows 98|Win98)/ },
        { s: 'Windows CE', r: /Windows CE/ },
        { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
        { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
        { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
        { s: 'Windows Vista', r: /Windows NT 6.0/ },
        { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
        { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
        { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
        { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
        { s: 'Android', r: /Android/ },
        { s: 'Open BSD', r: /OpenBSD/ },
        { s: 'Sun OS', r: /SunOS/ },
        { s: 'Linux', r: /(Linux|X11)/ },
        { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
        { s: 'Mac OS X', r: /Mac OS X/ },
        { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
        { s: 'QNX', r: /QNX/ },
        { s: 'UNIX', r: /UNIX/ },
        { s: 'BeOS', r: /BeOS/ },
        { s: 'OS/2', r: /OS\/2/ },
        {
            s: 'Search Bot',
            r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
        },
    ];
    for (var client in clientStrings) {
        var clientObj = clientStrings[client];
        if (clientObj.r.test(nAgt)) {
            os = clientObj.s;
            break;
        }
    }
    var match;
    if (/Windows/.test(os)) {
        match = /Windows (.*)/.exec(os);
        osVersion = match && match[1];
        os = 'Windows';
    }
    switch (os) {
        case 'Mac OS X':
            match = /Mac OS X (10[\.\_\d]+)/.exec(nAgt);
            osVersion = match && match[1];
            break;
        case 'Android':
            match = /Android ([\.\_\d]+)/.exec(nAgt);
            osVersion = match && match[1];
            break;
        case 'iOS':
            match = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVersion);
            osVersion = match && match[1] + '.' + match[2] + '.' + (match[3] || 0);
    }
    return os + " " + osVersion;
};
var ToolbarFeedback = /** @class */ (function (_super) {
    tslib_1.__extends(ToolbarFeedback, _super);
    function ToolbarFeedback() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            jiraIssueCollectorScriptLoading: false,
            showOptOutOption: false,
        };
        _this.handleRef = function (ref) {
            if (ref) {
                _this.setState({
                    target: ReactDOM.findDOMNode(ref || null),
                });
            }
        };
        _this.collectFeedback = function () {
            if (_this.props.product === 'bitbucket') {
                _this.setState({ showOptOutOption: true });
            }
            else {
                _this.openFeedbackPopup();
            }
        };
        _this.toggleShowOptOutOption = function () {
            _this.setState({ showOptOutOption: !_this.state.showOptOutOption });
        };
        _this.openFeedbackPopup = withAnalytics('atlassian.editor.feedback.button', function () {
            var dispatch = createDispatch(_this.context.editorActions.eventDispatcher);
            dispatch(analyticsEventKey, {
                payload: {
                    action: "clicked" /* CLICKED */,
                    actionSubject: "button" /* BUTTON */,
                    actionSubjectId: "feedbackButton" /* BUTTON_FEEDBACK */,
                    eventType: "ui" /* UI */,
                },
            });
            if (typeof _this.showJiraCollectorDialogCallback === 'function') {
                _this.showJiraCollectorDialogCallback();
                return false;
            }
            _this.setState({
                jiraIssueCollectorScriptLoading: true,
                showOptOutOption: false,
            });
            var product = _this.props.product || 'n/a';
            // triggerFunction is executed as soon as JIRA issue collector script is loaded
            window.ATL_JQ_PAGE_PROPS = {
                triggerFunction: function (showCollectorDialog) {
                    _this.setState({ jiraIssueCollectorScriptLoading: false });
                    if (typeof showCollectorDialog === 'function') {
                        // save reference to `showCollectorDialog` for future calls
                        _this.showJiraCollectorDialogCallback = showCollectorDialog;
                        // and run it now
                        // next tick is essential due to JIRA issue collector behaviour
                        window.setTimeout(showCollectorDialog, 0);
                    }
                },
                fieldValues: {
                    description: "Please describe the problem you're having or feature you'd like to see:\n\n\n",
                    // 11711 is the field ID for the Feedback Labels field on Product Fabric.
                    // this is found by clicking "configure" on the field and inspecting the URL
                    customfield_11711: tslib_1.__spread([product], (_this.props.labels || [])),
                    customfield_11712: "version: " + _this.props.packageName + "@" + _this.props.packageVersion + " (" + coreVersion + ")\n          Browser: " + getBrowserInfo(navigator.userAgent) + "\n          OS: " + getDeviceInfo(navigator.userAgent, navigator.appVersion),
                },
                environment: {
                    'Editor Package': _this.props.packageName,
                    'Editor Version': _this.props.packageVersion,
                    'Editor Core Version': coreVersion,
                },
                priority: '1',
                components: '15306',
            };
            _this.loadJiraIssueCollectorScript();
            return true;
        });
        _this.loadJiraIssueCollectorScript = function () {
            if (_this.hasJquery()) {
                window.jQuery.ajax({
                    url: JIRA_ISSUE_COLLECTOR_URL,
                    type: 'get',
                    cache: true,
                    dataType: 'script',
                });
            }
        };
        _this.openLearnMorePage = function () {
            window.open('https://confluence.atlassian.com/x/NU1VO', '_blank');
            _this.toggleShowOptOutOption();
        };
        _this.hasJquery = function () {
            return typeof window.jQuery !== 'undefined';
        };
        return _this;
    }
    ToolbarFeedback.prototype.handleSpinnerComplete = function () { };
    ToolbarFeedback.prototype.render = function () {
        var _a = this.props, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement;
        var iconBefore = this.state.jiraIssueCollectorScriptLoading ? (React.createElement(Spinner, { isCompleting: false, onComplete: this.handleSpinnerComplete })) : (undefined);
        // JIRA issue collector script is using jQuery internally
        return this.hasJquery() ? (React.createElement(Wrapper, null,
            React.createElement(ToolbarButton, { ref: this.handleRef, iconBefore: iconBefore, onClick: this.collectFeedback, selected: false, spacing: "compact" },
                React.createElement(ButtonContent, null, "Feedback")),
            this.state.showOptOutOption && (React.createElement(PopupWithOutsideListeners, { target: this.state.target, mountTo: popupsMountPoint, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement, fitHeight: POPUP_HEIGHT, fitWidth: POPUP_WIDTH, handleClickOutside: this.toggleShowOptOutOption, handleEscapeKeydown: this.toggleShowOptOutOption },
                React.createElement(ConfirmationPopup, null,
                    React.createElement(ConfirmationHeader, null,
                        React.createElement(ConfirmationImg, { src: EDITOR_IMAGE_URL })),
                    React.createElement(ConfirmationText, null,
                        React.createElement("div", null, "We are rolling out a new editing experience across Atlassian products. Help us improve by providing feedback."),
                        React.createElement("div", null, "You can opt-out for now by turning off the \"Atlassian Editor\" feature on the Labs page in Bitbucket settings."),
                        React.createElement(ButtonGroup, null,
                            React.createElement(Button, { appearance: "primary", onClick: this.openFeedbackPopup }, "Give feedback"),
                            React.createElement(Button, { appearance: "default", onClick: this.openLearnMorePage }, "Learn more")))))))) : null;
    };
    ToolbarFeedback.contextTypes = {
        editorActions: PropTypes.object.isRequired,
    };
    return ToolbarFeedback;
}(PureComponent));
export default ToolbarFeedback;
//# sourceMappingURL=index.js.map