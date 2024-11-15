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
            this.acceptBtnRef.current.props.toggle();
        }
    }

    onAcceptBtnClick = () => {
        const { contentOfConfirmModal } = this.props;

        if (contentOfConfirmModal.handleFunc) {
            if (contentOfConfirmModal.dataFunc.id) {
                console.log('contentOfConfirmModal.dataFunc.data ', contentOfConfirmModal.dataFunc.data)
                contentOfConfirmModal.handleFunc(contentOfConfirmModal.dataFunc.id, contentOfConfirmModal.dataFunc.data);
            } else if (contentOfConfirmModal.dataFunc.ids) {
                console.log('data ', contentOfConfirmModal.dataFunc.ids)
                contentOfConfirmModal.handleFunc(contentOfConfirmModal.dataFunc.ids);
            } else {
                contentOfConfirmModal.handleFunc(contentOfConfirmModal.dataFunc)
            }
        }
        this.onClose();
    }

    onClose = () => {
        const { contentOfConfirmModal } = this.props;
        this.props.setContentOfConfirmModal({
            isOpen: false,
            messageId: "",
            handleFunc: null,
            dataFunc: null,
            type : contentOfConfirmModal.type
        });
    }

    render() {
        const { contentOfConfirmModal } = this.props;
        let type = contentOfConfirmModal.type;
        if(type === "exam") {
            return (
                <Modal
                    isOpen={contentOfConfirmModal.isOpen}
                    toggle={this.onClose}
                    className='confirm-modal-exam'
                    top={true}
                    ref={this.acceptBtnRef}
                >
                    <ModalHeader style={{margin: "0 auto"}}>
                        <span>QUY ĐỊNH VÀ LƯU Ý LÀM BÀI THI</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="modal-body">
                            <div className="confirm-modal-content">
                                <div className="row">
                                    <div className="col-12">
                                        <ol>
                                            <li>Mỗi mã code chỉ được sử dụng 1 lần duy nhất. Không cấp lại mã code khi đã kích hoạt.</li>
                                            <li>
                                                Thí sinh chỉ làm bài thi trên máy bàn hoặc máy laptop để đạt kết quả tốt nhất. <strong>Đặc biệt lưu ý:</strong> Thí sinh nên sử dụng trình duyệt Chrome, tránh làm bài trên các trình duyệt khác như Safari, Firefox.
                                            </li>
                                            <li>
                                                Hết thời gian làm bài, thí sinh chọn Nộp bài để nhận kết quả bài thi. Trường hợp không nộp bài thi, hệ thống sẽ tự động nộp bài và trả kết quả bài thi.
                                            </li>
                                            <li>Thí sinh cần đảm bảo thiết bị, đường truyền mạng, tai nghe ổn định để làm bài.</li>
                                            <li>
                                                Trong trường hợp thí sinh bị lỗi liên quan đến thiết bị, đường truyền mạng, trong thời gian làm bài kể từ khi kích hoạt code, thí sinh có thể làm lại bài thi bằng cách nhập lại mã code trên trình duyệt và thiết bị vừa thao tác. Sau thời gian này code không thể sử dụng.
                                            </li>
                                            <li>Đề thi thuộc bản quyền của ETS và IIG Vietnam. Nghiêm cấm thi sao chép, phát tán đề thi dưới mọi hình thức.</li>
                                            <li>
                                                Kết quả bài thi sẽ được trả ngay sau khi nộp bài. Thí sinh có thể xem lại kết quả bài thi bằng cách nhập lại mã code vào đường link làm bài thi.
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter style={{margin: "0 auto"}}>
                        <Button color="secondary px-3" onClick={this.onClose}>TÔI ĐỒNG Ý</Button>
                    </ModalFooter>
                </Modal >
            );
        } else if(type === "next-part") {
            return (
                <Modal
                    isOpen={contentOfConfirmModal.isOpen}
                    toggle={this.onClose}
                    className='confirm-modal-exam'
                    top={true}
                    ref={this.acceptBtnRef}
                    size='sm'
                >
                   <ModalHeader style={{margin: "0 auto"}}>
                        <span>Thông báo</span>
                    </ModalHeader>
                    <ModalBody style={{margin: "0 auto"}}>
                        <div className="modal-body">
                            <div className="confirm-modal-content">
                                <div className="row">
                                    <div className="col-12">
                                    Bạn đã hoàn thành 6/6 câu. Bạn sẽ không thể quay lại PART 1 sau khi chuyển sang phần tiếp theo.
                                    Hãy chắc chắn bạn đã hoàn thành các câu hỏi.
                                        {/* <FormattedMessage id={contentOfConfirmModal.messageId ? contentOfConfirmModal.messageId : "common.confirm-this-task"} /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter style={{margin: "0 auto"}}>
                        <Button color="secondary px-3" onClick={this.onClose}>QUAY LẠI</Button>
                        <Button
                            color="primary px-3"
                            onClick={() => { this.onAcceptBtnClick() }}
                        >TIẾP TỤC</Button>{' '}
                    </ModalFooter>
                </Modal >
            );
        }else if(type === "prev-part") {
            return (
                <Modal
                    isOpen={contentOfConfirmModal.isOpen}
                    toggle={this.onClose}
                    className='confirm-modal-exam'
                    top={true}
                    ref={this.acceptBtnRef}
                    size='sm'
                >
                   <ModalHeader style={{margin: "0 auto"}}>
                        <span>Thông báo</span>
                    </ModalHeader>
                    <ModalBody style={{margin: "0 auto"}}>
                        <div className="modal-body">
                            <div className="confirm-modal-content">
                                <div className="row">
                                    <div className="col-12">
                                        Bạn sẽ không thể quay lại PART 1 sau khi chuyển sang phần tiếp theo.
                                        {/* <FormattedMessage id={contentOfConfirmModal.messageId ? contentOfConfirmModal.messageId : "common.confirm-this-task"} /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter style={{margin: "0 auto"}}>
                        <Button color="secondary px-3" onClick={this.onClose}>TÔI ĐỒNG Ý</Button>
                    </ModalFooter>
                </Modal >
            );
        } else {
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
