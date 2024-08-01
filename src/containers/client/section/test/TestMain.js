import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import SideBarModal from '../../../../components/SideBarModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TestMain.scss'
class TestMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenSideBarModal: false
        }

        this.testMain = createRef();
    }

    toggleSideBarModal = () => {
        this.setState({
            isOpenSideBarModal: !this.state.isOpenSideBarModal
        })
    }

    componentDidMount = () => {
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
        }
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClick(event) {
        if (this.testMain.current && this.testMain.current.contains(event.target)) {
            alert('test main');
            this.handleClickOutside();
        }
    }

    render() {
        return (
            <>
                <div className={this.state.isOpenSideBarModal ? "backdrop-show test-main" : "test-main"}
                    ref={this.testMain}
                    onClick={(event) => this.handleClick(event)}
                >
                    <div className='row header-test'>
                        <div className='col-6'>
                            <h3>HE THONG THI TRUC TUYEN</h3>
                        </div>

                        <div className="text-center col-6">

                            <button onClick={() => { this.toggleSideBarModal() }} className="btn btn-primary btn-icon-split" style={{ float: "right", marginRight: "10px" }}>
                                <span className="icon text-white-50">
                                    <FontAwesomeIcon icon={['fas', 'fa-plus']} />
                                </span>
                                <span className="text">Add new user</span>
                            </button>
                         

                            <button className="btn btn-info" style={{ float: "right", marginRight: "10px" }}>
                                <span className="text">01:49:49</span>
                            </button>

                            <button onClick={() => this.handleBeforeDeleteMultiUser()} className="btn btn-info btn-danger" style={{ float: "right", marginRight: "10px" }} disabled={this.state.isDisabled}>
                                <span className="text">Nop Bai</span>
                            </button>

                            {/* <a href="#" class="btn btn-info btn-icon-split">
                                        <span class="icon text-white-50">
                                            <i class="fas fa-info-circle"></i>
                                        </span>
                                        <span class="text">Split Button Info</span>
                                    </a> */}
                            {/* <button
                                type="button"
                                className="mybutton"
                                onClick={() => { this.toggleSideBarModal() }}
                            >
                                Open/Close Right Sidebar
                            </button> */}


                        </div>
                    </div>
                </div>
                <SideBarModal
                    toggleSideBarModal={this.toggleSideBarModal}
                    isOpen={this.state.isOpenSideBarModal}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(TestMain);
