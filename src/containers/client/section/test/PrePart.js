import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import SideBarModal from '../../../../components/SideBarModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage, FormattedTime } from 'react-intl';
import { Container, Row, Col, Button, Form, Label } from 'react-bootstrap';
import { showSideBar, fetchAllExamDataStart, fetchAllExamDataMapStart } from '../../../../store/actions/examActions';
import ReactPlayer from 'react-player';
import { ThreeDots } from 'react-loader-spinner'
//import 'bootstrap/dist/css/bootstrap.min.css';
import './sb-admin-2.scss'
import './TestMain.scss'
class PrePart extends Component {
    constructor(props) {
        super(props)
        
        this.state = {

        }
    }
    showQuestionStart = () => {
        this.props.showQuestion(this.props.part,this.props.question)
        this.props.setCheckPrePart(Number(this.props.part))
    }

    render() {
        return (
            <>
                <Row style={{ backgroundColor: "#FFFFFF", height: "74vh" }}>
                    <div style={{ width: "49%", padding: "2%" }}>
                        <div className="listening-container-exam">
                            <div className="d-flex justify-content-center">
                                {this.props.audio ? (
                                    <ReactPlayer url={this.props.audio} controls />
                                ) : (
                                    <p>Audio not available for this question.</p>
                                )}
                            </div>
                            {this.props.part === 1 &&
                            <>
                                <h4>LISTENING TEST</h4>
                                <p>
                                    In the Listening test, you will be asked to demonstrate how well you
                                    understand spoken English. The entire Listening test will last
                                    approximately 45 minutes. There are four parts, and directions are
                                    given for each part.
                                </p>
                            </>
                            }
                            {this.props.part === 2 &&
                            <>
                                <h4>PART {this.props.part}</h4>
                                <p>
                                    <strong>Directions:</strong> You will hear a question or statement and three responses spoken in English. 
                                    They will not be printed in your test book and will be spoken only one time. 
                                    Select the best response to the question or statement and mark the letter (A), (B), or (C) on your answer sheet.
                                </p>
                            </>
                            }
                            {this.props.part === 3 && 
                            <>
                                <h4>PART {this.props.part}</h4>
                                <p>
                                    <strong>Directions:</strong> You will hear some conversations between two or more people. 
                                    You will be asked to answer three questions about what the speakers say in each conversation. 
                                    Select the best response to each question and mark the letter (A), (B), (C), or (D) on your answer sheet. 
                                    The conversations will not be printed in your test book and will be spoken only one time.
                                </p>
                            </>
                            }
                            {this.props.part === 4 &&
                            <>
                                <h4>PART {this.props.part}</h4>
                                <p>
                                    <strong>Directions:</strong> You will hear some talks given by a single speaker. 
                                    You will be asked to answer three questions about what the speaker says in each talk. 
                                    Select the best response to each question and mark the letter (A), (B), (C), or (D) on your answer sheet. 
                                    The talks will not be printed in your test book and will be spoken only one time.
                                </p>
                            </>
                            }
                            {this.props.part === 5 &&
                            <>
                                <h4>READING TEST</h4>
                                <p>In the Reading test, you will read a variety of texts and answer several different types of reading 
                                    comprehension questions. The entire Reading test will last 75 minutes. There are three parts, 
                                    and directions are given for each part. You are encouraged to answer as many questions as possible within 
                                    the time allowed.
                                </p>
                            </>
                            }
                            {this.props.part === 6 &&
                            <>
                                <h4>PART {this.props.part}</h4>
                                <p>
                                    <strong>Directions:</strong> Read the texts that follow. A word or phrase is missing in some of the sentences.
                                    Select the best answer to complete the text. Click on the letter (A), (B), (C), or (D) in the answer space provided.
                                </p>
                            </>
                            }
                            {this.props.part === 7 &&
                            <>
                                <h4>PART {this.props.part}</h4>
                                <p>
                                    <strong>Directions:</strong> In this part you will read a selection of texts, such as magazine and newspaper articles, letters, and advertisements. Each text is followed by several questions.
                                    Select the best answer for each question and click on the letter (A), (B), (C), or (D) in the answer space provided.
                                </p>
                            </>
                            }
                        </div>
                    </div>
                    <div style={{ backgroundColor: "#f0f3f8", width: "2%" }}></div>

                    <div style={{ width: "49%", padding: "2%" }} className='custom-scroll-bar'>
                    {this.props.part === 1 &&          
                        (<div className="container-exam">
                            {this.props.part === 1 &&
                            <><h5>PART {this.props.part}</h5>
                            <p>
                                <strong>Directions:</strong> For each question in this part, you
                                will hear four statements about a picture. When you hear the
                                statements, you must select the one statement that best describes
                                what you see in the picture. The statements will be spoken only one
                                time.
                            </p></>}
                            <div className="image-container">
                                {this.props.part === 1 && this.props.photo !== null &&
                                    (<div className="d-flex justify-content-center">
                                        <img style={{ height: "400px" }} src={this.props.photo} alt="Question" className="img-fluid" />
                                    </div>)
                                }
                            </div>
                            { this.props.part === 1 &&
                                (<p>
                                    Statement (C), "They're sitting at a table," is the best description
                                    of the picture so far."They're sitting at a table," is the best description
                                    of the picture so far."They're sitting at a table," is the best description
                                    of the picture so far."They're sitting at a table," is the best description
                                    of the picture so far."They're sitting at a table," is the best description
                                    of the picture so far."They're sitting at a table," is the best description
                                    of the picture so far."They're sitting at a table," is the best description
                                    of the picture so far."They're sitting at a table," is the best description
                                    of the picture so far.
                                </p>)
                            }
                        </div>)
                    }
                    {this.props.part === 5 &&  
                        <p>
                            <strong>Directions: </strong> A word or pharse is missing in each of the sentenses. Four answer choices are given below each sentece.
                            Select the best answer to complete the sentence. Click on the letter (A), (B), (C) or (D) in the answer space provided.
                        </p>
                    }
                    </div>
                </Row>
                <Row>
                    <button
                        className="start-btn" style={{ width: "8%", margin: "15px auto 0px auto" }}
                        onClick={() => { this.showQuestionStart() }}
                    >
                        BẮT ĐẦU
                    </button>
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrePart);
