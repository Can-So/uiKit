import { sendToBridge } from './bridge-utils';

export interface ErrorBridge {
  sendError(
    message: string,
    source: string,
    line: number,
    col: number,
    stackTrace: string[],
  );
}

export interface RuntimeBridges {
  errorBridge?: ErrorBridge;
}

export class RuntimeBridgeImpl implements RuntimeBridges {
  errorBridge?: ErrorBridge;

  call<T extends keyof RuntimeBridges>(
    bridge: T,
    event: keyof Exclude<RuntimeBridges[T], undefined>,
    ...args
  ) {
    sendToBridge(bridge, event, ...args);
  }
}

export const toNativeBridge = new RuntimeBridgeImpl();

export function errorReporter(event: ErrorEvent) {
  const { message, filename: source, lineno: line, colno: col, error } = event;

  toNativeBridge.call('errorBridge', 'sendError', {
    message,
    source,
    line,
    col,
    stackTrace:
      (error &&
        error.stack &&
        error.stack.split('\n').map(trace => trace.trim())) ||
      [],
  });
}

window.addEventListener('error', errorReporter);
