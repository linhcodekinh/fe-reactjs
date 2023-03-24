import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader.js';
import HomeFooter from './HomeFooter.js';

class HomePage extends Component {
// dau & la khi co ten class y vao thi se hoat dong. VD: .item { &.active } => .item .active
    render() {
        return (
           <div>
                {/* <HomeHeader/> */}
                <HomeFooter/>
                <HomeFooter/>
                <HomeFooter/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
