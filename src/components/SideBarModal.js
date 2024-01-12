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

    }

    // componentWillUnmount() {
    //     document.removeEventListener('keydown', this.handlerKeyDown);
    // }

    // handlerKeyDown = (event) => {
    //     const keyCode = event.which || event.keyCode;
    //     if (keyCode === KeyCodeUtils.ENTER) {
    //         if (!this.acceptBtnRef.current || this.acceptBtnRef.current.disabled) return;
    //         this.acceptBtnRef.current.click();
    //     }
    // }

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
                        <div className="modal-header">
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

                        <div className="modal-body">
                            <p> fgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfd
                                fgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfds
                                fgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfds
                                fgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfds
                                sfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfdsfgsdfds
                                aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa

                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa

                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa

                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa

                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa

                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa

                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa

                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa

                                aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa

                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa

                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa

                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa

                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa

                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa


                                v
                                aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa

                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa

                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa

                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa

                            </p>


                        </div>

                        <div className="modal-footer" style={{bottom: 0,marginBottom: '20px', position: "fixed", width: "10%", height: "10%", border: "1px solid gray", backgroundColor: "orange"}}>
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
