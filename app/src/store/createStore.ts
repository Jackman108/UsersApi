import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from './rootReducer';
import config from 'src/config';

const configureStore = () => {
    const middlewares = [thunk];

    const enhancers = [];
    if (config.isDev && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
        const devToolsFunc = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            shouldHotReload: false
        });
        if (devToolsFunc && typeof devToolsFunc === 'function') {
            enhancers.push(devToolsFunc());
        }
    }

    const composedEnhancers = compose(
        applyMiddleware(...middlewares),
        ...enhancers
    );
    const store = createStore(createRootReducer, composedEnhancers);
    const m = module as any;
    if (m.hot) {
        // Enable Webpack hot module replacement for reducers
        m.hot.accept('./rootReducer', () => {
            const reducer = require('./rootReducer').default;
            store.replaceReducer(reducer);
        });
    }
    return store;
};

export default configureStore;
