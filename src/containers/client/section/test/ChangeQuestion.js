import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import SideBarModal from '../../../../components/SideBarModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage, FormattedTime } from 'react-intl';
import { Container, Row, Col, Button, Form, Label } from 'react-bootstrap';
import { setContentOfConfirmModal } from '../../../../store/actions/appActions.js';
import { showSideBar, fetchAllExamDataStart, fetchAllExamDataMapStart } from '../../../../store/actions/examActions';
import ReactPlayer from 'react-player';
import { ThreeDots } from 'react-loader-spinner'
//import 'bootstrap/dist/css/bootstrap.min.css';
import './sb-admin-2.scss'
import './TestMain.scss'
import Header from './HeaderExam';
class ChangeQuestion extends Component {
    constructor(props) {
        super(props)
        //this.showQuestion = this.props.showQuestion.bind(this);
        this.state = {
            contentOfConfirmModal: {}
        }
    }

    showQuestion = (part, question) => {
        if(this.props.part < part){
            this.props.setCheckCompletedPart(Number(this.props.part))
        }
        this.props.showQuestion(part, question) 
    }

    showConfirmPopup = (type, messageId, handleFunc, dataFunc) => {
        this.setState({
            contentOfConfirmModal: { isOpen: true, messageId: messageId, handleFunc: handleFunc ? handleFunc : null, dataFunc: dataFunc ?  dataFunc : null, type: type }
        }, () => {
            this.props.setContentOfConfirmModal(this.state.contentOfConfirmModal)
        })
    }

    showQuestionNext = () => {
        if(this.props.question === 6){
            this.showConfirmPopup("next-part", "common.confirm-this-task", this.showQuestion, {id: this.props.part + 1, data: Number(this.props.question) + this.props.examDataMap.length})
        } else if(this.props.question === 31){
            this.showConfirmPopup("next-part", "common.confirm-this-task", this.showQuestion, {id: this.props.part + 1, data: Number(this.props.question) + this.props.examDataMap.length})
        }else{
            this.showQuestion(this.props.part, Number(this.props.question) + this.props.examDataMap.length)
        }
    }

    showQuestionPrev = () => {
        if(this.props.question === 7 || this.props.question === 32){
            this.showConfirmPopup("prev-part", "common.confirm-this-task", false, false)
        }else{
            this.showQuestion(this.props.part, Number(this.props.question) - this.props.examDataMap.length)
        }
    }
    render() {
        return (
            <>
                <Row style={{ backgroundColor: "#f0f3f8", marginTop: "13px" }}>
                    <Col>
                        <Button className="btn btn-primary btn-icon-split" style={{ float: "right", marginRight: "5px" }}>
                            <span className="icon text-white-50">
                                <FontAwesomeIcon icon={['fas', 'fa-circle-arrow-left']} />
                            </span>
                            <span className="text" style={{ width: "100px" }} onClick={() => { this.showQuestionPrev() }}>
                                Câu trước
                            </span>
                        </Button>
                    </Col>
                    <Col>
                        <Button className="btn btn-primary btn-icon-split" style={{ float: "left", marginLeft: "5px" }} onClick={() => { this.showQuestionNext() }}>
                            <span className="text" style={{ width: "100px" }}>
                                Câu tiếp
                            </span>
                            <span className="icon text-white-50">
                                <FontAwesomeIcon icon={['fas', 'fa-circle-arrow-right']} />
                            </span>
                        </Button>
                    </Col>
                </Row>
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
        setContentOfConfirmModal: (contentOfConfirmModal) => dispatch(setContentOfConfirmModal(contentOfConfirmModal))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeQuestion);
