export interface RGBColors {
    [key: string]: RGB;
}
export interface RGB {
    r: number;
    g: number;
    b: number;
}
declare const mapping: RGBColors;
export default mapping;
