import * as tslib_1 from "tslib";
import { EditorActions, indentList, outdentList, toggleOrderedList, toggleBulletList, toggleSuperscript, toggleSubscript, toggleStrike, toggleCode, toggleUnderline, toggleEm, toggleStrong, updateStatus, commitStatusPicker, insertBlockType, setBlockType, createTable, insertTaskDecision, changeColor, selectItem as selectTypeAheadItem, insertLink, isTextAtPos, isLinkAtPos, setLinkHref, setLinkText, } from '@findable/editor-core';
import { JSONTransformer } from '@findable/editor-json-transformer';
import WebBridge from '../../web-bridge';
import { hasValue } from '../../utils';
import { rejectPromise, resolvePromise } from '../../cross-platform-promise';
var WebBridgeImpl = /** @class */ (function (_super) {
    tslib_1.__extends(WebBridgeImpl, _super);
    function WebBridgeImpl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textFormatBridgeState = null;
        _this.statusBridgeState = null;
        _this.blockFormatBridgeState = null;
        _this.listBridgeState = null;
        _this.mentionsPluginState = null;
        _this.editorView = null;
        _this.transformer = new JSONTransformer();
        _this.editorActions = new EditorActions();
        _this.mediaMap = new Map();
        return _this;
    }
    WebBridgeImpl.prototype.onBoldClicked = function () {
        if (this.textFormatBridgeState && this.editorView) {
            toggleStrong()(this.editorView.state, this.editorView.dispatch);
        }
    };
    WebBridgeImpl.prototype.onItalicClicked = function () {
        if (this.textFormatBridgeState && this.editorView) {
            toggleEm()(this.editorView.state, this.editorView.dispatch);
        }
    };
    WebBridgeImpl.prototype.onUnderlineClicked = function () {
        if (this.textFormatBridgeState && this.editorView) {
            toggleUnderline()(this.editorView.state, this.editorView.dispatch);
        }
    };
    WebBridgeImpl.prototype.onCodeClicked = function () {
        if (this.textFormatBridgeState && this.editorView) {
            toggleCode()(this.editorView.state, this.editorView.dispatch);
        }
    };
    WebBridgeImpl.prototype.onStrikeClicked = function () {
        if (this.textFormatBridgeState && this.editorView) {
            toggleStrike()(this.editorView.state, this.editorView.dispatch);
        }
    };
    WebBridgeImpl.prototype.onSuperClicked = function () {
        if (this.textFormatBridgeState && this.editorView) {
            toggleSuperscript()(this.editorView.state, this.editorView.dispatch);
        }
    };
    WebBridgeImpl.prototype.onSubClicked = function () {
        if (this.textFormatBridgeState && this.editorView) {
            toggleSubscript()(this.editorView.state, this.editorView.dispatch);
        }
    };
    WebBridgeImpl.prototype.onMentionSelect = function (mention) { };
    WebBridgeImpl.prototype.onMentionPickerResult = function (result) { };
    WebBridgeImpl.prototype.onMentionPickerDismissed = function () { };
    WebBridgeImpl.prototype.onStatusUpdate = function (text, color, uuid) {
        if (this.statusBridgeState && this.editorView) {
            updateStatus({
                text: text,
                color: color,
                localId: uuid,
            })(this.editorView);
        }
    };
    WebBridgeImpl.prototype.onStatusPickerDismissed = function () {
        if (this.statusBridgeState && this.editorView) {
            commitStatusPicker()(this.editorView);
        }
    };
    WebBridgeImpl.prototype.setContent = function (content) {
        if (this.editorActions) {
            this.editorActions.replaceDocument(content, false);
        }
    };
    WebBridgeImpl.prototype.getContent = function () {
        if (!this.editorView) {
            return '';
        }
        // Flush DOM to apply current in flight composition.
        this.flushDOM();
        return JSON.stringify(this.transformer.encode(this.editorView.state.doc));
    };
    WebBridgeImpl.prototype.setTextFormattingStateAndSubscribe = function (state) {
        this.textFormatBridgeState = state;
    };
    WebBridgeImpl.prototype.setTextColor = function (color) {
        if (this.editorView) {
            changeColor(color)(this.editorView.state, this.editorView.dispatch);
        }
    };
    WebBridgeImpl.prototype.onMediaPicked = function (eventName, mediaPayload) {
        if (this.mediaPicker) {
            var payload = JSON.parse(mediaPayload);
            switch (eventName) {
                case 'upload-preview-update': {
                    payload.preview = {
                        dimensions: payload.file.dimensions,
                    };
                    this.mediaPicker.emit('upload-preview-update', payload);
                    return;
                }
                case 'upload-end': {
                    /** emit a mobile-only event */
                    this.mediaPicker.emit('mobile-upload-end', payload);
                    return;
                }
            }
        }
    };
    WebBridgeImpl.prototype.onPromiseResolved = function (uuid, payload) {
        resolvePromise(uuid, JSON.parse(payload));
    };
    WebBridgeImpl.prototype.onPromiseRejected = function (uuid) {
        rejectPromise(uuid);
    };
    WebBridgeImpl.prototype.onBlockSelected = function (blockType) {
        if (this.editorView) {
            var _a = this.editorView, state = _a.state, dispatch = _a.dispatch;
            setBlockType(blockType)(state, dispatch);
        }
    };
    WebBridgeImpl.prototype.onOrderedListSelected = function () {
        if (this.listBridgeState && this.editorView) {
            toggleOrderedList(this.editorView);
        }
    };
    WebBridgeImpl.prototype.onBulletListSelected = function () {
        if (this.listBridgeState && this.editorView) {
            toggleBulletList(this.editorView);
        }
    };
    WebBridgeImpl.prototype.onIndentList = function () {
        if (this.listBridgeState && this.editorView) {
            indentList()(this.editorView.state, this.editorView.dispatch);
        }
    };
    WebBridgeImpl.prototype.onOutdentList = function () {
        if (this.listBridgeState && this.editorView) {
            outdentList()(this.editorView.state, this.editorView.dispatch);
        }
    };
    WebBridgeImpl.prototype.onLinkUpdate = function (text, url) {
        var _this = this;
        if (!this.editorView) {
            return;
        }
        var _a = this.editorView, state = _a.state, dispatch = _a.dispatch;
        var _b = state.selection, from = _b.from, to = _b.to;
        if (!isTextAtPos(from)(state)) {
            insertLink(from, to, url, text)(state, dispatch);
            return;
        }
        // if cursor is on link => modify the whole link
        var _c = isLinkAtPos(from)(state)
            ? {
                leftBound: from - state.doc.resolve(from).textOffset,
                rightBound: undefined,
            }
            : { leftBound: from, rightBound: to }, leftBound = _c.leftBound, rightBound = _c.rightBound;
        [setLinkHref(url, leftBound, rightBound)]
            .reduce(function (cmds, setLinkHrefCmd) {
            // if adding link => set link then set link text
            // if removing link => execute the same reversed
            return hasValue(url)
                ? tslib_1.__spread([
                    setLinkHrefCmd,
                    setLinkText(text, leftBound, rightBound)
                ], cmds) : tslib_1.__spread([
                setLinkText(text, leftBound, rightBound),
                setLinkHrefCmd
            ], cmds);
        }, [])
            .forEach(function (cmd) { return cmd(_this.editorView.state, dispatch); });
    };
    WebBridgeImpl.prototype.insertBlockType = function (type) {
        if (!this.editorView) {
            return;
        }
        var _a = this.editorView, state = _a.state, dispatch = _a.dispatch;
        switch (type) {
            case 'blockquote':
                insertBlockType('blockquote')(state, dispatch);
                return;
            case 'codeblock':
                insertBlockType('codeblock')(state, dispatch);
                return;
            case 'panel':
                insertBlockType('panel')(state, dispatch);
                return;
            case 'action':
                insertTaskDecision(this.editorView, 'taskList');
                return;
            case 'decision':
                insertTaskDecision(this.editorView, 'decisionList');
                return;
            case 'table':
                createTable(state, dispatch);
                return;
            default:
                // tslint:disable-next-line:no-console
                console.error(type + " cannot be inserted as it's not supported");
                return;
        }
    };
    WebBridgeImpl.prototype.insertTypeAheadItem = function (type, payload) {
        if (!this.editorView) {
            return;
        }
        this.flushDOM();
        var _a = this.editorView, state = _a.state, dispatch = _a.dispatch;
        var item = JSON.parse(payload);
        selectTypeAheadItem({
            // TODO export insert type from editor-core.
            selectItem: function (state, item, insert) {
                if (type === 'mention') {
                    var id = item.id, name_1 = item.name, nickname = item.nickname, accessLevel = item.accessLevel, userType = item.userType;
                    var renderName = nickname ? nickname : name_1;
                    var mention = state.schema.nodes.mention.createChecked({
                        text: "@" + renderName,
                        id: id,
                        accessLevel: accessLevel,
                        userType: userType === 'DEFAULT' ? null : userType,
                    });
                    return insert(mention);
                }
                return false;
            },
            // Needed for interface.
            trigger: '',
            getItems: function () { return []; },
        }, item)(state, dispatch);
    };
    WebBridgeImpl.prototype.setFocus = function (force) {
        if (!this.editorView) {
            return false;
        }
        if (this.editorView.hasFocus() && force) {
            /**
             * Forcefully remove focus (we re-focus below), as in some scenarios native views make webview cursors invisble.
             */
            this.editorView.dom.blur();
        }
        this.editorView.focus();
        return true;
    };
    WebBridgeImpl.prototype.flushDOM = function () {
        if (!this.editorView) {
            return false;
        }
        /**
         * NOTE: `inDOMChange` is a private API, it's used as a workaround to forcefully apply current composition
         * when integrators request the content. It doesn't break the users current composing so they may continue
         * to compose the current item.
         * @see ED-5924
         */
        var domChange = this.editorView.inDOMChange;
        if (domChange && domChange.composing) {
            domChange.finish(true);
            return true;
        }
        return false;
    };
    WebBridgeImpl.prototype.getRootElement = function () {
        return document.querySelector('#editor');
    };
    return WebBridgeImpl;
}(WebBridge));
export default WebBridgeImpl;
//# sourceMappingURL=implementation.js.map