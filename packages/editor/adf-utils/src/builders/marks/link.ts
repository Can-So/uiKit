import { LinkDefinition, LinkAttributes } from '@findable/adf-schema';
import { applyMark } from '../utils/apply-mark';
import { WithMark } from '../types';

export const link = (attrs: LinkAttributes) => (maybeNode: WithMark | string) =>
  applyMark<LinkDefinition>({ type: 'link', attrs }, maybeNode);
