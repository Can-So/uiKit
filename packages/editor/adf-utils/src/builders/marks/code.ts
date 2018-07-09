// @ts-ignore
import { TextDefinition } from '@atlaskit/editor-common';

import { CodeDefinition } from '@atlaskit/editor-common';
import { applyMark } from '../utils/apply-mark';
import { WithMark } from '../types';

export const code = (maybeNode: WithMark | string) =>
  applyMark<CodeDefinition>({ type: 'code' }, maybeNode);
