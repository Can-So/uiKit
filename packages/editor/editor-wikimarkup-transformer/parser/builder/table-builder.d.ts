import { Node as PMNode, Schema } from 'prosemirror-model';
import { AddCellArgs, Builder } from '../../interfaces';
export declare class TableBuilder implements Builder {
    private schema;
    private root;
    private lastRow;
    constructor(schema: Schema);
    /**
     * Return the type of the base element
     * @returns {string}
     */
    readonly type: string;
    /**
     * Add new cells to the table
     * @param {AddCellArgs[]} cells
     */
    add(cells: AddCellArgs[]): void;
    /**
     * Build a prosemirror table from the data
     * @returns {PMNode}
     */
    buildPMNode(): PMNode;
    private emptyTableCell;
    private emptyTableRow;
    /**
     * Build prosemirror table node
     * @returns {PMNode}
     */
    private buildTableNode;
    /**
     * Build prosemirror tr node
     * @returns {PMNode}
     */
    private buildTableRowNode;
    /**
     * Build prosemirror td/th node
     * @param {TableCell} cell
     * @returns {PMNode}
     */
    private buildTableCellNode;
    /**
     * Add a new row to the table
     */
    private addRow;
}
