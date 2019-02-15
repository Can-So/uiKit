import { TaskState } from '@atlaskit/task-decision';

export interface TaskDecisionBridge {
  updateTask(taskId: string, state: TaskState);
}

export interface LinkBridge {
  onLinkClick(url: string);
}

export interface RenderBridge {
  onContentRendered();
}

export default interface WebBridge
  extends LinkBridge,
    TaskDecisionBridge,
    RenderBridge {}

export interface RendererBridges {
  linkBridge?: LinkBridge;
  taskDecisionBridge?: TaskDecisionBridge;
  renderBridge?: RenderBridge;
}

export type RendererPluginBridges = keyof RendererBridges;

declare global {
  interface Window extends RendererBridges {
    webkit?: any;
  }
}
