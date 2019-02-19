import * as React from 'react';
import AkButton from '@atlaskit/button';
import { ReactWrapper } from 'enzyme';
import {
  doc,
  p,
  createEditorFactory,
  mountWithIntl,
} from '@atlaskit/editor-test-helpers';
import { analyticsService } from '../../../../../analytics';
import ToolbarButton from '../../../../../ui/ToolbarButton';
import {
  TextFormattingState,
  pluginKey,
} from '../../../../../plugins/text-formatting/pm-plugins/main';
import ToolbarTextFormatting from '../../../../../plugins/text-formatting/ui/ToolbarTextFormatting';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';
import {
  AnalyticsEventPayload,
  ACTION_SUBJECT_ID,
  ACTION,
  ACTION_SUBJECT,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../../../../../plugins/analytics';

describe('ToolbarTextFormatting', () => {
  const createEditor = createEditorFactory<TextFormattingState>();
  let createAnalyticsEvent: CreateUIAnalyticsEventSignature;
  const editor = (doc: any) => {
    createAnalyticsEvent = jest.fn(() => ({ fire() {} }));
    return createEditor({
      doc,
      editorProps: {
        allowAnalyticsGASV3: true,
      },
      createAnalyticsEvent,
      pluginKey: pluginKey,
    });
  };

  it('should render disabled ToolbarButtons if disabled property is true', () => {
    const { editorView, pluginState } = editor(doc(p('text')));
    const toolbarTextColor = mountWithIntl(
      <ToolbarTextFormatting
        disabled={true}
        textFormattingState={pluginState}
        editorView={editorView}
      />,
    );

    toolbarTextColor.find(ToolbarButton).forEach(node => {
      expect(node.prop('disabled')).toBe(true);
    });
    toolbarTextColor.unmount();
  });

  describe('analytics', () => {
    let trackEvent;
    let toolbarOption;

    function clickItalicButton(wrapper: ReactWrapper): void {
      wrapper
        .find(AkButton)
        .at(1)
        .simulate('click');
    }

    function clickBoldButton(wrapper: ReactWrapper): void {
      wrapper
        .find(AkButton)
        .first()
        .simulate('click');
    }

    beforeEach(() => {
      const { editorView, pluginState } = editor(doc(p('text')));
      toolbarOption = mountWithIntl(
        <ToolbarTextFormatting
          textFormattingState={pluginState}
          editorView={editorView}
        />,
      );
      trackEvent = jest.fn();

      analyticsService.trackEvent = trackEvent;
    });

    afterEach(() => {
      toolbarOption.unmount();
    });

    it('should trigger analyticsService.trackEvent when bold button is clicked', () => {
      clickBoldButton(toolbarOption);
      expect(trackEvent).toHaveBeenCalledWith(
        'atlassian.editor.format.strong.button',
      );
    });

    it('should trigger analyticsService.trackEvent when italic button is clicked', () => {
      clickItalicButton(toolbarOption);

      expect(trackEvent).toHaveBeenCalledWith(
        'atlassian.editor.format.em.button',
      );
    });

    it('should trigger fireAnalyticsEvent when bold button is clicked', () => {
      const expectedPayload: AnalyticsEventPayload = {
        action: ACTION.FORMATTED,
        actionSubject: ACTION_SUBJECT.TEXT,
        actionSubjectId: ACTION_SUBJECT_ID.FORMAT_STRONG,
        eventType: EVENT_TYPE.TRACK,
        attributes: {
          inputMethod: INPUT_METHOD.TOOLBAR,
        },
      };

      clickBoldButton(toolbarOption);

      expect(createAnalyticsEvent).toHaveBeenCalledWith(expectedPayload);
    });

    it('should trigger fireAnalyticsEvent when italic button is clicked', () => {
      const expectedPayload: AnalyticsEventPayload = {
        action: ACTION.FORMATTED,
        actionSubject: ACTION_SUBJECT.TEXT,
        actionSubjectId: ACTION_SUBJECT_ID.FORMAT_ITALIC,
        eventType: EVENT_TYPE.TRACK,
        attributes: {
          inputMethod: INPUT_METHOD.TOOLBAR,
        },
      };

      clickItalicButton(toolbarOption);

      expect(createAnalyticsEvent).toHaveBeenCalledWith(expectedPayload);
    });
  });
});
