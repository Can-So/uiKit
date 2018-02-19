import * as React from 'react';
import { mount } from 'enzyme';
import TaskList from '../../src/components/TaskList';
import TaskItem from '../../src/components/TaskItem';

describe('<TaskList/>', () => {
  it('should render all TaskItems', () => {
    const component = mount(
      <TaskList>
        <TaskItem taskId="task-1">1</TaskItem>
        <TaskItem taskId="task-2">2</TaskItem>
      </TaskList>,
    );
    expect(component.find('li').length).toEqual(2);
    expect(component.find(TaskItem).length).toEqual(2);
  });
  it('should render single TaskItem', () => {
    const component = mount(
      <TaskList>
        <TaskItem taskId="task-1">1</TaskItem>
      </TaskList>,
    );
    expect(component.find('li').length).toEqual(1);
    expect(component.find(TaskItem).length).toEqual(1);
  });
  it("shouldn't render list when no items", () => {
    const component = mount(<TaskList />);
    expect(component.find('ol').length).toEqual(0);
    expect(component.find('li').length).toEqual(0);
    expect(component.find(TaskItem).length).toEqual(0);
  });
});
