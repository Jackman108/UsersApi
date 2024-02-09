import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import UserListPage from './userListPage';

interface RouterParams {
    id: string;
}

interface Props extends RouteComponentProps<RouterParams> { }

const UsersPage = ({ match, history }: Props) => {
    return <UserListPage/>;
};

export default withRouter(UsersPage);
