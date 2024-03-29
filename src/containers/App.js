import React, { Component, Fragment, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
// import { history } from '../redux'
import history from '../routes/history.js'
import { ToastContainer } from 'react-toastify';

import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path, ToastUtil } from '../utils'
// import the library
import { library } from '@fortawesome/fontawesome-svg-core'
// import your icons
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';

const Admin = lazy(() => import('../routes/admin/Admin'));
const Login = lazy(() => import('./auth/Login'));
const System = lazy(() => import('../routes/admin/System'));
const User = lazy(() => import('./admin/dispatch/User'));
//import Admin from '../routes/admin/Admin';
// import Login from './auth/Login';
// import Header from './admin/header/Header';
// import System from '../routes/admin/System';
// import User from './admin/dispatch/User';

const Home = lazy(() => import('./client/Home'));
const Part = lazy(() => import('./client/Part'));
const Test = lazy(() => import('./client/dispatch/Test'));

// import Home from './client/Home';
// import Part from './client/Part';
// import Test from './client/dispatch/Test.js';


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
            const scrollTop = window.scrollY
            scrollTop >= 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked')
        }
    }

    componentDidMount() {
        this.handlePersistorState();
        window.addEventListener('scroll', this.sticky, true);
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.sticky, true)
    }

    render() {
        return (
            <Fragment>
                <Suspense fallback={<div>Loading...</div>}>
                    <Router history={history}>
                        <div className="main-container">
                            <ConfirmModal />
                            {/* { <Header />} */}
                            <div className="content-container">
                                <Switch>
                                    {/* <Route path={path.LOG_IN} component={userIsNotAuthenticated(Login)} /> */}
                                    <Route path={path.LOG_IN} component={(Login)} />

                                    <Route path={path.admin.ADMIN} exact component={(Admin)} />
                                    <Route path={path.admin.SYSTEM} component={(System)} />
                                    <Route path={path.admin.USER} exact component={(User)} />

                                    <Route path={path.client.HOME} exact component={(Home)} />
                                    <Route path={path.client.PART} exact component={(Part)} />
                                    <Route path={path.client.TEST} exact component={(Test)} />
                                </Switch>
                            </div>
                            <ToastContainer
                                // className="toast-container" 
                                toastClassName="toast-item"
                                // bodyClassName="toast-item-body"
                                newestOnTop={true}
                                autoClose={true}
                                hideProgressBar={false}
                                pauseOnHover={true}
                                pauseOnFocusLoss={true}
                                closeOnClick={false}
                                draggable={false}
                                theme="light"
                                closeButton={<CustomToastCloseButton />}
                            />

                            {/* <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick={false}
                            rtl={false}
                            pauseOnFocusLoss={false}
                            draggable={false}
                            pauseOnHover={false}
                            theme="light"
                        /> */}

                            {/* toast.success('🦄 Wow so easy!', {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: false,
                            draggable: false,
                            progress: undefined,
                            theme: "light",
                        }); */}
                        </div>
                    </Router>
                </Suspense>
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
library.add(fab, fas, far)