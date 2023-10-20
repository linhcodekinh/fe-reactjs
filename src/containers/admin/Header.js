import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notification from './section/Notification';
import SearchBar from './section/SearchBar';

class Header extends Component {

  render() {
    return (
      <>
        {/* Topbar */}
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          {/* Sidebar Toggle (Topbar) */}
          <SearchBar />
          <Notification />
        </nav>

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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
