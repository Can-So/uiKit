import { default as ServiceProvider } from './service-provider';
export { ServiceProvider };
export var getProvider = function (_a) {
    var provider = _a.provider, url = _a.url;
    if (provider) {
        return provider;
    }
    if (url) {
        return new ServiceProvider({ url: url });
    }
    throw new Error('Missing provider');
};
//# sourceMappingURL=index.js.map