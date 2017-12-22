import { Plugin, PluginKey, Transaction } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Step, ReplaceStep } from 'prosemirror-transform';

import ProviderFactory from '../../../providerFactory';
import { isChromeWithSelectionBug } from '../../../utils';
import { Dispatch } from '../../event-dispatcher';
import {
  getSendableSelection,
  handleInit,
  handleConnection,
  handlePresence,
  handleTelePointer,
  applyRemoteData,
} from './actions';
import {
  Participant,
  ConnectionData,
  PresenceData,
  TelepointerData,
} from './types';
import { Participants, ReadOnlyParticipants } from './participants';
import { findPointers, createTelepointers } from './utils';
import { CollabEditProvider } from './provider';
export { CollabEditProvider };

export const pluginKey = new PluginKey('collabEditPlugin');

export const createPlugin = (
  dispatch: Dispatch,
  providerFactory: ProviderFactory,
) => {
  let collabEditProvider: CollabEditProvider | null;
  let isReady = false;

  return new Plugin({
    key: pluginKey,
    state: {
      init: PluginState.init,
      apply(tr, prevPluginState: PluginState, oldState, newState) {
        const pluginState = prevPluginState.apply(tr);

        if (tr.getMeta('isLocal')) {
          if (collabEditProvider) {
            collabEditProvider.send(tr, oldState, newState);
          }
        }

        const { activeParticipants: prevActiveParticipants } = prevPluginState;
        const { activeParticipants, sessionId } = pluginState;

        if (collabEditProvider) {
          const selectionChanged = !oldState.selection.eq(newState.selection);
          const participantsChanged =
            prevActiveParticipants !== activeParticipants;

          if (
            (sessionId && selectionChanged && !tr.docChanged) ||
            (sessionId && participantsChanged)
          ) {
            const selection = getSendableSelection(newState.selection);
            // Delay sending selection till next tick so that participants info
            // can go before it
            setTimeout(
              collabEditProvider.sendMessage.bind(collabEditProvider),
              0,
              {
                type: 'telepointer',
                selection,
                sessionId,
              },
            );
          }
        }

        dispatch(pluginKey, { activeParticipants, sessionId });
        return pluginState;
      },
    },
    props: {
      decorations(state) {
        return this.getState(state).decorations;
      },
    },
    filterTransaction(tr, state) {
      // Don't allow transactions that modifies the document before
      // collab-plugin is ready.
      if (!isReady && tr.docChanged) {
        return false;
      }

      return true;
    },
    view(view) {
      providerFactory.subscribe(
        'collabEditProvider',
        async (name: string, providerPromise?: Promise<CollabEditProvider>) => {
          if (providerPromise) {
            collabEditProvider = await providerPromise;

            // Initialize provider
            collabEditProvider
              .on('init', data => {
                isReady = true;
                handleInit(data, view);
              })
              .on('connected', data => handleConnection(data, view))
              .on('data', data => applyRemoteData(data, view))
              .on('presence', data => handlePresence(data, view))
              .on('telepointer', data => handleTelePointer(data, view))
              .on('error', err => {
                // TODO: Handle errors property (ED-2580)
              })
              .initialize(() => view.state);
          } else {
            collabEditProvider = null;
            isReady = false;
          }
        },
      );

      return {
        destroy() {
          providerFactory.unsubscribeAll('collabEditProvider');
          collabEditProvider = null;
        },
      };
    },
  });
};

const isReplaceStep = (step: Step) => step instanceof ReplaceStep;

export class PluginState {
  private decorationSet: DecorationSet;
  private participants: Participants;
  private sid?: string;

  get decorations() {
    return this.decorationSet;
  }

  get activeParticipants() {
    return this.participants as ReadOnlyParticipants;
  }

  get sessionId() {
    return this.sid;
  }

  constructor(
    decorations: DecorationSet,
    participants: Participants,
    sessionId?: string,
  ) {
    this.decorationSet = decorations;
    this.participants = participants;
    this.sid = sessionId;
  }

  getInitial(sessionId) {
    const participant = this.participants.get(sessionId);
    return participant ? participant.name.substring(0, 1).toUpperCase() : 'X';
  }

  apply(tr: Transaction) {
    let { decorationSet, participants, sid } = this;

    const presenceData = tr.getMeta('presence') as PresenceData;
    const telepointerData = tr.getMeta('telepointer') as TelepointerData;
    const sessionIdData = tr.getMeta('sessionId') as ConnectionData;

    if (sessionIdData) {
      sid = sessionIdData.sid;
    }

    let add: Decoration[] = [];
    let remove: Decoration[] = [];

    if (presenceData) {
      const {
        joined = [] as Participant[],
        left = [] as { sessionId: string }[],
      } = presenceData;

      participants = participants.remove(left.map(i => i.sessionId));
      participants = participants.add(joined);

      // Remove telepointers for users that left
      left.forEach(i => {
        const pointers = findPointers(i.sessionId, decorationSet);
        if (pointers) {
          remove = remove.concat(pointers);
        }
      });
    }

    if (telepointerData) {
      const { sessionId } = telepointerData;
      if (sessionId && sessionId !== sid) {
        const oldPointers = findPointers(
          telepointerData.sessionId,
          decorationSet,
        );
        if (oldPointers) {
          remove = remove.concat(oldPointers);
        }

        const { anchor, head } = telepointerData.selection;
        const from = anchor < head ? anchor : head;
        const to = anchor >= head ? anchor : head;

        const isSelection = to - from > 0;
        // This problem affects Chrome v58-62. See: https://github.com/ProseMirror/prosemirror/issues/710
        if (!isSelection && isChromeWithSelectionBug) {
          document.getSelection().empty();
        }

        add = add.concat(
          createTelepointers(
            from - (isSelection ? 0 : 1),
            to,
            sessionId,
            isSelection,
            this.getInitial(sessionId),
          ),
        );
      }
    }

    if (tr.docChanged) {
      // Adjust decoration positions to changes made by the transaction
      decorationSet = decorationSet.map(tr.mapping, tr.doc, {
        // Reapplies decorators those got removed by the state change
        onRemove: (spec: { pointer: { sessionId: string } }) => {
          if (spec.pointer && spec.pointer.sessionId) {
            const step = tr.steps.filter(isReplaceStep)[0];
            if (step) {
              const { sessionId } = spec.pointer;
              const { slice: { content: { size } }, from } = step as any;
              const pos = size
                ? Math.min(from + size, tr.doc.nodeSize - 3)
                : Math.max(from, 1);

              add = add.concat(
                createTelepointers(
                  pos,
                  pos,
                  sessionId,
                  false,
                  this.getInitial(sessionId),
                ),
              );
            }
          }
        },
      });

      // Remove any selection decoration within the change range,
      // takes care of the issue when after pasting we end up with a dead selection
      tr.steps.filter(isReplaceStep).forEach(s => {
        const { from, to } = s as any;
        decorationSet.find(from, to).forEach((deco: any) => {
          // `type` is private, `from` and `to` are public in latest version
          // `from` != `to` means it's a selection
          if (deco.from !== deco.to) {
            remove.push(deco);
          }
        });
      });
    }

    if (remove.length) {
      decorationSet = decorationSet.remove(remove);
    }

    if (add.length) {
      decorationSet = decorationSet.add(tr.doc, add);
    }

    return new PluginState(decorationSet, participants, sid);
  }

  static init(config: any) {
    const { doc } = config;
    return new PluginState(DecorationSet.create(doc, []), new Participants());
  }
}
