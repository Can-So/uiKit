import { ComponentType } from 'react';
import { Mark } from 'prosemirror-model';
import Code from './code';
import Em from './em';
import Link from './link';
import Strike from './strike';
import Strong from './strong';
import Subsup from './subsup';
import TextColor from './textColor';
import Underline from './underline';
import Action from './action';
import Breakout from './breakout';
import Annotation from './annotation';
export declare const markToReact: {
    [key: string]: ComponentType<any>;
};
export declare const toReact: (mark: Mark<any>) => import("react").ComponentClass<any, any> | import("react").StatelessComponent<any>;
export { Code, Em, Link, Strike, Strong, Subsup, TextColor, Underline, Action, Breakout, Annotation, };
