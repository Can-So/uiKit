import { setParentNodeMarkup, removeParentNodeOfType } from 'prosemirror-utils';
import { PanelType } from '@atlaskit/adf-schema';
import { analyticsService } from '../../analytics';
import { Command } from '../../types';

export type DomAtPos = (pos: number) => { node: HTMLElement; offset: number };

export const removePanel = (): Command => (state, dispatch) => {
  const {
    schema: { nodes },
    tr,
  } = state;
  analyticsService.trackEvent(`atlassian.editor.format.panel.delete.button`);

  if (dispatch) {
    dispatch(removeParentNodeOfType(nodes.panel)(tr));
  }
  return true;
};

export const changePanelType = (panelType: PanelType): Command => (
  state,
  dispatch,
) => {
  const {
    schema: { nodes },
    tr,
  } = state;
  analyticsService.trackEvent(
    `atlassian.editor.format.panel.${panelType}.button`,
  );

  if (dispatch) {
    dispatch(setParentNodeMarkup(nodes.panel, null, { panelType })(tr));
  }
  return true;
};
