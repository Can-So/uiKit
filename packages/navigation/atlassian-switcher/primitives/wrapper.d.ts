import * as React from 'react';
declare const ErrorBoundaryWrapper: import("styled-components").StyledComponentClass<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
declare type SwitcherWrapperProps = {
    children: React.ReactNode;
    onRender?: () => void;
};
declare class SwitcherWrapper extends React.Component<SwitcherWrapperProps> {
    render(): JSX.Element;
}
export { ErrorBoundaryWrapper };
export default SwitcherWrapper;
