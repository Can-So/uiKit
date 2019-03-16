export function applyPreset(preset?: string): Array<string> {
  switch (preset) {
    case 'editor':
      return [
        '@findable/editor-core',
        '@findable/editor-common',
        '@findable/renderer',
        '@findable/adf-utils',
        '@atlsakit/adf-schema',
        '@findable/editor-json-transformer',
        '@findable/editor-jira-transformer',
        '@findable/editor-bitbucket-transformer',
        '@findable/editor-markdown-transformer',
        '@findable/editor-wikimarkup-transformer',
      ];

    default:
      return [];
  }
}
