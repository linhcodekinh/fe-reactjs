import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.scss';

class Header extends Component {

    constructor(props) {
        super(props);
    } 

    render() {
        return (
            <>
                <header id="header" className="header d-flex align-items-center fixed-top">
                    <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
                        <a href="index.html" className="logo d-flex align-items-center">
                            <h1 className="d-flex align-items-center">Nova</h1>
                        </a>

                        <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
                        <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>

                        <nav id="navbar" className="navbar">
                            <ul>
                                <li><a className="active " href="index.html">Trang chủ</a></li>
                                <li><a href="about.html">Thi Thử Ngay</a></li>
                                <li className="dropdown"><a href="#"><span>Luyện Tập Từng Phần</span> <i className="bi bi-chevron-down "></i></a>
                                    <ul>
                                        <li><a href="#">Drop Down 1</a></li>
                                        <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                                            <ul>
                                                <li><a href="#">Deep Drop Down 1</a></li>
                                                <li><a href="#">Deep Drop Down 2</a></li>
                                                <li><a href="#">Deep Drop Down 3</a></li>
                                                <li><a href="#">Deep Drop Down 4</a></li>
                                                <li><a href="#">Deep Drop Down 5</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#">Drop Down 2</a></li>
                                        <li><a href="#">Drop Down 3</a></li>
                                        <li><a href="#">Drop Down 4</a></li>
                                    </ul>
                                </li>
                                <li><a href="portfolio.html">Ngữ Pháp</a></li>
                                <li><a href="team.html">Từ Vựng</a></li>
                                <li><a href="login.html">Đăng Nhập</a></li>
                                <li><a href="contact.html">VI | EN</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
