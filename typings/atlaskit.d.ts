import { any } from 'prop-types';

declare module '@atlaskit/*';

declare module '@atlaskit/theme' {
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
  const d: any;
  export default d;
}
