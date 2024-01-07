import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import './SideBarModal.scss';
import * as actions from "../store/actions";
import { KeyCodeUtils } from "../utils";

class SideBarModal extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handlerKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handlerKeyDown);
    }

    toggle = () => {
        this.props.toggleSideBarModal();
    }



    render() {
        return (
            <div
                className={this.props.isOpen ? "modal-dialog show" : "modal-dialog"}
                role="document"
            >
                <div className="modal-content">
                    <div className="modal-header" style={{ height: "10%"}}>
                        <button
                            type="button"
                            className="close"
                            // data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => {
                                this.toggle()
                            }}
                        >
                            <span aria-hidden="true">hehehe</span>
                        </button>
                        <h4 className="modal-title" id="myModalLabel">
                            Rigth Sidebar
                        </h4>
                    </div>

                    <div className="modal-body" style={{ height: "80%"}}>
                        <p> fgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfd
                        fgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfds
                        fgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfds
                        fgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfds
                        sfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfds</p>
                    </div>

                    <div className="modal-footer" style={{ height: "10%"}}> 
                    <p> footer</p>

                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SideBarModal);
