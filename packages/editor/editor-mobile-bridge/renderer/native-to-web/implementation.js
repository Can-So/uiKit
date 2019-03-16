import * as tslib_1 from "tslib";
import WebBridge from '../../web-bridge';
import { eventDispatcher } from '../dispatcher';
import { resolvePromise, rejectPromise } from '../../cross-platform-promise';
var RendererBridgeImpl = /** @class */ (function (_super) {
    tslib_1.__extends(RendererBridgeImpl, _super);
    function RendererBridgeImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** Renderer bridge MVP to set the content */
    RendererBridgeImpl.prototype.setContent = function (content) {
        if (eventDispatcher) {
            try {
                content = JSON.parse(content);
            }
            catch (e) {
                return;
            }
            eventDispatcher.emit('setRendererContent', { content: content });
        }
    };
    RendererBridgeImpl.prototype.onPromiseResolved = function (uuid, payload) {
        resolvePromise(uuid, JSON.parse(payload));
    };
    RendererBridgeImpl.prototype.onPromiseRejected = function (uuid) {
        rejectPromise(uuid);
    };
    RendererBridgeImpl.prototype.onTaskUpdated = function (taskId, state) {
        if (this.taskDecisionProvider) {
            var key = {
                localId: taskId,
                objectAri: this.objectAri,
                containerAri: this.containerAri,
            };
            this.taskDecisionProvider.notifyUpdated(key, state);
        }
    };
    RendererBridgeImpl.prototype.getRootElement = function () {
        return document.querySelector('#renderer');
    };
    return RendererBridgeImpl;
}(WebBridge));
export default RendererBridgeImpl;
//# sourceMappingURL=implementation.js.map