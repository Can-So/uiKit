/// <reference types="react" />
declare type Props<T extends {}> = {
    object: T;
    property: keyof T;
};
export declare const PropertyViewer: <T extends {}>({ object, property, }: Props<T>) => JSX.Element | null;
export {};
