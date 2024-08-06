import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import SideBarModal from '../../../../components/SideBarModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage, FormattedTime } from 'react-intl';
import { Container, Row, Col, Button, Form, Label } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './sb-admin-2.scss'
import './TestMain.scss'
class TestMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenSideBarModal: false
        }
        this.testMain = createRef();
    }

    toggleSideBarModal = () => {
        this.setState({
            isOpenSideBarModal: !this.state.isOpenSideBarModal
        })
    }

    componentDidMount = () => {
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
        }
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClick(event) {
        if (this.testMain.current && this.testMain.current.contains(event.target)) {
            this.handleClickOutside();
        }
    }

    render() {
        return (
            <>
                <div className={this.state.isOpenSideBarModal ? "backdrop-show test-main" : "test-main"}
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
                                <Col><span><h4>PART 1</h4></span></Col>
                                <Col><Button variant="info" style={{ float: "right", width: "12%" }}>0 / 200</Button></Col>
                            </Row>
                            <Row style={{ backgroundColor: "#f0f3f8", paddingBottom: "10px" }}>
                                <Col>
                                    <Button className="btn btn-primary btn-icon-split" style={{ float: "right", marginRight: "5px" }}>
                                        <span className="icon text-white-50">
                                            <FontAwesomeIcon icon={['fas', 'fa-circle-arrow-left']} />
                                        </span>
                                        <span className="text" style={{width: "100px"}}>
                                            Câu trước
                                        </span>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button className="btn btn-primary btn-icon-split" style={{ float: "left", marginLeft: "5px" }}>
                                        <span className="text" style={{width: "100px"}}>
                                            Câu tiếp
                                        </span>
                                        <span className="icon text-white-50">
                                            <FontAwesomeIcon icon={['fas', 'fa-circle-arrow-right']} />
                                        </span>
                                    </Button>
                                </Col>
                            </Row>
                            <Row style={{ backgroundColor: "#FFFFFF", height: "73vh" }}>

                                <div style={{width: "49%", padding: "5%" }}>
                                    <div className="d-flex justify-content-center">
                                        <img src="assets/img/banner.png" alt="Question" className="img-fluid" />
                                    </div>
                                    <audio controls className="w-100 mt-2">
                                        <source src="audio_url_here" type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                                <div style={{ backgroundColor: "#f0f3f8", width: "2%" }}></div>
                                <div style={{ width: "49%", padding: "5%" }}>
                                    <Form>
                                        {['A', 'B', 'C', 'D'].map((option, index) => (
                                            <Form.Check
                                                key={index}
                                                type="radio"
                                                name="answer"
                                                label={option}
                                                id={`option-${option}`}
                                                className="mb-2"
                                            />
                                        ))}
                                    </Form>

                                </div>
                            </Row>
                        </Row>
                    </Row>
                    {/* </Container> */}
                </div>
                {/* <Container className={this.state.isOpenSideBarModal ? "backdrop-show test-main" : "test-main"}
                    ref={this.testMain}
                    onClick={(event) => this.handleClick(event)}
                >
                    <Row className="mt-4 header-test">
                        <Col>
                            <div className="d-flex justify-content-between align-items-center">
                                <img src="logo.png" alt="Logo" className="img-fluid" />
                                <h2>HỆ THỐNG THI TRỰC TUYẾN</h2>
                                <div>
                                    <Button variant="primary">Nộp bài</Button>
                                    <span className="ml-2">01:59:26</span>
                                    <span className="ml-2">Guest (Khách)</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className='row' style={{ backgroundColor: "gray", padding: "1%" }}>
                        <Row className="mt-4">
                            <Col>
                                <h4>PART 1</h4>
                                <div className="d-flex justify-content-center">
                                    <img src="image_url_here" alt="Question" className="img-fluid" />
                                </div>
                                <audio controls className="w-100 mt-2">
                                    <source src="audio_url_here" type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col>
                                <Form>
                                    {['A', 'B', 'C', 'D'].map((option, index) => (
                                        <Form.Check
                                            key={index}
                                            type="radio"
                                            name="answer"
                                            label={option}
                                            id={`option-${option}`}
                                            className="mb-2"
                                        />
                                    ))}
                                </Form>
                                <Button variant="primary">Câu tiếp</Button>
                                <div className="mt-2">0/200</div>
                            </Col>
                        </Row>
                    </Row>
                </Container> */}
                <SideBarModal
                    toggleSideBarModal={this.toggleSideBarModal}
                    isOpen={this.state.isOpenSideBarModal}
                />
            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(TestMain);
