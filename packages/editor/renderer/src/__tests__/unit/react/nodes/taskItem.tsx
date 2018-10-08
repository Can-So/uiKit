import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { ResourcedTaskItem as AkTaskItem } from '@atlaskit/task-decision';
import FabricAnalyticsListener from '@atlaskit/analytics-listeners';
import TaskItem from '../../../../react/nodes/taskItem';

describe('Renderer - React/Nodes/TaskItem', () => {
  let analyticsWebClientMock;

  beforeEach(() => {
    analyticsWebClientMock = {
      sendUIEvent: jest.fn(),
      sendOperationalEvent: jest.fn(),
      sendTrackEvent: jest.fn(),
      sendScreenEvent: jest.fn(),
    };
  });

  it('should wrap content with <AkTaskItem>-tag', () => {
    const text = 'This is a task item';
    const taskItem = mount(<TaskItem localId="task-1">{text}</TaskItem>);
    expect(taskItem.find(AkTaskItem).length).toEqual(1);
    taskItem.unmount();
  });

  it('should not render if no children', () => {
    const taskItem = shallow(<TaskItem localId="task-2" />);
    expect(taskItem.isEmptyRender()).toEqual(true);
  });

  describe('analytics', () => {
    it('check action fires an event', () => {
      const component = mount(
        <FabricAnalyticsListener client={analyticsWebClientMock}>
          <TaskItem localId="task-1">
            Hello <b>world</b>
          </TaskItem>
        </FabricAnalyticsListener>,
      );
      component.find('input').simulate('change');
      expect(analyticsWebClientMock.sendUIEvent).toHaveBeenCalledTimes(1);
      expect(analyticsWebClientMock.sendUIEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'checked',
          actionSubject: 'action',
          attributes: {
            localId: 'task-1',
            objectAri: '',
            containerAri: '',
            userContext: 'document',
          },
        }),
      );
    });

    it('uncheck action fires an event', () => {
      const component = mount(
        <FabricAnalyticsListener client={analyticsWebClientMock}>
          <TaskItem localId="task-1" state="DONE">
            Hello <b>world</b>
          </TaskItem>
        </FabricAnalyticsListener>,
      );
      component.find('input').simulate('change');
      expect(analyticsWebClientMock.sendUIEvent).toHaveBeenCalledTimes(1);
      expect(analyticsWebClientMock.sendUIEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'unchecked',
          actionSubject: 'action',
          attributes: {
            localId: 'task-1',
            objectAri: '',
            containerAri: '',
            userContext: 'document',
          },
        }),
      );
    });
  });
});
