import * as React from 'react';
import { EditorAppearanceComponentProps } from '../../types';
export default class Editor extends React.Component<EditorAppearanceComponentProps, any> {
    state: {
        showKeyline: boolean;
    };
    static displayName: string;
    private appearance;
    private scrollContainer;
    private scheduledKeylineUpdate;
    stopPropagation: (event: React.MouseEvent<HTMLDivElement>) => void;
    scrollContainerRef: (ref: HTMLElement | null) => void;
    updateToolbarKeyline: () => boolean;
    private scheduleUpdateToolbarKeyline;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
