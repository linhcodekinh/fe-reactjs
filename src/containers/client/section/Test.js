import React, { Component } from 'react';
import { connect } from 'react-redux';
import './scss/Test.scss'

class Test extends Component {

    render() {
        return (
            <section id="call-to-action " className="call-to-action ">
                <div className="container " data-aos="fade-up ">
                    <div className="row justify-content-center ">
                        <div className="col-lg-6 text-center ">
                            <h3>TEST</h3>
                            <p>Làm bài full test với số lượng câu hỏi và thời gian giống như bài thi thật.</p>
                            <a className="cta-btn " href="# ">Mini Test</a>
                            <a className="cta-btn " href="# ">Full Test</a>
                        </div>

                        <div className="col-lg-6 text-center ">
                            <h3>Mini Test</h3>
                            <p>Làm bài mini test <br/>với số lượng câu hỏi và thời gian <br/>giảm một nửa so với bài thi thật.</p>
                            <a className="cta-btn " href="# ">Call To Action</a>
                        </div> 
                    </div>
                </div>
            </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(Test);
