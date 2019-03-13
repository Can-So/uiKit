import { RendererBridges, RendererPluginBridges } from './bridge';
import { sendToBridge } from '../../bridge-utils';

class WebRendererBridge {
  call<T extends RendererPluginBridges>(
    bridge: T,
    event: keyof Exclude<RendererBridges[T], undefined>,
    ...args: any[]
  ) {
    sendToBridge(bridge, event, ...args);
  }
}

export const toNativeBridge = new WebRendererBridge();
