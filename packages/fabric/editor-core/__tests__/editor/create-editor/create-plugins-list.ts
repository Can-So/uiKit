jest.mock('../../../src/editor/plugins', () => ({ mediaPlugin: jest.fn() }));

import {
  tablePlugin,
  mediaPlugin,
  helpDialogPlugin,
  placeholderCursorPlugin,
} from '../../../src/editor/plugins';
import createPluginsList from '../../../src/editor/create-editor/create-plugins-list';

describe('createPluginsList', () => {
  it('should add helpDialogPlugin if allowHelpDialog is true', () => {
    const plugins = createPluginsList({ allowHelpDialog: true });
    expect(plugins).toContain(helpDialogPlugin);
  });

  it('should add placeholderCursorPlugin if allowPlaceholderCursor is true', () => {
    const plugins = createPluginsList({ allowPlaceholderCursor: true });
    expect(plugins).toContain(placeholderCursorPlugin);
  });

  it('should add tablePlugin if allowTables is true', () => {
    const plugins = createPluginsList({ allowTables: true });
    expect(plugins).toContain(tablePlugin);
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
});
