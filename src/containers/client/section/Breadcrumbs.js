import React, { Component } from 'react';
import { connect } from 'react-redux';
import backgroundImg from '../../../assets/images/about-header.jpg'
import './scss/Breadcrumbs.scss'

class Breadcrumbs extends Component {

    render() {
        return (
            <div className="breadcrumbs d-flex align-items-center" style={{backgroundImage: `url(${backgroundImg})`}}>
              <div className="container position-relative d-flex flex-column align-items-center">
        
                <h2>Luyện Tập Part 1</h2>
                <ol>
                  <li><a href="index.html">Home</a></li>
                  <li>Part 1</li>
                </ol>
        
              </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumbs);
