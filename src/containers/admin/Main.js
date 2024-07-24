import React, { Component, Fragment, Suspense, lazy } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Home from './section/Home.js';
import Header from './Header.js';
import Footer from './Footer.js';
import SideBar from './SideBar.js';
import { extend } from 'lodash';
import LoadingBar from 'react-top-loading-bar';
const UserManage = lazy(() => import('./system/user/UserManage.js'));
const UserAdd = lazy(() => import('./system/user/UserAdd.js'));
const UserEdit = lazy(() => import('./system/user/UserEdit.js'));
// import UserManage from './system/user/UserManage.js';
// import UserAdd from './system/user/UserAdd.js';
// import UserEdit from './system/user/UserEdit.js';


class ViewMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
   
      
    }

  }

  componentDidUpdate = () => {
    console.log('componentDidUpdate ViewMain', this.props)
   
  }

  componentDidMount = () => {
      console.log('componentDidMount ViewMain', this.props)
    
  }

  render() {
   
    console.log("view main: ", this.props)
    if (this.props.view === 'view') {
      return (
        <Suspense fallback={
          setTimeout(() => {
          <div>LoadingLoadingLoadingLoadingLoadingLoadingLoadiLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingngLoadingLoadingLoading...</div>
          }, 3000)
        }>
            <UserManage setProgress={this.props.setProgress} />
        </Suspense>
      );
    } else if (this.props.view === 'add') {
      return (
        <Suspense fallback={
          setTimeout(() => {
          <div>LoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoading...</div>
          }, 3000)
        }>
          <UserAdd setProgress={this.props.setProgress} />
        </Suspense>
      );
    }
    else if (this.props.view === 'edit') {
      return (
        <Suspense fallback={
          setTimeout(() => {
          <div>LoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoading...</div>
          }, 3000)
        }>
          <UserEdit setProgress={this.props.setProgress}/>
        </Suspense>
      );
    }
    else {
      return (
        <Suspense fallback={
          setTimeout(() => {
          <div>LoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoading...</div>
          }, 3000)
        }>
          <Home setProgress={this.props.setProgress}/>
        </Suspense>
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
