import React from 'react';

import { render } from 'react-dom';
import App from './app';
import { Provider } from 'react-redux';
import createStore from 'store/createStore';
import { AppContainer } from 'react-hot-loader';
import { setConfig } from 'react-hot-loader';


setConfig({
    showReactDomPatchNotification: false
});

const store = createStore();
//добавили тип React.ComponentType<any>
const renderApp = (Component: React.ComponentType<any>) => {
    render(
        <Provider store={store}>
            <AppContainer>
                <Component store={store} />
            </AppContainer>
        </Provider>,
        document.getElementById('app')
    );
};

renderApp(App);

const m = module as any;
if (m.hot) {
    const newApp = require('./app').default;
    m.hot.accept('./app', () => renderApp(newApp));
}