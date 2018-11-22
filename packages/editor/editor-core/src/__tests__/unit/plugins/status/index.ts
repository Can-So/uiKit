import statusPlugin from '../../../../plugins/status';
import { QuickInsertItem } from '../../../../plugins/quick-insert/types';

describe('status plugin', () => {
  describe('quickInsert menu', () => {
    it('quickInsert menu should have Fabric Status when menuDisabled is false', () => {
      const statusPluginInstance = statusPlugin({ menuDisabled: false });
      const quickInsertList = statusPluginInstance.pluginsOptions!.quickInsert;
      expect(quickInsertList).not.toBeUndefined();
      expect(quickInsertList).toHaveLength(1);

      const quickInsertList_ = quickInsertList as QuickInsertItem[];
      expect(quickInsertList_[0].title).toBe('Status');
    });

    it('quickInsert menu should not have Fabric Status when menuDisabled is true', () => {
      const statusPluginInstance = statusPlugin({ menuDisabled: true });
      expect(statusPluginInstance.pluginsOptions).toBeUndefined();
    });
  });
});
