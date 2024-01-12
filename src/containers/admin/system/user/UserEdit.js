import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPositions, getAllRole, getAllType, createNewUser, getUser } from '../../../../services/userService.js';
import './UserAdd.scss';
import history from '../../../../routes/history.js'
import { path } from '../../../../utils/constant.js'

import { ToastUtil } from '../../../../utils/index.js'
import { FormattedMessage, FormattedTime } from 'react-intl';
import { setContentOfConfirmModal } from '../../../../store/actions/appActions.js';
import { ThreeDots, Audio, RevolvingDot, RotatingLines } from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { changeUserView } from '../../../../store/actions/userActions';
import { fetchAllPosStart, fetchAllRoleStart, fetchAllTypeStart, getAUserStart } from '../../../../store/actions/userManageActions.js';

class UserEdit extends Component {

    constructor(props) {
        super(props)
        this.dataInsert = {}
        this.state = {
            aUser: {},
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            gender: '2',
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
            showSpinner: false,
            showPos: false,
            isAUserLoading: true
            // datetime: new Date().toISOString(),
        }

        console.log(this.props)
    }

    handleOnCheckBox = (e, id) => {
        console.log('e', e.target.value)
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
                idTypeList: updatedList,
                showPos: updatedList.includes(2) ? true : false
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
                idTypeList: [...this.state.idTypeList, 1]
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

    componentDidMount() {
        let idLocalStorage = JSON.parse(localStorage.getItem("persist:userManage")).userIdEdit;
        this.props.getAUserStart(this.props.userIdEditRedux || idLocalStorage);
        this.props.fetchAllRoleStart();
        this.props.fetchAllTypeStart();
        this.props.fetchAllPosStart();

        this.props.setProgress(100);
    }

    componentDidUpdate = (preProps, prevState, snapshot) => {
        if (preProps.aUserRedux !== this.props.aUserRedux) {
            console.log('this.props.aUserRedux.isEnabled ', this.props.aUserRedux.isEnabled)
            this.setState({
                idRoleList: this.props.aUserRedux.arrRoleId,
                idTypeList: this.props.aUserRedux.arrTypeId,
                positionId: this.props.aUserRedux.employee && this.props.aUserRedux.employee.position.id,
                showPos : (this.props.aUserRedux.employee) !== null,
                isAUserLoading: this.props.isAUserLoadingRedux,

                firstName: this.props.aUserRedux.member.firstName,
                lastName: this.props.aUserRedux.member.lastName,
                dateOfBirth: this.props.aUserRedux.member.dateOfBirth,
                gender: this.props.aUserRedux.member.gender,
                phone: this.props.aUserRedux.member.phone,
                address1: this.props.aUserRedux.member.address1,
                address2: this.props.aUserRedux.member.address2,
                isEnabled: this.props.aUserRedux.isEnabled,
                userName: this.props.aUserRedux.userName,
                email: this.props.aUserRedux.email,
                email1: this.props.aUserRedux.email1,
                email2: this.props.aUserRedux.email2,

            }, () => {
                //console.log("this.state edit", this.state)
            })
            //this.props.getAUserStart(this.props.userIdEditRedux);
        }

        if (preProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                arrRole: this.props.roleRedux,
            })
        }
        if (preProps.typeRedux !== this.props.typeRedux) {
            this.setState({
                arrType: this.props.typeRedux,
            })
        }
        if (preProps.posRedux !== this.props.posRedux) {
            this.setState({
                arrPos: this.props.posRedux,
            })
        }
    }

    changeUserView = (view) => {
        console.log("changeView ", view)
        this.props.changeUserView(view)
    }


    render() {
        console.log('this.state.isEnabled ', this.state)
        let arrRole = this.state.arrRole;
        let arrType = this.state.arrType;
        let arrPos = this.state.arrPos;


        // for(let i=0 ; i < user.accountTypeList.length; i++){
        //     //arrUserTypeName[i++] = 
        //     //console.log(user.accountTypeList.type)
        // }
        return (
            <>
                <ThreeDots
                    visible={this.state.isAUserLoading}
                    height="60"
                    width="60"
                    color="#4e73df"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass="audio-class"
                />

                <div className="container-fluid">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3" >
                            <h1 className="h3 mb-2 text-gray-800">Account {">"} Edit</h1>
                            <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below.
                                For more information about DataTables, please visit the <a target="_blank"
                                    href="https://datatables.net">official DataTables documentation</a>.</p>
                            {/* <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6> */}
                            {/* <button onClick={() => this.handleAddNewUser()} className="btn btn-sm btn-primary btn-icon-split" style={{ float: "right" }}> */}
                            <Link to={{ pathname: '/admin/user-manage' }} onClick={() => this.changeUserView('view')}>
                                <button className="btn btn-sm btn-secondary btn-icon-split" style={{ float: "right" }}>
                                    <span className="icon text-white-50">
                                        <FontAwesomeIcon icon={['fas', 'fa-arrow-left']} />
                                    </span>
                                    <span className="text">Back</span>
                                </button>
                            </Link>

                        </div>
                        {/* formbold-main-wrapper */}
                        <div className={this.state.isAUserLoading ? 'disabled' : ''}>
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
                                                        value={this.state.firstName}
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
                                                        value={this.state.lastName}
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
                                                    value={this.state.dateOfBirth}
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
                                                    onChange={this.handleOnChangeGender}
                                                    defaultValue={this.state.gender}
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
                                                        value={this.state.phone}
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
                                                        value={this.state.address1}
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
                                                        value={this.state.address2}
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
                                                    value={this.state.userName}
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
                                                            value={this.state.email}
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
                                                            value={this.state.email1}
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
                                                            value={this.state.email2}
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
                                                {arrType && arrType.map((itemType, indexType) => {
                                                    if (itemType.name === "MEMBER") {
                                                        return (
                                                            <>
                                                                <label className="label-radio" key={indexType} disabled>
                                                                    <input
                                                                        checked
                                                                        name="idTypeList"
                                                                        type="checkbox"
                                                                        value={itemType.id}
                                                                    />{" "}{itemType.name}
                                                                </label>
                                                                <br />
                                                            </>
                                                        )
                                                    } else {
                                                        return (
                                                            <>
                                                                <label className="label-radio" key={indexType}>
                                                                    <input
                                                                        checked={this.state.idTypeList.includes(itemType.id)}
                                                                        name="idTypeList"
                                                                        type="checkbox"
                                                                        value={itemType.id}
                                                                        onChange={(e) => this.handleOnCheckBox(e, 'idTypeList')}
                                                                    />{" "}{itemType.name}
                                                                </label>
                                                                <br />
                                                            </>
                                                        )
                                                    }
                                                })}
                                            </div>
                                        </div>
                                        <div htmlFor="role" className="formbold-input-flex">
                                            <div>
                                                <label htmlFor="accRole" className="formbold-form-label">
                                                    {" "}
                                                    <FormattedMessage id="system.user-manage.account-role" />{" "}
                                                </label>
                                                {arrRole && arrRole.map((itemRole, indexRole) => {
                                                    return (
                                                        <>
                                                            <label className="label-radio" key={indexRole}>
                                                                <input
                                                                    checked={this.state.idRoleList.includes(itemRole.id) ? "true" : ""}
                                                                    name="idRoleList"
                                                                    type="checkbox"
                                                                    value={itemRole.id}
                                                                    onChange={(e) => this.handleOnCheckBox(e, 'idRoleList')}
                                                                />{" "}{itemRole.name}
                                                            </label>
                                                            <br />
                                                        </>
                                                    )
                                                })}
                                            </div>
                                            <div className={this.state.showPos ? "" : "hide-pos"}>
                                                <label htmlFor="position" className="formbold-form-label">
                                                    {" "}
                                                    <FormattedMessage id="system.user-manage.position" />{" "}
                                                </label>
                                                {arrPos && arrPos.map((item, index) => {
                                                    return (
                                                        <>
                                                            <label className="label-radio" key={index}>
                                                                <input
                                                                    checked={this.state.positionId === item.id ? "true" : ""}
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
                    </div>
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        contentOfConfirmModal: state.app.contentOfConfirmModal,
        aUserRedux: state.userManage.aUser,
        isAUserLoadingRedux: state.userManage.isAUserLoading,
        userIdEditRedux: state.userManage.userIdEdit,

        roleRedux: state.userManage.listAllRole,
        typeRedux: state.userManage.listAllType,
        posRedux: state.userManage.listAllPos

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeUserView: (view) => dispatch(changeUserView(view)),
        setContentOfConfirmModal: (contentOfConfirmModal) => dispatch(setContentOfConfirmModal(contentOfConfirmModal)),
        getAUserStart: (id) => dispatch(getAUserStart(id)),
        fetchAllRoleStart: () => dispatch(fetchAllRoleStart()),
        fetchAllTypeStart: () => dispatch(fetchAllTypeStart()),
        fetchAllPosStart: () => dispatch(fetchAllPosStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
