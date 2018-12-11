import { AlignmentState } from '../pm-plugins/main';
import { toggleBlockMark } from '../../../commands';
import { Command } from '../../../types/command';

export const changeAlignment = (align?: AlignmentState): Command => (
  state,
  dispatch,
) => {
  const {
    nodes: { paragraph, heading },
    marks: { alignment },
  } = state.schema;
  return toggleBlockMark(
    alignment,
    () => (!align ? undefined : align === 'start' ? false : { align }),
    [paragraph, heading],
  )(state, dispatch);
};
