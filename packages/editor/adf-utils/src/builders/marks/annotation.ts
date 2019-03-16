import {
  AnnotationMarkDefinition,
  AnnotationMarkAttributes,
} from '@findable/adf-schema';
import { applyMark } from '../utils/apply-mark';
import { WithMark } from '../types';

export const annotation = (attrs: AnnotationMarkAttributes) => (
  maybeNode: WithMark | string,
) =>
  applyMark<AnnotationMarkDefinition>({ type: 'annotation', attrs }, maybeNode);
