import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Slider.scss'

class Slider extends Component {

    render() {
        return (
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

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
