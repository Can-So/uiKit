import * as React from 'react';
declare type Props = {
    /** Text to appear as heading above group. Will be auto-capitalised. */
    title: React.ReactNode;
    /** React Elements to be displayed within the group. This should generally be a collection of ResultItems. */
    children?: React.ReactNode;
};
export default class ResultItemGroup extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
