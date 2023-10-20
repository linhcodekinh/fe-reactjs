import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import backgroundImg from '../../assets/images/bg-01.jpg'
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
        // console.log(event.target.value);
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
        // console.log(event.target.value);
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            // let data1 = await handleLoginApi(this.state.username, this.state.password).then(res => {
            //     console.log('linh1', res[0].code);
            // });
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.token != null) {
                this.props.userLoginSuccess(data.account)
                console.log('login succeeds')
            } else {
                console.log("login loi");
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    if (e.response.data[0]) {
                        this.setState({
                            errMessage: e.response.data[0].defaultMessage
                        })
                    }
                    else {
                        this.setState({
                            errMessage: 'Tên đăng nhập hoặc mật khẩu không đúng'
                        })
                    }
                }
            }
            console.log('linh', e.response);
        }
    }

    handleShowAndHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        //JSX
        return (
            <div>
                <div className="limiter">
                    <div className="container-login100" style={{ backgroundImage: `url(${backgroundImg})` }}>
                        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                            <div className="login100-form">
                                {/* <form className="login100-form"> */}
                                <span className="login100-form-title p-b-49">
                                    Login
                                </span>
                                <div className="wrap-input100 validate-input m-b-23" data-validate="Username is reauired">
                                    <span className="label-input100">Username</span>
                                    <input
                                        className="input100"
                                        type="text"
                                        name="username"
                                        placeholder="Type your username"
                                        value={this.state.username}
                                        onChange={(event) => this.handleOnChangeUsername(event)}
                                    />
                                    <span className="focus-input100" data-symbol="&#10146;" />
                                </div>
                                <div className="wrap-input100 validate-input" data-validate="Password is required">
                                    <span className="label-input100">Password</span>

                                    <input
                                        className="input100"
                                        type={this.state.isShowPassword ? 'text' : 'password'}
                                        name="pass"
                                        placeholder="Type your password"
                                        value={this.state.password}
                                        onChange={(event) => this.handleOnChangePassword(event)}
                                    />
                                    <span className="focus-input100" data-symbol="&#10146;" />
                                    <span
                                        onClick={() => { this.handleShowAndHidePassword() }}
                                    >
                                        <FontAwesomeIcon className="ffar" icon={this.state.isShowPassword ? ['far', 'eye'] : ['far', 'eye-slash']} />
                                    </span>
                                </div>
                                <div className='col-12' style={{ color: 'red' }}>
                                    {this.state.errMessage}
                                </div>
                                <div className="text-right p-t-8 p-b-31">
                                    <a href="#">
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="container-login100-form-btn">
                                    <div className="wrap-login100-form-btn">
                                        <div className="login100-form-bgbtn" />
                                        <button
                                            className="login100-form-btn"
                                            onClick={() => { this.handleLogin() }}
                                        >
                                            Login
                                        </button>
                                    </div>
                                </div>
                                <div className="txt1 text-center p-t-54 p-b-20">
                                    <span>
                                        Or Sign Up Using
                                    </span>
                                </div>
                                <div className="flex-c-m">
                                    <a href="#" className="login100-social-item bg1">
                                        <FontAwesomeIcon icon={['fab', 'facebook']} />
                                    </a>
                                    <a href="#" className="login100-social-item bg2">
                                        <FontAwesomeIcon icon={['fab', 'twitter']} />
                                    </a>
                                    <a href="#" className="login100-social-item bg3">
                                        <FontAwesomeIcon icon={['fab', 'google']} />
                                    </a>
                                </div>
                                <div className="flex-col-c p-t-155">
                                    <span className="txt1 p-b-17">
                                        Or Sign Up Using
                                    </span>
                                    <a href="#" className="txt2">
                                        Sign Up
                                    </a>
                                </div>
                                {/* </form> */}
                            </div>

                        </div>
                    </div>
                </div>
                <div id="dropDownSelect1" />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
