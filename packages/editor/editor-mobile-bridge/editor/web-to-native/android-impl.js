import * as tslib_1 from "tslib";
import { sendToBridge } from '../../bridge-utils';
var AndroidBridge = /** @class */ (function () {
    function AndroidBridge() {
        this.mentionBridge = window.mentionsBridge;
        this.textFormatBridge = window.textFormatBridge;
        this.mediaBridge = window.mediaBridge;
        this.promiseBridge = window.promiseBridge;
        this.listBridge = window.listBridge;
        this.statusBridge = window.statusBridge;
        this.linkBridge = window.linkBridge;
    }
    AndroidBridge.prototype.showMentions = function (query) {
        this.mentionBridge.showMentions(query);
    };
    AndroidBridge.prototype.dismissMentions = function () {
        /*TODO: implement when mentions are ready */
    };
    AndroidBridge.prototype.updateTextFormat = function (markStates) {
        this.textFormatBridge.updateTextFormat(markStates);
    };
    AndroidBridge.prototype.updateText = function (content) {
        this.textFormatBridge.updateText(content);
    };
    AndroidBridge.prototype.getServiceHost = function () {
        return this.mediaBridge.getServiceHost();
    };
    AndroidBridge.prototype.getCollection = function () {
        return this.mediaBridge.getCollection();
    };
    AndroidBridge.prototype.submitPromise = function (name, uuid, args) {
        this.promiseBridge.submitPromise(name, uuid, args);
    };
    AndroidBridge.prototype.updateBlockState = function (currentBlockType) {
        this.textFormatBridge.updateBlockState(currentBlockType);
    };
    AndroidBridge.prototype.updateListState = function (listState) {
        this.listBridge.updateListState(listState);
    };
    AndroidBridge.prototype.showStatusPicker = function (text, color, uuid, isNew) {
        this.statusBridge.showStatusPicker(text, color, uuid, isNew);
    };
    AndroidBridge.prototype.dismissStatusPicker = function (isNew) {
        this.statusBridge.dismissStatusPicker(isNew);
    };
    AndroidBridge.prototype.currentSelection = function (text, url) {
        this.linkBridge.currentSelection(text, url);
    };
    AndroidBridge.prototype.call = function (bridge, event) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        sendToBridge.apply(void 0, tslib_1.__spread([bridge, event], args));
    };
    AndroidBridge.prototype.updateTextColor = function () { };
    return AndroidBridge;
}());
export default AndroidBridge;
//# sourceMappingURL=android-impl.js.map