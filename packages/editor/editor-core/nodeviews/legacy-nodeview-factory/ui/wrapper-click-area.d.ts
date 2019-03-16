import { ComponentClass, StatelessComponent } from 'react';
import { ReactComponentConstructor } from '../../types';
export interface ReactNodeViewComponents {
    [key: string]: ComponentClass<any> | StatelessComponent<any>;
}
export default function wrapComponentWithClickArea(ReactComponent: ReactComponentConstructor, inline?: boolean): ReactComponentConstructor;
