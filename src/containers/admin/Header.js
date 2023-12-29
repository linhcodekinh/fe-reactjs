import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notification from './section/Notification';
import SearchBar from './section/SearchBar';
import  {changeLanguageApp } from '../../store/actions/appActions';

class Header extends Component {
  changeLanguage = (language) => {
    console.log("this.props header ", this.props)
    this.props.changeLanguageApp(language)
  }

  render() {
    return (
      <>
        {/* Topbar */}
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          {/* Sidebar Toggle (Topbar) */}
          <SearchBar />
          <Notification />
          <div><span onClick={()=>this.changeLanguage('vi')}>VI</span></div>{" "}|{" "}<div><span onClick={()=>this.changeLanguage('en')}>EN</span></div>
        </nav>

      </>
    );
  }

}

const mapStateToProps = state => {
  return {
    //isLoggedIn: state.user.isLoggedIn,
    //language: state.app.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeLanguageApp: (language) => dispatch(changeLanguageApp(language))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
