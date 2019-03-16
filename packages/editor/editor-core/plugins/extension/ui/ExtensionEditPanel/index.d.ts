/// <reference types="react" />
export interface Props {
    element: HTMLElement | null;
    onEdit: () => void;
    onRemove: () => void;
    stickToolbarToBottom?: boolean;
    onLayoutChange?: (mode: string) => void;
    layout?: string;
    showLayoutOptions?: boolean;
}
export default function ExtensionEditPanel(this: any, props: Props): JSX.Element | null;
