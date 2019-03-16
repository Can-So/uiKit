import * as tslib_1 from "tslib";
import { Fragment, Slice } from 'prosemirror-model';
/**
 * A helper to get the underlying array of a fragment.
 */
export function getFragmentBackingArray(fragment) {
    return fragment.content;
}
export function mapFragment(content, callback, parent) {
    if (parent === void 0) { parent = null; }
    var children = [];
    for (var i = 0, size = content.childCount; i < size; i++) {
        var node = content.child(i);
        var transformed = node.isLeaf
            ? callback(node, parent, i)
            : callback(node.copy(mapFragment(node.content, callback, node)), parent, i);
        if (transformed) {
            if (transformed instanceof Fragment) {
                children.push.apply(children, tslib_1.__spread(getFragmentBackingArray(transformed)));
            }
            else if (Array.isArray(transformed)) {
                children.push.apply(children, tslib_1.__spread(transformed));
            }
            else {
                children.push(transformed);
            }
        }
    }
    return Fragment.fromArray(children);
}
export function mapSlice(slice, callback) {
    var fragment = mapFragment(slice.content, callback);
    return new Slice(fragment, slice.openStart, slice.openEnd);
}
export function flatmap(fragment, callback) {
    var fragmentContent = [];
    for (var i = 0; i < fragment.childCount; i++) {
        var child = callback(fragment.child(i), i, fragment);
        if (Array.isArray(child)) {
            fragmentContent.push.apply(fragmentContent, tslib_1.__spread(child));
        }
        else {
            fragmentContent.push(child);
        }
    }
    return Fragment.fromArray(fragmentContent);
}
export function mapChildren(node, callback) {
    var array = [];
    for (var i = 0; i < node.childCount; i++) {
        array.push(callback(node.child(i), i, node.content));
    }
    return array;
}
//# sourceMappingURL=slice.js.map