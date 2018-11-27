import { TaskState } from '@atlaskit/task-decision';

export interface TaskDecisionBridge {
  updateTask(taskId: string, state: TaskState);
}

export interface LinkBridge {
  onLinkClick(url: string);
}

export default interface WebBridge extends LinkBridge, TaskDecisionBridge {}

export interface RendererBridges {
  linkBridge?: LinkBridge;
  taskDecisionBridge?: TaskDecisionBridge;
}

export type RendererPluginBridges = keyof RendererBridges;

declare global {
  interface Window extends RendererBridges {
    webkit?: any;
  }
}
