import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Main.scss'

import backgroundImg1 from '../../../assets/images/bg-01.jpg'
import backgroundImg2 from '../../../assets/images/bg-01.jpg'
import backgroundImg3 from '../../../assets/images/bg-01.jpg'
import backgroundImg4 from '../../../assets/images/bg-01.jpg'
import backgroundImg5 from '../../../assets/images/bg-01.jpg'
import backgroundImg6 from '../../../assets/images/bg-01.jpg'
import backgroundImg7 from '../../../assets/images/bg-01.jpg'

class Main extends Component {

    render() {
        return (
            <section className="features">
            <div className="container">
                <div className="section-header">
                    <h2>NGHE</h2>
                </div>
                <p className="description">Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi
                    quidem hic quas.</p>
                <br/>
                <div className="row" data-aos="fade-up">
                    <div className="col-md-5 img-fluid" style={{backgroundImage: `url(${backgroundImg1})`}}>
                    </div>
                    <div className="col-md-7 pt-4">
                        <h5>Phần 1</h5>
                        <h3>
                            Mô Tả Tranh
                        </h3>
                        <p className="fst-italic">
                            Thí sinh sẽ xem một bức hình → Nghe 4 lựa chọn A, B, C, D → Sau đó chọn một đáp án mô tả chính xác nhất nội dung có trong hình.
                        </p>
                        <ul>
                            <li><i className=" bi bi-check" style={{color: "#5578ff"}}></i>
                                <span> Số câu: 6</span>
                            </li>
                            <li><i className=" bi bi-check" style={{color: "#5578ff"}}></i>
                                <span> Thời gian dừng giữa 2 câu là 5 giây.</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <br/>
                <div className="row" data-aos="fade-up">
                    <div className="col-md-5 order-1 order-md-2 img-fluid" style={{backgroundImage: `url(${backgroundImg2})`}}>
                    </div>
                    <div className="col-md-7 pt-5 order-2 order-md-1">
                        <h5>Phần 2</h5>
                        <h3>
                            Hỏi - Đáp
                        </h3>
                        <p className="fst-italic">
                            Thí sinh sẽ nghe một câu hỏi hoặc một câu nói → Nghe tiếp 3 câu trả lời / hồi đáp lại câu trên (tương ứng với 3 lựa chọn A, B, C) → Sau đó chọn một câu hồi đáp phù hợp nhất cho câu hỏi.
                        </p>
                        <ul>
                            <li><i className=" bi bi-check" style={{color: "#5578ff"}}></i>
                                <span> Số câu: 25</span>
                            </li>
                            <li><i className=" bi bi-check" style={{color: "#5578ff"}}></i>
                                <span> Thời gian dừng giữa 2 câu là 5 giây.</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <br/>
                <div className="row" data-aos="fade-up">
                    <div className="col-md-5 img-fluid" style={{backgroundImage: `url(${backgroundImg3})`}}>
                    </div>
                    <div className="col-md-7 pt-5">
                        <h5>Phần 3</h5>
                        <h3>
                            Đoạn Hội Thoại
                        </h3>
                        <p className="fst-italic">Thí sinh sẽ lắng nghe các đoạn hội thoại ngắn giữa hai người → Với mỗi đoạn sẽ có 3 câu hỏi, mỗi câu hỏi có 4 lựa chọn A, B, C, D. Thí sinh đọc câu hỏi sau đó chọn câu trả lời phù hợp nhất.</p>
                        <ul>
                            <li><i className=" bi bi-check" style={{color: "#5578ff"}}></i>
                                <span> Số câu: 39 (ứng với 13 đoạn hội thoại, mỗi đoạn 3 câu hỏi)</span>
                            </li>
                            <li><i className=" bi bi-check" style={{color: "#5578ff"}}></i>
                                <span> Thời gian dừng giữa mỗi câu hỏi là 8 giây.</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <br/>
                <div className="row" data-aos="fade-up">
                    <div className="col-md-5 order-1 order-md-2 img-fluid" style={{backgroundImage: `url(${backgroundImg4})`}}>
                    </div>
                    <div className="col-md-7 pt-5 order-2 order-md-1">
                        <h5>Phần 4</h5>
                        <h3>Bài Nói Ngắn (độc thoại)</h3>
                        <p className="fst-italic">
                            Thí sinh sẽ lắng nghe các bài nói chuyện ngắn (độc thoại) → Với mỗi đoạn sẽ có 3 câu hỏi, mỗi câu hỏi có 4 lựa chọn A, B, C, D. Thí sinh đọc câu hỏi sau đó chọn câu trả lời phù hợp nhất.
                        </p>
                        <ul>
                            <li><i className=" bi bi-check" style={{color: "#5578ff"}}></i>
                                <span> Số câu: 30 (ứng với 10 bài độc thoại, mỗi đoạn 3 câu hỏi)</span>
                            </li>
                            <li><i className=" bi bi-check" style={{color: "#5578ff"}}></i>
                                <span> Thời gian dừng giữa mỗi câu hỏi là 8 giây.</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
            <br/>
            <div className="container">
                <div className="section-header">
                    <h2>ĐỌC</h2>
                </div>
                <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi
                    quidem hic quas.</p>


                <div className="row" data-aos="fade-up">
                    <div className="col-md-5 img-fluid" style={{backgroundImage: `url(${backgroundImg1})`}}>
                    </div>
                    <div className="col-md-7 pt-4">
                        <h5>Phần 5</h5>
                        <h3>
                            Hoàn thành câu
                        </h3>
                        <p className="fst-italic">
                            Thí sinh sẽ được cho một câu có một chỗ trống → Chọn một đáp án phù hợp nhất để điền vào chỗ trống.
                        </p>
                        <ul>
                            <li><i className=" bi bi-check" style={{color: "#5578ff"}}></i>
                                <span> Số câu: 30</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <br/>
                <div className="row" data-aos="fade-up">
                    <div className="col-md-5 order-1 order-md-2 img-fluid" style={{backgroundImage: `url(${backgroundImg2})`}}>
                    </div>
                    <div className="col-md-7 pt-5 order-2 order-md-1">
                        <h5>Phần 6</h5>
                        <h3>
                            Hoàn thành đoạn văn
                        </h3>
                        <p className="fst-italic">
                            Thí sinh sẽ được cho một đoạn văn có nhiều chỗ trống → Chọn đáp án đúng nhất trong 4 đáp án (từ, cụm từ hoặc câu) để hoàn thành đoạn văn.
                        </p>
                        <ul>
                            <li><i className=" bi bi-check" style={{color: "#5578ff"}}></i>
                                <span> Số câu: 16 (ứng với 4 đoạn văn, mỗi /bg-01.jpgđoạn 4 câu hỏi)</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <br/>
                <div className="row" data-aos="fade-up">
                    <div className="col-md-5 img-fluid" style={{backgroundImage: `url(${backgroundImg3})`}}>
                    </div>
                    <div className="col-md-7 pt-5">
                        <h5>Phần 7</h5>
                        <h3>
                            Đọc hiểu
                        </h3>
                        <p><b>Đoạn Đơn: </b></p>
                        <p className="fst-italic">Thí sinh sẽ được cho 10 bài đọc với mỗi bài gồm 1 đoạn văn. Số lượng câu hỏi cho mỗi bài đọc dao động từ 2 - 4 câu → Thí sinh chọn câu trả lời phù hợp nhất cho câu hỏi.</p>
                        <ul>
                            <li><i className=" bi bi-check" style={{color: "#5578ff"}}></i>
                                <span> Số câu: 29 (ứng với 10 bài: mỗi bài có 1 đoạn văn và 2 - 4 câu hỏi)</span>
                            </li>
                        </ul>
                        <p><b>Đoạn Kép: </b></p>
                        <p className="fst-italic ">Thí sinh sẽ được cho 5 bài đọc với mỗi bài có từ 2 - 3 đoạn văn. Mỗi bài đọc có 5 câu hỏi. → Thí sinh chọn đáp án đúng nhất cho các câu hỏi</p>
                        <ul>
                            <li><i className="bi bi-check" style={{color: "#5578ff"}}></i>
                                <span> 25 (ứng với 5 bài: 2 bài có 2 đoạn văn, 3 bài có 3 đoạn văn, mỗi bài có 5 câu hỏi)</span> </li>
                        </ul>
                    </div>
                </div>
            </div>
            <br/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
