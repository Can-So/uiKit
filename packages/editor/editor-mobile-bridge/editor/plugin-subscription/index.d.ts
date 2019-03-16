import { EditorView } from 'prosemirror-view';
import { EventDispatcher } from '@findable/editor-core';
import WebBridgeImpl from '../native-to-web';
export declare const initPluginListeners: (eventDispatcher: EventDispatcher<any>, bridge: WebBridgeImpl, view: EditorView<any>) => void;
export declare const destroyPluginListeners: (eventDispatcher: EventDispatcher<any>, bridge: WebBridgeImpl) => void;
