import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import SideBarModal from '../../../../components/SideBarModal';
import HeaderExam from './HeaderExam'
import PrePart from './PrePart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage, FormattedTime } from 'react-intl';
import { Container, Row, Col, Button, Form, Label } from 'react-bootstrap';
import { showSideBar, fetchAllExamDataStart, fetchAllExamDataMapStart } from '../../../../store/actions/examActions';
import ReactPlayer from 'react-player';
import { ThreeDots } from 'react-loader-spinner'
//import 'bootstrap/dist/css/bootstrap.min.css';
import './sb-admin-2.scss'
import './TestMain.scss'
import ExamPart from './ExamPart';
import HeaderPart from './HeaderPart';
import ChangeQuestion from './ChangeQuestion';
import { CompressOutlined } from '@mui/icons-material';
class TestMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isExamLoading: true,
            isExamMapLoading: true,
            examData: [{}, {}, {}, {}, {}, {}, {}, {}],
            examDataMap: [{}, {}, {}, {}, {}, {}, {}, {}],
            partDataMap: [{}, {}, {}, {}, {}, {}, {}, {}],
            checkPrePart: [0, 0, 0, 0, 0, 0, 0, 0],
            checkCompletedPart: [0, 0, 0, 0, 0, 0, 0, 0],
            isOpenSideBarModal: false,
            questionShow: [{}, {}, {}],
            question: 1,
            part: 1
        }
        this.testMain = createRef();
    }

    setCheckPrePart = (part) => {
        let cloneCheckPrePart = this.state.checkPrePart
        cloneCheckPrePart[part] = 1
        this.setState({
            checkPrePart: cloneCheckPrePart
        })
    }

    setCheckCompletedPart = (part) => {
        let cloneCheckCompletedPart = this.state.checkCompletedPart
        cloneCheckCompletedPart[part] = 1
        this.setState({
            checkCompletedPart: cloneCheckCompletedPart
        }, () => {
            console.log('checkCompletedPart ',JSON.stringify(this.state.checkCompletedPart))
        })
    }

    toggleSideBarModal = () => {
        this.setState({
            isOpenSideBarModal: !this.state.isOpenSideBarModal
        })
        this.props.showSideBar(this.state.isOpenSideBarModal)
    }

    handleBeforeDeleteMultiUser = () => {
        alert('vao xooong');
    }

    showQuestion = (part, question) => {
        this.setState({
            part: part,
            question: question
        })
    }
    

    componentDidUpdate = (preProps, prevState, snapshot) => {
        if (preProps.examDataRedux !== this.props.examDataRedux) {
            this.setState({
                examData: this.props.examDataRedux,
                partDataMap: this.props.partDataMapRedux
            }, () => {
                (this.state.partDataMap && this.state.partDataMap.some((partActive, index) => {
                    if (partActive.active === 1) {
                        this.setState({
                            part: index,
                            question: index === 1 ? 1 : (index === 2 ? 7 : 32)
                        })
                        return true  // Dừng vòng lặp
                    }
                    return false // Tiếp tục lặp nếu chưa đạt điều kiện
                }))
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
            })
        }
        if (preProps.isExamLoadingMapRedux !== this.props.isExamLoadingMapRedux) {
            this.setState({
                isExamMapLoading: this.props.isExamLoadingMapRedux
            })
        }
    }

    componentDidMount = () => {
        this.props.fetchAllExamDataMapStart();
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

    getDataByQuestion = (question) => {

    }

    render() {
        let question = this.state.question
        let part = this.state.part
        let checkPrePart = this.state.checkPrePart
        let checkCompletedPart = this.state.checkCompletedPart
        let partDataMap = this.state.partDataMap
        let examData = this.state.examData
        let examDataIndex = partDataMap[part].index
        console.log('check ', examDataIndex, part, question, JSON.stringify(checkPrePart))

        if (typeof examDataIndex !== 'undefined' && ((question === 1 && checkPrePart[1] === 0) || (question === 7 && checkPrePart[2] === 0) || (question === 32 && checkPrePart[3] === 0))) {
            return (
                <>
                    <div className={this.state.isOpenSideBarModal ? "main-dim test-main" : "test-main"}
                        ref={this.testMain}
                        onClick={(event) => this.handleClick(event)}
                    >
                        <HeaderExam
                            toggleSideBarModal={this.toggleSideBarModal}
                            handleBeforeDeleteMultiUser={this.handleBeforeDeleteMultiUser}
                        />

                        <Row style={{ backgroundColor: "#fff", padding: "1%" }}>
                            <Row style={{ backgroundColor: "#f0f3f8", padding: "1%" }}>
                                <HeaderPart part={part} />
                                {examDataIndex !== 'undefined' &&
                                    <PrePart
                                        setCheckPrePart={this.setCheckPrePart}
                                        checkPrePart={checkPrePart}
                                        audio={examData[examDataIndex].audioLink}
                                        photo={examData[examDataIndex].photoLink}
                                        showQuestion={this.showQuestion}
                                        part={part}
                                        question={question}
                                    />
                                }
                            </Row>
                        </Row>
                    </div>
                </>
            );
        } else if (checkPrePart[1] === 1 || checkPrePart[2] === 1 || checkPrePart[3] === 1) {
            let question = this.state.question
            let passage = this.state.examDataMap[question].passage
            let examDataByQuestionMap = this.state.examDataMap.filter(item => Number(item.passage) === Number(passage));
            return (
                <>
                    <div className={this.state.isOpenSideBarModal ? "main-dim test-main" : "test-main"}
                        ref={this.testMain}
                        onClick={(event) => this.handleClick(event)}
                    >
                        <HeaderExam
                            toggleSideBarModal={this.toggleSideBarModal}
                            handleBeforeDeleteMultiUser={this.handleBeforeDeleteMultiUser}
                        />

                        <Row style={{ backgroundColor: "#fff", padding: "1%" }}>
                            <Row style={{ backgroundColor: "#f0f3f8", padding: "1%" }}>
                                <HeaderPart part={this.state.part} />
                                <ExamPart
                                    examDataMap={examDataByQuestionMap}
                                    part={this.state.part}
                                />
                                <ChangeQuestion
                                    setCheckCompletedPart={this.setCheckCompletedPart}
                                    examDataMap={examDataByQuestionMap}
                                    showQuestion={this.showQuestion}
                                    part={this.state.part}
                                    question={question}
                                />
                            </Row>
                        </Row>


                    </div>
                    <SideBarModal
                        checkCompletedPart = {checkCompletedPart}
                        toggleSideBarModal={this.toggleSideBarModal}
                        showQuestion={this.showQuestion}
                        isOpen={this.state.isOpenSideBarModal}
                    />
                </>
            );
        } else {
            return (
                <>
                    <HeaderExam
                        toggleSideBarModal={this.toggleSideBarModal}
                        handleBeforeDeleteMultiUser={this.handleBeforeDeleteMultiUser}
                    />

                    <Row style={{ backgroundColor: "#fff", padding: "1%" }}>
                        <Row style={{ backgroundColor: "#f0f3f8", padding: "1%" }}>
                            <HeaderPart part={part} />
                            <Row style={{ backgroundColor: "#FFFFFF", height: "74vh" }}>

                                <div style={{ width: "49%", padding: "2%" }}>
                                    <ThreeDots
                                        visible={true}
                                        height="60"
                                        width="60"
                                        color="#4e73df"
                                        radius="9"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClass="audio-class"
                                    />
                                </div>
                                <div style={{ backgroundColor: "#f0f3f8", width: "2%" }}></div>
                                <div style={{ width: "49%", padding: "5%" }}>
                                    <ThreeDots
                                        visible={true}
                                        height="60"
                                        width="60"
                                        color="#4e73df"
                                        radius="9"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClass="audio1-class"
                                    />
                                </div>
                            </Row>
                            <Row>
                                <div
                                // style={{ width: "8%", margin: "15px auto 0px auto" }}
                                >
                                    <ThreeDots
                                        visible={true}
                                        height="50"
                                        width="60"
                                        color="#4e73df"
                                        radius="9"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClass="audio2-class"
                                    />
                                </div>
                            </Row>
                        </Row>
                    </Row>
                </>
            );
        }
    }

}

const mapStateToProps = state => {
    return {
        examDataRedux: state.exam.examData,
        examDataMapRedux: state.exam.examDataMap,
        isExamLoadingRedux: state.exam.isExamLoading,
        isExamLoadingMapRedux: state.exam.isExamMapLoading,
        partDataMapRedux: state.exam.partDataMap
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showSideBar: (isShow) => dispatch(showSideBar(isShow)),
        fetchAllExamDataStart: (codeId) => dispatch(fetchAllExamDataStart(codeId)),
        fetchAllExamDataMapStart: () => dispatch(fetchAllExamDataMapStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestMain);
