export { WithProviders } from './withProviders';
var ProviderFactory = /** @class */ (function () {
    function ProviderFactory() {
        this.providers = new Map();
        this.subscribers = new Map();
    }
    ProviderFactory.create = function (providers) {
        var providerFactory = new ProviderFactory();
        Object.keys(providers).forEach(function (name) {
            providerFactory.setProvider(name, providers[name]);
        });
        return providerFactory;
    };
    ProviderFactory.prototype.destroy = function () {
        this.providers.clear();
        this.subscribers.clear();
    };
    ProviderFactory.prototype.isEmpty = function () {
        return !this.providers.size && !this.subscribers.size;
    };
    ProviderFactory.prototype.setProvider = function (name, provider) {
        // Do not trigger notifyUpdate if provider is the same.
        if (this.providers.get(name) === provider) {
            return;
        }
        if (provider) {
            this.providers.set(name, provider);
        }
        else {
            this.providers.delete(name);
        }
        this.notifyUpdated(name, provider);
    };
    ProviderFactory.prototype.removeProvider = function (name) {
        this.providers.delete(name);
        this.notifyUpdated(name);
    };
    ProviderFactory.prototype.subscribe = function (name, handler) {
        var handlers = this.subscribers.get(name) || [];
        handlers.push(handler);
        this.subscribers.set(name, handlers);
        var provider = this.providers.get(name);
        if (provider) {
            handler(name, provider);
        }
    };
    ProviderFactory.prototype.unsubscribe = function (name, handler) {
        var handlers = this.subscribers.get(name);
        if (!handlers) {
            return;
        }
        var index = handlers.indexOf(handler);
        if (index !== -1) {
            handlers.splice(index, 1);
        }
        if (handlers.length === 0) {
            this.subscribers.delete(name);
        }
        else {
            this.subscribers.set(name, handlers);
        }
    };
    ProviderFactory.prototype.unsubscribeAll = function (name) {
        var handlers = this.subscribers.get(name);
        if (!handlers) {
            return;
        }
        this.subscribers.delete(name);
    };
    ProviderFactory.prototype.hasProvider = function (name) {
        return this.providers.has(name);
    };
    ProviderFactory.prototype.notifyUpdated = function (name, provider) {
        var handlers = this.subscribers.get(name);
        if (!handlers) {
            return;
        }
        handlers.forEach(function (handler) {
            handler(name, provider);
        });
    };
    return ProviderFactory;
}());
export default ProviderFactory;
//# sourceMappingURL=index.js.map