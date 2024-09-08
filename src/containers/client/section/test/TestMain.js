import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import SideBarModal from '../../../../components/SideBarModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage, FormattedTime } from 'react-intl';
import { Container, Row, Col, Button, Form, Label } from 'react-bootstrap';
import { showSideBar, fetchAllExamDataStart } from '../../../../store/actions/examActions';
import ReactPlayer from 'react-player';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './sb-admin-2.scss'
import './TestMain.scss'
class TestMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            examData: [],
            examDataMap: {},
            isOpenSideBarModal: false,
            question: '1',
            part: '1'
        }
        this.testMain = createRef();
    }

    toggleSideBarModal = () => {
        this.setState({
            isOpenSideBarModal: !this.state.isOpenSideBarModal
        })
        this.props.showSideBar(this.state.isOpenSideBarModal)
    }

    showQuestion = (part, question) => {
        this.setState({
            question: question,
            part: part
        })
    }

    componentDidUpdate = (preProps, prevState, snapshot) => {
        if (preProps.examDataRedux !== this.props.examDataRedux) {
            this.setState({
                examData: this.props.examDataRedux,
                examDataMap: this.props.examDataMapRedux
            }
                , () => {
                    console.log('this.state.examDataMap ', this.state.examDataMap);
                }
            )
        }
    }

    componentDidMount = () => {
        this.props.fetchAllExamDataStart(12);
        document.addEventListener('mousedown', this.handleClickOutside);

    }

    componentWillUnmount = () => {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = () => {
        if (this.state.isOpenSideBarModal === true) {
            this.setState({
                isOpenSideBarModal: false
            })
            this.props.showSideBar(this.state.isOpenSideBarModal)
        }
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClick(event) {
        if (this.testMain.current && this.testMain.current.contains(event.target)) {
            this.handleClickOutside();
        }
    }

    render() {
        if (this.state.examDataMap[1]) console.log('examDataMap ggg', this.state.examDataMap[1].answer1)
        return (
            <>
                <div className={this.state.isOpenSideBarModal ? "main-dim test-main" : "test-main"}
                    ref={this.testMain}
                    onClick={(event) => this.handleClick(event)}
                >

                    <Row className='header-test'>
                        <Col>
                            <h3><FormattedMessage id="client.test.header-title" /></h3>
                        </Col>
                        <Col>
                            <button onClick={() => { this.toggleSideBarModal() }} className="btn btn-primary btn-icon-split" style={{ float: "right" }}>
                                <span className="icon text-white-50">
                                    <FontAwesomeIcon icon={['fas', 'fa-list-check']} />
                                </span>
                                <span className="text"><FormattedMessage id="client.test.header-question-list" /></span>
                            </button>


                            <button className="btn btn-info" style={{ float: "right", marginRight: "10%" }}>
                                <span className="text">01:49:49</span>
                            </button>

                            <button onClick={() => this.handleBeforeDeleteMultiUser()} className="btn btn-info btn-danger" style={{ float: "right", marginRight: "2%" }} disabled={this.state.isDisabled}>
                                <span className="text"><FormattedMessage id="client.test.header-submit" /></span>
                            </button>
                        </Col>
                    </Row>
                    <Row style={{ backgroundColor: "#fff", padding: "1%" }}>
                        <Row style={{ backgroundColor: "#f0f3f8", padding: "1%" }}>
                            <Row>
                                <Col><span><h4>PART {this.state.part}</h4></span></Col>
                                <Col><Button variant="info" style={{ float: "right", width: "12%" }}>0 / 200</Button></Col>
                            </Row>
                            <Row style={{ backgroundColor: "#f0f3f8", paddingBottom: "10px" }}>
                                <Col>
                                    <Button className="btn btn-primary btn-icon-split" style={{ float: "right", marginRight: "5px" }}>
                                        <span className="icon text-white-50">
                                            <FontAwesomeIcon icon={['fas', 'fa-circle-arrow-left']} />
                                        </span>
                                        <span className="text" style={{ width: "100px" }} onClick={() => { this.showQuestion(this.state.part, Number(this.state.question) - 1) }}>
                                            Câu trước
                                        </span>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button className="btn btn-primary btn-icon-split" style={{ float: "left", marginLeft: "5px" }} onClick={() => { this.showQuestion(this.state.part, Number(this.state.question) + 1) }}>
                                        <span className="text" style={{ width: "100px" }}>
                                            Câu tiếp
                                        </span>
                                        <span className="icon text-white-50">
                                            <FontAwesomeIcon icon={['fas', 'fa-circle-arrow-right']} />
                                        </span>
                                    </Button>
                                </Col>
                            </Row>
                            <Row style={{ backgroundColor: "#FFFFFF", height: "74.6vh" }}>

                                <div style={{ width: "49%", padding: "2%" }}>
                                    {/* <div><span>Questions 32-34: Select the best response to each question</span></div> */}
                                    <div><span><h6>Question {this.state.question}.</h6></span></div>
                                    <br />
                                    <div className="d-flex justify-content-center">
                                        <img src={this.state.examDataMap[Number(this.state.question)] && this.state.examDataMap[Number(this.state.question)].photoLink} alt="Question" className="img-fluid" />
                                    </div>
                                    {this.state.examDataMap[Number(this.state.question)] &&
                                        this.state.examDataMap[Number(this.state.question)].audioLink ? (
                                        // <audio controls className="w-100 mt-2">
                                        //     <source
                                        //         src={this.state.examDataMap[Number(this.state.question)].audioLink}
                                        //         type="audio/mpeg"
                                        //     />
                                        //     Your browser does not support the audio element.
                                        // </audio>
                                        <ReactPlayer url={this.state.examDataMap[Number(this.state.question)].audioLink} controls />
                                    ) : (
                                        <p>Audio not available for this question.</p>
                                    )}

                                </div>
                                <div style={{ backgroundColor: "#f0f3f8", width: "2%" }}></div>
                                <div style={{ width: "49%", padding: "5%" }}>
                                    <form>
                                        <label class="custom-radio">
                                            <input type="radio" name="option" value="A" />
                                            <span class="custom-radio-button"></span>
                                            A.  {this.state.examDataMap[Number(this.state.question)] && this.state.examDataMap[Number(this.state.question)].answer1}
                                        </label>

                                        <label class="custom-radio">
                                            <input type="radio" name="option" value="B" />
                                            <span class="custom-radio-button"></span>
                                            B. {this.state.examDataMap[Number(this.state.question)] && this.state.examDataMap[Number(this.state.question)].answer2}
                                        </label>

                                        <label class="custom-radio">
                                            <input type="radio" name="option" value="C" />
                                            <span class="custom-radio-button"></span>
                                            C. {this.state.examDataMap[Number(this.state.question)] && this.state.examDataMap[Number(this.state.question)].answer3}
                                        </label>

                                        <label class="custom-radio">
                                            <input type="radio" name="option" value="D" />
                                            <span class="custom-radio-button"></span>
                                            D. {this.state.examDataMap[Number(this.state.question)] && this.state.examDataMap[Number(this.state.question)].answer4}
                                        </label>
                                    </form>
                                    {/* <Form>
                                        {['A.', 'B.', 'C.', 'D.'].map((option, index) => (
                                            <Form.Check
                                                key={index}
                                                type="radio"
                                                name="answer"
                                                label={option}
                                                id={`option-${option}`}
                                                className="mb-2 custom-radio"
                                            />
                                        ))}
                                         <span class="custom-radio-button"></span>
                                    </Form> */}



                                </div>
                            </Row>
                        </Row>
                    </Row>
                    {/* </Container> */}
                </div>
                <SideBarModal
                    toggleSideBarModal={this.toggleSideBarModal}
                    showQuestion={this.showQuestion}
                    isOpen={this.state.isOpenSideBarModal}
                />
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        examDataRedux: state.exam.examData,
        examDataMapRedux: state.exam.examDataMap
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showSideBar: (isShow) => dispatch(showSideBar(isShow)),
        fetchAllExamDataStart: (codeId) => dispatch(fetchAllExamDataStart(codeId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestMain);
