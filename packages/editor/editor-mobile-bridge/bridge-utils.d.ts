interface QueryParams {
    mode?: 'dark' | 'light';
}
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
export declare const sendToBridge: (bridgeName: any, eventName: any, props?: {}) => void;
export declare const parseLocationSearch: () => QueryParams;
export {};
