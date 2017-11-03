import * as chai from 'chai';
import * as sinon from 'sinon';
import { expect } from 'chai';
import rulePlugins from '../../../../src/plugins/rule';
import {
  chaiPlugin, doc, hr, insertText, makeEditor, p, code_block
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';
import { analyticsService } from '../../../../src/analytics';

chai.use(chaiPlugin);

describe('inputrules', () => {
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: rulePlugins(defaultSchema),
  });

  describe('rule', () => {
    it('should not convert "***" in the middle of a line to a horizontal rule', () => {
      const { editorView, sel } = editor(doc(p('test{<>}')));

      insertText(editorView, 'text***', sel);

      expect(editorView.state.doc).to.not.equal(doc(p(), hr, p()));
    });

    it('should convert "***" in the start of a line to a horizontal rule', () => {
      let trackEvent = sinon.spy();
      analyticsService.trackEvent = trackEvent;
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '***', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p(), hr, p()));
      expect(trackEvent.calledWith('atlassian.editor.format.horizontalrule.autoformatting')).to.equal(true);
    });

    it('should convert "---" at the start of a line to horizontal rule', () => {
      let trackEvent = sinon.spy();
      analyticsService.trackEvent = trackEvent;
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '---', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p(), hr, p()));
      expect(trackEvent.calledWith('atlassian.editor.format.horizontalrule.autoformatting')).to.equal(true);
    });

    it('should not convert "---" in the middle of a line to a horizontal rule', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, 'text---', sel);

      expect(editorView.state.doc).to.not.equal(doc(p('text'), hr, p()));
    });

    it('should not convert "---" inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '---', sel);

      expect(editorView.state.doc).to.deep.equal(doc(code_block()('---')));
    });
  });


});
