import * as React from 'react';
declare type Props = {
    /** Text to appear to the right of the text. It has a lower font-weight. */
    caption?: string;
    /** Location to link out to on click. This is passed down to the custom link component if one is provided. */
    href?: string;
    /** Target frame for item `href` link to be aimed at. */
    target?: string;
    /** React element to appear to the left of the text. This should be an @atlaskit/icon component. */
    icon?: React.ReactNode;
    /** Makes the navigation item appear with reduced padding and font size. */
    isCompact?: boolean;
    /** Set whether the item should be highlighted as selected. Selected items have a different background color. */
    isSelected?: boolean;
    /** Set whether the item has been highlighted using mouse navigation. Mouse selected items will not display the selectedIcon. */
    isMouseSelected?: boolean;
    /** Function to be called on click. This is passed down to a custom link component, if one is provided.  */
    onClick?(e: MouseEvent): void;
    /** Standard onmouseenter event */
    onMouseEnter?: (e: MouseEvent) => void;
    /** Standard onmouseleave event */
    onMouseLeave?: (e: MouseEvent) => void;
    /** Text to be shown alongside the main `text`. */
    subText?: React.ReactNode;
    /** Main text to be displayed as the item. Accepts a react component but in most cases this should just be a string. */
    text?: React.ReactNode;
    /** React component to be placed to the right of the main text. */
    textAfter?: React.ReactNode;
    /** React component to be placed to the right of the main text when the item is selected with keyboard navigation. */
    selectedIcon?: React.ReactNode;
    /** React component to be used for rendering links */
    linkComponent?: React.ComponentType;
};
declare class ResultItem extends React.PureComponent<Props> {
    static defaultProps: Partial<Props>;
    render(): JSX.Element;
}
export default ResultItem;
