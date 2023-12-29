import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPositions, getAllRole, getAllType, createNewUser } from '../../../../services/userService.js';
import './UserAdd.scss';
import history from '../../../../routes/history.js'
import { path } from '../../../../utils/constant.js'

import { ToastUtil } from '../../../../utils/index.js'
import { FormattedMessage, FormattedTime } from 'react-intl';
import { setContentOfConfirmModal } from '../../../../store/actions/appActions.js';
import { ThreeDots, Audio, RevolvingDot, RotatingLines } from 'react-loader-spinner'

class UserEdit extends Component {

    constructor(props) {
        super(props)
        this.dataInsert = {}
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
            progress: 0,
            contentOfConfirmModal: {},
            showSpinner: false
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
            this.dataInsert = {
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
            this.setState({
                contentOfConfirmModal: { isOpen: true, messageId: "common.confirm-this-task", handleFunc: this.createNew, dataFunc: this.dataInsert }
            }, () => {
                this.props.setContentOfConfirmModal(this.state.contentOfConfirmModal)
            })
        }
    }

    createNew = async (data) => {
        try {
            this.setState({
                showSpinner: true
            })
            let res = await createNewUser(data)
            if (res[0] && !res[0].bindingFailure) {
                this.setState({
                    showSpinner: false
                }, () => {
                    ToastUtil.show('ERROR', 'common.unknown-error', res[0].defaultMessage, false)
                })
            } else if (res && res.message) {
                this.setState({
                    showSpinner: false
                }, () => {
                    ToastUtil.show('SUCCESS', 'common.confirm', res.message, false)
                })
                //history.go(-1)
                //history.push({ pathname: path.admin.USER, view: 'view' })
            }
            console.log('response create user: ', res)

        } catch (e) {
            console.log(e)
            throw e
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


    render() {
        //console.log('check createNew props ', this.props.createNew())
        let arrPos = this.state.arrPos;
        let arrRole = this.state.arrRole;
        let arrType = this.state.arrType;
        return (
            <>
                <ThreeDots
                    visible={this.state.showSpinner}
                    height="60"
                    width="60"
                    color="#4e73df"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass="audio-class"
                />
                {/* <Audio
                    height="60"
                    width="60"
                    radius="9"
                    color="green"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass="audio-class"
                /> */}

                {/* <RevolvingDot
                    visible={true}
                    height="5"
                    width="5"
                    color="#4fa94d"
                    ariaLabel="revolving-dot-loading"
                    wrapperStyle={{}}
                    wrapperClass="audio-class"
                /> */}
                {/* 
                <RotatingLines
                    visible={true}
                    height="96"
                    width="96"
                    color="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={}
                    wrapperClass="audio-class"
                /> */}

                <div className={this.state.showSpinner === true ? "container-fluid disabled" : "container-fluid"}>
                    <div className='row'>
                        <h1 className="h3 mb-2 text-gray-800">Account {">"} Edit</h1>
                        <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below.
                            For more information about DataTables, please visit the <a target="_blank"
                                href="https://datatables.net">official DataTables documentation</a>.</p>
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
                                        <FormattedMessage id='system.user-manage.input-first-name'>
                                            {(msg) => (<input
                                                autoFocus
                                                type="text"
                                                name="firstName"
                                                id="firstName"
                                                placeholder={msg}
                                                className="formbold-form-input"
                                                onChange={(e) => this.handleOnChangeText(e, 'firstName')}
                                            />)}
                                        </FormattedMessage>
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="formbold-form-label">
                                            {" "}
                                            <FormattedMessage id="system.user-manage.last-name" />{" "}
                                        </label>
                                        <FormattedMessage id='system.user-manage.input-last-name'>
                                            {(msg) => (<input
                                                type="text"
                                                name="lastName"
                                                id="lastName"
                                                placeholder={msg}
                                                className="formbold-form-input"
                                                onChange={(e) => this.handleOnChangeText(e, 'lastName')}
                                            />)}
                                        </FormattedMessage>
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
                                            className="formbold-form-input formbold-w-25"
                                        />
                                        <FormattedMessage id='system.user-manage.input-phone-number'>
                                            {(msg) => (<input
                                                type="text"
                                                name="phone"
                                                id="phone"
                                                placeholder={msg}
                                                className="formbold-form-input"
                                                onChange={(e) => this.handleOnChangeText(e, 'phone')}
                                            />)}
                                        </FormattedMessage>
                                    </div>
                                </div>
                                {/* <br /> */}
                                <div className="formbold-mb-3">
                                    <label htmlFor="address1" className="formbold-form-label">
                                        {" "}
                                        <FormattedMessage id="system.user-manage.address" />{" "}
                                    </label>
                                    <FormattedMessage id='system.user-manage.input-address1'>
                                        {(msg) => (
                                            <input
                                                type="text"
                                                name="address1"
                                                id="address1"
                                                placeholder={msg}
                                                className="formbold-form-input formbold-mb-3"
                                                onChange={(e) => this.handleOnChangeText(e, 'address1')}
                                            />
                                        )}
                                    </FormattedMessage>
                                    <FormattedMessage id='system.user-manage.input-address2'>
                                        {(msg) => (
                                            <input
                                                type="text"
                                                name="address2"
                                                id="address2"
                                                placeholder={msg}
                                                className="formbold-form-input"
                                                onChange={(e) => this.handleOnChangeText(e, 'address2')}
                                            />
                                        )}
                                    </FormattedMessage>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <img src="assets/img/banner.png" className="img-fluid" alt="" />
                            <div className="formbold-form-wrapper">
                                <div className="formbold-input-wrapp">
                                    <label htmlFor="userName" className="formbold-form-label">
                                        {" "}
                                        <FormattedMessage id="system.user-manage.user-name" />{" "}
                                    </label>
                                    <FormattedMessage id='system.user-manage.input-user-name'>
                                        {(msg) => (<input
                                            id="userName"
                                            name="userName"
                                            placeholder={msg}
                                            type="text"
                                            onChange={(e) => this.handleOnChangeText(e, 'userName')}
                                            className="formbold-form-input"
                                        />)}
                                    </FormattedMessage>
                                </div>
                                <div className="formbold-input-wrapp">
                                    <label htmlFor="email" className="formbold-form-label">
                                        {" "}
                                        <FormattedMessage id="system.user-manage.email" />{" "}
                                    </label>
                                    <div>
                                        <FormattedMessage id='system.user-manage.input-email'>
                                            {(msg) => (
                                                <input
                                                    type="text"
                                                    name="email"
                                                    id="email"
                                                    placeholder={msg}
                                                    className="formbold-form-input"
                                                    onChange={(e) => this.handleOnChangeText(e, 'email')}
                                                />
                                            )}
                                        </FormattedMessage>
                                        <p className='p-email'>@</p>
                                        <FormattedMessage id='system.user-manage.input-email1'>
                                            {(msg) => (
                                                <input
                                                    type="text"
                                                    name="email1"
                                                    id="email1"
                                                    placeholder={msg}
                                                    className="formbold-form-input formbold-w-35"
                                                    onChange={(e) => this.handleOnChangeText(e, 'email1')}
                                                />
                                            )}
                                        </FormattedMessage>
                                        <p className='p-email'>.</p>
                                        <FormattedMessage id='system.user-manage.input-email2'>
                                            {(msg) => (
                                                <input
                                                    type="text"
                                                    name="email2"
                                                    placeholder={msg}
                                                    id="email2"
                                                    className="formbold-form-input formbold-w-35"
                                                    onChange={(e) => this.handleOnChangeText(e, 'email2')}
                                                />
                                            )}
                                        </FormattedMessage>
                                    </div>
                                </div>

                                <div className="formbold-input-flex">
                                    <div>
                                        <label htmlFor="password" className="formbold-form-label">
                                            {" "}
                                            <FormattedMessage id="system.user-manage.password" />{" "}
                                        </label>
                                        <FormattedMessage id='system.user-manage.input-password'>
                                            {(msg) => (
                                                <input
                                                    className="formbold-form-input"
                                                    id="password"
                                                    name="password"
                                                    placeholder={msg}
                                                    type="password"
                                                    onChange={(e) => this.handleOnChangeText(e, 'password')}
                                                />
                                            )}
                                        </FormattedMessage>
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword" className="formbold-form-label">
                                            {" "}
                                            <FormattedMessage id="system.user-manage.retype-password" />{" "}
                                        </label>
                                        <FormattedMessage id='system.user-manage.input-retype-password'>
                                            {(msg) => (
                                                <input
                                                    className="formbold-form-input"
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    placeholder={msg}
                                                    type="password"
                                                    onBlur={this.handleBlur}
                                                    onChange={(e) => this.handleOnChangeText(e, 'confirmPassword')}
                                                />
                                            )}
                                        </FormattedMessage>
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
                        <FormattedMessage id="system.user-manage.add-user" />
                    </button>
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        contentOfConfirmModal: state.app.contentOfConfirmModal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setContentOfConfirmModal: (contentOfConfirmModal) => dispatch(setContentOfConfirmModal(contentOfConfirmModal))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
