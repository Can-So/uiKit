jest.mock('../../../plugins', () => ({
  analyticsPlugin: jest.fn(),
  mediaPlugin: jest.fn(),
  tablesPlugin: jest.fn(),
  insertBlockPlugin: jest.fn(),
  placeholderTextPlugin: jest.fn(),
  textFormattingPlugin: jest.fn(),
  codeBlockPlugin: jest.fn(),
  statusPlugin: jest.fn(),
}));

import {
  analyticsPlugin,
  tablesPlugin,
  mediaPlugin,
  helpDialogPlugin,
  fakeTextCursorPlugin,
  submitEditorPlugin,
  insertBlockPlugin,
  placeholderTextPlugin,
  layoutPlugin,
  statusPlugin,
} from '../../../plugins';

import createPluginsList from '../../../create-editor/create-plugins-list';

describe('createPluginsList', () => {
  beforeEach(() => {
    (analyticsPlugin as any).mockReset();
    (insertBlockPlugin as any).mockReset();
    (placeholderTextPlugin as any).mockReset();
    (statusPlugin as any).mockReset();
  });

  it('should add helpDialogPlugin if allowHelpDialog is true', () => {
    const plugins = createPluginsList({ allowHelpDialog: true });
    expect(plugins).toContain(helpDialogPlugin);
  });

  it('should add fakeTextCursorPlugin by default', () => {
    const plugins = createPluginsList({});
    expect(plugins).toContain(fakeTextCursorPlugin);
  });

  it('should add tablePlugin if allowTables is true', () => {
    const tableOptions = { allowTables: true };
    createPluginsList(tableOptions);
    expect(tablesPlugin).toHaveBeenCalledTimes(1);
    expect(tablesPlugin).toHaveBeenCalledWith(true);
  });

  it('should always add submitEditorPlugin to the editor', () => {
    const plugins = createPluginsList({});
    expect(plugins).toContain(submitEditorPlugin);
  });

  it('should add mediaPlugin if media prop is provided', () => {
    const media = {
      provider: Promise.resolve() as any,
      allowMediaSingle: true,
    };
    createPluginsList({ media });
    expect(mediaPlugin).toHaveBeenCalledTimes(1);
    expect(mediaPlugin).toHaveBeenCalledWith(media);
  });

  it('should add placeholderText plugin if allowTemplatePlaceholders prop is provided', () => {
    (placeholderTextPlugin as any).mockReturnValue('placeholderText');
    const plugins = createPluginsList({ allowTemplatePlaceholders: true });
    expect(plugins).toContain('placeholderText');
  });

  it('should pass empty options to placeholderText plugin if allowTemplatePlaceholders is true', () => {
    createPluginsList({ allowTemplatePlaceholders: true });
    expect(placeholderTextPlugin).toHaveBeenCalledTimes(1);
    expect(placeholderTextPlugin).toHaveBeenCalledWith({});
  });

  it('should enable allowInserting for placeholderText plugin if options.allowInserting is true', () => {
    createPluginsList({ allowTemplatePlaceholders: { allowInserting: true } });
    expect(placeholderTextPlugin).toHaveBeenCalledTimes(1);
    expect(placeholderTextPlugin).toHaveBeenCalledWith({
      allowInserting: true,
    });
  });

  it('should add layoutPlugin if allowLayout prop is provided', () => {
    const plugins = createPluginsList({ allowLayouts: true });
    expect(plugins).toContain(layoutPlugin);
  });

  it('should not add statuPlugin if allowStatus prop is false', () => {
    createPluginsList({ allowStatus: false });
    expect(statusPlugin).not.toBeCalled();
    expect(insertBlockPlugin).toBeCalledWith(
      expect.objectContaining({ nativeStatusSupported: false }),
    );
  });

  it('should add statuPlugin if allowStatus prop is true', () => {
    createPluginsList({ allowStatus: true });
    expect(statusPlugin).toHaveBeenCalledTimes(1);
    expect(statusPlugin).toHaveBeenCalledWith({ menuDisabled: false });
    expect(insertBlockPlugin).toBeCalledWith(
      expect.objectContaining({ nativeStatusSupported: true }),
    );
  });

  it('should add statuPlugin if allowStatus prop is provided with menuDisabled true', () => {
    createPluginsList({ allowStatus: { menuDisabled: true } });
    expect(statusPlugin).toHaveBeenCalledTimes(1);
    expect(statusPlugin).toHaveBeenCalledWith({ menuDisabled: true });
    expect(insertBlockPlugin).toBeCalledWith(
      expect.objectContaining({ nativeStatusSupported: false }),
    );
  });

  it('should add statuPlugin if allowStatus prop is provided with menuDisabled false', () => {
    createPluginsList({ allowStatus: { menuDisabled: false } });
    expect(statusPlugin).toHaveBeenCalledTimes(1);
    expect(statusPlugin).toHaveBeenCalledWith({ menuDisabled: false });
    expect(insertBlockPlugin).toBeCalledWith(
      expect.objectContaining({ nativeStatusSupported: true }),
    );
  });

  it('should add analyticsPlugin if allowAnalyticsGASV3 prop is provided', () => {
    const createAnalyticsEvent = jest.fn();
    createPluginsList({ allowAnalyticsGASV3: true }, createAnalyticsEvent);
    expect(analyticsPlugin).toHaveBeenCalledTimes(1);
    expect(analyticsPlugin).toHaveBeenCalledWith(createAnalyticsEvent);
  });

  it('should no add analyticsPlugin if allowAnalyticsGASV3 prop is false', () => {
    const createAnalyticsEvent = jest.fn();
    createPluginsList({ allowAnalyticsGASV3: false }, createAnalyticsEvent);
    expect(analyticsPlugin).not.toHaveBeenCalled();
  });

  it('should always add insertBlockPlugin to the editor with insertMenuItems', () => {
    const customItems = [
      {
        content: 'a',
        value: { name: 'a' },
        tooltipDescription: 'item a',
        tooltipPosition: 'right',
        onClick: () => {},
      },
      {
        content: 'b',
        value: { name: 'b' },
        tooltipDescription: 'item b',
        tooltipPosition: 'right',
        onClick: () => {},
      },
    ];

    const props = {
      insertMenuItems: customItems,
      nativeStatusSupported: false,
    };

    createPluginsList(props);
    expect(insertBlockPlugin).toHaveBeenCalledTimes(1);
    expect(insertBlockPlugin).toHaveBeenCalledWith(props);
  });
});
