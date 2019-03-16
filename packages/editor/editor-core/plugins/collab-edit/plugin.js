import * as tslib_1 from "tslib";
import { Plugin, PluginKey, Selection } from 'prosemirror-state';
import { DecorationSet } from 'prosemirror-view';
import { Step, ReplaceStep } from 'prosemirror-transform';
import { getSendableSelection, handleInit, handleConnection, handlePresence, handleTelePointer, applyRemoteData, } from './actions';
import { Participants } from './participants';
import { findPointers, createTelepointers } from './utils';
export var pluginKey = new PluginKey('collabEditPlugin');
export var createPlugin = function (dispatch, providerFactory, options) {
    var collabEditProvider;
    var isReady = false;
    return new Plugin({
        key: pluginKey,
        state: {
            init: PluginState.init,
            apply: function (tr, prevPluginState, oldState, newState) {
                var pluginState = prevPluginState.apply(tr);
                if (tr.getMeta('isRemote') !== true) {
                    if (collabEditProvider) {
                        collabEditProvider.send(tr, oldState, newState);
                    }
                }
                var prevActiveParticipants = prevPluginState.activeParticipants;
                var activeParticipants = pluginState.activeParticipants, sessionId = pluginState.sessionId;
                if (collabEditProvider) {
                    var selectionChanged = !oldState.selection.eq(newState.selection);
                    var participantsChanged = !prevActiveParticipants.eq(activeParticipants);
                    if ((sessionId && selectionChanged && !tr.docChanged) ||
                        (sessionId && participantsChanged)) {
                        var selection = getSendableSelection(newState.selection);
                        // Delay sending selection till next tick so that participants info
                        // can go before it
                        window.setTimeout(collabEditProvider.sendMessage.bind(collabEditProvider), 0, {
                            type: 'telepointer',
                            selection: selection,
                            sessionId: sessionId,
                        });
                    }
                }
                dispatch(pluginKey, { activeParticipants: activeParticipants, sessionId: sessionId });
                return pluginState;
            },
        },
        props: {
            decorations: function (state) {
                return this.getState(state).decorations;
            },
        },
        filterTransaction: function (tr, state) {
            // Don't allow transactions that modifies the document before
            // collab-plugin is ready.
            if (!isReady && tr.docChanged) {
                return false;
            }
            return true;
        },
        view: function (view) {
            var _this = this;
            providerFactory.subscribe('collabEditProvider', function (name, providerPromise) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!providerPromise) return [3 /*break*/, 2];
                            return [4 /*yield*/, providerPromise];
                        case 1:
                            collabEditProvider = _a.sent();
                            // Initialize provider
                            collabEditProvider
                                .on('init', function (data) {
                                isReady = true;
                                handleInit(data, view, options);
                            })
                                .on('connected', function (data) { return handleConnection(data, view); })
                                .on('data', function (data) { return applyRemoteData(data, view, options); })
                                .on('presence', function (data) { return handlePresence(data, view); })
                                .on('telepointer', function (data) { return handleTelePointer(data, view); })
                                .on('local-steps', function (data) {
                                var steps = data.steps;
                                var state = view.state;
                                var tr = state.tr;
                                steps.forEach(function (step) { return tr.step(step); });
                                var newState = state.apply(tr);
                                view.updateState(newState);
                            })
                                .on('error', function (err) {
                                // TODO: Handle errors property (ED-2580)
                            })
                                .initialize(function () { return view.state; }, function (json) { return Step.fromJSON(view.state.schema, json); });
                            return [3 /*break*/, 3];
                        case 2:
                            collabEditProvider = null;
                            isReady = false;
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            return {
                destroy: function () {
                    providerFactory.unsubscribeAll('collabEditProvider');
                    collabEditProvider = null;
                },
            };
        },
    });
};
var isReplaceStep = function (step) { return step instanceof ReplaceStep; };
/**
 * Returns position where it's possible to place a decoration.
 */
var getValidPos = function (tr, pos) {
    var resolvedPos = tr.doc.resolve(pos);
    var backwardSelection = Selection.findFrom(resolvedPos, -1, true);
    // if there's no correct cursor position before the `pos`, we try to find it after the `pos`
    var forwardSelection = Selection.findFrom(resolvedPos, 1, true);
    return backwardSelection
        ? backwardSelection.from
        : forwardSelection
            ? forwardSelection.from
            : pos;
};
var PluginState = /** @class */ (function () {
    function PluginState(decorations, participants, sessionId) {
        this.decorationSet = decorations;
        this.participants = participants;
        this.sid = sessionId;
    }
    Object.defineProperty(PluginState.prototype, "decorations", {
        get: function () {
            return this.decorationSet;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PluginState.prototype, "activeParticipants", {
        get: function () {
            return this.participants;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PluginState.prototype, "sessionId", {
        get: function () {
            return this.sid;
        },
        enumerable: true,
        configurable: true
    });
    PluginState.prototype.getInitial = function (sessionId) {
        var participant = this.participants.get(sessionId);
        return participant ? participant.name.substring(0, 1).toUpperCase() : 'X';
    };
    PluginState.prototype.apply = function (tr) {
        var _this = this;
        var _a = this, decorationSet = _a.decorationSet, participants = _a.participants, sid = _a.sid;
        var presenceData = tr.getMeta('presence');
        var telepointerData = tr.getMeta('telepointer');
        var sessionIdData = tr.getMeta('sessionId');
        if (sessionIdData) {
            sid = sessionIdData.sid;
        }
        var add = [];
        var remove = [];
        if (presenceData) {
            var _b = presenceData.joined, joined = _b === void 0 ? [] : _b, _c = presenceData.left, left = _c === void 0 ? [] : _c;
            participants = participants.remove(left.map(function (i) { return i.sessionId; }));
            participants = participants.add(joined);
            // Remove telepointers for users that left
            left.forEach(function (i) {
                var pointers = findPointers(i.sessionId, decorationSet);
                if (pointers) {
                    remove = remove.concat(pointers);
                }
            });
        }
        if (telepointerData) {
            var sessionId = telepointerData.sessionId;
            if (participants.get(sessionId) && sessionId !== sid) {
                var oldPointers = findPointers(telepointerData.sessionId, decorationSet);
                if (oldPointers) {
                    remove = remove.concat(oldPointers);
                }
                var _d = telepointerData.selection, anchor = _d.anchor, head = _d.head;
                var rawFrom = anchor < head ? anchor : head;
                var rawTo = anchor >= head ? anchor : head;
                var isSelection = rawTo - rawFrom > 0;
                var from = 1;
                var to = 1;
                try {
                    from = getValidPos(tr, isSelection ? Math.max(rawFrom - 1, 0) : rawFrom);
                    to = isSelection ? getValidPos(tr, rawTo) : from;
                }
                catch (err) { }
                add = add.concat(createTelepointers(from, to, sessionId, isSelection, this.getInitial(sessionId)));
            }
        }
        if (tr.docChanged) {
            // Adjust decoration positions to changes made by the transaction
            try {
                decorationSet = decorationSet.map(tr.mapping, tr.doc, {
                    // Reapplies decorators those got removed by the state change
                    onRemove: function (spec) {
                        if (spec.pointer && spec.pointer.sessionId) {
                            var step = tr.steps.filter(isReplaceStep)[0];
                            if (step) {
                                var sessionId = spec.pointer.sessionId;
                                var _a = step, size = _a.slice.content.size, from = _a.from;
                                var pos = getValidPos(tr, size
                                    ? Math.min(from + size, tr.doc.nodeSize - 3)
                                    : Math.max(from, 1));
                                add = add.concat(createTelepointers(pos, pos, sessionId, false, _this.getInitial(sessionId)));
                            }
                        }
                    },
                });
            }
            catch (err) { }
            // Remove any selection decoration within the change range,
            // takes care of the issue when after pasting we end up with a dead selection
            tr.steps.filter(isReplaceStep).forEach(function (s) {
                var _a = s, from = _a.from, to = _a.to;
                decorationSet.find(from, to).forEach(function (deco) {
                    // `type` is private, `from` and `to` are public in latest version
                    // `from` != `to` means it's a selection
                    if (deco.from !== deco.to) {
                        remove.push(deco);
                    }
                });
            });
        }
        var selection = tr.selection;
        decorationSet.find().forEach(function (deco) {
            if (deco.type.toDOM) {
                if (deco.from === selection.from && deco.to === selection.to) {
                    deco.type.toDOM.classList.add('telepointer-dim');
                    deco.type.side = -1;
                }
                else {
                    deco.type.toDOM.classList.remove('telepointer-dim');
                    deco.type.side = 0;
                }
            }
        });
        if (remove.length) {
            decorationSet = decorationSet.remove(remove);
        }
        if (add.length) {
            decorationSet = decorationSet.add(tr.doc, add);
        }
        return new PluginState(decorationSet, participants, sid);
    };
    PluginState.init = function (config) {
        var doc = config.doc;
        return new PluginState(DecorationSet.create(doc, []), new Participants());
    };
    return PluginState;
}());
export { PluginState };
//# sourceMappingURL=plugin.js.map