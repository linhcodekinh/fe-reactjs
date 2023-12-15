import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Home from './section/Home.js';
import Header from './Header.js';
import Footer from './Footer.js';
import SideBar from './SideBar.js';
import { extend } from 'lodash';
import UserManage from './system/UserManage.js';
import UserAdd from './system/UserAdd.js';
class ViewMain extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    // console.log("view main: ", this.props.view)
    if (this.props.view === 'view') {
      return (
        <UserManage />
      );
    }else if (this.props.view === 'add') {
      return (
        <UserAdd />
      );
    }
    else {
      return (
        <Home />
      );
    }
  }
}

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
    // if (this.props.history.action === "POP") {
    //   console.log("back to Main.....", this.props);
    // }
  }

  render() {
    console.log("render main", this.props.view)
    return (
      <div id="page-top">
        <div id="wrapper">
          <SideBar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Header />
              <ViewMain view={this.props.view} />
            </div>
            <Footer />
          </div>
        </div>
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up" />
        </a>
      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
