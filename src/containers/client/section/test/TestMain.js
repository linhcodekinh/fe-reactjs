import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useState } from "react";
import SideBarModal from '../../../../components/SideBarModal';
import './TestMain.scss'
class TestMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenSideBarModal: false
        }
    }

    handleShowSideBarModal = () => {
        this.setState({
            isOpenSideBarModal: true
        })
      }
    
    
    toggleSideBarModal = () => {
        this.setState({
            isOpenSideBarModal: !this.state.isOpenSideBarModal
        })
      }


    componentDidUpdate = () => {
        console.log('componentDidUpdate Test state ', this.state)
    }

    render() {
        return (
            <>
            <div className={this.state.isOpenSideBarModal ? "backdrop-show" : ""}>
                <h1>react-right-sidebar</h1>
                <div className="text-center">

                    <button
                        type="button"
                        className="mybutton"
                        onClick={() => { this.handleShowSideBarModal()}}
                    >
                        Open/Close Right Sidebar
                    </button>
                    <pre>showModal: {JSON.stringify(this.state.showModal)}</pre>

                    

                     moc fucking chau
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
