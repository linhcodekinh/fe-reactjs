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
                className={this.props.isOpen ? "modal-dialog-side-bar show" : "modal-dialog-side-bar" }
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


                            </p>


                        </div>

                        <div style={{ bottom: 0, position: "fixed", width: "21%"}}>
                            {/* <div style={{position: "fixed", width: "6%",border: "1px solid gray"}}> 2footer</div>
                            <div style={{marginLeft: "6%",position: "fixed", width: "6%",border: "1px solid gray"}}> 3footer</div>                            
                            <div style={{marginLeft: "12%",position: "fixed",width: "6%",border: "1px solid gray"}}> 1footer</div> */}

                            <table>
                                <tr>
                                    <td style={{width: "7%", border: "1px solid gray", padding: "3%"}}>Emil</td>
                                    <td style={{width: "7%", border: "1px solid gray", padding: "3%"}}>Tobias</td>
                                    <td style={{width: "7%", border: "1px solid gray", padding: "3%"}}>Linus</td>
                                </tr>
                            </table>
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
