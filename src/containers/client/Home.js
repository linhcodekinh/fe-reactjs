import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header.js';
import Footer from './Footer.js';
import Slider from './section/Slider.js'
import Category from './section/Category.js'
import Main from './section/Main.js'
import Test from './section/Test.js'
import Blog from './section/Blog.js'

class Home extends Component {
    
    render() {
        return (
            <>
                <Header/>
                <Slider/>
                
                <main id="main">
                       <Category/> 
                       <Main/>
                       <Test/>
                       <Blog/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
