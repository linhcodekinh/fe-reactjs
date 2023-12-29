import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Home from './section/Home.js';
import Header from './Header.js';
import Footer from './Footer.js';
import SideBar from './SideBar.js';
import { extend } from 'lodash';
import UserManage from './system/user/UserManage.js';
import UserAdd from './system/user/UserAdd.js';
import UserEdit from './system/user/UserEdit.js';
import LoadingBar from 'react-top-loading-bar'

class ViewMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
   
    }
  }

  render() {
    console.log("view main: ", this.props)
    if (this.props.view === 'view') {
      return (
        <UserManage setProgress={this.props.setProgress} />
      );
    } else if (this.props.view === 'add') {
      return (
        <UserAdd setProgress={this.props.setProgress} />
      );
    }
    // else if (this.props.view === 'edit') {
    //   return (
    //     <UserEdit setProgress={this.props.setProgress} />
    //   );
    // }
    else {
      return (
        <Home setProgress={this.props.setProgress}/>
      );
    }
  }
}

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      progress: 0
    }
  }

  onLoaderFinished = (progress) => {
    if (this.state.progress === 80) this.state.progress = 0
    console.log("this.state.progress, ", this.state.progress)
    this.setState({
      progress: parseInt(this.state.progress) + parseInt(progress)
    })
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
        <LoadingBar
          color='#f11946'
          progress={this.state.progress}
        // onLoaderFinished={this.onLoaderFinished}
        />
        <div id="wrapper">
          <SideBar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Header />
              <ViewMain view={this.props.view} setProgress={this.onLoaderFinished}/>
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
