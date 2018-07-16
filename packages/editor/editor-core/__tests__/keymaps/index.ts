import { browser } from '@atlaskit/editor-common';
import * as keymaps from '../../src/keymaps';

describe('keymaps', () => {
  const keymap = {
    description: 'A keymap',
    windows: 'Ctrl-Shift-Alt-K',
    mac: 'Cmd-Shift-Alt-K',
    common: 'Mod-Shift-Alt-K',
  };

  if (browser.mac) {
    describe('when on a mac', () => {
      describe('tooltip', () => {
        it('returns tooltip', () => {
          expect(keymaps.tooltip(keymap)).toEqual('A keymap (⌘-⇧-⌥-K)');
        });
      });

      describe('findKeymapByDescription', () => {
        describe('keymap is found', () => {
          it('returns matched keymap', () => {
            expect(keymaps.findKeymapByDescription('Bold')).toEqual(
              keymaps.toggleBold,
            );
          });
        });

        describe('key map is not found', () => {
          it('returns undefined', () => {
            expect(keymaps.findKeymapByDescription('random')).toBe(undefined);
          });
        });
      });

      describe('findShortcutByDescription', () => {
        describe('shortcut is found', () => {
          it('returns matched shortcut', () => {
            expect(keymaps.findShortcutByDescription('Block quote')).toEqual(
              'Cmd-Alt-9',
            );
          });
        });

        describe('shortcut is not found', () => {
          it('returns undefined', () => {
            expect(keymaps.findShortcutByDescription('random')).toBe(undefined);
          });
        });
      });
    });
  } else {
    describe('when not on a mac', () => {
      describe('tooltip', () => {
        it('returns tooltip', () => {
          expect(keymaps.tooltip(keymap)).toEqual('A keymap Ctrl+Shift+Alt+K');
        });
      });

      describe('findKeymapByDescription', () => {
        describe('keymap is found', () => {
          it('returns matched keymap', () => {
            expect(keymaps.findKeymapByDescription('Bold')).toEqual(
              keymaps.toggleBold,
            );
          });
        });

        describe('key map is not found', () => {
          it('returns undefined', () => {
            expect(keymaps.findKeymapByDescription('random')).toBe(undefined);
          });
        });
      });

      describe('findShortcutByDescription', () => {
        describe('shortcut is found', () => {
          it('returns matched shortcut', () => {
            expect(keymaps.findShortcutByDescription('Redo')).toEqual('Ctrl-y');
          });
        });

        describe('shortcut is not found', () => {
          it('returns undefined', () => {
            expect(keymaps.findShortcutByDescription('random')).toBe(undefined);
          });
        });
      });
    });
  }
});
