import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { TaskList as AkTaskList } from '@atlaskit/task-decision';
import FabricAnalyticsListener from '@atlaskit/analytics-listeners';
import TaskList from '../../../../react/nodes/taskList';
import TaskItem from '../../../../react/nodes/taskItem';

describe('Renderer - React/Nodes/TaskList', () => {
  let analyticsWebClientMock;

  beforeEach(() => {
    analyticsWebClientMock = {
      sendUIEvent: jest.fn(),
      sendOperationalEvent: jest.fn(),
      sendTrackEvent: jest.fn(),
      sendScreenEvent: jest.fn(),
    };
  });

  it('should wrap content with <AkTaskList>-tag with start prop', () => {
    const text: any = 'This is a task list';
    const taskListWrapper = shallow(<TaskList>{text}</TaskList>);
    const taskList = taskListWrapper.childAt(0);
    expect(taskListWrapper.is('div')).toEqual(true);
    expect(taskList.is(AkTaskList)).toEqual(true);
  });

  it('should not render if no children', () => {
    const taskList = shallow(<TaskList />);
    expect(taskList.isEmptyRender()).toEqual(true);
  });

  describe('analytics', () => {
    it('check action fires an event', () => {
      const component = mount(
        <FabricAnalyticsListener client={analyticsWebClientMock}>
          <TaskList localId="list-1">
            <TaskItem localId="task-1">
              Hello <b>world</b>
            </TaskItem>
          </TaskList>
        </FabricAnalyticsListener>,
      );
      component.find('input').simulate('change');
      expect(analyticsWebClientMock.sendUIEvent).toHaveBeenCalledTimes(1);
      expect(analyticsWebClientMock.sendUIEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'checked',
          actionSubject: 'action',
          attributes: {
            listLocalId: 'list-1',
            localId: 'task-1',
            objectAri: '',
            containerAri: '',
            userContext: 'document',
            listSize: 1,
            position: 0,
          },
        }),
      );
    });

    it('uncheck action fires an event', () => {
      const component = mount(
        <FabricAnalyticsListener client={analyticsWebClientMock}>
          <TaskList localId="list-1">
            <TaskItem localId="task-1">
              Hello <b>world</b>
            </TaskItem>
            <TaskItem localId="task-2" state="DONE">
              Goodbye <b>world</b>
            </TaskItem>
          </TaskList>
        </FabricAnalyticsListener>,
      );
      component
        .find('input')
        .at(1)
        .simulate('change');
      expect(analyticsWebClientMock.sendUIEvent).toHaveBeenCalledTimes(1);
      expect(analyticsWebClientMock.sendUIEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'unchecked',
          actionSubject: 'action',
          attributes: {
            listLocalId: 'list-1',
            localId: 'task-2',
            objectAri: '',
            containerAri: '',
            userContext: 'document',
            listSize: 2,
            position: 1,
          },
        }),
      );
    });
  });
});
