import { name } from '../../../package.json';
import { mount } from 'enzyme';
import * as React from 'react';
import WithPluginState from '../../../src/editor/ui/WithPluginState';
import { EditorPlugin } from '../../../src/editor/types/editor-plugin';
import {
  EventDispatcher,
  createDispatch,
} from '../../../src/editor/event-dispatcher';
import { createEditor, doc, p } from '@atlaskit/editor-test-helpers';
import { Plugin, PluginKey } from 'prosemirror-state';

describe(name, () => {
  const pluginKey = new PluginKey('plugin');
  const pluginKey2 = new PluginKey('plugin2');

  const setTimeoutPromise = (cb, delay) =>
    new Promise(resolve => setTimeout(() => resolve(cb()), delay));
  const createPlugin = (state, key): EditorPlugin => {
    return {
      pmPlugins() {
        return [
          {
            rank: 1,
            plugin: () =>
              new Plugin({
                key,
                state: {
                  init() {
                    return state;
                  },
                  apply() {
                    return state;
                  },
                },
              }),
          },
        ];
      },
    };
  };

  let eventDispatcher;
  let dispatch;

  beforeEach(() => {
    eventDispatcher = new EventDispatcher();
    dispatch = createDispatch(eventDispatcher);
  });

  describe('WithPluginState', () => {
    it('should call render with current plugin state', () => {
      const pluginState = {};
      const plugin = createPlugin(pluginState, pluginKey);
      const { editorView } = createEditor({
        doc: doc(p()),
        editorPlugins: [plugin],
      });
      const wrapper = mount(
        <WithPluginState
          editorView={editorView}
          eventDispatcher={eventDispatcher}
          plugins={{ currentPluginState: pluginKey }}
          render={({ currentPluginState }) => {
            expect(currentPluginState).toEqual(pluginState);
            return null;
          }}
        />,
      );
      wrapper.unmount();
      editorView.destroy();
    });

    it('should call render once after changes in several plugins', () => {
      let renders = 0;

      const pluginState = {};
      const plugin = createPlugin(pluginState, pluginKey);
      const plugin2 = createPlugin(pluginState, pluginKey2);
      const { editorView } = createEditor({
        doc: doc(p()),
        editorPlugins: [plugin, plugin2],
      });
      const wrapper = mount(
        <WithPluginState
          editorView={editorView}
          eventDispatcher={eventDispatcher}
          plugins={{ pluginState: pluginKey, plugin2State: pluginKey2 }}
          render={({ currentPluginState }) => {
            renders++;
            return null;
          }}
        />,
      );

      return Promise.all([
        setTimeoutPromise(() => dispatch(pluginKey, {}), 0),
        setTimeoutPromise(() => dispatch(pluginKey2, {}), 8),
        setTimeoutPromise(() => dispatch(pluginKey, {}), 5),
        setTimeoutPromise(() => dispatch(pluginKey, {}), 0),
        setTimeoutPromise(() => dispatch(pluginKey2, {}), 8),
        setTimeoutPromise(() => dispatch(pluginKey, {}), 5),
      ])
        .then(() =>
          setTimeoutPromise(() => {
            wrapper.unmount();
            editorView.destroy();
          }, 100),
        )
        .then(() => expect(renders).toBeLessThan(6));
    });
  });

  it('should clean all listeners after unmount', () => {
    const pluginState = {};
    const plugin = createPlugin(pluginState, pluginKey);
    const plugin2 = createPlugin(pluginState, pluginKey2);
    const { editorView } = createEditor({
      doc: doc(p()),
      editorPlugins: [plugin, plugin2],
    });
    const wrapper = mount(
      <WithPluginState
        editorView={editorView}
        eventDispatcher={eventDispatcher}
        plugins={{ pluginState: pluginKey, plugin2State: pluginKey2 }}
        render={() => null}
      />,
    );
    const wpsInstance = (wrapper.find(WithPluginState) as any)
      .first()
      .instance();

    wrapper.unmount();
    editorView.destroy();
    expect(wpsInstance.listeners).toEqual([]);
  });

  it('should support old plugins with subscribe/unsubscribe methods', () => {
    const pluginState = {
      update() {
        this.cb({ a: 1 });
      },

      subscribe(cb) {
        this.cb = cb;
      },
      unsubscribe: jest.fn(),
    };
    const plugin = createPlugin(pluginState, pluginKey);
    const { editorView } = createEditor({
      doc: doc(p()),
      editorPlugins: [plugin],
    });

    const renderMock = jest.fn(() => null);
    const wrapper = mount(
      <WithPluginState
        editorView={editorView}
        eventDispatcher={eventDispatcher}
        plugins={{ pluginState: pluginKey }}
        render={renderMock}
      />,
    );

    return setTimeoutPromise(() => pluginState.update(), 10)
      .then(() => setTimeoutPromise(() => {}, 50))
      .then(() => {
        wrapper.unmount();
        editorView.destroy();
        expect(renderMock).toHaveBeenLastCalledWith({ pluginState: { a: 1 } });
      });
  });

  it('should unsubscribe after unmount for old plugins with subscribe/unsubscribe methods', () => {
    const unsubscribeMock = jest.fn();
    const pluginState = {
      subscribe: () => {},
      unsubscribe: unsubscribeMock,
    };
    const plugin = createPlugin(pluginState, pluginKey);
    const { editorView } = createEditor({
      doc: doc(p()),
      editorPlugins: [plugin],
    });

    const render = jest.fn(() => null);
    const wrapper = mount(
      <WithPluginState
        editorView={editorView}
        eventDispatcher={eventDispatcher}
        plugins={{ pluginState: pluginKey }}
        render={render}
      />,
    );

    wrapper.unmount();
    editorView.destroy();
    expect(unsubscribeMock).toHaveBeenCalledTimes(1);
  });
});
