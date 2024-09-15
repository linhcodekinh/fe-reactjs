import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import SideBarModal from '../../../../components/SideBarModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage, FormattedTime } from 'react-intl';
import { Container, Row, Col, Button, Form, Label } from 'react-bootstrap';
import { showSideBar, fetchAllExamDataStart } from '../../../../store/actions/examActions';
import ReactPlayer from 'react-player';
import { ThreeDots } from 'react-loader-spinner'
//import 'bootstrap/dist/css/bootstrap.min.css';
import './sb-admin-2.scss'
import './TestMain.scss'
class TestMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isExamLoading: true,
            examData: [],
            examDataMap: [],
            isOpenSideBarModal: false,
            question: 0,
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
            })
        }
        if (preProps.examDataMapRedux !== this.props.examDataMapRedux) {
            this.setState({
                examDataMap: this.props.examDataMapRedux
            })
        }
        if (preProps.isExamLoadingRedux !== this.props.isExamLoadingRedux) {
            this.setState({
                isExamLoading: this.props.isExamLoadingRedux
            }, () => {
                this.showQuestion('1', 0)
            })
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
        //console.log(this.state.isExamLoading + " " + this.state.examDataMap.length)
        let showLoading = (this.state.isExamLoading === true && this.props.isExamLoadingRedux === true) || (this.props.examDataRedux.length === 0 && this.state.examData.length === 0) || (this.state.examDataMap.length === 0 && this.props.examDataMapRedux.length === 0)
        console.log('show', this.state.isExamLoading === true, this.props.isExamLoadingRedux === true, this.state.examData.length === 0, this.state.examDataMap.length === 0)
        if (this.state.question === 0) {
            return (
                <>
                    <ThreeDots
                        visible={showLoading}
                        height="60"
                        width="60"
                        color="#4e73df"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass="audio-class"
                    />
                    <div className={showLoading ? 'disabled' : ''}>
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
                                        <Col><span style={{marginBottom: "10px"}}><h4>PART {this.state.part}</h4></span></Col>
                                        <Col><Button variant="info" style={{ float: "right", width: "15%", marginTop: "-10px"}}>0 / 200</Button></Col>
                                    </Row>
                                    <Row style={{ backgroundColor: "#FFFFFF", height: "73vh" }}>

                                        <div style={{ width: "49%", padding: "2%" }}>
                                            <div className="listening-container-exam">
                                                <div className="d-flex justify-content-center">
                                                    {this.state.examData[0] &&
                                                        this.state.examData[0].audioLink ? (
                                                        <ReactPlayer url={this.state.examData[0].audioLink} controls/>
                                                    ) : (
                                                        <p>Audio not available for this question.</p>
                                                    )}
                                                </div>
                                                <h4>LISTENING TEST</h4>
                                                <br/>
                                                <p>
                                                    In the Listening test, you will be asked to demonstrate how well you
                                                    understand spoken English. The entire Listening test will last
                                                    approximately 45 minutes. There are four parts, and directions are
                                                    given for each part.
                                                </p>
                                            </div>


                                        </div>
                                        <div style={{ backgroundColor: "#f0f3f8", width: "2%" }}></div>

                                        <div style={{ width: "49%", padding: "2%" }} className='custom-scroll-bar'>

                                            <div className="container-exam">
                                                <h5>PART 1</h5>
                                                <p>
                                                <strong>Directions:</strong> For each question in this part, you
                                                will hear four statements about a picture. When you hear the
                                                statements, you must select the one statement that best describes
                                                what you see in the picture. The statements will be spoken only one
                                                time.
                                                </p>
                                                {/* <div className="image-container"> */}
                                                <div className="d-flex justify-content-center">
                                                    <img style={{ height: "400px" }} src={this.state.examData[0] && this.state.examData[0].photoLink} alt="Question" className="img-fluid" />
                                                </div>
                                                {/* </div> */}
                                                <p>
                                                Statement (C), "They're sitting at a table," is the best description
                                                of the picture so far."They're sitting at a table," is the best description
                                                of the picture so far."They're sitting at a table," is the best description
                                                of the picture so far."They're sitting at a table," is the best description
                                                of the picture so far."They're sitting at a table," is the best description
                                                of the picture so far."They're sitting at a table," is the best description
                                                of the picture so far."They're sitting at a table," is the best description
                                                of the picture so far."They're sitting at a table," is the best description
                                                of the picture so far.
                                                </p>
                                            </div>
                                           
                                           
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
                                    <Row>
                                        <button
                                            className="start-btn" style={{width:"8%", margin: "15px auto 0px auto"}}
                                            onClick={() => { this.showQuestion(this.state.part, Number(this.state.question) + 1) }}
                                        >
                                            BẮT ĐẦU
                                        </button>
                                    </Row>
                                </Row>
                            </Row>
                            {/* </Container> */}
                        </div>
                    </div>
                </>
            );
        } else {
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
                                    <Col><span style={{marginBottom: "10px"}}><h4>PART {this.state.part}</h4></span></Col>
                                    <Col><Button variant="info" style={{ float: "right", width: "15%", marginTop: "-10px"}}>0 / 200</Button></Col>
                                </Row>
                              
                                <Row style={{ backgroundColor: "#FFFFFF", height: "74.6vh" }}>

                                    <div style={{ width: "49%", padding: "2%" }}>
                                        {/* <div><span>Questions 32-34: Select the best response to each question</span></div> */}
                                        <div><span><h6>Question {this.state.question}.</h6></span></div>
                                        <br />
                                        <div className="d-flex justify-content-center">
                                            <img style={{ height: "400px" }} src={this.state.examDataMap[Number(this.state.question)] && this.state.examDataMap[Number(this.state.question)].photoLink} alt="Question" className="img-fluid" />
                                        </div>
                                        <div className="d-flex justify-content-center" style={{ width: "30% !important" }}>
                                            {this.state.examDataMap[Number(this.state.question)] &&
                                                this.state.examDataMap[Number(this.state.question)].audioLink ? (
                                                <ReactPlayer url={this.state.examDataMap[Number(this.state.question)].audioLink} controls />
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
                                    </div>
                                </Row>
                                <Row style={{ backgroundColor: "#f0f3f8", marginTop: "13px"  }}>
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

}

const mapStateToProps = state => {
    return {
        examDataRedux: state.exam.examData,
        examDataMapRedux: state.exam.examDataMap,
        isExamLoadingRedux: state.exam.isExamLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showSideBar: (isShow) => dispatch(showSideBar(isShow)),
        fetchAllExamDataStart: (codeId) => dispatch(fetchAllExamDataStart(codeId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestMain);
