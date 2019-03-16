import { TaskState } from '@atlaskit/task-decision';
import RendererBridge from './bridge';
import WebBridge from '../../web-bridge';
import { TaskDecisionProviderImpl } from '../../providers/taskDecisionProvider';
export default class RendererBridgeImpl extends WebBridge implements RendererBridge {
    taskDecisionProvider: TaskDecisionProviderImpl;
    containerAri: string;
    objectAri: string;
    /** Renderer bridge MVP to set the content */
    setContent(content: string): void;
    onPromiseResolved(uuid: string, payload: string): void;
    onPromiseRejected(uuid: string): void;
    onTaskUpdated(taskId: string, state: TaskState): void;
    getRootElement(): HTMLElement | null;
}
