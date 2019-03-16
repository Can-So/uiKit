import { createStore as createReduxStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';
export default function createStore(initialState) {
    return createReduxStore(reducers, initialState, applyMiddleware(thunk));
}
//# sourceMappingURL=store.js.map