import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Form, Label } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import './sb-admin-2.scss'
import './TestMain.scss'
class ExamPart extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        let arr = this.props.examDataMap
        let part = this.props.part
        let length = arr.length
        if (length > 1 && Number(part) !== 1 && Number(part) !== 2) {
            return (
                <Row style={{ backgroundColor: "#FFFFFF", height: "74vh" }}>
                    <div style={{ width: "49%", padding: "2%" }}>
                        <div><span><h6>Question {arr[0].questionNo} - {arr[length - 1].questionNo}: Select the best response to each question</h6></span></div>
                        <br />
                        {arr.map((item, index) => {
                            if (item.photoLink) {
                                return (
                                    <div className="d-flex justify-content-center" key={index}>
                                        <img style={{ height: "400px" }} src={item.photoLink} alt="Question" className="img-fluid" />
                                    </div>
                                )
                            }
                        })}
                        <div className="d-flex justify-content-center" style={{ width: "30% !important" }}>
                            {arr[0].audioLink ? (
                                <ReactPlayer url={arr[0].audioLink} controls />
                            ) : (
                                <p>Audio not available for this question.</p>
                            )}
                        </div>
                    </div>
                    <div style={{ backgroundColor: "#f0f3f8", width: "2%" }}></div>
                    <div style={{ width: "49%", padding: "2%" }}>

                        {arr.map((item, index) => {
                            return (
                                <div key={index}>
                                    <h6>{item.questionNo}. {item.question}</h6>
                                    <form >
                                        <label class="custom-radio">
                                            <input type="radio" name="option" value="A" />
                                            <span class="custom-radio-button"></span>
                                            A.  {item.answer1}
                                        </label>

                                        <label class="custom-radio">
                                            <input type="radio" name="option" value="B" />
                                            <span class="custom-radio-button"></span>
                                            B. {item.answer2}
                                        </label>

                                        <label class="custom-radio">
                                            <input type="radio" name="option" value="C" />
                                            <span class="custom-radio-button"></span>
                                            C. {item.answer3}
                                        </label>
                                        <label class="custom-radio">
                                            <input type="radio" name="option" value="D" />
                                            <span class="custom-radio-button"></span>
                                            D. {item.answer4}
                                        </label>
                                    </form>
                                </div>
                            )
                        })}


                    </div>
                </Row>
            )

        } else {
            return (
                <>
                    <Row style={{ backgroundColor: "#FFFFFF", height: "74vh" }}>

                        <div style={{ width: "49%", padding: "2%" }}>
                            <div><span><h6>Question {arr[0].questionNo}.</h6></span></div>
                            <br />
                            {part === 1 &&
                                (<div className="d-flex justify-content-center">
                                    <img style={{ height: "400px" }} src={arr[0] && arr[0].photoLink} alt="Question" className="img-fluid" />
                                </div>)
                            }
                            <div className="d-flex justify-content-center" style={{ width: "30% !important" }}>
                                {arr[0] &&
                                    arr[0].audioLink ? (
                                    <ReactPlayer url={arr[0].audioLink} controls />
                                ) : (
                                    <p>Audio not available for this question.</p>
                                )}
                            </div>
                        </div>
                        <div style={{ backgroundColor: "#f0f3f8", width: "2%" }}></div>
                        <div style={{ width: "49%", padding: "5%" }}>
                            <form>
                                <label class="custom-radio">
                                    <input type="radio" name="option" value="A" />
                                    <span class="custom-radio-button"></span>
                                    A.
                                </label>

                                <label class="custom-radio">
                                    <input type="radio" name="option" value="B" />
                                    <span class="custom-radio-button"></span>
                                    B.
                                </label>

                                <label class="custom-radio">
                                    <input type="radio" name="option" value="C" />
                                    <span class="custom-radio-button"></span>
                                    C.
                                </label>
                                {part === 1 &&
                                    (<label class="custom-radio">
                                        <input type="radio" name="option" value="D" />
                                        <span class="custom-radio-button"></span>
                                        D.
                                    </label>)
                                }
                            </form>
                        </div>
                    </Row>
                </>
            );
        }
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamPart);
