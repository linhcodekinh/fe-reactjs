import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import UserManage from '../../containers/admin/system/UserManage';
import ProductManage from '../../containers/admin/system/ProductManage';
import RegisterPackageGroupOrAcc from '../../containers/admin/system/RegisterPackageGroupOrAcc';
import { path } from '../../utils'
import Home from '../../containers/admin/Home';

class Admin extends Component {

    render() {
        const { isLoggedIn, adminHomePath } = this.props;
        if(isLoggedIn && isLoggedIn === true) {
            return (
                <Redirect to='/login' />
            );
        } else {
            return (
                <Switch>
                    <Route path="/admin" component={Home} />
                    <Route path="/admin/product-manage" component={ProductManage} />
                    <Route path="/admin/user-manage" component={UserManage} />
                    <Route path="/admin/register-package-group-or-account" component={RegisterPackageGroupOrAcc} />
                    <Route component={() => { return (<Redirect to={adminHomePath} />) }} />
                </Switch>
            );
        }
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        adminHomePath: state.app.adminHomePath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
