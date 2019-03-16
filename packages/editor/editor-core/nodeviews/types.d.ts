/// <reference types="react" />
export interface ReactNodeProps {
    selected: boolean;
}
export declare type ReactComponentConstructor = new (props: any) => React.Component<any, any>;
export declare type ProsemirrorGetPosHandler = () => number;
