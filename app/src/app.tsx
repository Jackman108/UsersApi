import * as React from 'react';
import { Store } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from 'pages/main';

interface Props {
    store: Store;
}

const App = ({ store }: Props) => {
    return (
        <React.Fragment>
            <Router>
                <Main />
            </Router>
        </React.Fragment>
    );
};


export default App;
