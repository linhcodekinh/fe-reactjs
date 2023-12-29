import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../../containers/admin/system/user/UserManage';
import ProductManage from '../../containers/admin/system/ProductManage';
import RegisterPackageGroupOrAcc from '../../containers/admin/system/RegisterPackageGroupOrAcc';
import Main from '../../containers/admin/Main';

class System extends Component {
    render() {
        const { adminHomePath } = this.props;
        console.log("vao system", adminHomePath , this.props)
        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/admin/home" component={Main} />
                        <Route path="/admin/user-manage" component={UserManage} />
                        <Route path="/admin/product-manage" component={ProductManage} />
                        <Route path="/admin/register-package-group-or-account" component={RegisterPackageGroupOrAcc} />
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
