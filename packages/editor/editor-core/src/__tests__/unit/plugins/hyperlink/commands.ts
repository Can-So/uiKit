import {
  createEditorFactory,
  doc,
  p,
  a,
  code_block,
  code,
  EditorTestCardProvider,
} from '@atlaskit/editor-test-helpers';
import {
  setLinkHref,
  setLinkText,
  showLinkToolbar,
  insertLink,
  hideLinkToolbar,
  removeLink,
} from '../../../../plugins/hyperlink/commands';
import {
  stateKey as hyperlinkStateKey,
  LinkAction,
} from '../../../../plugins/hyperlink/pm-plugins/main';
import { pluginKey as cardPluginKey } from '../../../../plugins/card/pm-plugins/main';

describe('hyperlink commands', () => {
  const createEditor = createEditorFactory();
  const cardProvider = new EditorTestCardProvider();
  const editor = (doc: any) =>
    createEditor({
      doc,
      editorProps: {
        allowCodeBlocks: true,
        UNSAFE_cards: {
          provider: Promise.resolve(cardProvider),
        },
      },
    });

  describe('#setLinkHref', () => {
    it('should not set the link href when pos is not inside existing text node', () => {
      const { editorView: view, sel } = editor(doc(p('{<>}')));
      expect(
        setLinkHref('https://google.com', sel)(view.state, view.dispatch),
      ).toBe(false);
    });
    it('should not set the link when href is same', () => {
      const { editorView: view, sel } = editor(
        doc(p(a({ href: 'http://google.com' })('{<>}text'))),
      );
      expect(
        setLinkHref('http://google.com', sel)(view.state, view.dispatch),
      ).toBe(false);
    });
    it('should remove the link mark when the href is an empty string', () => {
      const { editorView: view, sel } = editor(
        doc(p(a({ href: 'google.com' })('{<>}text'))),
      );
      expect(setLinkHref('', sel)(view.state, view.dispatch)).toBe(true);
      expect(view.state.doc).toEqualDocument(doc(p('text')));
    });
    it('should set normalized link href when the href is non-empty', () => {
      const { editorView: view, sel } = editor(
        doc(p(a({ href: 'google.com' })('{<>}text'))),
      );
      expect(setLinkHref('google.com', sel)(view.state, view.dispatch)).toBe(
        true,
      );
      expect(view.state.doc).toEqualDocument(
        doc(p(a({ href: 'http://google.com' })('text'))),
      );
    });
    it('should set mailto: prefix when the href is email-like', () => {
      const { editorView: view, sel } = editor(
        doc(p(a({ href: 'google.com' })('{<>}text'))),
      );
      expect(
        setLinkHref('scott@google.com', sel)(view.state, view.dispatch),
      ).toBe(true);
      expect(view.state.doc).toEqualDocument(
        doc(p(a({ href: 'mailto:scott@google.com' })('text'))),
      );
    });
    it('should set link on selection only', () => {
      const { editorView: view } = editor(doc(p('this is a {<}selection{>}')));
      const { from, to } = view.state.selection;
      expect(
        setLinkHref('google.com', from, to)(view.state, view.dispatch),
      ).toBe(true);
      expect(view.state.doc).toEqualDocument(
        doc(p('this is a ', a({ href: 'http://google.com' })('selection'))),
      );
    });
    it('should not set the link href when it contains XSS code', () => {
      const { editorView: view, sel } = editor(doc(p('{<>}')));
      expect(
        setLinkHref('javascript:alert(1)', sel)(view.state, view.dispatch),
      ).toBe(false);
    });
  });
  describe('#setLinkText', () => {
    it('should not set the link text when pos is not at a link node', () => {
      const { editorView: view, sel } = editor(doc(p('{<>}')));
      expect(setLinkText('google', sel)(view.state, view.dispatch)).toBe(false);
    });
    it('should not set the link text when text is an empty string', () => {
      const { editorView: view, sel } = editor(
        doc(p(a({ href: 'google.com' })('{<>}text'))),
      );
      expect(setLinkText('', sel)(view.state, view.dispatch)).toBe(false);
    });
    it('should not set the link text when text is equal to the node.text', () => {
      const { editorView: view, sel } = editor(
        doc(p(a({ href: 'google.com' })('{<>}google.com'))),
      );
      expect(setLinkText('google.com', sel)(view.state, view.dispatch)).toBe(
        false,
      );
    });
    it('should set the link text when the text is non-empty', () => {
      const { editorView: view, sel } = editor(
        doc(p(a({ href: 'google.com' })('{<>}text'))),
      );
      expect(setLinkText('hi!', sel)(view.state, view.dispatch)).toBe(true);
      expect(view.state.doc).toEqualDocument(
        doc(p(a({ href: 'google.com' })('hi!'))),
      );
    });
    it('should set the link text on selection only', () => {
      const { editorView: view } = editor(
        doc(p('this is a ', a({ href: 'google.com' })('{<}link{>}'))),
      );
      const { from, to } = view.state.selection;
      expect(
        setLinkText('selection', from, to)(view.state, view.dispatch),
      ).toBe(true);
      expect(view.state.doc).toEqualDocument(
        doc(p('this is a ', a({ href: 'google.com' })('{<}selection{>}'))),
      );
    });
  });
  describe('#insertLink', () => {
    it('should not insert link when selection is inside an incompatible node', () => {
      const { editorView: view, sel } = editor(doc(code_block()('{<>}')));
      expect(
        insertLink(sel, sel, 'google.com')(view.state, view.dispatch),
      ).toBe(false);
    });
    it('should not insert link when selection is across incompatible nodes', () => {
      const {
        editorView: view,
        refs: { '<': from, '>': to },
      } = editor(doc(p('{<}hello'), p('world{>}')));
      expect(
        insertLink(from, to, 'google.com')(view.state, view.dispatch),
      ).toBe(false);
    });
    it('should not insert link when selection is across incompatible marks', () => {
      const {
        editorView: view,
        refs: { '<': from, '>': to },
      } = editor(doc(p(code('{<}hello'), 'world{>}')));
      expect(
        insertLink(from, to, 'google.com')(view.state, view.dispatch),
      ).toBe(false);
    });
    it('should not insert link when selection includes an existing link', () => {
      const {
        editorView: view,
        refs: { '<': from, '>': to },
      } = editor(doc(p('{<}hello ', a({ href: '' })('there'), ' world{>}')));
      expect(
        insertLink(from, to, 'google.com')(view.state, view.dispatch),
      ).toBe(false);
    });
    it('should not insert link when href is an empty string', () => {
      const { editorView: view, sel } = editor(doc(p('{<>}')));
      expect(insertLink(sel, sel, '')(view.state, view.dispatch)).toBe(false);
    });
    it('should insert normalized link when selection is a cursor and href is a non-empty string', () => {
      const { editorView: view, sel } = editor(doc(p('{<>}')));
      expect(
        insertLink(sel, sel, 'google.com')(view.state, view.dispatch),
      ).toBe(true);
      expect(view.state.doc).toEqualDocument(
        doc(p(a({ href: 'http://google.com' })('google.com'))),
      );
    });
    it('should insert normalized link when selection is a range and href is a non-empty string', () => {
      const {
        editorView: view,
        refs: { '<': from, '>': to },
      } = editor(doc(p('{<}example_link{>}')));
      expect(
        insertLink(from, to, 'google.com')(view.state, view.dispatch),
      ).toBe(true);
      expect(view.state.doc).toEqualDocument(
        doc(p(a({ href: 'http://google.com' })('example_link'))),
      );
    });
    it('should set mailto: prefix when the href is email-like', () => {
      const { editorView: view, sel } = editor(doc(p('{<>}')));
      expect(
        insertLink(sel, sel, 'scott@google.com')(view.state, view.dispatch),
      ).toBe(true);
      expect(view.state.doc).toEqualDocument(
        doc(p(a({ href: 'mailto:scott@google.com' })('scott@google.com'))),
      );
    });
    it('should attempt to queue the url with the card plugin', () => {
      const { editorView: view, sel } = editor(doc(p('{<>}')));

      expect(
        insertLink(sel, sel, 'http://www.atlassian.com/')(
          view.state,
          view.dispatch,
        ),
      ).toBe(true);
      expect(cardPluginKey.getState(view.state)).toEqual({
        requests: [
          {
            url: 'http://www.atlassian.com/',
            pos: 1,
            appearance: 'inline',
          },
        ],
        provider: null, // cardProvider would have been set yet
      });
    });
    it('should not insert a href which contains XSS', () => {
      const { editorView: view, sel } = editor(doc(p('{<>}')));

      expect(
        insertLink(sel, sel, 'javascript:alert(1)')(view.state, view.dispatch),
      ).toBe(true);

      expect(view.state.doc).toEqualDocument(
        doc(p(a({ href: '' })('javascript:alert(1)'))),
      );
    });
  });
  describe('#removeLink', () => {
    it('should remove the link mark when the href is an empty string', () => {
      const { editorView: view, sel } = editor(
        doc(p(a({ href: 'google.com' })('{<>}text'))),
      );
      expect(removeLink(sel)(view.state, view.dispatch)).toBe(true);
      expect(view.state.doc).toEqualDocument(doc(p('text')));
    });
    it('should not set remove the link href when pos is not inside a link node', () => {
      const { editorView: view, sel } = editor(doc(p('{<>}')));
      expect(removeLink(sel)(view.state, view.dispatch)).toBe(false);
    });
  });
  describe('#showLinkToolbar', () => {
    it('should trigger the SHOW_INSERT_TOOLBAR for the hyperlink plugin', () => {
      const { editorView: view } = editor(doc(p('{<>}')));
      const dispatchMock = jest.spyOn(view, 'dispatch');
      expect(showLinkToolbar()(view.state, view.dispatch)).toBe(true);
      expect(dispatchMock.mock.calls[0][0].getMeta(hyperlinkStateKey)).toBe(
        LinkAction.SHOW_INSERT_TOOLBAR,
      );
    });
  });

  describe('#hideLinkToolbar', () => {
    it('should trigger the HIDE_TOOLBAR for the hyperlink plugin', () => {
      const { editorView: view } = editor(doc(p('{<>}')));
      const dispatchMock = jest.spyOn(view, 'dispatch');
      expect(hideLinkToolbar()(view.state, view.dispatch)).toBe(true);
      expect(dispatchMock.mock.calls[0][0].getMeta(hyperlinkStateKey)).toBe(
        LinkAction.HIDE_TOOLBAR,
      );
    });
  });
});
