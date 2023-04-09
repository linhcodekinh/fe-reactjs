import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Admin from '../routes/admin/Admin';
import Login from './auth/Login';
import Header from './admin/header/Header';
import System from '../routes/admin/System';

import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';
import Home from './client/Home';
import Part1 from './client/Part1';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    // dau & la khi co ten class y vao thi se hoat dong. VD: .item { &.active } => .item .active

    sticky = () => {
        let selectHeader = document.querySelector('#header')
        if (selectHeader) {
            const scrollTop =  window.scrollY
            scrollTop >= 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked')
        }
    }

    componentDidMount() {
        this.handlePersistorState();
        window.addEventListener('scroll', this.sticky , true);
    }

    componentWillUnmount= () => {
        window.removeEventListener('scroll', this.sticky, true)
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <ConfirmModal />
                        { <Header />}
                        {console.log('this.props.isLoggedIn' ,this.props.isLoggedIn)}
                        <div className="content-container">
                                <Switch>
                                    <Route path={path.LOG_IN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.admin.ADMIN} exact component={(Admin)} />
                                    <Route path={path.admin.SYSTEM} component={(System)} />
                                    <Route path={path.client.HOME} exact component={(Home)} />
                                    <Route path={path.client.PART1} exact component={(Part1)} />
                                    <Route path={path.client.PART2} exact component={(Home)} />
                                    <Route path={path.client.PART3} exact component={(Home)} />
                                    <Route path={path.client.PART4} exact component={(Home)} />
                                    <Route path={path.client.PART5} exact component={(Home)} />
                                    <Route path={path.client.PART6} exact component={(Home)} />
                                    <Route path={path.client.PART7} exact component={(Home)} />
                                </Switch>
                        </div>
                        <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);