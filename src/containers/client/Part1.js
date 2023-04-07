import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header.js';
import Footer from './Footer.js';
import Breadcrumbs from './section/Breadcrumbs.js'
import PartContent from './section/PartContent.js';

class Part1 extends Component {

    render() {
        return (
            <>
                <Header/>
                <Breadcrumbs/>
                
                <main id="main">
                    <PartContent/>
                </main>
                
                <Footer/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Part1);
