import React, { Component } from 'react';
import { connect } from 'react-redux';
// import TestMain from '../section/test/TestMain';
import { Container, Row, Col, Button, Form, Label } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage, FormattedTime } from 'react-intl';
import '../section/test/TestMain.scss';
import '.././section/test/sb-admin-2.scss';
import TestMain from '../section/test/TestMain';
import { setContentOfConfirmModal } from '../../../store/actions/appActions.js';
import { showSideBar, fetchExamDataStart } from '../../../store/actions/examActions';
// import 'bootstrap/dist/css/bootstrap.min.css';

class Test extends Component {
    constructor(props) {
        super(props)
        this.state = {
            start: false,
            contentOfConfirmModal: {}
        }
    }

    componentDidMount = () => {
        this.setState({
            contentOfConfirmModal: { isOpen: true, messageId: "common.confirm-this-task", handleFunc: null, dataFunc: null, type: "exam" }
        }, () => {
            this.props.setContentOfConfirmModal(this.state.contentOfConfirmModal)
        })
    }


    startTheExam = () => {
        this.setState({
            start: true
        }, () =>{
            this.props.fetchExamDataStart([16])
        })
    }


    render() {
        if (this.state.start === true) {
            return (
                <TestMain />
            )
        } else {
            return (
                <div>
                    <Row className='header-test'>
                        <Col>
                            <h3><FormattedMessage id="client.test.header-title" /></h3>
                        </Col>
                        <Col>
                            <button
                                //</Col>onClick={() => { this.toggleSideBarModal() }} 
                                className="btn btn-primary btn-icon-split" style={{ float: "right" }}
                            >
                                <span className="icon text-white-50">
                                    <FontAwesomeIcon icon={['fas', 'fa-list-check']} />
                                </span>
                                <span className="text"><FormattedMessage id="client.test.header-question-list" /></span>
                            </button>


                            <button className="btn btn-info" style={{ float: "right", marginRight: "10%" }}>
                                <span className="text">01:49:49</span>
                            </button>

                            <button
                                //</Col>onClick={() => this.handleBeforeDeleteMultiUser()} 
                                className="btn btn-info btn-danger" style={{ float: "right", marginRight: "2%" }}
                            //disabled={this.state.isDisabled}
                            >
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
                            <Row style={{ backgroundColor: "#FFFFFF", height: "80vh", justifyContent: "center" }}>

                                <div style={{ padding: "1%" }}>
                                    Thời gian làm bài: 120 phút
                                    <br />Cấu trúc đề thi
                                </div>


                                <div style={{ width: "40%", textAlign: "center" }}>
                                    <h4>LISTENING</h4>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>1</th>
                                                <th style={{ textAlign: "left" }}>PART 1</th>
                                                <th>6 câu</th>
                                            </tr>
                                            <tr>
                                                <th>2</th>
                                                <th style={{ textAlign: "left" }}>PART 2</th>
                                                <th>25 câu</th>
                                            </tr>
                                            <tr>
                                                <th>3</th>
                                                <th style={{ textAlign: "left" }}>PART 3</th>
                                                <th>39 câu</th>
                                            </tr>
                                            <tr>
                                                <th>4</th>
                                                <th style={{ textAlign: "left" }}>PART 4</th>
                                                <th>30 câu</th>
                                            </tr>
                                        </thead>
                                    </table>

                                    <h4>READING</h4>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>1</th>
                                                <th style={{ textAlign: "left" }}>PART 5</th>
                                                <th>30 câu</th>
                                            </tr>
                                            <tr>
                                                <th>2</th>
                                                <th style={{ textAlign: "left" }}>PART 6</th>
                                                <th>16 câu</th>
                                            </tr>
                                            <tr>
                                                <th>3</th>
                                                <th style={{ textAlign: "left" }}>PART 7</th>
                                                <th>54 câu</th>
                                            </tr>
                                        </thead>
                                    </table>

                                    <button
                                        className="start-btn"
                                        style={{marginTop: "80px"}}
                                        onClick={() => { this.startTheExam() }}
                                    >
                                        BẮT ĐẦU
                                    </button>
                                </div>
                            </Row>
                        </Row>
                    </Row>
                </div>
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
        fetchExamDataStart: (codeId) => dispatch(fetchExamDataStart(codeId)),
        setContentOfConfirmModal: (contentOfConfirmModal) => dispatch(setContentOfConfirmModal(contentOfConfirmModal))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
