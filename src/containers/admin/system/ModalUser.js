import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
    Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import { emitter } from '../../../utils/emitter';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
class ModalUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            gender: 'Male',
            phone: '',
            address1: '',
            address2: '',
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
            isEnabled: true,
            name: '',
            valueDate: null,
            idCard: '',
            positionId: '',
            idRoleList: [],
            idTypeList: [], 
            validPass: false
            // datetime: new Date().toISOString(),

        }

        this.listenToEmitter();

    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            //reset state
            console.log('listen emitter from parent: ')
            this.setState({
                userName: '',
                email: '',
                password: '',
                isEnabled: true,
                name: '',
                gender: '',
                phone: '',
                address: '',
                dateOfBirth: '',
                idCard: '',
                positionId: '',
                idRoleList: [],
                idTypeList: []
            })
        })
    }// bus event

    toggle = () => {
        this.props.toggleModalUser();
    }

    handleOnCheckBox = (e, id) => {
        var updatedList = [...this.state[id]];
        if (e.target.checked) {
            updatedList = [...this.state[id], Number(e.target.value)];
        } else {
            updatedList.splice(this.state[id].indexOf(Number(e.target.value)), 1);
        }
        if (id === 'idRoleList') {
            this.setState({
                idRoleList: updatedList
            }, () => {
                console.log('this.state', this.state)
            })
        } else {
            this.setState({
                idTypeList: updatedList
            }, () => {
                console.log('this.state', this.state)
            })
        }
    }

    handleOnChangeText = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        }, () => {
            console.log('check state', this.state)
        })
    }

    handleOnChangeDate = (e) => {
        this.setState({
            dateOfBirth: e.target.value
        }, () => {
            console.log('check state', this.state)
        })
    }

    handleOnChangeActive = (e) => {

        if (e.target.checked) {
            this.setState({
                isEnabled: (e.target.value === 'true')
            }, () => {
                console.log('check state', this.state)
            })
        }

    }

    handleOnChangeGender = (e) => {
        this.setState({
            gender: e.target.value
        }, () => {
            console.log('check state', this.state)
        })  
    }

    handleBlur = () => {
        if(this.state.password !== this.state.confirmPassword){
            this.setState({
                validPass: true
            }, console.log(this.state.validPass))
        }else{
            this.setState({
                validPass: false
            }, console.log(this.state.validPass))
        }
        
    }

    renderPasswordConfirmError = () => {
        if (this.state.validPass === true && this.state.password !== this.state.confirmPassword) {
            console.log("this.state.validPass: ", this.state.validPass)
            return (
              <div>
                <label className="error-pass">Please enter the same password again.</label>
              </div>
            );
        }
        return null;
    }

    // handleChange(e) {
    //     console.log("Fruit Selected!!");
    //     this.setState({ fruit: e.target.value });
    // }

    handleOnChangePos = (e) => {
        if (e.target.checked) {
            this.setState({
                positionId: Number(e.target.value),
            }, () => {
                console.log('check state', this.state)
            })
        }
    }

    checkValidInput = () => {
        let isValid = true;
        let arrInput = ['userName', 'email', 'password', 'name', 'gender','address1', 'address2']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleAddNew = () => {
        let isValid = this.checkValidInput();
        console.log('check isValid', isValid)
        if (isValid === true) {
            let data = {
                userName: this.state.userName,
                email: this.state.email,
                password: this.state.password,
                isEnabled: true,
                firstName: '',
                lastName: '',
                gender: '',
                phone: '',
                address: '',
                dateOfBirth: '',
                idCard: '',
                positionId: '',
                idRoleList: [],
                idTypeList: []
            }
            this.props.createNew(data);
        }
        //console.log('check state', this.state)
    }

    setValueDate = (newValue) => {
        this.setState({
            valueDate: newValue
        }, () => {
            var dt = this.state.valueDate['$d']
            console.log('check string dt', dt.toString())
        })
    }

    componentDidMount() {

    }

    render() {
        //console.log('check createNew props ', this.props.createNew())
        let arrPos = this.props.arrPos;
        let arrRole = this.props.arrRole;
        let arrType = this.props.arrType;

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modaluser-class'}
                size="lg"
                centered
            >
                <ModalHeader toggle={() => this.toggle()}>Add New User</ModalHeader>
                <ModalBody>
                    <div className="formbold-main-wrapper">
                        <div className="formbold-form-wrapper">
                            <img src="assets/img/banner.png" class="img-fluid" alt="" />
                            <form action="https://formbold.com/s/FORM_ID" method="POST">
                                <div className="formbold-input-flex">
                                    <div>
                                        <label htmlFor="firstName" className="formbold-form-label">
                                            {" "}
                                            First Name{" "}
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            placeholder="Your first name"
                                            className="formbold-form-input"
                                            onChange={(e) => this.handleOnChangeText(e, 'firstName')}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="formbold-form-label">
                                            {" "}
                                            Last Name{" "}
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            placeholder="Your last name"
                                            className="formbold-form-input"
                                            onChange={(e) => this.handleOnChangeText(e, 'lastName')}
                                        />
                                    </div>
                                </div>

                                <div className="formbold-input-flex">
                                    <div>
                                        <label htmlFor="dob" className="formbold-form-label">
                                            {" "}
                                            Date of Birth{" "}
                                        </label>
                                        <input
                                            type="date"
                                            name="dob"
                                            id="dob"
                                            onChange={this.handleOnChangeDate}
                                            className="formbold-form-input"
                                        />

                                    </div>
                                    <div>
                                        <label className="formbold-form-label">Gender</label>
                                        <select
                                            className="formbold-form-input"
                                            name="occupation"
                                            id="occupation"
                                            value={this.state.gender} 
                                            onChange={this.handleOnChangeGender}
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="others">Others</option>
                                            {/* {options.map((option) => (
                                                <option value={option.value}>{option.label}</option>
                                            ))} */}
                                        </select>
                                    </div>
                                </div>

                                <div className="formbold-mb-3 formbold-input-wrapp">
                                    <label htmlFor="phone" className="formbold-form-label">
                                        {" "}
                                        Phone{" "}
                                    </label>
                                    <div>
                                        <input
                                            type="text"
                                            name="areacode"
                                            id="areacode"
                                            placeholder="+84"
                                            className="formbold-form-input formbold-w-15"
                                        />
                                        <input
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            placeholder="Phone number"
                                            className="formbold-form-input"
                                            onChange={(e) => this.handleOnChangeText(e, 'phone')}
                                        />
                                    </div>
                                </div> 
                                <br/>                
                                <div className="formbold-mb-3 ">
                                    <label htmlFor="address1" className="formbold-form-label">
                                        {" "}
                                        Address{" "}
                                    </label>
                                    <input
                                        type="text"
                                        name="address1"
                                        id="address1"
                                        placeholder="Street address"
                                        className="formbold-form-input formbold-mb-3"
                                        onChange={(e) => this.handleOnChangeText(e, 'address1')}
                                    />
                                    <input
                                        type="text"
                                        name="address2"
                                        id="address2"
                                        placeholder="Street address line 2"
                                        className="formbold-form-input"
                                        onChange={(e) => this.handleOnChangeText(e, 'address2')}
                                    />
                                </div>
                                <br/>  


                                <div className="formbold-input-flex">
                                    <div>
                                        <label htmlFor="userName" className="formbold-form-label">
                                            {" "}
                                            User Name{" "}
                                        </label>
                                        <input
                                            id="userName"
                                            name="userName"
                                            placeholder="Your user name"
                                            type="text"
                                            onChange={(e) => this.handleOnChangeText(e, 'userName')}
                                            className="formbold-form-input"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="formbold-form-label">
                                            {" "}
                                            Email{" "}
                                        </label>
                                        <input
                                            id="email"
                                            placeholder="Your email"
                                            className="formbold-form-input"
                                            name="email"
                                            onChange={(e) => this.handleOnChangeText(e, 'email')}
                                        />
                                    </div>
                                </div>
                                <div className="formbold-input-flex">
                                    <div>
                                        <label htmlFor="password" className="formbold-form-label">
                                            {" "}
                                            Password{" "}
                                        </label>
                                        <input
                                            className="formbold-form-input"
                                            id="password"
                                            name="password"
                                            placeholder="Your password"
                                            type="password"
                                            onChange={(e) => this.handleOnChangeText(e, 'password')}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword" className="formbold-form-label">
                                            {" "}
                                            Confirm Password{" "}
                                        </label>
                                        <input
                                            className="formbold-form-input"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            placeholder="Your confirm password"
                                            type="password"
                                            onBlur={this.handleBlur}
                                            onChange={(e) => this.handleOnChangeText(e, 'confirmPassword')}
                                        />
                                    </div>
                                   
                                </div>
                                {this.renderPasswordConfirmError()}
                                <br/>                
                                <div htmlFor="active" className="formbold-input-flex">
                                    <div>
                                        <label className="formbold-form-label">
                                            {" "}
                                            Active{" "}
                                        </label>

                                        <label className="label-radio">
                                            <input
                                                name="isEnabled"
                                                type="radio"
                                                onChange={(e) => this.handleOnChangeActive(e)}
                                                value={true}
                                                checked={this.state.isEnabled === true ? "true" : ""}
                                            />TRUE
                                        </label>
                                        {` `}
                                        <label className="label-radio">
                                            <input
                                                name="isEnabled"
                                                type="radio"
                                                onChange={(e) => this.handleOnChangeActive(e)}
                                                value={false}
                                            />FALSE
                                        </label>

                                    </div>

                                    <div>
                                        <label htmlFor="accType" className="formbold-form-label">
                                            {" "}
                                            Account Type{" "}
                                        </label>
                                        {arrType && arrType.map((item, index) => {
                                            return (
                                                <label className="label-radio" key={index}>
                                                    <input
                                                        name="idTypeList"
                                                        type="checkbox"
                                                        value={item.id}
                                                        onChange={(e) => this.handleOnCheckBox(e, 'idTypeList')}
                                                    />{item.name}{` `}
                                                </label>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div htmlFor="active" className="formbold-input-flex">
                                    <div>
                                        <label htmlFor="accType" className="formbold-form-label">
                                            {" "}
                                            Account Role{" "}
                                        </label>
                                        {arrRole && arrRole.map((item, index) => {
                                            return (
                                                <label className="label-radio" key={index}>
                                                    <input
                                                        name="idRoleList"
                                                        type="checkbox"
                                                        value={item.id}
                                                        onChange={(e) => this.handleOnCheckBox(e, 'idRoleList')}
                                                    />{item.name}{` `}
                                                </label>
                                            )
                                        })}
                                    </div>
                                    <div>
                                        <label htmlFor="position" className="formbold-form-label">
                                            {" "}
                                            Position{" "}
                                        </label>
                                        {arrPos && arrPos.map((item, index) => {
                                            return (
                                                <label className="label-radio" key={index}>
                                                    <input
                                                        name="positionId"
                                                        type="radio"
                                                        value={item.id}
                                                        onChange={(e) => this.handleOnChangePos(e)}
                                                    />{item.name}{` `}
                                                </label>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* <div className="formbold-mb-3">
                                    <label htmlFor="message" className="formbold-form-label">
                                        Cover Letter
                                    </label>
                                    <textarea
                                        rows={6}
                                        name="message"
                                        id="message"
                                        className="formbold-form-input"
                                        defaultValue={""}
                                    />
                                </div> 
                                <div className="formbold-form-file-flex">
                                    <label htmlFor="upload" className="formbold-form-label">
                                        Upload Resume
                                    </label>
                                    <input
                                        type="file"
                                        name="upload"
                                        id="upload"
                                        className="formbold-form-file"
                                    />
                                </div>
                                <button className="formbold-btn">Apply Now</button> */}
                            </form>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary px-3"
                        onClick={() => { this.handleAddNew() }}
                    >Add new</Button>{' '}
                    <Button color="secondary px-3" onClick={this.toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
