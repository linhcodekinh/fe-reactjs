import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class HomeHeader extends Component {

    constructor(props) {
        super(props);
    }
    
    componentDidMount = () => {
        const selectHeader = document.querySelector('#header');
        if (selectHeader) {
            document.addEventListener('scroll', () => {
            window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
            });
            alert("vao day: ",  window.scrollY)
        }
    }

    /**
     * Sticky header on scroll
     */
    
  

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
                            <li><a href="services.html">Đề Thi Toeic</a></li> 
                                <li><a href="portfolio.html">Ngữ Pháp</a></li>
                                <li><a href="team.html">Từ Vựng</a></li>
                                <li><a href="news.html">Tin Tức</a></li> 
                                <li><a href="login.html">Đăng Nhập</a></li>
                                <li><a href="contact.html">VI | EN</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>

                <section id="hero" className="hero d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4">
                                <h2 data-aos="fade-up">Thi thử TOEIC online 2023 miễn phí</h2>
                                <blockquote data-aos="fade-up" data-aos-delay="100">
                                    <p>Chào mừng đến với LIMA TOEIC Test Pro, trang web/ ứng dụng TOEIC miễn phí cung cấp cho người học các bài luyện tập theo từng part, đề thi thử cũng như các bài tập về từ vựng và ngữ pháp. Bắt đầu hành trình chinh phục chứng chỉ
                                        TOEIC với các bài luyện tập trên trang web/ứng dụng của chúng tôi ngay hôm nay! </p>
                                </blockquote>
                                <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
                                    <a href="#about" className="btn-get-started">Thi Thử Ngay</a>
                                    <a href="https://www.youtube.com/watch?v=LXb3EKWsInQ" className="glightbox btn-watch-video d-flex align-items-center"><i className="bi bi-play-circle"></i><span>Watch Video</span></a>
                                </div>

                            </div>
                        </div>
                    </div>
                </section> 
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
