import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { path } from '../../utils'

class Admin extends Component {

    render() {
        const { isLoggedIn } = this.props;
        //let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/login';
        console.log('link ', 'home')
        return (
            <Redirect to='/admin-home' />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
