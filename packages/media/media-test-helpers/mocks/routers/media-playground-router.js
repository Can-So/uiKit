import { Router } from 'kakapo';
import { userAuthProvider } from '../database';
export function createMediaPlaygroundRouter() {
    var router = new Router({
        host: 'https://api-private.dev.atlassian.com',
        requestDelay: 10,
    });
    router.get('/media-playground/api/token/user/impersonation', userAuthProvider);
    return router;
}
//# sourceMappingURL=media-playground-router.js.map