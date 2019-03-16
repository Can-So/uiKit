export function auth(startUrl) {
    return new Promise(function (resolve, reject) {
        var authWindow = null;
        var authWindowInterval;
        var handleAuthWindowMessage = function (event) {
            if (event.source !== authWindow) {
                return;
            }
            var data = event.data;
            if (typeof data !== 'object') {
                return;
            }
            switch (data.type) {
                case 'outbound-auth:success':
                    finish();
                    resolve();
                    break;
                case 'outbound-auth:failure':
                    finish();
                    reject(new Error(data.message));
                    break;
            }
        };
        var handleAuthWindowInterval = function () {
            if (authWindow && authWindow.closed) {
                finish();
                reject(new Error('The auth window was closed'));
            }
        };
        var start = function () {
            window.addEventListener('message', handleAuthWindowMessage);
            authWindow = window.open(startUrl, startUrl);
            authWindowInterval = window.setInterval(handleAuthWindowInterval, 500);
        };
        var finish = function () {
            clearInterval(authWindowInterval);
            window.removeEventListener('message', handleAuthWindowMessage);
            if (authWindow) {
                authWindow.close();
                authWindow = null;
            }
        };
        start();
    });
}
//# sourceMappingURL=index.js.map