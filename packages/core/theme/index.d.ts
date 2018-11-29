declare module '@atlaskit/theme' {
  export const borderRadius: any;
  export const codeFontFamily: any;
  export const colors: Record<string, string>;
  export const createTheme: <ThemeTokens, ThemeProps>(
    theme: (props: ThemeProps) => ThemeTokens,
  ) => ThemeTokens;
  export const fontFamily: any;
  export const fontSize: any;
  export const gridSize: any;
  export const layers: any;
  export const math: any;
  export const Theme: React.ComponentType<any>;
  export const themed: any;
  export const typography: any;
  const d: any;
  export default d;
}
