import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './scss/Header.scss';

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
                                <li><Link to="/test">Thi Thử Ngay</Link></li>
                                <li className="dropdown"><a href="#"><span>Luyện Tập Từng Phần</span> <i className="bi bi-chevron-down "></i></a>
                                    <ul>
                                        <li><Link to="/part1">Part 1</Link></li>
                                        <li><Link to="/part2">Part 2</Link></li>
                                        <li><Link to="/part3">Part 3</Link></li>
                                        <li><Link to="/part4">Part 4</Link></li>
                                        <li><Link to="/part5">Part 5</Link></li>
                                        <li><Link to="/part6">Part 6</Link></li>
                                        <li><Link to="/part7">Part 7</Link></li>
                                        {/* <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                                            <ul>
                                                <li><a href="#">Deep Drop Down 1</a></li>
                                                <li><a href="#">Deep Drop Down 2</a></li>
                                                <li><a href="#">Deep Drop Down 3</a></li>
                                                <li><a href="#">Deep Drop Down 4</a></li>
                                                <li><a href="#">Deep Drop Down 5</a></li>
                                            </ul>
                                        </li> */}
                                    </ul>
                                </li>
                                <li><a href="portfolio.html">Ngữ Pháp</a></li>
                                <li><a href="team.html">Từ Vựng</a></li>
                                {/* <li><a href="login.html">Đăng Nhập</a></li> */}
                                <li> <Link to='/login' >Đăng Nhập</Link></li>
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
