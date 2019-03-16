import { ComponentClass, StatelessComponent } from 'react';
export declare type SimpleEventHandler = () => void;
export interface WithOutsideClickProps {
    handleClickOutside?: SimpleEventHandler;
    handleEscapeKeydown?: SimpleEventHandler;
}
export default function withOuterListeners<P>(Component: ComponentClass<P> | StatelessComponent<P>): ComponentClass<P & WithOutsideClickProps>;
