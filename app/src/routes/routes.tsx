import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Location } from 'history';

import NotFoundPage from 'pages/notFoundPage';
import PassesListPage from 'src/pages/users/usersPage';

interface Props {
    location: Location;
    children?: any;
}

class Routes extends Component<Props, any> {
    render() {
        const { location, children } = this.props;
        return (
            <Switch location={location}>
                <Route component={PassesListPage} exact path="/" />
                <Route path="*" component={NotFoundPage} />
            </Switch>
        );
    }
}

export default Routes;
