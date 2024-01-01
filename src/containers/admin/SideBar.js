import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { changeUserView } from '../../store/actions/userActions';

class SideBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isExpand: false
        }
    }

    componentDidMount = () => {
    }
    
    handleExpand = () => {
        this.setState({
            isExpand: !this.state.isExpand
        })
    }

    changeUserView = (view) => {
        console.log("changeView ", view)
        this.props.changeUserView(view)
    }

    render() {
        return (
            <>
                <ul
                    className={"navbar-nav bg-gradient-primary sidebar sidebar-dark accordion " + (this.state.isExpand ? "toggled" : "")}
                    id="accordionSidebar"
                >
                    {/* Sidebar - Brand */}
                    <Link to={{ pathname: '/admin' }}
                        className="sidebar-brand d-flex align-items-center justify-content-center"
                    >
                        <div className="sidebar-brand-icon rotate-n-15">
                            <FontAwesomeIcon icon={['fas','fa-laugh-wink']}/>
                        </div>
                        <div className="sidebar-brand-text mx-3">
                            SB Admin <sup>2</sup>
                        </div>
                    </Link>
                    {/* Divider */}
                    <hr className="sidebar-divider my-0" />
                    {/* Nav Item - Dashboard */}
                    <li className="nav-item active">
                        <a className="nav-link" href="index.html">
                            <FontAwesomeIcon icon={['fas','fa-tachometer-alt']}/>
                            <span> Dashboard</span>
                        </a>
                    </li>
                    {/*  Divider */}
                    <hr className="sidebar-divider" />

                    {/*  Heading */}
                    <div className="sidebar-heading">
                        Interface
                    </div>

                    {/*  Nav Item - Pages Collapse Menu */}


                    {/*Bootstrap 5 (update 2020) jQuery is no longer required so Bootstrap 5 is easier to use in React. 
             Use the new namespaced data-bs- attributes as explained here or, with React's useEffect useState hooks as explained in this answer.*/}

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                            aria-expanded="true" aria-controls="collapseTwo">
                            <FontAwesomeIcon icon={['fas','cog']}/>
                            <span> Components</span>
                        </a>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Custom Components:</h6>
                                <Link onClick={()=>this.changeUserView('view')} to={{ pathname: '/admin/user-manage'}} className="collapse-item">
                                    <span>User</span>
                                </Link>
                                {/* <a className="collapse-item" href="buttons.html"></a> */}
                                <a className="collapse-item" href="cards.html">Cards</a>
                            </div>
                        </div>
                    </li>
                    {/* Nav Item - Utilities Collapse Menu */}
                    <li className="nav-item">
                        <a
                            className="nav-link collapsed"
                            href="#"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseUtilities"
                            aria-expanded="true"
                            aria-controls="collapseUtilities"
                        >
                            {/* <i className="fas fa-fw fa-wrench" /> */}
                            <FontAwesomeIcon icon={['fas','wrench']}/>
                            <span> Utilities</span>
                        </a>
                        <div
                            id="collapseUtilities"
                            className="collapse"
                            aria-labelledby="headingUtilities"
                            data-bs-parent="#accordionSidebar"
                        >
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Custom Utilities:</h6>
                                <a className="collapse-item" href="utilities-color.html">
                                    Colors
                                </a>
                                <a className="collapse-item" href="utilities-border.html">
                                    Borders
                                </a>
                                <a className="collapse-item" href="utilities-animation.html">
                                    Animations
                                </a>
                                <a className="collapse-item" href="utilities-other.html">
                                    Other
                                </a>
                            </div>
                        </div>
                    </li>
                    {/* Divider */}
                    <hr className="sidebar-divider" />
                    {/* Heading */}
                    <div className="sidebar-heading">Addons</div>
                    {/* Nav Item - Pages Collapse Menu */}
                    <li className="nav-item">
                        <a
                            className="nav-link collapsed"
                            href="#"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapsePages"
                            aria-expanded="true"
                            aria-controls="collapsePages"
                        >
                            <i className="fas fa-fw fa-folder" />
                            <span>Pages</span>
                        </a>
                        <div
                            id="collapsePages"
                            className="collapse"
                            aria-labelledby="headingPages"
                            data-bs-parent="#accordionSidebar"
                        >
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Login Screens:</h6>
                                <a className="collapse-item" href="login.html">
                                    Login
                                </a>
                                <a className="collapse-item" href="register.html">
                                    Register
                                </a>
                                <a className="collapse-item" href="forgot-password.html">
                                    Forgot Password
                                </a>
                                <div className="collapse-divider" />
                                <h6 className="collapse-header">Other Pages:</h6>
                                <a className="collapse-item" href="404.html">
                                    404 Page
                                </a>
                                <a className="collapse-item" href="blank.html">
                                    Blank Page
                                </a>
                            </div>
                        </div>
                    </li>
                    {/* Nav Item - Charts */}
                    <li className="nav-item">
                        <a className="nav-link" href="charts.html">
                            <i className="fas fa-fw fa-chart-area" />
                            <span>Charts</span>
                        </a>
                    </li>
                    {/* Nav Item - Tables */}
                    <li className="nav-item">
                        <a className="nav-link" href="tables.html">
                            <i className="fas fa-fw fa-table" />
                            <span>Tables</span>
                        </a>
                    </li>
                    {/* Divider */}
                    <hr className="sidebar-divider d-none d-md-block" />
                    {/* Sidebar Toggler (Sidebar) */}
                    <div className="text-center d-none d-md-inline" onClick={() => { this.handleExpand() }} >
                        <button className="rounded-circle border-0" id="sidebarToggle" />
                    </div>
                    {/* Sidebar Message */}
                    <div className="sidebar-card d-none d-lg-flex">
                        <img
                            className="sidebar-card-illustration mb-2"
                            src="img/undraw_rocket.svg"
                            alt="..."
                        />
                        <p className="text-center mb-2">
                            <strong>SB Admin Pro</strong> is packed with premium features,
                            components, and more!
                        </p>
                        <a
                            className="btn btn-success btn-sm"
                            href="https://startbootstrap.com/theme/sb-admin-pro"
                        >
                            Upgrade to Pro!
                        </a>
                    </div>
                </ul>
            </>
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
        changeUserView: (view) => dispatch(changeUserView(view))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
