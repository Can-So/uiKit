import { toNativeBridge } from './editor/web-to-native';
var pendingPromises = new Map();
export var counter = 0;
var Holder = /** @class */ (function () {
    function Holder() {
    }
    return Holder;
}());
export function createPromise(name, args) {
    var holder = createHolder();
    var uuid = counter++ + '';
    pendingPromises.set(uuid, holder);
    return {
        submit: function () {
            toNativeBridge.submitPromise(name, uuid, args);
            return holder.promise
                .then(function (data) {
                pendingPromises.delete(uuid);
                return data;
            })
                .catch(function (data) {
                pendingPromises.delete(uuid);
                return Promise.reject(data);
            });
        },
    };
}
function createHolder() {
    var holder = new Holder();
    holder.promise = new Promise(function (resolve, reject) {
        holder.resolve = function (data) { return resolve(data); };
        holder.reject = function () { return reject(); };
    });
    return holder;
}
export function resolvePromise(uuid, resolution) {
    var holder = pendingPromises.get(uuid);
    if (holder) {
        holder.resolve(resolution);
    }
}
export function rejectPromise(uuid) {
    var holder = pendingPromises.get(uuid);
    if (holder) {
        holder.reject();
    }
}
// expose this function for testing
export function setCounter(value) {
    counter = value;
}
//# sourceMappingURL=cross-platform-promise.js.map