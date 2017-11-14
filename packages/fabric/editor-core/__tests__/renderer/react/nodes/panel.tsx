import * as React from 'react';
import { shallow } from 'enzyme';
import Panel from '../../../../src/renderer/react/nodes/panel';

describe('Renderer - React/Nodes/Panel', () => {
  describe('info', () => {
    const infoPanel = shallow(<Panel panelType="info">This is a info panel</Panel>);

    it('should wrap content with <div>-tag', () => {
      expect(infoPanel.name()).toEqual('styled.div');
    });

    it('should have two children', () => {
      expect(infoPanel.children().length).toBe(2);
    });
  });

  describe('note', () => {
    const notePanel = shallow(<Panel panelType="note">This is a note panel</Panel>);

    it('should wrap content with <div>-tag', () => {
      expect(notePanel.name()).toEqual('styled.div');
    });

    it('should have two children', () => {
      expect(notePanel.children().length).toBe(2);
    });
  });

  describe('tip', () => {
    const tipPanel = shallow(<Panel panelType="tip">This is a tip panel</Panel>);

    it('should wrap content with <div>-tag', () => {
      expect(tipPanel.name()).toEqual('styled.div');
    });

    it('should have two children', () => {
      expect(tipPanel.children().length).toBe(2);
    });
  });

  describe('warning', () => {
    const warningPanel = shallow(<Panel panelType="warning">This is a warning panel</Panel>);

    it('should wrap content with <div>-tag', () => {
      expect(warningPanel.name()).toEqual('styled.div');
    });

    it('should have two children', () => {
      expect(warningPanel.children().length).toBe(2);
    });
  });
});
