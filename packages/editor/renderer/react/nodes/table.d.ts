import { ReactNode } from 'react';
import { TableLayout } from '@atlaskit/adf-schema';
import { RendererAppearance } from '../../ui/Renderer';
export interface TableProps {
    columnWidths?: Array<number>;
    layout: TableLayout;
    isNumberColumnEnabled: boolean;
    children: ReactNode;
    renderWidth: number;
    rendererAppearance?: RendererAppearance;
}
declare const TableWithWidth: (props: TableProps) => JSX.Element;
export default TableWithWidth;
