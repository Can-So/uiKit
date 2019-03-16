/**
 * @return String with HEX-coded color
 */
export declare function normalizeHexColor(color: string | null, defaultColor?: string): string | null;
/**
 * Converts hex color format to rgb.
 * Works well with full hex color format and shortcut as well.
 *
 * @param hex - hex color string (#xxx, or #xxxxxx)
 */
export declare function hexToRgb(color: string): string | null;
/**
 * Converts hex color format to rgba.
 *
 * @param hex - hex color string (#xxx, or #xxxxxx)
 */
export declare function hexToRgba(rawColor: string, alpha: number): string | null;
export declare function rgbToHex(value: string): string | null;
export declare function isRgb(color: string): boolean;
export declare function isHex(color: string): boolean;
