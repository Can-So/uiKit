import * as tslib_1 from "tslib";
import memoizeOne from 'memoize-one';
import * as React from 'react';
import { ShareServiceClient, } from '../clients/ShareServiceClient';
import { ShareDialogWithTrigger } from './ShareDialogWithTrigger';
import { optionDataToUsers } from './utils';
var memoizedFormatCopyLink = memoizeOne(function (origin, link) { return origin.addToUrl(link); });
/**
 * This component serves as a Provider to provide customizable implementations
 * to ShareDialogTrigger component
 */
var ShareDialogContainer = /** @class */ (function (_super) {
    tslib_1.__extends(ShareDialogContainer, _super);
    function ShareDialogContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.fetchConfig = function () {
            _this.client
                .getConfig(_this.props.productId, _this.props.cloudId)
                .then(function (config) {
                // TODO: Send analytics event
                _this.setState({ config: config });
            })
                .catch(function () {
                // TODO: Send analytics event
            });
        };
        _this.handleSubmitShare = function (_a) {
            var users = _a.users, comment = _a.comment;
            var _b = _this.props, originTracingFactory = _b.originTracingFactory, productId = _b.productId, shareAri = _b.shareAri, shareContentType = _b.shareContentType, shareLink = _b.shareLink, shareTitle = _b.shareTitle;
            var content = {
                ari: shareAri,
                // original share link is used here
                link: shareLink,
                title: shareTitle,
                type: shareContentType,
            };
            var metaData = {
                productId: productId,
                atlOriginId: _this.state.shareOrigin.id,
            };
            return _this.client
                .share(content, optionDataToUsers(users), metaData, comment)
                .then(function (response) {
                var newShareCount = _this.state.shareActionCount + 1;
                // TODO: send analytic event
                // renew Origin Tracing Id per share action succeeded
                _this.setState({
                    shareActionCount: newShareCount,
                    shareOrigin: originTracingFactory(),
                });
                return response;
            })
                .catch(function (err) {
                // TODO: send analytic event
                return Promise.reject(err);
            });
        };
        _this.handleCopyLink = function () {
            // @ts-ignore usused for now until analytics are added
            var originAttributes = _this.state.copyLinkOrigin.toAnalyticsAttributes({
                hasGeneratedId: true,
            });
            // TODO: send analytic event
        };
        if (props.client) {
            _this.client = props.client;
        }
        else {
            _this.client = new ShareServiceClient();
        }
        _this.state = {
            copyLinkOrigin: null,
            prevShareLink: null,
            shareActionCount: 0,
            shareOrigin: null,
        };
        return _this;
    }
    ShareDialogContainer.getDerivedStateFromProps = function (nextProps, prevState) {
        // Whenever there is change in share link, new origins should be created
        // ***
        // memorization is recommended on React doc, but here the Origin Tracing does not reply on shareLink
        // in getDerivedStateFormProps it makes shareLink as determinant of renewal to stand out better
        // ***
        if (prevState.prevShareLink ||
            prevState.prevShareLink !== nextProps.shareLink) {
            return {
                copyLinkOrigin: nextProps.originTracingFactory(),
                prevShareLink: nextProps.shareLink,
                shareOrigin: nextProps.originTracingFactory(),
            };
        }
        return null;
    };
    ShareDialogContainer.prototype.componentDidMount = function () {
        this.fetchConfig();
    };
    ShareDialogContainer.prototype.render = function () {
        var _a = this.props, formatCopyLink = _a.formatCopyLink, loadUserOptions = _a.loadUserOptions, shareLink = _a.shareLink, shareFormTitle = _a.shareFormTitle, shouldCloseOnEscapePress = _a.shouldCloseOnEscapePress, triggerButtonAppearance = _a.triggerButtonAppearance, triggerButtonStyle = _a.triggerButtonStyle;
        var copyLink = formatCopyLink(this.state.copyLinkOrigin, shareLink);
        return (React.createElement(ShareDialogWithTrigger, { config: this.state.config, copyLink: copyLink, loadUserOptions: loadUserOptions, onLinkCopy: this.handleCopyLink, onShareSubmit: this.handleSubmitShare, shareFormTitle: shareFormTitle, shouldCloseOnEscapePress: shouldCloseOnEscapePress, triggerButtonAppearance: triggerButtonAppearance, triggerButtonStyle: triggerButtonStyle }));
    };
    ShareDialogContainer.defaultProps = {
        shareLink: window && window.location.href,
        formatCopyLink: memoizedFormatCopyLink,
    };
    return ShareDialogContainer;
}(React.Component));
export { ShareDialogContainer };
//# sourceMappingURL=ShareDialogContainer.js.map