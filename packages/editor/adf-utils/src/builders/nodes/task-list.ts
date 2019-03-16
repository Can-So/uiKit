import { TaskListDefinition, TaskItemDefinition } from '@findable/adf-schema';

export const taskList = (attrs: TaskListDefinition['attrs']) => (
  ...content: Array<TaskItemDefinition>
): TaskListDefinition => ({
  type: 'taskList',
  attrs,
  content,
});
