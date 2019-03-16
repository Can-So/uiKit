import { UnderlineDefinition } from '@findable/adf-schema';
import { applyMark } from '../utils/apply-mark';
import { WithMark } from '../types';

export const underline = (maybeNode: WithMark | string) =>
  applyMark<UnderlineDefinition>({ type: 'underline' }, maybeNode);
