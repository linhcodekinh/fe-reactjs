import React, { Component } from 'react';
import { connect } from 'react-redux';
import './scss/Footer.scss';
class Footer extends Component {

    render() {
        return (
            <>
                <footer id="footer " className="footer ">
                    <div className="footer-content ">
                        <div className="container ">
                            <div className="row gy-4 ">
                                <div className="col-lg-5 col-md-12 footer-info ">
                                    <a href="index.html " className="logo d-flex align-items-center ">
                                        <span>Nova</span>
                                    </a>
                                    <p>Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita valies darta donna mare fermentum iaculis eu non diam phasellus.</p>
                                    <div className="social-links d-flex mt-3 ">
                                        <a href="# " className="twitter "><i className="bi bi-twitter "></i></a>
                                        <a href="# " className="facebook "><i className="bi bi-facebook "></i></a>
                                        <a href="# " className="instagram "><i className="bi bi-instagram "></i></a>
                                        <a href="# " className="linkedin "><i className="bi bi-linkedin "></i></a>
                                    </div>
                                </div>

                                <div className="col-lg-2 col-6 footer-links ">
                                    <h4>Useful Links</h4>
                                    <ul>
                                        <li><i className="bi bi-dash "></i> <a href="# ">Home</a></li>
                                        <li><i className="bi bi-dash "></i> <a href="# ">About us</a></li>
                                        <li><i className="bi bi-dash "></i> <a href="# ">Services</a></li>
                                        <li><i className="bi bi-dash "></i> <a href="# ">Terms of service</a></li>
                                        <li><i className="bi bi-dash "></i> <a href="# ">Privacy policy</a></li>
                                    </ul>
                                </div>

                                <div className="col-lg-2 col-6 footer-links ">
                                    <h4>Our Services</h4>
                                    <ul>
                                        <li><i className="bi bi-dash "></i> <a href="# ">Web Design</a></li>
                                        <li><i className="bi bi-dash "></i> <a href="# ">Web Development</a></li>
                                        <li><i className="bi bi-dash "></i> <a href="# ">Product Management</a></li>
                                        <li><i className="bi bi-dash "></i> <a href="# ">Marketing</a></li>
                                        <li><i className="bi bi-dash "></i> <a href="# ">Graphic Design</a></li>
                                    </ul>
                                </div>

                                <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start ">
                                    <h4>Contact Us</h4>
                                    <p>
                                        A108 Adam Street <br/> New York, NY 535022<br/> United States <br/><br/>
                                        <strong>Phone:</strong> +1 5589 55488 55<br/>
                                        <strong>Email:</strong> info@example.com<br/>
                                    </p>

                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="footer-legal ">
                        <div className="container ">
                            <div className="copyright ">
                                &copy; Copyright <strong><span>Nova</span></strong>. All Rights Reserved
                            </div>
                            <div className="credits ">


                                Designed by <a href="https://bootstrapmade.com/ ">BootstrapMade</a>
                            </div>
                        </div>
                    </div>
                </footer> 
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
