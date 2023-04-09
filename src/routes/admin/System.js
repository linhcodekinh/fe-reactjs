import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../../containers/admin/system/UserManage';
import ProductManage from '../../containers/admin/system/ProductManage';
import RegisterPackageGroupOrAcc from '../../containers/admin/system/RegisterPackageGroupOrAcc';
import Home from '../../containers/admin/Home';

class System extends Component {
    render() {
        const { adminHomePath } = this.props;
        console.log("vao system", adminHomePath , this.props)
        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/admin-home" component={Home} />
                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/product-manage" component={ProductManage} />
                        <Route path="/system/register-package-group-or-account" component={RegisterPackageGroupOrAcc} />
                        <Route component={() => { return (<Redirect to={adminHomePath} />) }} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        adminHomePath: state.app.adminHomePath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
