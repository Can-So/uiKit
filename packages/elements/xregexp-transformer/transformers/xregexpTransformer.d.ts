import * as ts from 'typescript';
export default function xregexpTransformer<T extends ts.Node>(): ts.TransformerFactory<T>;
