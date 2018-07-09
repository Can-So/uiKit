// @ts-ignore
import { TextDefinition } from '@atlaskit/editor-common';

import { UnderlineDefinition } from '@atlaskit/editor-common';
import { applyMark } from '../utils/apply-mark';
import { WithMark } from '../types';

export const underline = (maybeNode: WithMark | string) =>
  applyMark<UnderlineDefinition>({ type: 'underline' }, maybeNode);
