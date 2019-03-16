export declare const getOffsetParent: (editorViewDom: HTMLElement, popupsMountPoint?: HTMLElement | undefined) => HTMLElement;
export declare const getNearestNonTextNode: (node: Node) => HTMLElement;
export declare const handlePositionCalculatedWith: (offsetParent: HTMLElement, node: Node, getCurrentFixedCoordinates: () => any) => (position: {
    top?: number | undefined;
    left?: number | undefined;
    bottom?: number | undefined;
    right?: number | undefined;
}) => {
    top?: number | undefined;
    left?: number | undefined;
    bottom?: number | undefined;
    right?: number | undefined;
};
