import { Command } from '../../types';
import { normalizeUrl } from './utils';
import {
  stateKey,
  LinkAction,
  canLinkBeCreatedInRange,
} from './pm-plugins/main';
import { EditorState, Selection } from 'prosemirror-state';
import { filter } from '../../utils/commands';
import { Mark, Node } from 'prosemirror-model';
import {
  addAnalytics,
  ACTION,
  ACTION_SUBJECT,
  INPUT_METHOD,
  EVENT_TYPE,
  ACTION_SUBJECT_ID,
} from '../analytics';
import { queueCardsFromChangedTr } from '../card/pm-plugins/doc';

const isLinkAtPos = (pos: number) => (state: EditorState): boolean => {
  const text = state.doc.nodeAt(pos);
  if (text) {
    const link = state.schema.marks.link;
    return !!link.isInSet(text.marks);
  }
  return false;
};

export function setLinkHref(pos: number, href: string): Command {
  return filter(isLinkAtPos(pos), (state, dispatch) => {
    const node = state.doc.nodeAt(pos) as Node;
    const link = state.schema.marks.link;
    const mark = link.isInSet(node.marks) as Mark;
    const url = normalizeUrl(href);
    const tr = state.tr.removeMark(pos, pos + node.nodeSize, mark);
    if (href.trim()) {
      tr.addMark(
        pos,
        pos + node.nodeSize,
        link.create({ ...mark.attrs, href: url }),
      );
      tr.setMeta(stateKey, LinkAction.HIDE_TOOLBAR);
    }

    if (dispatch) {
      dispatch(tr);
    }
    return true;
  });
}

export function setLinkText(pos: number, text: string): Command {
  return filter(isLinkAtPos(pos), (state, dispatch) => {
    const node = state.doc.nodeAt(pos) as Node;
    const link = state.schema.marks.link;
    const mark = link.isInSet(node.marks) as Mark;
    if (node && text && text !== node.text) {
      const tr = state.tr;
      tr.insertText(text, pos, pos + node.nodeSize);
      tr.addMark(pos, pos + text.length, mark);
      tr.setMeta(stateKey, LinkAction.HIDE_TOOLBAR);

      if (dispatch) {
        dispatch(tr);
      }
      return true;
    }
    return false;
  });
}

export function insertLink(
  from: number,
  to: number,
  href: string,
  text?: string,
): Command {
  return filter(canLinkBeCreatedInRange(from, to), (state, dispatch) => {
    const link = state.schema.marks.link;
    if (href.trim()) {
      const { tr } = state;
      if (from === to) {
        const textContent = text || href;
        tr.insertText(textContent, from, to);
        tr.addMark(
          from,
          from + textContent.length,
          link.create({ href: normalizeUrl(href) }),
        );
      } else {
        tr.addMark(from, to, link.create({ href: normalizeUrl(href) }));
        tr.setSelection(Selection.near(tr.doc.resolve(to)));
      }

      queueCardsFromChangedTr(state, tr);

      if (dispatch) {
        tr.setMeta(stateKey, LinkAction.HIDE_TOOLBAR);
        dispatch(tr);
      }
      return true;
    }
    return false;
  });
}

export function removeLink(pos: number): Command {
  return setLinkHref(pos, '');
}

export function showLinkToolbar(
  inputMethod:
    | INPUT_METHOD.TOOLBAR
    | INPUT_METHOD.QUICK_INSERT
    | INPUT_METHOD.SHORTCUT = INPUT_METHOD.TOOLBAR,
): Command {
  return function(state, dispatch) {
    if (dispatch) {
      let tr = state.tr.setMeta(stateKey, LinkAction.SHOW_INSERT_TOOLBAR);
      tr = addAnalytics(tr, {
        action: ACTION.INVOKED,
        actionSubject: ACTION_SUBJECT.TYPEAHEAD,
        actionSubjectId: ACTION_SUBJECT_ID.TYPEAHEAD_LINK,
        attributes: { inputMethod },
        eventType: EVENT_TYPE.UI,
      });
      dispatch(tr);
    }
    return true;
  };
}

export function hideLinkToolbar(): Command {
  return function(state, dispatch) {
    if (dispatch) {
      dispatch(state.tr.setMeta(stateKey, LinkAction.HIDE_TOOLBAR));
    }
    return true;
  };
}
