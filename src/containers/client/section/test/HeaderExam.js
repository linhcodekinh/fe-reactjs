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
class HeaderExam extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    toggleSideBarModal = () => {
        this.props.toggleSideBarModal();
    }

    handleBeforeDeleteMultiUser = () => {
        this.props.handleBeforeDeleteMultiUser();
    }


    render() {
        return (
            <>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderExam);
