// @ts-ignore
import { TextDefinition } from '@atlaskit/editor-common';

import { StrikeDefinition } from '@atlaskit/editor-common';
import { applyMark } from '../utils/apply-mark';
import { WithMark } from '../types';

export const strike = (maybeNode: WithMark | string) =>
  applyMark<StrikeDefinition>({ type: 'strike' }, maybeNode);
