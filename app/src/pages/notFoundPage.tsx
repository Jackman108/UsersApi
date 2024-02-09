import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Props {}

class NotFoundPage extends React.Component<Props & RouteComponentProps<any>> {
 
    render() {
        return <div>Page not found</div>;
    }
}

const mapStateToProps = (state) => {
    return {
    };
};
const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotFoundPage));
