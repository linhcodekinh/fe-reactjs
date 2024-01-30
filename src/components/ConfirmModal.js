import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import './ConfirmModal.scss';
import * as actions from "../store/actions";
import { KeyCodeUtils } from "../utils";

class ConfirmModal extends Component {

    constructor(props) {
        super(props);
        this.acceptBtnRef = React.createRef();
    }

    initialState = {
    };

    state = {
        ...this.initialState
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handlerKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handlerKeyDown);
    }

    handlerKeyDown = (event) => {
        const keyCode = event.which || event.keyCode;
        if (keyCode === KeyCodeUtils.ENTER) {
            if (!this.acceptBtnRef.current || this.acceptBtnRef.current.disabled) return;
            this.acceptBtnRef.current.click();
        }
    }

    onAcceptBtnClick = () => {
        const { contentOfConfirmModal } = this.props;
       
        if (contentOfConfirmModal.handleFunc) {
            if (contentOfConfirmModal.dataFunc.id) {
                contentOfConfirmModal.handleFunc(contentOfConfirmModal.dataFunc.id, contentOfConfirmModal.dataFunc.data);
            } else if (contentOfConfirmModal.dataFunc.ids) {
                console.log('data ', contentOfConfirmModal.dataFunc.ids)
                contentOfConfirmModal.handleFunc(contentOfConfirmModal.dataFunc.ids);
            } else if(contentOfConfirmModal.dataFunc.imageFile) {
                contentOfConfirmModal.handleFunc(contentOfConfirmModal.dataFunc.data, contentOfConfirmModal.dataFunc.imageFile);
            }else {
                contentOfConfirmModal.handleFunc(contentOfConfirmModal.dataFunc)
            }
        }
        this.onClose();
    }

    onClose = () => {
        this.props.setContentOfConfirmModal({
            isOpen: false,
            messageId: "",
            handleFunc: null,
            dataFunc: null
        });
    }

    render() {
        const { contentOfConfirmModal } = this.props;
        console.log('this.props ', this.props)
        return (
            <Modal
                isOpen={contentOfConfirmModal.isOpen}
                toggle={this.onClose}
                className='confirm-modal'
                centered={true}
            >
                <ModalHeader
                //toggle={() => this.toggle()}
                ><FormattedMessage id="common.confirm" />
                    {/* <div >
                    <button className="btn btn-close" onClick={this.onClose}>
                        <i className="fal fa-times" />
                    </button>
                </div> */}
                </ModalHeader>
                <ModalBody>
                    <div className="modal-body">
                        <div className="confirm-modal-content">
                            <div className="row">
                                <div className="col-12">
                                    <FormattedMessage id={contentOfConfirmModal.messageId ? contentOfConfirmModal.messageId : "common.confirm-this-task"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary px-3"
                        onClick={() => { this.onAcceptBtnClick() }}
                    ><FormattedMessage id="common.yes" /></Button>{' '}
                    <Button color="secondary px-3" onClick={this.onClose}><FormattedMessage id="common.no" /></Button>
                </ModalFooter>
            </Modal >
        );
    }

}

const mapStateToProps = state => {
    return {
        contentOfConfirmModal: state.app.contentOfConfirmModal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setContentOfConfirmModal: (contentOfConfirmModal) => dispatch(actions.setContentOfConfirmModal(contentOfConfirmModal))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);
