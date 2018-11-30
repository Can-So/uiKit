declare module '@atlaskit/*';
declare const WEBSITE_ENV: string;
declare const DEFAULT_META_DESCRIPTION: string;
declare const BASE_TITLE: string;

declare module '@atlaskit/theme' {
  export const elevation: any;
  export const themed: any;
  export const gridSize: any;
  export const math: any;
  export const codeFontFamily: any;
  export const fontFamily: any;
  export const fontSize: any;
  export const borderRadius: any;
  export const typography: any;
  export const layers: any;
  export const colors: Record<string, string>;

  export const Theme: React.ComponentType<any>;
}
