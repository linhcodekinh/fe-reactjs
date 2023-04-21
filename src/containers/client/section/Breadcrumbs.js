import React, { Component } from 'react';
import { connect } from 'react-redux';
import backgroundImg from '../../../assets/images/about-header.jpg'
import './scss/Breadcrumbs.scss'

class Breadcrumbs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      part : ''
    }
  }

  checkPart = () => {
    let part = ''
    let dataPart = localStorage.getItem('dataPart')
    if (dataPart === 'part1') {
      part = 'Part 1'
    } else  if (dataPart === 'part2') {
      part = 'Part 2'
    } else  if (dataPart === 'part3') {
      part = 'Part 3'
    } else  if (dataPart === 'part4') {
      part = 'Part 4'
    } else  if (dataPart === 'part5') {
      part = 'Part 5'
    } else  if (dataPart === 'part6') {
      part = 'Part 6'
    } else  if (dataPart === 'part7') {
      part = 'Part 7'
    }
    return part
  }

  componentDidUpdate = () => {
    let part = this.checkPart()
    if(this.state.part !== part){
      this.setState({
        part : part
      })
    }
  }

  componentDidMount = () => {
    let part = this.checkPart()
    if(this.state.part !== part){
      this.setState({
        part : part
      })
    }
  }

  render() {
    console.log('check render')
    return (
      <div className="breadcrumbs d-flex align-items-center" style={{ backgroundImage: `url(${backgroundImg})` }}>
        <div className="container position-relative d-flex flex-column align-items-center">

          <h2>Luyện Tập {this.state.part}</h2>
          <ol>
            <li><a href="index.html">Home</a></li>
            <li>{this.state.part}</li>
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
