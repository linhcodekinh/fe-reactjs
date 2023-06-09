import React, { Component } from 'react';
import { connect } from 'react-redux';
import backgroundImg1 from '../../../assets/images/part1-ava.png'
import backgroundImg2 from '../../../assets/images/part2-ava.png'
import backgroundImg3 from '../../../assets/images/part3-ava.png'
// import backgroundImg4 from '../../../../public/assets/images/part4-ava.png'
// import backgroundImg5 from '../../../../public/assets/images/part5-ava.png'
// import backgroundImg6 from '../../../../public/assets/images/part6-ava.png'
// import backgroundImg7 from '../../../../public/assets/images/part7-ava.png'
import './scss/Breadcrumbs.scss'

class Title extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="container position-relative d-flex flex-column align-items-center">

        <h2>Luyện Tập {this.props.data}</h2>
        <ol>
          <li><a href="index.html">Home</a></li>
          <li>{this.props.data}</li>
        </ol>

      </div>
    )
  }

}

class Breadcrumbs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      part: ''
    }
  }

  checkPart = () => {
    let part = ''
    let dataPart = localStorage.getItem('dataPart')
    if (dataPart === 'part1') {
      part = 'Part 1'
    } else if (dataPart === 'part2') {
      part = 'Part 2'
    } else if (dataPart === 'part3') {
      part = 'Part 3'
    } else if (dataPart === 'part4') {
      part = 'Part 4'
    } else if (dataPart === 'part5') {
      part = 'Part 5'
    } else if (dataPart === 'part6') {
      part = 'Part 6'
    } else if (dataPart === 'part7') {
      part = 'Part 7'
    }
    return part
  }

  componentDidUpdate = () => {
    let part = this.checkPart()
    if (this.state.part !== part) {
      this.setState({
        part: part
      })
    }
  }

  componentDidMount = () => {
    let part = this.checkPart()
    if (this.state.part !== part) {
      this.setState({
        part: part
      })
    }
  }

  render() {
    console.log('check render', localStorage.getItem('dataPart'))
    if (this.state.part === 'Part 1') {
      return (
        <div className="breadcrumbs d-flex align-items-center" style={{ backgroundImage: `url(${backgroundImg1})` }}>
          <Title data={this.state.part} />
        </div>
      );
    } else if (this.state.part === 'Part 2') {
      return (
        <div className="breadcrumbs d-flex align-items-center" style={{ backgroundImage: `url(${backgroundImg2})` }}>
          <Title data={this.state.part} />
        </div>
      );
    } else if (this.state.part === 'Part 3') {
      return (
        <div className="breadcrumbs d-flex align-items-center" style={{ backgroundImage: `url(${backgroundImg3})` }}>
          <Title data={this.state.part} />
        </div>
      );
    } else if (this.state.part === 'Part 4') {
      return (
        <div className="breadcrumbs d-flex align-items-center" style={{ backgroundImage: `url(${backgroundImg1})` }}>
          <Title data={this.state.part} />
        </div>
      );
    } else if (this.state.part === 'Part 5') {
      return (
        <div className="breadcrumbs d-flex align-items-center" style={{ backgroundImage: `url(${backgroundImg2})` }}>
          <Title data={this.state.part} />
        </div>
      );
    } else if (this.state.part === 'Part 6') {
      return (
        <div className="breadcrumbs d-flex align-items-center" style={{ backgroundImage: `url(${backgroundImg3})` }}>
          <Title data={this.state.part} />
        </div>
      );
    } else {
      return (
        <div className="breadcrumbs d-flex align-items-center" style={{ backgroundImage: `url(${backgroundImg1})` }}>
          <Title data={this.state.part} />
        </div>
      );
    }
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
