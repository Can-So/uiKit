import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { Tool, Color, Dimensions } from '../../common';
export declare const TOOLBAR_HEIGHT = 64;
export interface EditorViewProps {
    readonly imageUrl: string;
    readonly onSave: (image: string, dimensions: Dimensions) => void;
    readonly onCancel: () => void;
    readonly onError: (message: string) => void;
    readonly onAnyEdit?: () => void;
}
export interface EditorViewState {
    readonly dimensions: Dimensions;
    readonly color: Color;
    readonly lineWidth: number;
    readonly tool: Tool;
}
declare const _default: React.ComponentClass<EditorViewProps, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<EditorViewProps & InjectedIntlProps>;
};
export default _default;
