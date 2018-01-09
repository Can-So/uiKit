import { Action } from 'redux';

export interface StartImportAction extends Action {
  type: 'START_IMPORT';
}

export function isStartImportAction(
  action: Action,
): action is StartImportAction {
  return action.type === 'START_IMPORT';
}

export function startImport(): StartImportAction {
  return {
    type: 'START_IMPORT',
  };
}
