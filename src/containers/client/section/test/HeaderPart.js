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
class HeaderPart extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <>
                <Row>
                    <Col><span style={{ marginBottom: "10px" }}><h4>PART {this.props.part}</h4></span></Col>
                    <Col><Button variant="info" style={{ float: "right", width: "15%", marginTop: "-10px" }}>0 / 200</Button></Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPart);
