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
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { changeUserView } from '../../../../store/actions/userActions';
import { fetchAllPosStart, fetchAllRoleStart, fetchAllTypeStart, addUserStart } from '../../../../store/actions/userManageActions';

class UserAdd extends Component {

    constructor(props) {
        super(props)
        this.dataInsert = {}
        this.state = {
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            gender: 0,
            phone: '',
            address1: '',
            address2: '',
            userName: '',
            password: '',
            confirmPassword: '',
            email: '',
            email1: '',
            email2: '',
            isEnabled: true,
            name: '',
            //valueDate: null,
            idCard: '',
            positionId: '',
            idRoleList: [],
            idTypeList: [],
            // validPass: false,
            arrPos: [],
            arrRole: [],
            arrType: [],
            progress: 0,
            contentOfConfirmModal: {},
            showSpinner: false,
            showPos: false,
            isAdd: false,
            isRoleLoading: true,
            isTypeLoading: true,
            isPosLoading: true,
            imageFile: '',
            srcPreview: ''
        }
    }

    handleOnChangeFile = (e) => {
        this.setState({
            imageFile: e.target.files[0],
            srcPreview: URL.createObjectURL(e.target.files[0])
        })
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
            gender: Number(e.target.value)
        }, () => {
            console.log('check state', this.state)
        })
    }

    handleBlur = () => {
        if (this.state.password !== this.state.confirmPassword) {
            ToastUtil.show('WARN', 'common.warn', 'Nhap lai mat khau khong dung ', false)
            this.setState({
                password: '',
                confirmPassword: ''
            })
            document.getElementById("password").focus()
        }
        // } else {
        //     this.setState({
        //         validPass: false
        //     }, console.log(this.state.validPass))
        // }
    }

    // renderPasswordConfirmError = () => {
    //     if (this.state.validPass === true && this.state.password !== this.state.confirmPassword) {
    //         console.log("this.state.validPass: ", this.state.validPass)
    //         return (
    //             <label className="error-pass formbold-form-label">Please enter the same password again.</label>
    //         );
    //     }
    //     return null;
    // }

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
        let arrInput = ['userName', 'email', 'email1', 'email2', 'password', 'firstName', 'gender', 'lastName', 'address1', 'address2']
        for (let i = 0; i < arrInput.length; i++) {
            if (this.state[arrInput[i]] === '') {
                isValid = false
                ToastUtil.show('WARN', 'common.warn', 'Missing parameter: ' + arrInput[i], false)
                document.getElementById(arrInput[i]).focus()
                break;
            }
        }
        return isValid;
    }

    handleBeforeAddNew = () => {
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
                address: this.state.address1 + "|" + this.state.address2,
                dateOfBirth: this.state.dateOfBirth,
                idCard: this.state.idCard,
                positionId: this.state.positionId,
                idRoleList: this.state.idRoleList,
                idTypeList: [...this.state.idTypeList, 1]
            }
            let formData = new FormData();
            formData.append("accountDetail", new Blob([JSON.stringify(this.dataInsert)], { type: "application/json" }));
            formData.append("imageFile", this.state.imageFile);
            this.setState({
                contentOfConfirmModal: { isOpen: true, messageId: "common.confirm-this-task", handleFunc: this.handleAddNew, dataFunc: formData }
            }, () => {
                this.props.setContentOfConfirmModal(this.state.contentOfConfirmModal)
            })
        }
    }

    handleAddNew = (data) => {
        this.setState({
            isAdd: true
        }, () => {
            this.props.addUserStart(data)
        })

    }

    // createNew = async (data) => {
    //     try {
    //         this.setState({
    //             showSpinner: true
    //         })
    //         let res = await createNewUser(data)
    //         if (res[0] && !res[0].bindingFailure) {
    //             this.setState({
    //                 showSpinner: false
    //             }, () => {
    //                 ToastUtil.show('ERROR', 'common.unknown-error', res[0].defaultMessage, false)
    //             })
    //         } else if (res && res.message) {
    //             this.setState({
    //                 showSpinner: false
    //             }, () => {
    //                 ToastUtil.show('SUCCESS', 'common.confirm', res.message, false)
    //             })
    //             //history.go(-1)
    //             //history.push({ pathname: path.admin.USER, view: 'view' })
    //         }
    //         console.log('response create user: ', res)

    //     } catch (e) {
    //         console.log(e)
    //         throw e
    //     }
    // }

    componentDidMount() {
        this.props.fetchAllRoleStart();
        this.props.fetchAllTypeStart();
        this.props.fetchAllPosStart();
        this.props.setProgress(100);
    }

    componentDidUpdate = (preProps, prevState, snapshot) => {
        if (preProps.isAddLoadingRedux !== this.props.isAddLoadingRedux) {
            this.setState({
                isAdd: false
            })
        }
        if (preProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                arrRole: this.props.roleRedux,
                isRoleLoading: this.props.isRoleLoadingRedux
            })
        }
        if (preProps.typeRedux !== this.props.typeRedux) {
            this.setState({
                arrType: this.props.typeRedux,
                isTypeLoading: this.props.isTypeLoadingRedux
            })
        }
        if (preProps.posRedux !== this.props.posRedux) {
            this.setState({
                arrPos: this.props.posRedux,
                isPosLoading: this.props.isPosLoadingRedux
            })
        }
    }

    changeUserView = (view) => {
        this.props.changeUserView(view)
    }


    render() {
        //console.log('check createNew props ', this.props.createNew())
        let arrPos = this.state.arrPos;
        let arrRole = this.state.arrRole;
        let arrType = this.state.arrType;
        let showLoading = (this.state.isAdd === true && this.props.isAddLoadingRedux === true) || (this.state.isRoleLoading === true && this.state.isTypeLoading === true && this.state.isPosLoading === true)
        return (
            <>
                <ThreeDots
                    visible={showLoading}
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

                <div className={showLoading ? "container-fluid disabled" : "container-fluid"}>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3" >
                            <div className='row'>
                                <div className='col-6'>
                                    <h4 className="mb-2 text-gray-800">Component {">"} Account</h4>
                                </div>
                                <div className='col-6'>
                                    <Link to={{ pathname: '/admin/user-manage' }} onClick={() => this.changeUserView('view')}>
                                        <button className="btn btn-sm btn-secondary btn-icon-split" style={{ float: "right" }}>
                                            <span className="icon text-white-50">
                                                <FontAwesomeIcon icon={['fas', 'fa-arrow-left']} />
                                            </span>
                                            <span className="text">Back</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
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
                                    <div className="formbold-input-flex">

                                        <div>
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

                                        <div>
                                            <label htmlFor="userName" className="formbold-form-label">
                                                {" "}
                                                <FormattedMessage id="system.user-manage.user-name" />{" "}
                                            </label>
                                            {/* <input
                                                type="file"
                                                name="upload"
                                                id="upload"
                                                className="formbold-form-input"
                                                onChange={(e) => this.handleOnChangeFile(e)}
                                            /> */}

                                            <div class="personal-image">
                                                <label class="label">
                                                    <input
                                                        type="file"
                                                        onChange={(e) => this.handleOnChangeFile(e)}
                                                    />
                                                    <div class="personal-figure">
                                                        <img src={this.state.srcPreview ? this.state.srcPreview : "assets/img/banner.png"} class="personal-avatar" alt="avatar" />
                                                        <div class="personal-figcaption">
                                                            <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" />
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>

                                        </div>
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
                                                        value={this.state.password}
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
                                                        value={this.state.confirmPassword}
                                                        onBlur={this.handleBlur}
                                                        onChange={(e) => this.handleOnChangeText(e, 'confirmPassword')}
                                                    />
                                                )}
                                            </FormattedMessage>
                                        </div>
                                    </div>
                                    {/* <div className="formbold-mb-3 formbold-input-wrapp">
                                        {this.renderPasswordConfirmError()}
                                    </div> */}
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

                                    </div>
                                    <div htmlFor="role" className="formbold-input-flex">
                                        <div>
                                            <label htmlFor="accType" className="formbold-form-label">
                                                {" "}
                                                <FormattedMessage id="system.user-manage.account-type" />{" "}
                                            </label>
                                            {arrType && arrType.map((item, index) => {
                                                if (item.name === "MEMBER") {
                                                    return (
                                                        <>
                                                            <label className="label-radio" key={index} disabled>
                                                                <input
                                                                    checked
                                                                    type="checkbox"
                                                                    value={item.id}
                                                                />{" "}{item.name}
                                                            </label>
                                                            <br />
                                                        </>
                                                    )
                                                } else {
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
                                                }
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
                                    <div className={this.state.showPos ? "formbold-input-flex" : "formbold-input-flex hide-pos"}>
                                        <div>
                                            <label htmlFor="idCard" className="formbold-form-label">
                                                <FormattedMessage id="system.user-manage.id-card" />
                                            </label>
                                            <FormattedMessage id='system.user-manage.input-id-card'>
                                                {(msg) => (<input
                                                    type="text"
                                                    name="idCard"
                                                    id="idCard"
                                                    placeholder={msg}
                                                    className="formbold-form-input"
                                                    onChange={(e) => this.handleOnChangeText(e, 'idCard')}
                                                />)}
                                            </FormattedMessage>
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
                                    </div>*/}
                                    {/* <div className="formbold-form-file-flex">
                                        <label htmlFor="upload" className="formbold-form-label">
                                            Upload Image
                                        </label>
                                        <input
                                            type="file"
                                            multiple
                                            name="upload"
                                            id="upload"
                                            className="formbold-form-file"
                                            onChange={(e) => this.handleOnChangeFile(e)}
                                        />
                                    </div> */}

                                    {/* <form enctype="multipart/form-data" id="fileUploadForm" action="link">
                                            <input
                                                type="file"
                                                name="image"
                                            />
                                        </form> */}


                                </div>
                            </div>
                        </div>
                        <button
                            className="formbold-btn"
                            onClick={() => { this.handleBeforeAddNew() }}
                        >
                            <FormattedMessage id="system.user-manage.add-user" />
                        </button>
                    </div>
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        roleRedux: state.userManage.listAllRole,
        typeRedux: state.userManage.listAllType,
        posRedux: state.userManage.listAllPos,
        isAddLoadingRedux: state.userManage.isAddLoading,
        isRoleLoadingRedux: state.userManage.isRoleLoading,
        isTypeLoadingRedux: state.userManage.isTypeLoading,
        isPosLoadingRedux: state.userManage.isPosLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeUserView: (view) => dispatch(changeUserView(view)),
        setContentOfConfirmModal: (contentOfConfirmModal) => dispatch(setContentOfConfirmModal(contentOfConfirmModal)),
        addUserStart: (data, imageFile) => dispatch(addUserStart(data, imageFile)),
        fetchAllRoleStart: () => dispatch(fetchAllRoleStart()),
        fetchAllTypeStart: () => dispatch(fetchAllTypeStart()),
        fetchAllPosStart: () => dispatch(fetchAllPosStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAdd);
