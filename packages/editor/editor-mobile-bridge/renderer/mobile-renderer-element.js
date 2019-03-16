import * as tslib_1 from "tslib";
// tslint:disable:no-console
import * as React from 'react';
import { ProviderFactory } from '@atlaskit/editor-common';
import { ReactRenderer } from '@atlaskit/renderer';
import RendererBridgeImpl from './native-to-web/implementation';
import { toNativeBridge } from './web-to-native/implementation';
import { MediaProvider, MentionProvider, TaskDecisionProvider, EmojiProvider, } from '../providers';
import { eventDispatcher } from './dispatcher';
var rendererBridge = (window.rendererBridge = new RendererBridgeImpl());
var MobileRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(MobileRenderer, _super);
    function MobileRenderer(props) {
        var _this = _super.call(this, props) || this;
        _this.handleToggleTask = function (key, state) {
            toNativeBridge.call('taskDecisionBridge', 'updateTask', {
                taskId: key.localId,
                state: state,
            });
        };
        _this.state = {
            document: props.document || null,
        };
        var taskDecisionProvider = TaskDecisionProvider(_this.handleToggleTask);
        _this.providerFactory = ProviderFactory.create({
            mediaProvider: MediaProvider,
            mentionProvider: Promise.resolve(MentionProvider),
            taskDecisionProvider: Promise.resolve(taskDecisionProvider),
            emojiProvider: Promise.resolve(EmojiProvider),
        });
        _this.containerAri = 'MOCK-containerAri';
        _this.objectAri = 'MOCK-objectAri';
        rendererBridge.containerAri = _this.containerAri;
        rendererBridge.objectAri = _this.objectAri;
        rendererBridge.taskDecisionProvider = taskDecisionProvider;
        return _this;
    }
    MobileRenderer.prototype.onLinkClick = function (url) {
        if (!url) {
            return;
        }
        toNativeBridge.call('linkBridge', 'onLinkClick', { url: url });
    };
    MobileRenderer.prototype.componentDidMount = function () {
        var _this = this;
        eventDispatcher.on('setRendererContent', function (_a) {
            var content = _a.content;
            _this.setState({
                document: content,
            });
        });
    };
    MobileRenderer.prototype.render = function () {
        var _this = this;
        try {
            // If we haven't received a document yet, don't pass null.
            // We'll get a flash of 'unsupported content'.
            // Could add a loader here if needed.
            if (!this.state.document) {
                return null;
            }
            return (React.createElement(ReactRenderer, { onComplete: function () {
                    if (window &&
                        !window.webkit && // don't fire on iOS
                        window.requestAnimationFrame) {
                        window.requestAnimationFrame(function () {
                            return toNativeBridge.call('renderBridge', 'onContentRendered');
                        });
                    }
                }, dataProviders: this.providerFactory, appearance: "mobile", document: this.state.document, rendererContext: {
                    // These will need to come from the native side.
                    objectAri: this.objectAri,
                    containerAri: this.containerAri,
                }, eventHandlers: {
                    link: {
                        onClick: function (event, url) {
                            event.preventDefault();
                            _this.onLinkClick(url);
                        },
                    },
                    smartCard: {
                        onClick: this.onLinkClick,
                    },
                } }));
        }
        catch (ex) {
            return React.createElement("pre", null, "Invalid document");
        }
    };
    return MobileRenderer;
}(React.Component));
export default MobileRenderer;
//# sourceMappingURL=mobile-renderer-element.js.map