import * as tslib_1 from "tslib";
import * as React from 'react';
import { Editor } from '@atlaskit/editor-core';
import { toNativeBridge } from './web-to-native';
import WebBridgeImpl from './native-to-web';
import MobilePicker from './MobileMediaPicker';
import { initPluginListeners, destroyPluginListeners, } from './plugin-subscription';
import { MediaProvider, MentionProvider, TaskDecisionProvider, MockEmojiProvider, } from '../providers';
import { parseLocationSearch } from '../bridge-utils';
import { Provider as SmartCardProvider } from '@atlaskit/smart-card';
import { cardProvider } from '../providers/cardProvider';
var params = parseLocationSearch();
export var bridge = (window.bridge = new WebBridgeImpl());
var EditorWithState = /** @class */ (function (_super) {
    tslib_1.__extends(EditorWithState, _super);
    function EditorWithState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditorWithState.prototype.onEditorCreated = function (instance) {
        _super.prototype.onEditorCreated.call(this, instance);
        var eventDispatcher = instance.eventDispatcher, view = instance.view;
        bridge.editorView = view;
        bridge.editorActions._privateRegisterEditor(view, eventDispatcher);
        if (this.props.media && this.props.media.customMediaPicker) {
            bridge.mediaPicker = this.props.media.customMediaPicker;
        }
        initPluginListeners(eventDispatcher, bridge, view);
    };
    EditorWithState.prototype.onEditorDestroyed = function (instance) {
        _super.prototype.onEditorDestroyed.call(this, instance);
        destroyPluginListeners(instance.eventDispatcher, bridge);
        bridge.editorActions._privateUnregisterEditor();
        bridge.editorView = null;
        bridge.mentionsPluginState = null;
    };
    return EditorWithState;
}(Editor));
export default function mobileEditor(props) {
    return (React.createElement(SmartCardProvider, null,
        React.createElement(EditorWithState, tslib_1.__assign({ appearance: "mobile", mentionProvider: Promise.resolve(MentionProvider), emojiProvider: Promise.resolve(MockEmojiProvider), media: {
                customMediaPicker: new MobilePicker(),
                provider: props.mediaProvider || MediaProvider,
                allowMediaSingle: true,
            }, allowLists: true, onChange: function () {
                toNativeBridge.updateText(bridge.getContent());
            }, allowPanel: true, allowCodeBlocks: true, allowTables: {
                allowControls: false,
            }, UNSAFE_cards: {
                provider: props.cardProvider || Promise.resolve(cardProvider),
            }, allowExtension: true, allowTextColor: true, allowDate: true, allowRule: true, allowStatus: true, allowLayouts: {
                allowBreakout: true,
            }, taskDecisionProvider: Promise.resolve(TaskDecisionProvider()), 
            // eg. If the URL parameter is like ?mode=dark use that, otherwise check the prop (used in example)
            mode: (params && params.mode) || props.mode }, props))));
}
//# sourceMappingURL=mobile-editor-element.js.map