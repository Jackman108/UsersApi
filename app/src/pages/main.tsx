import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AppState } from 'src/store/typings';
import Routes from 'src/routes/routes';

type Props = {
} & RouteComponentProps<any>;

const mapStateToProps = (state: AppState) => {
    return {

    };
};
const mapDispatchToProps = {

};

const Main = (props: Props) => {
    return <Routes location={props.location} />;
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
