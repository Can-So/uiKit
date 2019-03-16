import { EditorPlugin } from '../../types';
export interface StatusOptions {
    menuDisabled: boolean;
}
declare const statusPlugin: (options: StatusOptions) => EditorPlugin;
export default statusPlugin;
