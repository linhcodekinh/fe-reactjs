import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import backgroundImg from '../../assets/images/bg-01.jpg'
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
        console.log(event.target.value);
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
        console.log(event.target.value);
    }

    handleLogin = async () => {
        console.log('all state: ', this.state);
        try {
            await handleLoginApi(this.state.username, this.state.password);
        } catch (e) {
            console.log(e);
        }
    }

    handleShowAndHidePassword = () => {
        this.setState({
            isShowPassword : !this.state.isShowPassword
        })
    }

    render() {
        //JSX
        return (
            <div>
            <div className="limiter">
            <div className="container-login100" style={{backgroundImage: `url(${backgroundImg})`}}>
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
                        value = {this.state.username}
                        onChange = {(event) => this.handleOnChangeUsername(event)}
                    />
                    <span className="focus-input100" data-symbol="" />
                    </div>
                    <div className="wrap-input100 validate-input" data-validate="Password is required">
                    <span className="label-input100">Password</span>
               
                        <input 
                            className="input100" 
                            type={this.state.isShowPassword ? 'text' : 'password'}
                            name="pass" 
                            placeholder="Type your password"
                            value= {this.state.password}
                            onChange = {(event) => this.handleOnChangePassword(event)}
                        />
                        <span
                            onClick={() => {this.handleShowAndHidePassword()}}
                        >
                            <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                        </span>
            
                    <span className="focus-input100" data-symbol="" />
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
                        onClick={()=>{this.handleLogin()}}
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
                        <i className="fab fa-facebook-f" />
                    </a>
                    <a href="#" className="login100-social-item bg2">
                        <i className="fab fa-twitter" />
                    </a>
                    <a href="#" className="login100-social-item bg3">
                        <i className="fab fa-google" />
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
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
