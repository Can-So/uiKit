import {
  LayoutColumnDefinition,
  LayoutSectionDefinition,
} from '@findable/adf-schema';

export const layoutSection = () => (
  content: Array<LayoutColumnDefinition>,
): LayoutSectionDefinition => ({
  type: 'layoutSection',
  content,
});
