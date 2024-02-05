import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import './SideBarModal.scss';
import * as actions from "../store/actions";
import { KeyCodeUtils } from "../utils";
import PartTemplate from './PartTemplate';
import TabsPanel from './TabsPanel';
import Tab from './Tab';

class SideBarModal extends Component {

    constructor(props) {
        super(props)
        this.dataPart1 = [1, 2, 3, 4, 5, 6];
        this.dataPart2 = [
            { 1: [7, 8, 9, 10, 11] },
            { 2: [12, 13, 14, 15, 16] },
            { 3: [17, 18, 19, 20, 21] },
            { 4: [22, 23, 24, 25, 26] },
            { 5: [27, 28, 29, 30, 31] },
        ]
        this.dataPart3 = [
            { 1: [32, 33, 34, 35, 36] },
            { 2: [37, 38, 39, 40, 41] },
            { 3: [42, 43, 44, 45, 46] },
            { 4: [47, 48, 49, 50, 51] },
            { 5: [52, 53, 54, 55, 56] },
            { 6: [57, 58, 59, 60, 61] },
            { 7: [62, 63, 64, 65, 66] },
            { 8: [67, 68, 69, 70] }
        ]
        this.dataPart4 = [
            { 1: [71, 72, 73, 74, 75] },
            { 2: [76, 77, 78, 79, 80] },
            { 3: [81, 82, 83, 84, 85] },
            { 4: [86, 87, 88, 89, 90] },
            { 5: [91, 92, 93, 94, 95] },
            { 6: [96, 97, 98, 99, 100] }
        ]
        this.dataPart5 = [
            { 1: [171, 172, 173, 174, 175] },
            { 2: [176, 177, 178, 179, 180] },
            { 3: [181, 182, 183, 184, 185] },
            { 4: [186, 187, 188, 189, 190] },
            { 5: [191, 192, 193, 194, 195] },
            { 6: [196, 197, 198, 199, 200] }
        ]

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
            <div className='side-bar-modal'>
                <div
                    className={this.props.isOpen ? "modal-dialog-side-bar show" : "modal-dialog-side-bar"}
                    role="document"
                    
                >
                    <div className='modal-header header'>
                        <h5 className="modal-title" id="myModalLabel">
                            Rigth Sidebar
                        </h5>
                        <button
                            type="button"
                            className="close"
                            // data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => {
                                this.toggle()
                            }}
                        >
                            <span aria-hidden="true">x</span>
                        </button>
                    </div>
                    <div className='body'>
                        <TabsPanel className="tabs-panel">
                            <Tab
                                title="About"
                                // subtitle="Little About us"
                                icon="far fa-address-card"
                                selected="0"
                            >
                                <PartTemplate partName={"PART 1"} partData={this.dataPart1} />
                                <PartTemplate partName={"PART 2"} partData={this.dataPart2} />
                                <PartTemplate partName={"PART 3"} partData={this.dataPart3} />
                                <PartTemplate partName={"PART 4"} partData={this.dataPart4} />
                            </Tab>
                            <Tab
                                title="History"
                                // subtitle="Our History"
                                icon="fas fa-hourglass-start"
                                selected="1"
                            >
                                <PartTemplate partName={"PART 5"} partData={this.dataPart5} />
                                <PartTemplate partName={"PART 6"} partData={this.dataPart2} />
                                <PartTemplate partName={"PART 7"} partData={this.dataPart3} />
                            </Tab>
                        </TabsPanel>
                    </div>
                    <div style={{ bottom: 0, position: "fixed", width: "18%" }}>
                        {/* <div style={{position: "fixed", width: "6%",border: "1px solid gray"}}> 2footer</div>
                            <div style={{marginLeft: "6%",position: "fixed", width: "6%",border: "1px solid gray"}}> 3footer</div>                            
                            <div style={{marginLeft: "12%",position: "fixed",width: "6%",border: "1px solid gray"}}> 1footer</div> */}

                        <table>
                            <tr style={{ height: "40px" }}>
                                <td style={{ width: "6%", border: "1px solid gray", backgroundColor: "yellow" }}>Emil</td>
                                <td style={{ width: "6%", border: "1px solid gray", backgroundColor: "green" }}>Tobias</td>
                                <td style={{ width: "6%", border: "1px solid gray", backgroundColor: "red" }}>Linus</td>
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
