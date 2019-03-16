import { RendererBridges, RendererPluginBridges } from './bridge';
declare class WebRendererBridge {
    call<T extends RendererPluginBridges>(bridge: T, event: keyof Exclude<RendererBridges[T], undefined>, ...args: any[]): void;
}
export declare const toNativeBridge: WebRendererBridge;
export {};
