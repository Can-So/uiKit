/**
 * Send an event to which ever bridge it can find.
 * @param bridgeName
 * @param eventName
 * @param props
 *
 * For this to work on both bridges their interfaces need to match.
 * We have two main identifiers we use, bridgeName and eventName.
 * For iOS this looks like:
 *  window.webkit.messageHandlers.<bridgeName>.postMessage({
 *    name: eventName,
 *    ...<props>
 *  })
 *
 * And for Android:
 * Props object is spread as args.
 *  window.<bridgeName>.<eventName>(...<props>)
 */

export const sendToBridge = (bridgeName, eventName, props = {}) => {
  if (window.webkit && window.webkit.messageHandlers[bridgeName]) {
    window.webkit.messageHandlers[bridgeName].postMessage({
      name: eventName,
      ...props,
    });
  } else if (window[bridgeName]) {
    const args = Object.keys(props).map(key => props[key]);
    const bridge = window[bridgeName];
    if (bridge && bridge.hasOwnProperty(eventName)) {
      bridge[eventName as any](...args);
    }
  }

  let logs = (window as any).logBridge;
  if (logs) {
    const logName = `${bridgeName}:${eventName}`;
    logs[logName] = logs[logName] || [];
    logs[logName] = logs[logName].concat(props);
  }
};
