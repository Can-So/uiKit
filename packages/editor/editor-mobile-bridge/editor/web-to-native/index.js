import AndroidBridge from './android-impl';
import IosBridge from './ios-impl';
import DummyBridge from './dummy-impl';
function getBridgeImpl() {
    if (window.navigator.userAgent.match(/Android/)) {
        return new AndroidBridge();
    }
    else if (window.webkit) {
        return new IosBridge();
    }
    else {
        return new DummyBridge();
    }
}
export var toNativeBridge = getBridgeImpl();
//# sourceMappingURL=index.js.map