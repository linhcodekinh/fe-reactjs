import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPositions, getAllRole, getAllType, createNewUser } from '../../../services/userService';
import './UserAdd.scss';
import history from '../../../routes/history.js'
import { path } from '../../../utils/constant.js'

import { ToastUtil } from '../../../utils'
import { FormattedMessage, FormattedTime } from 'react-intl';

class UserAdd extends Component {

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
            email1: '',
            email2: '',
            password: '',
            confirmPassword: '',
            isEnabled: true,
            name: '',
            valueDate: null,
            idCard: '',
            positionId: '',
            idRoleList: [],
            idTypeList: [],
            validPass: false,
            arrPos: [],
            arrRole: [],
            arrType: [],
            progress: 0
            // datetime: new Date().toISOString(),
        }
        console.log(this.props)
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
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                validPass: true
            }, console.log(this.state.validPass))
        } else {
            this.setState({
                validPass: false
            }, console.log(this.state.validPass))
        }

    }

    renderPasswordConfirmError = () => {
        if (this.state.validPass === true && this.state.password !== this.state.confirmPassword) {
            console.log("this.state.validPass: ", this.state.validPass)
            return (
                <label className="error-pass formbold-form-label">Please enter the same password again.</label>
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
        let arrInput = ['userName', 'email', 'email1', 'email2', 'password', 'firstName', 'lastName', 'gender', 'address1', 'address2']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                ToastUtil.show('WARN', 'common.warn', 'Missing parameter: ' + arrInput[i], false)
                document.getElementById(arrInput[i]).focus()
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
                email: this.state.email + "@" + this.state.email1 + "." + this.state.email2,
                password: this.state.password,
                isEnabled: this.state.isEnabled,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                gender: this.state.gender,
                phone: this.state.phone,
                address: this.state.address1 + " | " + this.state.address2,
                dateOfBirth: this.state.dateOfBirth,
                idCard: 'test',
                positionId: this.state.positionId,
                idRoleList: this.state.idRoleList,
                idTypeList: this.state.idTypeList
            }
            this.createNew(data);
        }
        //console.log('check state', this.state)
    }

    createNew = async (data) => {
        try {
            let res = await createNewUser(data)
            if (res[0] && !res[0].bindingFailure) {
                alert(res[0].defaultMessage)
            } else if (res && res.message) {
                alert(res.message)
                //history.go(-1)
                ToastUtil.show('SUCCESS', 'common.confirm', 'common.confirm', false)
                history.push({ pathname: path.admin.USER, view: 'view' })
            }
            console.log('response create user: ', res)
        } catch (e) {
            console.log(e)
        }
    }

    async componentDidMount() {
        let responsePos = await getAllPositions();
        let responseRole = await getAllRole();
        let responseType = await getAllType();

        if (responsePos) {
            this.setState({
                arrPos: responsePos
            })
        }

        if (responseRole) {
            this.setState({
                arrRole: responseRole
            })
        }

        if (responseType) {
            this.setState({
                arrType: responseType
            })
        }
        this.props.setProgress(100);
    }


    showToastMessage = () => {
        let dataMessage = ['common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm', 'common.confirm']
        ToastUtil.show('INFO', 'common.confirm', 'common.confirm', false)
    }



    render() {
        //console.log('check createNew props ', this.props.createNew())
        let arrPos = this.state.arrPos;
        let arrRole = this.state.arrRole;
        let arrType = this.state.arrType;

        return (
            <>
                <div className="container-fluid">

                </div>
                <div className="container-fluid">
                    <div className='row'>

                    </div>
                    <div className='row'>
                        <h1 className="h3 mb-2 text-gray-800">Account {">"} Add</h1>
                        <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below.
                            For more information about DataTables, please visit the <a target="_blank"
                                href="https://datatables.net">official DataTables documentation</a>.</p>
                        {/* <button onClick={this.showToastMessage}>Notify</button> */}
                    </div>
                    {/* formbold-main-wrapper */}
                    <div className='row'>
                        <div className="col-lg-4">
                            <img src="assets/img/banner.png" className="img-fluid" alt="" />
                            <div className="formbold-form-wrapper">
                                <div className="formbold-input-flex">
                                    <div>
                                        <label htmlFor="firstName" className="formbold-form-label">
                                            {" "}
                                            <FormattedMessage id="system.user-manage.first-name" />{" "}
                                        </label>
                                        <input
                                            autoFocus
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
                                            <FormattedMessage id="system.user-manage.last-name" />{" "}
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
                                            <FormattedMessage id="system.user-manage.date-of-birth" />{" "}
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
                                        <label className="formbold-form-label"><FormattedMessage id="system.user-manage.gender" /></label>
                                        <select
                                            className="formbold-form-input"
                                            name="occupation"
                                            id="occupation"
                                            value={this.state.gender}
                                            onChange={this.handleOnChangeGender}
                                        >
                                            <FormattedMessage id='system.user-manage.male' key={'op' + '-' + '0'}>
                                                {(message) => <option value='0'>{message}</option>}
                                            </FormattedMessage>
                                            <FormattedMessage id='system.user-manage.female' key={'op' + '-' + '1'}>
                                                {(message) => <option value='1'>{message}</option>}
                                            </FormattedMessage>
                                            <FormattedMessage id='system.user-manage.others' key={'op' + '-' + '2'}>
                                                {(message) => <option value='2'>{message}</option>}
                                            </FormattedMessage>
                                            {/* <option value="1"><FormattedMessage id="system.user-manage.gender" /></option>
                                            <option value="2"><FormattedMessage id="system.user-manage.gender" /></option> */}
                                            {/* {options.map((option) => (
                                        <option value={option.value}>{option.label}</option>
                                    ))} */}
                                        </select>
                                    </div>
                                </div>

                                <div className="formbold-mb-3 formbold-input-wrapp">
                                    <label htmlFor="phone" className="formbold-form-label">
                                        {" "}
                                        <FormattedMessage id="system.user-manage.phone-number" />{" "}
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
                                {/* <br /> */}
                                <div className="formbold-mb-3 ">
                                    <label htmlFor="address1" className="formbold-form-label">
                                        {" "}
                                        <FormattedMessage id="system.user-manage.address" />{" "}
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
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <img src="assets/img/banner.png" className="img-fluid" alt="" />
                            <div className="formbold-form-wrapper">
                                <div className="formbold-input-flex">
                                    <div>
                                        <label htmlFor="userName" className="formbold-form-label">
                                            {" "}
                                            <FormattedMessage id="system.user-manage.user-name" />{" "}
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
                                </div>
                                <div className="formbold-mb-3 formbold-input-wrapp">
                                    <label htmlFor="email" className="formbold-form-label">
                                        {" "}
                                        <FormattedMessage id="system.user-manage.email" />{" "}
                                    </label>
                                    <div>
                                        <input
                                            type="text"
                                            name="email"
                                            id="email"
                                            placeholder="youremail123"
                                            className="formbold-form-input"
                                            onChange={(e) => this.handleOnChangeText(e, 'email')}
                                        />
                                        <p className='p-email'>@</p>
                                        <input
                                            type="text"
                                            name="email1"
                                            id="email1"
                                            placeholder="email"
                                            className="formbold-form-input formbold-w-35"
                                            onChange={(e) => this.handleOnChangeText(e, 'email1')}
                                        />
                                        <p className='p-email'>.</p>
                                        <input
                                            type="text"
                                            name="email2"
                                            placeholder="com"
                                            id="email2"
                                            className="formbold-form-input formbold-w-35"
                                            onChange={(e) => this.handleOnChangeText(e, 'email2')}
                                        />
                                    </div>
                                </div>
                  
                                <div className="formbold-input-flex">
                                    <div>
                                        <label htmlFor="password" className="formbold-form-label">
                                            {" "}
                                            <FormattedMessage id="system.user-manage.password" />{" "}
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
                                            <FormattedMessage id="system.user-manage.retype-password" />{" "}
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
                                <div className="formbold-mb-3 formbold-input-wrapp">
                                    {this.renderPasswordConfirmError()}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <img src="assets/img/banner.png" className="img-fluid" alt="" />
                            <div className="formbold-form-wrapper">
                                <div htmlFor="active" className="formbold-input-flex">
                                    <div>
                                        <label className="formbold-form-label">
                                            {" "}
                                            <FormattedMessage id="system.user-manage.active" />{" "}
                                        </label>

                                        <label className="label-radio">
                                            <input
                                                name="isEnabled"
                                                type="radio"
                                                onChange={(e) => this.handleOnChangeActive(e)}
                                                value={true}
                                                checked={this.state.isEnabled === true ? "true" : ""}
                                            />{" "}<FormattedMessage id="system.user-manage.true" />
                                        </label>
                                        <br />
                                        <label className="label-radio">
                                            <input
                                                name="isEnabled"
                                                type="radio"
                                                onChange={(e) => this.handleOnChangeActive(e)}
                                                value={false}
                                            />{" "}<FormattedMessage id="system.user-manage.false" />
                                        </label>

                                    </div>
                                    <div>
                                        <label htmlFor="accType" className="formbold-form-label">
                                            {" "}
                                            <FormattedMessage id="system.user-manage.account-type" />{" "}
                                        </label>
                                        {arrType && arrType.map((item, index) => {
                                            return (
                                                <>
                                                    <label className="label-radio" key={index}>
                                                        <input
                                                            name="idTypeList"
                                                            type="checkbox"
                                                            value={item.id}
                                                            onChange={(e) => this.handleOnCheckBox(e, 'idTypeList')}
                                                        />{" "}{item.name}
                                                    </label>
                                                    <br />
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div htmlFor="role" className="formbold-input-flex">
                                    <div>
                                        <label htmlFor="accRole" className="formbold-form-label">
                                            {" "}
                                            <FormattedMessage id="system.user-manage.account-role" />{" "}
                                        </label>
                                        {arrRole && arrRole.map((item, index) => {
                                            return (
                                                <>
                                                    <label className="label-radio" key={index}>
                                                        <input
                                                            name="idRoleList"
                                                            type="checkbox"
                                                            value={item.id}
                                                            onChange={(e) => this.handleOnCheckBox(e, 'idRoleList')}
                                                        />{" "}{item.name}
                                                    </label>
                                                    <br />
                                                </>
                                            )
                                        })}
                                    </div>
                                    <div>
                                        <label htmlFor="position" className="formbold-form-label">
                                            {" "}
                                            <FormattedMessage id="system.user-manage.position" />{" "}
                                        </label>
                                        {arrPos && arrPos.map((item, index) => {
                                            return (
                                                <>
                                                    <label className="label-radio" key={index}>
                                                        <input
                                                            name="positionId"
                                                            type="radio"
                                                            value={item.id}
                                                            onChange={(e) => this.handleOnChangePos(e)}
                                                        />{" "}{item.name}
                                                    </label>
                                                    <br />
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="formbold-mb-3">
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
                            </div>
                        </div>
                    </div>
                    <button
                        className="formbold-btn"
                        onClick={() => { this.handleAddNew() }}
                    >
                        Apply Now
                    </button>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserAdd);
